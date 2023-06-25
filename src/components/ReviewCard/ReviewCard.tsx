import Image from 'next/image';
import styles from './ReviewCard.module.css';

export interface ReviewInfo {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export default function ReviewCard({
  data: { name, text, rating },
}: {
  data: ReviewInfo;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.userPicContainer}>
          <Image
            className={styles.userPic}
            src="/userpicDefault.svg"
            alt="Default Reviewer Portrait"
            width={32}
            height={32}
          />
        </div>
        <div className={styles.reviewDataContainer}>
          <div className={styles.reviewData}>
            <div className={styles.reviewHeaderContainer}>
              <span className={styles.reviewAuthor}>{name}</span>
              <div className={styles.reviewRatingContainer}>
                <span className={styles.reviewRatingHeader}>Оценка:</span>
                <span className={styles.reviewRating}>{rating}</span>
              </div>
            </div>
            <div className={styles.reviewTextContainer}>
              <span className={styles.reviewText}>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
