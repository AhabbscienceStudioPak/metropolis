import MarchingSquaresJS from "./MarchingSquares.js";
import metropolisHastings from "./metropolis.js";
import DrawMetroDist from "./DrawMetroDist.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import MetroControls from "./MetroControls.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import "./interpolate";

export default class MetroDist extends Component {
  constructor () {
    super();
    this.draw = this.draw.bind(this);
    this.redraw= this.redraw.bind(this);
    this.state = { svg: null, ready: true };
  }

  static propTypes = {
    size: PropTypes.number.isRequired,
    numPoints: PropTypes.number.isRequired,
    xDomain: PropTypes.array.isRequired,
    yDomain: PropTypes.array.isRequired,
    iterations: PropTypes.number.isRequired
  };

  draw(ele, withPath) {
    const { iterations, size, numPoints, xDomain, yDomain } = this.props;
    const first = !this.state.svg;

    // Create a fresh svg
    const svg = d3.select(ele)
                  .append("svg")
                  .attr("width", size)
                  .attr("height", size);

    this.state.svg = svg;

    // Draw metropolis distribution
    if (!first) {
      DrawMetroDist(iterations, xDomain, yDomain, size, numPoints, svg);
      this.setState({ran, true}); 
    }
  };

  redraw() {
    if (!this.state.svg) return;

    const { iterations, size, numPoints, xDomain, yDomain } = this.props;
    const readyFunc = () => {this.setState({ready: true}); console.log('hey');};
    this.setState({ready: false});
    DrawMetroDist(iterations, xDomain, yDomain, size, numPoints, this.state.svg, readyFunc);
  }

  render() {
    const { ready } = this.state;
    return (
        <div>
          <div ref={this.draw}></div>
          <br></br>
          <br></br>
          <RaisedButton label={ready ? "Run" : "Generating..."} onClick={this.redraw} style={{marginRight: "1em"}} disabled={!ready}/>
        </div>
    );

  }

}

