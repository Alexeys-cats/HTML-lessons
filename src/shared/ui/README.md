# 🎨 **UI Kit** – *HTML-lessons*  `shared/ui`

## 📖 Описание

**UI Kit** — это библиотека переиспользуемых компонентов интерфейса для проекта.  
Он находится в папке `shared/ui` и служит источником всех базовых элементов (кнопок, полей ввода, иконок и т.д.), которые применяются на страницах и в фичах.  

Компоненты написаны на **React + TypeScript** и стилизованы через **TailwindCSS**, с поддержкой Storybook для демонстрации и тестирования.

---

## 📂 Структура папки

shared/ui/
┣ 📂 Button
┃ ┣ 📄 Button.tsx # компонент
┃ ┣ 📄 Button.stories.tsx # история для Storybook
┃ ┗ 📄 Button.test.tsx # тесты (TDB - будут реализованы позже)
┣ 📂 Input
┃ ┣ 📄 Input.tsx
┃ ┣ 📄 Input.stories.tsx
┃ ┗ 📄 Input.test.tsx # тесты (TDB - будут реализованы позже)
┗ 📄 index.ts # общий экспорт всех компонентов


- **Каждый компонент** — в отдельной папке.
- **Минимальный набор файлов**: `Component.tsx`, `Component.stories.tsx`, `Component.test.tsx`.
- **Тесты** (`Component.test.tsx`) — по необходимости.

---

## 🚀 Как использовать компоненты

Импортируем их централизованно из `shared/ui`:

```tsx
import { Button, Input } from "@/shared/ui";

export function Example() {
  return (
    <div>
      <Input placeholder="Введите текст" />
      <Button variant="primary">Отправить</Button>
    </div>
  );
}
```

## Руководство по использованию UI Kit

📌 **Важно**:  
Никогда не импортируйте компоненты напрямую (`import Button from "@/shared/ui/Button/Button"`).  
Всегда используйте `index.ts` для импорта — это упрощает рефакторинг и поддерживает чистую архитектуру. Так же в проекте настроен линтер который запрещет импорты не из publicApi.

## 🏷 Правила именования и кодстайл

### ✅ Должно быть:
- **Компоненты и их папки** именуются с большой буквы: `Button`, `Input`, `Modal`.
- **Типизация props**: Все props должны быть типизированы через `interface IProps`.
- **UI Kit** предназначен только для UI. Бизнес-логика здесь недопустима.
- Используйте:
  - **TailwindCSS** — для стилизации компонентов.
  - **cn** — для работы с условными классами.
  - **tailwind-merge** — для объединения классов.

### ❌ Запрещено:
- Использовать инлайновые стили (`style={{ color: 'red' }}`), кроме исключительных случаев.
- Включать бизнес-логику (например, API-запросы, Redux) в UI Kit.

###  Пример компонента:
```tsx
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-colors",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-200 text-black hover:bg-gray-300",
        className
      )}
      {...props}
    />
  );
}
```
## 📚 Storybook

Каждый компонент обязательно сопровождается историей в Storybook.

### Пример для Button:

```tsx
import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: "primary", children: "Кнопка" },
};

export const Secondary: StoryObj<typeof Button> = {
  args: { variant: "secondary", children: "Отмена" },
};
```
## ▶️ Как запустить Storybook:
```bash
npm run sb
```

## 🧪 Тестирование (TBD будет добавлено позже)

Для критичных компонентов рекомендуется писать тесты с использованием **Vitest** и **Testing Library**:

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("рендерит текст кнопки", () => {
  render(<Button>Привет</Button>);
  expect(screen.getByText("Привет")).toBeInTheDocument();
});
```

##  Запуск тестов:
```bash
npm run test
```