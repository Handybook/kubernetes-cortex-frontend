import React, { Component } from 'react';
import SortQuery from "./sort_query"

class QueryOptions extends Component {
  render() {
    return (
      <div className="query-options">
          <SortQuery onSortChanged={this.props.onSortChanged}/>
      </div>
    );
  }
}

export default QueryOptions;
