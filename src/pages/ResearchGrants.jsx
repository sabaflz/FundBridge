import React, { useState, useEffect } from 'react';
import '../styles/ResearchGrants.css';

function ResearchGrants() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        // First, run the match_grants.py script
        const response = await fetch('http://localhost:3001/api/run-match-grants', {
          method: 'POST',
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to run match_grants.py');
        }

        // Then fetch the updated grants data
        const grantsResponse = await fetch('/data/matched_grants.json');
        if (!grantsResponse.ok) {
          throw new Error('Failed to fetch grants data');
        }
        
        const grantsData = await grantsResponse.json();
        setGrants(grantsData);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGrants();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Grants</h2>
        <p>Please wait while we fetch the latest research grants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  return (
    <div className="research-grants-page">
      <h1 className="page-title">Research Grants</h1>
      {grants.length === 0 ? (
        <div className="no-grants">
          <p>No grants found. Please try again later.</p>
        </div>
      ) : (
        <div className="grants-container">
          {grants.map((grant) => (
            <div key={grant.id} className="grant-card">
              <div className="grant-header">
                <h2>{grant.title}</h2>
                <span className="match-score">{(grant.score * 100).toFixed(1)}% Match</span>
              </div>
              <div className="grant-details">
                <p><strong>Agency:</strong> {grant.agency}</p>
                <p><strong>Open Date:</strong> {grant.open_date}</p>
                <p><strong>Description:</strong> {grant.description}</p>
              </div>
              <div className="grant-actions">
                <a href={grant.url} target="_blank" rel="noopener noreferrer" className="view-grant-button">
                  View Full Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResearchGrants; 