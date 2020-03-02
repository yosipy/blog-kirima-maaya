// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import MainAndSide from '../components/MainAndSide';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark, AllMarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark,
    allMarkdownRemark: AllMarkdownRemark
  }
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { tableOfContents, frontmatter } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage, series, seriesNumber } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Header isIndex />
      <MainAndSide>
        <Post post={data.markdownRemark} edges={edges}/>
        <Sidebar isIndex />
      </MainAndSide>
      <Footer />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!, $series: String ) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
      fields {
        slug
        tagSlugs
        thumbnail{
          childImageSharp {
            fluid(maxWidth: 640) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
        series
        seriesNumber
      }
    }

    allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true }, series: { eq: $series, ne: null } } },
        sort: { order: ASC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            series
            seriesNumber
          }
        }
      }
    }


  }
`;

export default PostTemplate;
