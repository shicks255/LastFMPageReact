import React from 'react';
import { useApiDispatch, useApiState } from '../contexts/ApiContext';

type Props = {
  totalPages: number
}

const Pagination: React.FC<Props> = ((props: Props): JSX.Element => {
  const { page } = useApiState();
  const { setPage } = useApiDispatch();

  const changePage = (number) => {
    setPage(number);
  };

  const { totalPages } = props;
  if (page > totalPages) setPage(1);

  if (totalPages < 1) return <></>;

  const last = Number(totalPages);
  const firstPage = page === 1;
  const secondPage = page === 2;
  const thirdPage = page === 3;

  const lastPage = page === last;
  const penultimatePage = page === last - 1;
  const penultimatePage2 = page === last - 2;

  const pre = page > 1 ? page - 1 : '';
  const post = page < last ? page + 1 : '';

  const firstLink = <button type="button" className="button pagination-link" onClick={() => changePage(1)}>1</button>;
  const preLink = <button type="button" className="button pagination-link" onClick={() => changePage(page - 1)}>{pre}</button>;
  const postLink = <button type="button" className="button pagination-link" onClick={() => changePage(page + 1)}>{post}</button>;
  const lastLink = <button type="button" className="button pagination-link" onClick={() => changePage(last)}>{String(last)}</button>;

  return (
    <div>
      <div className="" role="navigation" aria-label="pagination">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          {
                        firstPage
                          ? <button type="button" className="pagination-previous button disabled">Previous</button>
                          : (
                            <button
                              type="button"
                              className="pagination-previous button"
                              onClick={() => changePage(page - 1)}
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
                              onClick={() => changePage(page + 1)}
                            >
                              Next
                            </button>
                          )
                    }
        </div>
      </div>
      <div className="">
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
          <button type="button" className="pagination-link is-current button">{page}</button>
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
});

export default Pagination;
