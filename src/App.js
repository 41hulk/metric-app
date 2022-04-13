import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/details/:name" element={<>Yoooo</>} />
      </Routes>
    </div>
  );
}

export default App;
