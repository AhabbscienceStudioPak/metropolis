import MarchingSquaresJS from "./MarchingSquares.js";
import metropolisHastings from "./metropolis.js";
import drawContour from "./drawCountour.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import CardContainer from "./CardContainer.js"
import "./interpolate";




export default class MetroPath extends Component {
  constructor () {
    super();
    this.draw = this.draw.bind(this);
    this.redraw = this.redraw.bind(this);
    this.state = { ele: null };
  }

  static propTypes = {
    size: PropTypes.number.isRequired,
    numPoints: PropTypes.number.isRequired,
    domain: PropTypes.array.isRequired
  };

  draw(ele, withPath) {
    this.state.ele = ele;
    d3.select(ele).selectAll("svg").remove();
    const { size, numPoints, domain } = this.props;
    const svg = d3.select(ele)
                  .append("svg")
                  .attr("width", size)
                  .attr("height", size);
    Rosenbrock(domain, size, numPoints, svg);
    if (withPath) DrawMetroPath(domain, size, numPoints, svg);
    drawCircle(domain, domain, size, size, svg);
  };

  redraw() {
    if (this.state.ele) this.draw(this.state.ele, true);
  }

  render() {
    return (
        <CardContainer title="Metropolis-Hastings pathing" subtitle="Rosenbrock function " width={500}>
          <div ref={this.draw}></div>
          <br></br>
          <FlatButton label="Run" onClick={this.redraw}/>
        </CardContainer>
    );

  }

}

