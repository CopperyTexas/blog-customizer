// Импортируем необходимые зависимости
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Типы для опций
import { Text } from 'components/text'; // Компонент для текста
import { Option } from './Option'; // Компонент для каждой опции радио-группы
import styles from './RadioGroup.module.scss'; // Стили радио-группы

// Определение типа пропсов для компонента RadioGroup
export type RadioGroupProps = {
  name: string; // Название группы
  options: OptionType[]; // Массив опций
  selected: OptionType; // Выбранная опция
  onChange: (value: OptionType) => void; // Обработчик изменения
  title: string; // Заголовок группы
};

// Компонент радио-группы
export const RadioGroup = ({ name, options, selected, onChange, title }: RadioGroupProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0); // Индекс фокусируемой опции
  const groupRef = useRef<HTMLDivElement>(null); // Реф на элемент группы для добавления обработчика нажатия клавиш

  // Обработчик нажатий клавиш вверх/вниз для навигации по опциям
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Предотвращаем прокрутку страницы
      setFocusedIndex(prevIndex => 
        event.key === 'ArrowDown' 
        ? (prevIndex + 1) % options.length 
        : (prevIndex - 1 + options.length) % options.length
      );
    }
  }, [options.length]);

  // При монтировании компонента добавляем обработчик событий для навигации клавиатурой
  useEffect(() => {
    const groupElement = groupRef.current;
    if (groupElement) {
      groupElement.addEventListener('keydown', handleKeyDown);
      return () => groupElement.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  // Рендер компонента
  return (
    <div className={styles.container}>
      {title && (
        <Text weight={800} size={12} uppercase>
          {title}
        </Text>
      )}
      <div className={styles.group} tabIndex={0} ref={groupRef}>  
        {options.map((option, index) => (
          <Option
            key={option.value}
            groupName={name}
            value={option.value}
            title={option.title}
            selected={selected.value === option.value}
            onChange={onChange}
            option={option}
            isFocused={index === focusedIndex} // Управляем фокусом на основе индекса
          />
        ))}
      </div>
    </div>
  );
};
