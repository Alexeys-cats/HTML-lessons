import { Link, useLocation } from 'react-router-dom';
import { FaHtml5, FaCss3Alt, FaJs, FaHome, FaGamepad } from 'react-icons/fa';
import { cn } from '@/shared/utils';

interface MenuItem {
  name: string;
  icon: React.ReactElement;
  path: string;
}

export const menuItems: MenuItem[] = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  { name: 'HTML', icon: <FaHtml5 />, path: '/html' },
  { name: 'CSS', icon: <FaCss3Alt />, path: '/css' },
  { name: 'JS', icon: <FaJs />, path: '/js' },
  { name: 'Quiz', icon: <FaGamepad />, path: '/quiz' },
];
/**
 * Переиспользуемый компонент меню
 * Содержит ссылки на основные страницы (Home, HTML, CSS, JS, Quiz).
 */
export const Menu = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      className="flex text-white flex-col items-center xl:justify-center gap-y-4 fixed
  h-max bottom-0 z-[var(--50z-index)] w-full xl:w-16 xl:max-w-md xl:h-screen mt:auto xl:right-[2%]"
    >
      <div
        className="flex w-full xl:flex-col items-center justify-between
    xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] bg-[var(--menuBg-color)] p-[20px] xl:h-max
    backdrop-blur-sm text-3xl xl:text-[30px] xl:rounded-full"
      >
        {menuItems.map((link, index) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={index}
              to={link.path}
              className={cn(
                'flex items-center gap-x-2',
                isActive
                  ? 'text-[var(--primary-color)] animate-bounce-short drop-shadow-xl/50'
                  : 'text-[var(--white-color)] hover:text-[var(--primary-color)] transition-all duration-300',
                'xl:translate-y-0 xl:hover:translate-y-[-4px] xl:hover:text-[var(--primary-color)] xl:hover:drop-shadow-xl/50'
              )}
            >
              {link.icon}
              <span className="hidden">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
