import MarchingSquaresJS from "./MarchingSquares.js";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import MetroControls from "./MetroControls.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import "./interpolate";

export default class MetroPath extends Component {
  constructor () {
    super();
    this.draw = this.draw.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.state = { svg: null };
  }

  static propTypes = {
    size: PropTypes.number.isRequired,
    numPoints: PropTypes.number.isRequired,
    xDomain: PropTypes.array.isRequired,
    yDomain: PropTypes.array.isRequired,
    iterations: PropTypes.number.isRequired,
    variance: PropTypes.number.isRequired,
    acceptFunc: PropTypes.func.isRequired
  };

  draw(ele, withPath) {
    const { iterations, size, numPoints, xDomain, yDomain } = this.props;

    // Create a fresh svg
    const svg = d3.select(ele)
                  .append("svg")
                  .attr("width", size)
                  .attr("height", size);
    this.state.svg = svg;

    // Draw Rosenbrock plot & start point
    Rosenbrock(xDomain, yDomain, size, numPoints, svg);
    drawCircle(xDomain, yDomain, size, size, svg);
  };

  drawPath() {
    const { iterations, size, numPoints, xDomain, yDomain, variance, acceptFunc } = this.props;
    if (this.state.svg) DrawMetroPath(iterations, xDomain, yDomain, size, numPoints, this.state.svg, variance, acceptFunc);
  }

  render() {
    const { drawing } = this.state;
    return (
        <div>
          <div ref={this.draw}></div>
          <br></br>
          <RaisedButton label="Run" onClick={this.drawPath}/>
        </div>
    );

  }

}

