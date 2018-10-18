import React, { Component } from 'react';

class SortQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: 'az' };
  }

  change(event) {
    this.setState({value: event.target.value});
    this.props.onSortChanged(event.target.value);
  }

  render() {
    return (
      <select onChange={this.change.bind(this)} value={this.state.value}>
        <option value="az">Availability Zone</option>
        <option value="name">Pod Name</option>
        <option value="node">Node</option>
        <option value="phase">Phase</option>
        <option value="created_at">Created At</option>
      </select>
    )
  }
}

export default SortQuery;
