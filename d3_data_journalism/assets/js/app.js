function loadGraph() {
    // setting height and width variables
    var svgWidth = 900;
    var svgHeight = 500;
    // setting the margin
    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left:100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var labelArea = 110;
    
    
    var tPadBot = 40;
    var tPadLeft = 40;
    
    // Creating a svg variable
    var svg = d3.select('#scatter')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
    
    // Creating a group
    var chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    // Reading in the data and using a function to make the chart
    d3.csv("assets/data/data.csv").then(function(data) {
        visualize(data);
    });

    // defining the function to make the chart
    function visualize(info) {
    // Converting each column into a numeric type
    info.forEach((info)=>{
        info.poverty = +info.poverty
        info.healthcare = +info.healthcare
    })
    
    // creating a x scale and y scale
    var xScale = d3.scaleLinear()
        .domain(d3.extent(info, d=>d.poverty))
        .range([0,width]);
    
    var yScale = d3.scaleLinear()
        .domain(d3.extent(info, d=>d.healthcare))
        .range([height, 0])

    // Creating x and y axis
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)

    // attaching the axis to the group
    chartGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

    chartGroup.append('g')
        .call(yAxis)

    // creating circles
    var circle = chartGroup
        .selectAll('circle')
        .data(info)
        .enter()
        .append('circle')
        .attr('cx', info=> xScale(info.poverty))
        .attr('cy', info=> yScale(info.healthcare))
        .attr('r', 12)
        .classed('stateCircle', true)
        .attr('opacity', '.6')
    
    // Creating the text in the circles
    var circleText = chartGroup
        .select('g')
        .selectAll('circle')
        .data(info)
        .enter()
        .append('text')
        .text(d=>d.abbr)
        .attr('x', info=> xScale(info.poverty))
        .attr('y', info=> yScale(info.healthcare))
        .attr('dy', -395)
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .style('font-familt', 'sans-serif');

    // logging info to the console
    console.log(info)

    // Creating x and y labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 -250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width - 450}, ${height + tPadBot})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
    }

}
// calling function
loadGraph()