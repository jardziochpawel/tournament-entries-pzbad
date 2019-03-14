import React from 'react';
import {classificationListFetch, classificationListSetTypeOfGame, classificationListSetCategory, classificationListClear} from "../Actions/actions";
import {connect} from "react-redux";
import ClassificationList from "../Components/Lists/ClassificationList";

const mapStateToProps = state => ({
  ...state.classificationList
});

const mapDispatchToProps = {
    classificationListFetch: classificationListFetch,
    classificationListSetTypeOfGame: classificationListSetTypeOfGame,
    classificationListSetCategory: classificationListSetCategory,
    classificationListClear:classificationListClear
};

class ClubContainer extends React.Component {
  componentDidMount() {
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

  changeTypeOfGames(typeOfGame){
      const {history, match, classificationListSetTypeOfGame, classificationListClear} = this.props;
      classificationListSetTypeOfGame(typeOfGame);
      classificationListClear();
      history.push('/classification/'+match.params.id+'/'+typeOfGame);
  }

  changeCategory(id){
      const {history, match, classificationListSetCategory, classificationListClear} = this.props;
      classificationListSetCategory(id);
      classificationListClear();
      history.push('/classification/'+id+'/'+match.params.typeOfGame);
  }

  render() {
    const {isFetching, classification, match} = this.props;

    return (
      <div className='w-100'>
        <h1>Listy w trakcie aktualizacji danych, prosimy o cierpliwość.</h1><br/>
        <div className="btn-group" role="group" aria-label="Basic example" style={{marginBottom: 50+'px'}}>
          <button type="button" className={1 === Number(match.params.id) ? "btn btn-secondary active" : "btn btn-secondary"}
                  onClick={()=>this.changeCategory(1)}
          >E</button>
          <button type="button" className={2 === Number(match.params.id) ? "btn btn-secondary active" : "btn btn-secondary" }
                  onClick={()=>this.changeCategory(2)}
          >J</button>
          <button type="button" className={5 === Number(match.params.id) ? "btn btn-secondary active" : "btn btn-secondary" }
                  onClick={()=>this.changeCategory(5)}
          >JM</button>
          <button type="button" className={7 === Number(match.params.id) ? "btn btn-secondary active" : "btn btn-secondary" }
                  onClick={()=>this.changeCategory(7)}
          >M</button>
          <button type="button" className={10 === Number(match.params.id) ? "btn btn-secondary active" : "btn btn-secondary" }
                  onClick={()=>this.changeCategory(10)}
          >MM</button>
        </div>

      <ClassificationList classification={classification} params={this.props.match.params} changeTypeOfGames={this.changeTypeOfGames.bind(this)} isFetching={isFetching}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubContainer);
