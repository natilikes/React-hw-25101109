
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [fact, setFact] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFact('');
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        'https://catfact.ninja/fact'
      );

      setFact(response.data.fact);
    } catch (error) {
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cat Fact Finder</h1>

      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Cat Fact'}
        </button>
      </form>

      {loading && <p>Fetching a cat fact...</p>}

      {fact && <p>{fact}</p>}

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  );
}

export default App;
