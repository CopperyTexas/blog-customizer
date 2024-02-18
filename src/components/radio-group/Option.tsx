// Импорты React и необходимых компонентов
import React, { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Типы для опций
import { Text } from 'components/text'; // Компонент текста
import styles from './RadioGroup.module.scss'; // Стили

// Описание пропсов компонента
type OptionProps = {
  value: string; // Значение опции
  title: string; // Заголовок опции
  selected: boolean; // Флаг выбранной опции
  groupName: string; // Имя группы для радиокнопок
  onChange: (option: OptionType) => void; // Функция обработчика изменения
  option: OptionType; // Текущая опция
  isFocused?: boolean; // Флаг фокусировки на элементе
};

// Компонент опции для радиогруппы
export const Option = ({
  value,
  title,
  selected,
  groupName,
  onChange,
  option,
  isFocused = false,
}: OptionProps) => {
  const optionRef = useRef<HTMLDivElement>(null); // Реф для управления фокусом

  // Эффект для автоматического фокусирования при навигации клавиатурой
  useEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus(); // Фокусировка на элементе, если он активен
    }
  }, [isFocused]); // Зависимость от изменения фокуса

  // Обработчик изменения выбранной опции
  const handleChange = () => {
    onChange(option); // Вызов функции обработчика с текущей опцией
  };

  // Уникальный идентификатор для связки input и label
  const inputId = `${groupName}_radio_item_${value}`;

  // Рендер компонента
  return (
    <div
      className={styles.item} // Применение стилей элемента
      key={value} // Ключ для оптимизации рендера React
      data-checked={selected} // Индикатор выбранной опции
      tabIndex={0} // Делает элемент фокусируемым с клавиатуры
      ref={optionRef} // Привязка рефа к элементу
      onKeyDown={(e) => e.key === 'Enter' && handleChange()} // Обработчик нажатия Enter
    >
      <input
        className={styles.input} // Стиль инпута
        type="radio" // Тип элемента управления
        name={groupName} // Имя группы для организации радиокнопок
        id={inputId} // Идентификатор связи с label
        value={value} // Значение опции
        checked={selected} // Состояние выбранной опции
        onChange={handleChange} // Обработчик изменения
        tabIndex={-1} // Убираем возможность фокуса на инпуте
      />
      <label className={styles.label} htmlFor={inputId}> 
        <Text size={18} uppercase> 
          {title}
        </Text>
      </label>
    </div>
  );
};
