import AppLink from '../AppLink';
import { Text } from '@/shared/ui';

interface Props {
  user: { username: string } | null;
}

const MobileMenu = ({ user }: Props) => {
  return (
    <div
      className="absolute top-full left-0 w-full bg=[#AEAEAE]
  rounded-b-xl shadow-md flex flex-col items-center py-2 sm:hidden z-50"
    >
      <AppLink to="/feedback" className="py-2 w-full text-center">
        <Text text="Связь с раработчиком" className="w-full text-center"></Text>
      </AppLink>
      {user && (
        <AppLink to="/profile" className="py-2 w-full text-center">
          <Text text="Личный кабинет" className="w-full text-center" />
        </AppLink>
      )}

      {user && (
        <Text
          text={`Hi! ${user.username}`}
          variant="helper"
          color="primary"
          className="pt-2"
        />
      )}
    </div>
  );
};

export default MobileMenu;
