// Использование хука useEffect для работы с сайд-эффектами
import { useEffect } from 'react';

// Определение типов пропсов для хука
type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>; // Функция для изменения состояния
	placeholderRef: React.RefObject<HTMLDivElement>; // Ссылка на элемент, для которого применяется хук
};

// Хук для обработки события нажатия клавиши Enter
export const useEnterSubmit = ({
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	// Сайд-эффект для добавления и удаления обработчика события
	useEffect(() => {
		const placeholderEl = placeholderRef.current; // Получение текущего элемента по ссылке
		if (!placeholderEl) return; // Проверка на существование элемента

		// Функция обработки нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onChange((isOpen: boolean) => !isOpen); // Изменение состояния на противоположное
				event.preventDefault(); // Предотвращение дефолтного поведения браузера
			}
		};

		// Добавление обработчика события к элементу
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		// Функция для очистки эффекта
		return () => {
			// Удаление обработчика события при размонтировании компонента
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange]); // Зависимости эффекта, чтобы избежать лишних вызовов
};
