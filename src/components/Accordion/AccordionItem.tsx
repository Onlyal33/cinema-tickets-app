import Image from 'next/image';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  header: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export default function AccordionItem({
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
}
