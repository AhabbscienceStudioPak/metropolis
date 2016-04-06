import MarchingSquaresJS from "./MarchingSquares.js";
import metropolisHastings from "./metropolis.js";

var rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

var interpolate = (n, min, max) => {
  var step = (max - min) / n;
  var i = 0, curr = min, vals=[];

  for (i; i <= n; i++) {
    vals.push(curr);
    curr += step;
  }

  return vals;
};

var points = interpolate(300,-2,2.6);

var raw = points.map(function(x) {
  return points.map(function (y) {
    return rosenbrock(x,y);
  });
});

function drawMarchingSquaresContours(divId) {
        var zs = [-20, -9, -4.5, 0, 4.5, 9, 13.5, 18, 22.5, 50, 100, 200, 300] ;
        var data = d3.transpose(raw);

        var xs = d3.range(-4, data[0].length);
        var ys = d3.range(-4, data.length);

        var marginBottomLabel = 0;

        var width = 500;
        var height = width * (ys.length / xs.length);
        var chain = metropolisHastings();

        var xScale = d3.scale.linear()
        .range([0, width])
        .domain([Math.min.apply(null,xs), Math.max.apply(null, xs)])

        var yScale = d3.scale.linear()
        .range([0, height])
        .domain([Math.min.apply(null, ys), Math.max.apply(null, ys)])

        var colours = d3.scale.linear().domain([zs[0], zs[zs.length - 1]])
        .range([d3.rgb(0,0,0),
               d3.rgb(180,180,180)]);

       var yMetroScale = d3.scale.linear()
         .domain([-2,2.6])
         .range([0,height]);

       var xMetroScale = d3.scale.linear()
         .range([0,width])
         .domain([-2,2.6]);

        var metroLine = d3.svg.line()
                              .x(point => xMetroScale(point[0]))
                              .y(point => yMetroScale(point[1]));


        var isoBands = [];
        for (var i = 1; i < zs.length; i++) {
            var lowerBand = zs[i-1];
            var upperBand = zs[i];

            var band = MarchingSquaresJS.IsoBands(data, lowerBand, upperBand - lowerBand);
            isoBands.push({"coords": band, "level": i, "val": zs[i]});
        }

        var svg = d3.select(divId)
        .append("svg")
        .attr("width", width)
        .attr("height", height + marginBottomLabel)


        var path = svg.append("path")
           .style("stroke","red")
           .style("opacity",0.6)
           .style("fill", "none")
           .attr("d", metroLine(chain));
        console.log(chain);

        var startPoint = svg.append("circle")
            .attr("cx", xMetroScale(-1.8))
            .attr("cy", xMetroScale(-1.6))
            .attr("r", 3);

        var lineLen = path.node().getTotalLength();
        path.attr("stroke-dasharray", // 2. pattern big enough to hide line
                           lineLen + ", "+lineLen) 
                .attr("stroke-dashoffset",lineLen); 

       path.transition()
              .duration(5000)
              .attr("stroke-dashoffset", 0); 

        svg.selectAll("path")
        .data(isoBands)
        .enter().append("path")
        .style("fill",function(d) { return colours(d.val);})
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


export default function redraw() {
  d3.selectAll("svg").remove();
  drawMarchingSquaresContours("#mount");
}


