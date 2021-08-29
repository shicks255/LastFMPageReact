import React, { useEffect, useState } from 'react';

interface timeStat {
  oldest: string,
  newest: string,
  difference: string
}

interface stat {
  name: string,
  extra: string,
  timeStat: timeStat
}

interface userStats {
  longestDormancyAlbum: stat,
  longestDormancyArtist: stat,
  oldestAndNewestAlbum: stat,
  oldestAndNewestArtist: stat,
}

const UserStats: React.FC<Record<string, void>> = (() => {
  const [stats, setStats] = useState<userStats | undefined>();

  async function fetchStats() {
    fetch(
      'https://musicapi.shicks255.com/api/v1/user/stats?userName=shicks255',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => Promise.all([res.ok, res.json()]))
      .then(([, body]) => {
        setStats(body);
      });
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <></>;
  }

  return (
    <div>
      Artist with earliest and latest play:
      {stats.oldestAndNewestArtist.name}
      First play:
      {' '}
      {stats.oldestAndNewestArtist.timeStat.oldest}
      Last play:
      {stats.oldestAndNewestArtist.timeStat.newest}
      <br />
      Album with earliest and latest play:
      {stats.oldestAndNewestAlbum.name}
      <br />
      Longest dormant period artist:
      {stats.longestDormancyArtist.name}
      <br />
      Longest dormant period album:
      {stats.longestDormancyAlbum.name}
      <br />
    </div>
  );
});

export default UserStats;
