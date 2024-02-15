// ArticleParamsForm.tsx
import React from 'react';
import { Button } from 'components/button'; // Проверьте путь
import { ArrowButton } from 'components/arrow-button'; // Проверьте путь
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onClose: () => void;
	isOpen: boolean; // Добавляем этот пропс
  };

export const ArticleParamsForm = ({ onClose, isOpen }: ArticleParamsFormProps) => {
  return (
    <>
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
