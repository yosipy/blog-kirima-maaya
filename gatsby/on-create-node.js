'use strict';

const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images'); //for Netlify CMS

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); //for Netlify CMS

  if (node.internal.type === 'MarkdownRemark') {

    // post
    if (node.frontmatter.template === 'post'){
      const dirname = getNode(node.parent).relativeDirectory; // 'posts'
      let permalink;

      //let markdown_filename = _.kebabCase( createFilePath({ node, getNode ,basePath: 'posts/'}) ); //ex: /2020-02-21-19-56-00-title/
      let markdown_filename = createFilePath({ node, getNode ,basePath: 'posts/'}) ; //ex: /2020-02-21-19-56-00---title/
      markdown_filename = markdown_filename.replace(/\//g, ''); // スラッシュ削除
      markdown_filename = markdown_filename.split("---");
      let publish_date = markdown_filename[0].split("-");

      if(publish_date.length === 6){
        if( isFinite(Number(publish_date.join(''))) ){
          permalink = publish_date.join('');
        }
        else{
          permalink = undefined;
        }
      }else{
        permalink = undefined;
      }


      if (typeof permalink !== 'undefined'){
        createNodeField({
          node,
          name: 'slug',
          value: '/' + dirname + '/' + permalink
        });
      }else{
        const value = _.kebabCase( createFilePath({ node, getNode }) );
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
