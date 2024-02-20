import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArrowButton, ArrowButtonProps } from './ArrowButton';

// Конфигурация метаданных для стори
const meta: Meta<ArrowButtonProps> = {
  title: 'Components/ArrowButton', // Путь, по которому будет доступен компонент в Storybook
  component: ArrowButton, // Ссылка на сам компонент
  argTypes: { // Описание аргументов (пропсов) компонента для Storybook
    isOpen: {
      control: 'boolean', // Указание типа контрола (в данном случае - переключатель)
      description: 'Флаг, указывающий, открыт ли сайдбар', // Описание пропса
    },
  },
};

export default meta;

// Шаблон для создания стори
const Template: StoryObj<ArrowButtonProps> = {
  render: (args) => <ArrowButton {...args} />, // Функция, которая рендерит компонент с текущими аргументами
};

// Стори для состояния "открыто"
export const Opened: StoryObj<ArrowButtonProps> = {
  ...Template, // Использование общего шаблона
  args: { // Установка аргументов специфичных для этой стори
    isOpen: true, // Указываем, что сайдбар должен быть открыт
  },
};

// Стори для состояния "закрыто"
export const Closed: StoryObj<ArrowButtonProps> = {
  ...Template, // Использование общего шаблона
  args: { // Установка аргументов специфичных для этой стори
    isOpen: false, // Указываем, что сайдбар должен быть закрыт
  },
};
