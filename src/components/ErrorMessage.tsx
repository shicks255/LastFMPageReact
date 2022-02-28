import React from 'react';

interface IProps {
  error: Error;
}

const ErrorMessage: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { error } = props;
  const { business, technical } = JSON.parse(error.message);

  if (technical === 'No connection') {
    return (
      <div className="box mainContent">
        <div className="column">
          <table id="errorTable" className="table is-fullwidth">
            <tr>
              <td>
                <div
                  className="column"
                  style={{
                    margin: 'auto',
                    left: '50%',
                    top: '50%',
                    color: '#C3073F'
                  }}
                >
                  <i className="fas fa-plug fa-5x" />
                </div>
              </td>
              <td>No Connection</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="box mainContent">
      <div className="has-text-centered column is-full">
        <h3 className="title is-3 has-text-black">Something went wrong (;_;)</h3>
      </div>
      <div className="has-text-centered columns">
        <div
          className="column"
          style={{
            margin: 'auto',
            left: '50%',
            top: '50%',
            color: '#C3073F'
          }}
        >
          <i className="fas fa-bug fa-5x" />
        </div>
        <div className="column">
          <table id="errorTable" className="table is-fullwidth">
            <tr>
              <td>
                <b>Error:</b>
              </td>
              <td>{business}</td>
            </tr>
            <tr>
              <td>
                <b>Details:</b>
              </td>
              <td>{technical}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
