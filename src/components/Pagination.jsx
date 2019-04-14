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

        let firstLink = <li><button className="pagination-link" onClick={(event) => this.props.jumpTo(event, 1)}>1</button></li>
        let preLink =   <li><button className="pagination-link" onClick={(event) => this.props.jumpTo(event, this.props.currentPage-1)}>{pre}</button></li>
        let postLink =  <li><button className="pagination-link" onClick={(event) => this.props.jumpTo(event, this.props.currentPage+1)} >{post}</button></li>
        let lastLink =  <li><button className="pagination-link" onClick={(event) => this.props.jumpTo(event, last)}>{last}</button></li>

        return (
            <nav className={"pagination"} role={"navigation"} aria-label={"pagination"}>
                {
                    firstPage
                        ? <button className={"pagination-previous disabled"}>Previous</button>
                        : <button className={"pagination-previous"} onClick={this.props.previous}>Previous</button>
                }
                {
                    lastPage
                        ? <button className={"pagination-next disabled"}>Next</button>
                        : <button className={"pagination-next"} onClick={this.props.next}>Next</button>
                }
                <br/>
                <ul className={"pagination-list"}>
                    {
                        firstPage
                            ? ''
                            : firstLink
                    }
                    {
                        firstPage || secondPage || thirdPage
                            ? ''
                            : <li><span className="pagination-ellipsis">&hellip;</span></li>
                    }
                    {
                        firstPage || secondPage
                            ? ''
                            : preLink
                    }
                    <li><button className="pagination-link is-current" >{this.props.currentPage}</button></li>
                    {
                        lastPage
                            ? ''
                            : postLink
                    }
                    {
                        lastPage || penultimatePage || penultimatePage2
                            ? ''
                            : <li><span className="pagination-ellipsis">&hellip;</span></li>
                    }
                    {
                        penultimatePage || lastPage
                            ? ''
                            : lastLink
                    }
                </ul>
            </nav>
        )
    }

}