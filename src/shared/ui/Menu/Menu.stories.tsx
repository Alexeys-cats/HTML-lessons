import type { StoryObj, Meta } from '@storybook/react-vite';
import { Menu } from './Menu';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Menu> = {
  title: 'Shared/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: '#d9d9d9',
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
