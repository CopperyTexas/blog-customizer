// App.tsx или index.tsx, в зависимости от структуры вашего проекта
import React, { useState, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './components/arrow-button/ArrowButton';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root');
const root = domNode ? createRoot(domNode) : null;

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

	const toggleFormVisibility = () => setIsOpen(!isOpen);

  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': defaultArticleState.fontFamilyOption.value,
          '--font-size': defaultArticleState.fontSizeOption.value,
          '--font-color': defaultArticleState.fontColor.value,
          '--container-width': defaultArticleState.contentWidth.value,
          '--bg-color': defaultArticleState.backgroundColor.value,
        } as CSSProperties
      }>
	  <ArrowButton onClick={toggleFormVisibility} isOpen={isOpen} />
      {isOpen && <ArticleParamsForm isOpen={isOpen} onClose={toggleFormVisibility} />}
      <Article />
    </div>
  );
};

if (root) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
