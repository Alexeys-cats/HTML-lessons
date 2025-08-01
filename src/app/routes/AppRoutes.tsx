import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import HTML from '../../pages/HTML';
import CSS from '../../pages/CSS';
import JS from '../../pages/JS';
import TS from '../../pages/TS';
import ReactP from '../../pages/React-p';
import Quiz from '../../pages/Quiz';
import { AuthByUserName } from '../../features/AuthByUserName';
interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setUser: (user: { username: string }) => void;
}

const AppRoutes = ({ isOpen, setIsOpen, setUser }: IProps) => {
  return (
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
  );
};

export default AppRoutes;
