import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";


export default function DrawMetroPath(iterations, xDomain, yDomain, width, numPoints, svg) {
    d3.select("#metroPath").remove();
    // Generate data 
    const chain = metropolisHastings(iterations).filter((_, i) => i % 2 == 0);
    // Draw it
    drawPath(xDomain, yDomain, width, width, chain, svg);
}

