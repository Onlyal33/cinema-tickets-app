'use client'

import Image from 'next/image';

import styles from './Movies.module.css';

function Cover({
  src,
  priority
}: {
  src: string;
  priority: boolean;
}) {
  return (<Image
          fill
          priority={priority}
          alt="Cover"
          src={src}
          className={styles.movieCover}
          sizes="100px"
        ></Image>)
};

export default Cover;
