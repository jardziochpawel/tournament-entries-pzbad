import React from 'react';
import {blogPostFetch, blogPostUnload} from "../Actions/actions";
import {connect} from "react-redux";
import {BlogPost} from "../Components/BlogPost";
import {Spinner} from "../Components/Commons/Spinner";
import CommentListContainer from "./CommentListContainer";

const mapeStateToProps = state => ({
  ...state.blogPost
});

const mapDispatchToProps = {
  blogPostFetch,
  blogPostUnload
};

class BlogPostContainer extends React.Component {
  componentDidMount() {
    this.props.blogPostFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.blogPostUnload();
  }

  render() {
    const {isFetching, post} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
      <div>
        <BlogPost post={post}/>
        {post && <CommentListContainer blogPostId={this.props.match.params.id}/>}
      </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(BlogPostContainer);
