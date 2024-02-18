// Импорт необходимых зависимостей
import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Типы для работы с опциями

// Типы пропсов хука
type UseEnterOptionSubmit = {
	onClick: (value: OptionType['value']) => void; // Функция, вызываемая при нажатии Enter
	value: OptionType['value']; // Значение текущей опции
	optionRef: React.RefObject<HTMLLIElement>; // Ссылка на элемент списка
};

// Хук для обработки нажатия клавиши Enter на опции
export const useEnterOptionSubmit = ({
	onClick,
	value,
	optionRef,
}: UseEnterOptionSubmit) => {
	// Эффект, отслеживающий нажатие клавиши Enter
	useEffect(() => {
		const option = optionRef.current; // Текущий элемент опции
		if (!option) return; // Выход, если элемент не найден

		// Функция обработки нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			// Проверка на активный элемент и клавишу Enter
			if (document.activeElement === option && event.key === 'Enter') {
				onClick(value); // Вызов функции onClick с текущим значением
			}
		};

		// Добавление обработчика событий к элементу
		option.addEventListener('keydown', handleEnterKeyDown);

		// Очистка эффекта
		return () => {
			// Удаление обработчика событий при размонтировании компонента
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onClick, optionRef]); // Зависимости эффекта
};
