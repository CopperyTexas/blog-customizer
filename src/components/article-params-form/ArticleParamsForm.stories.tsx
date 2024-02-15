// ArticleParamsForm.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';

const meta: Meta<typeof ArticleParamsForm> = {
  title: 'Components/ArticleParamsForm',
  component: ArticleParamsForm,
};

export default meta;

const Template: StoryObj<typeof ArticleParamsForm> = {
  render: (args) => {
    // Используем локальное состояние в Story для управления видимостью формы
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false); // Обработчик закрытия формы

    return (
      <>
        {isOpen && <ArticleParamsForm {...args} onClose={handleClose} />}
        {!isOpen && <button onClick={() => setIsOpen(true)}>Открыть форму снова</button>}
      </>
    );
  },
};


