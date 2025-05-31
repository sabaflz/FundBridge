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

// Define paths
const rootDir = __dirname;
const outputPath = path.join(rootDir, 'matched_users.json');
const publicOutputPath = path.join(rootDir, 'public', 'data', 'matched_users.json');

console.log('Current directory:', rootDir);
console.log('Writing to:', outputPath);
console.log('Public path:', publicOutputPath);

try {
  // Write to root directory
  fs.writeFileSync(outputPath, JSON.stringify(matchedUsers, null, 2));
  console.log('Successfully wrote to:', outputPath);

  // Ensure public/data directory exists
  const publicDataDir = path.join(rootDir, 'public', 'data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
    console.log('Created directory:', publicDataDir);
  }

  // Copy to public directory
  fs.copyFileSync(outputPath, publicOutputPath);
  console.log('Successfully copied to:', publicOutputPath);
} catch (error) {
  console.error('Error writing files:', error);
  process.exit(1);
} 