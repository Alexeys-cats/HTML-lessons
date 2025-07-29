import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    variant: {
      contorl: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'ghost'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'danger',
    size: 'medium',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'ghost',
    size: 'medium',
  },
};

export const Loading: Story = {
  args: {
    children: 'Загрузка...',
    loading: true,
    variant: 'primary',
    size: 'small',
  },
};
export const PrimaryBig: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'primary',
    size: 'large',
  },
};
export const SecondarySmall: Story = {
  args: {
    children: 'Нажми меня',
    variant: 'secondary',
    size: 'small',
  },
};
