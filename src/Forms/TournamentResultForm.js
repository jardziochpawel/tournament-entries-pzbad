import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import {blogPostAdd, blogPostFormUnload, imageDelete} from "../Actions/actions";
import ImageUpload from "../Components/ImageUpload";
import {ImageBrowser} from "../Components/ImageBrowser";
import {Spinner} from "../Components/Commons/Spinner";
import TournamentResultList from "../Components/Lists/TournamentResultList";
import {renderHiddenField} from "../Components/Commons/form";

const mapDispatchToProps = {
  blogPostAdd,
  blogPostFormUnload,
  imageDelete
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.blogPostForm
});

class BlogPostForm extends React.Component {
  onSubmit(values) {
    const {blogPostAdd, reset, history, images} = this.props;

    return blogPostAdd(values.title, values.content, images)
      .then(() => {
        reset();
        history.push('/');
      });
  }

  componentWillUnmount() {
    this.props.blogPostFormUnload();
  }

  render() {


    if (!this.props.userData && !canWriteBlogPost(this.props.userData)) {
      return <Redirect to="/tournaments"/>
    }

    if(!this.props.userData){
      return(<Spinner/>);
    }

    const {submitting, handleSubmit, error, images, imageReqInProgress, imageDelete} = this.props;
    let results = [];
    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <TournamentResultList results={results}/>

          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="title" label="id:" type="text" component={renderHiddenField} id={this.props.match.id}/>
            <ImageUpload />
            <ImageBrowser images={images}
                          deleteHandler={imageDelete}
                          isLocked={imageReqInProgress} />

            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting || imageReqInProgress}>
              Publish Now!
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
