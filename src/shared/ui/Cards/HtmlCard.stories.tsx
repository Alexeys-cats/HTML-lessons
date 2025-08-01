import type { Meta, StoryObj } from '@storybook/react-vite';
import HtmlCard from './HtmlCard';

const meta: Meta<typeof HtmlCard> = {
  title: 'Shared/HtmlCard',
  component: HtmlCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'p',
    description: 'Тег <p> определяет параграф текста на веб-странице',
    start: '<p>Текст параграфа</p>',
    example: '<p style="color: blue;">Это пример параграфа</p>',
  },
};

export const WithEndTag: Story = {
  args: {
    name: 'div',
    description:
      'Тег <div> является блочным элементом и используется для группировки содержимого',
    start: '<div class="container">',
    end: '</div>',
    example:
      '<div style="background: #eee; padding: 10px;">Содержимое блока div</div>',
  },
};

export const LongDescription: Story = {
  args: {
    name: 'table',
    description:
      'Тег <table> используется для создания таблиц. Внутри него располагаются строки (tr) и ячейки (td)',
    start: '<table><tr><td>Данные</td></tr></table>',
    example: `
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Ячейка 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Ячейка 2</td>
        </tr>
      </table>
    `,
  },
};
