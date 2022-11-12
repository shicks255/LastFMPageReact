import React, { useContext } from 'react';

import useUserQuery from '../hooks/api/lastFm/useUser';
import Loader from './common/Loader';
import ErrorMessage from './ErrorMessage';
import ProfileModal from './modals/ProfileModal';
import { LocalStateContext } from '@/contexts/LocalStateContext';

const Profile: React.FC<Record<string, null>> = (): JSX.Element => {
  const { state, actions } = useContext(LocalStateContext);
  const { isLoading, error, data } = useUserQuery(state.userName);

  if (error) return <ErrorMessage error={error} />;
  if (isLoading) {
    return <Loader small={false} />;
  }
  if (!data) return <div />;

  const user = {
    playCount: data.user.playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    artists: data.user.artist_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    albums: data.user.album_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    tracks: data.user.track_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    avatar: data.user.image[1]['#text'],
    largeAvatar: data.user.image[3]['#text'],
    registered: new Date(data.user.registered.unixtime * 1000),
    url: data.user.url
  };

  return (
    <>
      <div className="flex items-center w-full justify-center mt-4">
        <figure className="flex-initial basis-1/4 relative border-2 border-gray-200">
          <a href={user.largeAvatar} target="_blank" rel="noreferrer">
            <img height={200} width={200} alt="" className="rounded-full" src={user.avatar} />
          </a>
        </figure>
        <h1 className="title flex-initial ml-4 font-bold text-xl text-sky-900">
          <a href={user.url} target="_blank" rel="noreferrer">
            {state.userName}
          </a>
          <img
            alt=""
            onClick={() => actions.setShowModal(true)}
            className="h-4 cursor-pointer inline-block ml-2"
            src={`${process.env.PUBLIC_URL}/edit-2.svg`}
          />
        </h1>
      </div>
      <div className="m-auto">{state.showModal ? <ProfileModal /> : ''}</div>
      <div className="px-4 mt-2">
        <table className="w-full">
          <tr>
            <td className="text-right font-bold">{user.playCount}</td>
            <td className="font-thin p-2">scrobbles</td>
          </tr>
          <tr>
            <td className="text-right font-bold">{user.artists}</td>
            <td className="font-thin p-2">artists</td>
          </tr>
          <tr>
            <td className="text-right font-bold">{user.albums}</td>
            <td className="font-thin p-2">albums</td>
          </tr>
          <tr>
            <td className="text-right font-bold">{user.tracks}</td>
            <td className="font-thin p-2">tracks</td>
          </tr>
        </table>
        <br />
        <span className="font-thin">Registered on </span>
        <span className="font-bold">
          {' '}
          {user.registered.toLocaleString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <br />
      </div>
    </>
  );
};

export default Profile;
