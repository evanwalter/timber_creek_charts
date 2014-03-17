//----------------------------------------- BUILD A STACKED WAVE CHART -----------------------------------------------------//
function build_stacked_wave_chart(div_id,svgwidth,svgheight,myitems,myitempts,mydata,mydata_text,mycolors,bShowLegend,bShowScales,
    chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,
    valueformat,static_max_value_on_scale,static_number_of_ticks,item_class,value_text_class)
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
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mydata);
    }  else
    {
        if (valueformat=="") { valueformat="%d"; percentage_suffix="%"; }
    } 
    if (static_max_value_on_scale > 0)  { max_value_on_scale=static_max_value_on_scale;  } 
    if (static_number_of_ticks > 0)   { tickcounter=static_number_of_ticks;  } 
    
    heightmultiplier=chartheight/200;
    linewidth=(chartwidth)/mydata[0].length;
    
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
    for(y=0; y < myitems.length; y++)
    {
            //tickcounter=5; // THE NUMBER OF TICKS
            tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
            tickcountvalue = max_value_on_scale / tickcounter;
            
            // THE ROW LABELS
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
                // ADD HORIZONTAL GRID LINES
                if (bHorizontalLines==true)
                {
                    svg.appendChild(write_line(leftmargin,leftmargin+chartwidth-linewidth,50+((tickcount*wavemultiplier)*x)+(waveheight*y),50+((tickcount*wavemultiplier)*x)+(waveheight*y),"#111",".02","round",""));
                        
                }
                // ADD SCALES
                if (bShowScales==true)
                {
                    svg.appendChild(write_line_of_text(tickcountvalue * (tickcounter - x) + percentage_suffix,leftmargin-10,50+((tickcount*wavemultiplier)*x)+5+(waveheight*y),"#333","values"));
                }
            }
     }
    


    //--------------- ADD THE POLYGONS-------------------------------------//
    for(i=0; i < myitems.length; i++)
    {
        //tickcounter=5; // THE NUMBER OF TICKS
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
        
        polycolor=mycolors[i];
        my_x_points=new Array();
        my_y_points=new Array();
        
        my_x_points.push(leftmargin);
        //my_y_points.push(((100*wavemultiplier)-(100/max_value_on_scale))+(waveheight*(i+1)));
        my_y_points.push(50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*i))
        for (x=0; x < mydata[i].length; x++)
        {
            my_x_points.push(leftmargin+(linewidth*x))
            my_y_points.push(50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[i][x]*wavemultiplier)+(waveheight*i))
        }
        my_x_points.push(leftmargin+(linewidth*(mydata[i].length-1)))
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
            if (item_class != "") {  pg.setAttribute("class",item_class);     }
            svg.appendChild(pg); 
    }    
   
    //--------------- ADD THE DATA LINES-------------------------------------//
    for (x=0; x < mydata[0].length; x++)
    {
        for (y=0; y< mydata.length; y++)
        {
            if (x < mydata[0].length-1)
            {
                var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                mld2.setAttribute("x1", leftmargin+(linewidth*x));
                mld2.setAttribute("x2", leftmargin+(linewidth*(x+1)));
                mld2.setAttribute("y1", 50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x]*wavemultiplier)+(waveheight*y));
                mld2.setAttribute("y2", 50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x+1]*wavemultiplier)+(waveheight*y));  
                mld2.setAttribute("stroke", mycolors[y]);  
                mld2.setAttribute("stroke-width", ".1");
		        mld2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"line"+x+"-"+y);
                if (item_class != "") {  mld2.setAttribute("class",item_class);     }
                svg.appendChild(mld2); /*
                svg.appendChild(write_line(50+(linewidth*x),50+(linewidth*(x+1)),
                    50+(100*heightmultiplier- (100/max_value_on_scale)*mydata[y][x]*heightmultiplier),
                    50+(100*heightmultiplier- (100/max_value_on_scale)*mydata[y][x+1]*heightmultiplier),
                    mycolors[y],".1","round",div_id+"-"+tcc_div_chart_counter+"line"+x+"-"+y));*/
            }               
            // ADD THE CIRCLE
            if (tick_shape=="circle")
            {
                var cd2=document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cd2.setAttribute("cx",leftmargin+(linewidth*x));
                cd2.setAttribute("cy",50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x]*wavemultiplier)+(waveheight*y));
                cd2.setAttribute("r",4);
                cd2.setAttribute("fill",mycolors[y]);
                cd2.setAttribute("onmouseover","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y+"')");
                cd2.setAttribute("onmouseout","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y+"')");
                if (item_class != "") {  cd2.setAttribute("class",item_class);     }
                
		        cd2.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"circle"+x+"-"+y);
                svg.appendChild(cd2);  
            }
            // ADD TEXT  valueformat
            if (valueformat != "")
            {
            var vtext=document.createElementNS("http://www.w3.org/2000/svg", "text");
                vtext.setAttribute("x",leftmargin+(linewidth*x)+4);
                vtext.setAttribute("y",50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x]*wavemultiplier)-5+(waveheight*y));
                vtext.setAttribute("fill","#111");
                if ( value_text_class != "")
                {
                     vtext.setAttribute("class",value_text_class); 
                } else
                {
                    vtext.setAttribute("class","tcc_values_1");
                }
                vtext.setAttribute("style","display:none;");
                if ((valueformat=="")||(valueformat=="%d")) 
                     {vtext.textContent=mydata_text[y][x];}
                else {vtext.textContent=valueformat.replace("%d",mydata[y][x]).replace("[[value]]",mydata[y][x]).replace("[value]",mydata[y][x])+percentage_suffix;}
		        vtext.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y);
                svg.appendChild(vtext);  
            }
      }

        //  ADDING THE VERTICAL LINES
            svg.appendChild(write_line(leftmargin+(linewidth*x),leftmargin+(linewidth*x),50,50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*(itemcount-1)),"#bbb",".5","",""))
            // ADDING THE TEXT TO THE BOTTOM OF THE GRID
            if (x < myitempts.length)
            {
                  if (vertical_text == true)
                        {       // VERTICAL TEXT
                                   svg.appendChild( add_vertical_text((leftmargin+(linewidth*x)),(50+(waveheight*itemcount)),myitempts[x],"#333","values"));
	                     } else
	                     {   // NON VERTICAL TEXT
	                               svg.appendChild( add_wrapped_text((leftmargin+(linewidth*x)),(50+(waveheight*itemcount)),linewidth,myitempts[x],"#333","values"));
	                      }
            }
        }
    

    document.getElementById(div_id).appendChild(svg);
    tcc_div_chart_counter+=1;
}  //------------------------------ END FUNCTION BUILD STACKED WAVE CHART---------------------------------------------------//











