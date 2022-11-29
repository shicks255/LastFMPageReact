// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useContext, useState } from 'react';

import { ResponsivePie } from '@nivo/pie';
import {
  cColors,
  generateCalendarChart2,
  generateLineChart,
  generatePieChart,
  getDateRangeFromTimeFrame,
  getTimeGroupFromTimeFrame,
  years
} from 'utils';

import NoData from '../common/NoData';
import TimeFrameSelect from '../common/TimeFrameSelect';
import CalendarChart from './charts/CalendarChart';
import LineChart from './charts/LineChart';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';
import useSuggestArtist from '@/hooks/api/musicApi/useSuggestArtist';
import useIsMobile from '@/hooks/useIsMobile';

const ItemGraph = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('7day');
  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

  const [artist, setArtist] = useState<string | undefined>(undefined);

  const [search, setSearch] = useState('');

  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const [timeFrame2, setTimeFrame2] = useState(new Date().getFullYear().toString());
  const year = years[timeFrame2];
  //   const chartData2 = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);
  const chartData2 = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    'DAY',
    year[0],
    year[1],
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const chartData3 = useScrobblesArtistOrAlbumGrouped(
    'albumsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const chart3 = generatePieChart(chartData3);

  const isMobile = useIsMobile();

  const response = useSuggestArtist(state.userName, search);

  const chart2 = generateCalendarChart2(chartData2);

  const currentYear = new Date().getFullYear();
  const timeFrameSelects = Object.keys(years)
    .filter((year) => year <= `${currentYear}`)
    .map((key) => (
      <option value={key} key={key}>
        {key}
      </option>
    ));

  const lineChartData = generateLineChart(scrobbles, timeFrame, 'artist');

  const handleClick = (item: string) => {
    setArtist(item);
    setSearch('');
  };

  const boxHeight = isMobile ? '900px' : '350px';

  const margin = {
    top: 30,
    bottom: 25,
    right: 50,
    left: 50
  };

  const mobileMargin = {
    top: 30,
    bottom: 25,
    right: 150,
    left: 150
  };

  return (
    <>
      <div>
        <div className="bg-gray-200 p-4">
          <input onChange={(e) => setSearch(e.target.value)} placeholder="Artist" value={search} />
          <br />
          {response.data?.map((item) => {
            return (
              <div
                key={item}
                className="cursor-pointer hover:bg-slate-300"
                onClick={() => handleClick(item)}
              >
                {item}
                <br />
              </div>
            );
          })}
        </div>
        {!artist && <>Select an artist</>}
        {artist && (
          <>
            <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
              <VisualTitle title={`${artist} Scrobbles`} />
              <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
              {lineChartData.length === 0 && <NoData />}
              {lineChartData && <LineChart chartData={lineChartData} timeFrame={timeFrame} />}
            </div>
            <div
              className="relative mt-4 pl-4 pr-4"
              style={{ height: '500px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Album Pie Chart" />
              <ResponsivePie
                data={chart3}
                margin={isMobile ? mobileMargin : margin}
                colors={cColors}
                animate
                activeOuterRadiusOffset={8}
                arcLinkLabelsColor={{
                  from: 'color'
                }}
              />
            </div>
            <div>
              <div
                className="mb-12 mt-32 pl-4 pr-4"
                style={{ height: boxHeight, fontWeight: 'bold' }}
              >
                <VisualTitle title="Scrobble Calendar" />
                <div>
                  <div>
                    <select
                      className="px-3 py-1.5 md:w-32 w-full
                rounded border border-solid
                border-gray-300 transition ease-in-out bg-white"
                      value={timeFrame2}
                      onChange={(event) => setTimeFrame2(event.target.value)}
                    >
                      {timeFrameSelects}
                    </select>
                  </div>
                </div>
                {chart2 && <CalendarChart from={year[2]} to={year[1]} chartData={chart2} />}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemGraph;
