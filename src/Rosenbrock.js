import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import drawContour from "./drawContour.js";
import drawCircle from "./drawCircle.js";
import { map } from "ramda";
import interpolate from "./interpolate";

export const rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function Rosenbrock(xDomain, yDomain, width, numPoints, svg ) {
  // Generate data 
  const xPoints = interpolate(numPoints, ...xDomain);
  const yPoints = interpolate(numPoints, ...yDomain);
  const plotRosenbrock = (xData, yData) => map(x => map(y => rosenbrock(x, y), yData), xData);
  const data = plotRosenbrock(xPoints, yPoints);
  console.log(data.length);

  // Draw it
  drawContour(svg, data, width);
}
