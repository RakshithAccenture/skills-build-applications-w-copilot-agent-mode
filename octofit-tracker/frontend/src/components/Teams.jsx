import { useEffect, useState } from 'react';
import { getApiPath } from '../api.js';

function normalizeResponse(result, defaultKey) {
  if (Array.isArray(result)) return result;
  if (!result || typeof result !== 'object') return [];
  return result.items || result.data || result[defaultKey] || [];
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiPath('teams'))
      .then((response) => response.json())
      .then((data) => setTeams(normalizeResponse(data, 'teams')))
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Member count</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
