// @flow strict
import React from 'react';
import moment from 'moment';
import 'moment/locale/ja';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>
          <div className={styles['feed__thumbnail']}>
            <div className={styles['feed__thumbnail__inner']}></div>
            <Img fluid={edge.node.fields.thumbnail.childImageSharp.fluid} />
          </div>
          <div className={styles['feed__item-title-and-meta']}>
            <h2 className={styles['feed__item-title']}>
              {edge.node.frontmatter.title}
            </h2>
            <div className={styles['feed__item-meta']}>
              <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('YYYY-MM-DD')}>
                {moment(edge.node.frontmatter.date).locale('ja').format('LLL')}
              </time>
              <span className={styles['feed__item-meta-divider']} />
              <span className={styles['feed__item-meta-category']}>
              <object><Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link></object>
              </span>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
