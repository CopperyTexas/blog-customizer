// Импортируем необходимые зависимости
import React from 'react';
import clsx from 'clsx'; // Утилита для условного объединения классов
import { Text } from 'components/text'; // Компонент для текста
import styles from './Button.module.scss'; // Стили кнопки

// Определение типа пропсов для компонента Button
export type ButtonProps = {
  title: string; // Текст кнопки
  onClick?: () => void; // Обработчик клика
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // Тип кнопки (button, submit, reset)
  variant?: 'reset' | 'apply'; // Вариант оформления кнопки
};

// Компонент кнопки
export const Button = ({ title, onClick, type = 'button', variant }: ButtonProps) => {
  // Создание класса для кнопки с учетом варианта оформления
  const buttonClass = clsx(styles.button, variant && styles[variant]);

  // Рендер кнопки с текстом внутри
  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {/* Использование компонента Text для отображения текста кнопки с применением стилей в зависимости от варианта */}
      <Text className={clsx(styles.text, variant && styles[variant])} weight={800} uppercase>
        {title}
      </Text>
    </button>
  );
};
