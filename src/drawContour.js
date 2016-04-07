import MarchingSquaresJS from "./MarchingSquares.js";

// drawContour :: Svg -> [[Number]] -> Int -> IO ()
export default function drawContour(svg, data, width, customZs, reverse) {
  var zs = customZs || [0,1,2, 4.5, 9, 13.5, 18, 22.5, 50, 100, 200, 300]

  var xSize = data[0].length;
  var ySize = data.length;

  var xs = d3.range(0, xSize);
  var ys = d3.range(0, ySize);
  var height = width * (ys.length / xs.length);

  var xScale = d3.scale.linear()
    .range([0, width])
    .domain([0, xSize])

  var yScale = d3.scale.linear()
    .range([0, height])
    .domain([0, ySize])

  var colours = d3.scale.linear().domain([zs[0], zs[zs.length - 1]])
        .range(reverse ? [d3.rgb(180,180,180), d3.rgb(0,0,0)] : [d3.rgb(0,0,0), d3.rgb(180,180,180)]);


  var isoBands = [];
  for (var i = 1; i < zs.length; i++) {
      var lowerBand = zs[i-1];
      var upperBand = zs[i];

      var band = MarchingSquaresJS.IsoBands(data, lowerBand, upperBand - lowerBand);
      isoBands.push({"coords": band, "level": i, "val": zs[i]});
  }

  svg.selectAll("path")
  .data(isoBands)
  .enter().append("path")
  .style("fill",function(d) { return colours(d.val);})
  .style("stroke-opacity",0.2)
  .style("stroke","black")
  .style('opacity', 0.5)
  .attr("d", function(d) {
      var p = "";
      d.coords.forEach(function(aa, i){
          p += (d3.svg.line()
                .x(function(dat){ return xScale(dat[0]); })
                .y(function(dat){ return yScale(dat[1]); })
                .interpolate("linear")
               )(aa) + "Z";
      });
      return p; 
  });
}
