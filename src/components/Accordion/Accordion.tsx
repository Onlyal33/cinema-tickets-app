'use client';
import Image from 'next/image';
import { useState } from 'react';

import styles from './Accordion.module.css';
interface AccordionItem {
  header: string;
  text: string;
  id: number;
}
interface AccordionItemProps {
  header: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const Accordion = function Accordion({ items }: { items: AccordionItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className={styles.questionsContainer}>
      {items.map(({ header, text, id }) => (
        <Accordion.Item
          key={id}
          isActive={id === activeId}
          onClick={() => setActiveId(id === activeId ? null : id)}
          header={header}
          text={text}
        ></Accordion.Item>
      ))}
    </div>
  );
};

Accordion.Item = function AccordionItem({
  header,
  text,
  isActive,
  onClick,
}: AccordionItemProps) {
  return (
    <div className={styles.questionContainer} onClick={onClick}>
      <div className={styles.questionContainer2}>
        <div className={styles.questionContainer3}>
          <div className={styles.questionContainer4}>
            <h2 className={styles.questionText}>{header}</h2>
            {isActive && <span className={styles.answerText}>{text}</span>}
          </div>
          {isActive ? (
            <Image
              src="/arrowUp.svg"
              alt="Arrow Up Icon"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/arrowDown.svg"
              alt="Arrow Down Icon"
              width={32}
              height={32}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
