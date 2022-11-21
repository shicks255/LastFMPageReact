/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { ResponsiveTreeMap } from '@nivo/treemap';
import { cColors } from 'utils';

import Loader from '../common/Loader';
import NoData from '../common/NoData';
import { useApiState } from '@/contexts/ApiContext';
import useTopAlbums from '@/hooks/api/lastFm/useTopAlbums';
import useTopArtists from '@/hooks/api/lastFm/useTopArtists';

interface IProps {
  name: string;
  keyy: string;
  value: string;
}

const TreeMap: React.FC<IProps> = (props: IProps) => {
  const { name, keyy, value } = props;

  const { timeFrame, page } = useApiState();

  const topAlbums = useTopAlbums(timeFrame, page);
  const topArtists = useTopArtists(timeFrame, page);

  if (name === 'Albums' && topAlbums.isLoading) {
    return <Loader />;
  }
  if (name === 'Artists' && topArtists.isLoading) {
    return <Loader />;
  }

  let data;
  if (name === 'Albums') {
    data = topAlbums.data?.topalbums.album;
  } else {
    data = topArtists.data?.topartists.artist;
  }

  const dataPoints = data.map((item) => {
    if (name === 'Albums') {
      return {
        name: `${item.artist.name} - ${item[keyy]}`,
        value: item[value]
      };
    }
    return {
      name: item[keyy],
      value: item[value]
    };
  });

  const treeData = {
    name: '',
    children: dataPoints
  };

  function trimName(node): string {
    const { id, height, width } = node;

    const labelRotation = height > width ? -90 : 0;

    let textTrim = 10;
    if (labelRotation === 0) {
      textTrim = width / 10;
    }
    if (labelRotation === -90) {
      textTrim = height / 10;
    }

    if (id.length > textTrim) {
      return id.slice(0, textTrim);
    }
    return id;
  }

  const colors = [...cColors];
  colors.unshift('#e5e7eb');

  return (
    <div style={{ height: '350px', fontWeight: 'bold' }}>
      <div className="text-left text-2xl font-semibold pl-4">{name}</div>
      {(treeData.children as unknown[]).length === 0 ? (
        <NoData />
      ) : (
        <ResponsiveTreeMap
          data={treeData}
          identity="name"
          value="value"
          colors={colors}
          nodeOpacity={0.75}
          // @ts-ignore
          label={(node) => trimName(node)}
          margin={{
            top: 0,
            right: 10,
            bottom: 10,
            left: 10
          }}
          labelSkipSize={45}
          labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
          parentLabelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
          borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
          // tooltip={(node) => {
          //   return (
          //     <>
          //       {node.node.label}: {formatNumber(node.node.formattedValue)}
          //     </>
          //   );
          // }}
        />
      )}
    </div>
  );
};

export default TreeMap;
