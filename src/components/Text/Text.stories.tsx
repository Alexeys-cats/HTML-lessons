import type { StoryObj, Meta } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    readonly: { control: 'boolean' },
    variant: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'body', 'helper'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Я стандартный текст',
    variant: 'body',
  },
};

export const H1: Story = {
  args: {
    text: 'Я заголовок первого уровня',
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    text: 'Я заголовок второго уровня',
    variant: 'h2',
  },
};

export const Helper: Story = {
  args: {
    text: 'Я вспомогательный текст',
    variant: 'helper',
  },
};

export const ErrorText: Story = {
  args: {
    text: 'Я текст ошибки',
    variant: 'helper',
    error: true,
  },
};

export const ReadOnlyText: Story = {
  args: {
    text: 'Я текст только для чтения',
    variant: 'body',
    readonly: true,
  },
};
