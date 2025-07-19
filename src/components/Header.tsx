import { useState } from 'react';
import { Input } from './Input/Input';

const Header = () => {
  const [_search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const search = _search.trim().toLowerCase();
  console.log('search', search);

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 max-w-[1200px] w-[95vw] bg-[#AEAEAE] text-[#2D2D2D] py-2 px-2 sm:py-4 sm:px-6 flex justify-between items-center rounded-xl shadow-md z-50">
      <div className="sm:w-[55px] sm:h-[55px] logo-glow flex-shrink-0">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="w-full max-w-[120px] sm:max-w-xs">
          <Input
            placeholder="Поиск..."
            onChange={(e) => setSearch(e.target.value)}
            helperText=""
            id="header-search"
          />
        </div>
      </div>

      <div className="hidden sm:flex gap-4 sm:gap-6 text-base sm:text-md font-medium text-[#2D2D2D]">
        <a
          href="#"
          className="hover:text-[#00DBDB] transition-colors duration-200"
        >
          Связь с разработчиками
        </a>
        <a
          href="#"
          className="hover:text-[#00DBDB] transition-colors duration-200"
        >
          Личный кабинет
        </a>
      </div>

      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 ml-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Открыть меню"
      >
        <span
          className={`block w-6 h-0.5 bg-[#2D2D2D] mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#2D2D2D] mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#2D2D2D] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
        ></span>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#AEAEAE] rounded-b-xl shadow-md flex flex-col items-center py-2 sm:hidden z-50">
          <a
            href="#"
            className="py-2 w-full text-center hover:text-[#00DBDB] transition-colors duration-200"
          >
            Главная
          </a>
          <a
            href="#"
            className="py-2 w-full text-center hover:text-[#00DBDB] transition-colors duration-200"
          >
            Связь с разработчиками
          </a>
          <a
            href="#"
            className="py-2 w-full text-center hover:text-[#00DBDB] transition-colors duration-200"
          >
            Личный кабинет
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
