// Импортируем изображение стрелки и стили
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

// Определяем типы пропсов для компонента ArrowButton
export type ArrowButtonProps = {
  onClick: () => void; // Функция, которая будет вызвана при клике на кнопку
  isOpen: boolean; // Флаг, указывающий, открыт ли сайдбар
};

// Компонент ArrowButton - кнопка, открывающая и закрывающая сайдбар с настройками
export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
  // Рендерим кнопку с иконкой стрелки
  // Добавляем обработчик onClick, который вызывает функцию, переданную в пропсе onClick
  // Классы для стилизации зависят от состояния isOpen (открыт/закрыт сайдбар)
  return (
    <button
      aria-label="Открыть/Закрыть форму параметров статьи" // Доступное описание для читалок экрана
      className={`${styles.container} ${isOpen ? styles.container_open : ''}`} // Применяем стили в зависимости от состояния isOpen
      onClick={onClick} // При клике вызываем функцию onClick
      type="button" // Указываем тип кнопки
    >
      <img
        src={arrow} // Путь к изображению стрелки
        alt="Иконка стрелочки" // Альтернативный текст для изображения
        className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`} // Применяем стили в зависимости от состояния isOpen
      />
    </button>
  );
};
