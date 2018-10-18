import React, { Component } from 'react';
import Pod from "./pod";
import * as moment from "moment";

class PodContainer extends Component {

  componentDidMount() {
  }

  render() {
    var errorPods = this.props.pods.filter(function(el, id, ar) {
      var podPhase = el.phase
      var podReady = el.ready
      return (podPhase === 'error' || podPhase === 'pending' || (podReady === "false" && podPhase !== "succeeded"))
    });

    var okPods = this.props.pods.filter(function(el, id, ar) {
      var podPhase = el.phase
      var podReady = el.ready
      return !(podPhase === 'error' || podPhase === 'pending' || (podReady === "false" && podPhase !== "succeeded"))
    });

    var allPods = errorPods.concat(okPods);

    var podList = allPods.map(function(pod_entry) {
      var name = pod_entry.name;
      var az = pod_entry.az|| 'unknown'
      var phase = pod_entry.phase || 'unknown'
      phase = phase.toLowerCase()
      var created_at = pod_entry.created_at
      var since = moment.unix(created_at).fromNow() || 'unknown'
      var ready = pod_entry.ready
      var node = pod_entry.node
      var namespace = pod_entry.namespace
      if (node) {
        node = node.replace(/\.ec2\.internal/, '');
      } else {
        node = 'unknown'
      }
      var blink = 0;
      if ( phase === 'error' || phase === 'pending' || (ready === "false" && phase !== "succeeded")) {
        blink = 1;
      }
      return (
        <Pod pod={name} namespace={namespace} node={node} az={az} state={phase.toLowerCase()} since={since} ready={ready} blink={blink} setFetchLocked={this.props.setFetchLocked} created_at={created_at} key={name}/>
      );
    }.bind(this));

    return (
      <div className="pod-container">
         {podList}
      </div>
    );
  }
}
export default PodContainer;
