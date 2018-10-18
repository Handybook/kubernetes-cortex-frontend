import React, { Component } from 'react';
import AzName from "./az_name";
import Chart from "./chart";
import PodName from "./pod_name";
import NamespaceName from "./namespace_name";
import NodeName from "./node_name";
import SinceName from "./since_name";
import Modal from 'react-modal';
import * as moment from "moment";

const podModalStyle = {
  content: {
    position                   : 'absolute',
    top                        : '80px',
    left                       : '80px',
    right                      : '80px',
    bottom                     : '80px',
    border                     : '1px solid #555',
    background                 : '#0F0F0F',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0px',
    outline                    : 'none',
    padding                    : '2px',
    display                    : 'flex',
    'flex-direction'           : 'column'
 },
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.25)'
  }
}

class Pod extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      opacity: 1, 
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.blinker = this.blinker.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    this.props.setFetchLocked(true)
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.setFetchLocked(false)
  }
  
  blinker() {
    if (this.props.blink) {
      this.setState((prevState, props) => {
        if (prevState.opacity === 0.4) {
          return {opacity: 1}
        } else {
          return {opacity: 0.4}
        }
      })
    } else {
      this.setState({opacity: 1});
    }
  }

  componentDidMount() {
    var intervalId = setInterval(this.blinker, 500);
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  
  renderPodStateClass(prefix) {
    var state = this.props.state;
    var now = moment();
    var created_at = moment.unix(this.props.created_at);
    var diff_seconds = now.diff(created_at, 'seconds');
    if (this.props.blink) {
      if (diff_seconds >= 0 && diff_seconds <= 180) {
        state = ' pending';
      } else if (diff_seconds > 180) {
        state = ' failed';
      }
    }
    return prefix + " " + state
  }

  render() {
    return (  
      <div style={{ opacity: this.state.opacity }} className={this.renderPodStateClass("pod")} onClick={this.openModal}>
        <AzName value={this.props.az}/>
        <PodName value={this.props.pod}/>
        <NamespaceName value={this.props.namespace}/>
        <SinceName value={this.props.since}/>
        <NodeName value={this.props.node}/>
        <Modal
          isOpen={this.state.modalIsOpen}
          isAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={podModalStyle}
        >
        <div className={this.renderPodStateClass("pod-modal-name")}>{this.props.pod}</div>
        <div className="pod-info">
          <table>
            <tr>
               <th>Availability Zone:</th>
               <td>{this.props.az}</td>
            </tr>
            <tr>
               <th>Node:</th>
               <td>{this.props.node}</td>
            </tr>
            <tr>
               <th>Created:</th>
               <td>{this.props.since}</td>
            </tr>
          </table>
          <Chart podname={this.props.pod}/>
        </div>
        </Modal>
      </div>
    );
  }

}

export default Pod;
