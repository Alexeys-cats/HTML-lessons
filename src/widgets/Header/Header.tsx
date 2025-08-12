import { useState } from 'react';
import logo from '../../shared/assets/logo.svg';
import SearchInput from './HeaderComponents/SearchInput';
import DesktopNav from './HeaderComponents/DesktopNav';
import MobileMenu from './HeaderComponents/MobileMenu';

interface IProps {
  setIsOpen: (isOpen: boolean) => void;
  user: { username: string } | null;
  setUser: (user: null) => void;
}

const Header = ({ setIsOpen, user, setUser }: IProps) => {
  const [search, setSearch] = useState('');

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 max-w-[1200px] w-[95vw] bg-[#AEAEAE] text-[#2D2D2D] py-2 px-2 sm:py-4 sm:px-6 flex justify-between items-center rounded-xl shadow-md z-50">
      <div className="sm:w-[55px] sm:h-[55px] logo-glow flex-shrink-0">
        <img src={logo} alt="logo" className="w-full h-full object-contain" />
      </div>

      <SearchInput search={search} setSearch={setSearch} />

      <DesktopNav user={user} setIsOpen={setIsOpen} setUser={setUser} />

      <MobileMenu user={user} setIsOpen={setIsOpen} setUser={setUser} />
      {/* {menuOpen && (
        
      )} */}
    </header>
  );
};

export default Header;
