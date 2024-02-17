import React from 'react';
import arrow from 'src/images/arrow.svg'; // Убедитесь, что путь к изображению корректен
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
  // Функция для обработки нажатия клавиш
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0} // Делает элемент фокусируемым
      className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      onClick={onClick} // Обработчик клика мышью
      onKeyDown={handleKeyDown} // Обработчик нажатия клавиш
    >
      <img
        src={arrow}
        alt="Иконка стрелочки"
        className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
      />
    </div>
  );
};
