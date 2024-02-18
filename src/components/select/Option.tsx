// Компонент для отображения опции в выпадающем списке
import { useRef, useEffect } from 'react';
import clsx from 'clsx'; // Библиотека для условного объединения классов
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import type { MouseEventHandler } from 'react';
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // Помощник для определения класса шрифта
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit'; // Хук для обработки нажатия Enter

import styles from './Select.module.scss';

// Типы пропсов компонента Option
type OptionProps = {
	option: OptionType; // Объект опции
	onClick: (value: OptionType['value']) => void; // Функция обработки клика по опции
	isActive: boolean; // Флаг активности опции
};

// Компонент Option
export const Option = ({ option, onClick, isActive }: OptionProps) => {
	const { value, title, optionClassName, className } = option; // Деструктуризация свойств опции
	const optionRef = useRef<HTMLLIElement>(null); // Ref для доступа к DOM-элементу опции

	// Эффект для автофокуса на активной опции
	useEffect(() => {
		if (isActive && optionRef.current) {
			optionRef.current.focus(); // Установка фокуса на активную опцию
		}
	}, [isActive]);

	// Функция обработки клика по опции
	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue); // Вызов функции onClick с передачей значения опции
		};

	// Использование хука для обработки нажатия Enter на опции
	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, {[styles.active]: isActive}, styles[optionClassName || ''])} // Применение классов стилей
			value={value}
			onClick={handleClick(value)} // Обработчик клика
			tabIndex={0} // Делаем элемент фокусируемым
			data-testid={`select-option-${value}`} // Идентификатор для тестов
			ref={optionRef} // Привязка ref к элементу
		>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title} 
			</Text>
		</li>
	);
};
