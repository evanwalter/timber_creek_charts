var tcc_background_color;
var tick_shape="circle"; // line chart only

var vertical_text = false;

function build_a_timber_creek_chart(my_new_chart)
{
tcc_background_color="#efefff"
tcc_line_color="#000"

if (my_new_chart.backgroundcolor != null) { tcc_background_color=my_new_chart.backgroundcolor; }
if (my_new_chart.backgroundColor != null) { tcc_background_color=my_new_chart.backgroundColor; }
if (my_new_chart.background_color != null) { tcc_background_color=my_new_chart.background_color; }

if (my_new_chart.linecolor != null) { tcc_line_color=my_new_chart.linecolor; }
if (my_new_chart.lineColor != null) { tcc_line_color=my_new_chart.lineColor; }
if (my_new_chart.line_color != null) { tcc_line_color=my_new_chart.line_color; }

var default_colors = ["#8675ef","#1020fe","#6364fe","#4264fe","#9764f6","#5397fe","#5253ef","#3141ff","#6474fe","",""];

var div_id=my_new_chart.div_id;
var svgwidth=my_new_chart.dimensions.width;
var svgheight=my_new_chart.dimensions.height;
var chart_type=my_new_chart.charttype;

var myitems=new Array(my_new_chart.items.length);
var myitemcolors = new Array(my_new_chart.items.length);

for (x=0; x < my_new_chart.items.length;x++)
{
	if(my_new_chart.items[x].name != null) {  myitems[x]=my_new_chart.items[x].name; }
}

for (x=0; x < my_new_chart.items.length;x++)
{
    mycolor=check_color(my_new_chart.items[x].color);
	if(my_new_chart.items[x].color != null) {  myitemcolors[x]=mycolor }else {myitemcolors[x]="#0000ff"; }
}

var mydata = my_new_chart.data;
if (mydata[0] instanceof Array == false)
{
   mydata=[mydata];
};

var myitempts = new Array(mydata[0].length);
if (my_new_chart.itempoints != null)
{
	for (x=0; x <my_new_chart.itempoints.length;x++)
	{
		if (x< myitempts.length)
		{
			myitempts[x]=my_new_chart.itempoints[x];
		}
	}
}

var mylineitems = [];
var mylinedata = [];
var mylinecolors = [];
if (my_new_chart.lineitems != null)
{
    mylineitems = new Array(my_new_chart.lineitems);
    mylinecolors = new Array(my_new_chart.lineitems);
    for (x=0; x < my_new_chart.lineitems.length;x++)
    {
	    if(my_new_chart.lineitems[x].name != null) {   mylineitems[x]=my_new_chart.lineitems[x].name; }
	    if(my_new_chart.lineitems[x].color != null) {  mylinecolors[x]=my_new_chart.lineitems[x].color; }
    }
    mylinedata= my_new_chart.linedata;
    if (mylinedata[0] instanceof Array == false)
    {
        mylinedata=[mylinedata];
    }
}

var chart_label="";
var chart_label_position="none";
var chart_label_class="tcc_chartlabel";
var bIsPercent=true;
if (my_new_chart.chart_label != null) 
    { 
        if (my_new_chart.chart_label.name != null) {  chart_label = my_new_chart.chart_label.name;  }  else { chart_label = my_new_chart.chart_label; }
        if (my_new_chart.chart_label.class != null) {  chart_label_class = my_new_chart.chart_label.class;  }  
        if (my_new_chart.chart_label.position != null) {  chart_label_position = my_new_chart.chart_label.position;  }         
        
    };
if (my_new_chart.chart_label_position != null) { chart_label_position = my_new_chart.chart_label_position; };
if (my_new_chart.ispercentage != null) { bIsPercent = my_new_chart.ispercentage; };

var footnotes="";
var footnotes_class="tcc_footnote";
if (my_new_chart.footnotes != null) 
    { 
        if (my_new_chart.footnotes.name != null) {  footnotes = my_new_chart.footnotes.name;  }  else { footnotes = my_new_chart.footnotes; }
        if (my_new_chart.footnotes.class != null) {  footnotes_class = my_new_chart.footnotes.class;  }     
    };
if (my_new_chart.chart_footnote != null) 
    { 
        if (my_new_chart.chart_footnote.name != null) {  footnotes = my_new_chart.chart_footnote.name;  }  else { footnotes = my_new_chart.chart_footnote; }
        if (my_new_chart.chart_footnote.class != null) {  footnotes_class = my_new_chart.chart_footnote.class;  }     
    };

var barmargin = 1;
var bShowLegend=true;
var bShowScales=true;
var bShowBackground=false;
var valueformat="%d";
var bBar_Borders=true;
var bColumn_Borders=true;
var bShade_Borders=false;
var bHideTickMarks=false;


var static_max_value_on_scale=-1;
var static_number_of_ticks=-1;

if (my_new_chart.additionalsettings != null) {
    if (my_new_chart.additionalsettings.barmargin != null) { barmargin = my_new_chart.additionalsettings.barmargin; }
    if (my_new_chart.additionalsettings.showlegend != null) { bShowLegend = my_new_chart.additionalsettings.showlegend; }
    if (my_new_chart.additionalsettings.displaylegend != null) { bShowLegend = my_new_chart.additionalsettings.displaylegend; }
    if (my_new_chart.additionalsettings.showscales != null) { bShowScales = my_new_chart.additionalsettings.showscales; }
    if (my_new_chart.additionalsettings.showbackground != null) { bShowBackground = my_new_chart.additionalsettings.showbackground; }
    if (my_new_chart.additionalsettings.columnborders != null) { bColumn_Borders = my_new_chart.additionalsettings.columnborders;  bBar_Borders = my_new_chart.additionalsettings.columnborders;}
    if (my_new_chart.additionalsettings.barborders != null) { bColumn_Borders = my_new_chart.additionalsettings.barborders;  bBar_Borders = my_new_chart.additionalsettings.barborders;}
    if (my_new_chart.additionalsettings.shadeborders != null) { bShade_Borders = my_new_chart.additionalsettings.shadeborders; }
    if (my_new_chart.additionalsettings.hidetickmarks != null) { bHideTickMarks = my_new_chart.additionalsettings.hidetickmarks; }
    if (my_new_chart.additionalsettings.showtickmarks != null) { if (my_new_chart.additionalsettings.showtickmarks==false) { bHideTickMarks=true; } }

    if (my_new_chart.additionalsettings.max_value_on_scale != null) { static_max_value_on_scale = my_new_chart.additionalsettings.max_value_on_scale; }
    if (my_new_chart.additionalsettings.number_of_ticks != null) { static_number_of_ticks = my_new_chart.additionalsettings.number_of_ticks; }


    if (my_new_chart.additionalsettings.verticaltext != null)  { if (my_new_chart.additionalsettings.verticaltext==true) { vertical_text=true; }  if (my_new_chart.additionalsettings.verticaltext==false) { vertical_text=false; }}  
    if (my_new_chart.additionalsettings.valueformat != null) 
	{ valueformat= my_new_chart.additionalsettings.valueformat; }
	else {   if (bIsPercent == true) { valueformat="%d%"; }
		}
}



if (chart_type.toLowerCase()=="line")
    {
	    build_line_chart(div_id,svgwidth,svgheight,myitems,myitempts,mydata,myitemcolors,bShowLegend,bShowScales,chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,valueformat)
    }
if (chart_type.toLowerCase()=="bar")
    {
    build_bar_chart(div_id, svgwidth, svgheight, myitems, mylineitems, myitempts, mydata, mylinedata, myitemcolors, mylinecolors, bShowLegend, bShowScales, chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class,bIsPercent, barmargin, bShowBackground, valueformat, bBar_Borders, bShade_Borders, bHideTickMarks)
    }
if (chart_type.toLowerCase() == "column") {
    build_column_chart(div_id, svgwidth, svgheight, myitems, mylineitems, myitempts, mydata, mylinedata, myitemcolors, mylinecolors, bShowLegend, bShowScales, false, chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, barmargin, bShowBackground, valueformat, bColumn_Borders, bShade_Borders, bHideTickMarks,
        static_max_value_on_scale,static_number_of_ticks)
}
if (chart_type.toLowerCase() == "stacked") {
    build_stacked_chart(div_id, svgwidth, svgheight, myitems, mylineitems, myitempts, mydata, mylinedata, myitemcolors, mylinecolors, bShowLegend, bShowScales, false, chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, barmargin, bShowBackground, valueformat, bColumn_Borders, bShade_Borders, bHideTickMarks)
}

if (chart_type.toLowerCase() == "pie") {
    build_pie_chart(div_id, svgwidth, svgheight, myitems, myitempts, mydata, myitemcolors, bShowLegend, bShowScales, chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent,bShowBackground,valueformat)

}
}



// function build_column_chart(div_id,svgwidth,svgheight,items,lineitems,myitempts,mydata_multiarray,mylinedata,colorset,linecolors,bShowLegend,bShowScales,bSingleDimensionArray,chart_label,chart_label_position,bIsPercent)


