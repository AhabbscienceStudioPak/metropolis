import d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import MetroControls from "./MetroControls.js";
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import MetroDistControls from "./MetroDistControls.js";
import AutoSize from "./AutoSize.js";

render(<AutoSize width={580}><MetroControls iterations={1000} size={500} numPoints={300} xDomain={[-4, 4]} yDomain={[-2, 8]}/></AutoSize>, document.getElementById('mount0'));
render(<AutoSize width={580}><MetroDistControls iterations={5000} size={500} numPoints={300} xDomain={[-4, 4]} yDomain={[-2, 8]}/></AutoSize>, document.getElementById('mount1'));
