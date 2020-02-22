// @flow strict
import React from 'react';
import MainAndSide from '../components/MainAndSide';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Header isIndex />
      <MainAndSide>
        <Page title="NOT FOUND">
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Page>
        <Sidebar />
      </MainAndSide>
      <Footer />
    </Layout>
  );
};

export default NotFoundTemplate;
