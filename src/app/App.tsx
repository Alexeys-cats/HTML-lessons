import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import Footer from '@/widgets/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import { Menu } from '../shared/ui';

const App = () => {
  // TODO состояние авторизации и тригер временно в App позже вынести в стор
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <HashRouter>
      <AppRoutes isOpen={isOpen} setIsOpen={setIsOpen} setUser={setUser} />
      <Header setIsOpen={setIsOpen} user={user} setUser={setUser} />
      <Menu />
      <Footer />
    </HashRouter>
  );
};

export default App;
