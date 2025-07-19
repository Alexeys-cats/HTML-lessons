Описание стори кейса:

// Импорты
Meta — тип, описывающий общую конфигурацию компонента в Storybook (title, component, parameters, argTypes и т.д.)
StoryObj — тип отдельной истории (варианта компонента)

// Meta-объект
Это конфигурация для Storybook, описывающая, как должен отображаться компонент и какие у него есть свойства.

title: 'Components/Input' - Определяет, как будет отображаться компонент в навигации в Storybook.
component: Input - Сам React-компонент, который ты описываешь. Storybook использует его, чтобы рендерить и анализировать props.

parameters: { layout: 'centered' } - Центрирует компонент в Canvas (по умолчанию компоненты слева).

tags: ['autodocs'] - Автоматически генерирует вкладку Docs на основе props/JSdoc. Работает только с autodocs включённым в конфиге .storybook/main.ts.

argTypes - Управляет контролами и действиями:
argTypes: {
    error: { control: 'boolean' },         // переключатель true/false в UI
    readOnly: { control: 'boolean' },
    onChange: { action: 'changed' },       // выводит действие в "Actions"
}

// Экспорт конфигурации
export default meta; - Обязательный экспорт — Storybook использует этот объект для генерации истории.

// Типизация историй

type Story = StoryObj<typeof meta>; - Удобный способ типизировать каждую историю (Primary, WithError и т.д.).

// Истории (варианты компонента)
export const Primary: Story = {
    args: {
        id: '1',
        title: 'Имя',
        placeholder: 'Введите ваше имя',
        helperText: 'Ваше имя должно иметь такой формат',
        error: false
    },
}

Каждая история — это вариант компонента с конкретными props.
args = props, которые ты передаёшь компоненту.
Storybook рендерит Input с этими args.