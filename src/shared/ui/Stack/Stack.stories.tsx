import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Button } from '../Button/Button';

const meta: Meta<typeof Stack> = {
  title: 'Shared/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'end', 'center'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    gap: {
      control: { type: 'select' },
      options: [0, 2, 4, 6, 8, 16, 20, 24, 32, 40],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Stack> = (args) => (
  <div style={{ width: '100%' }}>
    <Stack {...args}>
      <Button variant="primary">Кнопка с текстом</Button>
      <Button variant="ghost">Кнопка с текстом</Button>
      <Button variant="danger">Кнопка с текстом</Button>
    </Stack>
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    direction: 'row',
    align: 'center',
    justify: 'center',
    gap: 0,
  },
};

export const Column: Story = {
  render: Template,
  args: {
    direction: 'column',
    gap: 4,
  },
};

export const JustifyBetween: Story = {
  render: Template,
  args: {
    justify: 'between',
  },
};

export const JustifyAround: Story = {
  render: Template,
  args: {
    justify: 'around',
  },
};

export const JustifyEvenly: Story = {
  render: Template,
  args: {
    justify: 'evenly',
  },
};

export const WithGap: Story = {
  render: Template,
  args: {
    gap: 20,
    align: 'start',
  },
};
