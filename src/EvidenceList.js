
import React, { Component } from 'react';
import './EvidenceList.css';

class EvidenceList extends Component {

  render() {
    return (
      <div>
        <h1>Evidence List of this case</h1>
        <table className="w3-table-all">
          <thead>
            <tr className="w3-blue">
              <th>Case Id</th>
              <th>File Hash</th>
              <th>Created Date</th>
              <th>Evidence Type</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.details ? 
              <tr>
                <td>
                  {this.props.details.courtId}
                </td>
                <td>
                  <a target="window" href={`http://localhost:8080/ipfs/${this.props.details.hash}`}>
                    {this.props.details.hash}
                  </a>
                </td>
                <td>{this.props.details.date}</td>
                <td>{this.props.details.type}</td>
              </tr> : <tr></tr>
            }
          <tr>
            <td>12312</td>
            <td>qx38778829482jfhebjdks847uhjdwu</td>
            <td>03/10/1998</td>
            <td>Document</td>
          </tr>
          <tr>
            <td>23423</td>
            <td>357yehfgdshue378974678hdfudjuih</td>
            <td>12/02/2012</td>
            <td>Audio</td>
          </tr>
          <tr>
            <td>34232</td>
            <td>ruery3847920874uerdijkf398908ij</td>
            <td>30/12/2015</td>
            <td>Video</td>
          </tr>
          </tbody>  
        </table>
      </div>
    )
  }

}

export default EvidenceList;