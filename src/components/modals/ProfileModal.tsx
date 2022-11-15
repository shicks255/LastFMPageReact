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
    checkUserName(tempUserName.trim()).then((exists) => {
      if (exists) {
        actions.setShowModal(false);
        setTempUserName('');
        actions.setModalErrorMessage('');
        actions.setUserName(tempUserName.trim());
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

  useEffect(() => {
    if (state.modalErrorMessage) {
      actions.setModalErrorMessage(undefined);
    }
  }, [actions, state.modalErrorMessage, tempUserName]);

  return (
    <div>
      <div ref={ref}>
        <div id="profileModal" className="text-center mt-4">
          <label className="label" htmlFor="newUsername">
            Enter a new Username to display their stats
            <div>
              <input
                onChange={(e) => setTempUserName(e.target.value)}
                type="text"
                id="newUsername"
                aria-placeholder="Username"
                placeholder="Username"
              />
            </div>
          </label>
          <button
            className="button bg-sky-900 text-gray-200 py-2 px-4 rounded font-semibold mt-2"
            type="submit"
            onClick={submitUsername}
          >
            Submit
          </button>
          <br />
          <span>
            <b>
              <i className="text-red-500">{state.modalErrorMessage}</i>
            </b>
          </span>
        </div>
      </div>
      <button type="button" onClick={() => actions.setShowModal(false)} aria-label="close" />
    </div>
  );
}

export default ProfileModal;
