// ArrowButton.tsx
import React from 'react';
import arrow from 'src/images/arrow.svg'; // Убедитесь, что путь к изображению корректен
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
	onClick: () => void;
	isOpen: boolean; // Добавляем этот пропс
  };
  
  export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
	  <div
		role="button"
		aria-label="Открыть/Закрыть форму параметров статьи"
		tabIndex={0}
		className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
		onClick={onClick}
	  >
		<img src={arrow} alt="иконка стрелочки" className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`} />
	  </div>
	);
  };