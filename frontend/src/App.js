import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Dynamic Route for Short URLs */}
        <Route path="/:shortId" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
