import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

export default {
  title: 'Components/ArrowButton',
  component: ArrowButton,
} as Meta<typeof ArrowButton>;

export const Default: StoryObj<typeof ArrowButton> = {
  render: (args) => {
    // Используем локальное состояние для демонстрации изменения состояния кнопки
    const [isOpen, setIsOpen] = useState(false);

    // Функция для переключения состояния isOpen
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return <ArrowButton {...args} isOpen={isOpen} onClick={toggleIsOpen} />;
  },
};
