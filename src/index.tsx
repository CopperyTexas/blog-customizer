// Импортируем необходимые компоненты и хуки из React и других зависимостей
import { StrictMode } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

// Импортируем компоненты приложения
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './components/arrow-button/ArrowButton';
import { defaultArticleState } from './constants/articleProps';

// Импортируем стили
import './styles/index.scss';
import styles from './styles/index.module.scss';

// Получаем корневой DOM-узел
const domNode = document.getElementById('root');

if (!domNode) {
  // Если корневой элемент не найден, выводим ошибку в консоль
  console.error('Failed to find the root element');
} else {
  // Если элемент найден, создаем корень React приложения
  const root = createRoot(domNode);

  const App = () => {
    // Состояния для управления видимостью сайдбара и стилями статьи
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null); // Реф для сайдбара
    // Начальное состояние стилей статьи
    const initialStyleState = {
      fontFamily: defaultArticleState.fontFamilyOption.className,
      fontSize: defaultArticleState.fontSizeOption.value,
      fontColor: defaultArticleState.fontColor.value,
      backgroundColor: defaultArticleState.backgroundColor.value,
      contentWidth: defaultArticleState.contentWidth.value,
    };
    const [articleStyle, setArticleStyle] = useState(initialStyleState);

    // Функция применения новых стилей
    const handleApply = (newStyles: {
      fontFamily?: string;
      fontSize: string;
      fontColor?: string;
      backgroundColor?: string;
      contentWidth?: string;
    }) => {
      setArticleStyle(prevStyle => ({
        ...prevStyle,
        ...newStyles,
      }));
    };

    // Функция сброса стилей к начальному состоянию
    const handleReset = () => {
      setArticleStyle(initialStyleState); 
    };

    // Функция переключения видимости сайдбара
    const toggleFormVisibility = () => setIsOpen(!isOpen);

    // Эффект для обработки клика вне сайдбара
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (isOpen && sidebarRef.current && !sidebarRef.current.contains(target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, sidebarRef]);

    // Эффект для применения стилей к статье через CSS переменные
    useEffect(() => {
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--font-family', articleStyle.fontFamily);
      rootStyle.setProperty('--font-size', articleStyle.fontSize);
      rootStyle.setProperty('--font-color', articleStyle.fontColor);
      rootStyle.setProperty('--background-color', articleStyle.backgroundColor);
      rootStyle.setProperty('--content-width', articleStyle.contentWidth);
    }, [articleStyle]);

    // Отрисовка компонентов приложения
    return (
      <StrictMode>
        <div className={clsx(styles.main)}>
          <ArrowButton onClick={toggleFormVisibility} isOpen={isOpen} />
          <ArticleParamsForm
            isOpen={isOpen}
            onClose={toggleFormVisibility}
            onApply={handleApply}
            onReset={handleReset}
            ref={sidebarRef}
          />
          <Article style={articleStyle} />
        </div>
      </StrictMode>
    );
  };

  // Рендер приложения
  root.render(<App />);
}
