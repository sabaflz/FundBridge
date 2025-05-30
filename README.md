# Team Project Platform (Working Title)

This is a full-stack web application to help users find project teams and connect with relevant grants. The platform uses AI (mocked for now) to match users with compatible teams and generate grant application drafts.

## Features
- **Team Matching**: Find the perfect team based on your interests and skills
- **Project Exploration**: Browse existing projects and join teams
- **Grant Matching**: Get AI-powered grant recommendations for your project
- **Grant Writing Assistant**: Generate grant application drafts using AI
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore) [integration-ready, currently using mock data]
- **AI Integration**: OpenAI API (simulated for demo)
- **Tooling**: Vite, React Router

## Getting Started

### 1. Clone the repository
```bash
git clone <REPO_URL>
cd unite_projects
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 4. (Optional) Lint and format code
```bash
npm run lint
```

## Project Structure
```
/ (project root)
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── data/           # Mock data and types
│   ├── utils/          # Utility functions and AI integration
│   ├── contexts/       # React contexts (if needed)
│   └── App.jsx         # Main application component
├── public/             # Static assets
├── index.html          # Main HTML file
├── package.json        # Project metadata and scripts
├── .gitignore          # Files and folders to ignore in git
└── README.md           # Project documentation
```

## Contributing
1. Pull the latest changes from `main` before starting new work.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```
4. Push your branch and open a Pull Request on GitHub.

## License
MIT (or specify your team's preferred license)
