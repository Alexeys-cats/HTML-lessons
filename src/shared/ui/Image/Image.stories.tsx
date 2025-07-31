import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Shared/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    animation: {
      control: { type: 'select' },
      options: ['spin', 'bounce', 'pluse', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: '/animatedHomePageImg.svg',
    alt: 'Static image',
    size: 'sm',
    animation: 'none',
  },
};

export const Spin: Story = {
  args: {
    src: '/animatedHomePageImg.svg',
    alt: 'Лого',
    size: 'md',
    animation: 'spin',
  },
};

export const Bounce: Story = {
  args: {
    src: '/animatedHomePageImg.svg',
    alt: 'Лого',
    size: 'md',
    animation: 'bounce',
  },
};

export const Pulse: Story = {
  args: {
    src: '/animatedHomePageImg.svg',
    alt: 'Pulse image',
    size: 'lg',
    animation: 'pulse',
  },
};
