import React, { useState, useEffect } from 'react';
import '../styles/ResearchGrants.css';

function ResearchGrants() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        // Fetch both grants and their details
        const [grantsResponse, detailsResponse] = await Promise.all([
          fetch('/data/grants.json'),
          fetch('/data/grant_details_demo.json')
        ]);

        if (!grantsResponse.ok || !detailsResponse.ok) {
          throw new Error('Failed to fetch grants data');
        }

        const grantsData = await grantsResponse.json();
        const detailsData = await detailsResponse.json();

        // Combine grants with their details
        const combinedGrants = grantsData.slice(0, 10).map(grant => {
          const details = detailsData.find(d => d.id === grant.id) || {};
          return {
            id: grant.id,
            name: grant.title,
            agency: grant.agency,
            openDate: grant.openDate,
            description: details.description || 'No description available',
            link: `https://www.grants.gov/view-opportunity.html?oppId=${grant.id}`,
            score: Math.random() * 0.3 + 0.7 // Temporary random score between 0.7 and 1.0
          };
        });

        setGrants(combinedGrants);
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
        <p>Please wait while we load the available grants...</p>
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
      <h1>Research Grants</h1>
      {grants.length === 0 ? (
        <div className="no-grants">
          <p>No grants found. Please try again later.</p>
        </div>
      ) : (
        <div className="grants-container">
          {grants.map((grant) => (
            <div key={grant.id} className="grant-card">
              <h2>{grant.name}</h2>
              <div className="grant-details">
                <p><strong>Agency:</strong> {grant.agency}</p>
                <p><strong>Open Date:</strong> {grant.openDate}</p>
                <p><strong>Match Score:</strong> {(grant.score * 100).toFixed(1)}%</p>
              </div>
              <p className="grant-description">{grant.description}</p>
              <a 
                href={grant.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="grant-link"
              >
                View Grant Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResearchGrants; 