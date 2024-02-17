import React, { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import styles from './RadioGroup.module.scss';

type OptionProps = {
  value: string;
  title: string;
  selected: boolean; // Исправлено на boolean для проверки выбрана ли эта опция
  groupName: string;
  onChange: (option: OptionType) => void;
  option: OptionType;
  isFocused?: boolean; // Добавленный проп для управления фокусом
};

export const Option = ({ value, title, selected, groupName, onChange, option, isFocused = false }: OptionProps) => {
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && optionRef.current) {
      optionRef.current.focus();
    }
  }, [isFocused]);

  const handleChange = () => {
    onChange(option);
  };

  const inputId = `${groupName}_radio_item_${value}`;

  return (
    <div
      className={styles.item}
      key={value}
      data-checked={selected} // Используется boolean значение selected для установки атрибута
      tabIndex={0}
      ref={optionRef}
      onKeyDown={(e) => e.key === 'Enter' && handleChange()}
    >
      <input
        className={styles.input}
        type="radio"
        name={groupName}
        id={inputId}
        value={value}
        checked={selected}
        onChange={handleChange}
        tabIndex={-1}
      />
      <label className={styles.label} htmlFor={inputId}>
        <Text size={18} uppercase>
          {title}
        </Text>
      </label>
    </div>
  );
};
