'use strict';

const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images'); //for Netlify CMS
/*const moment= require('moment');
require('moment/locale/ja');*/

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); //for Netlify CMS

  /*if (node.internal.type === 'MarkdownRemark') {
    // post
    const momentJP = moment(node.frontmatter.date).locale('ja');
    const dateJP = momentJP.format('L') + '-' + momentJP.format('LT');
    createNodeField({
      node,
      name: 'slug',
      value: '/posts/' + _.kebabCase(dateJP).replace(/[^0-9]/g,'')
    });
  }*/
  if (node.internal.type === 'MarkdownRemark') {

    // post
    if (node.frontmatter.template === 'post'){
      const dirname = getNode(node.parent).relativeDirectory; // '/posts'
      if (typeof node.frontmatter.date !== 'undefined'){
        const permalink = _.kebabCase(node.frontmatter.date).replace(/[^0-9]/g,'')
        createNodeField({
          node,
          name: 'slug',
          value: '/' + dirname + '/' + permalink
        });
      }else{
        const value = createFilePath({ node, getNode });
        createNodeField({
          node,
          name: 'slug',
          value
        });
      }

    }

    // page
    if (node.frontmatter.template === 'page'){
      const dirname = getNode(node.parent).relativeDirectory; // '/pages'
      if (typeof node.frontmatter.slug !== 'undefined') {
        createNodeField({
          node,
          name: 'slug',
          value: '/'+ dirname + '/' + node.frontmatter.slug
        });
      }else{
        const value = createFilePath({ node, getNode });
        createNodeField({
          node,
          name: 'slug',
          value
        });
      }
    }

    // tag
    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tag/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    // category
    if (node.frontmatter.category) {
      const categorySlug = `/category/${_.kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }

    // thumbnail
    if (node.frontmatter.socialImage) {
      const thumbnailPath = "../../static" + node.frontmatter.socialImage; //for Netlify CMS
      createNodeField({
        node,
        name: 'thumbnail',
        value: thumbnailPath
      });
    }


  }
};

module.exports = onCreateNode;
