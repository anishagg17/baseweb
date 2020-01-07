/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Card} from '../index.js';
import {header as headerImg, thumbnail as thumbnailImg} from '../images.js';

test('Card - basic functionality', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    headerImage: headerImg,
    thumbnail: thumbnailImg,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders title, header image, thumbnail and action
  expect(wrapper.find('img')).toHaveLength(2);
});

test('Card - img srcset', () => {
  const headerImageSrcSet =
    'https://source.unsplash.com/user/erondu/500x200, https://source.unsplash.com/user/erondu/600x300 1.5x';
  const props = {
    headerImage: headerImg,
    headerImageSrcSet,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);
  // Renders title, header image with srcset prop
  expect(wrapper.find('img').prop('srcSet')).toEqual(headerImageSrcSet);
});

test('Card - img alt', () => {
  const headerImageAlt = 'Card Alt Desc';
  const props = {
    headerImage: '#',
    headerImageAlt,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders title and header image with alt prop
  expect(wrapper.find('img').prop('alt')).toEqual(headerImageAlt);
});

test('Card - no images', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders title and action without images
  expect(wrapper.find('img')).toHaveLength(0);
});
