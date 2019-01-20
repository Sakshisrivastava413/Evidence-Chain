import React, { Component } from 'react';
import './App.css';

import CourtContract from '../build/contracts/Court.json';
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

import EvidenceList from './EvidenceList';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      buffer: null,
      transactionHash: '',
      transactionCompleted: '',
      fileUploaded: false,
      fileUploading: false,
      details: {
        fileHash: '',
        caseId: '',
        description: '',
        evidenceType: 'Document',
        createdDate: ''
      },
      uploadedImage: '',
      account: ''
    };
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.testNet = this.testNet.bind(this);
    this.courtContract = null;
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(CourtContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(error, accounts)

      simpleStorage.deployed().then((instance) => {
        console.log(instance);
        this.courtContract = instance;
        this.registerCase();
        this.setState({ account: accounts[4] });
      }).catch(err => console.error(err));
    });
  }

  handleInputChange = (event) => {
    this.setState({
      details: {
        ...this.state.details,
        [event.target.name]: event.target.value
      }
    });
  }

  registerCase() {
    // this.courtContract.registerCase(
    //   'courtabc',
    //   'akshat',
    //   'sakshi',
    //   'dhruv',
    //   'case001',
    //   'This is a case regarding robbery at punjabi bagh palace.',
    //   new Date().toISOString()
    // ).then((result) => {
    //   console.log('registerCase result', result);
    // });
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      ipfs.files.add({ content: Buffer(reader.result) }, (error, result) => {
        if (error) return console.log(error);
        console.log('ipfs hash', result[0].hash);
        const blob = new Blob([reader.result], { type: "image/jpeg" });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);

        this.setState({
          details: {
            ...this.state.details,
            fileHash: result[0].hash
          },
          uploadedImage: imageUrl
        });
      });
    }
  }

  testNet() {
    this.courtContract.getCaseById(
      this.state.details.caseId, {
        from: this.state.account,
        gas: 3000000,
      }).then((r) => {
        console.log(r)
        // return this.setState({
        //   transactionHash: r.transactionHash,
        //   transactionCompleted: true
        // });
      }).catch(error => {
        console.log(error)
      });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    // this.state.storageValue = this.state.storageValue + 1;
    // const docName = 'TestDoc' + this.state.storageValue;
    this.courtContract.registerEvidence(
      this.state.details.caseId,
      this.state.details.description,
      this.state.details.fileHash,
      this.state.details.evidenceType,
      this.state.details.createdDate, {
        from: this.state.account,
        gas: 3000000,
      }).then((r) => {
        alert('Evidence submitted!')
        // this.testNet()
        return this.setState({
          transactionHash: r.transactionHash,
          transactionCompleted: true
        });
      }).catch(error => {
        console.log(error)
      })
  }

  onClick(event) {
    event.preventDefault();
    this.simpleStorageInstance.evidenceCount.call(this.state.account).then((r) => {
      var docCount = r[0]
      var docs = []
      for (var i = 0; i < docCount; i++) {
        docs.push(this.simpleStorageInstance.getEvidence.call(i));
      }

      Promise.all(docs).then(function (values) {
        console.log(values);
      })
    })
  }

  render() {
    // console.log(this.state.details);
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Evidence Chain</h1>
          </header>
        </div>
        <div className="container">
          <h1>Create new Evidence</h1>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-25">
                <label htmlFor="country">Case Id</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  placeholder="Enter your Case ID"
                  value={this.state.details.caseId}
                  onChange={this.handleInputChange}
                  name="caseId"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="filehash">File Hash</label>
              </div>
              <div className="col-50">
                <input
                  type="file"
                  id="fname"
                  onChange={this.captureFile}
                  name="fileHash"
                  placeholder="Enter the Hash"
                />
              </div>
              <div className="col-25">
                <p>{this.state.details.fileHash}</p>
                {
                  this.state.uploadedImage ?
                    <img src={this.state.uploadedImage} width="200" height="200" />
                    : ''
                }
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="createddate">Created Date</label>
              </div>
              <div className="col-75">
                <input
                  type="date"
                  name="createdDate"
                  id="dateofbirth"
                  value={this.state.details.createdDate}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="country">Evidence Type</label>
              </div>
              <div className="col-75">
                <select id="type" name="evidenceType" value={this.state.details.evidenceType} onChange={this.handleInputChange}>
                  <option value="document">Document</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="other">Others</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="subject">Description of the Evidence</label>
              </div>
              <div className="col-75">
                <textarea
                  id="subject"
                  name="description"
                  placeholder="Write something related to the evidence.."
                  style={{ height: 200 }}
                  value={this.state.details.description}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
          </form>
          <EvidenceList details={this.state.transactionCompleted ? {
            courtId: this.state.details.caseId,
            hash: this.state.details.fileHash,
            date: this.state.details.createdDate,
            type: this.state.details.evidenceType
          } : null} />
        </div>
      </div>
    );
  }
}

export default App
