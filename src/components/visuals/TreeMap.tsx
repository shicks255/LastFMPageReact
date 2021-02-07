/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import useLastFmApi from '../../hooks/useLasftFmApi';
import Loader from '../Loader';

type Props = {
  name: string,
  keyy: string,
  value: string,
}

const TreeMap: React.FC<Props> = ((props: Props) => {
  const {
    name, keyy, value,
  } = props;

  const { topArtistsQuery, topAlbumsQuery } = useLastFmApi();

  const query = name === 'Albums' ? topAlbumsQuery : topArtistsQuery;

  if (query.isLoading) return <Loader small={false} />;

  const data = name === 'Albums' ? query.data.album : query.data.artist;

  const dataPoints = data.map((item) => {
    if (name === 'Albums') {
      return {
        name: `${item.artist.name} - ${item[keyy]}`,
        value: item[value],
      };
    }
    return {
      name: item[keyy],
      value: item[value],
    };
  });

  const treeData = {
    name,
    color: 'hsl(201, 70%, 50%)',
    children: dataPoints,
  };

  function trimName(node): string {
    const { id, height, width } = node;

    const labelRotation = (height > width) ? -90 : 0;

    let textTrim = 10;
    if (labelRotation === 0) { textTrim = width / 10; }
    if (labelRotation === -90) { textTrim = height / 10; }

    if (id.length > textTrim) { return id.slice(0, textTrim); }
    return id;
  }

  return (
  // <div className="column is-full has-text-centered">
    <div style={{ height: '350px', fontWeight: 'bold' }}>
      <span style={{ color: '#eee' }}>
        {name}
        {' '}
        Heat Map
      </span>
      <ResponsiveTreeMap
        data={treeData}
        identity="name"
        value="value"
        colors={{
          scheme: 'accent',
        }}
        nodeOpacity={0.75}
          // @ts-ignore
        label={(node) => trimName(node)}
        margin={{
          top: 10, right: 10, bottom: 10, left: 10,
        }}
        labelSkipSize={45}
        labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
        parentLabelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
      />
    </div>
  // </div>
  );
});

export default TreeMap;
