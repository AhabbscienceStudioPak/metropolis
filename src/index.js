import d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import MetroControls from "./MetroControls.js";
import AutoSize from "./AutoSize.js";
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import ChainDist from "./ChainDist.js";
import MetroDistControls from "./MetroDistControls.js";

class App extends Component {
  render() {
    return (
        <div>
          <MetroControls iterations={1000} size={500} numPoints={500} xDomain={[-3, 3]} yDomain={[-3, 9]}/>
          <MetroDistControls iterations={1000} size={500} numPoints={100} xDomain={[-3, 3]} yDomain={[-3, 9]}/>
        </div>
    );
  }
}

render(<App/>, document.getElementById('mount'));
