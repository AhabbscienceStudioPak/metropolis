import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import drawContour from "./drawCountour.js";
import drawCircle from "./drawCircle.js";
import { map } from "ramda";
import interpolate from "./interpolate";

export const rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function Rosenbrock(domain, width, numPoints, svg ) {
  // Generate data 
  const plotRosenbrock = data => map(x => map(y => rosenbrock(x, y), data), data);
  const points = interpolate(numPoints, ...domain);
  const data = d3.transpose(plotRosenbrock(points));

  // Draw it
  drawContour(svg, data, width);
}
