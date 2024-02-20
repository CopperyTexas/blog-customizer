// RadioGroup.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { OptionType } from 'src/constants/articleProps';

// Метаданные для Storybook
const meta: Meta<RadioGroupProps> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

export default meta;

// Пример опций для демонстрации
const exampleOptions: OptionType[] = [
  { title: 'Опция 1', value: 'option1', className: '' },
  { title: 'Опция 2', value: 'option2', className: '' },
  { title: 'Опция 3', value: 'option3', className: '' },
];

// Базовый шаблон
const Template: StoryObj<RadioGroupProps> = {
  render: (args) => <RadioGroup {...args} />,
};

// Стори для RadioGroup с выбранной опцией
export const Default: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    name: 'exampleGroup',
    options: exampleOptions,
    selected: exampleOptions[0], // Выбранная опция
    onChange: (option) => console.log(option), // Логирование выбранной опции
    title: 'Выберите опцию',
  },
};

// Стори для RadioGroup без выбранной опции
export const NoSelection: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    name: 'exampleGroup',
    options: exampleOptions,
    selected: { title: '', value: '', className: '' }, // Пустая выбранная опция
    onChange: (option) => console.log(option),
    title: 'Выберите опцию',
  },
};
