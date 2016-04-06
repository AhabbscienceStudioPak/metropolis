import d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import MetroControls from "./MetroControls.js";
import AutoSize from "./AutoSize.js";
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import ChainDist from "./ChainDist.js";

class App extends Component {
  render() {
    return (
          <MetroControls iterations={1000} size={500} numPoints={300} xDomain={[-4, 4]} yDomain={[-2, 8]}/>
    );
  }
}

render(<App/>, document.getElementById('mount'));
