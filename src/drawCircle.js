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
        .attr("cx", xScale(0))
        .attr("cy", yScale(7))
        .attr("r", 4);
}
