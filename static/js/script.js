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

     //initialize Side Panel

     var slider = $("#slider").slideReveal({
         width: "250px",
         push: false,
         position: "left",
         speed: 400,
         trigger: $("#trigger"),
         // autoEscape: false,

     });

     slider.slideReveal("show");
     $('#closeSlide').click(function() {
        $('#openSlide').css("color","green");
         slider.slideReveal("hide");
     });
     $('#openSlide').click(function() {
        $('#openSlide').css("color","white");
         slider.slideReveal("show");
     });

     var ngoNames = ["All", "Kutch", "Dewas", "Burhanpur", "Mahbubnagar", "Malkangiri", "Palamu", "Bankura"]


     var varName = [];
     var indexVar = [];
     

     d3.csv('static/data/variable_description.csv', function(e, dataVar) {
         dataVar.forEach(function(d, i) {
             varName[d.Name] = d.Variable
             if (d.Name == 'comland_area' || d.Name == 'frstland_area') {
                 indexVar[d.Name] = "Hectares";
             } else if (d.Name == "waterlvl_total") {

                 indexVar[d.Name] = "Meters";
             } else if (d.Name == "diversification_index" || d.Name == 'caste_domination_idx') {

                 indexVar[d.Name] = "Index";
             } else {
                 indexVar[d.Name] = "Number";
             }
         });
     });


     var nbVillage = [0, 0, 0, 0, 0, 0, 0, 0];




     //when histo : ?
     var histograms = ["total_hh", 'propotion_oc', 'propotion_obc',
         'propotion_sc', 'propotion_st', 'caste_domination_idx', 'amenities_0-5kms_no',
         'amenities_5-10kms_no', 'amenities_10onkms_no', 'amenities_0kms_no', 'propotion_landless',
         'comland_area', 'frstland_area', 'waterlvl_total', 'trctors/hh', 'bullck/hh',
         'srfacewtr_no', 'grdwtr_no', 'mktlocatn_no', 'sold_itms_totno', 'sold-items_no', 'Sold-items_in-localmkts_no_no', 'Sold-items_to-villagers_no', 'Sold-items_to-traders_no_no',
         'hh_health-insur_propotion', 'hh_NREGA_propotion', 'hh_PDS_propotion', 'hh_not-suff-food-supply_propotion', 'hh_pvt-money-lnder_propotion', 'child_sex_ratio',
         'f_entre_no', 'gls_primary-school_propotion', 'gls_middle-school_propotion', 'brides_<15yrs_propotion',
         'social-ids_oc_no', 'social-ids_obc_no', 'social-ids_sc_no', 'social-ids_st_no',
         'agricultural-as-prim_propotion', 'others-as-prim_propotion', 'labours-as-prim_propotion', 'livestock-as-prim_propotion', 'resource_based-others-as-prim_propotion', 'trade/biz-as-prim_propotion', 'diversification_index',
         'agricultural-as-prim_income-ids_count', 'others-as-prim_income-ids_count', 'labours-as-prim_income-ids_count', 'livestock-as-prim_income-ids_count', 'resource_based-others-as-prim_income-ids_count', 'trade/biz-as-prim_income-ids_count',


"general/land_unit_code",
"land_unit/lu_size",
"land_unit/lu_hh_own",

"crop_last25_no",
"wild_threat_no",
"crop_damage/damage_cause/resow_no",
"grazing_incidence/grazing_num_hh/loc_sm_num_hh",
"grazing_incidence/grazing_num_hh/loc_la_num_hh",
"grazing_incidence/grazing_num_anim/loc_sm_num_anim",
"grazing_incidence/grazing_num_anim/loc_la_num_anim",


"land_unit/lu_size",
"selfcons_uses_no",
"sale_uses_no",
"use_patterns/improve_act/area_tot",
"grazing_incidence/grazing_number/loc_sm_num",
"grazing_incidence/grazing_number/loc_la_num",

"general/water_source_code",
"water_source/ws_size",
"water_source/ws_month_avlbl",
"selfcons_uses_no",
"sale_uses_no",
"fish_trend_species_no",
"lstock_drink_incidence/lstock_drink_number/loc_sm_num",
"lstock_drink_incidence/lstock_drink_number/loc_la_num"



     ];

     var zeros = ['amenities_0-5kms_no', 'amenities_5-10kms_no', 'amenities_10onkms_no', 'amenities_0kms_no',
         'comland_area', 'frstland_area', 'waterlvl_total', 'srfacewtr_no', 'grdwtr_no', 'mktlocatn_no', 'sold_itms_totno', 'sold-items_no', 'Sold-items_in-localmkts_no_no', 'Sold-items_to-villagers_no', 'Sold-items_to-traders_no_no', 'f_entre_no',
         'social-ids_oc_no', 'social-ids_obc_no', 'social-ids_sc_no', 'social-ids_st_no',
         'agricultural-as-prim_income-ids_count', 'others-as-prim_income-ids_count', 'labours-as-prim_income-ids_count', 'livestock-as-prim_income-ids_count', 'resource_based-others-as-prim_income-ids_count', 'trade/biz-as-prim_income-ids_count'



     ];
     var yesNo = ['road_present_y/n', 'angw_present_y/n', 'elec_present_y/n', 'pds_present_y/n',
         'drnkwtr_present_y/n', 'mblrcep_present_y/n',"irri_ar_yn",
"manage_resp/manage_rev",
"manage_resp/manage_forest",
"manage_resp/manage_irr",
"manage_resp/manage_coop",
"manage_resp/manage_comanage",
"manage_resp/manage_commbased",
"manage_resp/manage_panch",
"manage_resp/manage_indv"
     ]


     var isLogX = false;
     var isLogY = false;
     var isFree = true;
     var isBox = false;

         $("#dataset").selectize({
             allowEmptyOption: false,
             create: false
         });

    

         var a1 =  $("#attributeOne").selectize({
             allowEmptyOption: false,
             create: false
         })[0];
         var a2 = $("#attributeTwo").selectize({
             allowEmptyOption: false,
             create: false
         })[0];

    var begin = true;
     draw("village")

     function draw(dataset)
     {

        $("#downloadCSV").attr("href","static/data/"+dataset+".csv");

        isLogX = false;
      isLogY = false;
      isFree = true;
      isBox = false;

      attribute1 = 'none';
      attribute2 = 'none';
         nbVillage = [0, 0, 0, 0, 0, 0, 0, 0];
      data = [];
     //Initialize Select2 Elements
     d3.csv('static/data/'+dataset+'.csv', function(e, csv) {
        data = csv;
         data.forEach(function(d, i) {
             nbVillage[0] += 1;
             nbVillage[d["cp_id"]] += 1;


         });

         
         //get all the keys
         var keys = data[0];

         var attribute1 = 'none';
         var attribute2 = 'none';
         var options = [{value:"none",text:"none"}];
         for (a in keys) {
             if (a != 'general.village' && a!="general/village_id" && a != 'cp_id') {
                 options.push({value:a,text:varName[a]});
             }

         }



            a1.selectize.clear();
            a1.selectize.clearOptions();
            a1.selectize.load(function(callback) {
                callback(options);
            });
            a2.selectize.clear();
            a2.selectize.clearOptions();
            a2.selectize.load(function(callback) {
                callback(options);
            });

         $("#attributeOne").html(options);
         $("#attributeTwo").html(options);

         // $(".select2").SumoSelect({search: true});


        

         //  $(".select2").click(function(){
         //     $($('.select2-container.select2-container--default.select2-container--open')[1]).css('left','-220px');
         // });


         // var cpS = $('#cpSelect').SumoSelect();
         var cpS = $('#cpSelect2').selectize({
             allowEmptyOption: false,
             create: false
         });
         var specS = $('#specSelect').selectize({
             allowEmptyOption: false,
             create: false
         });
         // var specS = $('#specSelect').SumoSelect();

         if(begin)
         {


             $("#dataset").change(function(){
            clear();

            draw(this.value);



         });
         $(".select2#attributeOne").on("change", function() {
             //from string to numeric
             attribute1 = this.value;

             if (attribute1 != "none") {

                 
             } else {



                 

             }
             data.forEach(function(d, i) {

                 d[this.value] = +d[this.value];
                 d["cp_id"] = +d["cp_id"];
             });

             go();
         });
            $(".select2#attributeTwo").on("change", function() {
             //from string to numeric
             attribute2 = this.value;
             data.forEach(function(d, i) {
                 d[this.value] = +d[this.value];
             });
             go();
         });

         $("#cpSelect2").on('change', go);
         $("#specSelect").on('change', go);
        begin=false;
         }

         function go() {

            console.log('A1 : '+ attribute1+"\n A2 : "+attribute2)


             if ($(specS).val()) {


                 isLogX = ($(specS).val().indexOf("logX") > 0);
                 isLogY = ($(specS).val().indexOf("logY") > 0);
                 isFree = ($(specS).val().indexOf("free") > 0);

             } else {
                 isLogX = false;
                 isLogY = false;
                 isFree = false;
             }

             if (attribute1 != 'none' && attribute2 == "none" ||  attribute1 != 'none' && attribute2 == "" ) {
                console.log("HEY")
                 $("#mainTitle").html('<b>' + varName[attribute1] + '</b>');
                 visualizeOne(attribute1);

             }
             if (attribute1 != 'none' && attribute2 != "none" && attribute2 != "" && attribute1 != ""    ) {


                 visualizeOneVsOne(attribute1, attribute2);

             }
         }
       
     

         function visualizeOne(idAttribute) {

            console.log(data);

             var checkboxes = [];

             for (a in $(cpS).val()) {


                 checkboxes.push($(cpS).val()[a]);
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

             for (a in $(cpS).val()) {


                 checkboxes.push($(cpS).val()[a])
             }


             if ($.inArray(id1, histograms) >= 0) {
                 if ($.inArray(id2, histograms) >= 0) {
                     $("#mainTitle").html('<b>' + varName[attribute1] + ' (on X axis) VS ' + varName[attribute2] + ' (on Y axis)</b></br>');
                     scatterPlot(id1, id2, data, checkboxes);
                 } else {
                     if (!isBox) {
                         $("#mainTitle").html('<b>' + varName[attribute1] + ' (on X axis) VS ' + varName[attribute2] + '(Yes in Green,  No in Red)</b></br>');
                         doubleHistogram(id1, id2, data, checkboxes);
                     } else {
                         $("#mainTitle").html('<b>' + varName[attribute1] + ' (on Y axis) VS ' + varName[attribute2] + '(Yes in Green,  No in Red)</b></br>');
                         boxplot(id1, id2, data, checkboxes);
                     }
                 }
             }
             if ($.inArray(id1, yesNo) >= 0) {
                 if ($.inArray(id2, yesNo) >= 0) {
                     marimekko(id1, id2, data, checkboxes);
                 } else {
                     if (!isBox) {
                         $("#mainTitle").html('<b>' + varName[attribute2] + ' (on X axis) VS ' + varName[attribute1] + '(Yes in Green,  No in Red)</b></br>');
                         doubleHistogram(id2, id1, data, checkboxes);
                     } else {
                         boxplot(id2, id1, data, checkboxes);
                     }
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
                     return "Value: between  " + d.x + " and " + (d.x + d.dx) + "<br>" +
                         "Count : " + d.y + "<br>" +
                         Math.floor((d.y / d.nb) * 100) + "% total";

                 })


             $("#histoSelector").html('Select number of bins (<span id="rangeValue">10</span> classes) : <input id="histoSelectorRange"  type="range" value="10" max="50" min="2" step="1">');
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
             var maxSame = [];

             for (var i = 0; i < cb.length; i++) {
                 maxSame = maxSame.concat(dataHisto[cb[i]]);
             }

             for (var i = 0; i < cb.length; i++) {

                 draw(10, cb.length, dataHisto[cb[i]], i + 1, cb);

             }

             function draw(nb, cb, dataHisto, id, checkList) {
                 var div = "div" + id;

                 drawGrid(cb, checkList, div, id);

                 // A formatter for counts.
                 var formatCount = d3.format(",.0f");

                 var margin = {
                         top: 10,
                         right: 20,
                         bottom: 30,
                         left: 40
                     },
                     width = $("#" + div).width() - margin.left - margin.right;
                 if (width < 300) {
                     height = $("body").height()*.3;
                 } else {
                     var height = (width / 2) - margin.top - margin.bottom;

                 }


                 var x = d3.scale.linear()
                     .domain([0, d3.max(dataHisto)])
                     .range([0, width]);


                 // Generate a histogram using twenty uniformly-spaced bins.
                 var data = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (dataHisto);
                 var dataSame = d3.layout.histogram()
                     .bins(x.ticks(nb))
                     (maxSame);

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
                 var maxS = d3.max(dataSame, function(d) {
                     return d.y;
                 });
                 if (isFree == false) {

                     var y = d3.scale.linear()
                         .domain([0, maxY + .2 * maxY])
                         .range([height, 0]);
                 } else {
                     var y = d3.scale.linear()
                         .domain([0, maxS + .2 * maxS])
                         .range([height, 0]);
                 }
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
                     .text("Frequency");

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
                     .call(xAxis)
                     .append("text")
                     .attr('font-size', 10)


                 .attr('x', width)
                     .attr('y', 20)

                 .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .attr('font-size', 10)
                     .text(varName[attribute1]);

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


                 drawGrid(cb, checkList, div, id);

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

                     return 'Village : ' + d['general.village'] + '</br>' + id1 + " : " + Math.floor(d[id1] * 100) / 100 + "</br>" +
                         id2 + ' : ' + Math.floor(d[id2] * 100) / 100;
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

             var color = d3.scale.category10();
             data.forEach(function(d) {
                 d.y = +d[id2];
                 d.x = +d[id1];
                 d.ngo = d['cp_id'];
                 if (d.y == 0) {
                     d.y = 0.00001;
                 }
                 if (d.x == 0) {
                     d.x = 0.00001;
                 }
                 dataScaterplot[d.ngo].push(d);
                 dataScaterplot[0].push(d);


             });

             for (var i = 0; i < cb.length; i++) {
                 draw(cb.length, dataScaterplot[cb[i]], i + 1, cb);
             }

             function draw(cb, data, id, checkList) {
                 var div = "div" + id;


                 drawGrid(cb, checkList, div, id);

                 var margin = {
                               top: 10,
                         right: 20,
                         bottom: 30,
                         left: 40
                     },
                     width = $("#" + div).width() - margin.left - margin.right;
                 if (width < 300) {
                     height = $("body").height()*.3;
                 } else {
                     var height = (width / 2) - margin.top - margin.bottom;

                 }

                 if (isLogX) {
                     var x = d3.scale.log()
                         .range([0, width]);
                 } else {
                     var x = d3.scale.linear()
                         .range([0, width]);
                 }
                 if (isLogY) {
                     var y = d3.scale.log()
                         .range([height, 0]);
                 } else {

                     var y = d3.scale.linear()
                         .range([height, 0]);

                 }


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
                     .call(xAxis);
                 /*                     .append("text")

                                  .attr("x", width)
                                      .attr("y", 30)
                                      .style("text-anchor", "end")
                                      .style("font-size", 10)
                                      .text(indexVar[id1]);
                                      */

                 svg[id].append("g")
                     .attr("class", "y axis")
                     .call(yAxis);
                 /*.append("text")

                 .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .style("font-size", 10)
                     .text(indexVar[id2])
                     */

                 svg[id].selectAll(".dot")
                     .data(data)
                     .enter().append("circle")
                     .style('opacity', .8)
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
                     .style("fill", function(d, i) {
                         return color(d.ngo);
                     })
                     .on('mouseover', scatTip.show)

                 .on("mouseout", scatTip.hide);



             }


         } //End scatterplot

         function marimekko(id1, id2, data, cb) {


             $("#mainTitle").html('<b>' + varName[attribute1] + ' (on X axis) VS ' + varName[attribute2] + '(on Y axis)</b>');

             var mariTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(d, i) {
                     console.log(d);
                     return Math.floor(d.counts * 100 / d.nb) + "% for this Cp Site<br>" +
                         id1 + ' : ' + d.response + '<br>' +
                         id2 + ' : ' + d.variable + '<br>';
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
             var nbYesYes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var nbYesNo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var nbNoNo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             var nbNoYes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

             data.forEach(function(d, i) {
                 nbVillage[0] += 1;
                 nbVillage[d['cp_id']] += 1;
                 if (+d[id1]) {
                     if (+d[id2]) {
                         nbYesYes[d['cp_id']] += 1;
                         nbYesYes[0] += 1;

                     } else {
                         nbYesNo[d['cp_id']] += 1;
                         nbYesNo[0] += 1;

                     }
                 } else {

                     if (+d[id2]) {
                         nbNoYes[d['cp_id']] += 1;
                         nbNoYes[0] += 1;

                     } else {
                         nbNoNo[d['cp_id']] += 1;
                         nbNoNo[0] += 1;

                     }
                 }



             });


             for (var i = 0; i < dataPie.length; i++) {

                 dataPie[i] = [

                     {
                         "response": "Yes",
                         "variable": "No",
                         "counts": nbYesNo[i] + .0001,
                         "nb": nbVillage[i]
                     }, {
                         "response": "No",
                         "variable": "No",
                         "counts": nbNoNo[i] + .0001,
                         "nb": nbVillage[i]
                     }, {
                         "response": "Yes",
                         "variable": "Yes",
                         "counts": nbYesYes[i] + .0001,
                         "nb": nbVillage[i]
                     }, {
                         "response": "No",
                         "variable": "Yes",
                         "counts": nbNoYes[i] + .0001,
                         "nb": nbVillage[i]
                     }

                 ]
             }


             for (var i = 0; i < cb.length; i++) {
                 draw(cb.length, dataPie[cb[i]], i + 1, cb);
             }

             function draw(cb, data, id, checkList) {
                 var div = "div" + id;


                 drawGrid(cb, checkList, div, id);


                 var margin = {
                            top: 10,
                         right: 20,
                         bottom: 30,
                         left: 40
                     },
                     width = $("#" + div).width() - margin.left - margin.right;
                 if (width < 300) {
                     height = $("body").height()*.3;
                 } else {
                     var height = (width / 2) - margin.top - margin.bottom;

                 }


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
                         return d.key;
                     })
                     .attr("transform", function(d) {
                         return "translate(" + x(d.offset / sum) + ")";
                     });

                 // Add a rect for each month.
                 var variables = responses.selectAll(".variable")
                     .data(function(d) {
                         return d.values;
                     })
                     .enter().append("a")
                     .attr("class", "response")
                     .attr("xlink:title", function(d) {
                         return d.variable + " " + d.parent.key + ": " + n(d.counts);
                     });

                 variables.append("rect")
                     .attr('class', 'block')
                     .attr('stroke-width', '5px')
                     .attr('stroke-allignment', 'inner')

                 .attr("y", function(d) {

                         return y(d.offset / d.parent.sum);
                     })
                     .attr("height", function(d) {
                         return y(d.counts / d.parent.sum);
                     })
                     .attr("width", function(d) {
                         return x(d.parent.sum / sum);
                     })
                     .style("fill", function(d, i) {
                         return color(i);
                     })
                     .on('mouseover', mariTip.show)
                     .on('mouseout', mariTip.hide);




                 /*
                                  responses.append("text")
                                    .text(function(d){
                                        console.log(d);
                                        return "to";
                                    })
                                    .attr("y",0)
                                    .attr("class", "label2");
                                      */
                 variables.append("text")
                     .text(function(d) {
                         console.log(d);
                         if (d.counts > 0.5) {
                             return d.parent.key;
                         }
                     }) // response
                     .attr("x", 20)
                     .attr("y", function(d) {
                         return height + 15;
                     })
                     .attr("class", "label2");


             }


         } //End Marimeko

         function doubleHistogram(id1, id2, data, cb) {
             $("#mainTitle").html('<b>' + varName[id1] + ' (on X axis) VS ' + varName[id2] + '(Yes in Green,  No in Red)</b>');
             isBox = false;
             var dataBak = data;
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
                     return "Value: between  " + d.x + " and " + (d.x + d.dx) + "<br>" +
                         "Count : " + d.y + "<br>" +
                         Math.floor((d.y / d.nb) * 100) + "% total";

                 })

             $("#histoSelector").html('Select the number of bins (<span id="rangeValue">2</span> classes) : <input id="histoSelectorRange"  type="range" value="2" max="50" min="2" step="1">');

             $("#histoSelector").append("</br><button id='switch'>Switch to Boxplot</button>");
             $("#switch").on('click', function() {
                 boxplot(id1, id2, dataBak, cb);
             })

             $("#histoSelectorRange").on("change", function() {
                 $("#rangeValue").html(this.value);
                 $("#viz").html('');
                 $("#viz2").html('');
                 $("#viz3").html('');
                 for (var i = 0; i < cb.length; i++) {

                     draw(this.value, cb.length, dataHisto[0][cb[i]], dataHisto[1][cb[i]], i + 1, cb);

                 }
             });
             //var lineCoord = [];


             for (var i = 0; i < cb.length; i++) {

                 draw(2, cb.length, dataHisto[0][cb[i]], dataHisto[1][cb[i]], i + 1, cb);

             }

             function draw(nb, cb, dataHisto1, dataHisto2, id, checkList) {
                 var div = "div" + id;

                 drawGrid(cb, checkList, div, id);

                 // A formatter for counts.
                 var formatCount = d3.format(",.0f");

                 var margin = {
                         top: 10,
                         right: 20,
                         bottom: 30,
                         left: 40
                     },
                     width = $("#" + div).width() - margin.left - margin.right;
                 if (width < 300) {
                     height = $("body").height()*.3;
                 } else {
                     var height = (width / 2) - margin.top - margin.bottom;

                 }

                 var x = d3.scale.linear()
                     .domain([0, d3.max([d3.max(dataHisto1), d3.max(dataHisto2)])])
                     .range([0, width]);

                 var x = d3.scale.linear()
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
                 var maxY = maxY1 + maxY2;

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
                     .text("Frequency");

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
                     .attr("width", x(data2[0].dx) - 2)
                     .attr("height", function(d) {
                         return height - y(d.y);
                     });

                 var red = svg[id].selectAll(".red")
                     .data(data1)
                     .enter().append("g")
                     .attr("class", "red")
                     .on('mouseover', histoTip.show)
                     .on('mouseout', histoTip.hide)
                     .attr("transform", function(d, i) {
                         return "translate(" + x(d.x) + "," + y(data2[i].y + d.y) + ")";
                     });

                 red.append("rect")
                     .attr("x", 2)
                     .attr("width", x(data2[0].dx) - 2)
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

         function boxplot(id1, id2, data, cb) {
             $("#mainTitle").html('<b>' + varName[id1] + ' (on X axis) VS ' + varName[id2] + '(Yes : Right,  No : Left)</b>');
             isBox = true;
             var dataBak = data;
             clear();
             $("#histoSelector").append("</br><button id='switch'>Switch to Stacked Bar</button>")
             $("#switch").on('click', function() {
                 doubleHistogram(id1, id2, dataBak, cb);
             });
             var svg = [];

             dataBoxplot = [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 []
             ]
             data.forEach(function(d, i) {
                 dataBoxplot[0].push(d);
                 dataBoxplot[d['cp_id']].push(d);
             });

             for (var i = 0; i < cb.length; i++) {

                 draw(cb.length, dataBoxplot[cb[i]], i + 1, cb);

             }


             function draw(cb, dataBox, id, checkList) {

                 var div = "div" + id;

                 drawGrid(cb, checkList, div, id);

                 var margin = {
                         top: 10,
                         right: 20,
                         bottom: 30,
                         left: 40
                     },
                     width = $("#" + div).width() / 2.5 - margin.left - margin.right;
                 var height = 300 - margin.top - margin.bottom;

                 var min = Infinity,
                     max = -Infinity;

                 var chart = d3.box()
                     .whiskers(iqr(10))
                     .width(width)
                     .height(height);




                 data = [
                     [],
                     []
                 ];

                 dataBox.forEach(function(x) {
                     var e = +x[id2],

                         s = +x[id1],
                         d = data[e];
                     if (!d) d = data[e] = [s];
                     else d.push(s);
                     if (s > max) max = s;
                     if (s < min) min = s;
                 });

                 console.log(data);

                 chart.domain([min, max]);

                 svg[id] = d3.select("#" + div).selectAll("svg")
                     .data(data)
                     .enter().append("svg")
                     .attr("class", "box")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.bottom + margin.top)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                     .call(chart)
                     .append('text')
                     .style('text-anchor', "middle")
                     .attr("y", -10)
                     .style('font-size', "20")
                     .text(function(d, i) {
                         if (i == 1) {
                             return "YES";
                         } else {
                             return "NO";
                         }
                     });




                 // Returns a function to compute the interquartile range.
                 function iqr(k) {
                     return function(d, i) {
                         var q1 = d.quartiles[0],
                             q3 = d.quartiles[2],
                             iqr = (q3 - q1) * k,
                             i = -1,
                             j = d.length;
                         while (d[++i] < q1 - iqr);
                         while (d[--j] > q3 + iqr);
                         return [i, j];
                     };
                 }

             }
         }

     }); // End csv
    
    }//end draw
     function clear() {
         $("#histoSelector").html('');
         $("#viz").html('');
         $("#viz2").html('');
         $("#viz3").html('');

         $("#nb0").html('');
     }

     function drawGrid(cb, ck, div, id) {
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
         console.log(nbVillage);
         $("#" + div).append("<b>" + ngoNames[ck[id - 1]] + " ( " + nbVillage[ck[id - 1]] + " obs)</b>")
     }

 });