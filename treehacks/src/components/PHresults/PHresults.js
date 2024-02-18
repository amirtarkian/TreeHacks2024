import React, { useState, useEffect } from "react";

function ResultsComponent() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5003/get-results")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching results:", error));
  }, []);

  return (
    <div className="results">
      {results ? (
        <div>
          <p>Soil Crop Analysis: {JSON.stringify(results)}</p>
        </div>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
}

export default ResultsComponent;
