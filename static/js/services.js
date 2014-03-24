var eplTableServices = angular.module('eplTableServices', ['ngResource']);

eplTableServices.factory('Team', ['$resource', 
    function($resource) {
        return $resource('/teams/:id', {}, {
            query: { method: "GET" }
        });
    }]);

eplTableServices.factory('D3js', [
    function() {
        return {
            draw_graph: function(data) {
                // Set up margins, height and weight
                var m = [50, 50, 50, 50];
                var w = $("#graph").width() - m[1] - m[3];
                var h = 600 - m[0] - m[2];

                // Set up x and y axis domains and scales
                var x = d3.scale.linear().domain([1, data.length]).range([0, w]);
                var y = d3.scale.linear().domain([data[data.length-1]-5, data[0]+5]).range([h, 0]);

                // Line functions
                var line = d3.svg.line()
                    .x(function(d, i) {
                        return x(i+1); // Increase index by 1 to use actual position
                    })
                    .y(function(d) {
                        return y(d);
                    });

                // Draw the graph
                var graph = d3.select("#graph").append("svg:svg")
                    .attr("width", w + m[1] + m[3])
                    .attr("height", h + m[0] + m[2])
                    .append("svg:g")
                    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

                var tick_width = (w + 50)/20;

                // Add first tier color
                graph.append("rect")
                    .attr("x", 1)
                    .attr("y", 0)
                    .style("opacity", 0.6)
                    .attr("fill", "#27ae60")
                    .attr("width", tick_width * 3)
                    .attr("height", h);

                // Add second tier color
                graph.append("rect")
                    .attr("x", tick_width * 3)
                    .attr("y", 0)
                    .style("opacity", 0.6)
                    .attr("fill", "#e67e22")
                    .attr("width", tick_width)
                    .attr("height", h);

                // Add third tier color
                graph.append("rect")
                    .attr("x", (w - tick_width * 3))
                    .attr("y", 0)
                    .style("opacity", 0.6)
                    .attr("fill", "#c0392b")
                    .attr("width", tick_width * 3)
                    .attr("height", h);

                // Draw the x-axis
                var xAxis = d3.svg.axis().scale(x).tickSize(-h).ticks(20).tickSubdivide(true);
                graph.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + h + ")")
                    .call(xAxis);

                // Draw the y-axis
                var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
                graph.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(0,0)")
                    .call(yAxisLeft);

                // Add an x-axis label
                graph.append("text")
                    .attr("x", w/2 )
                    .attr("y",  h+50 )
                    .style("text-anchor", "middle")
                    .text("Team Position");

                // Add a y-axis label
                graph.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -50)
                    .attr("x", -h/2)
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Points");

                // Append the graph and draw the line
                graph.append("svg:path").attr("d", line(data));
            }
        }
    }]);