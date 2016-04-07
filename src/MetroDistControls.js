import MarchingSquaresJS from "./MarchingSquares.js";
import {assoc} from "ramda";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import MetroDist from "./MetroDist.js";
import drawCircle from "./drawCircle.js";
import NumberEditor from "react-number-editor";
import MetroPath from "./MetroPath.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import AutoSize from "./AutoSize.js";
import "./interpolate";

export default class MetroDistControls extends Component {
  constructor () {
    super();
    this.state = { iterations: 1000, variance: 0.01, acceptPercent: null };
    this.updateIterations = this.updateIterations.bind(this);
    this.updateVariance = this.updateVariance.bind(this);
    this.acceptFunc = this.acceptFunc.bind(this);
  }

  static propTypes = {
    size: PropTypes.number.isRequired,
    xDomain: PropTypes.array.isRequired,
    yDomain: PropTypes.array.isRequired,
    numPoints: PropTypes.number.isRequired
  };

  updateIterations(iterations)  {
    this.setState({iterations: iterations});
  };

  acceptFunc(percentage) {
    this.setState({acceptPercent: percentage});
  };

  updateVariance(variance)  {
    this.setState({variance: variance});
  };

  render() {
    const { acceptPercent, variance, iterations } = this.state;
    const { xDomain, yDomain, size, numPoints } = this.props;
    return (
        <CardContainer title="Metropolis-Hastings distribution" subtitle="Rosenbrock function " width={560}>
          <div ref={this.draw}></div>
          <br></br>
          <NumberEditor
            step={10000}
            value={iterations}
            min={1000}
            onValueChange={this.updateIterations}
            style={{width: "5em", marginRight: "2em"}}
            max={5000000}
            label="Iterations"
            decimals={0}
          />
          <NumberEditor
            step={0.1}
            value={variance}
            min={0.001}
            onValueChange={this.updateVariance}
            style={{width: "5em", marginRight: "2em"}}
            max={10}
            label="Variance"
            decimals={3}
          />
          {acceptPercent ? `Acceptance rate: ${Math.round(acceptPercent*10)/10}%` : ""}

          <MetroDist
            size={size}
            numPoints={numPoints}
            xDomain={xDomain}
            yDomain={yDomain}
            iterations={iterations}
            variance={variance}
            acceptFunc={this.acceptFunc}
          />
        </CardContainer>
    );

  }

}

