import React from 'react';

import { noImageUrl } from 'utils';

import HoverImage from './HoverImage';
import Loader from './Loader';
import useArtistImage from '@/hooks/api/useArtistImage';

interface IProps {
  mbid: string;
  artistName: string;
}

const ArtistImage: React.FC<IProps> = (props: IProps) => {
  const { mbid, artistName } = props;
  const { isLoading, data } = useArtistImage(mbid, artistName);

  if (isLoading) return <Loader small />;
  const src = data ?? noImageUrl;

  return <HoverImage src={src} popupSrc={src} caption={artistName} />;
};

export default ArtistImage;
