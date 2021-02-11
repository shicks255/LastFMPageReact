import React, { useContext, useEffect, useState } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import { checkUserName, useUserQuery } from '../hooks/useLasftFmApi';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const Profile: React.FC<Record<string, null>> = ((): JSX.Element => {
  const { state, actions } = useContext(LocalStateContext);
  const [tempUserName, setTempUserName] = useState('');
  const {
    isLoading, error, data,
  } = useUserQuery(state.userName);

  async function submitUsername() {
    const userExists = await checkUserName(tempUserName);
    if (userExists) {
      actions.setShowModal(false);
      setTempUserName('');
      actions.setModalErrorMessage('');
      actions.setUserName(tempUserName);
    } else {
      actions.setModalErrorMessage(`Username ${tempUserName} does not exist`);
    }
  }

  useEffect(() => {
    const handleKeys = (event) => {
      if (event.keyCode === 27) { actions.setShowModal(false); }
      if (event.keyCode === 13) { submitUsername(); }
    };

    window.addEventListener('keyup', handleKeys);
    // return cleanup function
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  if (error) return <ErrorMessage error={error} />;
  if (isLoading) { return <Loader small={false} />; }
  if (!data) return <div />;

  console.log(data);
  const user = {
    playCount: data.playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    avatar: data.image[1]['#text'],
    registered: new Date(data.registered.unixtime * 1000),
  };

  const modal = state.showModal ? (
    <div className="modal is-active">
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
  ) : '';

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
      {modal}
    </div>
  );
});

export default Profile;