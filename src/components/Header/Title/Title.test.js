// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Title from './Title';

describe('Title', () => {
  const props = {
    title: [
      {
        label: 'Item 0',
        path: '/#0/'
      },
      {
        label: 'Item 1',
        path: '/#1/'
      }
    ]
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Title {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
