// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Content.module.scss';
import type { Node, Edges } from '../../../types';

type Props = {
  body: string,
  title: string,
  edges: Edges,
  post: Node
};

const Content = ({ body, title, edges, post }: Props) => {
  const Series = (() => {
    if(post.frontmatter.series !== null && post.frontmatter.series !== '' && typeof post.frontmatter.series !== 'undefined'){
      return(
        <div className={styles['content__series']} >
          <div className={styles['content__series-title']} >連載一覧 : {post.frontmatter.series}</div>
          <ul>{console.log(post.frontmatter.title)}
          {edges.map((edge) => (
            <Link 
              className={post.frontmatter.title !== edge.node.frontmatter.title ? styles['content__series-link'] : styles['content__series-link-select'] }
              to={edge.node.fields.slug} 
              key={edge.node.frontmatter.seriesNumber} 
            >
              <div className={styles['content__series-wrap']}>
                <li className={styles['content__series-post-title']} >第{edge.node.frontmatter.seriesNumber}回 {edge.node.frontmatter.title}</li>
              </div>
            </Link>
          ))}
          </ul>
        </div>
      )
    }
  })()

  const Toc = (() => {
    return(
      <div　className={styles['content__toc']}>
        <div>目次</div>
        <div 
          dangerouslySetInnerHTML=
            {{ 
              __html: post.tableOfContents
            }} 
        />
      </div>
    )
  })()

  return(
    <div className={styles['content']}>
      <h1 className={styles['content__title']}>{title}</h1>
      {Series}
      {Toc}
      <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
      {Series}
    </div>
  );
};

export default Content;
