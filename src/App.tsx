import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Menu from './components/Menu';

import { useState } from 'react';

const App = () => {
  // TODO состояние авторизации и тригер временно в App позже вынести в стор
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <HashRouter>
      <AppRoutes isOpen={isOpen} setIsOpen={setIsOpen} setUser={setUser} />
      <Header setIsOpen={setIsOpen} user={user} setUser={setUser} />
      <Menu />
    </HashRouter>
  );
};

export default App;
