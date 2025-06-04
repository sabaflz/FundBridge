# FundBridge

FundBridge is a web application that helps researchers find and match with relevant research grants and potential collaborators. The platform uses AI to match researchers with suitable grants based on their interests and project goals.

## Demo

https://youtu.be/c1nn_fmKLOU

<!-- *Note: Replace the above URL with your actual video URL once you've uploaded it to GitHub or another platform.* -->

## Features

- **User Registration & Authentication**: Secure sign-up and sign-in functionality
- **Interest Survey**: Comprehensive survey to understand researcher's interests and goals
- **Grant Matching**: AI-powered grant matching system that recommends relevant research grants
- **Group Finding**: Platform to connect with potential research collaborators
- **Dark Mode Support**: Automatic dark/light mode based on system preferences

## Prerequisites

- Node.js (v16 or higher)
- Python 3.x
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unite_projects
```

2. Install Python dependencies:
```bash
pip install sentence-transformers
```

3. Install Node.js dependencies:
```bash
npm install
```

## Project Structure

```
unite_projects/
├── ai-models/
│   ├── match_grants.py
│   └── sample_user.json
├── public/
│   ├── logo_dark.png
│   └── logo_light.png
├── src/
│   ├── pages/
│   │   ├── Survey.jsx
│   │   └── ResearchGrants.jsx
│   ├── styles/
│   │   └── ResearchGrants.css
│   ├── App.jsx
│   └── App.css
├── server.js
└── package.json
```

## Running the Application

1. Start the development servers:
```bash
npm run dev
```
This will start both:
- Vite development server (frontend) on port 5173
- Express server (backend) on port 3001

2. Open your browser and navigate to:
```
http://localhost:5173
```

## How It Works

1. **Registration**: New users complete a survey to provide information about their research interests and goals.

2. **Grant Matching**: When a user clicks on "Research Grants":
   - The system runs the `match_grants.py` script
   - The script uses AI to match the user's profile with relevant grants
   - Results are displayed in a user-friendly card layout

3. **Grant Details**: Each grant card shows:
   - Grant name
   - Agency
   - Open date
   - Match score
   - Description
   - Link to full grant details

## Development

- Frontend: React with Vite
- Backend: Express.js
- AI Matching: Python with sentence-transformers
- Styling: CSS with responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
