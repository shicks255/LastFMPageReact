import React from 'react';

interface IProps {
  error: Error;
}

const ErrorMessage: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { error } = props;
  const { business, technical } = JSON.parse(error.message);

  if (technical === 'No connection') {
    return (
      <div>
        <div>
          <table id="errorTable" className="table">
            <tr>
              <td>
                <div
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
    <div>
      <div>
        <h3>Something went wrong (;_;)</h3>
      </div>
      <div>
        <div
          style={{
            margin: 'auto',
            left: '50%',
            top: '50%',
            color: '#C3073F'
          }}
        >
          <i className="fas fa-bug fa-5x" />
        </div>
        <div>
          <table id="errorTable" className="table">
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
