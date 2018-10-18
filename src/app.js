import React from 'react';

import PodContainer from "./components/pod_container";
import WaitStatus from "./components/wait_status";
import QueryInfo from "./components/query_info";
import Loading from "./components/loading";
import { BACKEND_URL } from "./config/constants";
import ReactQueryParams from 'react-query-params'; // Extends Component

import './app.css';
import logo from './logo.svg';

class App extends ReactQueryParams {
  constructor(props) {
    super(props);
    var queryString = "?" + Object.keys(this.queryParams).map(key => `${key}=${this.queryParams[key]}`).join("&");
    this.state = {
      pods: [],
      fetchLocked: false,
      queryString: queryString,
      recvStatus: 'waiting',
      nodeCount: 0,
      podCount: 0,
      azCount: 0,
      loaded: 0
    };
    this.setFetchLocked = this.setFetchLocked.bind(this);
  }

  componentDidMount() {
    this.getPods();
    var refreshId = setInterval(function() {
      if(!this.state.fetchLocked) {
        this.getPods();
      }
    }.bind(this), 60000);
    this.setState({refreshId: refreshId});
  }

  getUniqueValuesOfKey(array, key){
    return array.reduce(function(carry, item){
      if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
      return carry;
    }, []);
  }
  
  getQueryInfo() {
    this.getPodCount();
    this.getNodeCount();
    this.getAZCount();
  }

  getNodeCount() {
    this.setState({nodeCount: this.getUniqueValuesOfKey(this.state.pods, 'node').length })
  }

  getAZCount() {
    this.setState({azCount: this.getUniqueValuesOfKey(this.state.pods, 'az').length })
  }

  getPodCount() {
    this.setState({podCount: this.state.pods.length})
  }

  getPods() {
    var url;
    url = BACKEND_URL + '/pods'
    var url_to_fetch = url + this.state.queryString
    fetch(url_to_fetch).then(function(response){
         if (response.ok) {
           return response.json()
         }
         throw new Error('Non 200 response from backend');
    }).then(function(json) {
         if ( json.length > 0 ) {
           this.setState({pods: json});
           this.setState({recvStatus: 'receiving'});
           this.setState({loaded: 1});
           this.getQueryInfo();
         } else {
           this.setState({recvStatus: 'waiting'});
         }
    }.bind(this)).catch(function(ex) {
         console.log('parsing failed', ex)
         this.setState({recvStatus: 'backend-error'});
    }.bind(this));
  }

  setFetchLocked(isLocked) {
    this.setState({fetchLocked: isLocked})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-title">Kubernetes Cortex</div>
          <QueryInfo stat={this.state.podCount + " PODS"}/>
          <QueryInfo stat={this.state.nodeCount + " NODES"}/>
          <QueryInfo stat={this.state.azCount + " AVAIL. ZONES"}/>
          <WaitStatus recvStatus={this.state.recvStatus}/>
        </header>
      <Loading loaded={this.state.loaded}/>
      <PodContainer pods={this.state.pods} fetchLocked={this.setfetchLocked}/>
      </div>
    );
  }
}

export default App;
