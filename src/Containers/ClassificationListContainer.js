import React from 'react';
import {
    classificationListFetch,
    classificationListSetTypeOfGame,
    classificationListSetCategory,
    classificationListClear,
    commonClassificationFetch,
    commonUnload, classificationListSetSeason, getSeasonList
} from "../Actions/actions";
import {connect} from "react-redux";
import ClassificationList from "../Components/Lists/ClassificationList";
import moment from "moment";
import {BACKEND_ROOT} from "../agent";
import {Switch} from "../Components/Commons/Switch";

const mapStateToProps = state => ({
    lastSeason: state.lastSeason.lastSeason,
  ...state.classificationList,
    ...state.seasonList,
    ...state.commons
});

const mapDispatchToProps = {
    classificationListFetch: classificationListFetch,
    classificationListSetTypeOfGame: classificationListSetTypeOfGame,
    classificationListSetCategory: classificationListSetCategory,
    classificationListClear:classificationListClear,
    commonClassificationFetch: commonClassificationFetch,
    commonUnload:commonUnload,
    getSeasonList: getSeasonList,
    classificationListSetSeason: classificationListSetSeason
};

class ClubContainer extends React.Component {
  componentDidMount() {
    this.props.commonClassificationFetch();
    this.props.classificationListFetch(this.props.match.params.id, this.props.match.params.typeOfGame, this.getQueryParamSeason());
    this.props.classificationListSetCategory(this.props.match.params.id);
    this.props.classificationListSetTypeOfGame(this.props.match.params.typeOfGame);
    this.props.getSeasonList();

  }

  componentDidUpdate(prevProps) {
      const {currentCategory, currentTypeOfGame, classificationListFetch, currentSeason, classificationListSetSeason} = this.props;

      if (prevProps.currentTypeOfGame !== currentTypeOfGame) {
          classificationListFetch(currentCategory, currentTypeOfGame, currentSeason);
      }

      if (prevProps.currentCategory !== currentCategory) {
          classificationListFetch(currentCategory, currentTypeOfGame, currentSeason);
      }

      if (prevProps.match.params.season !== this.getQueryParamSeason()) {
          classificationListSetSeason(this.getQueryParamSeason());
      }

      if (prevProps.currentSeason !== currentSeason) {
          console.log('test');
          classificationListFetch(currentCategory, currentTypeOfGame, currentSeason);
      }
  }
  componentWillUnmount() {
      this.props.commonUnload();
  }

  checkLastSeason(){
    if(this.props.lastSeason){
        return this.props.lastSeason.last_season;
    }
    else{
        setTimeout(() => this.checkLastSeason(),500);
    }
  }

  getQueryParamSeason() {
     return Number(this.props.match.params.season) || this.checkLastSeason();
  }

  changeTypeOfGames(typeOfGame){
      const {history, match, classificationListSetTypeOfGame, classificationListClear, currentSeason} = this.props;
      classificationListSetTypeOfGame(typeOfGame);
      if(typeOfGame !== match.params.typeOfGame)
      {
          classificationListClear();
          history.push('/classification/'+match.params.id+'/'+typeOfGame+'/'+currentSeason);
      }
  }

   changeSeason(season) {
      const {history, match} = this.props;
      history.push('/classification/'+match.params.id+'/'+match.params.typeOfGame+'/'+season);
   }

  changeCategory(id){
      const {history, match, classificationListSetCategory, classificationListClear, currentSeason} = this.props;
      classificationListSetCategory(id);

      if(id !== Number(match.params.id))
      {
          classificationListClear();
          history.push('/classification/'+id+'/'+match.params.typeOfGame+'/'+currentSeason);
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
    const {isFetching, classification, match, common, currentSeason,history} = this.props;


      if(!match.params.season){
          history.push('/classification/'+match.params.id+'/'+match.params.typeOfGame+'/'+currentSeason);
      }

      return (
      <div className='w-100'>
        <h1 className="text-danger">Ostatnia aktualizacja z {common !== null && moment(common['last_update'].date).format('DD-MM-YYYY')}</h1><br/>
          <Switch changeSeason={this.changeSeason.bind(this)} seasons={this.props.seasons} currentSeason={currentSeason}/>
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
