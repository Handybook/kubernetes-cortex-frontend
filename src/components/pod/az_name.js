import React, { Component } from 'react';

class AzName extends Component {
  render() {
    return (
      <div className={this.renderAzClass()}>
        {this.props.value}
      </div>
    );
  }

  renderAzClass() {
    var az_class = ''
    if (!this.props.value) {
      az_class = "az-name unknown"
    } else {
      az_class = "az-name " + this.props.value.split("").reverse().join("").split("-")[0]
    }
    return az_class
  }
}

export default AzName;
