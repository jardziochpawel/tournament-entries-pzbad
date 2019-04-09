import React from 'react';
import {Message} from "../Commons/Message";
import moment from "moment";
import {Link} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {Spinner} from "../../Components/Commons/Spinner";
import PopoverButton from "../Commons/PopoverButton";

class ClassificationList extends React.Component {


  render() {
    const {classification, params,changeTypeOfGames} = this.props;
    let i = 0;
    const playerCategory = (id) => {

        switch (Number(id)) {
            case 1:
                return 'E';
            case 2:
                return 'J';
            case 5:
                return 'JM';
            case 7:
                return 'M';
            case 10:
                return 'MM';
            case 15:
                return 'Ż';
            case 20:
                return 'ŻM';
            default:
                return 'E';
        }
    };

      const renderTabs = (classification) => {
          {
              if(null===classification){
                  return(<Spinner/>);
              }
              if ( 0 === classification.length) {
                  return (<Message message="No data yet"/>);
              }

              if(classification){
                  return(
                      <table className="table table-striped table-hover">
                          <thead>
                          <tr>
                              <th scope="col">#</th>
                              <th scope="col">ID</th>
                              <th scope="col">Imię</th>
                              <th scope="col">Nazwisko</th>
                              <th scope="col">Club</th>
                              <th scope="col">Rok urodzenia</th>
                              <th scope="col">Województwo</th>
                              <th scope="col">Suma pkt</th>
                              <th scope="col">Wyniki</th>
                          </tr>
                          </thead>
                          <tbody>
                          {classification && classification.map(c => {
                              i++;
                              return(
                                  <tr key={i+'-'+c.player.pzbadId}>
                                      <td>{c.position}</td>
                                      <td>{c.player.pzbadId}</td>
                                      <td>{c.player.firstName}</td>
                                      <td>{c.player.lastName}</td>
                                      <td>{c.player.name}</td>
                                      <td>{moment(c.player.birthAt).format('YYYY')}</td>
                                      <td>{c.player.voivodeship}</td>
                                      <td>{c.sum_of_points}</td>
                                      <td>
                                          <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                                          {c.best_results.map(b=>{
                                              return(
                                                  <div key={b.tournament.id} style={{width: 50+'px', margin: 'auto'}}>
                                                    <Link to={'/tournament-result/'+b.tournament.id+'/'+playerCategory(params.id)+'/'+params.typeOfGame} >
                                                        {b.tournament && <PopoverButton points={b.points} tournament={b.tournament} pzbadId={c.player.pzbadId}/>}
                                                    </Link>
                                                  </div>
                                              );
                                                  })
                                          }
                                          </div>
                                      </td>
                                  </tr>
                              );
                          })}
                          </tbody>
                      </table>
                  );
              }
          }
      };

      const CustomTab = ({ children, category }) => (
          <Tab onClick={()=>changeTypeOfGames(category)}>
              {
                  params.typeOfGame === category && <h3 style={{color: '#c32c27'}}>{children}</h3>
              }
              {
                  params.typeOfGame !== category && <h3>{children}</h3>
              }
          </Tab>
      );

    CustomTab.tabsRole = 'Tab';

    return (
        <div className="">
            <Tabs>
                <TabList>
                    <CustomTab category={'SM'}><span>SM</span></CustomTab>
                    <CustomTab category={'SK'}><span>SK</span></CustomTab>
                    <CustomTab category={'DM'}><span>DM</span></CustomTab>
                    <CustomTab category={'DK'}><span>DK</span></CustomTab>
                    <CustomTab category={'MX'}><span>MX</span></CustomTab>
                </TabList>

                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </Tabs>
            {renderTabs(classification)}
        </div>)
  }
}

export default ClassificationList;
