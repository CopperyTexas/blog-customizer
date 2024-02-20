// Импорт необходимых зависимостей
import { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Типы для опций

// Описание типов для хука
type UseEnterSubmit = {
	onChange?: (option: OptionType) => void; // Опциональная функция обработчика изменений
	option: OptionType; // Текущая опция
};

// Хук для обработки нажатия клавиши Enter на опции
export const useEnterSubmit = ({ onChange, option }: UseEnterSubmit) => {
	const optionRef = useRef<HTMLDivElement>(null); // Реф на HTML-элемент опции

	// Эффект для добавления и удаления обработчика нажатия клавиши
	useEffect(() => {
		const optionHtml = optionRef.current; // Получение текущего элемента

		if (!optionHtml) return; // Если элемент не найден, выходим из функции

		// Функция обработчика нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			// Если активный элемент совпадает с текущим и нажата клавиша Enter
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				onChange?.(option); // Вызываем функцию обработчика изменений
			}
		};

		// Добавление обработчика события к элементу
		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// Возвращаем функцию для очистки: удаление обработчика события
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange, option]); // Зависимости эффекта: функция обработчика и опция
};
