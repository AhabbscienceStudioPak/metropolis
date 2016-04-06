import metropolisHastings from "./metropolis.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";
import genMetroDist from "./genMetroDist.js";


export default function DrawMetroDist(iterations, xDomain, yDomain, width, numPoints, svg, readyFunc) {
    const drawDist = data => {
        d3.select("#metroDist").remove();
        const distSvg = svg.append("g").attr("id", "metroDist");
        drawContour(distSvg, data, width, [1,2,3,5,6,7,8,9,15,20,30]);
    };

    const metroDistParams = [iterations, xDomain, yDomain, width, numPoints];

    // Use web worker to generate distribution if possible
    if(typeof(Worker) !== "undefined") {
      var genMetroDistWorker = require("worker!./genMetroDist.js");
      var worker = new genMetroDistWorker();
      worker.postMessage(metroDistParams);
      worker.onmessage = e => {
        drawDist(e.data);
        if (readyFunc) readyFunc();
      }
    }
    else {
      const chainDist = genMetroDist(...metroDistParams);
      drawDist(chainDist);
    }
}

