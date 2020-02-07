// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styles from './Menu.module.scss';
import { useSiteMetadata, useCategoriesList } from '../../../hooks';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu }: Props) => {
  const categories = useCategoriesList();

  return (
    <nav className={styles['menu']}>
      <ul className={styles['menu__list']}>
        {categories.map((category) => (
          <li
            key={category.fieldValue}
            className={styles['menu__list-item']}
          >
            <Link
              to={`/category/${kebabCase(category.fieldValue)}/`}
              className={styles['menu__list-item-link']}
              activeClassName={styles['menu__list-item-link--active']}
            >
              {category.fieldValue}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

};

export default Menu;