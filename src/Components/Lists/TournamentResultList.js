import React from 'react';
import {Message} from "../Commons/Message";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {Spinner} from "../../Components/Commons/Spinner";

class TournamentResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }


  render() {
    const {results,changePage, params} = this.props;

    const CustomTab = ({ children, category }) => (
        <Tab onClick={()=>changePage(category)}>
          {
              params.typeOfGame === category && <h3 style={{color: '#c32c27'}}>{children}</h3>
          }
          {
              params.typeOfGame !== category && <h3>{children}</h3>
          }
        </Tab>
    );
    const renderTabs = (results) => {
        {
            if(null===results){
                return(<Spinner/>);
            }
            if ( 0 === results.length) {
                return (<Message message="No result yet"/>);
            }

            if(results){
                return(
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Imię</th>
                            <th scope="col">Przynależność</th>
                            <th scope="col">Miejsce</th>
                            <th scope="col">Miejsce z TP</th>
                            <th scope="col">Punkty</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results && results.map(result => {
                            const isPlayer = (result) => {
                                if(result.playerId !== null){
                                    return <p>{result.fId}</p>
                                }
                                else{
                                    return <u>{result.fId}</u>
                                }
                            };
                            return(
                                <tr key={result['@id']}>
                                    <td>{isPlayer(result)}</td>
                                    <td>{result.fName}</td>
                                    <td>{result.fMembership}</td>
                                    <td>{result.position}</td>
                                    <td>{result.displayedPosition}</td>
                                    <td>{result.points}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                );
            }
    }
    };
    CustomTab.tabsRole = 'Tab';


    return (
        <div>
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
            {renderTabs(results)}
        </div>

    );
  }
}

export default TournamentResultList;
