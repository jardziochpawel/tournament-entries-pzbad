import React from 'react';
import {commentListFetch, commentListUnload} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {CommentList} from "../Components/Lists/CommentList";
import CommentForm from "../Forms/CommentForm";
import {LoadMore} from "../Components/Commons/LoadMore";

const mapeStateToProps = state => ({
  ...state.commentList,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  commentListFetch,
  commentListUnload
};

class CommentListContainer extends React.Component {
  componentDidMount() {
    this.props.commentListFetch(this.props.blogPostId);
  }

  componentWillUnmount() {
    this.props.commentListUnload();
  }

  onLoadMoreClick() {
    const {blogPostId, currentPage, commentListFetch} = this.props;
    commentListFetch(blogPostId, currentPage);
  }

  render() {
    const {isFetching, commentList, isAuthenticated, blogPostId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    return (
      <div>
        <CommentList commentList={commentList}/>
        {showLoadMore && <LoadMore label="Load more comments..."
                                   onClick={this.onLoadMoreClick.bind(this)}
                                   disabled={isFetching}/>}
        {isAuthenticated && <CommentForm blogPostId={blogPostId}/>}
      </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(CommentListContainer);
