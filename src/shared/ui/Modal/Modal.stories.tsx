import { action } from 'storybook/actions';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { Modal } from './Modal';
import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onClose: action('Close modal'),
  },
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      args.onClose?.();
      setIsOpen(false);
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
        <Modal isOpen={isOpen} onClose={handleClose} rounded="rounded-xl">
          <Text variant="h2" text="Вход в приложение" fontW="font-bold" />
          <Input onChange={action('change login')} placeholder="Ваш логин" />
          <Input
            onChange={action('change password')}
            placeholder="Ваш пароль"
          />
          <div className="flex justify-end items-center gap-4 mt-4">
            <Button onClick={handleClose} variant="ghost">
              Отмена
            </Button>
            <Button>Войти</Button>
          </div>
        </Modal>
      </div>
    );
  },
};
