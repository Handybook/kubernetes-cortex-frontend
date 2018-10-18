import React, { Component } from 'react';

class Loading extends Component {
  render() {
    if (!this.props.loaded) {
      return (
        <div id="loading_area">
          <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
          </div>
          <div id="loading_text">
            <div className="loading_span_blink">INITIATING CONNECTION WITH CLUSTER MAINFRAME...</div> 
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Loading;
