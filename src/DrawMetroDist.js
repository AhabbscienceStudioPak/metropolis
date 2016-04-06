import metropolisHastings from "./metropolis.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";
import genMetroDist from "./genMetroDist.js";

var genMetroDistWorker = require("worker!./genMetroDist.js");

export default function DrawMetroDist(iterations, xDomain, yDomain, width, numPoints, svg) {
    d3.select("#metroDist").remove();
    // Generate data
    const chain = metropolisHastings(iterations);
    // const dist = genMetroDist(iterations, xDomain, yDomain, width, numPoints);
    // const chainDist = d3.transpose(dist);

    var worker = new genMetroDistWorker();
    worker.postMessage([iterations, xDomain, yDomain, width, numPoints]);
    worker.onmessage = e => {
      const distSvg = svg.append("g").attr("id", "metroDist");
      drawContour(distSvg, e.data, width, [1,2,3,5,6,7,8,9,15,20,30]);
    };
}

