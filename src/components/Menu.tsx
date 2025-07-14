import { Link, useLocation } from 'react-router-dom';
import { FaHtml5, FaCss3Alt, FaJs, FaHome } from 'react-icons/fa';
import clsx from 'clsx';

interface MenuItem {
  name: string;
  icon: React.ReactElement;
  path: string;
}

export const menuItems: MenuItem[] = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  { name: 'HTML', icon: <FaHtml5 />, path: '/html' },
  { name: 'CSS', icon: <FaCss3Alt />, path: '/css' },
  { name: 'JavaScript', icon: <FaJs />, path: '/javascript' },
];

const Menu = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      
    </>
  );
};

export default Menu;
