import React, { useState, useEffect } from 'react';
import '../styles/ResearchGrants.css';

function ResearchGrants() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        console.log('Fetching grants data...');
        
        // Fetch grants and their details
        const [grantsResponse, detailsResponse] = await Promise.all([
          fetch('/data/grants.json'),
          fetch('/data/grant_details_demo.json')
        ]);

        if (!grantsResponse.ok || !detailsResponse.ok) {
          throw new Error('Failed to fetch grants data');
        }

        const grantsData = await grantsResponse.json();
        const detailsData = await detailsResponse.json();

        // Combine grants with their details and add a random score
        const combinedGrants = grantsData.slice(0, 10).map(grant => ({
          ...grant,
          ...detailsData[grant.id],
          score: Math.random() * 0.5 + 0.5 // Random score between 0.5 and 1.0
        }));

        setGrants(combinedGrants);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching grants:', err);
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
    <div className="research-grants-page">
      <h1 className="page-title">Research Grants</h1>
      {grants.length === 0 ? (
        <div className="no-grants">
          <p>No grants found. Please try again later.</p>
        </div>
      ) : (
        <div className="grants-container">
          {grants.map((grant, index) => (
            <div key={index} className="grant-card">
              <div className="grant-header">
                <h2>{grant.title || 'Untitled Grant'}</h2>
                <span className="match-score">{(grant.score * 100).toFixed(1)}% Match</span>
              </div>
              <div className="grant-details">
                <p><strong>Agency:</strong> {grant.agency || 'Not specified'}</p>
                <p><strong>Open Date:</strong> {grant.open_date || 'Not specified'}</p>
                <p><strong>Description:</strong> {grant.description || 'No description available'}</p>
                {grant.eligibility && (
                  <p><strong>Eligibility:</strong> {grant.eligibility}</p>
                )}
              </div>
              <div className="grant-actions">
                <a 
                  href={grant.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-details-button"
                >
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