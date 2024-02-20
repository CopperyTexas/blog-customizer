// Использование хука useEffect для обработки кликов вне компонента
import { useEffect } from 'react';

// Определение типов пропсов для хука
type UseOutsideClickClose = {
	isOpen: boolean; // Состояние открыт/закрыт
	onChange: (newValue: boolean) => void; // Функция изменения состояния
	onClose?: () => void; // Опциональная функция, вызываемая при закрытии
	rootRef: React.RefObject<HTMLDivElement>; // Ссылка на корневой элемент
};

// Хук для обработки кликов вне компонента
export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	// Сайд-эффект для добавления и удаления обработчика события клика
	useEffect(() => {
		// Функция обработки клика вне компонента
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			// Проверка, что клик произошел вне компонента
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.(); // Если компонент открыт, вызываем onClose
				onChange(false); // Изменяем состояние на закрыто
			}
		};

		// Добавление обработчика события клика к window
		window.addEventListener('click', handleClick);

		// Функция для очистки эффекта
		return () => {
			// Удаление обработчика события при размонтировании компонента
			window.removeEventListener('click', handleClick);
		};
	}, [onClose, onChange, isOpen, rootRef]); // Зависимости эффекта
};
