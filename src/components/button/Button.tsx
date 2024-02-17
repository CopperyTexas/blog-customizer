// Button.jsx
import React from 'react';
import { Text } from 'components/text';
import styles from './Button.module.scss';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'reset' | 'apply';
};

export const Button = ({ title, onClick, type = 'button', variant }: ButtonProps) => {
  const buttonClass = `${styles.button} ${variant ? styles[variant] : ''}`;

  // Определите класс текста в зависимости от варианта кнопки
  const textClass = variant === 'reset' ? styles.resetText : styles.applyText;

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      <Text className={`${styles.text} ${variant ? styles[variant] : ''}`} weight={800} uppercase>
        {title}
      </Text>
    </button>
  );
};
