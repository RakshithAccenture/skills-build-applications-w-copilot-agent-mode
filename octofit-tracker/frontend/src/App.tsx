import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <main className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracking with React, Node, and MongoDB.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
