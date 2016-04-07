import MarchingSquaresJS from "./MarchingSquares.js";
import {assoc} from "ramda";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import NumberEditor from "react-number-editor";
import MetroPath from "./MetroPath.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import AutoSize from "./AutoSize.js";
import "./interpolate";

export default class MetroControls extends Component {
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
    yDomain: PropTypes.array.isRequired
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
        <CardContainer title="Metropolis-Hastings visualisation" subtitle="Rosenbrock function " width={560}>
          <div ref={this.draw}></div>
          <br></br>
          <NumberEditor
            step={500}
            value={iterations}
            min={10}
            onValueChange={this.updateIterations}
            style={{width: "5em", marginRight: "2em"}}
            max={20000}
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
          <MetroPath 
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

