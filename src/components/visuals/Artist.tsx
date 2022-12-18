// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useContext, useRef, useState } from 'react';

import { ResponsivePie } from '@nivo/pie';
import {
  cColors,
  formatNumber,
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
import VisualTitle from '../common/VisualTitle';
import UserYearSelect from '../common/YearSelect';
import CalendarChart from './charts/CalendarChart';
import LineChart from './charts/LineChart';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useArtistStats from '@/hooks/api/musicApi/useArtistStats';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';
import useSuggestArtist from '@/hooks/api/musicApi/useSuggestArtist';
import useClickOutside from '@/hooks/useClickOutside';
import useIsMobile from '@/hooks/useIsMobile';

interface IStatItemProps {
  title: string;
  children: React.ReactNode;
  noFlex?: boolean;
  colSpan?: number;
}

const StatItem: React.FC<IStatItemProps> = ({
  title,
  noFlex,
  colSpan,
  children
}: IStatItemProps) => {
  return (
    <div
      className={`${
        noFlex ? 'flex-col' : 'flex-col'
      } bg-sky-900 min-h-[55px] p-2 rounded text-gray-200 text-center justify-center align-middle ${
        colSpan ? `sm;col-span-${colSpan}` : ''
      }`}
    >
      <div className={`font-semibold text-lg`}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

const ArtistStats = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('7day');
  const { start, end } = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  useClickOutside(searchRef, () => setSearch(''));
  const [timeFrame2, setTimeFrame2] = useState(new Date().getFullYear().toString());
  const isMobile = useIsMobile();

  const lineChartData = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );
  const lineChart = generateLineChart(lineChartData, timeFrame, 'artist');

  const pieChartData = useScrobblesArtistOrAlbumGrouped(
    'albumsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );
  const pieChart = generatePieChart(pieChartData);

  const artistStats = useArtistStats(state.userName, encodeURIComponent(artist || ''));

  const response = useSuggestArtist(state.userName, search);

  const calendarChartData = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    'DAY',
    years[timeFrame2][0],
    years[timeFrame2][1],
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const calendarChart = generateCalendarChart2(calendarChartData);

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
      <div className="mt-4 pl-4 pr-4">
        <VisualTitle title="Artist Stats" />
        <div className="bg-gray-200 mb-2" ref={searchRef}>
          <input
            className="px-3 py-1.5"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for an artist"
            value={search}
          />
          <br />
          {response && search && (
            <div className="border-2 shadow-lg max-h-40 overflow-auto w-80 font-semibold absolute">
              {response.data?.map((item) => {
                return (
                  <div
                    key={item}
                    className="cursor-pointer px-2 py-1 odd:bg-gray-300 even:bg-slate-300 hover:bg-sky-900 hover:text-gray-200"
                    onClick={() => handleClick(item)}
                  >
                    {item}
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {artistStats.isLoading && <Loader />}
        {artist && artistStats.data && (
          <>
            <div className="flex items-center mb-2">
              <div className="pr-2">
                <button
                  disabled={!artistStats.data.previousArtist}
                  onClick={() => setArtist(artistStats.data.previousArtist)}
                >
                  {artistStats.data.previousArtist ? (
                    <img
                      alt=""
                      className="h-4 inline"
                      src={`${process.env.PUBLIC_URL}/skip-back.svg`}
                    />
                  ) : (
                    <img
                      alt=""
                      className="h-4 inline"
                      src={`${process.env.PUBLIC_URL}/skip-back-disabled.svg`}
                    />
                  )}
                </button>
              </div>
              <div className="text-sky-900">
                <VisualTitle noMargin title={artist} />
              </div>
              <div className="pl-2">
                <button onClick={() => setArtist(artistStats.data.nextArtist)}>
                  <img
                    alt=""
                    className="h-4 inline"
                    src={`${process.env.PUBLIC_URL}/skip-forward.svg`}
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 content-center gap-4 mb-2 justify-center">
              <StatItem title="Rank">{artistStats.data.rank}</StatItem>
              <StatItem title="Plays">{formatNumber(artistStats.data.plays)}</StatItem>
              <StatItem title="First Play" noFlex>
                <div>
                  {artistStats.data.firstPlay[0]}
                  <br />
                  <p className="italic">{artistStats.data.firstPlay[1]}</p>
                </div>
                {dateThing(artistStats.data.firstPlay[2])}
              </StatItem>
              <StatItem title="Last Play" noFlex>
                <div>
                  {artistStats.data.mostRecent[0]}
                  <br />
                  <p className="italic">{artistStats.data.mostRecent[1]}</p>
                </div>
                {dateThing(artistStats.data.mostRecent[2])}
              </StatItem>
              <StatItem title="Top Songs" colSpan={2} noFlex>
                {artistStats.data.topFive.map((item) => {
                  return (
                    <div key={item[1]}>
                      {item[1]} - {item[0]} plays
                    </div>
                  );
                })}
              </StatItem>
            </div>
            <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
            <div
              className="mb-12 mt-4 pl-4 pr-4"
              style={{ height: lineChart.length > 0 ? '500px' : '100px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Scrobbles Line Chart" />
              {lineChart && <LineChart chartData={lineChart} timeFrame={timeFrame} />}
            </div>
            <div
              className="mb-12 mt-4 pl-4 pr-4"
              style={{ height: pieChart.length > 0 ? '500px' : '100px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Album Pie Chart" />
              {pieChart.length === 0 && <NoData />}
              {pieChart.length > 0 && (
                <ResponsivePie
                  data={pieChart}
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
                className="mb-12 mt-4 pl-4 pr-4"
                style={{ height: boxHeight, fontWeight: 'bold' }}
              >
                <VisualTitle title="Scrobble Calendar" />
                <div>
                  <div>
                    <UserYearSelect
                      setYear={setTimeFrame2}
                      year={timeFrame2}
                      userName={state.userName}
                    />
                  </div>
                </div>
                {calendarChart && (
                  <CalendarChart
                    from={years[timeFrame2][2]}
                    to={years[timeFrame2][1]}
                    chartData={calendarChart}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ArtistStats;
