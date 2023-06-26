import { selectTotalAmount } from '@/redux/features/cart/selector';
import { useAppSelector } from '@/redux/hooks';

import styles from './TotalTickets.module.css';

export default function TotalTickets({
  formatted = false,
}: {
  formatted?: boolean;
}) {
  const ticketsCounter = useAppSelector(selectTotalAmount);

  if (!formatted) {
    return ticketsCounter;
  }

  if (ticketsCounter === 0) {
    return null;
  }

  return (
    <div className={styles.ticketsCountContainer}>
      <span className={styles.ticketsCounter}>{ticketsCounter}</span>
    </div>
  );
}
