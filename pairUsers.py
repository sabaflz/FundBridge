import json
import os
from pathlib import Path

# Demo matched users data
matched_users = [
    {
        "name": "Sarah Johnson",
        "email": "sarah.j@example.com",
        "interest_area": "Machine Learning",
        "problem_focus": "Healthcare",
        "project_goal": "Develop ML models for early disease detection",
        "skills": ["Python", "TensorFlow", "Data Analysis"],
        "score": 0.95
    },
    {
        "name": "Michael Chen",
        "email": "mchen@example.com",
        "interest_area": "Computer Vision",
        "problem_focus": "Autonomous Systems",
        "project_goal": "Build computer vision systems for self-driving cars",
        "skills": ["C++", "OpenCV", "Deep Learning"],
        "score": 0.88
    },
    {
        "name": "Emily Rodriguez",
        "email": "emily.r@example.com",
        "interest_area": "Natural Language Processing",
        "problem_focus": "Education",
        "project_goal": "Create AI-powered language learning tools",
        "skills": ["Python", "NLP", "Web Development"],
        "score": 0.82
    }
]

def main():
    # Get the current directory
    current_dir = Path(__file__).parent.absolute()
    print(f"Current directory: {current_dir}")

    # Define output paths
    output_path = current_dir / "matched_users.json"
    public_output_path = current_dir / "public" / "data" / "matched_users.json"
    
    print(f"Writing to: {output_path}")
    print(f"Public path: {public_output_path}")

    try:
        # Write to root directory
        with open(output_path, 'w') as f:
            json.dump(matched_users, f, indent=2)
        print(f"Successfully wrote to: {output_path}")

        # Ensure public/data directory exists
        public_data_dir = current_dir / "public" / "data"
        public_data_dir.mkdir(parents=True, exist_ok=True)
        print(f"Ensured directory exists: {public_data_dir}")

        # Copy to public directory
        with open(output_path, 'r') as src, open(public_output_path, 'w') as dst:
            dst.write(src.read())
        print(f"Successfully copied to: {public_output_path}")

    except Exception as e:
        print(f"Error writing files: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main() 