// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import Title from './Title';
import styles from './Header.module.scss';
import { useSiteMetadata, useCategoriesList } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Header = ({ isIndex }: Props) => {
  const { title, author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles['header']}>
      <div className={styles['header__inner']}>
        <Title title={title} />
        <Menu menu={menu} />
      </div>
    </div>
  );
};

export default Header;
