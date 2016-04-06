import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";


export default function DrawMetroPath(iterations, domain, width, numPoints, svg) {
    d3.select("#metroPath").remove();
    // Generate data 
    const chain = metropolisHastings(iterations).filter((_, i) => i % 2 == 0);

    // Draw it
    drawPath(domain, domain, width, width, chain, svg);
}