//****************************************************************************************************************************//
//****************************************************************************************************************************//
//****************************************************************************************************************************//
//----------------------------------------- BUILD A STACKED BARREL CHART -----------------------------------------------------//
function build_stacked_barrel_chart(div_id,svgwidth,svgheight,myitems,myitempts,mydata,mydata_text,mycolors,bShowLegend,bShowScales,
    bHorizontalLines,bVerticalLines,bShowValues,
    chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,
    valueformat,static_max_value_on_scale,static_number_of_ticks,item_class,value_text_class)
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
    
    var max_value_on_scale=100;
    percentage_suffix="%";

    if (bIsPercent==false)
    {
        max_value_on_scale=0;
	    percentage_suffix="";
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mydata);
    }  else
    {
        if (valueformat=="") { valueformat="%d"; percentage_suffix="%"; }
    } 
    if (static_max_value_on_scale > 0)  { max_value_on_scale=static_max_value_on_scale;  } 
    if (static_number_of_ticks > 0)   { tickcounter=static_number_of_ticks;  } 
    
//    heightmultiplier=1.5;
    heightmultiplier=chartheight/200;
    linewidth=(chartwidth)/(mydata[0].length+1);
    
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
    for(y=0; y < myitems.length; y++)
    {
            //tickcounter=5; // THE NUMBER OF TICKS
            tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
            tickcountvalue = max_value_on_scale / tickcounter;
            
            // THE ROW LABELS
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
                // ADD HORIZONTAL GRID LINES
                if (bHorizontalLines==true)
                {
                     svg.appendChild(write_line(leftmargin,leftmargin+chartwidth-linewidth,50+((tickcount*wavemultiplier)*x)+(waveheight*y),50+((tickcount*wavemultiplier)*x)+(waveheight*y),"#111",".02","round",""));
                }
                // ADD SCALES
                if (bShowScales==true)
                {
                    svg.appendChild(write_line_of_text(tickcountvalue * (tickcounter - x) + percentage_suffix,leftmargin-10,50+((tickcount*wavemultiplier)*x)+5+(waveheight*y),"#333","values"));
                }
            }
     }
    

    //--------------- ADD THE BARRELS-------------------------------------//
    for(i=0; i < myitems.length; i++)
    {
         for (x=0; x < mydata[i].length; x++)
        {
                    var mydefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                        mydefs.setAttribute("id",div_id+"mydefs"+x+"_"+i);
	                    var grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
		                        grad.setAttribute("id",div_id+"-lg-"+tcc_div_chart_counter+"column"+x+"-"+i);            
		                        grad.setAttribute("x1","0%");
		                        grad.setAttribute("x2","100%");
		                        grad.setAttribute("y1","0%");
		                        grad.setAttribute("y2","0%");
		                        mydefs.appendChild(grad);

                        var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                                stop1.setAttribute("id", div_id+"myStop1"+x+"-"+i);
                                stop1.setAttribute("offset", "0%");
                                //stop1.setAttribute("style", "stop-color: White; stop-opacity: 1");
                                stop1.setAttribute("stop-color", mycolors[i]);
                                grad.appendChild(stop1);

                      var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                                stop2.setAttribute("id", div_id+"myStop2"+x+"-"+i);
                                stop2.setAttribute("offset", "50%");
                                //stop2.setAttribute("style", "stop-color: #99cd9f; stop-opacity: 1");
                                stop2.setAttribute("stop-color", "#eee");
                                grad.appendChild(stop2);          
                      var stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                                stop3.setAttribute("id", div_id+"myStop2"+x+"-"+i);
                                stop3.setAttribute("offset", "100%");
                                //stop2.setAttribute("style", "stop-color: #99cd9f; stop-opacity: 1");
                                stop3.setAttribute("stop-color",mycolors[i]);
                                grad.appendChild(stop3);       
                        svg.appendChild(mydefs); 
                      var r1 =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        r1.setAttribute("x", leftmargin+(linewidth*x));// 50+(barwidth*nextpos));
                        r1.setAttribute("width", linewidth);// barwidth-barmargin);
                        r1.setAttribute("y", 50+(100*wavemultiplier- mydata[i][x]*wavemultiplier*(100/max_value_on_scale))+(waveheight*i));
                        r1.setAttribute("height", mydata[i][x]*wavemultiplier*(100/max_value_on_scale));
                        //r1.setAttribute("fill", colorset[y]);
                        r1.setAttribute("id",div_id+"-"+tcc_div_chart_counter+"column"+x+"-"+i);
                        r1.setAttribute("fill", "url(#"+div_id+"-lg-"+tcc_div_chart_counter+"column"+x+"-"+i+")");
                        if (bShowValues==false)
                        {
                            r1.setAttribute("onmouseover","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+i+"')");
                            r1.setAttribute("onmouseout","show_hide_text('"+div_id+"-"+tcc_div_chart_counter+"svg','"+div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+i+"')");
                        }                           
                        if (item_class != "") {  r1.setAttribute("class",item_class);     }
                       
                     svg.appendChild(r1);    
        }   
    
    }
    
    //--------------- ADD THE DATA TEXTS -------------------------------------//
    for (x=0; x < mydata[0].length; x++)
    {
        for (y=0; y< mydata.length; y++)
        {
            // ADD TEXT  valueformat
            if (valueformat != "")
            {
            next_text_val=mydata_text[y][x];
            if ((valueformat=="")&&(valueformat=="%d")) { next_text_val=valueformat.replace("%d",mydata[y][x]).replace("[[value]]",mydata[y][x]).replace("[value]",mydata[y][x])+percentage_suffix;}
            next_text_val=string_replace_to(next_text_val,"E","e");
            if ( value_text_class == "") { value_text_class= "tcc_values_1";}
            if (bShowValues==true)
                {
                svg.appendChild(write_line_of_text_id(next_text_val,leftmargin+(linewidth*x)+(linewidth/2),50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x]*wavemultiplier)+8+(waveheight*y),"#111",value_text_class,"",div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y));
                }
            else
                {
                svg.appendChild(write_line_of_text_id(next_text_val,leftmargin+(linewidth*x)+(linewidth/2),50+(100*wavemultiplier- (100/max_value_on_scale)*mydata[y][x]*wavemultiplier)+8+(waveheight*y),"#111",value_text_class,"display:none;",div_id+"-"+tcc_div_chart_counter+"label"+x+"-"+y));
                }
            } 
      }

        //  ADDING THE VERTICAL LINES
        if (bVerticalLines==true) {svg.appendChild(write_line(leftmargin+(linewidth*x),leftmargin+(linewidth*x),50,50+(100*wavemultiplier- (100/max_value_on_scale)*0*wavemultiplier)+(waveheight*(itemcount-1)),"#bbb",".5","","")) }
            
            // ADDING THE TEXT TO THE BOTTOM OF THE GRID
            if (x < myitempts.length)
            {
                  if (vertical_text == true)
                        {       // VERTICAL TEXT
                                   svg.appendChild( add_vertical_text((leftmargin+(linewidth*x)),(50+(waveheight*itemcount)),myitempts[x],"#333","values"));
	                     } else
	                     {   // NON VERTICAL TEXT
	                               svg.appendChild( add_wrapped_text((leftmargin+(linewidth*x)),(50+(waveheight*itemcount)),linewidth,myitempts[x],"#333","values"));
	                      }
            }
        }
    

    document.getElementById(div_id).appendChild(svg);
    tcc_div_chart_counter+=1;
}  //------------------------------ END FUNCTION BUILD STACKED BARRELROWS---------------------------------------------------//





