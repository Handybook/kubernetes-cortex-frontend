import React, { Component } from 'react';
import { BACKEND_URL } from "../../config/constants";

import * as d3 from "d3";

class Chart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { data: [] };
  }

  getMetrics() {
    fetch(BACKEND_URL + "/metrics?podname=" + this.props.podname).then(function(response){
         return response.json()
    }).then(function(json) {
         console.log(json);
         this.setState({data: json}); 
    }.bind(this)).catch(function(ex) {
         console.log('parsing failed', ex)
    });
  }

  componentDidMount() {
    this.getMetrics();
  }

  componentDidUpdate() {
    var data = this.state.data.cpu || [];
    let svg = d3.select(this.svg)
    let height = this.svg.clientHeight
    let width = this.svg.clientWidth

    //var area = d3.area()
    //    .x(function(d) { return x(d.time); })
    //    .y1(function(d) { return y(d.cpu_usage_nanocores); });

    var parseTime = d3.isoParse;

    var x = d3.scaleTime()
              .domain(d3.extent(data, d => parseTime(d.time)))
              .rangeRound([0, width]);
    
    var y = d3.scaleLinear()
              .domain(d3.extent(data, d => d.cpu_usage_nanocores))
              .rangeRound([height, 0]);
    
    var line = d3.line()
                  .x(d => x(parseTime(d.time)))
                  .y(d => y(d.cpu_usage_nanocores))

    svg.append('path')
       .datum(data)
        .style("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("millicores");  
    
  }

  render() {
    return (
      <div className="modal-chart">
        <svg ref={ref => this.svg = ref}></svg>
      </div>
    );
  }
}

export default Chart;
