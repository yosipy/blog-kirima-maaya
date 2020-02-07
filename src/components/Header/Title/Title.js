// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Title.module.scss';

type Props = {
  title: string
};

const Title = ({ title }: Props) => (
  <div>
    <Link to={'/'}>
      <div  className={styles['title']}>
        {title}
      </div>
    </Link>
  </div>
);

export default Title;
