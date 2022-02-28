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
        },
        durationEstimated: boolean;
        dateBased: boolean;
        timeBased: boolean;
    },
    zero: true,
    negative: true,
    chronology: {
        id: string,
        calendarType: string
    }
}

interface ITimeStat {
    oldest: string;
    newest: string;
    difference: IDifference;
}

interface IOldestAndNewestStat {
    name: string,
    extra: string,
    timeStat: ITimeStat;
}

interface ILongestDormancyArtist {
    name: string;
    extra: string;
    timeStat: ITimeStat;
}

interface IOldestAndNewestAlbum {
    name: string;
    extra: string;
    timeStat: ITimeStat;
}

interface ILongestDormancyAlbum {
    name: string;
    extra: string;
    timeStat: ITimeStat;
}

export default interface UserStats {
    oldestAndNewestArtist: IOldestAndNewestStat;
    longestDormancyArtist: ILongestDormancyArtist;
    oldestAndNewestAlbum: IOldestAndNewestAlbum;
    longestDormancyAlbum: ILongestDormancyAlbum;
}