//----------------------------------------- BUILD A LINE CHART -----------------------------------------------------//
function build_line_chart(div_id,svgwidth,svgheight,myitems,myitempts,mylinedata,mylinecolors,bShowLegend,bShowScales,
    chart_label,chart_label_class,chart_label_position,footnotes,footnotes_class,bIsPercent,bShowBackground,
    valueformat)
{
    var NS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(NS,"svg");
    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);

    bHorizontalLines=bShowScales;

    var chartwidth=svgwidth-25;
//    var chartheight=svgheight-100;
    var chartheight=svgheight-(svgheight/5);

    if (bShowLegend) { chartwidth=chartwidth-150; }

    var max_value_on_scale=100;
    percentage_suffix="%";

    if (bIsPercent==false)
    {
	    percentage_suffix="";
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mylinedata);
    }    
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
                var cl1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl1.setAttribute("y", 25+(15*i));
                    cl1.setAttribute("x", 50);
                    cl1.setAttribute("fill", "#333");
                    cl1.setAttribute("class",chart_label_class);
                    cl1.textContent=chart_label_text_array[i];
                    svg.appendChild(cl1);
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl2.setAttribute("y",  chartheight+15+(15*i));
                    cl2.setAttribute("x",  50);
                    cl2.setAttribute("fill", "#333");
                    cl2.setAttribute("class",chart_label_class);
                    cl2.textContent=chart_label_text_array[i];
                    svg.appendChild(cl2);
            }
    }
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl2.setAttribute("y", chartheight-20+vpos);
                cl2.setAttribute("x", 50);
                cl2.setAttribute("fill", "#333");
                cl2.setAttribute("class",footnotes_class);
                cl2.textContent=afootnotes[f];
                svg.appendChild(cl2);
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true)
    {
        var bkgrd =document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bkgrd.setAttribute("x", 50);
            bkgrd.setAttribute("y", 50);
            bkgrd.setAttribute("width", chartwidth-linewidth);
//            bkgrd.setAttribute("height", chartheight-150);
            bkgrd.setAttribute("height", max_value_on_scale*heightmultiplier);
            bkgrd.setAttribute("fill", tcc_background_color);
            svg.appendChild(bkgrd);
    }
    //--------------- HORIZONTAL LINES-------------------------------------//
    if (bHorizontalLines)
    {
        tickcounter=5; // THE NUMBER OF TICKS
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;

        for (x=0; x < tickcounter; x++) 
        {
            var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                l1.setAttribute("x1", 45);
                l1.setAttribute("x2", 50+chartwidth-linewidth);
                l1.setAttribute("y1", 50+((tickcount*heightmultiplier)*x));
                l1.setAttribute("y2", 50+((tickcount*heightmultiplier)*x));
                l1.setAttribute("stroke", tcc_line_color);
                l1.setAttribute("stroke-width", ".1");
                l1.setAttribute("stroke-linecap", "round");
                svg.appendChild(l1);  

            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", 25);
                lt1.setAttribute("y", 50+((tickcount*heightmultiplier)*x)+5);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","values");
               
                lt1.textContent = tickcountvalue * (tickcounter - x) + percentage_suffix;
                svg.appendChild(lt1);
        }
        var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                l1.setAttribute("x1", 45);
                l1.setAttribute("x2", 50+chartwidth-linewidth);
                l1.setAttribute("y1", 50+((tickcount*heightmultiplier)*tickcounter));
                l1.setAttribute("y2", 50+((tickcount*heightmultiplier)*tickcounter));
                l1.setAttribute("stroke", tcc_line_color);
                l1.setAttribute("stroke-width", ".1");
                svg.appendChild(l1);  
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
                svg.appendChild(cd2);  
            }
            // ADD TEXT  valueformat
            if (valueformat != "")
            {
            var vtext=document.createElementNS("http://www.w3.org/2000/svg", "text");
                vtext.setAttribute("x",50+(linewidth*x));
                vtext.setAttribute("y",50+(100*heightmultiplier- (100/max_value_on_scale)*mylinedata[y][x]*heightmultiplier)-10);
                vtext.setAttribute("fill",mylinecolors[y]);
                vtext.setAttribute("class","tcc_values");
                vtext.textContent=valueformat.replace("%d",mylinedata[y][x]);
                svg.appendChild(vtext);  
            
            }
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
                 var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    //ipt1.setAttribute("x", 50+(linewidth*x));
                    //ipt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20);
                    if (vertical_text == true)
                    {
                        xpos=50+(linewidth*x);
                    	ypos=50+((20*heightmultiplier)*5)+10;
                        ipt1.setAttribute("transform","translate("+xpos+","+ypos+")rotate(90)");
                        ipt1.textContent=myitempts[x];
                    } else
                    {
                        ipt1.setAttribute("x", 50+(linewidth*x));
                        ipt1.setAttribute("y", 50+((20*heightmultiplier)*5)+15);                 
                    }                    
                    ipt1.setAttribute("fill", "#333");
                    ipt1.setAttribute("class","values");

                    ipt1.textContent=myitempts[x];
                    svg.appendChild(ipt1);       
            }
        }
    
    //--------------- ADD THE LEGEND -------------------------------------//
    if (bShowLegend)
    {
        for (x=0;x < myitems.length;x++)
        {
            var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                lr1.setAttribute("x", 50+chartwidth-linewidth+10);
                lr1.setAttribute("width", 10);
                lr1.setAttribute("y", 50+(x*15));
                lr1.setAttribute("height", 10);
                lr1.setAttribute("fill", mylinecolors[x]);
                svg.appendChild(lr1);
            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", 50+chartwidth-linewidth+25);
                lt1.setAttribute("y", 50+(x*15)+10);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","legendtext");
               
                lt1.textContent=myitems[x];
                svg.appendChild(lt1);                
         }
    }
    document.getElementById(div_id).appendChild(svg);

}  //------------------------------ END FUNCTION BUILD LINE CHART---------------------------------------------------//





