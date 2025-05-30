import React, { useState, useEffect } from 'react';
import '../styles/FindGroups.css';

function FindGroups() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        // First, run the pairUsers.js script
        console.log('Attempting to run pairUsers.js...');
        const response = await fetch('http://localhost:3001/api/run-pair-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Server response status:', response.status);
        const data = await response.json();
        console.log('Server response data:', data);
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to run pairUsers.js');
        }

        // Then fetch the updated matched users data
        console.log('Fetching matched users data...');
        const usersResponse = await fetch('/data/matched_users.json');
        console.log('Users response status:', usersResponse.status);
        
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch matched users data: ${usersResponse.status} ${usersResponse.statusText}`);
        }
        
        const usersData = await usersResponse.json();
        console.log('Matched users data:', usersData);
        setMatchedUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchMatchedUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Finding Matches</h2>
        <p>Please wait while we analyze and match you with potential collaborators...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <p>Please make sure the server is running and try again.</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="find-groups-page">
      <h1>Potential Collaborators</h1>
      {matchedUsers.length === 0 ? (
        <div className="no-matches">
          <p>No matches found. Try updating your profile or check back later.</p>
        </div>
      ) : (
        <div className="matches-container">
          {matchedUsers.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-header">
                <h2>{match.name}</h2>
                <span className="match-score">{(match.score * 100).toFixed(1)}% Match</span>
              </div>
              <div className="match-details">
                <p><strong>Interest Area:</strong> {match.interest_area}</p>
                <p><strong>Problem Focus:</strong> {match.problem_focus}</p>
                <p><strong>Project Goal:</strong> {match.project_goal}</p>
              </div>
              <div className="match-actions">
                <button className="connect-button">Connect</button>
                <button className="view-profile-button">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindGroups; 