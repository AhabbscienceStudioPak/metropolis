import MarchingSquaresJS from "./MarchingSquares.js";
import metropolisHastings from "./metropolis.js";
import drawContour from "./drawCountour.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
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
    domain: PropTypes.array.isRequired,
    iterations: PropTypes.number.isRequired
  };

  draw(ele, withPath) {
    const { iterations, size, numPoints, domain } = this.props;

    // Create a fresh svg
    const svg = d3.select(ele)
                  .append("svg")
                  .attr("width", size)
                  .attr("height", size);
    this.state.svg = svg;

    // Draw Rosenbrock plot & start point
    Rosenbrock(domain, size, numPoints, svg);
    drawCircle(domain, domain, size, size, svg);
  };

  drawPath() {
    const { iterations, size, numPoints, domain } = this.props;
    if (this.state.svg) DrawMetroPath(iterations, domain, size, numPoints, this.state.svg);
  }

  render() {
    const { drawing } = this.state;
    return (
        <CardContainer title="Metropolis-Hastings pathing" subtitle="Rosenbrock function " width={500}>
          <div ref={this.draw}></div>
          <br></br>
          <RaisedButton label="Run" onClick={this.drawPath}/>
        </CardContainer>
    );

  }

}