//----------------------------------------- BUILD A BAR CHART -----------------------------------------------------//
function build_bar_chart(div_id, svgwidth, svgheight, items, lineitems, myitempts, mydata, mylinedata, colorset, linecolors, bShowLegend, bShowScales, 
chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, barmargin, bShowBackground, valueformat, bBarBorders, bShadeBorders, bHideTickMarks)
{
    
    var NS="http://www.w3.org/2000/svg";     
    var svg=document.createElementNS(NS,"svg");

    var margin_left=100;
    bVerticalLines=bShowScales;
        
    var chartwidth=svgwidth;
    var chartheight=svgheight-100;

    var max_value_on_scale=100;
    percentage_suffix="%";

    if (bIsPercent==false)
    {
	    max_value_on_scale=0;
	    percentage_suffix="";
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mydata);
    }
    if (bShowLegend) { chartwidth=chartwidth-200; }

    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);

    barwidth=(chartwidth-80)/(mydata.length*mydata[0].length);
    barheight=chartheight/(mydata.length*mydata[0].length);
    
    heightmultiplier=2;
    widthmultiplier=chartwidth/145;
    
    //--------------- CHART LABELS -------------------------------------//
    // LABEL ON TOP
    if (chart_label_position=="top")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {
                var cl1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl1.setAttribute("y", 25+(15*i));
                    cl1.setAttribute("x", 100);
                    cl1.setAttribute("fill", "#333");
                    cl1.setAttribute("class",chart_label_class);
                    cl1.textContent=chart_label_text_array[i];
                    svg.appendChild(cl1);
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl2.setAttribute("y",  50+chartheight+40+(15*i));
                    cl2.setAttribute("x",  100);
                    cl2.setAttribute("fill", "#333");
                    cl2.setAttribute("class",chart_label_class);
                    cl2.textContent=chart_label_text_array[i];
                    svg.appendChild(cl2);
            }
    }    
    
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl2.setAttribute("y", 50+chartheight+20+vpos);
                cl2.setAttribute("x", 50);
                cl2.setAttribute("fill", "#333");
                cl2.setAttribute("class",footnotes_class);
                cl2.textContent=afootnotes[f];
                svg.appendChild(cl2);
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true)
    {
        var bkgrd =document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bkgrd.setAttribute("x", 100);
            bkgrd.setAttribute("width", chartwidth-100);
            bkgrd.setAttribute("y", 50);
            bkgrd.setAttribute("height", chartheight);
            bkgrd.setAttribute("fill", tcc_background_color);
            svg.appendChild(bkgrd);
    }    
    //---------------  VERTICAL LINES -------------------------------------//
    if (bVerticalLines)
    {
        tickcounter=5;//2;//10;//
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
    
        for (x=1; x <= tickcounter; x++)  //   for (x=0; x < 10; x++)   -- for every 10 points
        {
            var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                l1.setAttribute("x1", 100+((tickcount*widthmultiplier)*x)); 
                l1.setAttribute("x2", 100+((tickcount*widthmultiplier)*x)); 
                l1.setAttribute("y1", 50);
                l1.setAttribute("y2", 50+chartheight);
                l1.setAttribute("stroke", tcc_line_color);  // style="stroke:red;stroke-width:2"
                l1.setAttribute("stroke-width", ".2");
                svg.appendChild(l1);  

            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("y", 50+chartheight+20);
                lt1.setAttribute("x", 100+((tickcount*widthmultiplier)*x)-15);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","values");
                lt1.textContent = tickcountvalue * (x) + percentage_suffix;
                svg.appendChild(lt1);
        }
    }
    
    for (x = 0; x < mydata[0].length; x++)
    {
        for (y=0;y < items.length; y++)
        {
            nextpos=(x*items.length)+y;
            
            var r1 =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
                r1.setAttribute("x", margin_left);
                r1.setAttribute("width", mydata[y][x] * widthmultiplier * (100 / max_value_on_scale));
                r1.setAttribute("y", 50+(barheight*nextpos));
                r1.setAttribute("height",barheight-barmargin);
                r1.setAttribute("fill", colorset[y]);
                svg.appendChild(r1);     

            if (bBarBorders == true)
            {
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale));
                            lr1.setAttribute("x2", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale));
                            lr1.setAttribute("y1", 50+(barheight*nextpos));
                            lr1.setAttribute("y2", 50+(barheight*nextpos)+barheight-barmargin);
                            lr1.setAttribute("stroke", "#000000");
                            lr1.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1);    

                        var lr1a =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1a.setAttribute("x1", margin_left);
                            lr1a.setAttribute("x2", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale));
                            lr1a.setAttribute("y1", 50+(barheight*nextpos));
                            lr1a.setAttribute("y2", 50+(barheight*nextpos));
                            lr1a.setAttribute("stroke", "#000000");
                            lr1a.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1a);      
                        var lr1a =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1a.setAttribute("x1", margin_left);
                            lr1a.setAttribute("x2", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale));
                            lr1a.setAttribute("y1", 50+(barheight*nextpos+barheight-barmargin));
                            lr1a.setAttribute("y2", 50+(barheight*nextpos+barheight-barmargin));
                            lr1a.setAttribute("stroke", "#000000"); 
                            lr1a.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1a);      
               }

            //SHADING THE BORDERS
            if (bShadeBorders == true)
            {
                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barheight > 25) { shadectr=3; }
                 if (barheight > 35) { shadectr=4; }
                 if (barheight > 45) { shadectr=5; }

                 while (shadectr >=0)
                 {                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", margin_left);
                            lr1.setAttribute("x2", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale)-shadectr);
                            lr1.setAttribute("y1", 50+(barheight*nextpos)+shadectr);
                            lr1.setAttribute("y2", 50+(barheight*nextpos)+shadectr);
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", "1");
                            svg.appendChild(lr1);   
                        shadecolor=shade(shadecolor,"l");
                        shadecolor=shade(shadecolor,"l");
                        shadectr=shadectr-1;
                 }   

                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barheight > 25) { shadectr=3; }
                 if (barheight > 35) { shadectr=4; }
                 if (barheight > 45) { shadectr=5; }

                 while (shadectr >=0)
                 {
                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", margin_left);
                            lr1.setAttribute("x2", margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale)-shadectr);
                            lr1.setAttribute("y1", 50+(barheight*nextpos+barheight-barmargin)-shadectr);
                            lr1.setAttribute("y2", 50+(barheight*nextpos+barheight-barmargin)-shadectr);
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", "1");
                            svg.appendChild(lr1);   
                        shadecolor=shade(shadecolor,"d");
                        shadectr=shadectr-1;
                 }               
            
                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barheight > 25) { shadectr=3; }
                 if (barheight > 35) { shadectr=4; }
                 if (barheight > 45) { shadectr=5; }

                 while (shadectr >=0)
                 {
                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", (margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale))-shadectr);
                            lr1.setAttribute("x2", (margin_left+mydata[y][x] * widthmultiplier * (100 / max_value_on_scale))-shadectr);
                            lr1.setAttribute("y1", 50+(barheight*nextpos)+(shadectr));
                            lr1.setAttribute("y2", 50+(barheight*nextpos)+barheight-barmargin-(shadectr));
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", "1");
                            svg.appendChild(lr1);   
                        shadecolor=shade(shadecolor,"l");
                        shadecolor=shade(shadecolor,"l");
                        shadectr=shadectr-1;
                 }                          
            }


            var t1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
            t1.setAttribute("x", margin_left + (mydata[y][x] * widthmultiplier * (100 / max_value_on_scale)) + 5);
                t1.setAttribute("y", 50+(barheight*nextpos)+(barheight/2));
                t1.setAttribute("fill", "#333");
                if (barheight < 30)
                {
                    t1.setAttribute("class","tcc_values");
                } else
                {
                     t1.setAttribute("class","tcc_values_1");
                }
              
                t1.textContent = valueformat.replace("%d", mydata[y][x]).replace("[[value]]", mydata[y][x]).replace("[value]", mydata[y][x]);// + percentage_suffix;
                svg.appendChild(t1);
        }            

        var t2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
        t2.setAttribute("x1", 90);
        t2.setAttribute("x2", 100);
        t2.setAttribute("y1", 50+(barheight*x*items.length));
        t2.setAttribute("y2", 50+(barheight*x*items.length));  
        t2.setAttribute("stroke", "#222");  
        svg.appendChild(t2);  
        if (x < myitempts.length)
        {
             var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                ipt1.setAttribute("x", 50);
                ipt1.setAttribute("y", 50+(barheight*(x)*items.length)+10);
                ipt1.setAttribute("fill", "#333");
                ipt1.setAttribute("class","values");
               
                //ipt1.textContent=myitempts[x];
                var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                iptxt1.setAttribute("x", 50);
                iptxt1.setAttribute("y", 50+(barheight*(x)*items.length)+(barheight*items.length)/2);
                iptxt1.setAttribute("fill", "#333");
                iptxt1.setAttribute("class","values");
                iptxt1.textContent=myitempts[x];
                ipt1.appendChild(iptxt1);
               
                svg.appendChild(ipt1);       
        }                
    }

    //---------------  ADDING THE LINES -------------------------------------//
    if (mylinedata != null)
    {
        if (mylinedata.length > 0)
        {
            lineheight=mydata.length*barheight;
            for (x=0; x < mylinedata[0].length; x++)
            {
                if (x < mylinedata[0].length-1)
                {
                    for (y=0; y< mylinedata.length; y++)
                    {
                        var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                        mld2.setAttribute("x1", margin_left+(mylinedata[y][x]*widthmultiplier*(100/max_value_on_scale)));
                        mld2.setAttribute("x2", margin_left+(mylinedata[y][x+1]*widthmultiplier*(100/max_value_on_scale)));  
                        mld2.setAttribute("y1", 50+(lineheight/2)+(lineheight*x));
                        mld2.setAttribute("y2", 50+(lineheight/2)+(lineheight*(x+1)));
                        mld2.setAttribute("stroke", linecolors[y]);  
                        mld2.setAttribute("stroke-width", "2");
                        svg.appendChild(mld2);  
                    }
                }
            }    
        }
    }
    
    //----------------------------------------  ADDING THE LEGEND -------------------------------------//
    if (bShowLegend)
    {
        for (x=0;x < items.length;x++)
        {
            var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                lr1.setAttribute("x", chartwidth+5);
                lr1.setAttribute("width", 10);
                lr1.setAttribute("y", 50+(x*15));
                lr1.setAttribute("height", 10);
                lr1.setAttribute("fill", colorset[x]);
                svg.appendChild(lr1);
            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", chartwidth+20);
                lt1.setAttribute("y", 50+(x*15)+10);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","legendtext");
               
                lt1.textContent=items[x];
                svg.appendChild(lt1);                
         }
        if (mylinedata != null)
        {
            if (mylinedata.length > 0)
            {
                for (x=0;x < lineitems.length;x++)
                {
                    var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        lr1.setAttribute("x", chartwidth+5);
                        lr1.setAttribute("width", 10);
                        lr1.setAttribute("y", 50+(items.length*15)+(x*15));
                        lr1.setAttribute("height", 10);
                        lr1.setAttribute("fill", linecolors[x]);
                        svg.appendChild(lr1);
                    var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                        lt1.setAttribute("x", chartwidth+20);
                        lt1.setAttribute("y", 50+(items.length*15)+(x*15)+10);
                        lt1.setAttribute("fill", "#333");
                        lt1.setAttribute("class","legendtext");
                       
                        lt1.textContent=lineitems[x];
                        svg.appendChild(lt1);                
                 }
             }
         }
    }
    document.getElementById(div_id).appendChild(svg);

}  //------------------------------ END FUNCTION BUILD BAR CHART--------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------//





