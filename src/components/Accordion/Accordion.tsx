'use client';
import { useState } from 'react';
import AccordionItem from './AccordionItem';
import styles from './Accordion.module.css';

interface AccordionItems {
  header: string;
  text: string;
  id: number;
};

export default function Accordion({ items }: { items: AccordionItems[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className={styles.questionsContainer}>
      {items.map(({ header, text, id }) => (
        <AccordionItem
          key={id}
          isActive={id === activeId}
          onClick={() => setActiveId(id === activeId ? null : id)}
          header={header}
          text={text}
        ></AccordionItem>
      ))}
    </div>
  );
}
