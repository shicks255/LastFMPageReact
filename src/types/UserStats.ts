interface IDifference {
  years: number;
  months: number;
  days: number;
  units: {
    duration: {
      seconds: number;
      nano: number;
      zero: boolean;
      negative: boolean;
    };
    durationEstimated: boolean;
    dateBased: boolean;
    timeBased: boolean;
  };
  zero: true;
  negative: true;
  chronology: {
    id: string;
    calendarType: string;
  };
}

interface ITimeStat {
  oldest: string;
  newest: string;
  difference: IDifference;
}

interface IUserStat {
  name: string;
  extra?: string;
  timeStat: ITimeStat;
}

export default interface IUserStats {
  oldestAndNewestArtist: IUserStat;
  longestDormancyArtist: IUserStat;
  oldestAndNewestAlbum: IUserStat;
  longestDormancyAlbum: IUserStat;
  firstTo100Album: IUserStat;
  firstTo1000Album: IUserStat;
  firstTo100Artist: IUserStat;
  firstTo1000Artist: IUserStat;
  firstTo100Song: IUserStat;
  firstTo200Song: IUserStat;
}

export type { IDifference, IUserStat };
