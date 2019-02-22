import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";

class PlayersList extends React.Component {

  clubId(club){
    return club.match(/(\d+)/)[1]
  }

  render() {
    const {posts} = this.props;

    if (null === posts || 0 === posts.length) {
      return (<Message message="No blog posts"/>);
    }
    console.log(posts);
    return (
      <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PZBAD ID</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Płeć</th>
              <th scope="col">Klub</th>
            </tr>
          </thead>
          <tbody>
              {posts && posts.map(post => (
                    <tr key={post.id}>
                      <th scope="row">{post.id}</th>
                      <td>{post.pzbadId}</td>
                      <td>{post.firstName}</td>
                      <td>{post.lastName}</td>
                      <td>{post.gender === 0 && 'M'}{post.gender !== 0 && 'K'}</td>
                      <td><Link to={'/club/'+this.clubId(post.club)}>{post.club.match(/(\d+)/)[1]}</Link></td>
                    </tr>
              ))}
          </tbody>
      </table>)
  }
}

export default PlayersList;
