// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './MainAndSide.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage? :string
};

const MainAndSide = ({
  children,
  title,
  description,
  socialImage
}: Props) => {
  return (
    <div className={styles['main_and_side']}>
      {children}
    </div>
  );
};

export default MainAndSide;
