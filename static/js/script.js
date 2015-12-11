 $(function() {

 	/*$(".reduce").click(function(){
	    if($(this).html() == "-"){
	        $(this).html("+");
	    }
	    else{
	        $(this).html("-");
	    }
	    $(this).parent().parent().find(".content").slideToggle();
	});
*/
     //when histo : ?
     var histograms = ["total_hh", 'propotion_oc', 'propotion_obc',
         'propotion_sc', 'propotion_st', 'caste_domination_idx', 'amenities_0-5kms_no'
     ];
     var proportions = ["propotion_oc"];
     var zeros = ['amenities_0-5kms_no'];
     var yesNo = ['road_present_y/n', 'angw_present_y/n', 'elec_present_y/n', 'pds_present_y/n',
             'drnkwtr_present_y/n', 'mblrcep_present_y/n']

      //Initialize Select2 Elements
     d3.csv('static/data/dataV1.csv', function(e, data) {
         //get all the keys
         var keys = data[0];
         var attribute1 = 'none';
         var attribute2 = 'none';
         var options = '<option id="none">none</option>';
         for (a in keys) {
         	if(a!='general.village' && a!='cp_id')
         	{
             options += '<option id="' + a + '"">' + a + '</option>';
         	}

         }
         $(".select2#attributeOne").html(options);
         $(".select2#attributeTwo").html(options);
         
         $(".select2").select2();

         $(".select2#attributeOne").on("change", function() {
             //from string to numeric
             attribute1 = this.value;
             if(attribute1 != "none")
             {
             	$('#attributeTwo').select2('enable');
             }
             else
             {
             	
             	$('#attributeTwo').select2("enable",false);
             	
             }
             data.forEach(function(d, i) {
                 d[this.value] = +d[this.value];
                 d["cp_id"] = +d["cp_id"];
             });
             
         });

         $('#go').on("click",function(){
         	if(attribute1 != 'none' && attribute2 == "none")
         	{
         		
         		visualizeOne(attribute1);
         	
         	}
         	if(attribute1 != 'none' && attribute2 != "none")
         	{
         		
         		visualizeOneVsOne(attribute1,attribute2);
         	
         	}
         });

         $(".select2#attributeTwo").on("change", function() {
             //from string to numeric
             attribute2 = this.value;
             data.forEach(function(d, i) {
                 d[this.value] = +d[this.value];
             });
         });

         function visualizeOne(idAttribute) {
         		
         	var checkboxes = [];

         	for (var i = 0; i < 8; i++) {
         		
         		if($('#cb'+i)[0].checked == true)
         		{
         			checkboxes.push(i);
         		}
         	}
         	

         	 clear();
             if ($.inArray(idAttribute, histograms) >= 0) {

                 histogram(idAttribute, data,checkboxes);
             }
             if ($.inArray(idAttribute, yesNo) >= 0) {

                 pieChart(idAttribute, data,checkboxes);
             }

         } // End vizualize

         function visualizeOneVsOne(id1,id2)
         {
			var checkboxes = [];

         	for (var i = 0; i < 8; i++) {
         		
         		if($('#cb'+i)[0].checked == true)
         		{
         			checkboxes.push(i);
         		}
         	}
         	

         	if ($.inArray(id1, histograms) >= 0) 
         	{
         		if ($.inArray(id2, histograms) >= 0)
         		{
         			scatterPlot(id1,id2,data,checkboxes);
         		} 
         	}

         }


         function histogram(id, data,cb) {
         	
         	clear();
            var nb0 = 0;
            var svg = [];
            var dataHisto = [[],[],[],[],[],[],[],[]];
         	
	        
	             data.forEach(function(d, i) {
	             	
	                 
		                 if ($.inArray(id, zeros) >= 0) 
		                 {
		                     dataHisto[0].push(+d[id]);
		                     dataHisto[d['cp_id']].push(+d[id]);
		                 }
		                 else
		                 {

		                     if (+d[id] != 0) 
		                     {
		                  		dataHisto[0].push(+d[id]);
		                     	dataHisto[d['cp_id']].push(+d[id]);
		                     }
		                     else 
		                     {
		                         nb0 += 1;
		                     }
		                 }
	                 
	             });
	             if (nb0 != 0) {
	                 $("#nb0").html('There are ' + nb0 + ' zeros in the set, this explain why 100% couldn\'t be reached');

	             }
         		
         	

         	
             $("#histoSelector").html('Select the number of class you want to see (<span id="rangeValue">10</span> classes) : <input id="histoSelectorRange"  type="range" value="10" max="50" min="2" step="1">');
             $("#histoSelectorRange").on("change", function() {
                 $("#rangeValue").html(this.value);
	            $("#viz").html('');
	            $("#viz2").html('');
	            $("#viz3").html('');
                             for (var i = 0; i < cb.length; i++) 
            {

             	draw(this.value,cb.length,dataHisto[cb[i]],i+1);
            	
            }
             });
             //var lineCoord = [];
            
             
            for (var i = 0; i < cb.length; i++) 
            {

             	draw(10,cb.length,dataHisto[cb[i]],i+1);
            	
            }
            
             function draw(nb,cb,dataHisto,id) {
             	var div = "div"+id;
             	
             	if(cb==1)
             	{
             		$("#viz").append("<div class='eleven columns' id='"+div+"' ></div>");
             	}
             	if(cb==2 || cb == 3 ||cb == 4)
             	{
             		if(id != 2 && id != 1)
             		{

             			$("#viz2").append("<div class='six columns' id='"+div+"'></div>");
             		}
             		else
             		{

             			$("#viz").append("<div class='six columns' id='"+div+"'></div>");
             		}
             	}
             	if(cb == 5 || cb == 6 || cb == 7 || cb == 8 )
             	{
             		if(id <4)
             		{

             			$("#viz").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else if(id > 6)
             			{

             			$("#viz3").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else
             		{
             		
             			$("#viz2").append("<div class='four columns' id='"+div+"'></div>");
             		
             		}
             	}
             	
                 // A formatter for counts.
                 var formatCount = d3.format(",.0f");

                 var margin = {
                         top: 30,
                         right: 30,
                         bottom: 30,
                         left: 50
                     },
                     width = $("#"+div).width() - margin.left - margin.right;
                     var height = (width/1.8) - margin.top - margin.bottom;


                 var x = d3.scale.linear()
                     .domain([0, d3.max(dataHisto)])
                     .range([0, width]);

                 // Generate a histogram using twenty uniformly-spaced bins.
                 var data = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (dataHisto);

                 /*var line = d3.svg.line()
                     .x(function(d) {
                         return x(d.x) + width / 10 - width / 20;
                     })
                     .y(function(d) {
                         return y(d.y);
                     })
                     .interpolate('monotone');*/


               /*  if (nb == 10) {
                     data.forEach(function(d, i) {
                         lineCoord.push({
                             x: d.x,
                             y: d.y
                         })
                     });

                 }*/

                 var maxY = d3.max(data, function(d) {
                         return d.y;
                     });
                 var y = d3.scale.linear()
                     .domain([0, maxY+.2*maxY])
                     .range([height, 0]);
                 var xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");


                 var yAxis = d3.svg.axis()
                     .scale(y)
                     .tickSize(-width)
                     .orient("left");

                  svg[id] = d3.select("#"+div).append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                 svg[id].append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr('font-size',10)
                     .attr("transform", "rotate(-90)")
                     .attr("y", -35)

                 .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .attr('font-size',10)
                     .text("Number of villages");

                 var bar = svg[id].selectAll(".bar")
                     .data(data)
                     .enter().append("g")
                     .attr("class", "bar")
                     .attr("transform", function(d) {
                         return "translate(" + x(d.x) + "," + y(d.y) + ")";
                     });

                 bar.append("rect")
                     .attr("x", 2)
                     .attr("width", x(data[0].dx) - 2)
                     .attr("height", function(d) {
                         return height - y(d.y);
                     });



                 svg[id].append("g")
                     .attr("class", "x axis")
                     .attr("transform", "translate(0," + height + ")")
                     .call(xAxis);

                 //density, some bugs to check
                     
                /* svg.append("path")
                     .attr("class", "density")
                     .datum(lineCoord)
                     .attr("class", "line")
                     .attr("fill", 'none')
                     .attr("stroke", 'red')
                     .attr("stroke-width", '3px')
                     .attr("d", line);*/

             } //end Draw histo

         } //End Histo

         function pieChart(id, data,cb) {

         	clear();
             var svg = [];
             var dataPie = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
			 
             
			 
             data.forEach(function(d, i) {
                 dataPie[0][(+d[id])] += 1;
                 dataPie[+d['cp_id']][(+d[id])] += 1;
             });
             for (var i = 0; i < cb.length; i++) {
             	dataPie[i][0] /= data.length;
             	dataPie[i][1] /= data.length;	
	             draw(cb.length,dataPie[cb[i]],i+1);
             }
             

             function draw(cb,dataPie,id) {
                var div = "div"+id;
                console.log(dataPie);
             	
             	if(cb==1)
             	{
             		$("#viz").append("<div class='eleven columns' id='"+div+"' ></div>");
             	}
             	if(cb==2 || cb == 3 ||cb == 4)
             	{
             		if(id == 3 || id == 4)
             		{

             			$("#viz2").append("<div class='six columns' id='"+div+"'></div>");
             		}
             		else
             		{

             			$("#viz").append("<div class='six columns' id='"+div+"'></div>");
             		}
             	}
             	if(cb == 5 || cb == 6 || cb == 7 || cb == 8 )
             	{
             		if(id <4)
             		{

             			$("#viz").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else if(id > 6)
             			{

             			$("#viz3").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else
             		{
             		
             			$("#viz2").append("<div class='four columns' id='"+div+"'></div>");
             		
             		}
             	} 	

                 var data = [{
                     'response': 'NO',
                     'value': dataPie[0]
                 }, {
                     'response': 'YES',
                     'value': dataPie[1]
                 }];


                 var  width = $("#"+div).width();
                 var height = width/2;
                 var     radius = Math.min(width, height) / 2;

                 var color = ['#FF3300', 'lightgreen'];

                 var arc = d3.svg.arc()
                     .outerRadius(radius - 10)
                     .innerRadius(0);

                 var labelArc = d3.svg.arc()
                     .outerRadius(radius - 40)
                     .innerRadius(radius - 40);

                 var pie = d3.layout.pie()
                     .sort(null)
                     .value(function(d) {
                         return d.value;
                     });

                  svg[id] = d3.select("#"+div).append("svg")
                     .attr("width", width)
                     .attr("height", height)
                     .append("g")
                     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                 var g = svg[id].selectAll(".arc")
                     .data(pie(data))
                     .enter().append("g")
                     .attr("class", "arc");

                 g.append("path")
                     .attr("d", arc)
                     .style("fill", function(d, i) {
                         return color[i];
                     });

                 g.append("text")
                     .attr("transform", function(d) {
                         return "translate(" + labelArc.centroid(d) + ")";
                     })
                     .attr("dy", ".35em")
                     .attr('fill', 'white')
                     .attr('font-size', 24)
                     .style('text-anchor', 'middle')
                     .text(function(d) {
                         return d.data.response;
                     });



             }

            
         }//End pie chart
         function scatterPlot(id1,id2, data,cb) {

         	clear();
            var dataScaterplot = [[],[],[],[],[],[],[],[]];
            var svg = [];

              data.forEach(function(d) {
			    d.y = +d[id2];
			    d.x = +d[id1];
			   	d.ngo = d['cp_id']; 
			   	dataScaterplot[d.ngo].push(d);
			   	dataScaterplot[0].push(d);
			  });
			  
			  var previousColor = ["lightgrey","lightgrey","lightgrey","lightgrey","lightgrey","lightgrey","lightgrey","lightgrey"]

            for (var i = 0; i < cb.length; i++) {
                 draw(cb.length,dataScaterplot[cb[i]],i+1);
             }
               
			 function draw(cb, data, id)
			 {
				var div = "div"+id;
                
             	
             	if(cb==1)
             	{
             		$("#viz").append("<div class='eleven columns' id='"+div+"' ></div>");
             	}
             	if(cb==2 || cb == 3 ||cb == 4)
             	{
             		if(id == 3 || id == 4)
             		{

             			$("#viz2").append("<div class='six columns' id='"+div+"'></div>");
             		}
             		else
             		{

             			$("#viz").append("<div class='six columns' id='"+div+"'></div>");
             		}
             	}
             	if(cb == 5 || cb == 6 || cb == 7 || cb == 8 )
             	{
             		if(id <4)
             		{

             			$("#viz").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else if(id > 6)
             			{

             			$("#viz3").append("<div class='four columns' id='"+div+"'></div>");
             		}
             		else
             		{
             		
             			$("#viz2").append("<div class='four columns' id='"+div+"'></div>");
             		
             		}
             	} 	

				var margin = {top: 20, right: 20, bottom: 30, left: 50},
				    width = $("#"+div).width() - margin.left - margin.right,
				    height = (width/1.8) - margin.top - margin.bottom;

				var x = d3.scale.linear()
				    .range([0, width]);

				var y = d3.scale.linear()
				    .range([height, 0]);

				var color = d3.scale.category10();

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom");

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left");

				 svg[id] = d3.select("#"+div).append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			 	
				
			 

			  x.domain(d3.extent(data, function(d) { return d.x; }));
			  y.domain(d3.extent(data, function(d) { return d.y; }));

			  svg[id].append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis)
			    .append("text")
			      .attr("class", "label")
			      .attr("x", width)
			      .attr("y", -6)
			      .style("text-anchor", "end")
			      .text(id1);

			  svg[id].append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("class", "label")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text(id2)


			  svg[id].selectAll(".dot")
			      .data(data)
			    .enter().append("circle")
			      .attr("class", function(d,i){return "dot ngo"+d.ngo;})
			      .attr("r", 5)
			      .attr("cx", function(d) { return x(d.x); })
			      .attr("cy", function(d) { return y(d.y); })
			      .style("fill", "lightgrey")
			  	  .on("mouseenter",function(d,i){
			  
			  
			  	  	d3.selectAll(".ngo"+d.ngo)
			  	  	.transition()
			  	  	.duration(200)
			  	  	.style("fill", "#FF6633")
			  	  	.attr("r", 10);
			  	  })
			  	  .on("mouseout",function(d,i){
			  	  	d3.selectAll(".ngo"+d.ngo)
			  	  	.transition()
			  	  	.duration(200)
			  	  	.style("fill", function(d){return previousColor[d.ngo];})
			  	  	.attr("r", 5);
			  	  });

			  	
			
			}
             

         }//End scatterplot

     });// End csv

 	function clear()
 	{
 		 $("#histoSelector").html('');
 		 $("#viz").html('');
 		 $("#viz2").html('');
 		 $("#viz3").html('');
 		 
         $("#nb0").html('');
 	}

 });