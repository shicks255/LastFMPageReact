import React from 'react';

export default class Pagination extends React.Component {
    constructor(props)
    {
        super(props);
        console.log(props);
    }

    render()
    {
        let last = this.props.totalPages;
        let firstPage = this.props.currentPage === 1;
        let secondPage = this.props.currentPage == 2;
        let thirdPage = this.props.currentPage == 3;
        let lastPage = this.props.currentPage === last;
        let penultimatePage = this.props.currentPage === last-1;
        let penultimatePage2 = this.props.currentPage === last-2;

        let pre = this.props.currentPage > 1 ? this.props.currentPage-1 : '';
        let post = this.props.currentPage < last ? this.props.currentPage + 1 : '';

        return (
            <nav className={"pagination"} role={"navigation"} aria-label={"pagination"}>
                {
                    firstPage
                        ? ''
                        :<a className={"pagination-previous"} onClick={this.props.previous}>Previous</a>
                }
                {
                    lastPage
                        ? ''
                        : <a className={"pagination-next"} onClick={this.props.next}>Next</a>
                }
                <br/>
                <ul className={"pagination-list"}>
                    {
                        firstPage
                            ? ''
                            : <li><a className="pagination-link" >1</a></li>
                    }
                    {
                        firstPage || secondPage || thirdPage
                            ? ''
                            : <li><span className="pagination-ellipsis">&hellip;</span></li>
                    }
                    {
                        firstPage || secondPage
                            ? ''
                            : <li><a className="pagination-link" >{pre}</a></li>
                    }
                    <li><a className="pagination-link is-current" >{this.props.currentPage}</a></li>
                    {
                        lastPage
                            ? ''
                            : <li><a className="pagination-link" >{post}</a></li>
                    }
                    {
                        lastPage || penultimatePage || penultimatePage2
                            ? ''
                            : <li><span className="pagination-ellipsis">&hellip;</span></li>
                    }
                    {
                        lastPage
                            ? ''
                            :<li><a className="pagination-link">{last}</a></li>
                    }
                </ul>
            </nav>
        )
    }

}