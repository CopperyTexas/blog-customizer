// Импорт необходимых хуков из React и вспомогательных функций
import { useState, useRef, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx'; // Для условной стилизации
import { OptionType } from 'src/constants/articleProps'; // Типы для стилей и опций
import { Text } from 'components/text'; // Компонент текста для стилизации
import arrowDown from 'src/images/arrow-down.svg'; // Иконка стрелки вниз
import { Option } from './Option'; // Компонент опции выбора
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // Помощник для проверки классов шрифтов
import { useEnterSubmit } from './hooks/useEnterSubmit'; // Хук для обработки Enter
import { useOutsideClickClose } from './hooks/useOutsideClickClose'; // Хук для закрытия по клику вне компонента

import styles from './Select.module.scss'; // Стили компонента


// Описание пропсов компонента Select
export type SelectProps = {
	selected: OptionType | null; // Выбранная опция
	options: OptionType[]; // Массив опций для выбора
	placeholder?: string; // Заполнитель, когда ничего не выбрано
	onChange?: (selected: OptionType) => void; // Функция обработки выбора опции
	onClose?: () => void; // Функция, вызываемая при закрытии списка
	title?: string; // Заголовок для компонента
};

// Основной компонент Select
export const Select = ({
  options,
  placeholder,
  selected,
  onChange = () => {}, // Функция по умолчанию, если не передана
  onClose,
  title
}: SelectProps) => {
  // Состояние для управления открытием/закрытием списка
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  // Ссылки на DOM-элементы для управления фокусом и внеочередными действиями
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  // Активный индекс для навигации клавиатурой и состояние навигации клавиатурой
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  

// Использование кастомных хуков для обработки событий Enter и кликов вне компонента
useEnterSubmit({
  placeholderRef,
  onChange: setIsOpen,
});

useOutsideClickClose({
  isOpen,
  rootRef,
  onClose,
  onChange: setIsOpen,
});

// Эффект для обработки навигации клавиатурой и выбора опции через Enter
  useEffect(() => {
	if (isOpen){
        const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen) {
				setIsKeyboardNavigation(true);
				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
				if (isOpen) {
					if (event.key === "ArrowDown") {
						setActiveIndex((prevIndex) => (prevIndex + 1) % options.length);
						event.preventDefault();
						event.stopPropagation(); 
					} else if (event.key === "ArrowUp") {
						setActiveIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
						event.preventDefault();
						event.stopPropagation(); 
					} else if (event.key === "Enter") {
						const option = options[activeIndex];
						onChange(option);
						setIsOpen(false);
					}
			}
			
			};}
			}
			document.addEventListener('keydown', handleKeyDown);
     		return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, options, onChange, activeIndex]);

// Сброс навигации клавиатурой при закрытии списка
	useEffect(() => {
		if (!isOpen) {
		  setIsKeyboardNavigation(false);
		}
	  }, [isOpen]);

// Обработчики для клика по опции и плейсхолдеру
const handleOptionClick = (option: OptionType) => {
    setIsOpen(false); 
    onChange?.(option); 
	setIsKeyboardNavigation(false); 
  };
  
const handlePlaceHolderClick = () => {
    setIsOpen(!isOpen); 
	setIsKeyboardNavigation(false);
  };

  // Рендер компонента
  return (
	<div className={styles.container}>
		{title && (
			<>
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			</>
		)}
		<div
			className={styles.selectWrapper}
			ref={rootRef}
			data-is-active={isOpen}
			data-testid='selectWrapper'>
			<img
				src={arrowDown}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
			<div
				className={clsx(
					styles.placeholder,
					styles[selected?.optionClassName || '']
				)}
				data-status={status}
				data-selected={!!selected?.value}
				onClick={handlePlaceHolderClick}
				role='button'
				tabIndex={0}
				ref={placeholderRef}>
				<Text
					family={
						isFontFamilyClass(selected?.className)
							? selected?.className
							: undefined
					}>
					{selected?.title || placeholder}
				</Text>
			</div>
			{isOpen && (
				<ul className={styles.select} data-testid='selectDropdown'>
					{options
						.filter((option) => selected?.value !== option.value)
						.map((option, index) => (
							<Option key={option.value} option={option} onClick={() => handleOptionClick(option)} isActive={isKeyboardNavigation && index === activeIndex} />
						))}
				</ul>
			)}
		</div>
	</div>
);
};