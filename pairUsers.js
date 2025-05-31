// Simple script to generate demo matched users data
const fs = require('fs');
const path = require('path');

// Demo matched users data
const matchedUsers = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    interest_area: "Machine Learning",
    problem_focus: "Healthcare",
    project_goal: "Develop ML models for early disease detection",
    skills: ["Python", "TensorFlow", "Data Analysis"],
    score: 0.95
  },
  {
    name: "Michael Chen",
    email: "mchen@example.com",
    interest_area: "Computer Vision",
    problem_focus: "Autonomous Systems",
    project_goal: "Build computer vision systems for self-driving cars",
    skills: ["C++", "OpenCV", "Deep Learning"],
    score: 0.88
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    interest_area: "Natural Language Processing",
    problem_focus: "Education",
    project_goal: "Create AI-powered language learning tools",
    skills: ["Python", "NLP", "Web Development"],
    score: 0.82
  }
];

// Write the data to matched_users.json
const outputPath = path.join(__dirname, 'matched_users.json');
fs.writeFileSync(outputPath, JSON.stringify(matchedUsers, null, 2));

console.log('Successfully generated matched_users.json'); 