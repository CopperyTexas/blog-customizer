import React, { useState, forwardRef } from 'react';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select/Select';
import {
  fontSizeOptions,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  OptionType, defaultArticleState
} from '../../constants/articleProps';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
  onClose: () => void;
  isOpen: boolean;
  onApply: (styles: {
    fontFamily?: string;
    fontSize: string;
    fontColor?: string;
    backgroundColor?: string;
    contentWidth?: string;
  }) => void;
  onReset: () => void;
};

export const ArticleParamsForm = forwardRef<HTMLDivElement, ArticleParamsFormProps>(
  ({ onClose, isOpen, onApply, onReset }, ref) => {
    const [selectedFont, setSelectedFont] = useState<OptionType | null>(fontFamilyOptions[0]);
    const [localFontSize, setLocalFontSize] = useState(fontSizeOptions[0].value);
    const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(fontColors[0]);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType | null>(backgroundColors[0]);
    const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType | null>(contentWidthArr[0]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onApply({
        fontFamily: selectedFont?.className,
        fontSize: localFontSize,
        fontColor: selectedFontColor?.value,
        backgroundColor: selectedBackgroundColor?.value,
        contentWidth: selectedContentWidth?.value,
      });
    };
    // Обработчик сброса формы к дефолтным значениям
    const handleResetForm = () => {
      setSelectedFont(fontFamilyOptions[0]);
      setLocalFontSize(defaultArticleState.fontSizeOption.value);
      setSelectedFontColor(fontColors[0]);
      setSelectedBackgroundColor(backgroundColors[0]);
      setSelectedContentWidth(contentWidthArr[0]);
      onReset(); // Вызов сброса стилей в App
    };

    return (
      <aside ref={ref} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Выбор шрифта */}
          <Select
            selected={selectedFont}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={setSelectedFont}
            title="Шрифт"
          />
          {/* Размер шрифта */}
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={fontSizeOptions.find(option => option.value === localFontSize) || fontSizeOptions[0]}
            onChange={(option) => setLocalFontSize(option.value)}
            title="Размер шрифта"
          />
          {/* Цвет шрифта */}
          <Select
            selected={selectedFontColor}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={setSelectedFontColor}
            title="Цвет шрифта"
          />
          <Separator />
          {/* Цвет фона */}
          <Select
            selected={selectedBackgroundColor}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={setSelectedBackgroundColor}
            title="Цвет фона"
          />
          {/* Ширина контента */}
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
