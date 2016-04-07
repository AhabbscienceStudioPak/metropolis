import metropolisHastings from "./metropolis.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";
import {map, curry, flatten} from "ramda";
import genMetroDist from "./genMetroDist.js";
import interpolate from "./interpolate.js";


export default function DrawMetroDist(iterations, xDomain, yDomain, width, numPoints, svg, readyFunc, variance, acceptFunc) {
    const drawDist = data => {
        d3.select("#metroDist").remove();
        const distSvg = svg.append("g").attr("id", "metroDist");
        const flat = flatten(data);
        let maxVal = 0;
        const len = flat.length;
        for (var i=0; i<len; i++) {
          const curr = flat[i];
          if (curr > maxVal) maxVal = curr;
        }
        const scale = maxVal / 34;
        const localPoints = [2,5,13]
        const mapScale = s => map(x => (x * scale / Math.log(scale) * s), localPoints);
        drawContour(distSvg, data, width, [...map(x => x * Math.log(scale), [1, 2, 5]), ...mapScale(0.3), ...mapScale(0.1), scale*34], true);
    };

    const metroDistParams = [iterations, xDomain, yDomain, width, numPoints, variance];

    const drawOnUiThread = () => {
      const chainDist = genMetroDist(...metroDistParams, acceptFunc);
      drawDist(chainDist);
      readyFunc();
    };

    // Use web worker to generate distribution if possible
    if(typeof(Worker) !== "undefined") {
      var genMetroDistWorker = require("worker!./genMetroDist.js");
      var worker = new genMetroDistWorker();
      worker.postMessage(metroDistParams);
      worker.onmessage = e => {
        drawDist(e.data[0]);
        acceptFunc(e.data[1]);
        if (readyFunc) readyFunc();
      }
      worker.onerror = drawOnUiThread;
    }
    else drawOnUiThread();
}

