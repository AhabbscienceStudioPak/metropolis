import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";


export default function DrawMetroDist(iterations, xDomain, yDomain, width, numPoints, svg) {
    d3.select("#metroDist").remove();
    // Generate data 
    const chain = metropolisHastings(iterations);
    const chainDist = d3.transpose(ChainDist(xDomain, yDomain, numPoints, chain));
    const distSvg = svg.append("g").attr("id", "metroDist");
    drawContour(distSvg, chainDist, width);
}

