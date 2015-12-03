 $(function () {
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
        		
        	}
        
        });


});