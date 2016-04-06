import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import drawContour from "./drawCountour.js";
import drawCircle from "./drawCircle.js";
import { map } from "ramda";
import interpolate from "./interpolate";

export const rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function Rosenbrock(xDomain, yDomain, width, numPoints, svg ) {
  const xyScale = (xDomain[1] - xDomain[0]) / (yDomain[1]-yDomain[0]);
  // Generate data 
  const xPoints = interpolate(numPoints, ...xDomain);
  const yPoints = interpolate(numPoints, ...yDomain);
  const plotRosenbrock = (xData, yData) => map(x => map(y => rosenbrock(x, y), yData), xData);
  const data = d3.transpose(plotRosenbrock(xPoints, yPoints));

  // Draw it
  drawContour(svg, data, width);
}
