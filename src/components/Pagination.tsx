import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

type Props = {
  totalPages: number
}

export default function Pagination(props: Props) {
  const { state, actions } = useContext(LocalStateContext);

  const changePage = (number) => {
    actions.setPage(number);
  };

  const { totalPages } = props;

  const last = Number(totalPages);
  const firstPage = state.page === 1;
  const secondPage = state.page === 2;
  const thirdPage = state.page === 3;

  const lastPage = state.page === last;
  const penultimatePage = state.page === last - 1;
  const penultimatePage2 = state.page === last - 2;

  const pre = state.page > 1 ? state.page - 1 : '';
  const post = state.page < last ? state.page + 1 : '';

  const firstLink = <button type="button" className="button pagination-link" onClick={() => changePage(1)}>1</button>;
  const preLink = <button type="button" className="button pagination-link" onClick={() => changePage(state.page - 1)}>{pre}</button>;
  const postLink = <button type="button" className="button pagination-link" onClick={() => changePage(state.page + 1)}>{post}</button>;
  const lastLink = <button type="button" className="button pagination-link" onClick={() => changePage(last)}>{String(last)}</button>;

  return (
    <div>
      <div className="columns" role="navigation" aria-label="pagination">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          {
                        firstPage
                          ? <button type="button" className="pagination-previous button disabled">Previous</button>
                          : (
                            <button
                              type="button"
                              className="pagination-previous button"
                              onClick={() => changePage(state.page - 1)}
                            >
                              Previous
                            </button>
                          )
                    }
          {
                        lastPage
                          ? <button type="button" className="pagination-next button disabled">Next</button>
                          : (
                            <button
                              type="button"
                              className="pagination-next button"
                              onClick={() => changePage(state.page + 1)}
                            >
                              Next
                            </button>
                          )
                    }
        </div>
      </div>
      <div className="columns">
        <div className="column is-half is-offset-one-quarter has-text-centered is-centered">
          {
                        firstPage
                          ? ''
                          : firstLink
                    }
          {
                        firstPage || secondPage || thirdPage
                          ? ''
                          : <span className="pagination-ellipsis">&hellip;</span>
                    }
          {
                        firstPage || secondPage
                          ? ''
                          : preLink
                    }
          <button type="button" className="pagination-link is-current button">{state.page}</button>
          {
                        lastPage
                          ? ''
                          : postLink
                    }
          {
                        lastPage || penultimatePage || penultimatePage2
                          ? ''
                          : <span className="pagination-ellipsis">&hellip;</span>
                    }
          {
                        penultimatePage || lastPage
                          ? ''
                          : lastLink
                    }
        </div>
      </div>
    </div>
  );
}
