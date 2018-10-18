import React, { Component } from 'react';

class QueryInfo extends Component {

  rnd() {
    return Math.random();
  }

  render() {
    return (
      <div id="query_info" key={this.rnd()}>{this.props.stat}</div>
    );
  }
}

export default QueryInfo;
