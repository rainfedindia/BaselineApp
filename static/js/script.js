 $(function () {
 		//when histo : ?
 		var histograms = ["total_hh",'propotion_oc','propotion_obc',
 				'propotion_sc','propotion_st','caste_domination_idx'];
 		var proportions = ["propotion_oc"];
 		var yesNo = ['road_present_y/n']
        //Initialize Select2 Elements
        d3.csv('static/data/dataV1.csv',function(e,data){
        	//get all the keys
        	var keys = data[0];
        	var options = '';
        	for(a in keys)
        	{
        		options+='<option id="'+a+'"">'+a+'</option>';
        	
        	}
        	$(".select2#attributeOne").html(options);
        	$(".select2").select2();

        	$(".select2#attributeOne").on("change",function(){
        		//from string to numeric

        		data.forEach(function(d, i){
        			d[this.value] = +d[this.value];
        		});
        		visualize(this.value);
        	});	

        	function visualize(idAttribute)
        	{
        		if($.inArray(idAttribute, histograms) >= 0)
        		{
        	
        			histogram(idAttribute,data);
        		}
        		if($.inArray(idAttribute, yesNo) >= 0)
        		{
        	
        			pieChart(idAttribute,data);
        		}
        		
        	}
        
        	function histogram(id,data)
        	{
        		var dataHisto = [];
				data.forEach(function(d, i){
					if(+d[id]!=0)
					{

						dataHisto.push(+d[id]);
					}

				});
					
				
        		$("#histoSelector").html('Select the number of class you want to see (<span id="rangeValue">10</span> classes) : <input id="histoSelectorRange"  type="range" value="10" max="50" min="2" step="1">');
        		$("#histoSelectorRange").on("change",function(){
	        		$("#rangeValue").html(this.value);
	        		draw(this.value);
	        	});	
        		draw(10);
        		function draw(nb)
        		{
        			$("#vizOne").html("");
					// A formatter for counts.
					var formatCount = d3.format(",.0f");

					var margin = {top: 10, right: 30, bottom: 30, left: 30},
					    width = 960 - margin.left - margin.right,
					    height = 500 - margin.top - margin.bottom;

					    
					var x = d3.scale.linear()
					    .domain([0, d3.max(dataHisto)])
					    .range([0, width]);

					// Generate a histogram using twenty uniformly-spaced bins.
					var data = d3.layout.histogram()
					    .bins(x.ticks(nb))
					    (dataHisto);
					
					
					var y = d3.scale.linear()
					    .domain([0, d3.max(data, function(d) { return d.y; })])
					    .range([height, 0]);

					var xAxis = d3.svg.axis()
					    .scale(x)
					    .orient("bottom");

					var svg = d3.select("#vizOne").append("svg")
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					var bar = svg.selectAll(".bar")
					    .data(data)
					  .enter().append("g")
					    .attr("class", "bar")
					    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

					bar.append("rect")
					    .attr("x", 1)
					    .attr("width", x(data[0].dx) - 2)
					    .attr("height", function(d) { return height - y(d.y); });

					bar.append("text")
					    .attr("dy", ".75em")
					    .attr("y", 6)
					    .attr("x", x(data[0].dx) / 2)
					    .attr("text-anchor", "middle")
					    .text(function(d) { return formatCount(d.y); });

					svg.append("g")
					    .attr("class", "x axis")
					    .attr("transform", "translate(0," + height + ")")
					    .call(xAxis);
        		}//end Draw histo
        		
        	}//End Histo

        	function pieChart(id,data)
        	{
        		var dataPie = [0,0];
				data.forEach(function(d, i){
					dataPie[(+d[id])]+=1;
				});
				console.log(dataPie);
					
        	}

        });


});