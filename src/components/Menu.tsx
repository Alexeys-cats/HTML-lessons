import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="card-menu">
      <NavLink to="/html" className="card-link">
        HTML
      </NavLink>
      <NavLink to="/css" className="card-link">
        CSS
      </NavLink>
      <NavLink to="/js" className="card-link">
        JavaScript
      </NavLink>
      <NavLink to="/ts" className="card-link">
        TypeScript
      </NavLink>
      <NavLink to="/react" className="card-link">
        React
      </NavLink>
      <NavLink to="/quiz" className="card-link">
        Quiz
      </NavLink>
    </nav>
  );
};

export default Menu;
