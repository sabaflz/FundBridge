import os
import json
from sentence_transformers import SentenceTransformer, util

# === Load the user profile ===
with open("sample_user.json", "r") as f:
    user = json.load(f)

user_text = " ".join([
    user.get("interest_area", ""),
    user.get("problem_focus", ""),
    user.get("project_goal", "")
])

# === Load metadata and descriptions ===
METADATA_FILE = "../src/data/grants.json"
DESCRIPTIONS_FILE = "../src/data/grant_details_demo.json"

with open(METADATA_FILE, "r") as f:
    metadata = json.load(f)

with open(DESCRIPTIONS_FILE, "r") as f:
    descriptions = json.load(f)

# === Merge metadata + description by ID ===
desc_lookup = {d["id"]: d["description"] for d in descriptions}

combined_grants = []
for grant in metadata:
    gid = grant["id"]
    if gid in desc_lookup:
        combined_grants.append({
            "id": gid,
            "name": grant.get("title", ""),
            "description": desc_lookup[gid],
            "agency": grant.get("agency", ""),
            "openDate": grant.get("openDate", ""),
            "link": f"https://www.grants.gov/view-opportunity.html?oppId={gid}"
        })

print(f"Merged {len(combined_grants)} grants.")

# === Load the SentenceTransformer model ===
model = SentenceTransformer("all-MiniLM-L6-v2")
user_embedding = model.encode(user_text, convert_to_tensor=True)

grant_texts = [g["name"] + " " + g["description"] for g in combined_grants]
grant_embeddings = model.encode(grant_texts, convert_to_tensor=True)

# === Compute similarity ===
cosine_scores = util.cos_sim(user_embedding, grant_embeddings)[0]

# === Rank top N ===
ranked = sorted(zip(combined_grants, cosine_scores), key=lambda x: x[1], reverse=True)
top_matches = [dict(grant, score=round(score.item(), 4)) for grant, score in ranked[:10]]

# === Save output ===
with open("matched_grants.json", "w") as f:
    json.dump(top_matches, f, indent=2)

print(f"Top {len(top_matches)} grants saved to matched_grants.json.")