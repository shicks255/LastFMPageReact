import {
  getYearsFromUserYears,
  getDateRangeFromTimeFrame,
  getActualArtistUrl,
  getMusicBrainzId,
  getFanArtImage
} from './utils';

describe('utils tests', () => {
  test('should get years from user years', () => {
    const userYears = ['2005', '2006', '2007'];
    const x = getYearsFromUserYears(userYears);

    console.log(x);
    expect(x.hasOwnProperty(2005)).toBeTruthy();
    expect(x[2005]).toHaveLength(3);
    expect(x[2005]).toStrictEqual(['2005-01-01', '2005-12-31', '2005-01-02']);

    expect(x.hasOwnProperty(2006)).toBeTruthy();
    expect(x[2006]).toHaveLength(3);
    expect(x[2006]).toStrictEqual(['2006-01-01', '2006-12-31', '2006-01-02']);

    expect(x.hasOwnProperty(2007)).toBeTruthy();
    expect(x[2007]).toHaveLength(3);
    expect(x[2007]).toStrictEqual(['2007-01-01', '2007-12-31', '2007-01-02']);
  });

  test('should get date range from 7day time frame', () => {
    const x = getDateRangeFromTimeFrame('7day');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 1month time frame', () => {
    const x = getDateRangeFromTimeFrame('1month');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 3month time frame', () => {
    const x = getDateRangeFromTimeFrame('3month');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 6month time frame', () => {
    const x = getDateRangeFromTimeFrame('6month');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 12month time frame', () => {
    const x = getDateRangeFromTimeFrame('12month');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 2year time frame', () => {
    const x = getDateRangeFromTimeFrame('2year');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from 3year time frame', () => {
    const x = getDateRangeFromTimeFrame('3year');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test('should get date range from overall time frame', () => {
    const x = getDateRangeFromTimeFrame('overall');

    expect(x).toBeTruthy();
    expect(Date.parse(x.start)).toBeLessThan(Date.parse(x.end));
  });

  test.skip('should get artist image', () => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve({ test: 'test' })
    //   })
    // );
    jest.mock('./utils', () => {
      const originalModule = jest.requireActual('./utils');

      return {
        ...originalModule,
        getMusicBrainzId: jest.fn(() => '1')
      };
    });

    const x = getFanArtImage('123', 'Pink Floyd', false);

    expect(getMusicBrainzId).toHaveBeenCalled();
  });
});
