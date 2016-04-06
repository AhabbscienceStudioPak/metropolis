import metropolisHastings from "./metropolis.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";

export default function genMetroDist(iterations, xDomain, yDomain, width, numPoints) {
    // Generate data 
    const chain = metropolisHastings(iterations);
    return ChainDist(xDomain, yDomain, numPoints, chain);
}

onmessage = function(e) {
  const chainDist = genMetroDist(...e.data);
  postMessage(chainDist);
}
