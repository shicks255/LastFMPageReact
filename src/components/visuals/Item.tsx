// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

import Loader from '../common/Loader';
import NoData from '../common/NoData';
import TimeFrameSelect from '../common/TimeFrameSelect';
import CalendarChart from './charts/CalendarChart';
import LineChart from './charts/LineChart';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useArtistStats from '@/hooks/api/musicApi/useArtistStats';
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

  const artistStats = useArtistStats(state.userName, artist || '');

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

  const dateThing = (time: string): string => {
    const unixDate = new Date(Number(time) * 1000);
    return unixDate.toDateString();
  };

  return (
    <>
      <div>
        <div className="bg-gray-200 p-4">
          <input onChange={(e) => setSearch(e.target.value)} placeholder="Artist" value={search} />
          <br />
          {!artist && <>Select an artist</>}
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
        {artistStats.isLoading && <Loader />}
        {artist && <VisualTitle title={artist} />}
        {artistStats.data && (
          <div className="mb-12 mt-4 pl-4 pr-4 ${}">
            <div>
              <button
                disabled={!artistStats.data.previousArtist}
                onClick={() => setArtist(artistStats.data.previousArtist)}
              >
                {artistStats.data.previousArtist ? (
                  <img
                    alt=""
                    className="h-6 inline"
                    src={`${process.env.PUBLIC_URL}/skip-back.svg`}
                  />
                ) : (
                  <img
                    alt=""
                    className="h-6 inline"
                    src={`${process.env.PUBLIC_URL}/skip-back-disabled.svg`}
                  />
                )}
              </button>
            </div>
            <div>
              <button onClick={() => setArtist(artistStats.data.nextArtist)}>
                <img
                  alt=""
                  className="h-6 inline"
                  src={`${process.env.PUBLIC_URL}/skip-forward.svg`}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 content-center gap-4">
              <div className="bg-red-200 flex items-center justify-center">
                <div className="font-semibold">Rank</div>
                {artistStats.data.rank}
              </div>
              <div className="bg-red-300 text-center items-center justify-center p-2">
                <div className="font-semibold flex-none">First Play</div>
                <div>
                  {artistStats.data.firstPlay[0]}
                  <br />
                  <p className="italic">{artistStats.data.firstPlay[1]}</p>
                </div>
                {dateThing(artistStats.data.firstPlay[2])}
              </div>
              <div className="bg-red-400 text-center items-center justify-center p-2">
                <div className="font-semibold">Last Play</div>
                <div>
                  {artistStats.data.mostRecent[0]}
                  <br />
                  <p className="italic">{artistStats.data.mostRecent[1]}</p>
                </div>
                {dateThing(artistStats.data.mostRecent[2])}
              </div>
              <div className="bg-red-500 text-center col-span-2 items-center justify-center p-2">
                <div className="font-semibold">Top Songs</div>
                {artistStats.data.topFive.map((item) => {
                  return (
                    <div key={item[1]}>
                      {item[1]} - {item[0]} plays
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {artist && (
          <>
            <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
            <div
              className="mb-12 mt-4 pl-4 pr-4"
              style={{ height: lineChartData.length > 0 ? '500px' : '100px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Scrobbles Line Chart" />
              {lineChartData && <LineChart chartData={lineChartData} timeFrame={timeFrame} />}
            </div>
            <div
              className="relative mt-4 pl-4 pr-4"
              style={{ height: chart3.length > 0 ? '500px' : '100px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Album Pie Chart" />
              {chart3.length === 0 && <NoData />}
              {chart3.length > 0 && (
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
              )}
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
