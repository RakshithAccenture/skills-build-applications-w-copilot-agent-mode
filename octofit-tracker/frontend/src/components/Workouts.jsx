import { useEffect, useState } from 'react';

function normalizeResponse(result, defaultKey) {
  if (Array.isArray(result)) return result;
  if (!result || typeof result !== 'object') return [];
  return result.items || result.data || result[defaultKey] || [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const API_URL = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
      : 'http://localhost:8000/api/workouts';

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setWorkouts(normalizeResponse(data, 'workouts')))
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Intensity</th>
                <th>Duration</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.intensity}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{(workout.exercises || []).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
