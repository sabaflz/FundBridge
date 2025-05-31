import React, { useState, useEffect } from 'react';
import '../styles/FindGroups.css';

function FindGroups() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        console.log('Fetching matched users data...');
        
        // Fetch matched users data directly
        const response = await fetch('/data/matched_users.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch matched users data');
        }

        const usersData = await response.json();
        console.log('Matched users data:', usersData);
        
        if (!Array.isArray(usersData)) {
          throw new Error('Invalid data format: expected an array of users');
        }

        setMatchedUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching matched users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatchedUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Finding Matches</h2>
        <p>Please wait while we load potential collaborators...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
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
      <h1 className="page-title">Potential Collaborators</h1>
      {matchedUsers.length === 0 ? (
        <div className="no-matches">
          <p>No matches found. Try updating your profile or check back later.</p>
        </div>
      ) : (
        <div className="matches-container">
          {matchedUsers.map((match, index) => (
            <div key={index} className="match-card">
              <div className="match-header">
                <h2>{match.name || 'Anonymous User'}</h2>
                <span className="match-score">{(match.score * 100).toFixed(1)}% Match</span>
              </div>
              <div className="match-details">
                <p><strong>Interest Area:</strong> {match.interest_area || 'Not specified'}</p>
                <p><strong>Problem Focus:</strong> {match.problem_focus || 'Not specified'}</p>
                <p><strong>Project Goal:</strong> {match.project_goal || 'Not specified'}</p>
                {match.skills && (
                  <p><strong>Skills:</strong> {match.skills.join(', ')}</p>
                )}
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