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
    avatar: data.user.image[1]['#text'],
    registered: new Date(data.user.registered.unixtime * 1000)
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <figure className="h-24 w-24">
            <img height={300} width={300} alt="" className="rounded-full" src={user.avatar} />
          </figure>
        </div>
        <div className="">
          <h3 className="title" style={{ marginBottom: '0' }}>
            {state.userName}
          </h3>
          <br />
          <span className="font-normal">
            {' '}
            {user.playCount}
            <span className="font-thin"> scrobbles </span>
          </span>
          <br />
          <span className="font-thin">Registered on </span>
          <span className="font-normal">
            {' '}
            {user.registered.toLocaleString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <br />
          <i className="fas fa-user-edit userIcon" onClick={() => actions.setShowModal(true)} />
        </div>
      </div>
      {state.showModal ? <ProfileModal /> : ''}
    </div>
  );
};

export default Profile;
