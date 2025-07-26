import { Button } from '../../../shared/ui/Button/Button';
import { Text } from '../../../shared/ui/Text/Text';
import AppLink from '../AppLink';

interface Props {
  user: { username: string } | null;
  setIsOpen: (isOpen: boolean) => void;
  setUser: (user: null) => void;
}

const DesktopNav = ({ user, setIsOpen, setUser }: Props) => {
  return (
    <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-base sm:text-md font-medium">
      <AppLink to="/feedback">
        <Text text="Связь с разработчиками" />
      </AppLink>
      {user ? (
        <>
          <AppLink to="/profile">
            <Text text="Личный кабинет" />
          </AppLink>
          <Text
            text={user.username}
            fontW="font-bold"
            color="primary"
            className="rounded-md border-1"
          />
          <Button variant="danger" size="small" onClick={() => setUser(null)}>
            Выйти
          </Button>
        </>
      ) : (
        <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>
          Авторизация
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;