//----------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------- BUILD A STACKED CHART ------------------------------------------------------------------------------//
function build_stacked_chart(div_id, svgwidth, svgheight, items, lineitems, myitempts, mydata, mylinedata, colorset, linecolors, bShowLegend, bShowScales, bSingleDimensionArray,
chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, barmargin, bShowBackground, valueformat, bColumn_Borders, bShadeBorders, bHideTickMarks)
{

    var NS="http://www.w3.org/2000/svg";     
    var svg=document.createElementNS(NS,"svg");

    bHorizontalLines=bShowScales;
        
    var chartwidth=svgwidth;
    var chartheight=svgheight-50;

    var max_value_on_scale = 100;
    percentage_suffix="%";

    if (bIsPercent==false)
    {
//	    max_value_on_scale=0;
	    percentage_suffix="";
//	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mydata);
    }

    if (bShowLegend) { chartwidth=chartwidth-200; }

    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);

    barwidth=(chartwidth-80)/(mydata.length*mydata[0].length);
    
    heightmultiplier=chartheight/200;

    //--------------- CHART LABELS -------------------------------------//
    // LABEL ON TOP
    if (chart_label_position=="top")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {
                var cl1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl1.setAttribute("y", 25+(15*i));
                    cl1.setAttribute("x", 50);
                    cl1.setAttribute("fill", "#333");
                    cl1.setAttribute("class",chart_label_class);
                    cl1.textContent=chart_label_text_array[i];
                    svg.appendChild(cl1);
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl2.setAttribute("y",  chartheight-40+(15*i));
                    cl2.setAttribute("x",  50);
                    cl2.setAttribute("fill", "#333");
                    cl2.setAttribute("class",chart_label_class);
                    cl2.textContent=chart_label_text_array[i];
                    svg.appendChild(cl2);
            }
    }    
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl2.setAttribute("y", chartheight-20+vpos);
                cl2.setAttribute("x", 50);
                cl2.setAttribute("fill", "#333");
                cl2.setAttribute("class",footnotes_class);
                cl2.textContent=afootnotes[f];
                svg.appendChild(cl2);
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true)
    {
        var bkgrd =document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bkgrd.setAttribute("x", 50);
            bkgrd.setAttribute("width", chartwidth-80);
            bkgrd.setAttribute("y", 50);
//            bkgrd.setAttribute("height", chartheight-150);
//            bkgrd.setAttribute("height", max_value_on_scale*heightmultiplier);
            bkgrd.setAttribute("height", 100*heightmultiplier);
            bkgrd.setAttribute("fill", tcc_background_color);
            svg.appendChild(bkgrd);
    }
    //---------------  HORIZONTAL LINES -------------------------------------//
    if (bHorizontalLines)
    {
        tickcounter=5;//2;//10;//
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
    
        for (x=0; x < tickcounter; x++)  //   for (x=0; x < 10; x++)   -- for every 10 points
        {
            var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                l1.setAttribute("x1", 45);
                l1.setAttribute("x2", chartwidth-30);
                l1.setAttribute("y1", 50+((tickcount*heightmultiplier)*x));//   l1.setAttribute("y1", 50+((10*heightmultiplier)*x))  -- for every 10 points
                l1.setAttribute("y2", 50+((tickcount*heightmultiplier)*x)); //  l1.setAttribute("y2", 50+((10*heightmultiplier)*x))
                l1.setAttribute("stroke", tcc_line_color);  // style="stroke:red;stroke-width:2"
                l1.setAttribute("stroke-width", ".2");
                svg.appendChild(l1);  

            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", 25);
                lt1.setAttribute("y", 50+((tickcount*heightmultiplier)*x)+5);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","tcc_values");
               
                lt1.textContent=tickcountvalue*(tickcounter-x)+percentage_suffix;
                svg.appendChild(lt1);
        }
    }
    
    //---------------  ADDING THE COLUMN BARS -------------------------------------//
       for (x=0; x < mydata[0].length; x++)
        {
                nextpos=(x*items.length);
                accumheight=0;
                columnbase=0;
                columncount=0;
                
                for (z=0;z < items.length; z++)
                {
                    columnbase=columnbase+mydata[z][x];
                    columncount+=1;
                }
                barposition=0;
                if (columncount >1) {  barposition= ((barwidth-barmargin)*(columncount/2))-(barwidth/2); }
                
                for (y=0;y < items.length; y++)
                {
                   
                    var r2=  document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        r2.setAttribute("x", 50+(barwidth*nextpos)+(barposition));
                        r2.setAttribute("width", barwidth-barmargin);
                        r2.setAttribute("y", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) ) );
                        r2.setAttribute("height", ((mydata[y][x]/columnbase)*100)*heightmultiplier*(100/max_value_on_scale));
                        r2.setAttribute("fill", colorset[y]);
                        svg.appendChild(r2);                 
                    
                    if (bColumn_Borders==true)
                    {
                        //   BORDERS AROUND THE COLUMNS
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", 50+(barwidth*nextpos)+(barposition));
                            lr1.setAttribute("x2", 50+(barwidth*nextpos)+(barposition)+barwidth-barmargin);
                            lr1.setAttribute("y1", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) ) );
                            lr1.setAttribute("y2", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) ) );
                            lr1.setAttribute("stroke", "#000000");
                            lr1.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1);      
                        var lr1a =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1a.setAttribute("x1", 50+(barwidth*nextpos)+(barposition));
                            lr1a.setAttribute("x2", 50+(barwidth*nextpos)+(barposition));
                            lr1a.setAttribute("y1", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) ) );
                            lr1a.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1a.setAttribute("stroke", "#000000");
                            lr1a.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1a);      
                        var lr1ab =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1ab.setAttribute("x1", 50+(barwidth*nextpos)+(barposition)+barwidth-barmargin);
                            lr1ab.setAttribute("x2", 50+(barwidth*nextpos)+(barposition)+barwidth-barmargin);
                            lr1ab.setAttribute("y1", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) ) );
                            lr1ab.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1ab.setAttribute("stroke", "#000000"); 
                            lr1ab.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1ab);      
                    }                                  

                    // ADDING THE VALUES TO THE BARS
                    var t1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                        t1.setAttribute("x", 50+(barwidth*nextpos)+(barposition));
                        t1.setAttribute("y", 50+(100*heightmultiplier-  (((mydata[y][x]+accumheight)/columnbase)*100*heightmultiplier*(100/max_value_on_scale)) )+10 );
                        t1.setAttribute("fill", "#333");
                        t1.setAttribute("style", "font: 'Arial' 6px");
                        if (barwidth > 40) { t1.setAttribute("class","tcc_values_2");    } 
                        if (barwidth > 30) { t1.setAttribute("class","tcc_values_1");  } 
                        if (barwidth <= 30) { t1.setAttribute("class","tcc_values"); }
                        t1.textContent = valueformat.replace("%d", mydata[y][x]).replace("[[value]]", mydata[y][x]).replace("[value]", mydata[y][x]); //mydata[y][x] + percentage_suffix;
                        svg.appendChild(t1);

                accumheight=accumheight+  mydata[y][x];   
                }            
                   
                // TICK MARKS
                if (bHideTickMarks== false)
                {
                    var t2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                        t2.setAttribute("x1", 50+(barwidth*x*items.length));
                        t2.setAttribute("x2", 50+(barwidth*x*items.length));
                        t2.setAttribute("y1", 50+((20*heightmultiplier)*5));
                        t2.setAttribute("y2", 50+((20*heightmultiplier)*5)+5);  
                        t2.setAttribute("stroke", "#222");  
                        svg.appendChild(t2);  
                }
                var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    ipt1.setAttribute("x", 50+(barwidth*x*items.length)+10);
                    ipt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20);
                    ipt1.setAttribute("fill", "#333");
                    //ipt1.setAttribute("class","values");
                    if (barwidth < 30)
                    {
                        ipt1.setAttribute("class","tcc_values");
                    } else
                    {
                        ipt1.setAttribute("class","tcc_values_1");
                    }
                    
		        var nextitempt=myitempts[x].split("\n");
		       // alert(myitempts[x]+" " +myitempts[x].length + "  " +barwidth+" " + items.length);
	            for (z=0;z<nextitempt.length;z++)
			    {
			        if (nextitempt[z].length*5 < (barwidth*items.length))
			        {
                    		var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    		    if (myitempts[x].length*5 < (barwidth*items.length))
                    		    {
                        		    iptxt1.setAttribute("x", 50+(barwidth*x*items.length)+(barwidth*items.length)/2-(myitempts[x].length/2)*7);
                        		}
                        		else
                        		{
                        		    iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		}
                        		iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z));
                        		iptxt1.setAttribute("fill", "#333");
                        		iptxt1.setAttribute("class","values");
                        		iptxt1.textContent=nextitempt[z];
                        		ipt1.appendChild(iptxt1);
                     } else
                     {
                        var nextitempt2=nextitempt[z].split(" ");
                        var nextitemptstg="";
                        var nextitemptstgpre="";
                        var ictr=0;
                        for (z2=0;z2< nextitempt2.length; z2++)
                        {
                            if (nextitemptstgpre=="") { nextitemptstgpre = nextitempt2[z2]; } else { nextitemptstgpre=nextitemptstgpre+" "+nextitempt2[z2]; }
                            
                            if ((nextitemptstgpre.length*5) > (barwidth*items.length))
                            {
                    		    var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                        		    iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		    iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z+(10*ictr)));
                        		    iptxt1.setAttribute("fill", "#333");
                        		    iptxt1.setAttribute("class","values");
                        		    iptxt1.textContent=nextitemptstg;
                        		    ipt1.appendChild(iptxt1);
                        	    nextitemptstgpre= nextitempt2[z2];
                        	    ictr=ictr+1;
                            }
                            nextitemptstg=nextitemptstgpre;
                        }
                		    var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                        		    iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		    iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z+(10*ictr)));
                        		    iptxt1.setAttribute("fill", "#333");
                        		    iptxt1.setAttribute("class","values");
                        		    iptxt1.textContent=nextitemptstg;
                        		    ipt1.appendChild(iptxt1);
                        	    nextitemptstgpre= nextitempt2[z2];
                     }
			    }
                   // ipt1.textContent=myitempts[x];
                 svg.appendChild(ipt1);       
           }
   
    
    //---------------  ADDING THE LINES -------------------------------------//
    if (mylinedata != null)
    {
        if (mylinedata.length > 0)
        {
            linewidth=mydata.length*barwidth;
            for (x=0; x < mylinedata[0].length; x++)
            {
                if (x < mylinedata[0].length-1)
                {
                    for (y=0; y< mylinedata.length; y++)
                    {
                        var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                        mld2.setAttribute("x1", 50+(linewidth/2)+(linewidth*x));
                        mld2.setAttribute("x2", 50+(linewidth/2)+(linewidth*(x+1)));
                        mld2.setAttribute("y1", 50+(100*heightmultiplier- mylinedata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                        mld2.setAttribute("y2", 50+(100*heightmultiplier- mylinedata[y][x+1]*heightmultiplier*(100/max_value_on_scale)));  
                        mld2.setAttribute("stroke", linecolors[y]);  
                        mld2.setAttribute("stroke-width", "2");
                        svg.appendChild(mld2);  
                    }
                }
            }    
        }
    }
    
    //---------------  ADDING THE LEGEND -------------------------------------//
    if (bShowLegend)
    {
        for (x=0;x < items.length;x++)
        {
            var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                lr1.setAttribute("x", chartwidth+5);
                lr1.setAttribute("width", 10);
                lr1.setAttribute("y", 50+(x*15));
                lr1.setAttribute("height", 10);
                lr1.setAttribute("fill", colorset[x]);
                svg.appendChild(lr1);
            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", chartwidth+20);
                lt1.setAttribute("y", 50+(x*15)+10);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","legendtext");
               
                lt1.textContent=items[x];
                svg.appendChild(lt1);                
         }
        if (mylinedata != null)
        {
            if (mylinedata.length > 0)
            {
                for (x=0;x < lineitems.length;x++)
                {
                    var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        lr1.setAttribute("x", chartwidth+5);
                        lr1.setAttribute("width", 10);
                        lr1.setAttribute("y", 50+(items.length*15)+(x*15));
                        lr1.setAttribute("height", 10);
                        lr1.setAttribute("fill", linecolors[x]);
                        svg.appendChild(lr1);
                    var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                        lt1.setAttribute("x", chartwidth+20);
                        lt1.setAttribute("y", 50+(items.length*15)+(x*15)+10);
                        lt1.setAttribute("fill", "#333");
                        lt1.setAttribute("class","legendtext");
                       
                        lt1.textContent=lineitems[x];
                        svg.appendChild(lt1);                
                 }
             }
         }
    }
    document.getElementById(div_id).appendChild(svg);
}
  //------------------------------ END FUNCTION BUILD STACKED CHART---------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------//







//----------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------- BUILD A COLUMN CHART -----------------------------------------------------//
function build_column_chart(div_id, svgwidth, svgheight, items, lineitems, myitempts, mydata, mylinedata, colorset, linecolors, bShowLegend, bShowScales, bSingleDimensionArray,
chart_label,chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, barmargin, bShowBackground, valueformat, bColumn_Borders, bShadeBorders, bHideTickMarks,
static_max_value_on_scale,static_number_of_ticks)
{

    var NS="http://www.w3.org/2000/svg";     
    var svg=document.createElementNS(NS,"svg");

    bHorizontalLines=bShowScales;
        
    var chartwidth=svgwidth;
    var chartheight=svgheight-50;

    var max_value_on_scale = 100;
    percentage_suffix="%";
    if (static_max_value_on_scale > 0)
    {
       max_value_on_scale=static_max_value_on_scale;
    }

    if ((bIsPercent==false)&& (static_max_value_on_scale<0))
    {
	    max_value_on_scale=0;	   
	    max_value_on_scale=calculate_mylinedata(max_value_on_scale,mydata);
    }
    if (bIsPercent==false) {  percentage_suffix=""; } 

    if (bShowLegend) { chartwidth=chartwidth-200; }

    svg.setAttribute("width",svgwidth);
    svg.setAttribute("height",svgheight);

    barwidth=(chartwidth-80)/(mydata.length*mydata[0].length);
    
    heightmultiplier=chartheight/200;

    //--------------- CHART LABELS -------------------------------------//
        // LABEL ON TOP
    if (chart_label_position=="top")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {
            var cl1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl1.setAttribute("y", 25+(15*i));
                cl1.setAttribute("x", 50);
                cl1.setAttribute("fill", "#333");
                cl1.setAttribute("class",chart_label_class);
                cl1.textContent=chart_label_text_array[i];
                svg.appendChild(cl1);
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl2.setAttribute("y",  chartheight-40+(15*i));
                    cl2.setAttribute("x",  50);
                    cl2.setAttribute("fill", "#333");
                    cl2.setAttribute("class",chart_label_class);
                    cl2.textContent=chart_label_text_array[i];
                    svg.appendChild(cl2);
            }
    }      
    
    
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl2.setAttribute("y", chartheight-20+vpos);
                cl2.setAttribute("x", 50);
                cl2.setAttribute("fill", "#333");
                cl2.setAttribute("class",footnotes_class);
                cl2.textContent=afootnotes[f];
                svg.appendChild(cl2);
            vpos+=9;
        }
    }
    // BACKGROUND
    if (bShowBackground == true)
    {
        var bkgrd =document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bkgrd.setAttribute("x", 50);
            bkgrd.setAttribute("width", chartwidth-80);
            bkgrd.setAttribute("y", 50);
//            bkgrd.setAttribute("height", chartheight-150);
//            bkgrd.setAttribute("height", max_value_on_scale*heightmultiplier);
            bkgrd.setAttribute("height", 100*heightmultiplier);
            bkgrd.setAttribute("fill", tcc_background_color);//"#efefff");
            svg.appendChild(bkgrd);
    }
    //---------------  HORIZONTAL LINES -------------------------------------//
    if (bHorizontalLines)
    {
        tickcounter=5;//2;//10;//
        if (static_number_of_ticks > 0) { tickcounter=static_number_of_ticks; }
        
//        tickcount=max_value_on_scale/tickcounter;//50;//10;//
        tickcount=100/tickcounter; // 100 IS THE MAX NUMBER - 100%
        tickcountvalue = max_value_on_scale / tickcounter;
    
        for (x=0; x < tickcounter; x++)  //   for (x=0; x < 10; x++)   -- for every 10 points
        {
            var l1=document.createElementNS("http://www.w3.org/2000/svg", "line");
                l1.setAttribute("x1", 45);
                l1.setAttribute("x2", chartwidth-30);
                l1.setAttribute("y1", 50+((tickcount*heightmultiplier)*x));//   l1.setAttribute("y1", 50+((10*heightmultiplier)*x))  -- for every 10 points
                l1.setAttribute("y2", 50+((tickcount*heightmultiplier)*x)); //  l1.setAttribute("y2", 50+((10*heightmultiplier)*x))
                l1.setAttribute("stroke", tcc_line_color);  // style="stroke:red;stroke-width:2"
                l1.setAttribute("stroke-width", ".1");
                l1.setAttribute("stroke-linecap", "round");
                svg.appendChild(l1);  

            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", 25);
                lt1.setAttribute("y", 50+((tickcount*heightmultiplier)*x)+5);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","values");
               
                lt1.textContent=tickcountvalue*(tickcounter-x)+percentage_suffix;
                svg.appendChild(lt1);
        }
    }
    
    //---------------  ADDING THE COLUMN BARS -------------------------------------//
       for (x=0; x < mydata[0].length; x++)
        {
                for (y=0;y < items.length; y++)
                {
                    nextpos=(x*items.length)+y;
                    
                    var r1 =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        r1.setAttribute("x", 50+(barwidth*nextpos));
                        r1.setAttribute("width", barwidth-barmargin);
                        r1.setAttribute("y", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                        r1.setAttribute("height", mydata[y][x]*heightmultiplier*(100/max_value_on_scale));
                        r1.setAttribute("fill", colorset[y]);
                        svg.appendChild(r1);     
                    
                    
                    if (bColumn_Borders==true)
                    {
                        //   BORDERS AROUND THE COLUMNS
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", 50+(barwidth*nextpos));
                            lr1.setAttribute("x2", 50+(barwidth*nextpos)+barwidth-barmargin);
                            lr1.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                            lr1.setAttribute("y2", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                            lr1.setAttribute("stroke", "#000000");
                            lr1.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1);      
                        var lr1a =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1a.setAttribute("x1", 50+(barwidth*nextpos));
                            lr1a.setAttribute("x2", 50+(barwidth*nextpos));
                            lr1a.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                            lr1a.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1a.setAttribute("stroke", "#000000");
                            lr1a.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1a);      
                        var lr1ab =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1ab.setAttribute("x1", 50+(barwidth*nextpos)+barwidth-barmargin);
                            lr1ab.setAttribute("x2", 50+(barwidth*nextpos)+barwidth-barmargin);
                            lr1ab.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                            lr1ab.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1ab.setAttribute("stroke", "#000000"); 
                            lr1ab.setAttribute("stroke-width", ".5");
                            svg.appendChild(lr1ab);      
                    }                                  

            //-------------------SHADING THE BORDERS
            if (bShadeBorders == true)
            {
                 next_item_val=0;
                 if (y+1 < mydata.length)
                 {
                     next_item_val= mydata[y+1][x];                 
                 }
                  else
                 {
                    if (x+1 <= items[0].length)
                    {
                          next_item_val=mydata[0][x+1];                   
                    }
                 }
                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barwidth > 25) { shadectr=3; }
                 if (barwidth > 35) { shadectr=4; }
                 if (barwidth > 45) { shadectr=5; }
                 if (barwidth > 55) { shadectr=6; }
                 if (barwidth > 65) { shadectr=7; }
                 origshadectr=shadectr;

                 while ((shadectr > 0)&&
                           (
                            (50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr )<
                            (50+(100*heightmultiplier))  
                       ))
                 {                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", 50+(barwidth*nextpos)+shadectr);
                            lr1.setAttribute("x2", 50+(barwidth*nextpos)+barwidth-barmargin-shadectr);
                            lr1.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr );
                            lr1.setAttribute("y2", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr );
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", "1");
                            svg.appendChild(lr1);   
                        shadecolor=shade(shadecolor,"l");
                        if (origshadectr > 4) { shadecolor=shade(shadecolor,"l"); }
                        shadectr=shadectr-1;
                 }   


                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barwidth > 25) { shadectr=3; }
                 if (barwidth > 35) { shadectr=4; }
                 if (barwidth > 45) { shadectr=5; }
                 if (barwidth > 55) { shadectr=6; }
                 if (barwidth > 65) { shadectr=7; }
                 origshadectr=shadectr;
                 if (shadectr < 4) {shadecolor=shade(colorset[y],"l"); }

                 while  ((shadectr > 0)&&
                           (
                            (50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr )<
                            (50+(100*heightmultiplier))  
                       ))
                 {                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", 50+(barwidth*nextpos)+shadectr);
                            lr1.setAttribute("x2", 50+(barwidth*nextpos)+shadectr);
                            lr1.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr);
                            lr1.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", "d");
                            svg.appendChild(lr1);   
                        shadecolor=shade(shadecolor,"d");
                    //    if (origshadectr > 4) { shadecolor=shade(shadecolor,"l"); }
                        shadectr=shadectr-1;
                 }  


                 shade_darker_or_lighter="l"
                 if ((next_item_val >= mydata[y][x])&&(barmargin<3)) { shade_darker_or_lighter="d"; }
                 shadecolor=shade(colorset[y],"l");
                 shadectr=2;
                 if (barwidth > 25) { shadectr=3; }
                 if (barwidth > 35) { shadectr=4; }
                 if (barwidth > 45) { shadectr=5; }
                 if (barwidth > 55) { shadectr=6; }
                 if (barwidth > 65) { shadectr=7; }
                 origshadectr=shadectr;
                 if (shadectr < 4) {shadecolor=shade(colorset[y],shade_darker_or_lighter); }
                 while  ((shadectr > 0)&&
                           (
                            (50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr )<
                            (50+(100*heightmultiplier))  
                       ))
                 {                  
                        var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                            lr1.setAttribute("x1", 50+(barwidth*nextpos)+barwidth-barmargin-shadectr);
                            lr1.setAttribute("x2", 50+(barwidth*nextpos)+barwidth-barmargin-shadectr);
                            lr1.setAttribute("y1", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))+shadectr);
                            lr1.setAttribute("y2", 50+(100*heightmultiplier));
                            lr1.setAttribute("stroke", shadecolor);
                            lr1.setAttribute("stroke-width", shade_darker_or_lighter);
                            svg.appendChild(lr1);  
                            shadecolor=shade(shadecolor,shade_darker_or_lighter);
                            //    if (origshadectr > 4) { shadecolor=shade(shadecolor,"l"); }
                            shadectr=shadectr-1;
                 }  
                 if  ((next_item_val <= mydata[y][x]) && (barmargin<3) && (next_item_val > 0))
                 {
                         
                         shadecolor=shade(colorset[y],"l");
                         shadectr=2;
                         if (barwidth > 25) { shadectr=3; }
                         if (barwidth > 35) { shadectr=4; }
                         if (barwidth > 45) { shadectr=5; }
                         if (barwidth > 55) { shadectr=6; }
                         if (barwidth > 65) { shadectr=7; }
                         origshadectr=shadectr;
                         if (shadectr < 4) {shadecolor=shade(colorset[y],"d"); }
                         while (shadectr >= 0)
                         {                  
                                var lr1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
                                    lr1.setAttribute("x1", 50+(barwidth*nextpos)+barwidth-barmargin-shadectr);
                                    lr1.setAttribute("x2", 50+(barwidth*nextpos)+barwidth-barmargin-shadectr);
                                    lr1.setAttribute("y1", 50+(100*heightmultiplier- next_item_val*heightmultiplier*(100/max_value_on_scale))+shadectr);
                                    lr1.setAttribute("y2", 50+(100*heightmultiplier));
                                    lr1.setAttribute("stroke", shadecolor);
                                    lr1.setAttribute("stroke-width", "d");
                                    svg.appendChild(lr1);  
                                    shadecolor=shade(shadecolor,"d");
                                    //    if (origshadectr > 4) { shadecolor=shade(shadecolor,"l"); }
                                    shadectr=shadectr-1;
                         }    
                 }
            }


                    // -----------ADDING THE VALUES TO THE BARS -------------------
                    var t1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                        //t1.setAttribute("x", 50+(barwidth*nextpos)+(barwidth/3));
                        t1.setAttribute("x", 50+(barwidth*nextpos)+(barwidth/2)-10);
                        t1.setAttribute("y", 50+(100*heightmultiplier- mydata[y][x]*heightmultiplier*(100/max_value_on_scale))-4);
                        t1.setAttribute("fill", "#333");
                        //t1.setAttribute("style", "font: 'Arial' 6px");
                       // t1.setAttribute("class","values");
                        if (barwidth > 40) { t1.setAttribute("class","tcc_values_2");    } 
                        if (barwidth > 30) { t1.setAttribute("class","tcc_values_1");  } 
                        if (barwidth <= 30) { t1.setAttribute("class","tcc_values"); }
                        t1.textContent = valueformat.replace("%d", mydata[y][x]).replace("[[value]]", mydata[y][x]).replace("[value]", mydata[y][x]); //mydata[y][x] + percentage_suffix;
                        svg.appendChild(t1);
                }            

                // TICK MARKS
                if (bHideTickMarks== false)
                {
                    var t2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                        t2.setAttribute("x1", 50+(barwidth*x*items.length));
                        t2.setAttribute("x2", 50+(barwidth*x*items.length));
                        t2.setAttribute("y1", 50+((20*heightmultiplier)*5));
                        t2.setAttribute("y2", 50+((20*heightmultiplier)*5)+5);  
                        t2.setAttribute("stroke", tcc_line_color);  
                        svg.appendChild(t2);  
                }
                var ipt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    ipt1.setAttribute("fill", "#333");
                    if (vertical_text == true)
                    {
                        xpos=50+(barwidth*x*items.length)+10;
                    	ypos=50+((20*heightmultiplier)*5)+20;
                        ipt1.setAttribute("transform","translate("+xpos+","+ypos+")rotate(90)");
                        ipt1.textContent=myitempts[x];
                    } else
                    {
                        ipt1.setAttribute("x", 50+(barwidth*x*items.length)+10);
                        ipt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20);                    
                    }
                    if (barwidth > 40) { ipt1.setAttribute("class","tcc_values_2");    } 
                    if (barwidth > 30) { ipt1.setAttribute("class","tcc_values_1");  } 
                    if (barwidth <= 30) { ipt1.setAttribute("class","tcc_values"); }


		        var nextitempt=myitempts[x].split("\n");
		       // alert(myitempts[x]+" " +myitempts[x].length + "  " +barwidth+" " + items.length);
		        if (vertical_text == false)
		        {
		            ///------------------- WRITING THE TEXT POINTS UNDER THER CHART
	                for (z=0;z<nextitempt.length;z++)
			        {
			            if (nextitempt[z].length*7 < (barwidth*items.length))
			            {
                    		    var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    		        if (myitempts[x].length*5 < (barwidth*items.length))
                    		            {
                    		                if ( ((barwidth*items.length)/2) > ((myitempts[x].length/2)*7))
                    		                {
                        		                iptxt1.setAttribute("x", 50+(barwidth*x*items.length)+barmargin+(barwidth*items.length)/2-(myitempts[x].length/2)*7);
                        		            } else
                        		            {
                        		                iptxt1.setAttribute("x", 50+(barwidth*x*items.length)+barmargin+(barwidth*items.length)/2-(myitempts[x].length/2)*7);
                        		            }
                        		        }
                        		        else
                        		        {
                        		            iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		        }
                        		    iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z));
  
                    			    iptxt1.setAttribute("fill", "#333");		
                        		    if (barwidth > 40) { iptxt1.setAttribute("class","tcc_values_2");    } 
                                    if (barwidth > 30) { iptxt1.setAttribute("class","tcc_values_1");  } 
                                    if (barwidth <= 30) { iptxt1.setAttribute("class","tcc_values"); }
                        		    iptxt1.textContent=nextitempt[z];
                        		    ipt1.appendChild(iptxt1);
                         } else
                         {
                            var nextitempt2=nextitempt[z].split(" ");
                            var nextitemptstg="";
                            var nextitemptstgpre="";
                            var ictr=0;
                            for (z2=0;z2< nextitempt2.length; z2++)
                            {
                                if (nextitemptstgpre=="") { nextitemptstgpre = nextitempt2[z2]; } else { nextitemptstgpre=nextitemptstgpre+" "+nextitempt2[z2]; }
                                
                                if ((nextitemptstgpre.length*5) > (barwidth*items.length))
                                {
                    		        var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                        		        iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		        iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z+(10*ictr)));
                        		        iptxt1.setAttribute("fill", "#333");
    //					                if (vertical_text == true)
    //                    			    {
    //                    			        ////iptxt1.setAttribute("transform","rotate(30 50,40)");
    //                        			    iptxt1.setAttribute("style","writing-mode: tb;");
    //                    			    }			
                        		        if (barwidth > 40) { iptxt1.setAttribute("class","tcc_values_2");    } 
                                        if (barwidth > 30) { iptxt1.setAttribute("class","tcc_values_1");  } 
                                        if (barwidth <= 30) { iptxt1.setAttribute("class","tcc_values"); }
                        		        iptxt1.textContent=nextitemptstg;
                        		        ipt1.appendChild(iptxt1);
                        	        nextitemptstgpre= nextitempt2[z2];
                        	        ictr=ictr+1;
                                }
                                nextitemptstg=nextitemptstgpre;
                            }
                		        var iptxt1=document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                        		        iptxt1.setAttribute("x", 50+(barwidth*x*items.length) );
                        		        iptxt1.setAttribute("y", 50+((20*heightmultiplier)*5)+20+(10*z+(10*ictr)));
                        		        iptxt1.setAttribute("fill", "#333");
                        		        if (barwidth > 40) { iptxt1.setAttribute("class","tcc_values_2");    } 
                                        if (barwidth > 30) { iptxt1.setAttribute("class","tcc_values_1");  } 
                                        if (barwidth <= 30) { iptxt1.setAttribute("class","tcc_values"); }
                        		        iptxt1.textContent=nextitemptstg;
                        		        ipt1.appendChild(iptxt1);
                        	        nextitemptstgpre= nextitempt2[z2];
                         }
			        }
			    }
                   // ipt1.textContent=myitempts[x];
                 svg.appendChild(ipt1);       
           }
   
    
    //---------------  ADDING THE LINES -------------------------------------//
    if (mylinedata != null)
    {
        if (mylinedata.length > 0)
        {
            linewidth=mydata.length*barwidth;
            for (x=0; x < mylinedata[0].length; x++)
            {
                if (x < mylinedata[0].length-1)
                {
                    for (y=0; y< mylinedata.length; y++)
                    {
                        var mld2 =document.createElementNS("http://www.w3.org/2000/svg", "line");
                        mld2.setAttribute("x1", 50+(linewidth/2)+(linewidth*x));
                        mld2.setAttribute("x2", 50+(linewidth/2)+(linewidth*(x+1)));
                        mld2.setAttribute("y1", 50+(100*heightmultiplier- mylinedata[y][x]*heightmultiplier*(100/max_value_on_scale)));
                        mld2.setAttribute("y2", 50+(100*heightmultiplier- mylinedata[y][x+1]*heightmultiplier*(100/max_value_on_scale)));  
                        mld2.setAttribute("stroke", linecolors[y]);  
                        mld2.setAttribute("stroke-width", "2");
                        svg.appendChild(mld2);  
                    }
                }
            }    
        }
    }
    
    //---------------  ADDING THE LEGEND -------------------------------------//
    if (bShowLegend)
    {
        for (x=0;x < items.length;x++)
        {
            var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                lr1.setAttribute("x", chartwidth+5);
                lr1.setAttribute("width", 10);
                lr1.setAttribute("y", 50+(x*15));
                lr1.setAttribute("height", 10);
                lr1.setAttribute("fill", colorset[x]);
                svg.appendChild(lr1);
            var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                lt1.setAttribute("x", chartwidth+20);
                lt1.setAttribute("y", 50+(x*15)+10);
                lt1.setAttribute("fill", "#333");
                lt1.setAttribute("class","legendtext");
               
                lt1.textContent=items[x];
                svg.appendChild(lt1);                
         }
        if (mylinedata != null)
        {
            if (mylinedata.length > 0)
            {
                for (x=0;x < lineitems.length;x++)
                {
                    var lr1 =document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        lr1.setAttribute("x", chartwidth+5);
                        lr1.setAttribute("width", 10);
                        lr1.setAttribute("y", 50+(items.length*15)+(x*15));
                        lr1.setAttribute("height", 10);
                        lr1.setAttribute("fill", linecolors[x]);
                        svg.appendChild(lr1);
                    var lt1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                        lt1.setAttribute("x", chartwidth+20);
                        lt1.setAttribute("y", 50+(items.length*15)+(x*15)+10);
                        lt1.setAttribute("fill", "#333");
                        lt1.setAttribute("class","legendtext");
                       
                        lt1.textContent=lineitems[x];
                        svg.appendChild(lt1);                
                 }
             }
         }
    }
    document.getElementById(div_id).appendChild(svg);
}
 //------------------------------ END FUNCTION BUILD COLUMN CHART---------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------//
















