import AppLink from '../AppLink';
import { Button, Stack, Text } from '@/shared/ui';
import BurgerButton from './BurgerButton';
import { useState } from 'react';

interface Props {
  user: { username: string } | null;
  setIsOpen: (isOpen: boolean) => void;
  setUser: (user: null) => void;
}

const MobileMenu = ({ user, setIsOpen, setUser }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <BurgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <Stack
          align="center"
          direction="column"
          className="absolute top-full left-0 w-full bg-[var(--bg-color)]
    rounded-b-xl shadow-md py-2 sm:hidden z-50"
        >
          <AppLink to="/feedback" className="py-2 w-full text-center">
            <Text
              text="Связь с раработчиком"
              className="w-full text-center"
            ></Text>
          </AppLink>
          {user ? (
            <>
              <AppLink to="/profile" className="py-2 w-full text-center">
                <Text text="Личный кабинет" className="w-full text-center" />
              </AppLink>
              <Stack gap={4}>
                <Text
                  text={`Hi! ${user.username}`}
                  variant="body"
                  color="primary"
                />
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => setUser(null)}
                >
                  Выйти
                </Button>
              </Stack>
            </>
          ) : (
            <Button
              variant="primary"
              size="medium"
              onClick={() => setIsOpen(true)}
            >
              Авторизация
            </Button>
          )}
        </Stack>
      )}
    </>
  );
};

export default MobileMenu;
