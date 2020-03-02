// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Footer.module.scss';
import { useSiteMetadata, useCategoriesList } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Footer = ({ isIndex }: Props) => {
  const { title, author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles['footer']}>
      <div className={styles['footer__inner']}>
        <Link to="/pages/privacy-policy">
          <div className={styles['footer__inner__item']}>プライバシーポリシー</div>
        </Link>
        <Link to="/pages/contact-me">
          <div className={styles['footer__inner__item']}>Contact me</div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
