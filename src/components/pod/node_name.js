import React, { Component } from 'react';

class NodeName extends Component {
  render() {
    return (
      <div className="node-name">
        {this.props.value}
      </div>
    );
  }
}

export default NodeName;
