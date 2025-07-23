import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Home from './pages/Home';
import HTML from './pages/HTML';
import CSS from './pages/CSS';
import JS from './pages/JS';
import TS from './pages/TS';
import ReactP from './pages/React-p';
import Quiz from './pages/Quiz';

import { AuthByUserName } from './features/AuthByUserName';
import { useState } from 'react';

const App = () => {
  // TODO состояние авторизации и тригер временно в App позже вынести в стор
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <HashRouter>
      <div className="">
        <Header setIsOpen={setIsOpen} user={user} setUser={setUser} />
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              isOpen ? (
                <AuthByUserName
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setUser={setUser}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/html" element={<HTML />} />
          <Route path="/css" element={<CSS />} />
          <Route path="/js" element={<JS />} />
          <Route path="/ts" element={<TS />} />
          <Route path="/react" element={<ReactP />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
