import { Modal } from '../../../components/Modal/Modal';
import { Input } from '../../../components/Input/Input';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AuthByUserName = (props: IProps) => {
  const { isOpen, setIsOpen } = props;

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal rounded="rounded-xl" isOpen={isOpen} onClose={onCloseModal}>
      <Text variant="h2" text="Вход в приложение" fontW="font-bold" />
      <Input onChange={() => {}} placeholder="Ваш логин" />
      <Input onChange={() => {}} placeholder="Ваш пароль" classNames="mb-2" />
      <div className="flex justify-end items-center gap-4">
        <Button onClick={onCloseModal} variant="ghost">
          Отмена
        </Button>
        <Button>Войти</Button>
      </div>
    </Modal>
  );
};
