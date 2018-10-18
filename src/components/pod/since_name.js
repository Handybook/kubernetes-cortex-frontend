import React, { Component } from 'react';

class SinceName extends Component {
  render() {
    return (
      <div className="since-name">
        {this.props.value}
      </div>
    );
  }
}

export default SinceName;
