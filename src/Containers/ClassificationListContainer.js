import React from 'react';
import {
    classificationListFetch,
    classificationListSetTypeOfGame,
    classificationListSetCategory,
    classificationListClear,
    commonClassificationFetch,
    commonUnload
} from "../Actions/actions";
import {connect} from "react-redux";
import ClassificationList from "../Components/Lists/ClassificationList";
import moment from "moment";
import {Spinner} from "../Components/Commons/Spinner";
import {BACKEND_ROOT} from "../agent";

const mapStateToProps = state => ({
  ...state.classificationList,
    ...state.commons
});

const mapDispatchToProps = {
    classificationListFetch: classificationListFetch,
    classificationListSetTypeOfGame: classificationListSetTypeOfGame,
    classificationListSetCategory: classificationListSetCategory,
    classificationListClear:classificationListClear,
    commonClassificationFetch: commonClassificationFetch,
    commonUnload:commonUnload
};

class ClubContainer extends React.Component {
  componentDidMount() {
    this.props.commonClassificationFetch();
    this.props.classificationListFetch(this.props.match.params.id, this.props.match.params.typeOfGame);
    this.props.classificationListSetCategory(this.props.match.params.id);
    this.props.classificationListSetTypeOfGame(this.props.match.params.typeOfGame);
  }

  componentDidUpdate(prevProps) {
      const {currentCategory, currentTypeOfGame, classificationListFetch} = this.props;

      if (prevProps.currentTypeOfGame !== currentTypeOfGame) {
          classificationListFetch(currentCategory, currentTypeOfGame);
      }

      if (prevProps.currentCategory !== currentCategory) {
          classificationListFetch(currentCategory, currentTypeOfGame);
      }
  }
  componentWillUnmount() {
      this.props.commonUnload();
  }

  changeTypeOfGames(typeOfGame){
      const {history, match, classificationListSetTypeOfGame, classificationListClear} = this.props;
      classificationListSetTypeOfGame(typeOfGame);
      if(typeOfGame !== match.params.typeOfGame)
      {
          classificationListClear();
          history.push('/classification/'+match.params.id+'/'+typeOfGame);
      }
  }

  changeCategory(id){
      const {history, match, classificationListSetCategory, classificationListClear} = this.props;
      classificationListSetCategory(id);

      if(id !== Number(match.params.id))
      {
          classificationListClear();
          history.push('/classification/'+id+'/'+match.params.typeOfGame);
      }
  }
  downloadFile(url){
      setTimeout(() => {
          const response = {
              file: BACKEND_ROOT+url,
          };
          window.open(response.file, "_blank");
      }, 100);
  }

  render() {
    const {isFetching, classification, match, common} = this.props;
    if(isFetching){
        return (<Spinner/>)
    }

    return (
      <div className='w-100'>
        <h1 className="text-danger">Ostatnia aktualizacja z {common !== null && moment(common['last_update'].date).format('DD-MM-YYYY')}</h1><br/>
        <div className="row">
            <div className='col-6'>
                <div className="btn-group" role="group" aria-label="Basic example" style={{marginBottom: 50+'px'}}>
                    <button type="button" className={1 === Number(match.params.id) ? "btn btn-secondary active disabled" : "btn btn-secondary"}
                            onClick={()=>this.changeCategory(1)}
                    >E</button>
                    <button type="button" className={2 === Number(match.params.id) ? "btn btn-secondary active disabled" : "btn btn-secondary" }
                            onClick={()=>this.changeCategory(2)}
                    >J</button>
                    <button type="button" className={5 === Number(match.params.id) ? "btn btn-secondary active disabled" : "btn btn-secondary" }
                            onClick={()=>this.changeCategory(5)}
                    >JM</button>
                    <button type="button" className={7 === Number(match.params.id) ? "btn btn-secondary active disabled" : "btn btn-secondary" }
                            onClick={()=>this.changeCategory(7)}
                    >M</button>
                    <button type="button" className={10 === Number(match.params.id) ? "btn btn-secondary active disabled" : "btn btn-secondary" }
                            onClick={()=>this.changeCategory(10)}
                    >MM</button>
                </div>
            </div>
            <div className='col-6 '>
                <button type="button" className={"btn btn-primary float-right"}
                        onClick={()=>this.downloadFile(common['url'])}
                >Pobierz pliki</button>
            </div>
        </div>
      <ClassificationList classification={classification} params={this.props.match.params} changeTypeOfGames={this.changeTypeOfGames.bind(this)} isFetching={isFetching}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubContainer);
