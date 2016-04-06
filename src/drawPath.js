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
           .duration(data.length * 2)
           .attr("stroke-dashoffset", 0); 
}
