import React, { useContext } from 'react';
import { LocalStateContext } from '../contexts/LocalStateContext';
import { useUserQuery } from '../hooks/useLasftFmApi';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ProfileModal from './modals/ProfileModal';

const Profile: React.FC<Record<string, null>> = ((): JSX.Element => {
  const { state, actions } = useContext(LocalStateContext);
  const {
    isLoading, error, data,
  } = useUserQuery(state.userName);

  if (error) return <ErrorMessage error={error} />;
  if (isLoading) { return <Loader small={false} />; }
  if (!data) return <div />;

  const user = {
    playCount: data.playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    avatar: data.image[1]['#text'],
    registered: new Date(data.registered.unixtime * 1000),
  };

  return (
    <div className="column is-half is is-offset-one-quarter has-text-centered">
      <div className="box relative has-text-centered is-half">
        <div className="columns is-centered">
          <div className="column is-two-fifths is-narrow has-text-right">
            <figure className="image is-128x128">
              <img height={300} width={300} alt="" className="image is-rounded" src={user.avatar} />
            </figure>
          </div>
          <div className="card-stacked column is-three-fifths is-narrow">
            <h3 className="title" style={{ marginBottom: '0' }}>
              {state.userName}
            </h3>
            <br />
            <b>Registered:</b>
            {' '}
            {user.registered.toLocaleString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            <br />
            <b>Play Count:</b>
            {' '}
            {user.playCount}
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <i className="fas fa-user-edit userIcon" onClick={() => actions.setShowModal(true)} />
          </div>
        </div>
      </div>
      {state.showModal ? <ProfileModal /> : ''}
    </div>
  );
});

export default Profile;
