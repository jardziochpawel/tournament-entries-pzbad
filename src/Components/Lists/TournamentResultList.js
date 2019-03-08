import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class TournamentResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }


  render() {
    const {results,changePage, currentPage, tournamentCategory} = this.props;
    const CustomTab = ({ children, category }) => (
        <Tab onClick={()=>changePage(category)}>
          {
            currentPage === category && <h3 style={{color: '#264f87'}}>{children}</h3>
          }
          {
            currentPage !== category && <h3>{children}</h3>
          }
        </Tab>
    );

    CustomTab.tabsRole = 'Tab';

    if (null === results || 0 === results.length) {
      return (<Message message="No result yet"/>);
    }

    return (
        <Tabs>
          <TabList>
            <CustomTab category={'SM'}><span>SM</span></CustomTab>
            <CustomTab category={'SK'}><span>SK</span></CustomTab>
            <CustomTab category={'DM'}><span>DM</span></CustomTab>
            <CustomTab category={'DK'}><span>DK</span></CustomTab>
            <CustomTab category={'MX'}><span>MX</span></CustomTab>
          </TabList>

          <TabPanel>
            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">PZBAD ID</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Miejsce</th>
                <th scope="col">Miejsce z TP</th>
                <th scope="col">Punkty</th>
              </tr>
              </thead>
              <tbody>
              {results && results.map(result => {
                return(
                    <tr key={result['@id']}>
                      <td>{result.playerId.pzbadId}</td>
                      <td>{result.playerId.firstName}</td>
                      <td>{result.playerId.lastName}</td>
                      <td>{result.position}</td>
                      <td>{result.displayedPosition}</td>
                      <td>{result.points}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">PZBAD ID</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Miejsce</th>
                <th scope="col">Miejsce z TP</th>
                <th scope="col">Punkty</th>
              </tr>
              </thead>
              <tbody>
              {results && results.map(result => {
                return(
                    <tr key={result['@id']}>
                      <td>{result.playerId.pzbadId}</td>
                      <td>{result.playerId.firstName}</td>
                      <td>{result.playerId.lastName}</td>
                      <td>{result.position}</td>
                      <td>{result.displayedPosition}</td>
                      <td>{result.points}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">PZBAD ID</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Miejsce</th>
                <th scope="col">Miejsce z TP</th>
                <th scope="col">Punkty</th>
              </tr>
              </thead>
              <tbody>
              {results && results.map(result => {
                return(
                    <tr key={result['@id']}>
                      <td>{result.playerId.pzbadId}</td>
                      <td>{result.playerId.firstName}</td>
                      <td>{result.playerId.lastName}</td>
                      <td>{result.position}</td>
                      <td>{result.displayedPosition}</td>
                      <td>{result.points}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">PZBAD ID</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Miejsce</th>
                <th scope="col">Miejsce z TP</th>
                <th scope="col">Punkty</th>
              </tr>
              </thead>
              <tbody>
              {results && results.map(result => {
                return(
                    <tr key={result['@id']}>
                      <td>{result.playerId.pzbadId}</td>
                      <td>{result.playerId.firstName}</td>
                      <td>{result.playerId.lastName}</td>
                      <td>{result.position}</td>
                      <td>{result.displayedPosition}</td>
                      <td>{result.points}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">PZBAD ID</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Miejsce</th>
                <th scope="col">Miejsce z TP</th>
                <th scope="col">Punkty</th>
              </tr>
              </thead>
              <tbody>
              {results && results.map(result => {
                return(
                    <tr key={result['@id']}>
                      <td>{result.playerId.pzbadId}</td>
                      <td>{result.playerId.firstName}</td>
                      <td>{result.playerId.lastName}</td>
                      <td>{result.position}</td>
                      <td>{result.displayedPosition}</td>
                      <td>{result.points}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
    );
  }
}

export default TournamentResultList;
