// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node, Edges } from '../../types';

type Props = {
  post: Node,
  edges: Edges
};

const Post = ({ post, edges }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const { thumbnail } = post.fields.thumbnail;

  return (
    <div className={styles['post']}>

      <div className={styles['post__content']}>
        <Img fluid={post.fields.thumbnail.childImageSharp.fluid} />
        <Content body={html} title={title} edges={edges} post={post} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
