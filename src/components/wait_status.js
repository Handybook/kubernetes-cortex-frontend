import React, { Component } from 'react';

class WaitStatus extends Component {
  render() {
    var displayText;
    if (this.props.recvStatus === 'waiting') {
      displayText = 'WAITING TO RECEIVE DATA'
    }
    if (this.props.recvStatus === 'receiving') {
      displayText = 'SYSTEM ONLINE'
    }
    if (this.props.recvStatus === 'backend-error') {
      displayText = 'CONNECTION ERROR'
    }
    return (
      <div className={this.props.recvStatus} id="App-status">{displayText}</div>
    );
  }
}

export default WaitStatus;
