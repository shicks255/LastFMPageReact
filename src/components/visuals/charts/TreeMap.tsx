import React from 'react';

import { ResponsiveTreeMap } from '@nivo/treemap';
import { cColors } from 'utils';

interface IProps {
  chartData: ITreeChartItem[];
}

interface ITreeChartItem {
  name: string;
  value: number;
}

const TreeMap: React.FC<IProps> = ({ chartData }: IProps) => {
  const treeData = {
    name: '',
    children: chartData
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
    <ResponsiveTreeMap
      data={treeData}
      identity="name"
      value="value"
      colors={colors}
      nodeOpacity={0.75}
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
  );
};

export default TreeMap;
