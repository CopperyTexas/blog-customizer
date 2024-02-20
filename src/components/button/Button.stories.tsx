// Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

// Метаданные для Storybook, определяющие название и компонент
const meta: Meta<ButtonProps> = {
  title: 'Components/Button', // Путь в UI Storybook
  component: Button, // Ссылка на сам компонент
};

export default meta;

// Базовый шаблон для создания стори
const Template: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />, // Рендер компонента с переданными аргументами
};

// Стори для обычной кнопки
export const Default: StoryObj<ButtonProps> = {
  ...Template,
  args: { // Аргументы по умолчанию для кнопки
    title: 'Обычная кнопка',
    onClick: () => alert('Клик по кнопке'),
  },
};

// Стори для кнопки с вариантом "apply"
export const Apply: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    title: 'Применить',
    variant: 'apply', // Указываем вариант оформления кнопки
    onClick: () => alert('Применить'),
  },
};

// Стори для кнопки с вариантом "reset"
export const Reset: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    title: 'Сбросить',
    variant: 'reset', // Указываем вариант оформления кнопки
    onClick: () => alert('Сбросить'),
  },
};
