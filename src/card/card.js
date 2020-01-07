/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* @flow */

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Root as StyledRoot,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
} from './styled-components.js';

import type {CardsPropsT} from './types.js';

export function hasThumbnail(props: {+thumbnail?: string}) {
  return !!props.thumbnail;
}

function Card(props: CardsPropsT) {
  const {
    action,
    children,
    hasThumbnail,
    headerImage: headerImageSrc,
    headerImageAlt,
    headerImageSrcSet,
    thumbnail: thumbnailSrc,
    title,
    overrides,
    ...restProps
  } = props;

  const {
    Action: ActionOverride,
    Body: BodyOverride,
    Contents: ContentsOverride,
    HeaderImage: HeaderImageOverride,
    Root: RootOverride,
    Thumbnail: ThumbnailOverride,
    Title: TitleOverride,
  } = overrides;

  const [Action, actionProps] = getOverrides(ActionOverride, StyledAction);
  const [Body, bodyProps] = getOverrides(BodyOverride, StyledBody);
  const [Contents, contentsProps] = getOverrides(
    ContentsOverride,
    StyledContents,
  );
  const [HeaderImage, headerImageProps] = getOverrides(
    HeaderImageOverride,
    StyledHeaderImage,
  );
  const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
  const [Thumbnail, thumbnailProps] = getOverrides(
    ThumbnailOverride,
    StyledThumbnail,
  );
  const [Title, titleProps] = getOverrides(TitleOverride, StyledTitle);

  const $hasThumbnail = hasThumbnail(props);
  return (
    <Root data-baseweb="card" {...restProps} {...rootProps}>
      {headerImageSrc && (
        <HeaderImage
          alt={headerImageAlt}
          src={headerImageSrc}
          srcSet={headerImageSrcSet}
          {...headerImageProps}
        />
      )}
      <Contents {...contentsProps}>
        {thumbnailSrc && <Thumbnail src={thumbnailSrc} {...thumbnailProps} />}
        {title && (
          <Title $hasThumbnail={$hasThumbnail} {...titleProps}>
            {title}
          </Title>
        )}
        <Body {...bodyProps}>{children}</Body>
        {action && <Action {...actionProps}>{action}</Action>}
      </Contents>
    </Root>
  );
}

Card.defaultProps = {
  action: null,
  children: null,
  hasThumbnail,
  overrides: {},
};

export default Card;
