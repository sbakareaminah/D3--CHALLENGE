var width = parseFloat(d3.select('#scatter').style('width'));
var height = 0.66*width


var svg = d3
    .select('#scatter')
    .append('svg')
    .style('width',width)
    .style('height',height)
    .style('class','chart')
    .style('border', '2px solid black')
    .style('border-radius','12px');




// Params
XAxis = "poverty";
YAxis = "healthcare";

 

  // Import Data
  var stateData = await d3.csv("assets/data/data.csv");
  d3.csv("data.csv").then(function(data) {
    console.log(data);
  // Parse Data
  stateData.forEach(function(data) {
    data.poverty    = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age        = +data.age;
    data.smokes     = +data.smokes;
    data.obesity    = +data.obesity;
    data.income     = +data.income;
  });

  //  scale functions
  xLinearScale = xScale(stateData, XAxis);
  yLinearScale = yScale(stateData, YAxis);

  //  axis functions
   bottomAxis = d3.axisBottom(xLinearScale);
  leftAxis = d3.axisLeft(yLinearScale);

  // Append x and y axes to the chart
  xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  let yAxis = chartGroup.append("g")
    .call(leftAxis);

  // Create scatterplot and append initial circles
   circlesGroup = chartGroup.selectAll("g circle")
    .data(stateData)
    .enter()
    .append("g");
  
  circlesXY = circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d[XAxis]))
    .attr("cy", d => yLinearScale(d[YAxis]))
    .attr("r", 15)
    .classed("stateCircle", true);
  
  let circlesText = circlesGroup.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d[XAxis]))
    .attr("dy", d => yLinearScale(d[YAxis]) + 5)






var xText = svg.append('g').attr('transform',`translate(${width/2},${.98*height})`);

xText
    .append('text')
    .attr('class','aText inactive x')
    .text('Household Income (Medium)');

xText
    .append('text')
    .attr('y',-20)
    .attr('class','aText inactive x')
    .text('Age (Medium)');

xText
    .append('text')
    .attr('y',-40)
    .attr('class','aText active x')
    .text('In Poverty (%)');

var yText = svg.append('g').attr('transform',`translate(5,${height/2})rotate(-90)`);

yText
    .append('text')
    .attr('class','aText inactive y')
    .text('Lacks Healthcare (%)');

yText
    .append('text')
    .attr('y',-20)
    .attr('class','aText inactive y')
    .text('smokes (%)');

yText
    .append('text')
    .attr('y',-40)
    .attr('data-id','poverty')
    .attr('class','aText active y')
    .text('Obese (%)');


 // initial tooltips
 circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

 // x axis labels event listener
 xlabelsGroup.selectAll("text")
   .on("click", function() {
   // get value of selection
   var value = d3.select(this).attr("value");
   if (value !== XAxis) {

     // replaces XAxis with value
     XAxis = value;

     // updates x scale for new data
     xLinearScale = xScale(stateData, XAxis);

     // updates x axis with transition
     xAxis = renderXAxes(xLinearScale, xAxis);

     // updates circles with new x values
     circlesXY = renderXCircles(circlesXY, xLinearScale, XAxis);

     // updates circles text with new x values
     circlesText = renderXText(circlesText, xLinearScale, XAxis);

     // updates tooltips with new info
     circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

     // changes classes to change bold text
     if (XAxis === "age") {
       povertyLabel
         .classed("active", false)
         .classed("inactive", true);
       ageLabel
         .classed("active", true)
         .classed("inactive", false);
       incomeLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if (XAxis === "income") {
       povertyLabel
         .classed("active", false)
         .classed("inactive", true);
       ageLabel
         .classed("active", false)
         .classed("inactive", true);
       incomeLabel
         .classed("active", true)
         .classed("inactive", false);
     }
     else {
       povertyLabel
         .classed("active", true)
         .classed("inactive", false);
       ageLabel
         .classed("active", false)
         .classed("inactive", true);
       incomeLabel
         .classed("active", false)
         .classed("inactive", true);
     }
   }
 });

 // y axis labels event listener
 ylabelsGroup.selectAll("text")
   .on("click", function() {
   // get value of selection
   const value = d3.select(this).attr("value");
   if (value !== YAxis) {

     // replaces YAxis with value
     YAxis = value;

     // updates y scale for new data
     yLinearScale = yScale(stateData, YAxis);

     // updates y axis with transition
     yAxis = renderYAxes(yLinearScale, yAxis);

     // updates circles with new y values
     circlesXY = renderYCircles(circlesXY, yLinearScale, YAxis);

     // updates circles text with new y values
     circlesText = renderYText(circlesText, yLinearScale, YAxis);

     // updates tooltips with new info
     circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

     // changes classes to change bold text
     if (YAxis === "smokes") {
       healthcareLabel
         .classed("active", false)
         .classed("inactive", true);
       smokesLabel
         .classed("active", true)
         .classed("inactive", false);
       obeseLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if (YAxis === "obesity"){
       healthcareLabel
         .classed("active", false)
         .classed("inactive", true);
       smokesLabel
         .classed("active", false)
         .classed("inactive", true);
       obeseLabel
         .classed("active", true)
         .classed("inactive", false);
     }
     else {
       healthcareLabel
         .classed("active", true)
         .classed("inactive", false);
       smokesLabel
         .classed("active", false)
         .classed("inactive", true);
       obeseLabel
         .classed("active", false)
         .classed("inactive", true);
     }
   }
 });

})



showData();

function showData() {
    var xActive = d3.selectAll('.x').filter('.active').attr('text');

    console.log(xActive);
};