import React from "react";
import Pagination from "react-ultimate-pagination-bootstrap-4";
import {Spinner} from "./Spinner";

export class Paginator extends React.Component {
  constructor(props) {
    super(props);
      this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(pageNumber) {
    const {changePage} = this.props;
    changePage(pageNumber);
  }

  render() {
    const {pageCount, currentPage } = this.props;

    if (!pageCount) {
      return (<Spinner/>);
    }
    return (

        <div>
              <Pagination
                  currentPage={currentPage}
                  totalPages={pageCount}
                  onChange={this.handlePageChange}
              />
        </div>
    )
  }
}