function build_pie_chart(div_id, svgwidth, svgheight, myitems, myitempts, mydatainput, colors, bShowLegend, bShowScales,
chart_label, chart_label_class, chart_label_position,footnotes,footnotes_class, bIsPercent, bShowBackground, valueformat) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", svgwidth);
    svg.setAttribute("height", svgheight);
   // alert(mydatainput);
   

    mydatavalues = Array(mydatainput[0].length);
    for (x=0; x < mydatavalues.length;x++)
    {
        mydatavalues[x]=mydatainput[0][x];
    }


    bHorizontalLines = bShowScales;

    var chartwidth = svgwidth;
    var chartheight =svgheight;

    if (bShowLegend) { chartwidth = chartwidth - 50; }
    if (chartheight != chartwidth) { chartheight = chartwidth; }

    var max_value_on_scale = 100;
    percentage_suffix = "%";

    if (bIsPercent == false) {
        percentage_suffix = "";
    //    max_value_on_scale = calculate_mylinedata(max_value_on_scale, mylinedata);
    }
    heightmultiplier = 1.5;
 //   linewidth = (chartwidth) / mylinedata[0].length;

    //--------------- CHART LABELS -------------------------------------//
    // LABEL ON TOP
    if (chart_label_position=="top")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {
                var cl1 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl1.setAttribute("y", 25+(15*i));
                    cl1.setAttribute("x", 50);
                    cl1.setAttribute("fill", "#333");
                    cl1.setAttribute("class",chart_label_class);
                    cl1.textContent=chart_label_text_array[i];
                    svg.appendChild(cl1);
            }
    }
    // LABEL ON BOTTOM
    if (chart_label_position=="bottom")
    {
            chart_label_text_array=chart_label.split("[CR]");
            for (i=0;i<chart_label_text_array.length; i++)
            {    
                var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cl2.setAttribute("y",  chartheight + 25+(15*i));
                    cl2.setAttribute("x",  50);
                    cl2.setAttribute("fill", "#333");
                    cl2.setAttribute("class",chart_label_class);
                    cl2.textContent=chart_label_text_array[i];
                    svg.appendChild(cl2);
            }
    }      
    // FOOTNOTES
    if (footnotes!="")
    {
        afootnotes=footnotes.split("\n");       
        vpos=0;
        for (f=0; f < afootnotes.length; f++)
        {
            var cl2 =  document.createElementNS("http://www.w3.org/2000/svg", "text");
                cl2.setAttribute("y", chartheight-20+vpos);
                cl2.setAttribute("x", 50);
                cl2.setAttribute("fill", "#333");
                cl2.setAttribute("class",footnotes_class);
                cl2.textContent=afootnotes[f];
                svg.appendChild(cl2);
            vpos+=9;
        }
    }   
    // BACKGROUND
    if (bShowBackground == true)
    {
        var bkgrd = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bkgrd.setAttribute("x", 50);
        bkgrd.setAttribute("width", chartwidth);
        bkgrd.setAttribute("y", 50);
        bkgrd.setAttribute("height", chartheight);
        bkgrd.setAttribute("fill", tcc_background_color);
        svg.appendChild(bkgrd);
    }
    
    //ADD THE CIRCLE
    //recalculate mydata
    var total = 0;

    var circle_multiplier = 1;
    for (y = 0; y < mydatavalues.length; y++) {
        total = total + mydatavalues[y];
    }
    var mydata = Array(mydatavalues.length);
    for (x = 0; x < mydatavalues.length; x++) {
        mydata[x] = (mydatavalues[x] / total) * 360;
    }


    var my_center = { "x": chartwidth/2, "y": chartheight/2 };  // M
    var my_radius = my_center.x*2/3;  // A

    var next_x_point = 0;
    var next_y_point = 0;

    var my_running_line = { "x": 0, "y": 0 }; // start at the starting line
    my_running_line.x = my_center.x;
    my_running_line.y = my_center.y - my_radius;

    var next_angle = 0; // sin,cos 0.01745240643728351 0.9998476951563913
    var running_angle = 0; // cummulative angle
    var next_sin = 0;
    var next_cos = 0;


    // IF THERE ARE ANY ANGLES > 180degrees, it just makes a circle
    for (x = 0; x < mydata.length; x++) {
        next_angle = mydata[x];
        next_color = colors[x];
        if (next_angle > 180) {
            var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circ.setAttribute("cx", my_center.x);
            circ.setAttribute("cy", my_center.y);
            circ.setAttribute("r", my_radius);
            circ.setAttribute("stroke", "black");
            circ.setAttribute("stroke-width", 1);
            circ.setAttribute("fill", next_color);
            svg.appendChild(circ);

            next_sin = Math.sin((running_angle + next_angle) * Math.PI / 180);
            next_cos = Math.cos((running_angle + next_angle) * Math.PI / 180);
            next_x_point = my_center.x + (next_sin * my_radius);
            next_y_point = my_center.y - (next_cos * my_radius);

            next_text_sin = Math.sin((running_angle + (next_angle / 2)) * Math.PI / 180);
            next_text_cos = Math.cos((running_angle + (next_angle / 2)) * Math.PI / 180);
            next_text_x_point = my_center.x + (next_text_sin * (my_radius / 2));
            next_text_y_point = my_center.y - (next_text_cos * (my_radius / 2));

            var lt1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            lt1.setAttribute("x", next_text_x_point);
            lt1.setAttribute("y", next_text_y_point);
            lt1.setAttribute("fill", "#fff");
            lt1.setAttribute("class", "circlevalues");
            lt1.textContent = valueformat.replace("%d", mydatavalues[x]).replace("[[value]]", mydatavalues[x]).replace("[value]", mydatavalues[x]); // mydatavalues[x] + percentage_suffix;
            svg.appendChild(lt1);

            running_angle = next_angle;
            my_running_line.x = next_x_point;
            my_running_line.y = next_y_point;
        }
    }

    // LOOPS THE ANGLES SMALLER THAN OR EQUAL TO 180 DEGREES
    for (x = 0; x < mydata.length; x++) {
        next_angle = mydata[x];
        next_color = colors[x];
        if (next_angle <= 180) {
            running_angle = running_angle + next_angle;
            next_sin = Math.sin(running_angle * Math.PI / 180);
            next_cos = Math.cos(running_angle * Math.PI / 180);
            next_x_point = my_center.x + (next_sin * my_radius);
            next_y_point = my_center.y - (next_cos * my_radius);

            next_text_sin = Math.sin((running_angle - (next_angle / 2)) * Math.PI / 180);
            next_text_cos = Math.cos((running_angle - (next_angle / 2)) * Math.PI / 180);
            next_text_x_point = my_center.x + (next_text_sin * (my_radius / 2));
            next_text_y_point = my_center.y - (next_text_cos * (my_radius / 2));

            var next_d = "M" + my_center.x + "," + my_center.y + " L" + my_running_line.x + "," + my_running_line.y + " A" + my_radius + "," + my_radius + "  0 0,1 " + next_x_point + "," + next_y_point + " z";
            //alert(next_d);
            var next_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            next_path.setAttribute("d", next_d);
            next_path.setAttribute("stroke", "black");
            next_path.setAttribute("stroke-width", 1);
            next_path.setAttribute("fill", next_color);
            svg.appendChild(next_path);

            var lt1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            lt1.setAttribute("x", next_text_x_point);
            lt1.setAttribute("y", next_text_y_point);
            lt1.setAttribute("fill", "#fff");
            lt1.setAttribute("class", "circlevalues");
           // lt1.setAttribute("font-size", "20");
            lt1.textContent = valueformat.replace("%d", mydatavalues[x]).replace("[[value]]", mydatavalues[x]).replace("[value]", mydatavalues[x]); // mydatavalues[x]+percentage_suffix;
            svg.appendChild(lt1);
            my_running_line.x = next_x_point;
            my_running_line.y = next_y_point;
        }


    }

    //--------------- ADD THE LEGEND -------------------------------------//
    if (bShowLegend) {
        for (x = 0; x < myitems.length; x++) {
            var lr1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            lr1.setAttribute("x", chartwidth-15);
            lr1.setAttribute("width", 10);
            lr1.setAttribute("y", 50 + (x * 15));
            lr1.setAttribute("height", 10);
            lr1.setAttribute("fill", colors[x]);
            svg.appendChild(lr1);
            var lt1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            lt1.setAttribute("x", chartwidth);
            lt1.setAttribute("y", 50 + (x * 15) + 10);
            lt1.setAttribute("fill", "#333");
            lt1.setAttribute("class", "legendtext");

            lt1.textContent = myitems[x];
            svg.appendChild(lt1);
        }
    }

    document.getElementById(div_id).appendChild(svg);

}  //------------------------------ END FUNCTION BUILD PIE CHART---------------------------------------------------//









