import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import HTML from './pages/HTML';
import CSS from './pages/CSS';
import JS from './pages/JS';
import TS from './pages/TS';
import ReactP from './pages/React-p';
import Quiz from './pages/Quiz';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html" element={<HTML />} />
        <Route path="/css" element={<CSS />} />
        <Route path="/js" element={<JS />} />
        <Route path="/ts" element={<TS />} />
        <Route path="/react" element={<ReactP />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
