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

    let firstLink = <button className="button pagination-link" onClick={() => changePage(1)}>1</button>
    let preLink =   <button className="button pagination-link" onClick={() => changePage(uiStore.page-1)}>{pre}</button>
    let postLink =  <button className="button pagination-link" onClick={() => changePage(uiStore.page+1)} >{post}</button>
    let lastLink =  <button className="button pagination-link" onClick={() => changePage(last)}>{String(last)}</button>

    return (
        <div>
            <div className={"columns"} role={"navigation"} aria-label={"pagination"}>
                <div className={"column is-half is-offset-one-quarter has-text-centered"}>
                    {
                        firstPage
                            ? <button className={"pagination-previous button disabled"}>Previous</button>
                            : <button className={"pagination-previous button"} onClick={() => changePage(uiStore.backwardPage())}>Previous</button>
                    }
                    {
                        lastPage
                            ? <button className={"pagination-next button disabled"}>Next</button>
                            : <button className={"pagination-next button"} onClick={() => changePage(uiStore.forwardPage())}>Next</button>
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
                    <button className="pagination-link is-current button" >{uiStore.page}</button>
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
