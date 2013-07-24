timber_creek_charts
===================

This is a javascript charting svg library designed to be easy to use.  For example:


<script type="text/javascript" src="timbercreekcharts.js"></script>
<link rel="stylesheet" type="text/css" href="timbercreekcharts.css"/>    
    </style>
             var my_new_chart = {
          "div_id": "divtestsimple",
          "dimensions": { "height": 400, "width": 550 },
          "charttype": "bar",
          "items": [{ "name": "Males"}, { "name": "Females" }],
          "data": [[41, 25, 55, 75], [75, 68, 18, 99]]
      };

      build_a_timber_creek_chart(my_new_chart);

is all one would need to create a simple bar chart.


      var my_new_chart = {
          "div_id": "divtest",
          "dimensions": { "height": 400, "width": 550 },
          "charttype": "bar",
          "items": [{ "name": "Males", "color": "#525252", "format": "bar" }, 
                    { "name": "Females", "color": "#868586" }],
          "itempoints": ["North", "South", "East", "West"],   
          "data": [[41, 25, 55, 175], [75, 685, 1864, 1077]],  
          "ispercentage": false,
          "chart_label": "How much do you spend on average per month?",
          "chart_label_position": "top",   // "top","bottom","none"
          "chart_footnote": "",
          "display_footnote": false,          
          "additionalsettings": { "showbackground" : true, "valueformat" : "$%d per month" }
      };
      build_a_timber_creek_chart(my_new_chart);
      
would create one slightly more advanced.


Other chart types supported are line, column, pie and column/line combined and bar/line combined

