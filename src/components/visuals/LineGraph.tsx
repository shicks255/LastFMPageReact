import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Track } from '../../types/Track';
import { chartColors, getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame } from '../../utils';
import TimeFrameSelect from '../TimeFrameSelect';
import { LocalStateContext } from '../../contexts/LocalStateContext';

type Props = {
  recentTracks: Track[]
}

const LineGraph: React.FC<Props> = ((props: Props): JSX.Element => {
  function trimName(name) {
    if (name.length > 20) { return `${name.slice(0, 20)}...`; }
    return name;
  }

  const { state, actions } = useContext(LocalStateContext);
  const [resourceType, setResourceType] = useState<string>('album');
  const [trackz, setTrackz] = useState(undefined);
  const [timeFrame, setTimeFrame] = useState('7day');
  const [format1, setFormat1] = useState('%Y-%m-%d');
  const [precision, setPrecision] = useState<'day' | 'month' | 'year'>('day');
  const [tickValues, setTickValues] = useState('every 1 day');
  const [bottomXFormat, setBottomXFormat] = useState('%b %d');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (timeFrame === '7day' || timeFrame === '1month') setBottomXFormat('%b %d');
    if (timeFrame === '3month') setBottomXFormat('%b %Y');
    if (timeFrame === '6month' || timeFrame === '12month') setBottomXFormat('%b %Y');
    if (timeFrame === '1year' || timeFrame === 'overall') setBottomXFormat('%Y');

    if (timeFrame === '7day' || timeFrame === '1month') setFormat1('%Y-%m-%d');
    if (timeFrame === '3month') setFormat1('%Y-%m');
    if (timeFrame === '6month' || timeFrame === '12month') setFormat1('%Y-%m');
    if (timeFrame === '1year' || timeFrame === 'overall') setFormat1('%Y');

    if (timeFrame === '7day' || timeFrame === '1month') setPrecision('day');
    if (timeFrame === '3month') setPrecision('month');
    if (timeFrame === '6month' || timeFrame === '12month') setPrecision('month');
    if (timeFrame === '1year' || timeFrame === 'overall') setPrecision('year');

    if (timeFrame === '7day' || timeFrame === '1month') setTickValues('every 1 day');
    if (timeFrame === '3month') setTickValues('every 1 month');
    if (timeFrame === '6month' || timeFrame === '12month') setTickValues('every 1 month');
    if (timeFrame === '1year' || timeFrame === 'overall') setTickValues('every 1 year');
    const [start, end] = getDateRangeFromTimeFrame(timeFrame);
    const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

    const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
    fetch(`https://musicapi.shicks255.com/api/v1/scrobbles/${resource}?userName=${state.userName}&from=${start}&to=${end}&timeGroup=${timeGroup}&empties=true&limit=12`)
      .then((res) => res.json())
      .then((res) => {
        setTrackz(res);
        setLoading(false);
      });
  }, [timeFrame, resourceType]);

  const { recentTracks } = props;

  if (!trackz) {
    return <></>;
  }

  if (loading) {
    return <></>;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const chartNew = trackz.data.map((item) => {
    // eslint-dot-notation
    const id = resourceType === 'artist' ? item.artistName : item.albumName;
    const dataPoints = item.data;

    const dd = dataPoints
      .sort((dp1, dp2) => {
        if (dp1.timeGroup > dp2.timeGroup) return 1;

        return -1;
      })
      .map((dp) => ({
        x: dp.timeGroup,
        y: dp.plays,
      }));

    return {
      id,
      data: dd,
    };
  });

  const theme = {
    textColor: '#eee',
    axis: {
      domain: {
        line: {
          stroke: '#eee',
        },
      },
    },
  };

  return (
    <div className="column is-full has-text-centered ">
      <div style={{ height: '350px', fontWeight: 'bold', minWidth: 0 }}>
        <section className="mainContent">
          <TimeFrameSelect
            timeFrameSelected={timeFrame}
            onChange={(e: string) => setTimeFrame(e)}
          />
          <select onChange={(e) => setResourceType(e.target.value)}>
            <option value="album" key="album" selected={resourceType === 'album'}>Albums</option>
            <option value="artist" key="artist" selected={resourceType === 'artist'}>Artists</option>
          </select>
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Plays Line Chart</h1>
        </section>
        <ResponsiveLine
          data={chartNew}
          margin={{
            top: 50, right: 150, left: 50, bottom: 50,
          }}
          theme={theme}
          enableGridX={false}
          enableGridY={false}
          enableSlices="x"
          sliceTooltip={(e) => {
            const rows = e.slice.points
              .filter((v) => v.data.y > 0)
              .sort((x, y) => {
                if (x.data.y > y.data.y) { return -1; }
                return 1;
              })
              .map((p) => (
                <tr className="sliceTooltipTable" key={p.id}>
                  <td style={{ color: p.serieColor }}>
                    {trimName(p.serieId)}
                  </td>
                  <td>{p.data.y}</td>
                </tr>
              ));

            return (
              <table>
                <tbody>
                  {rows}
                </tbody>
              </table>
            );
          }}
          isInteractive
          colors={chartColors}
          lineWidth={3}
          pointSize={10}
          xScale={{
            type: 'time',
            format: format1,
            useUTC: false,
            precision,
            stacked: true,
          }}
          // xFormat="time:%m/%d/%Y"
          yScale={{
            type: 'linear',
            min: 0,
            // max: 30,
          }}
          axisLeft={{
            legend: 'Listens',
            legendOffset: -35,
            legendPosition: 'middle',
          }}
          axisBottom={{
            format: bottomXFormat,
            tickValues,
            tickRotation: -75,
          }}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 125,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 4,
              itemTextColor: '#999',
            },
          ]}
        />
      </div>
    </div>
  );
});

export default LineGraph;
