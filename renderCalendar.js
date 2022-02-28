let inputObject = document.getElementById('searchTxt')

function drawCalendar(myData) {
  var dict = {};
  tempArr = []
  let tempArr1 = []
  let current = myData[0];
  
  for(let i=0; i<myData.length; i++)
  {
    tempArr.push(myData[i].Day)
  }
  var unique = [...new Set(tempArr)]
  
  for(let i=0; i<unique.length; i++)
  {
    tempArr1 = []
    
    for(let j=0; j<myData.length; j++)
    {
     

      if(myData[j].Day == unique[i])
      {
        tempArr1.push(myData[j].Event_Name)
        dict[new Date(myData[j].Day)] = tempArr1
      }
    }
  }

  
  
  var calendarRows = function(month) {
    var m = d3.timeMonth.floor(month);
    return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m,1)).length;
  }

  var minDate = d3.min(myData, function(d) { 
    return new Date(d.Day); });
  var maxDate = d3.max(myData, function(d) { return new Date(d.Day); });

  var cellMargin = 2,
      cellSize = 20;

  var day = d3.timeFormat("%w"),
      week = d3.timeFormat("%U"),
      format = d3.timeFormat("%m/%d/%Y"),
      titleFormat = d3.utcFormat("%a, %d-%b"),
      monthName = d3.timeFormat("%B"),
      months= d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);
    
  // for(var i=0; i<myData.length; i++){
  //   myData[i].today =  myData[i].Day;
  // }

  var svg = d3.select("#calendar").selectAll("svg")
    .data(months)
    .enter().append("svg")
      .attr("class", "month")
      .attr("width", (cellSize * 7) + (cellMargin * 8) )
      .attr("height", function(d) {
        var rows = calendarRows(d);
        return (cellSize * rows) + (cellMargin * (rows + 1)) + 20; // the 20 is for the month labels
      })
    .append("g")

  svg.append("text")
    .attr("class", "month-name")
    .attr("x", ((cellSize * 7) + (cellMargin * 8)) / 2 )
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text(function(d) { return monthName(d); })

  var rect = svg.selectAll("rect.day")
    .data(function(d, i) {
    
     
      return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1));
    })
    .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", 3).attr("ry", 3) // rounded corners
      
      .attr("fill", '#eaeaea')
      .attr("x", function(d) {
        return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin;
      })
      .attr("y", function(d) {
        return ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) +
               ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) +
               cellMargin + 20;
       })
      .on("mouseover", function(d) {
        d3.select(this).classed('hover', true);
      })
      .on("mouseout", function(d) {
        d3.select(this).classed('hover', false);
      })
      

  rect.append("title")
    .text(function(d) { return titleFormat(new Date(d)); });
    
   
 
  var lookup = d3.nest()
    .key(function(d) { return new Date(d.Day); })
    .rollup(function(leaves) { 
      
      return leaves.length; })
    .object(myData);


   
  count = d3.nest()
    .key(function(d) { return new Date(d.Day); })
    .rollup(function(leaves) { return leaves.length; })
    .entries(myData);
  
  // count1 = d3.nest()
  //   .key(function(d) { return new Date(d.Day); })
  //   .rollup(function(leaves) { 
    
  //     return leaves.length; })
  //   .entries(myData);


   
  scale = d3.scaleLinear()
    .domain(d3.extent(count, function(d) { return d.value; }))
    
    .range([0,1]); // the interpolate used for color expects a number in the range [0,1] but i don't want the lightest part of the color scheme
    
    
  rect.filter(function(d) {
   
    return d in lookup; })
    .style("fill", function(d) { 
   
      return d3.interpolatePuBu(scale(lookup[d])); })
    .classed("clickable", true)
    .on("click", function(d){
      alert(dict[d])
      
      if(d3.select(this).classed('focus')){
        d3.select(this).classed('focus', false);
      } else {
        d3.select(this).classed('focus', true)
      }
      // doSomething();
    })
    .select("title")
      .text(function(d) { return "There are " + lookup[d] + " Events on " + titleFormat(new Date(d))});
      

}





function getInputValue(){

            // Selecting the input element and get its value 
            var mylist = document.getElementById("myList");  
            var inputVal = document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
            var input = document.getElementById("myInputTime").value;
            console.log(input)
            var foo = input == "quit"
            console.log(foo)
       

    
          d3.csv("updated_25data.csv").then(function(data) {
  data = data.filter(function(row) {
        
          return (row['Event_Start'] == input) && (row['Location1'] == inputVal);
         
        

        
    })
  drawCalendar(data)
})
        }