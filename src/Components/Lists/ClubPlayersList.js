import React from 'react';
import {Message} from "../Commons/Message";

import "./CommentList.css";

export class ClubPlayersList extends React.Component {
  render() {
    const {commentList} = this.props;

    if (null === commentList || 0 === commentList.length) {
      return (<Message message="No comments yet"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
          <table className="table table-striped ">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PZBAD ID</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
            </tr>
            </thead>
            <tbody>
            {commentList && commentList.map(post => (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.pzbadId}</td>
                  <td>{post.firstName}</td>
                  <td>{post.lastName}</td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
    )
  }
}
