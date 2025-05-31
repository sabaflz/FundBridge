import json

# Load the sample user from JSON file
with open("sample_user.json", "r") as f:
    sample_user = json.load(f)

# Skills to bitmask mapping
skill_index = [
    "Coding",
    "Data analysis",
    "Writing",
    "Design",
    "Fundraising",
    "Project management"
]

# Convert skills to bitmask
def encode_skills(skills):
    return sum(1 << skill_index.index(skill) for skill in skills if skill in skill_index)

# Count number of set bits (Hamming weight)
def count_set_bits(n):
    return bin(n).count('1')

# Fake users to match against
fake_users = [
    {"name": "Bob", "email": "bob@example.com", "interest": "AI / Data Science", "skills": ["Coding", "Design"]},
    {"name": "Carol", "email": "carol@example.com", "interest": "AI / Data Science", "skills": ["Data analysis", "Writing"]},
    {"name": "Dave", "email": "dave@example.com", "interest": "AI / Data Science", "skills": ["Coding", "Fundraising"]},
    {"name": "Eve", "email": "eve@example.com", "interest": "AI / Data Science", "skills": ["Design", "Project management"]},
    {"name": "Frank", "email": "frank@example.com", "interest": "AI / Data Science", "skills": ["Writing", "Fundraising"]},
    {"name": "Grace", "email": "grace@example.com", "interest": "AI / Data Science", "skills": ["Coding", "Writing"]},
    {"name": "Heidi", "email": "heidi@example.com", "interest": "AI / Data Science", "skills": ["Data analysis", "Project management"]},
    {"name": "Ivan", "email": "ivan@example.com", "interest": "AI / Data Science", "skills": ["Fundraising", "Writing"]},
    {"name": "Judy", "email": "judy@example.com", "interest": "AI / Data Science", "skills": ["Coding", "Data analysis"]},
    {"name": "Mallory", "email": "mallory@example.com", "interest": "AI / Data Science", "skills": ["Design", "Fundraising"]},
    {"name": "Niaj", "email": "niaj@example.com", "interest": "AI / Data Science", "skills": ["Writing", "Project management"]},
    {"name": "Olivia", "email": "olivia@example.com", "interest": "AI / Data Science", "skills": ["Data analysis", "Design"]},
    {"name": "Peggy", "email": "peggy@example.com", "interest": "AI / Data Science", "skills": ["Project management", "Fundraising"]},
    {"name": "Sybil", "email": "sybil@example.com", "interest": "AI / Data Science", "skills": ["Writing", "Coding"]},
    {"name": "Trent", "email": "trent@example.com", "interest": "AI / Data Science", "skills": ["Design", "Data analysis"]}
]

# Match function
def find_matches_for_user(target_user, users):
    target_mask = encode_skills([target_user["primary_skill"]])
    matches = []

    for user in users:
        if user["email"] == target_user["email"]:
            continue
        if user["interest"] != target_user["interest_area"]:
            continue

        user_mask = encode_skills(user["skills"])
        combined_mask = target_mask | user_mask
        skill_score = count_set_bits(combined_mask)

        matches.append({
            "name": user["name"],
            "email": user["email"],
            "skillCoverage": skill_score,
            "sharedInterest": user["interest"]
        })

    return sorted(matches, key=lambda x: x["skillCoverage"], reverse=True)

# Find and save matches
matches = find_matches_for_user(sample_user, fake_users)

with open("matched_users.json", "w") as f:
    json.dump(matches, f, indent=2)

print(f"✅ Found {len(matches)} matches. See matched_users.json")
