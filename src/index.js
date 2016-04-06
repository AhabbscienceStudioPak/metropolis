import d3 from 'd3';
import React from 'react';
import MetroPath from "./MetroPath.js";
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

render(<MetroPath size={500} numPoints={300} domain={[-2,2.6]}/>, document.getElementById('mount'));


