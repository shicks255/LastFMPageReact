import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import useClickOutside from '@/hooks/useClickOutside';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { checkUserName } from '@/service/api';

function ProfileModal(): JSX.Element {
  const { state, actions } = useContext(LocalStateContext);
  const [tempUserName, setTempUserName] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useLockBodyScroll(state.showModal);
  useClickOutside(ref, () => {
    actions.setShowModal(false);
    actions.setModalErrorMessage('');
    setTempUserName('');
  });

  const submitUsername = useCallback(() => {
    if (tempUserName === state.userName) return;
    if (tempUserName.length === 0) {
      actions.setModalErrorMessage('Enter a new username');
      return;
    }
    checkUserName(tempUserName).then((exists) => {
      if (exists) {
        actions.setShowModal(false);
        setTempUserName('');
        actions.setModalErrorMessage('');
        actions.setUserName(tempUserName);
      } else {
        actions.setModalErrorMessage(`Username ${tempUserName} does not exist`);
      }
    });
  }, [tempUserName, state.userName, actions]);

  useEffect(() => {
    const handleKeys = (event) => {
      if (event.keyCode === 27) {
        actions.setShowModal(false);
      }
      if (event.keyCode === 13) {
        submitUsername();
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [tempUserName, actions, submitUsername]);

  return (
    <div>
      <div ref={ref}>
        <div id="profileModal">
          <label className="label" htmlFor="newUsername">
            Enter a new Username: &nbsp;&nbsp;
            <div>
              <input
                onChange={(e) => setTempUserName(e.target.value)}
                type="text"
                id="newUsername"
                aria-placeholder="Username"
              />
            </div>
          </label>
          <button className="button" type="submit" onClick={submitUsername}>
            Submit
          </button>
          <br />
          <span>
            <b>
              <i>{state.modalErrorMessage}</i>
            </b>
          </span>
        </div>
      </div>
      <button type="button" onClick={() => actions.setShowModal(false)} aria-label="close" />
    </div>
  );
}

export default ProfileModal;
