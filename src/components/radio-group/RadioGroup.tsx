import React, { useEffect, useState } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Option } from './Option';
import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
  name: string;
  options: OptionType[];
  selected: OptionType;
  onChange: (value: OptionType) => void;
  title: string;
};

export const RadioGroup = ({ name, options, selected, onChange, title }: RadioGroupProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Предотвращаем прокрутку страницы
        if (event.key === 'ArrowDown') {
          setFocusedIndex((prevIndex) => (prevIndex + 1) % options.length);
        } else if (event.key === 'ArrowUp') {
          setFocusedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options.length]);

  return (
    <div className={styles.container}>
      {title && (
        <Text weight={800} size={12} uppercase>
          {title}
        </Text>
      )}
      <div className={styles.group}>
        {options.map((option, index) => (
          <Option
            key={option.value}
            groupName={name}
            value={option.value}
            title={option.title}
            selected={selected.value === option.value}
            onChange={onChange}
            option={option}
            isFocused={index === focusedIndex}
          />
        ))}
      </div>
    </div>
  );
};
