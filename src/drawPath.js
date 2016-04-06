const durationMultiplier = dataSize => {
  if (dataSize < 500) return dataSize *8;
  if (dataSize < 2000) return dataSize*2;
  if (dataSize < 8000) return dataSize;
  return dataSize/2;
};

export default function drawPath(xDomain, yDomain, width, height, data, svg) {
   const yScale = d3.scale.linear()
     .domain(yDomain)
     .range([0,height]);

   const xScale = d3.scale.linear()
     .range([0,width])
     .domain(xDomain);

   const line = d3.svg.line()
        .x(point => xScale(point[0]))
        .y(point => yScale(point[1]));

    const path = svg.append("path")
        .attr("id", "metroPath")
        .style("stroke","red")
        .style("opacity",0.6)
        .style("fill", "none")
        .attr("d", line(data));

    const lineLen = path.node().getTotalLength();

    path.attr("stroke-dasharray", lineLen + ", " + lineLen)
         .attr("stroke-dashoffset",lineLen); 

    path.transition()
           .duration(durationMultiplier(data.length))
           .attr("stroke-dashoffset", 0); 
}