function calculate_mylinedata(max_value_on_scale,mylinedata)
{
	    for (x=0; x < mylinedata[0].length; x++)
	    {
	 	for (y=0; y< mylinedata.length; y++)
	        {
			if(max_value_on_scale<mylinedata[y][x])
			{
				max_value_on_scale=mylinedata[y][x];
			}
		}
	    }
	if(parseInt(max_value_on_scale)<=100)
	{
		if(parseInt(max_value_on_scale)<100)
		{
		    if (parseInt(max_value_on_scale)<20)
		    {
			    max_value_on_scale=parseInt(max_value_on_scale)+5;		    
		    } else
		    {
			    max_value_on_scale=parseInt(max_value_on_scale/20)*20+20;
			}
		}
	} else
	{
		if(parseInt(max_value_on_scale)<10000)
		{
			max_value_on_scale=parseInt(max_value_on_scale/200)*200+200;
		}
	}
	return max_value_on_scale;
}


function shade(ncolor,dir)
{
    if (ncolor.indexOf("#")>=0)
    {
	if (dir=="d")
	{
		while  (ncolor.indexOf("1")>=0){ncolor=ncolor.replace("1","0");}
		while  (ncolor.indexOf("2")>=0){ncolor=ncolor.replace("2","1");}
		while  (ncolor.indexOf("3")>=0){ncolor=ncolor.replace("3","2");}
		while  (ncolor.indexOf("4")>=0){ncolor=ncolor.replace("4","3");}
		while  (ncolor.indexOf("5")>=0){ncolor=ncolor.replace("5","4");}
		while  (ncolor.indexOf("6")>=0){ncolor=ncolor.replace("6","5");}
		while  (ncolor.indexOf("7")>=0){ncolor=ncolor.replace("7","6");}
		while  (ncolor.indexOf("8")>=0){ncolor=ncolor.replace("8","7");}
		while  (ncolor.indexOf("9")>=0){ncolor=ncolor.replace("9","8");}
		while  (ncolor.indexOf("a")>=0){ncolor=ncolor.replace("a","9");}
		while  (ncolor.indexOf("b")>=0){ncolor=ncolor.replace("b","a");}
		while  (ncolor.indexOf("c")>=0){ncolor=ncolor.replace("c","b");}
		while  (ncolor.indexOf("d")>=0){ncolor=ncolor.replace("d","c");}
		while  (ncolor.indexOf("e")>=0){ncolor=ncolor.replace("e","d");}
		while  (ncolor.indexOf("f")>=0){ncolor=ncolor.replace("f","e");}
	}	
	else
	{
		while  (ncolor.indexOf("e")>=0){ncolor=ncolor.replace("e","f");}
		while  (ncolor.indexOf("d")>=0){ncolor=ncolor.replace("d","e");}
		while  (ncolor.indexOf("c")>=0){ncolor=ncolor.replace("c","d");}
		while  (ncolor.indexOf("b")>=0){ncolor=ncolor.replace("b","c");}
		while  (ncolor.indexOf("a")>=0){ncolor=ncolor.replace("a","b");}
		while  (ncolor.indexOf("9")>=0){ncolor=ncolor.replace("9","a");}
		while  (ncolor.indexOf("8")>=0){ncolor=ncolor.replace("8","9");}
		while  (ncolor.indexOf("7")>=0){ncolor=ncolor.replace("7","8");}
		while  (ncolor.indexOf("6")>=0){ncolor=ncolor.replace("6","7");}
		while  (ncolor.indexOf("5")>=0){ncolor=ncolor.replace("5","6");}
		while  (ncolor.indexOf("4")>=0){ncolor=ncolor.replace("4","5");}
		while  (ncolor.indexOf("3")>=0){ncolor=ncolor.replace("3","4");}
		while  (ncolor.indexOf("2")>=0){ncolor=ncolor.replace("2","3");}
		while  (ncolor.indexOf("1")>=0){ncolor=ncolor.replace("1","2");}
	}
	}
return ncolor;
}	

function check_color(ncolor)
{
if (ncolor=="red") { ncolor="#ff0000";}
if (ncolor=="green") { ncolor="#00ff00";}
if (ncolor=="blue") { ncolor="#0000ff";}
if (ncolor=="yellow") { ncolor="#ffff00";}
if (ncolor=="grey") { ncolor="#cococo";}

return ncolor;
}


