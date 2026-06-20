import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Home() {
  return (
    <main>
      <section className="py-5">
        <h1>OctoFit Tracker</h1>
        <p className="lead">
          Modern multi-tier fitness tracking with React, Express, and MongoDB.
        </p>
        <p>
          This app uses <code>VITE_CODESPACE_NAME</code> in{' '}
          <code>.env.local</code> to build the Codespaces API host.
        </p>
        <p className="text-muted">
          Current API host: <code>{apiHost}</code>
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <p className="h4 mb-0">OctoFit Tracker</p>
          <nav className="nav nav-pills ms-md-auto mt-3 mt-md-0">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
