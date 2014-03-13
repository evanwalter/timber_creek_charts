//----------------------------------------- BUILD A STACKED WAVE CHART -----------------------------------------------------//
function build_stacked_wave_chart(div_id,svgwidth,svgheight,myitems,myitempts,mylinedata,mylinecolors,bShowLegend,bShowScales,
    chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,
    valueformat,static_max_value_on_scale,static_number_of_ticks)
{
    bShowLegend=false;
    bShowScales=false;
    var NS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(NS,"svg");
    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);
    svg.setAttribute("fill","transparent");
    svg.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"svg");

    //bHorizontalLines=bShowScales;

    var chartwidth=svgwidth-100;
//    var chartheight=svgheight-100;
    var chartheight=svgheight-120;//(svgheight/5);

    legendwidth=150;
    
    tickcounter=5; // THE NUMBER OF TICKS
    tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%

    itemcount=myitems.length;
    waveheight=chartheight/itemcount;
    wavemultiplier=waveheight/120;
    
    leftmargin=120;
    
   
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
            svg.appendChild(write_line_of_text(afootnotes[f],50,50+(waveheight*itemcount)+40+vpos,"#333",footnotes_class));
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true) {	svg.appendChild(get_background(tcc_background_color,leftmargin,50,chartwidth-linewidth,100*heightmultiplier));
    }
    //--------------- HORIZONTAL GRID LINES-------------------------------------//
    if (bHorizontalLines)
    {
        for(y=0; y < myitems.length; y++)
        {
                //tickcounter=5; // THE NUMBER OF TICKS
                tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
                tickcountvalue = max_value_on_scale / tickcounter;
                
                if (myitems[y].length*4<50)
                {
                    svg.appendChild(write_line_of_text(myitems[y],leftmargin-(leftmargin*4/5),50+((tickcount*wavemultiplier)*(tickcounter/2))+5+(waveheight*y),"#333","tcc_values_1"));
                } else
                {
                    item_label_arr=myitems[y].split(" ");
                    next_item_label_part="";
                    item_label_ctr=0;
                    for(i=0;i<item_label_arr.length;i++)
                    {
                        if (next_item_label_part=="")
                        {
                            next_item_label_part=item_label_arr[i];
                        } else
                        {
                           next_item_label_part=next_item_label_part+" "+item_label_arr[i];
                        }
                        if (next_item_label_part.length*4>40)
                        {
                            svg.appendChild(write_line_of_text(next_item_label_part,leftmargin-(leftmargin*4/5),50+((tickcount*wavemultiplier)*(tickcounter/2))+5+(waveheight*y)+(item_label_ctr*10),"#333","tcc_values_1"));
                            next_item_label_part=""; 
                            item_label_ctr+=1;   
                        }
                    }
                    if (next_item_label_part != "")
                        {
                            svg.appendChild(write_line_of_text(next_item_label_part,leftmargin-(leftmargin*4/5),50+((tickcount*wavemultiplier)*(tickcounter/2))+5+(waveheight*y)+(item_label_ctr*10),"#333","tcc_values_1"));
                            next_item_label_part=""; 
                            item_label_ctr+=1;   
                        }
                }

                for (x=0; x <= tickcounter; x++) 
                {
                    var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                        l1.setAttribute("x1", leftmargin);
                        l1.setAttribute("x2", leftmargin+chartwidth-linewidth);
                        l1.setAttribute("y1", 50+((tickcount*wavemultiplier)*x)+(waveheight*y));
                        l1.setAttribute("y2", 50+((tickcount*wavemultiplier)*x)+(waveheight*y));
                        l1.setAttribute("stroke", "#bbb");
                        l1.setAttribute("stroke-width", ".5");
                        l1.setAttribute("stroke-linecap", "round");
                        svg.appendChild(l1);  
                    if (bShowScales==true)
                    {
                        svg.appendChild(write_line_of_text(tickcountvalue * (tickcounter - x) + percentage_suffix,leftmargin-10,50+((tickcount*wavemultiplier)*x)+5+(waveheight*y),"#333","values"));
                    }
                }
         }
    }


    //--------------- ADD THE POLYGONS-------------------------------------//
    for(i=0; i < myitems.length; i++)
    {
        //tickcounter=5; // THE NUMBER OF TICKS
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
        
        polycolor=mylinecolors[i];
        my_x_points=new Array();
        my_y_points=new Array();
        
        my_x_points.push(leftmargin);
        //my_y_points.push(((100*wavemultiplier)-(100/max_value_on_scale))+(waveheight*(i+1)));
        my_y_points.push(50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*i))
        for (x=0; x < mylinedata[i].length; x++)
        {
            my_x_points.push(leftmargin+(linewidth*x))
            my_y_points.push(50+(100*wavemultiplier- (100/max_value_on_scale)*mylinedata[i][x]*wavemultiplier)+(waveheight*i))
        }
        my_x_points.push(leftmargin+(linewidth*(mylinedata[i].length-1)))
        my_y_points.push(50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*i))
        
        my_points="";
        for (x=0; x < my_x_points.length; x++)
        {
            my_points=my_points+" "+my_x_points[x]+","+my_y_points[x];
        }
       // alert(my_points);
        pg =document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            pg.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"-poly"+i);
            //pg.setAttribute("points","220,10 220,40 350,242 170,250 123,234");
            pg.setAttribute("points",my_points);
            pg.setAttribute("style","fill:"+polycolor+";stroke:purple;stroke-width:1;fill-opacity:0.6;");
         //   pg.setAttribute("onclick","tcc_item_radar_click('radar','"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"radarchart-legendtext"+x+"','"+div_id+"-"+tcc_div_chart_counter+"radar','"+my_item_points.length+"','"+x+"');");
            svg.appendChild(pg); 
    }    
   
    //--------------- ADD THE DATA LINES-------------------------------------//
    for (x=0; x < mylinedata[0].length; x++)
    {
        for (y=0; y< mylinedata.length; y++)
        {
            if (x < mylinedata[0].length-1)
            {
                var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                mld2.setAttribute("x1", leftmargin+(linewidth*x));
                mld2.setAttribute("x2", leftmargin+(linewidth*(x+1)));
                mld2.setAttribute("y1", 50+(100*wavemultiplier- (100/max_value_on_scale)*mylinedata[y][x]*wavemultiplier)+(waveheight*y));
                mld2.setAttribute("y2", 50+(100*wavemultiplier- (100/max_value_on_scale)*mylinedata[y][x+1]*wavemultiplier)+(waveheight*y));  
                mld2.setAttribute("stroke", mylinecolors[y]);  
                l1.setAttribute("stroke-width", ".1");
		        mld2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"line"+x+"-"+y);
                svg.appendChild(mld2); /*
                svg.appendChild(write_line(50+(linewidth*x),50+(linewidth*(x+1)),
                    50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier),
                    50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x+1]*heightmultiplier),
                    mylinecolors[y],".1","round",div_id+"-"+tcc_div_chart_counter+"line"+x+"-"+y));*/
            }               
            // ADD THE CIRCLE
            if (tick_shape=="circle")
            {
                var cd2=document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cd2.setAttribute("cx",leftmargin+(linewidth*x));
                cd2.setAttribute("cy",50+(100*wavemultiplier- (100/max_value_on_scale)*mylinedata[y][x]*wavemultiplier)+(waveheight*y));
                cd2.setAttribute("r",4);
                cd2.setAttribute("fill",mylinecolors[y]);
                cd2.setAttribute("onmouseover","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y+"')");
                cd2.setAttribute("onmouseout","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y+"')");
                
		        cd2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"circle"+x+"-"+y);
                svg.appendChild(cd2);  
            }
            // ADD TEXT  valueformat
            if (valueformat != "")
            {
            var vtext=document.createElementNS("http://www.w3.org/2000/svg", "text");
                vtext.setAttribute("x",leftmargin+(linewidth*x)+4);
                vtext.setAttribute("y",50+(100*wavemultiplier- (100/max_value_on_scale)*mylinedata[y][x]*wavemultiplier)-5+(waveheight*y));
                vtext.setAttribute("fill","#111");
                vtext.setAttribute("class","tcc_values_1");
                vtext.setAttribute("style","display:none;");
                vtext.textContent=valueformat.replace("%d",mylinedata[y][x]).replace("[[value]]",mylinedata[y][x]).replace("[value]",mylinedata[y][x])+percentage_suffix;
		        vtext.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y);
                svg.appendChild(vtext);  
            }
      }

        //  ADDING THE VERTICAL LINES
        var t2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
            t2.setAttribute("x1", leftmargin+(linewidth*x));
            t2.setAttribute("x2", leftmargin+(linewidth*x));
            t2.setAttribute("y1", 50);
            t2.setAttribute("y2", 50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*(itemcount-1)));  
            t2.setAttribute("stroke", "#bbb");  
            t2.setAttribute("stroke-width", ".5");  
            svg.appendChild(t2);  
            
            // ADDING THE TEXT TO THE BOTTOM OF THE GRID
            if (x < myitempts.length)
            {
                  if (vertical_text == true)
                        {       // VERTICAL TEXT
                                 var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
   		                            xpos=leftmargin+(linewidth*x);
                                    //ypos=50+((20*heightmultiplier)*5)+10;
                                    ypos=50+(waveheight*itemcount);
                                    ipt1.setAttribute("transform","translate("+xpos+","+ypos+")rotate(90)");
                                    ipt1.textContent=myitempts[x];
                                    ipt1.setAttribute("fill", "#333");
                                    ipt1.setAttribute("class","values");

                                    ipt1.textContent=myitempts[x];
                                    svg.appendChild(ipt1);       
	                     } else
	                     {   // NON VERTICAL TEXT
                                     var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                                        ipt1.setAttribute("x", leftmargin+(linewidth*x));
                                        ipt1.setAttribute("y", 50+(waveheight*itemcount)); 
                                        ipt1.setAttribute("fill", "#333");
                                        ipt1.setAttribute("class","values");
                                       
		                        next_label=myitempts[x]
		                        if ((next_label.length*4)<linewidth)
		                        {
                	                        var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                	                        iptxt1.setAttribute("x", leftmargin+(linewidth*x));
                	                        iptxt1.setAttribute("y", 50+(waveheight*itemcount)); 
			                        iptxt1.setAttribute("fill", "#333");
                	                        iptxt1.setAttribute("class","values");
                	                        iptxt1.textContent=myitempts[x];
                	                        ipt1.appendChild(iptxt1);
                                } else
		                        {
			                        next_label_array=next_label.split(" ");
			                        next_label="";
			                        label_rowctr=0;
			                        for(actr=0;actr<next_label_array.length; actr++)
			                        {
				                        if (next_label=="")
				                        {
					                        next_label=next_label_array[actr];
				                        } else
				                        {
					                        next_label=next_label+" "+next_label_array[actr];
				                        }	
				                        if ((actr+1)==next_label_array.length)
				                        {
              				                        var aiptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                				                        aiptxt1.setAttribute("x", leftmargin+(linewidth*x));
                				                        aiptxt1.setAttribute("y", label_rowctr+50+(waveheight*itemcount)); 
						                        aiptxt1.setAttribute("fill", "#333");
                				                        aiptxt1.setAttribute("class","values");
                				                        aiptxt1.textContent=(next_label);
                				                        ipt1.appendChild(aiptxt1);
				                        } else
				                        {
					                        if (((next_label+" "+next_label_array[actr+1]).length*4)>(linewidth-10))
					                        {
              				                        var aiptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                				                       aiptxt1.setAttribute("x", leftmargin+(linewidth*x));
                				                        aiptxt1.setAttribute("y", label_rowctr+50+(waveheight*itemcount)); 
						                        aiptxt1.setAttribute("fill", "#333");
                				                        aiptxt1.setAttribute("class","values");
                				                        aiptxt1.textContent=(next_label);
                				                        ipt1.appendChild(aiptxt1);
					                        next_label="";
					                        label_rowctr=label_rowctr+8;
					                        }
				                        }
			                        };
		                        }
                                svg.appendChild(ipt1);   
	                        } // END NON VERTICAL TEXT	


            }
        }
    

    document.getElementById(div_id).appendChild(svg);
    tcc_div_chart_counter+=1;
}  //------------------------------ END FUNCTION BUILD STACKED WAVE CHART---------------------------------------------------//








function show_hide_text(svgid,objid)
{
	svgDoc=document.getElementById(svgid);
	// HIDE THE ITEMS
	obj=svgDoc.getElementById(objid);
	if (obj != undefined)  {
	    if (obj.style.display == 'none') { obj.style.display='block'; }
	    else {obj.style.display='none';}
	}
	
}
