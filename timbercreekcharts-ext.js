
///****************************************************************************************************************///
///****************************************************************************************************************///
//----------------------------------------- BUILD A WAVE CHART -----------------------------------------------------//
function build_wave_chart(div_id,svgwidth,svgheight,myitems,myitempts,mylinedata,mylinecolors,bShowLegend,bShowScales,
    chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,
    valueformat,static_max_value_on_scale,static_number_of_ticks,item_class,value_text_class)
{
    var NS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(NS,"svg");
    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);
    svg.setAttribute("fill","transparent");
    svg.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"svg");

    bHorizontalLines=true;//bHorizontalLines=bShowScales;

    var chartwidth=svgwidth-25;
//    var chartheight=svgheight-100;
    var chartheight=svgheight-50;//(svgheight/5);

    leftmargin=50;
    legendwidth=150;
   
    if (bShowLegend)
     { 
        for (i=0; i<myitems.length; i++)
        {
            if (myitems[i].length > 30) { legendwidth=175; }
            if (myitems[i].length > 35) { legendwidth=210; }
            if (myitems[i].length > 40) { legendwidth=250; }
        }
        if (legendwidth > (chartwidth/2)) { legendwidth=chartwidth/3; }
        chartwidth=chartwidth-legendwidth;
     }

    var max_value_on_scale=100;
    percentage_suffix="%";

    if (bIsPercent==false)
    {
        max_value_on_scale=0;
	    percentage_suffix="";
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mylinedata);
    }  else
    {
        if (valueformat=="") { valueformat="%d"; percentage_suffix="%"; }
    } 
    tickcounter=5;
    if (static_max_value_on_scale > 0)  { max_value_on_scale=static_max_value_on_scale;  } 
    if (static_number_of_ticks > 0)   { tickcounter=static_number_of_ticks;  } 
    
