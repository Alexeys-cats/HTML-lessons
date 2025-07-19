import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: '1',
    title: 'Имя',
    placeholder: 'Введите ваше имя',
    helperText: 'Ваше имя должно иметь такой формат',
    error: false,
  },
};

export const WithError: Story = {
  args: {
    id: '2',
    title: 'Email',
    placeholder: 'Введите ваш email',
    helperText: 'Ваш email должен иметь такой формат',
    error: true,
    errortext: 'Некорректный email',
  },
};

export const ReadOnly: Story = {
  args: {
    id: '3',
    title: 'Readonly Input',
    placeholder: 'Это поле только для чтения',
    readOnly: true,
    helperText: 'Вы не можете редактировать это поле',
  },
};
