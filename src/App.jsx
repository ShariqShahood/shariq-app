import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import TeamCreation from './components/TeamCreation';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';
import About from './components/About';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-team" element={<TeamCreation />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
