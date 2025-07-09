import { Link } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';

const Header = () => {
  return (
    <header className="header">
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
      <nav className="top-nav">
        <Link to="/" className="logo">
          <span>SOVIT</span>
        </Link>
        <Link to="/" className="nav-link">
          Главная
        </Link>
        <Link to="/contact" className="nav-link">
          Написать разработчикам
        </Link>
        <Link to="/account" className="nav-link">
          Личный кабинет
        </Link>
      </nav>
      <div className="theme-switcher">
        <button id="ThemeBtn">🌙 Темная тема</button>
      </div>
    </header>
  );
};

export default Header;
