export default function drawCircle(xDomain, yDomain, width, height, svg) {
   const yScale = d3.scale.linear()
     .domain(yDomain)
     .range([0,height]);

   const xScale = d3.scale.linear()
     .range([0,width])
     .domain(xDomain);

    svg.append("circle")
        .attr("fill", "red")
        .attr("stroke", "black")
        .attr("cx", xScale(-1.8))
        .attr("cy", yScale(-1.6))
        .attr("r", 4);
}
