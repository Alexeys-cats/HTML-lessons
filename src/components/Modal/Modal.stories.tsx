import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
        <Modal isOpen={isOpen} onClose={onClose} rounded="rounded-xl">
          <Text variant="h2" text="Вход в приложение" fontW="font-bold" />
          <Input onChange={() => {}} placeholder="Ваш логин" />
          <Input
            onChange={() => {}}
            placeholder="Ваш пароль"
            classNames="mb-2"
          />
          <div className="flex justify-end items-center gap-4 mt-4">
            <Button onClick={onClose} variant="ghost">
              Отмена
            </Button>
            <Button>Войти</Button>
          </div>
        </Modal>
      </div>
    );
  },
};
