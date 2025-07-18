import { useState } from "react";
import { Input } from "./Input/Input";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 max-w-[1200px] w-full bg-[#AEAEAE] text-[#2D2D2D] py-4 px-6 flex justify-between items-center rounded-xl shadow-md">
      <div className="w-25px h-25px">
        <img src="/public/logo.svg" alt="logo" />
      </div>
      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Поиск..."
            onChange={e => setSearch(e.target.value)}
            helperText=""
            id="header-search"
          />
        </div>
      </div>
      <div className="flex gap-6 text-xl font-bold text-[#2D2D2D]">
        <a href="#" className="hover:text-[#00DBDB] transition-colors duration-200">Главная</a>
        <a href="#" className="hover:text-[#00DBDB] transition-colors duration-200">Связь с разработчиками</a>
        <a href="#" className="hover:text-[#00DBDB] transition-colors duration-200">Личный кабинет</a>
      </div>
    </header>
  );
};

export default Header;
