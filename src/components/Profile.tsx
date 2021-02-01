import React, { useContext, useEffect, useState } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import useLasftFmApi from '../hooks/useLasftFmApi';
import Loader from './Loader';

const Profile: React.FC<Record<string, null>> = ((): JSX.Element => {
  const { state, actions } = useContext(LocalStateContext);
  const [tempUserName, setTempUserName] = useState('');
  const { userQuery } = useLasftFmApi();

  function submitUsername() {
    actions.setShowModal(false);
    console.log(tempUserName);
    actions.setUserName(tempUserName);
  }

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) { actions.setShowModal(false); }
      if (e.keyCode === 13) { submitUsername(); }
    });
  }, []);

  if (userQuery.isLoading) { return <Loader small={false} />; }

  if (!userQuery.data || userQuery.data.error) {
    actions.setModalErrorMessage(userQuery.data.message);
    actions.setUserName('shicks255');
    actions.setShowModal(false);
    return <div />;
  }

  const user = {
    playCount: userQuery.data.user.playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    avatar: userQuery.data.user.image[1]['#text'],
    registered: new Date(userQuery.data.user.registered.unixtime * 1000),
  };

  const modalClass = state.showModal ? 'modal is-active' : 'modal';
  const modal = (
    <div className={modalClass}>
      <div className="modal-background extraModal" />
      <div className="modal-content">
        <div className="box">
          <label htmlFor="newUsername">
            Enter a new Username:
            &nbsp;&nbsp;
            <input
              onChange={(e) => setTempUserName(e.target.value)}
              type="text"
              id="newUsername"
              aria-placeholder="Username"
            />
          </label>
          <button type="submit" onClick={submitUsername}>Submit</button>
          <br />
          <span><b><i>{state.modalErrorMessage}</i></b></span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => actions.setShowModal(false)}
        className="modal-close is-large"
        aria-label="close"
      />
    </div>
  );

  return (
    <div className="columns">
      <div className="column is-half is is-offset-one-quarter has-text-centered">
        <div className="box relative">
          <div className="columns is-centered">
            <div className="column is-two-fifths is-narrow">
              <figure className="image is-128x128">
                <img alt="" className="image is-rounded" src={user.avatar} />
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
      </div>
      {modal}
    </div>
  );
});

export default Profile;
