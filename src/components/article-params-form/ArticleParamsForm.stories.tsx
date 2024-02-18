import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm, ArticleParamsFormProps } from './ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

// Метаданные для Storybook, где указывается компонент и его параметры
const meta: Meta<ArticleParamsFormProps> = {
  title: 'Components/ArticleParamsForm', // Заголовок в Storybook
  component: ArticleParamsForm, // Компонент, для которого пишем стори
};

export default meta;

// Шаблон для создания стори
const Template: StoryObj<ArticleParamsFormProps> = {
  render: (args) => <ArticleParamsForm {...args} />, // Функция рендеринга компонента с аргументами
  args: { // Аргументы по умолчанию для компонента
    isOpen: true, // Состояние открытости формы
    onClose: () => console.log('Закрытие формы'), // Функция для закрытия формы
    onApply: (styles) => console.log('Применение настроек:', styles), // Функция при применении настроек
    onReset: () => console.log('Сброс настроек'), // Функция при сбросе настроек
  },
};

// Стори для открытого состояния формы
export const Open: StoryObj<ArticleParamsFormProps> = {
  ...Template,
  args: {
    ...Template.args,
    isOpen: true, // Указываем, что форма должна быть открыта
  },
};

// Стори для закрытого состояния формы
export const Closed: StoryObj<ArticleParamsFormProps> = {
  ...Template,
  args: {
    ...Template.args,
    isOpen: false, // Указываем, что форма должна быть закрыта
  },
};
