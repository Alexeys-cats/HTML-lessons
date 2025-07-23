import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Menu from './components/Menu';

const App = () => {
  return (
    <HashRouter>
      <AppRoutes />
      <Header />
      <Menu />
    </HashRouter>
  );
};

export default App;
