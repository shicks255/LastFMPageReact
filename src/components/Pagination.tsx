/* eslint-disable */
import React from 'react';
import { Link, Redirect, useRouteMatch, useLocation } from 'react-router-dom';

type Props = {
  page: number
  totalPages: number
}

const Pagination: React.FC<Props> = ((props: Props): JSX.Element => {

  function replacePageParam(newPage: number): string {
    return location.search.replace(`page=${page}`, `page=${newPage}`)
  }

  const { totalPages, page } = props;
  const { url } = useRouteMatch();
  const location = useLocation();

  if (totalPages < 1) return <></>;

  if (page > totalPages) return <Redirect to={`${url}?page=1`} />

  const last = Number(totalPages);
  const firstPage = page === 1;
  const secondPage = page === 2;
  const thirdPage = page === 3;

  const lastPage = page === last;
  const penultimatePage = page === last - 1;
  const penultimatePage2 = page === last - 2;

  const pre = page > 1 ? page - 1 : '';
  const post = page < last ? page + 1 : '';

  const firstLink = <Link to={replacePageParam(1)}><button type="button" className="button pagination-link">1</button></Link>
  const preLink =  <Link to={replacePageParam(page -1)}><button type="button" className="button pagination-link">{pre}</button></Link>
  const postLink = <Link to={replacePageParam(page + 1)}><button type="button" className="button pagination-link">{post}</button></Link>
  const lastLink = <Link to={replacePageParam(last)}><button type="button" className="button pagination-link">{String(last)}</button></Link>

  return (
    <div>
      <div className="" role="navigation" aria-label="pagination">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          {
                        firstPage
                          ? <i className="fas fa-arrow-left paginate-icon disabled" />
                          : <Link to={replacePageParam(page-1)}>
                              <i className="fas fa-arrow-left paginate-icon" />
                            </Link>
                    }
          {
                        lastPage
                          ? <i className="fas fa-arrow-right paginate-icon disabled" />
                          : <Link to={replacePageParam(page+1)}>
                              <i className="fas fa-arrow-right paginate-icon" />
                            </Link>
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
