import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyLoginByUsernameQuery } from '../api/authApi';
import {
  loginValidateSchema,
  type LoginForm,
} from '../model/types/LoginValidateShema';

import { Modal } from '../../../components/Modal/Modal';
import { Input } from '../../../components/Input/Input';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import { useState } from 'react';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AuthByUserName = (props: IProps) => {
  const { isOpen, setIsOpen } = props;
  const [triggerLogin, { isFetching }] = useLazyLoginByUsernameQuery();
  const [error, setError] = useState<string | null>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginValidateSchema),
  });

  const onCloseModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await triggerLogin(data).unwrap();
      if (result.length) {
        console.log('Autoriazade', result[0]);
        onCloseModal();
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (e) {
      setError('Серверная ошибка. Попробуйте позже');
      console.log(e);
    }
  };

  return (
    <Modal rounded="rounded-xl" isOpen={isOpen} onClose={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Text variant="h2" text="Вход в приложение" fontW="font-bold" />
        <div>
          <Input
            {...register('username')}
            placeholder="ваш логин"
            error={!!errors.username}
            errortext={errors.username?.message}
          />
        </div>
        <div>
          <Input
            {...register('password')}
            placeholder="Ваш пароль"
            error={!!errors.password}
            errortext={errors.password?.message}
          />
        </div>
        {error && (
          <Text text={error} variant="helper" color="primary" error={true} />
        )}

        <div className="flex justify-end items-center gap-4">
          <Button onClick={onCloseModal} variant="ghost" type="button">
            Отмена
          </Button>
          <Button type="submit" disabled={isFetching}>
            Войти
          </Button>
        </div>
      </form>
    </Modal>
  );
};
