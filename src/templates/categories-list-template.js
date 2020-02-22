// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import MainAndSide from '../components/MainAndSide';
import Header from '../components/Header';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';

const CategoriesListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Header isIndex />
      <MainAndSide>
        <Page title="Categories">
          <ul>
            {categories.map((category) => (
              <li key={category.fieldValue}>
                <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                  {category.fieldValue} ({category.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Page>
        <Sidebar />
      </MainAndSide>
      <Footer />
    </Layout>
  );
};

export default CategoriesListTemplate;
