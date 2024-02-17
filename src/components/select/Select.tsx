import { useState, useRef, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

// Типы пропсов для компонента Select
type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
  };

export const Select = ({
  options,
  placeholder,
  selected,
  onChange,
  onClose,
  title
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Состояние для контроля видимости выпадающего списка
  const rootRef = useRef<HTMLDivElement>(null); // Ссылка на корневой div компонента Select
  const placeholderRef = useRef<HTMLDivElement>(null); // Ссылка на элемент плейсхолдера для обработки нажатия Enter
  const [activeIndex, setActiveIndex] = useState(0);


// Хук для обработки нажатия Enter на плейсхолдере (открывает/закрывает список)
useEnterSubmit({
    placeholderRef,
    onChange: setIsOpen,
  });

// Хук для обработки клика вне компонента (закрывает список при клике вне его)
useOutsideClickClose({
    isOpen,
    rootRef,
    onClose,
    onChange: setIsOpen,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setActiveIndex(prevIndex => (prevIndex + 1) % options.length);
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setActiveIndex(prevIndex => (prevIndex - 1 + options.length) % options.length);
        event.preventDefault();
      } else if (event.key === "Enter" && isOpen) {
        onChange?.(options[activeIndex]);
        setIsOpen(false);
        event.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, options, onChange, activeIndex]);


// Функция для обработки выбора опции
const handleOptionClick = (option: OptionType) => {
    setIsOpen(false); // Закрыть выпадающий список
    onChange?.(option); // Вызвать функцию onChange с выбранной опцией
  };
  
// Функция для обработки клика по плейсхолдеру
const handlePlaceHolderClick = () => {
    setIsOpen(!isOpen); // Переключить видимость списка
  };

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
							<Option
								key={option.value}
								option={option}
								onClick={() => handleOptionClick(option)}
								isActive={index === activeIndex}
							/>
						))}
				</ul>
			)}
		</div>
	</div>
);
};