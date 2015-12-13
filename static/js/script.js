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
	var varName = [];
	d3.csv('static/data/variable_description.csv', function(e, dataVar) {
		dataVar.forEach(function(d,i){
			varName[d.Name] = d.Variable
		});
	});

	console.log(varName);

     //when histo : ?
     var histograms = ["total_hh", 'propotion_oc', 'propotion_obc',
         'propotion_sc', 'propotion_st', 'caste_domination_idx', 'amenities_0-5kms_no',
         'amenities_5-10kms_no','amenities_10onkms_no','amenities_0kms_no','propotion_landless',
         'comland_area','frstland_area','waterlvl_total','trctors/hh','bullck/hh',
         'srfacewtr_no','grdwtr_no','mktlocatn_no','sold_itms_totno','sold-items_no','Sold-items_in-localmkts_no_no','Sold-items_to-villagers_no','Sold-items_to-traders_no_no',
         'hh_health-insur_propotion','hh_NREGA_propotion','hh_PDS_propotion','hh_not-suff-food-supply_propotion','hh_pvt-money-lnder_propotion','child_sex_ratio',
         'f_entre_no','gls_primary-school_propotion','gls_middle-school_propotion','brides_<15yrs_propotion',
         'social-ids_oc_no','social-ids_obc_no','social-ids_sc_no','social-ids_st_no',
         'agricultural-as-prim_propotion','others-as-prim_propotion','labours-as-prim_propotion','livestock-as-prim_propotion','resource_based-others-as-prim_propotion','trade/biz-as-prim_propotion','diversification_index',
         'agricultural-as-prim_income-ids_count','others-as-prim_income-ids_count','labours-as-prim_income-ids_count','livestock-as-prim_income-ids_count','resource_based-others-as-prim_income-ids_count','trade/biz-as-prim_income-ids_count'


     ];
     
     var zeros = ['amenities_0-5kms_no','amenities_5-10kms_no','amenities_10onkms_no','amenities_0kms_no',
     'comland_area','frstland_area','waterlvl_total','srfacewtr_no','grdwtr_no','mktlocatn_no','sold_itms_totno','sold-items_no','Sold-items_in-localmkts_no_no','Sold-items_to-villagers_no','Sold-items_to-traders_no_no','f_entre_no',
     'social-ids_oc_no','social-ids_obc_no','social-ids_sc_no','social-ids_st_no',
     'agricultural-as-prim_income-ids_count','others-as-prim_income-ids_count','labours-as-prim_income-ids_count','livestock-as-prim_income-ids_count','resource_based-others-as-prim_income-ids_count','trade/biz-as-prim_income-ids_count'



];
     var yesNo = ['road_present_y/n', 'angw_present_y/n', 'elec_present_y/n', 'pds_present_y/n',
         'drnkwtr_present_y/n', 'mblrcep_present_y/n'
     ]
     var isLog = false;
     //Initialize Select2 Elements
     d3.csv('static/data/dataV1.csv', function(e, data) {
         //get all the keys
         var keys = data[0];
         var attribute1 = 'none';
         var attribute2 = 'none';
         var options = '<option id="none">none</option>';
         for (a in keys) {
             if (a != 'general.village' && a != 'cp_id') {
                 options += '<option id="' + a + '"">' + a + '</option>';
             }

         }
         $(".select2#attributeOne").html(options);
         $(".select2#attributeTwo").html(options);

         $(".select2").select2();

         $(".select2#attributeOne").on("change", function() {
             //from string to numeric
             attribute1 = this.value;
             if (attribute1 != "none") {
                 $('#attributeTwo').select2('enable');
             } else {

                 $('#attributeTwo').select2("enable", false);

             }
             data.forEach(function(d, i) {
                 d[this.value] = +d[this.value];
                 d["cp_id"] = +d["cp_id"];
             });

         });

         $('#go').on("click", function() {


         	
         		isLog = ($("#log")[0].checked==true);
         		

             if (attribute1 != 'none' && attribute2 == "none") {

                 visualizeOne(attribute1);

             }
             if (attribute1 != 'none' && attribute2 != "none") {

                 visualizeOneVsOne(attribute1, attribute2);

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

                 if ($('#cb' + i)[0].checked == true) {
                     checkboxes.push(i);
                 }
             }


             clear();
             if ($.inArray(idAttribute, histograms) >= 0) {

                 histogram(idAttribute, data, checkboxes);
             }
             if ($.inArray(idAttribute, yesNo) >= 0) {

                 pieChart(idAttribute, data, checkboxes);
             }

         } // End vizualize

         function visualizeOneVsOne(id1, id2) {
             var checkboxes = [];

             for (var i = 0; i < 8; i++) {

                 if ($('#cb' + i)[0].checked == true) {
                     checkboxes.push(i);
                 }
             }


             if ($.inArray(id1, histograms) >= 0) {
                 if ($.inArray(id2, histograms) >= 0) {
                     scatterPlot(id1, id2, data, checkboxes);
                 }
             		else
             		{
             			doubleHistogram(id1, id2, data, checkboxes);        	
             		}        
             }
             if ($.inArray(id1, yesNo) >= 0) {
                 if ($.inArray(id2, yesNo) >= 0) {
                     marimekko(id1, id2, data, checkboxes);
                 }
                 else
             	{
             		doubleHistogram(id2, id1, data, checkboxes);        	
             	}        
             }

         }


         function histogram(id, data, cb) {

             clear();
             var nb0 = 0;
             var svg = [];
             var dataHisto = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ];
             var nbVillage = [0, 0, 0, 0, 0, 0, 0, 0];


             data.forEach(function(d, i) {


                 if ($.inArray(id, zeros) >= 0) {
                     dataHisto[0].push(+d[id]);
                     nbVillage[0] += 1;
                     nbVillage[d['cp_id']] += 1;
                     dataHisto[d['cp_id']].push(+d[id]);
                 } else {

                     if (+d[id] != 0) {
                         dataHisto[0].push(+d[id]);
                         nbVillage[0] += 1;
                         nbVillage[d['cp_id']] += 1;

                         dataHisto[d['cp_id']].push(+d[id]);
                     } else {
                         nb0 += 1;
                     }
                 }

             });
             if (nb0 != 0) {
                 $("#nb0").html('There are ' + nb0 + ' zeros in the set, this explain why 100% couldn\'t be reached');

             }


             var histoTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {

                     return "Between " + d.x + " and " + (d.x + d.dx) + "</br>" +
                         d.y + " villages </br>" + Math.floor((d.y / d.nb) * 100) + "% for this NGO";
                 })


             $("#histoSelector").html('Select the number of class you want to see (<span id="rangeValue">10</span> classes) : <input id="histoSelectorRange"  type="range" value="10" max="50" min="2" step="1">');
             $("#histoSelectorRange").on("change", function() {
                 $("#rangeValue").html(this.value);
                 $("#viz").html('');
                 $("#viz2").html('');
                 $("#viz3").html('');
                 for (var i = 0; i < cb.length; i++) {

                     draw(this.value, cb.length, dataHisto[cb[i]], i + 1, cb);

                 }
             });
             //var lineCoord = [];


             for (var i = 0; i < cb.length; i++) {

                 draw(10, cb.length, dataHisto[cb[i]], i + 1, cb);

             }

             function draw(nb, cb, dataHisto, id, checkList) {
                 var div = "div" + id;

                 if (cb == 1) {
                     $("#viz").append("<div class='eleven columns' id='" + div + "' ></div>");
                 }
                 if (cb == 2 || cb == 3 || cb == 4) {
                     if (id != 2 && id != 1) {

                         $("#viz2").append("<div class='six columns' id='" + div + "'></div>");
                     } else {

                         $("#viz").append("<div class='six columns' id='" + div + "'></div>");
                     }
                 }
                 if (cb == 5 || cb == 6 || cb == 7 || cb == 8) {
                     if (id < 4) {

                         $("#viz").append("<div class='four columns' id='" + div + "'></div>");
                     } else if (id > 6) {

                         $("#viz3").append("<div class='four columns' id='" + div + "'></div>");
                     } else {

                         $("#viz2").append("<div class='four columns' id='" + div + "'></div>");

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
                     width = $("#" + div).width() - margin.left - margin.right;
                 var height = (width / 1.8) - margin.top - margin.bottom;


                 var x = d3.scale.linear()
                     .domain([0, d3.max(dataHisto)])
                     .range([0, width]);

                 // Generate a histogram using twenty uniformly-spaced bins.
                 var data = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (dataHisto);

                 data.forEach(function(d, i) {
                     d.nb = nbVillage[id - 1];


                 });

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
                     .domain([0, maxY + .2 * maxY])
                     .range([height, 0]);
                 var xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");


                 var yAxis = d3.svg.axis()
                     .scale(y)
                     .tickSize(-width)
                     .orient("left");

                 svg[id] = d3.select("#" + div).append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                     .call(histoTip);

                 svg[id].append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr('font-size', 10)
                     .attr("transform", "rotate(-90)")
                     .attr("y", -35)

                 .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .attr('font-size', 10)
                     .text("Number of villages");

                 var bar = svg[id].selectAll(".bar")
                     .data(data)
                     .enter().append("g")
                     .attr("class", "bar")
                     .on('mouseover', histoTip.show)
                     .on('mouseout', histoTip.hide)
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

         function pieChart(id, data, cb) {

             var color = ['#FF3300', 'lightgreen'];
             var nbVillage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var nbYes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var nbNo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var pieTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {

                     return "<strong style='color:" + color[i] + "'>" + d.data.response + " </strong> :" +
                         Math.floor(d.data.value * 100) + "%</br>" + d.data.nbVillage + " villages";
                 })

             clear();
             var svg = [];
             var dataPie = [
                 [0, 0],
                 [0, 0],
                 [0, 0],
                 [0, 0],
                 [0, 0],
                 [0, 0],
                 [0, 0],
                 [0, 0]
             ];


             data.forEach(function(d, i) {
                 dataPie[0][(+d[id])] += 1;
                 nbVillage[0] += 1;
                 nbVillage[d['cp_id']] += 1;
                 if (+d[id]) {
                     nbYes[d['cp_id']] += 1;
                     nbYes[0] += 1;
                 } else {

                     nbNo[d['cp_id']] += 1;
                     nbNo[0] += 1;
                 }

                 dataPie[+d['cp_id']][(+d[id])] += 1;
             });

             for (var i = 0; i < cb.length; i++) {
                 dataPie[cb[i]][0] /= nbVillage[cb[i]];
                 dataPie[cb[i]][1] /= nbVillage[cb[i]];
                 draw(cb.length, dataPie[cb[i]], i + 1, cb);
             }


             function draw(cb, dataPie, id, checkList) {
                 var div = "div" + id;


                 if (cb == 1) {
                     $("#viz").append("<div class='eleven columns' id='" + div + "' ></div>");
                 }
                 if (cb == 2 || cb == 3 || cb == 4) {
                     if (id == 3 || id == 4) {

                         $("#viz2").append("<div class='six columns' id='" + div + "'></div>");
                     } else {

                         $("#viz").append("<div class='six columns' id='" + div + "'></div>");
                     }
                 }
                 if (cb == 5 || cb == 6 || cb == 7 || cb == 8) {
                     if (id < 4) {

                         $("#viz").append("<div class='four columns' id='" + div + "'></div>");
                     } else if (id > 6) {

                         $("#viz3").append("<div class='four columns' id='" + div + "'></div>");
                     } else {

                         $("#viz2").append("<div class='four columns' id='" + div + "'></div>");

                     }
                 }

                 var data = [{
                     'response': 'NO',
                     'value': dataPie[0],
                     'nbVillage': nbNo[checkList[id - 1]]
                 }, {
                     'response': 'YES',
                     'value': dataPie[1],
                     'nbVillage': nbYes[checkList[id - 1]]
                 }];


                 var width = $("#" + div).width();
                 var height = width / 2;
                 var radius = Math.min(width, height) / 2;


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

                 svg[id] = d3.select("#" + div).append("svg")
                     .attr("width", width)
                     .attr("height", height)
                     .append("g")
                     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                 svg[id].call(pieTip);
                 var g = svg[id].selectAll(".arc")
                     .data(pie(data))
                     .enter().append("g")
                     .attr("class", "arc")
                     .on('mouseover', pieTip.show)
                     .on('mouseout', pieTip.hide);

                 g.append("path")
                     .attr("d", arc)
                     .style("fill", function(d, i) {
                         return color[i];
                     });




             }


         } //End pie chart
         function scatterPlot(id1, id2, data, cb) {

             clear();
             var scatTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {
                 	
                     return 'Village : '+d['general.village']+'</br>'+id1+" : "+d[id1]+"</br>"+
                     id2+' : '+	d[id2]+"</br> NGO : "+d['cp_id'];
                 })
             var dataScaterplot = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ];
             var svg = [];

             data.forEach(function(d) {
                 d.y = +d[id2];
                 d.x = +d[id1];
                 d.ngo = d['cp_id'];
             	if(isLog)
             	{
	             	if( d.y != 0 && d.x!=0)
	             	{
	                 	dataScaterplot[d.ngo].push(d);
	                 	dataScaterplot[0].push(d);
	             		
	             	}
             		
             	}
             	else
             	{
             		 	dataScaterplot[d.ngo].push(d);
	                 	dataScaterplot[0].push(d);
	             	
             	}
             });

             var previousColor = ["lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey"]

             for (var i = 0; i < cb.length; i++) {
                 draw(cb.length, dataScaterplot[cb[i]], i + 1);
             }

             function draw(cb, data, id) {
                 var div = "div" + id;
                 

                 if (cb == 1) {
                     $("#viz").append("<div class='eleven columns' id='" + div + "' ></div>");
                 }
                 if (cb == 2 || cb == 3 || cb == 4) {
                     if (id == 3 || id == 4) {

                         $("#viz2").append("<div class='six columns' id='" + div + "'></div>");
                     } else {

                         $("#viz").append("<div class='six columns' id='" + div + "'></div>");
                     }
                 }
                 if (cb == 5 || cb == 6 || cb == 7 || cb == 8) {
                     if (id < 4) {

                         $("#viz").append("<div class='four columns' id='" + div + "'></div>");
                     } else if (id > 6) {

                         $("#viz3").append("<div class='four columns' id='" + div + "'></div>");
                     } else {

                         $("#viz2").append("<div class='four columns' id='" + div + "'></div>");

                     }
                 }

                 var margin = {
                         top: 20,
                         right: 20,
                         bottom: 30,
                         left: 50
                     },
                     width = $("#" + div).width() - margin.left - margin.right,
                     height = (width / 1.8) - margin.top - margin.bottom;

                 if(isLog)
                 {
                 	var x = d3.scale.log()
                     .range([0, width]);

                 var y = d3.scale.log()
                     .range([height, 0]);
	
                 }

                 else
                 {
                 	var x = d3.scale.linear()
                     .range([0, width]);

                 var y = d3.scale.linear()
                     .range([height, 0]);

                 }
                 
                 var color = d3.scale.category10();

                 var xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");

                 var yAxis = d3.svg.axis()
                     .scale(y)
                     .orient("left");

                 svg[id] = d3.select("#" + div).append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                     .call(scatTip);




                 x.domain(d3.extent(data, function(d) {
                     return d.x;
                 }));
                 y.domain(d3.extent(data, function(d) {
                     return d.y;
                 }));

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
                     .attr("class", function(d, i) {
                         return "dot ngo" + d.ngo;
                     })
                     .attr("r", 5)
                     .attr("cx", function(d) {
                         return x(d.x);
                     })
                     .attr("cy", function(d) {
                         return y(d.y);
                     })
                     .style("fill", "lightgrey")
                     .on('mouseover', scatTip.show)
                     .on("mouseenter", function(d, i) {


                         d3.selectAll(".ngo" + d.ngo)
                             .transition()
                             .duration(200)
                             .style("fill", "#FF6633")
                             .attr("r", 10);
                     })
                     .on("mouseout", function(d, i) {
                     	scatTip.hide();
                         d3.selectAll(".ngo" + d.ngo)
                             .transition()
                             .duration(200)
                             .style("fill", function(d) {
                                 return previousColor[d.ngo];
                             })
                             .attr("r", 5);
                     });



             }


         } //End scatterplot

                  function marimekko(id1, id2, data, cb) {


		 

             var mariTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {

                     return d.variable+" : "+d.response+"</br> "+d.counts+" villages</br>"+
                    	Math.floor(d.counts*100/(2*nbVillage[0])) + "%" ;
         })
                 

             clear();
             var svg = [];
             var dataPie = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ];
				var color = d3.scale.category10();
				 var nbVillage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var nbYes1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var nbYes2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var nbNo1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var nbNo2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

             data.forEach(function(d, i) {
                 nbVillage[0] += 1;
                 nbVillage[d['cp_id']] += 1;
                 if (+d[id1]) {
                     nbYes1[d['cp_id']] += 1;
                     nbYes1[0] += 1;
                 } else {

                     nbNo1[d['cp_id']] += 1;
                     nbNo1[0] += 1;
                 }
                 if (+d[id2]) {
                     nbYes2[d['cp_id']] += 1;
                     nbYes2[0] += 1;
                 } else {

                     nbNo2[d['cp_id']] += 1;
                     nbNo2[0] += 1;
                 }

                 
             });


             for (var i = 0; i < dataPie.length; i++) {
             	dataPie[i] = [

             		{"response": "Yes", "variable":id1, "counts": nbYes1[i],"nb": nbVillage[cb[i]]},
					{"response": "No", "variable": id1, "counts": nbNo1[i],"nb": nbVillage[cb[i]]},
					{"response": "Yes", "variable": id2, "counts": nbYes2[i],"nb": nbVillage[cb[i]]},
					{"response": "No", "variable": id2, "counts": nbNo2[i],"nb": nbVillage[cb[i]]}

             	]
             }

             for (var i = 0; i < cb.length; i++) {
                 draw(cb.length, dataPie[cb[i]], i + 1, cb);
             }

             function draw(cb, data, id) {
                 var div = "div" + id;
                 

                 if (cb == 1) {
                     $("#viz").append("<div class='eleven columns' id='" + div + "' ></div>");
                 }
                 if (cb == 2 || cb == 3 || cb == 4) {
                     if (id == 3 || id == 4) {

                         $("#viz2").append("<div class='six columns' id='" + div + "'></div>");
                     } else {

                         $("#viz").append("<div class='six columns' id='" + div + "'></div>");
                     }
                 }
                 if (cb == 5 || cb == 6 || cb == 7 || cb == 8) {
                     if (id < 4) {

                         $("#viz").append("<div class='four columns' id='" + div + "'></div>");
                     } else if (id > 6) {

                         $("#viz3").append("<div class='four columns' id='" + div + "'></div>");
                     } else {

                         $("#viz2").append("<div class='four columns' id='" + div + "'></div>");

                     }
                 }

                 var margin = {
                         top: 20,
                         right: 20,
                         bottom: 50,
                         left: 50
                     },
                     width = $("#" + div).width() - margin.left - margin.right,
                     height = (width / 1.8) - margin.top - margin.bottom;

                 
					var x = d3.scale.linear()
					 .range([0, width]);

					var y = d3.scale.linear()
					 .range([0, height]);

					var n = d3.format(",d"),
					 p = d3.format("%");


					
                 svg[id] = d3.select("#" + div).append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                     .call(mariTip);
					var offset = 0;

					var responses = d3.nest()
					  .key(function(d) { 
					     return d.response; 
					     })
					  .entries(data);

					var sum = responses.reduce(function(v, p) {
						return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
						    d.parent = p;
						    return (d.offset = v) + d.counts;
						    }, 0));
						}, 0);

					// Add a group for each r.
					var responses = svg[id].selectAll(".response")
					  .data(responses)
					.enter().append("g")
					  .attr("class", "response")
					  .attr("xlink:title", function(d) { 
					     return d.key; })
					  .attr("transform", function(d) { 
					     return "translate(" + x(d.offset / sum) + ")"; 
					   });

					// Add a rect for each month.
					 var variables = responses.selectAll (".variable")
					  .data(function(d) { 
					     return d.values; })
					.enter().append("a")
					  .attr("class", "response")
					  .attr("xlink:title", function(d) { 
					      return d.variable + " " + d.parent.key + ": " + n(d.counts); });

					variables.append("rect")
					  .attr("y", function(d) { 
					     return y(d.offset / d.parent.sum); })
					  .attr("height", function(d) { 
					     return y(d.counts / d.parent.sum); })
					  .attr("width", function(d) { 
					     return x(d.parent.sum / sum); })
					  .style("fill", function(d,i) { 
					     return color(i); 
					  })
					  .on('mouseover', mariTip.show)
            .on('mouseout', mariTip.hide);

				variables.append("text")
					      .text(function(d) { 
					      if(d.counts>0)
					      {
					          return d.variable + " " + n(d.counts) ;
					      }
					      })
					      .attr("x", 5)
					      .attr("y", function(d) { 
					          return (y(d.offset / d.parent.sum)+10); })
					      .attr("class", "label");

				variables.append("text")
					      .text(function(d) {
					      
					          return d.parent.key;
					          }) // response
					      .attr("x", 5)
					      .attr("y", function(d) { 
					            return height+15; })
					      .attr("class", "label2");


             }	


         } //End Marimeko

                  function doubleHistogram(id1,id2, data, cb) {

             clear();
             var nb0 = 0;
             var svg = [];
             var dataHisto = [];
             dataHisto[0] = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ];
              dataHisto[1] = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ];
             var nbVillage = [0, 0, 0, 0, 0, 0, 0, 0];


             data.forEach(function(d, i) {


                 if ($.inArray(id1, zeros) >= 0) {
                     nbVillage[0] += 1;
                     nbVillage[d['cp_id']] += 1;
                     dataHisto[+d[id2]][0].push(+d[id1]);
                     dataHisto[+d[id2]][d['cp_id']].push(+d[id1]);
                 } else {

                     if (+d[id1] != 0) {
                         dataHisto[+d[id2]][0].push(+d[id1]);
                         nbVillage[0] += 1;
                         nbVillage[d['cp_id']] += 1;

                         dataHisto[+d[id2]][d['cp_id']].push(+d[id1]);
                     } else {
                         nb0 += 1;
                     }
                 }

             });
             if (nb0 != 0) {
                 $("#nb0").html('There are ' + nb0 + ' zeros in the set, this explain why 100% couldn\'t be reached');

             }


             var histoTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {

                     return "Between " + d.x + " and " + (d.x + d.dx) + "</br>" +
                         d.y + " villages </br>" + Math.floor((d.y / d.nb) * 100) + "% for this NGO";
                 })


             $("#histoSelector").html('Select the number of class you want to see (<span id="rangeValue">10</span> classes) : <input id="histoSelectorRange"  type="range" value="10" max="50" min="2" step="1">');
             $("#histoSelectorRange").on("change", function() {
                 $("#rangeValue").html(this.value);
                 $("#viz").html('');
                 $("#viz2").html('');
                 $("#viz3").html('');
                 for (var i = 0; i < cb.length; i++) {

                     draw(this.value, cb.length, dataHisto[0][cb[i]],dataHisto[1][cb[i]], i + 1, cb);

                 }
             });
             //var lineCoord = [];


             for (var i = 0; i < cb.length; i++) {

                 draw(10, cb.length,  dataHisto[0][cb[i]],dataHisto[1][cb[i]], i + 1, cb);

             }

             function draw(nb, cb, dataHisto1,dataHisto2, id, checkList) {
                 var div = "div" + id;

                 if (cb == 1) {
                     $("#viz").append("<div class='eleven columns' id='" + div + "' ></div>");
                 }
                 if (cb == 2 || cb == 3 || cb == 4) {
                     if (id != 2 && id != 1) {

                         $("#viz2").append("<div class='six columns' id='" + div + "'></div>");
                     } else {

                         $("#viz").append("<div class='six columns' id='" + div + "'></div>");
                     }
                 }
                 if (cb == 5 || cb == 6 || cb == 7 || cb == 8) {
                     if (id < 4) {

                         $("#viz").append("<div class='four columns' id='" + div + "'></div>");
                     } else if (id > 6) {

                         $("#viz3").append("<div class='four columns' id='" + div + "'></div>");
                     } else {

                         $("#viz2").append("<div class='four columns' id='" + div + "'></div>");

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
                     width = $("#" + div).width() - margin.left - margin.right;
                 var height = (width / 1.8) - margin.top - margin.bottom;


                 var x = d3.scale.linear()
                     .domain([0, d3.max([d3.max(dataHisto1),d3.max(dataHisto2)])])
                     .range([0, width]);

                 // Generate a histogram using twenty uniformly-spaced bins.
                 var data1 = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (dataHisto1);
                 var data2 = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (dataHisto2);

                 data1.forEach(function(d, i) {
                     d.nb = nbVillage[id - 1];


                 });

                 data2.forEach(function(d, i) {
                     d.nb = nbVillage[id - 1];


                 });

                 

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

                 var maxY1 = d3.max(data1, function(d) {
                     return d.y;
                 });
                 var maxY2 = d3.max(data2, function(d) {
                     return d.y;
                 });
                 var maxY = d3.max([maxY1,maxY2]);
                 
                 var y = d3.scale.linear()
                     .domain([0, maxY + .2 * maxY])
                     .range([height, 0]);
                 
                 var xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");


                 var yAxis = d3.svg.axis()
                     .scale(y)
                     .tickSize(-width)
                     .orient("left");

                 svg[id] = d3.select("#" + div).append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                     .call(histoTip);

                 svg[id].append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr('font-size', 10)
                     .attr("transform", "rotate(-90)")
                     .attr("y", -35)

                 .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .attr('font-size', 10)
                     .text("Number of villages");

                 var green = svg[id].selectAll(".green")
                     .data(data2)
                     .enter().append("g")
                     .attr("class", "green")
                     .on('mouseover', histoTip.show)
                     .on('mouseout', histoTip.hide)
                     .attr("transform", function(d) {
                         return "translate(" + x(d.x) + "," + y(d.y) + ")";
                     });

                 green.append("rect")
                     .attr("x", 2)
                     .attr("width", x(data2[0].dx)/2 - 2)
                     .attr("height", function(d) {
                         return height - y(d.y);
                     });

               var red = svg[id].selectAll(".red")
                     .data(data1)
                     .enter().append("g")
                     .attr("class", "red")
                     .on('mouseover', histoTip.show)
                     .on('mouseout', histoTip.hide)
                     .attr("transform", function(d) {
                         return "translate(" + x(d.x) + "," + y(d.y) + ")";
                     });

                 red.append("rect")
                     .attr("x", x(data1[0].dx)/2 + 2)
                     .attr("width", x(data1[0].dx)/2 - 2)
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

         } //End DoubleHisto

     }); // End csv

     function clear() {
         $("#histoSelector").html('');
         $("#viz").html('');
         $("#viz2").html('');
         $("#viz3").html('');

         $("#nb0").html('');
     }

 });