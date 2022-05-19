import React from 'react';

import { Link, Redirect, useRouteMatch, useLocation } from 'react-router-dom';

interface IProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<IProps> = (props: IProps): JSX.Element => {
  function replacePageParam(newPage: number): string {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return location.search.replace(`page=${page}`, `page=${newPage}`);
  }

  const { totalPages, page } = props;
  const { url } = useRouteMatch();
  const location = useLocation();

  if (totalPages < 1) return <></>;

  if (page > totalPages) return <Redirect to={`${url}?page=1`} />;

  const last = Number(totalPages);
  const isFirstPage = page === 1;
  const isSecondPage = page === 2;
  const isThirdPage = page === 3;

  const isLastPage = page === last;
  const isPenultimatePage = page === last - 1;
  const isPenultimatePage2 = page === last - 2;

  const pre = page > 1 ? page - 1 : '';
  const post = page < last ? page + 1 : '';

  const firstLink = (
    <Link to={replacePageParam(1)}>
      <button type="button" className="p-1">
        <div className="w-6 h-6 rounded-full flex justify-center items-center">1</div>
      </button>
    </Link>
  );
  const preLink = (
    <Link to={replacePageParam(page - 1)}>
      <button type="button" className="p-1">
        <div className="w-6 h-6 rounded-full flex justify-center items-center">{pre}</div>
      </button>
    </Link>
  );
  const postLink = (
    <Link to={replacePageParam(page + 1)}>
      <button type="button" className="p-1">
        <div className="w-6 h-6 rounded-full flex justify-center items-center">{post}</div>
      </button>
    </Link>
  );
  const lastLink = (
    <Link to={replacePageParam(last)}>
      <button type="button" className="p-1">
        {String(last)}
      </button>
    </Link>
  );

  return (
    <div className="flex justify-center">
      <span className="" role="navigation" aria-label="pagination">
        {isFirstPage ? (
          <i className="fas fa-arrow-left text-gray-500" />
        ) : (
          <Link to={replacePageParam(page - 1)}>
            <i className="fas fa-arrow-left " />
          </Link>
        )}

        <span className="ml-2 mr-2" />
        <span className="">
          {isFirstPage ? '' : firstLink}
          {isFirstPage || isSecondPage || isThirdPage ? (
            ''
          ) : (
            <span className="pagination-ellipsis">&hellip;</span>
          )}
          {isFirstPage || isSecondPage ? '' : preLink}
          <button type="button" className="p-3">
            <div className="w-6 h-6 text-slate-300 bg-sky-900 rounded-full flex justify-center items-center">
              {page}
            </div>
          </button>
          {isLastPage ? '' : postLink}
          {isLastPage || isPenultimatePage || isPenultimatePage2 ? (
            ''
          ) : (
            <span className="">&hellip;</span>
          )}
          {isPenultimatePage || isLastPage ? '' : lastLink}
        </span>
        <span>
          <span className="ml-2 mr-2" />
          {isLastPage ? (
            <i className="fas fa-arrow-right text-gray-500" />
          ) : (
            <Link to={replacePageParam(page + 1)}>
              <i className="fas fa-arrow-right" />
            </Link>
          )}
        </span>
      </span>
    </div>
  );
};

export default Pagination;