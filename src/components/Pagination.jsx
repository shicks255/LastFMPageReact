import React from 'react';

export default class Pagination extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let last = Number(this.props.totalPages);
        let firstPage = this.props.currentPage === 1;
        let secondPage = this.props.currentPage === 2;
        let thirdPage = this.props.currentPage === 3;

        let lastPage = this.props.currentPage === last;
        let penultimatePage = this.props.currentPage === last-1;
        let penultimatePage2 = this.props.currentPage === last-2;

        let pre = this.props.currentPage > 1 ? this.props.currentPage-1 : '';
        let post = this.props.currentPage < last ? this.props.currentPage + 1 : '';

        let firstLink = <a className="button pagination-link" onClick={(event) => this.props.jumpTo(event, 1)}>1</a>
        let preLink =   <a className="button pagination-link" onClick={(event) => this.props.jumpTo(event, this.props.currentPage-1)}>{pre}</a>
        let postLink =  <a className="button pagination-link" onClick={(event) => this.props.jumpTo(event, this.props.currentPage+1)} >{post}</a>
        let lastLink =  <a className="button pagination-link" onClick={(event) => this.props.jumpTo(event, last)}>{last}</a>

        return (
            <div>
                <div className={"columns"} role={"navigation"} aria-label={"pagination"}>
                    <div className={"column is-half is-offset-one-quarter has-text-centered"}>
                        {
                            firstPage
                                ? <a className={"pagination-previous button disabled"}>Previous</a>
                                : <a className={"pagination-previous button"} onClick={this.props.previous}>Previous</a>
                        }
                        {
                            lastPage
                                ? <a className={"pagination-next button disabled"}>Next</a>
                                : <a className={"pagination-next button"} onClick={this.props.next}>Next</a>
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
                            <a className="pagination-link is-current button" >{this.props.currentPage}</a>
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
    }

}
