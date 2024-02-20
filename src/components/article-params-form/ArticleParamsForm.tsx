// Импортируем необходимые ресурсы и компоненты
import React, { useState, forwardRef, useCallback } from 'react';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select/Select';
import { fontSizeOptions, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, OptionType, defaultArticleState } from '../../constants/articleProps';
import { Separator } from '../separator';

// Определение типа пропсов для формы настроек статьи
export type ArticleParamsFormProps = {
  onClose: () => void; // Функция для закрытия формы
  isOpen: boolean; // Состояние, указывающее открыта ли форма
  onApply: (styles: { // Функция, вызываемая при применении настроек
    fontFamily?: string;
    fontSize: string;
    fontColor?: string;
    backgroundColor?: string;
    contentWidth?: string;
  }) => void;
  onReset: () => void; // Функция, вызываемая для сброса настроек
};

// Компонент формы для настройки статьи
export const ArticleParamsForm = forwardRef<HTMLDivElement, ArticleParamsFormProps>(
  ({ onClose, isOpen, onApply, onReset }, ref) => {
    // Состояния для каждого из параметров статьи
    const [selectedFont, setSelectedFont] = useState<OptionType | null>(fontFamilyOptions[0]);
    const [localFontSize, setLocalFontSize] = useState(fontSizeOptions[0].value);
    const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(fontColors[0]);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType | null>(backgroundColors[0]);
    const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType | null>(contentWidthArr[0]);

    // Обработчик отправки формы
    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault(); // Предотвращение стандартного поведения формы
      onApply({ // Вызов функции применения настроек с текущими значениями состояний
        fontFamily: selectedFont?.className,
        fontSize: localFontSize,
        fontColor: selectedFontColor?.value,
        backgroundColor: selectedBackgroundColor?.value,
        contentWidth: selectedContentWidth?.value,
      });
    }, [onApply, selectedFont, localFontSize, selectedFontColor, selectedBackgroundColor, selectedContentWidth]);
    
    // Обработчик сброса формы к начальным значениям
    const handleResetForm = useCallback(() => {
      setSelectedFont(fontFamilyOptions[0]); // Сброс выбранного шрифта
      setLocalFontSize(defaultArticleState.fontSizeOption.value); // Сброс размера шрифта
      setSelectedFontColor(fontColors[0]); // Сброс цвета шрифта
      setSelectedBackgroundColor(backgroundColors[0]); // Сброс цвета фона
      setSelectedContentWidth(contentWidthArr[0]); // Сброс ширины контента
      onReset(); // Вызов функции сброса настроек
    }, [onReset]);

    // Рендеринг компонента
    return (
      <aside ref={ref} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}> {/* Добавление класса для открытого состояния */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Компоненты для выбора настроек */}
          <Select
            selected={selectedFont}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={setSelectedFont}
            title="Шрифт"
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={fontSizeOptions.find(option => option.value === localFontSize) || fontSizeOptions[0]}
            onChange={(option) => setLocalFontSize(option.value)}
            title="Размер шрифта"
          />
          <Select
            selected={selectedFontColor}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={setSelectedFontColor}
            title="Цвет шрифта"
          />
          <Separator /> {/* Визуальный разделитель */}
          <Select
            selected={selectedBackgroundColor}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={setSelectedBackgroundColor}
            title="Цвет фона"
          />
          <Select
            selected={selectedContentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину контента"
            onChange={setSelectedContentWidth}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="button" onClick={handleResetForm} variant="reset"/>
            <Button title="Применить" type="submit" variant="apply"/>
          </div>
        </form>
      </aside>
    );
  }
);
