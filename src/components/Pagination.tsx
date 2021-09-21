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

  const firstLink = <Link to={replacePageParam(1)}><button type="button" className="p-2 bg-blue-200">1</button></Link>
  const preLink =  <Link to={replacePageParam(page -1)}><button type="button" className="p-2 bg-blue-200">{pre}</button></Link>
  const postLink = <Link to={replacePageParam(page + 1)}><button type="button" className="p-2 bg-blue-200">{post}</button></Link>
  const lastLink = <Link to={replacePageParam(last)}><button type="button" className="p-2 bg-blue-200">{String(last)}</button></Link>

  return (
    <div>
      <span className="" role="navigation" aria-label="pagination">
        <span className="">
          {
                        firstPage
                          ? <i className="fas fa-arrow-left text-gray-500" />
                          : <Link to={replacePageParam(page-1)}>
                              <i className="fas fa-arrow-left " />
                            </Link>
                    }

                    <span className="ml-2 mr-2"/>
        </span>
      </span>
      <span className="">
        <span className="">
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
          <button type="button" className="p-3 bg-blue-400 border-solid">{page}</button>
          {
                        lastPage
                          ? ''
                          : postLink
                    }
          {
                        lastPage || penultimatePage || penultimatePage2
                          ? ''
                          : <span className="">&hellip;</span>
                    }
          {
                        penultimatePage || lastPage
                          ? ''
                          : lastLink
                    }
        </span>
        <span>
                              <span className="ml-2 mr-2"/>
                    {
                      lastPage
                          ? <i className="fas fa-arrow-right text-gray-500" />
                          : <Link to={replacePageParam(page+1)}>
                            <i className="fas fa-arrow-right" />
                          </Link>
                    }
        </span>
      </span>
    </div>
  );
});

export default Pagination;
