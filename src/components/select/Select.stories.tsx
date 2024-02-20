// Select.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { OptionType } from 'src/constants/articleProps';

// Метаданные для Storybook
const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;

// Пример опций для демонстрации
const exampleOptions: OptionType[] = [
  { title: 'Опция 1', value: '1', className: 'optionClass1' },
  { title: 'Опция 2', value: '2', className: 'optionClass2' },
  { title: 'Опция 3', value: '3', className: 'optionClass3' },
];

// Базовый шаблон
const Template: StoryObj<SelectProps> = {
  render: (args) => <Select {...args} />,
};

// Стори для Select с выбранной опцией
export const WithSelectedOption: StoryObj<SelectProps> = {
  ...Template,
  args: {
    options: exampleOptions,
    selected: exampleOptions[1], // Выбранная опция
    placeholder: "Выберите опцию",
    title: "Пример Select",
    onChange: (option) => console.log(option), // Логирование выбранной опции
  },
};

// Стори для Select без выбранной опции
export const WithoutSelectedOption: StoryObj<SelectProps> = {
  ...Template,
  args: {
    options: exampleOptions,
    selected: null, // Ничего не выбрано
    placeholder: "Выберите опцию",
    title: "Пример Select",
    onChange: (option) => console.log(option),
  },
};
