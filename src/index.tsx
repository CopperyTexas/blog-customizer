import { StrictMode } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './components/arrow-button/ArrowButton';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root');

if (!domNode) {
  console.error('Failed to find the root element');
} else {
  const root = createRoot(domNode);

  const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    // Используем начальное состояние стилей статьи из defaultArticleState
    const initialStyleState = {
      fontFamily: defaultArticleState.fontFamilyOption.className,
      fontSize: defaultArticleState.fontSizeOption.value,
      fontColor: defaultArticleState.fontColor.value,
      backgroundColor: defaultArticleState.backgroundColor.value,
      contentWidth: defaultArticleState.contentWidth.value,
    };
    const [articleStyle, setArticleStyle] = useState(initialStyleState);

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

    const handleReset = () => {
      setArticleStyle(initialStyleState); // Сбрасываем стили к начальным
    };

    const toggleFormVisibility = () => setIsOpen(!isOpen);

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

    useEffect(() => {
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--font-family', articleStyle.fontFamily);
      rootStyle.setProperty('--font-size', articleStyle.fontSize);
      rootStyle.setProperty('--font-color', articleStyle.fontColor);
      rootStyle.setProperty('--background-color', articleStyle.backgroundColor);
      rootStyle.setProperty('--content-width', articleStyle.contentWidth);
    }, [articleStyle]);

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

  root.render(<App />);
}