function add_vertical_text(xpos,ypos,mytext,fill,classname)
{
	 var vt =  document.createElementNS("http://www.w3.org/2000/svg", "text");
		vt.setAttribute("transform","translate("+xpos+","+ypos+")rotate(90)");
		vt.textContent=mytext;
		vt.setAttribute("fill", fill);
		vt.setAttribute("class",classname);
    return    vt;       
}
function add_wrapped_text(x,y,linewidth,mytext,fill,classname)
{
       var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
           ipt1.setAttribute("x", x);///leftmargin+(linewidth*x)
           ipt1.setAttribute("y", y);//50+(waveheight*itemcount) 
           ipt1.setAttribute("fill", fill);//"#333");
           ipt1.setAttribute("class",classname);//"values");
               
        next_label=mytext//myitempts[x]
        if ((next_label.length*4)<linewidth)
        {
                    var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    iptxt1.setAttribute("x",x);// leftmargin+(linewidth*x)
                    iptxt1.setAttribute("y",y);// 50+(waveheight*itemcount)); 
                    iptxt1.setAttribute("fill", fill);//, "#333");
                    iptxt1.setAttribute("class",classname);//,"values");
                    iptxt1.textContent=mytext;//myitempts[x];
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
	                            aiptxt1.setAttribute("x",x);//, leftmargin+(linewidth*x));
	                            aiptxt1.setAttribute("y",y+label_rowctr);//, label_rowctr+50+(waveheight*itemcount)); 
                        aiptxt1.setAttribute("fill", fill);//, "#333");
	                            aiptxt1.setAttribute("class",classname);//,"values");
	                            aiptxt1.textContent=next_label;
	                            ipt1.appendChild(aiptxt1);
                } else
                {
                    if (((next_label+" "+next_label_array[actr+1]).length*4)>(linewidth-10))
                    {
                            var aiptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
	                           aiptxt1.setAttribute("x",x);//, leftmargin+(linewidth*x));
	                            aiptxt1.setAttribute("y",y+label_rowctr);//, label_rowctr+50+(waveheight*itemcount)); 
                        aiptxt1.setAttribute("fill", fill);//, "#333");
	                            aiptxt1.setAttribute("class",classname);//,"values");
	                            aiptxt1.textContent=next_label;
	                            ipt1.appendChild(aiptxt1);
                    next_label="";
                    label_rowctr=label_rowctr+8;
                    }
                }
            }; // end for
        } // end if
        return ipt1;
}

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
