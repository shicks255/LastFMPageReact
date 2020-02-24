import React from 'react';
import {inject,observer} from 'mobx-react';

export const Pagination = inject('uiStore')(observer((props) => {

    let changePage = (number) => {
        props.uiStore.jumpToPage(number);
        props.loadData();
    }

    const {uiStore} = props;
    let last = Number(props.totalPages);
    let firstPage = uiStore.page === 1;
    let secondPage = uiStore.page === 2;
    let thirdPage = uiStore.page === 3;

    let lastPage = uiStore.page === last;
    let penultimatePage = uiStore.page === last-1;
    let penultimatePage2 = uiStore.page === last-2;

    let pre = uiStore.page > 1 ? uiStore.page-1 : '';
    let post = uiStore.page < last ? uiStore.page + 1 : '';

    let firstLink = <a className="button pagination-link" onClick={() => changePage(1)}>1</a>
    let preLink =   <a className="button pagination-link" onClick={() => changePage(uiStore.page-1)}>{pre}</a>
    let postLink =  <a className="button pagination-link" onClick={() => changePage(uiStore.page+1)} >{post}</a>
    let lastLink =  <a className="button pagination-link" onClick={() => changePage(last)}>{last}</a>

    return (
        <div>
            <div className={"columns"} role={"navigation"} aria-label={"pagination"}>
                <div className={"column is-half is-offset-one-quarter has-text-centered"}>
                    {
                        firstPage
                            ? <a className={"pagination-previous button disabled"}>Previous</a>
                            : <a className={"pagination-previous button"} onClick={() => changePage(uiStore.backwardPage())}>Previous</a>
                    }
                    {
                        lastPage
                            ? <a className={"pagination-next button disabled"}>Next</a>
                            : <a className={"pagination-next button"} onClick={() => changePage(uiStore.forwardPage())}>Next</a>
                    }
                </div>
            </div>
            <div className={"columns"}>
                <div className={"column is-half is-offset-one-quarter has-text-centered is-centered"}>
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
                    <a className="pagination-link is-current button" >{uiStore.page}</a>
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
    )
}));