//    heightmultiplier=1.5;
    heightmultiplier=chartheight/200;
    linewidth=(chartwidth)/mylinedata[0].length;
    
    //--------------- CHART LABELS -------------------------------------//
        // LABEL ON TOP
    if (chart_label_position=="top")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {
                svg.appendChild(write_line_of_text(chart_label_text_array[i],50,15+(15*i),"#333",chart_label_class));
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                svg.appendChild(write_line_of_text(chart_label_text_array[i],50,chartheight+15+(15*i),"#333",chart_label_class));
            }
    }
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            svg.appendChild(write_line_of_text(afootnotes[f],50,chartheight+30+vpos,"#333",footnotes_class));
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true) {	svg.appendChild(get_background(tcc_background_color,50,50,chartwidth-linewidth,100*heightmultiplier));
    }
    //--------------- HORIZONTAL LINES-------------------------------------//
    if (bHorizontalLines==true)
    {
        //tickcounter=5; // THE NUMBER OF TICKS
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;

        for (x=0; x < tickcounter; x++) 
        {
                 svg.appendChild(write_line(45,50+chartwidth-linewidth,50+((tickcount*heightmultiplier)*x),50+((tickcount*heightmultiplier)*x),tcc_line_color,".1","round",""));
               
                if (bShowScales==true)
                {
                    svg.appendChild(write_line_of_text(tickcountvalue * (tickcounter - x) + percentage_suffix,25,50+((tickcount*heightmultiplier)*x)+5,"#333","values"));
                }
        }
                svg.appendChild(write_line(45,50+chartwidth-linewidth,50+((tickcount*heightmultiplier)*tickcounter),50+((tickcount*heightmultiplier)*tickcounter),tcc_line_color,".1","round",""));
    }

    //--------------- ADD THE POLYGONS-------------------------------------//
    for(i=0; i < mylinedata.length; i++)
    {
        //tickcounter=5; // THE NUMBER OF TICKS
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
        
        polycolor=mylinecolors[i];
        my_x_points=new Array();
        my_y_points=new Array();
        
        my_x_points.push(leftmargin);
        my_y_points.push(50+(100*heightmultiplier- (100/max_value_on_scale)*0*heightmultiplier))
        for (x=0; x < mylinedata[i].length; x++)
        {
            my_x_points.push(leftmargin+(linewidth*x))
            my_y_points.push(50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[i][x]*heightmultiplier))
        }
        my_x_points.push(leftmargin+(linewidth*(mylinedata[i].length-1)))
        my_y_points.push(50+(100*heightmultiplier- (100/max_value_on_scale)*0*heightmultiplier))
        
        my_points="";
        for (x=0; x < my_x_points.length; x++)
        {
            my_points=my_points+" "+my_x_points[x]+","+my_y_points[x];
        }
       // alert(my_points);
        pg =document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            pg.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"poly"+i);
            pg.setAttribute("points",my_points);
            pg.setAttribute("style","fill:"+polycolor+";stroke:purple;stroke-width:1;fill-opacity:0.6;");
            if (item_class != "") {  pg.setAttribute("class",item_class);     }
            svg.appendChild(pg); //'"+div_id+"-"+tcc_div_chart_counter+"line'   //divtest1b-2line
    }    
   
    //--------------- ADD THE DATA LINES-------------------------------------//
    for (x=0; x < mylinedata[0].length; x++)
    {
        for (y=0; y< mylinedata.length; y++)
        {
            if (x < mylinedata[0].length-1)
            {
                var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                mld2.setAttribute("x1", 50+(linewidth*x));
                mld2.setAttribute("x2", 50+(linewidth*(x+1)));
                mld2.setAttribute("y1", 50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier));
                mld2.setAttribute("y2", 50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x+1]*heightmultiplier));  
                mld2.setAttribute("stroke", mylinecolors[y]);  
                mld2.setAttribute("stroke-width", "1");
		        mld2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"line"+x+"-"+y);
                if (item_class != "") {  mld2.setAttribute("class",item_class);     }
                svg.appendChild(mld2);  
            }               
            // ADD THE CIRCLE
            if (tick_shape=="circle")
            {
                var cd2=document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cd2.setAttribute("cx",50+(linewidth*x));
                cd2.setAttribute("cy",50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier));
                cd2.setAttribute("r",2);
                cd2.setAttribute("fill",mylinecolors[y]);
		        cd2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"circle"+x+"-"+y);
                if (item_class != "") {  cd2.setAttribute("class",item_class);     }
                svg.appendChild(cd2);  
            }
            // ADD TEXT  valueformat
            if (valueformat != "")
            {
            var vtext=document.createElementNS("http://www.w3.org/2000/svg", "text");
                vtext.setAttribute("x",50+(linewidth*x));
                vtext.setAttribute("y",50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier)-10);
                vtext.setAttribute("fill",mylinecolors[y]);
                vtext.textContent=valueformat.replace("%d",mylinedata[y][x]).replace("[[value]]",mylinedata[y][x]).replace("[value]",mylinedata[y][x])+percentage_suffix;
                if ( value_text_class != "")
                {
                     vtext.setAttribute("class",item_class); 
                } else
                {
		            if (item_class != "") {  vtext.setAttribute("class",item_class);  vtext.setAttribute("style","font-size: 7pt");   } else {  vtext.setAttribute("class","tcc_values"); }
		        }
		        vtext.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y);
                svg.appendChild(vtext);  
            }
            // ADDING THE HIDDEN LINE
            var hll1 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                hll1.setAttribute("x1", 50+(linewidth*x));
                hll1.setAttribute("x2", 50+(linewidth*(x+1)));
                hll1.setAttribute("y1", 50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier));
                hll1.setAttribute("y2", 50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x+1]*heightmultiplier)); 
                hll1.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"linechart-linehidden"+x);
                hll1.setAttribute("stroke", "transparent");
                hll1.setAttribute("onclick","tcc_item_click('wave','"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"linechart-legendtext"+y+"','"+div_id+"-"+tcc_div_chart_counter+"line','"+mylinedata[0].length+"','"+y+"');");
                svg.appendChild(hll1);    
        }

        var t2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
            t2.setAttribute("x1", 50+(linewidth*x));
            t2.setAttribute("x2", 50+(linewidth*x));
            t2.setAttribute("y1", 50+((20*heightmultiplier)*5));
            t2.setAttribute("y2", 50+((20*heightmultiplier)*5)+5);  
            t2.setAttribute("stroke", "#222");  
            svg.appendChild(t2);  
            if (x < myitempts.length)
            {


            if (x < myitempts.length)
            {
                  if (vertical_text == true)
                        {       // VERTICAL TEXT
                                   svg.appendChild( add_vertical_text(50+(linewidth*x),50+((20*heightmultiplier)*5)+10,myitempts[x],"#333","values"));
	                     } else
	                     {   // NON VERTICAL TEXT
	                               svg.appendChild( add_wrapped_text(50+(linewidth*x),50+((20*heightmultiplier)*5)+15,linewidth,myitempts[x],"#333","values"));
	                      }
            }
            }
        }
    
    //--------------- ADD THE LEGEND -------------------------------------//
    if (bShowLegend)
    {
        for (x=0;x < myitems.length;x++)
        {
            var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                //lr1.setAttribute("x", 100+chartwidth-linewidth+10);   // CHANGED 2013-11-30
                lr1.setAttribute("x", 50+chartwidth-(linewidth/2)+10);
                lr1.setAttribute("width", 10);
                lr1.setAttribute("y", 50+(x*15));
                lr1.setAttribute("height", 10);
                lr1.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"linechart-legendbox"+x);
                lr1.setAttribute("name",div_id+"-"+tcc_div_chart_counter+"linechartzz"+x);
                lr1.setAttribute("fill", mylinecolors[x]);
                svg.appendChild(lr1);
            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                //lt1.setAttribute("x", 100+chartwidth-linewidth+25);
                lt1.setAttribute("x", 50+chartwidth-(linewidth/2)+25);
                lt1.setAttribute("y", 50+(x*15)+10);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","legendtext");
                lt1.setAttribute("name",div_id+"-"+tcc_div_chart_counter+"linechartzz"+x);
                lt1.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"linechart-legendtext"+x);
               
                lt1.textContent=myitems[x];
                svg.appendChild(lt1);  

            var hlr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                hlr1.setAttribute("x", 50+chartwidth-(linewidth/2)+10);
                hlr1.setAttribute("width", 200);
                hlr1.setAttribute("y", 50+(x*15));
                hlr1.setAttribute("height", 10);
                hlr1.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"linechart-legendhidden"+x);
                hlr1.setAttribute("fill", "transparent");
                hlr1.setAttribute("onclick","tcc_item_click('wave','"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"linechart-legendtext"+x+"','"+div_id+"-"+tcc_div_chart_counter+"line','"+mylinedata[0].length+"','"+x+"');");
                svg.appendChild(hlr1);              
         }
    }
    document.getElementById(div_id).appendChild(svg);
    tcc_div_chart_counter+=1;
}  //------------------------------ END FUNCTION BUILD WAVE CHART---------------------------------------------------//
///****************************************************************************************************************///

















