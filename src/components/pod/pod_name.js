import React, { Component } from 'react';

class PodName extends Component {
  render() {
    return (
      <div className="pod-name">
        {this.props.value}
      </div>
    );
  }
}

export default PodName;
