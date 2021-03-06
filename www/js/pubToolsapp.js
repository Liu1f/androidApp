
var pubToolsParams_a = {};//全局变量json

//判断浏览器类型
function pubToolsIsImg(suffix) {
	
	 var arr = ["BMP","JPG","PNG","TIF","GIF","PCX","TGA","EXIF","FPX","SVG","PSD","CDR","PCD","DXF","UFO","EPS","AI","RAW","WMF","WEBP","bmp","jpg","png","tif","gif","pcx","tga","exif","fpx","svg","psd","cdr","pcd","dxf","ufo","eps","ai","raw","WMF","webp"];

   var n = arr.indexOf(suffix); 
   
   if(n>-1)
     return true;
     
   return false;
}


//判断浏览器类型
function pubToolsGetBrowserType() {

   var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
   var isOpera = userAgent.indexOf("Opera") > -1;
   if (isOpera) {
    return "Opera"
   }; //判断是否Opera浏览器
   
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器
  
  if (userAgent.indexOf("Trident") > -1) {
  	return "IE";
    //return "Edge";
  } //判断是否Edge浏览器
}

/**
   * 弹出数据导入页面。  
   * @ progId     导入程序代码ID，不可空。    
   * @ encodeStr  编码规则，可空。如果有树形编码需要校验，则传入编码规则
   * @return 
   */
function flyImport(progId,encodeStr){		
	
	 var url = "/fwis/mssl/flyImportPage?progId="+progId+"&encodeStr="+encodeStr;
	
	 openPopModalPage(url,0.1,0.05,0.8,0.8);
	 return;	
}
/**
   * 弹出数据导出页面。  
   * @ progId     导入程序代码ID，不可空。
   * @ encodeStr  编码规则，可空。如果有树形编码需要校验，则传入编码规则
   * @return 
   */
function flyExport1(progId){		
	
	 var url = "/fwis/mssl/flyExportPage?progId="+progId;
	
	 openPopPage(url,0.1,0.05,0.8,0.8);
	 return;	
}
/**
   * 列表标题选择框选择后，将列表所有条目全部选中，取消后，则全部取消。   
   * @para tableId  table的ID对象
   * @para obj      table标题行checkbox对象
   
   使用示例：<input name="" type="checkbox" value="" onclick="flyTableCheckboxSel('tableTitle',this);">
   * @return 
   */
function flyTableCheckboxSel(tableId,obj){
	
	var b = obj.checked;	
	
	var inputObj = document.getElementById(tableId).getElementsByTagName("input");	
	for(var i=0;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox")
		   inputObj[i].checked = b;
	}	
	
	return;
}
/**
   * 表单拖动。对一个表单添加拖动监听事件。     
   * @ obj 表单对象。
   * @return 
   */
function flyFormDragListener1(obj){
	
	
			obj.onmousedown = function(event){	   			        
   	         
   	         var event = event || window.event;
             
   	         obj.style.left = event.clientX - this.offsetLeft;
             obj.style.top = event.clientY - this.offsetTop;     
             
             //obj.style.left = (parseInt(event.clientX)-20) + "px" ;
             //obj.style.top = (parseInt(event.clientY)-20) + "px" ;   
           
             var x = event.clientX - this.offsetLeft; //当前鼠标点击处相对于popupfather所在位置x ， -150 是处理margin值
             var y = event.clientY - this.offsetTop; //当前鼠标点击处相对于popupfather所在位置y
      
             document.onmousemove = function(event){
             	
                 var event = event || window.event;//兼容ie浏览器
                 obj.style.left = event.clientX - x + "px";
                 obj.style.top = event.clientY- y + "px";                 
                
                 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
 
             } 
             document.onmouseup = function(event){
	
	               document.onmousemove = null;	
	           }
	    }   
}
/**
   * 表单拖动。对一个表单添加拖动监听事件。     
   * @ dragObj 表单点击拖动区域对象。
   * @ obj     表单对象。
   * @return 
   */
function flyFormDragListener(dragObj,obj){
	
	
			dragObj.onmousedown = function(event){	   			        
   	         
   	         var event = event || window.event;
             
   	         obj.style.left = event.clientX - obj.offsetLeft;
             obj.style.top = event.clientY - obj.offsetTop;     
             
             //obj.style.left = (parseInt(event.clientX)-20) + "px" ;
             //obj.style.top = (parseInt(event.clientY)-20) + "px" ;   
           
             var x = event.clientX - obj.offsetLeft; //当前鼠标点击处相对于popupfather所在位置x ， -150 是处理margin值
             var y = event.clientY - obj.offsetTop; //当前鼠标点击处相对于popupfather所在位置y
      
             document.onmousemove = function(event){
             	
                 var event = event || window.event;//兼容ie浏览器
                 obj.style.left = event.clientX - x + "px";
                 obj.style.top = event.clientY- y + "px";                 
                
                 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
 
             } 
             document.onmouseup = function(event){
	
	               document.onmousemove = null;	
	               document.onmouseup = null;
	           }
	    }   
}
/**
   * 在页面拖动一个dom对象。  
   * @param obj   拖动对象。
   * @return 
   */
function pubToolsDragListener(obj){	  
	
			   obj.onmousedown = function(event){				   	   
		        
   	         var event = event || window.event;
   	         
   	         event.preventDefault();// 浏览器有一些图片的默认事件,这里要阻止
             
             this.style.cursor = 'move';
             
             var x = event.clientX - this.offsetLeft; //当前鼠标点击处相对于popupfather所在位置x ， -150 是处理margin值
             var y = event.clientY - this.offsetTop; //当前鼠标点击处相对于popupfather所在位置y
             
             document.onmousemove = function(event){
             	
                 var event = event || window.event;//兼容ie浏览器
                 
                 
                 obj.style.left = (event.clientX - x/1.5) + "px";
                 obj.style.top = (event.clientY - y/1.5) + "px";
                
                 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
 
             } 
             
             document.onmouseup = function(event){
                
                   this.onmousemove = null;
               
                   this.onmouseup = null;
                   
                   this.onmousedown = null;
                   
                   obj.style.cursor = 'default';
             }             
	       }
}
/**
   * 添加遮罩层。当弹出一个层，则只能操作该层，不能操作原页面，需要在原页面加一个层遮挡。     
   * @ obj 表单对象。
   * @return 
   */
function flyCommonShadeLayCreate(){
	
	 var allPage  = document.createElement("div"); 
	 allPage.style.cssText = "z-index:1;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);-moz-opacity:0.2;opacity:0.2;position:absolute;left:0px;top:0px;";
	 allPage.id = "flyCommonShadeLay";
	 
	 document.getElementsByTagName("body")[0].appendChild(allPage);
}
/**
   * 关闭遮罩层。
   * @return 
   */
function flyCommonShadeLayClose(){
	
	 var obj = document.getElementById('flyCommonShadeLay');
	 obj.parentNode.removeChild(obj); 		
}
/**
   * 监听浏览器关闭。 
   * @return 
   */
function flyPageCloseListen(){
	
	 var obj = document.getElementById('flyCommonShadeLay');
	 obj.parentNode.removeChild(obj); 		
}

/**
   * 动态标签。实现点击不同标签，显示相应标签下的不同内容，显示对象不同、内容不同。
   * @param obj   点击标签对象  
   * @param flag  点击标签的标识符。
   * @param fun   点击标签时，调用实现接口，实现后台取数、交互等操作。
   * @return   
   */
function pubToolsShowDiffItemPad(obj,flag,fun){		
	
	 //if(obj.className && obj.className=="active")
	  //  return;
	    
	 //取得点击标签序号
	 var orderNo = 0;
	 var as = obj.parentNode.getElementsByTagName("a");
	 for (var i=0;i<as.length;i++ ){ 	
	 	
	 	  if(obj==as[i]){
         orderNo = i;
         as[i].className = "active";
      }else
      	 as[i].className = "";
   }
   
    //取得点击标签对应顺序的显示item
   var rootObj = obj.parentNode.parentNode;
   var itemObj = "";
   var n = 0;
   for (var i=0;i<rootObj.childNodes.length;i++ ){ 	
	 	
	 	  if(rootObj.childNodes[i].className=="item_text" || rootObj.childNodes[i].className=="item_text active"){
	 	  	
	 	  	 if(n==orderNo){
	 	  	 	
	 	  	 	  rootObj.childNodes[i].style.display = "block";
	 	  	    itemObj = rootObj.childNodes[i];
	 	  	    
	 	  	 }else {
	 	  	 	  
	 	  	 	  rootObj.childNodes[i].style.display = "none";
	 	  	 	
	 	  	 }
	 	  	 
	 	  	 n++;        
      }
   }
	 
	 //回调函数
	 eval( "var _function = " + fun);
       _function(flag,itemObj);
	 
	 return;
}
/**
   * 动态标签。实现点击不同标签，显示对象相同，只是数据不同。类似分类查询
   * @param obj   点击标签对象  
   * @param flag  点击标签的标识符。
   * @param fun   点击标签时，调用实现接口，实现后台取数、交互等操作。
   * @return   
   */
function pubToolsShowSameItemPad(obj,flag,fun){		
	
	 if(obj.className && obj.className=="active")
	    return;
	    
	 //取得点击标签序号
	 var orderNo = 0;
	 var as = obj.parentNode.getElementsByTagName("a");
	 for (var i=0;i<as.length;i++ ){ 	
	 	
	 	  if(obj==as[i]){
         orderNo = i;
         as[i].className = "active";
      }else
      	 as[i].className = "";
   }
   
    //取得点击标签对应顺序的显示item
   var rootObj = obj.parentNode.parentNode;
   var itemObj = rootObj.getElementsByClassName("item_text active")[0];
	 
	 //回调函数
	 eval( "var _function = " + fun);
       _function(flag,itemObj);
	 
	 return;
}
/**
   * 生成二维码。
   * @param rId          二维码标签Id 
   * @param rText          二维码内容  
   * @param rWidth         二维码宽度。
   * @param rHeight        二维码高度。
   * @param colorDark      二维码颜色。
   * @param colorLight     二维码背景颜色。
   * @param correctLevel   二维码级别。
   * @return   
   
   colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
   */
function pubToolsCreateQrcode(rId,rText,rWidth,rHeight,colorDark,colorLight,correctLevel){		
	
	 var qrcode = new QRCode(document.getElementById(rId), {
			text: rText,
			width: rWidth,
			height: rHeight,
			colorDark: colorDark,
			colorLight: colorLight,
			correctLevel: correctLevel
	 });
}
/**
   * 生成进度条。
   * @param barInfo        进度条信息字符串，以|拼串，共7个字段。每个节点信息：单位|单据Id|序号|名称|日期|状态|节点Id或名称（点击时：用于连接或定位）
   * @param positionId     进度条显示位置用：所在位置节点Id，将显示在该节点下方  
   * @param positionClass  进度条显示位置用：所在位置节点className，将显示在该节点下方  
   * @param className      样式名称，指最上层样式，内部名称一样。
     说明：positionId、positionClass为空，默认为class="list_box_top",以positionId优先
           className为空，默认为className = "approve_form";
   * @return   
  
   */
function pubToolsCreateProgressBar1(barInfo,positionId,positionClass,cssClassName){		
	
	
	if(!barInfo || barInfo.indexOf("|")<1)
	    return;
	    
	 /*
	    1、取得流程信息
	    2、总宽度
	    3、每个阶段宽度
	    4、生成每个阶段信息
	    5、取得位置信息
	    2、显示信息 	
	 */
	var pTime = "";
	var pBar = "";
	var pPer = "";
	
	var noClass = ""; //圆点背景颜色
	var lineClass = ""; //进度条背景颜色	
	var perClass = "";//文字颜色
	
	var n = 0;
	
	var totalWidth = 1300;//总宽度	
	
	var arr = barInfo.split("|");//单位|单据Id|序号|名称|日期|状态|节点Id或名称（点击时：用于连接或定位）
	
	var liWidth = totalWidth/(arr.length/7)-5;//每个阶段长度
	var barWidth = liWidth/2-10;//每个进度条长度
	
	var txtLiStyle = "style='width:"+(liWidth+1)+"px;'"; //每个li的长度
	var liStyle = "style='width:"+liWidth+"px;'"; //每个li的长度
	var barStartliStyle = "style='width:"+(barWidth+20)+"px;'";//开头和结尾进度条li的长度
	var barStyle = "style='width:"+barWidth+"px;'";//中间进度条li的长度
	var barMarginLeft = liWidth/2 + 10;//为了日期和文字与中间圆点对齐，进度条，向后为li一半的距离。
	//alert(barMarginLeft);
	//var w = (arr.length/6)*200+30;
	
	for(var i=0;i<arr.length;i=i+7){	
		
		 n++;
		 
		 if((arr[i+5])=="Y"){
		 	
		 	  noClass = "spanr";
	      lineClass = "span1";
	      perClass = "class='active'";
		 	
		 }else if((arr[i+5])=="J"){
		 	
		 	  noClass = "spane";
	      lineClass = "span3";
	      perClass = "class='green_txt'";
		 	
		 }else if((arr[i+5])=="T") {
		 	
		 	  noClass = "spany";
	      lineClass = "span4";		 
	      perClass = "class='yellow_txt'";	
		 }else {
		 	
		 	  noClass = "spang";
	      lineClass = "span2";		 
	      perClass = "";	
		 }
		 
		 arr[i+4] = (arr[i+4]=="null") ? "" : arr[i+4];
		 
		 pTime+= "<li "+perClass+" "+txtLiStyle+">"+arr[i+4]+"</li>";
		 
		 if(i == 0)	//开头	 
	     pBar+= "<li "+barStartliStyle+"><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 spanr'>1</span></a><span class='span1' "+barStyle+"></span></li>";
	   else if(i+7 == arr.length)//结尾 
	   	 pBar+= "<li "+barStartliStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a></li>";
	   else {//中间
	   	
	   	   if((arr[i+5])=="T")//退回时，序号原点后面的进度条为灰色
	   	       pBar+= "<li "+liStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a><span class='span2' "+barStyle+"></span></li>";
	       else
	    	     pBar+= "<li "+liStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a><span class='"+lineClass+"' "+barStyle+"></span></li>";
	   }
	   
	   pPer+= "<li "+perClass+" "+txtLiStyle+">"+arr[i+3]+"</li>";   
		
	}
	var str = "<div class='approve_bar' style='width:"+totalWidth+"px;'>"
  
    +"<div class='approve_bg_txt'>"
        +"<ul>" 
             + pTime                                               
        +"</ul>" 
     +"</div>"   
     +"<div class='approve_bg'>" 
         +"<ul>" 
             + pBar
         +"</ul>" 
      +"</div>"   
      +"<div class='approve_bg_txt'>" 
         +"<ul>" 
            + pPer                          
         +"</ul>" 
       +"</div></div>";     
       
	
	/*
  var str = "<div class='approve_bg_txt' style='width:"+totalWidth+"px;'>"
        +"<ul>" 
             + pTime                                               
        +"</ul>" 
     +"</div>"   
     +"<div class='approve_bg' style='width:"+totalWidth+"px;margin-left:"+barMarginLeft+"px'>" 
         +"<ul>" 
             + pBar
         +"</ul>" 
      +"</div>"   
      +"<div class='approve_bg_txt' style='width:"+totalWidth+"px;'>" 
         +"<ul>" 
            + pPer                          
         +"</ul>" 
       +"</div></div>";  
  */
     
    var beforeChild = "";
    
    if(positionId.trim().length>1)
       beforeChild = document.getElementById(positionId);
    else if(positionClass.trim().length>1)
       beforeChild = window.document.getElementsByClassName(positionClass)[0];
    else {
       
         var bodyDiv = window.document.getElementsByClassName("list_box_con")[0];
         beforeChild = bodyDiv.firstChild;
    }
    
    var barDiv = document.createElement("div"); 
	  barDiv.className = "approve_area";
	  barDiv.innerHTML = str;	  
	  
	  beforeChild.parentNode.insertBefore(barDiv,beforeChild);
	 
	  //bodyDiv.insertBefore(barDiv,firstNode);
    
    /*
    var bodyDiv = window.document.getElementsByClassName("list_box")[0];
    var titleDiv = window.document.getElementsByClassName("list_box_top")[0];
    var titleDivNext = titleDiv.nextElementSibling;    
    
    var barDiv = document.createElement("div"); 
	  barDiv.className = "approve_form";
	  barDiv.innerHTML = str;	  
	 
	  bodyDiv.insertBefore(barDiv,titleDivNext);
	  */
	  
    return;
}
/**
   * 生成进度条。
   * @param barInfo        进度条信息字符串，以|拼串，共7个字段。每个节点信息：单位|单据Id|序号|名称|日期|状态|节点Id或名称（点击时：用于连接或定位）
   * @param positionId     进度条显示位置用：所在位置节点Id，将显示在该节点下方  
   * @param positionClass  进度条显示位置用：所在位置节点className，将显示在该节点下方  
   * @param className      样式名称，指最上层样式，内部名称一样。
     说明：positionId、positionClass为空，默认为class="list_box_top",以positionId优先
           className为空，默认为className = "approve_form";
   * @return   
  
   */
function pubToolsCreateProgressBar(barInfo,positionId,positionClass,cssClassName){		
	
	
	if(!barInfo || barInfo.indexOf("|")<1)
	    return;
	    
	 /*
	    1、取得流程信息
	    2、总宽度
	    3、每个阶段宽度
	    4、生成每个阶段信息
	    5、取得位置信息
	    2、显示信息 	
	 */
	var pTime = "";
	var pBar = "";
	var pPer = "";
	
	var noClass = ""; //圆点背景颜色
	var lineClass = ""; //进度条背景颜色	
	var perClass = "";//文字颜色
	
	var n = 0;
	
	var totalWidth = 1400;//总宽度	
	
	var arr = barInfo.split("|");//单位|单据Id|序号|名称|日期|状态|节点Id或名称（点击时：用于连接或定位）
	
	var liWidth = totalWidth/(arr.length/7)-5;//每个阶段长度
	var barWidth = liWidth/2-10;//每个进度条长度
	
	//var txtLiStyle = "style='width:"+(liWidth+1)+"px;'"; //每个li的长度 border:1px #ddd solid;'
	var txtLiStyle = "style='width:"+(liWidth-2)+"px;'"; //每个li的长度
	var txtLiHalfStyle = (liWidth-2)/2;//日期和人员li长度的一半
	var liStyle = "style='width:"+liWidth+"px;'"; //每个li的长度
	var barStartliStyle = "style='width:"+(barWidth+20)+"px;'";//开头和结尾进度条li的长度
	var barStyle = "style='width:"+barWidth+"px;'";//中间进度条li的长度
	var barMarginLeft = liWidth/2 + 10;//为了日期和文字与中间圆点对齐，进度条，向后为li一半的距离。
	//alert(barMarginLeft);
	//var w = (arr.length/6)*200+30;
	
	for(var i=0;i<arr.length;i=i+7){	
		
		 n++;
		 
		 if((arr[i+5])=="Y"){
		 	
		 	  noClass = "spanr";
	      lineClass = "span1";
	      perClass = "class='active'";
		 	
		 }else if((arr[i+5])=="J"){
		 	
		 	  noClass = "spane";
	      lineClass = "span3";
	      perClass = "class='green_txt'";
		 	
		 }else if((arr[i+5])=="T") {
		 	
		 	  noClass = "spany";
	      lineClass = "span4";		 
	      perClass = "class='yellow_txt'";	
		 }else {
		 	
		 	  noClass = "spang";
	      lineClass = "span2";		 
	      perClass = "";	
		 }
		 
		 arr[i+4] = (arr[i+4]=="null") ? "" : arr[i+4];
		 
		 pTime+= "<li "+perClass+" "+txtLiStyle+">"+arr[i+4]+"</li>";
		 
		 if(i == 0)	//开头	 
	     pBar+= "<li "+barStartliStyle+"><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 spanr'>1</span></a><span class='span1' "+barStyle+"></span></li>";
	   else if(i+7 == arr.length)//结尾 
	   	 pBar+= "<li "+barStartliStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a></li>";
	   else {//中间
	   	
	   	   if((arr[i+5])=="T")//退回时，序号原点后面的进度条为灰色
	   	       pBar+= "<li "+liStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a><span class='span2' "+barStyle+"></span></li>";
	       else
	    	     pBar+= "<li "+liStyle+"><span class='"+lineClass+"' "+barStyle+"></span><a href='#' onclick=\"gotoView('"+arr[i+6]+"');\"><span class='span0 "+noClass+"'>"+n+"</span></a><span class='"+lineClass+"' "+barStyle+"></span></li>";
	   }
	   
	   pPer+= "<li "+perClass+" "+txtLiStyle+">"+arr[i+3]+"</li>";   
		
	}
	var str = "<div class='approve_bar' style='width:"+totalWidth+"px;'>"
  
    +"<div class='approve_bg_txt' style='margin-left:0px;'>"
        +"<ul>" 
             + pTime                                               
        +"</ul>" 
     +"</div>"   
     +"<div class='approve_bg' style='margin-left:"+txtLiHalfStyle+"px;margin-top:10px;margin-bottom:10px;'>" 
         +"<ul>" 
             + pBar
         +"</ul>" 
      +"</div>"   
      +"<div class='approve_bg_txt' style='margin-left:0px;'>" 
         +"<ul>" 
            + pPer                          
         +"</ul>" 
       +"</div></div>";     
       
	
	/*
  var str = "<div class='approve_bg_txt' style='width:"+totalWidth+"px;'>"
        +"<ul>" 
             + pTime                                               
        +"</ul>" 
     +"</div>"   
     +"<div class='approve_bg' style='width:"+totalWidth+"px;margin-left:"+barMarginLeft+"px'>" 
         +"<ul>" 
             + pBar
         +"</ul>" 
      +"</div>"   
      +"<div class='approve_bg_txt' style='width:"+totalWidth+"px;'>" 
         +"<ul>" 
            + pPer                          
         +"</ul>" 
       +"</div></div>";  
  */
     
    var beforeChild = "";
    
    if(positionId.trim().length>1)
       beforeChild = document.getElementById(positionId);
    else if(positionClass.trim().length>1)
       beforeChild = window.document.getElementsByClassName(positionClass)[0];
    else {
       
         var bodyDiv = window.document.getElementsByClassName("list_box_con")[0];
         beforeChild = bodyDiv.firstChild;
    }
    
    var barDiv = document.createElement("div"); 
	  barDiv.className = "approve_area";
	  barDiv.innerHTML = str;	  
	  
	  beforeChild.parentNode.insertBefore(barDiv,beforeChild);
	 
	  //bodyDiv.insertBefore(barDiv,firstNode);
    
    /*
    var bodyDiv = window.document.getElementsByClassName("list_box")[0];
    var titleDiv = window.document.getElementsByClassName("list_box_top")[0];
    var titleDivNext = titleDiv.nextElementSibling;    
    
    var barDiv = document.createElement("div"); 
	  barDiv.className = "approve_form";
	  barDiv.innerHTML = str;	  
	 
	  bodyDiv.insertBefore(barDiv,titleDivNext);
	  */
	  
    return;
}
/**
   * 选择文件上传,ajax同步上传 。
   * @param obj              选择的文件对象
   * @param fileKey          上传的键值，多个以^拼串
   * @param showObj          显示span对象  
   * @param uploadServer     上传调用的服务。没有为默认。
   * @param delFun           删除上传附件调用的方法。没有为默认。
   * @return   
  
   */
function pubToolsUploadFile(obj,fileKey,showObj,uploadServer,delFun){		
	
	var fileStringBase64="";
	var reader = new FileReader();
	var arr =new Array();

	reader.readAsDataURL(obj.files[0]);
	
	reader.onload=function(){	
		
			fileStringBase64 = this.result;
			fileStringBase64 = fileStringBase64.substring(fileStringBase64.indexOf(",")+1,fileStringBase64.length);	
			var path=obj.value.substring(obj.value.lastIndexOf("\\")+1,obj.value.length)
			//var sonarr=new Array(fileStringBase64,path);
			
			var fileCode = "";
			var opValue = fileKey+"|"+fileStringBase64+"|"+path;
			
			
			if(uploadServer && uploadServer.trim().length>1){
				
			    eval( "var _function = " + uploadServer );
          fileCode = _function("Upload",opValue);
         
		  }else
			    fileCode = toServerOp("Upload",opValue);
			
			if(fileCode.indexOf("File")>-1){
				
				alert(ajaxPubAlertError(fileCode));
				return;
			}
			
			if(!showObj || typeof(showObj) != "object")
			    return;			    
			
			var arr = [["",fileCode,path]];
			
			if(delFun && delFun.trim().length<1)
	        delFun =  "";//默认
	        
			commonSelectSetSelArrLabel(arr,showObj,delFun);				
	}
	
	return;
}
/**
   * 选择文件上传,ajax异步上传 。
   * @param obj              选择的文件对象
   * @param fileKey          上传的键值，多个以^拼串
   * @param showObj          显示span对象  
   * @param uploadServer     上传调用的服务。没有为默认。
   * @param delFun           删除上传附件调用的方法。没有为默认。
   * @param callBackFun      上传后，回调函数。
   * @return   
  
   */
function pubToolsUploadFileAsyn(obj,fileKey,showObj,uploadServer,delFun,callBackFun){		
	
	var fileStringBase64="";
	var reader = new FileReader();
	var arr =new Array();

	reader.readAsDataURL(obj.files[0]);
	
	reader.onload=function(){	
		
			fileStringBase64 = this.result;			
			
			fileStringBase64 = fileStringBase64.substring(fileStringBase64.indexOf(",")+1,fileStringBase64.length);	
			var path=obj.value.substring(obj.value.lastIndexOf("\\")+1,obj.value.length)
			
			var opValue = fileKey+"|"+fileStringBase64+"|"+path;
			var info = "opValue="+opValue+"&flag=Upload";
			
			send_request(uploadServer,info,"pubToolsUploadFileAsynRes");			
			
			//设置全局变量，供ajax返回函数使用。
			pubToolsParams_a.uploadFileObj = obj;
			pubToolsParams_a.uploadFilePath = path;
			pubToolsParams_a.uploadFileTagObj = showObj;
			pubToolsParams_a.uploadFileDelFun = delFun;	
			pubToolsParams_a.uploadFileCallBackFun = callBackFun;				
	}
	
	return;
}
/**
   * ajax异步文件上传，执行完成后的回调函数。
   * @param resText   ajax返回结果  
   * @return     
   */
function pubToolsUploadFileAsynRes(resText){		
	
	
	    //if(resText.indexOf("File")>-1){
	    if(resText.indexOf("|")<0){
				
				alert(ajaxPubAlertError(resText));
				return;
			}
			
			//全局变量。
			var path = pubToolsParams_a.uploadFilePath;
			var showObj = pubToolsParams_a.uploadFileTagObj;
			var delFun = pubToolsParams_a.uploadFileDelFun;
			
			//如果有回调函数，则调用回调函数
			if(pubToolsParams_a.uploadFileCallBackFun && pubToolsParams_a.uploadFileCallBackFun.trim().length>0){
			   
			     eval( "var _function = " + pubToolsParams_a.uploadFileCallBackFun );
          
          _function(resText,path,pubToolsParams_a.uploadReceiptObj,pubToolsParams_a.uploadFileObj);//第一个参数为返回值(文件路径|文件新名称)，第二个参数为上传文件名称，第三个为上传发票<a>标签对象.如果不是上传发票，则回调不处理该对象，第四个为上传input=file标签对象。
			   
			}
			
			if(!showObj || typeof(showObj) != "object")
			    return;		
			
			    
			var fileArr = resText.split("|");
			
			var arr = [[fileArr[0],fileArr[1],path]];
			//var arr = [["",resText,path]];
			//var arr = [[resText,path]];
			
			if(!delFun || (delFun && delFun.trim().length<1))
	        delFun =  "";//默认
	        
			commonSelectSetSelArrLabel(arr,showObj,delFun);		
			   
			return;	
}
/**
   * 图片上传，校验长宽和大小。
   * @param obj           上传对象 
   * @param callBackFun   回调函数 
   * @param iWidth        最大宽度 
   * @param iHheight      最大高度 
   * @param iSize         最大大小,0,不校验
   * @return     
   */
function pubToolsGetUploadImgSize(obj,callBackFun,iWidth,iHheight,iSize) {
	
  if(!obj.value)
     return null;
   
  //读取图片数据      
  var reader = new FileReader();
        
  reader.readAsDataURL(obj.files[0]);
        
  reader.onload = function (e) {        	
      
       var data = e.target.result;
      
       //加载图片获取图片真实宽度和高度
       var image = new Image();
       image.src= data;
            
       image.onload=function(){
            	
            //alert(image.width+'======'+image.height);  
            if(image.width>iWidth || image.height>iHheight){
            	
            	 alert("抱歉，上传图片尺寸大于规定尺寸，请重新上传。");
            	 return false;
            }
            if(iSize>0 && image.fileSize>iSize){
            	
            	 alert("抱歉，上传签名文件大于规定，请重新上传。");
            	 return false;
            	
            }           
            
            eval( "var _function = " + callBackFun );
            _function(obj);
       };            
  };    
  return true;       
}
/**
   * 清空一个表单区域的编辑内容。
   * @param trObj         表单区域对象   
   * @param isOrder       是否保留序号。Y,保留。
   
   * @return     
   */
function pubToolsClearTrData(trObj,isOrder) {	
	     
	  	 	var obj = trObj.getElementsByTagName("*");
	  	 	
	  	 	for (var i=0;i<obj.length;i++ ){
	  	 		
	  	 		  if(obj[i].tagName=="INPUT" && obj[i].type!="button"){
	  	 		  	
	  	 		  	   //第一个input，如果是序号，则保留序号
	  	 		       if(isOrder=="Y" && i==0 && obj[i].value == "1" && obj[i].type == "text")
	  	 		          continue;	  	 		     
	  	 		
	  	 		       obj[i].setAttribute("flyvalue","");
	  	 		       obj[i].value = ""; 
	  	 		       
	  	 		  }else if(obj[i].tagName=="SPAN"){
	  	 		  	
	  	 		  	   obj[i].setAttribute("flyvalue","");
	  	 		  	   obj[i].innerHTML = ""; 
	  	 		  	
	  	 		  }else if(obj[i].tagName=="SELECT"){
	  	 		  	
	  	 		  	     obj[i].value = ""; 	  	 		  	
	  	 		  }	  	 		
	  	 	}
	  	 	
	  	 	return;
}
/**
   * 弹出关联单据页面。一般在报销页面，弹出申请单，或编辑页面弹出项目等关联页面。    
   * @param obj     点击对象。可能为td，或span（内含label）
   * @param pageId  页面代码。弹出页面代码
   * @param flag    页面标识。E，编辑；S，显示.
   * @return 
   */
function pubToolsOpenRelBill(obj,pageId,flag){		
	
	var billId = "";
	var insId = "";
	var progId = "";
	var dataKey = "";
	var dataKeyArr = new Array();
	
	//取得单据号
	if(obj.tagName=="SPAN"){
		
	   var appObj = obj.getElementsByTagName("label");
	   if(appObj.length<1)
	      return;
	   
	   dataKeyArr = appObj[0].getAttribute("flyvalue").split("⌒");
	   billId = dataKeyArr[0];
	   
	}else if (obj.tagName=="TD"){
		
		  billId = obj.getAttribute("flyvalue");
		  
		  if(!billId || billId.trim().length<1)
	      return;
	}
	
	//取得单位代码和程序代码
	if(flag=="S"){
	   
	   dataKeyArr = flyShowPageGetDataKey().split("^");
	   insId = dataKeyArr[0];
	   
	   progId = flyShowPageGetProgId();
	   
	} else if(flag=="E"){
		
		 dataKey = flyEditPageGetUpdKey();
		 
		 if(dataKey && dataKey.trim().length>1){
		 	  dataKeyArr = dataKey.split("^");
		    insId = dataKeyArr[0];
		 }else
		 	  insId = loginInsId_a;
		 	  
		 progId = flyEditPageGetProgId();
	}
	
	dataKey = insId+"^"+billId;
	dataKey = window.encodeURI(window.encodeURI(dataKey));　//编码 	
	
	openPopPage("/fwis/mssl/"+pageId+"?flag=Show&dataKey="+dataKey+"&authFlag=V&progId="+progId,0.1,0.05,0.8,0.8);
	
}
/**
   * 显示关联单据编码。一般在报销页面，有申请单名称，改功能在申请单后加括号，内显示申请单号。    
   * @param appCodeFormId    申请代码表单  
   * @return 
   */
function pubToolsShowRelBillCode(appCodeFormId){	
	
	var appObj = document.getElementById(appCodeFormId);
	if(!appObj)
	   return;
	   
	var billId = "";	
	var dataKeyArr = new Array();
	   
	//取得单据号
	if(appObj.tagName=="SPAN"){
		
	   var labelObj = appObj.getElementsByTagName("label");
	   if(labelObj.length<1)
	      return;
	   
	   dataKeyArr = labelObj[0].getAttribute("flyvalue").split("⌒");
	   billId = dataKeyArr[0];
	   
	}else if (appObj.tagName=="TD"){
		
		  billId = appObj.getAttribute("flyvalue");		  
		  if(!billId || billId.trim().length<1)
	      return;
	      
	    dataKeyArr = billId.split("~");
	    if(dataKeyArr.length>1)
	         billId = dataKeyArr[1];
	    else
	    	   billId = dataKeyArr[0];
	}

	appObj.innerHTML = appObj.innerHTML + "("+billId+")";
	
	return;
}
/**
   * 根据单据类别返回页面程序代码。一般在列表页面，点击明细，根据单据类别，弹出相应页面。    
   * @param typeId  类别代码  
   * @return 
   */
function pubToolsGetProgIdByBillType(typeId){	
	
	  switch  (typeId)  {	
	  
	    case   "PV" : return "travelApplyShowPage";  //差旅申请	    
	    case   "PL" : return "outlayApplyShowPage";  //一般事项申请
	    case   "PM" : return "meetingApplyShowPage"; //会议申请
	    case   "PO" : return "officialApplyShowPage";//接待申请
	    case   "PT" : return "trainApplyShowPage";   //培训申请
	    
	    case   "EV" : return "travelExpenseShowPage";  //差旅报销	   
	    case   "EL" : return "outlayExpenseShowPage";  //一般事项报销
	    case   "EM" : return "meetingExpenseShowPage"; //会议报销
	    case   "EO" : return "officialExpenseShowPage";//接待报销
	    case   "ET" : return "trainExpenseShowPage";   //培训报销
	    case   "ED" : return "directExpenseShowPage";  //直接报销
	    
	    case   "CS" : return "contractSigningShowPage";   //合同申请
	    case   "CP" : return "contractPayShowPage";       //合同支付
	    
	    case   "UA" : return "purPerApplyShowPage";    //采购申请
	    case   "UE" : return "purApplyShowPage";       //采购执行
	   	    
	    default:return null;	       
	  }	
	   
		return;
}
/**
   * 列表中，点击一个表格，显示发票上传层，有上传按钮，已上传发票编辑状态（可删除）。
   * @return 
   */
function pubToolsReceiptUpload(scrollDivId,rowHeight,obj,billIdName,e){	
	
	//flyyaoqianObj_a = obj;
	//flyyaoqianNames_a = nameArr;
	
	var statusFlag = "";//页面状态：E，编辑页面；S，显示页面；
	var billId = ""; //页面单据号
	var butShow = ""; //是否显示上传按钮
	
	
	//1、判断是编辑页面还是显示页面
	if(isExitsVariable("flyEditPageParams_a")){
		
		 statusFlag = "E";
		 butShow = "block"; 
		 billId = document.getElementById(billIdName).value;		
		 
	}else {		
		 
		 statusFlag = "S";
		 butShow = "none"; 
		 billId = document.getElementById(billIdName).innerHTML;		
	}
	
	//1、取得发票上传id，不存在设置为空，到后台生成
	var receiptId = obj.getAttribute("flyvalue"); 
	if(!receiptId || receiptId.trim().length<1)
	   receiptId = "";
	  
	//alert("receiptId = "+receiptId);
	
	var layerObj = document.getElementById("pubToolsReceiptUploadLayerId");
	
	//2、没有加载过层，则先加载
	if(!layerObj){
		
     var str = "<div id='branchConTitleBar' class='title_layer' style='height:30px;'>"
	      +"<span class='spanl'></span>"
	      +"<span id='titleCenter' class='spanc'></span>"
	      //+"<span class='spanr' style='width:10%;'><a href='#'  onclick=\"this.parentNode.parentNode.parentNode.style.display='none';\"></a></span>"
	      +"<span class='spanr' style='width:10%;'><a href='#'  onclick=\"this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);\"></a></span>"
        +"</div>"	
   
        +"<div style='height:200px;'>"	 
  
           +"<div id='branchConScrollBox' class='list_box_tb' style='width:100%; '>"           
              +"<form id='branchConEditForm' name='branchConEditForm' method='post'>"         	
                 +"<span  id='receiptAttchFiles' flyflag='4' class='attch_files_span' style='width:85%;border:0;'></span>"
              +"</form>"
           +"</div>" 
   
        +"</div>"	   
   
      +"<div id='flyyaoqianButId' class='but_layer' style='display:"+butShow+";height:70px;border-top:1px #ddd solid'>"
      +"<a href='#' style='color:#003C9D;width:180px;margin-left:130px;'>上传发票<input type='file' class='fileAttchBut' style='width:90px;left:-70px;' onchange =\"uploadFile(this,'receiptAttchFiles')\"></a>"	   
      +"</div>";	
     
	
	   layerObj  = document.createElement("div"); 
	   layerObj.id = "pubToolsReceiptUploadLayerId";
	   layerObj.style.width = "350px"; 
	   layerObj.style.height = "300px"; 
	   //selPage.style.left = "10%"; 
	   //selPage.style.top = "15%"; 
	   layerObj.className = "branch_con";	 
	   layerObj.innerHTML = str;
	 
	   document.getElementsByTagName("body")[0].appendChild(layerObj); 	
	   
  } else {//有加载层，则先清空原有附件
  	
  	 layerObj.getElementsByTagName("form")[0].getElementsByTagName("span")[0].innerHTML = "";
  }
  
   //3、显示发票附件。
  var receiptFile = "";  
 
  var fileAttch = obj.getAttribute("flyattch"); 
  if(fileAttch && fileAttch.trim().length>0){//存在
  	
  	  receiptFile = fileAttch;  	  	 	  	 
  	  
  }else if(receiptId.trim().length>0){//不存在，则看是否有文件id，如果有到后台取得，然后显示。
  	  	
	   receiptFile = toServerOp("ReceiptFile",billId+"|"+receiptId);	
  	
  	 //将后台取得发票附件，添加到点击标签<a>对象
     if(receiptFile.length>1)
        obj.setAttribute("flyattch",receiptFile);
  
  }
  
    //如果存在附件则显示。
   if(receiptFile.length>1){
   	
       var tem = new Array();
       var fileArr = new Array();
  	  
       var arr = receiptFile.split("~");
       for (var i=0;i<arr.length;i++ ){ 	
  	  	
  	      tem = arr[i].split("⌒");  	      
          fileArr.push(tem);
       }
  	
       var showObj = document.getElementById("receiptAttchFiles"); 	
  	  
       commonSelectSetSelArrLabel(fileArr,showObj,"",statusFlag);
   }
   
   //添加点击附件显示图片
  flyShowPageAttchImg("receiptAttchFiles","flyShowPageImgLayerId","flyShowPageImgTitleLayerId");   
  
  //4、定位，鼠标抬起点
  var event = e || e.event;//兼容ie浏览器                 
  var x = event.clientX;
  var y = event.clientY;   
  
  var c = document.getElementById(scrollDivId).scrollTop;   
  
  //alert(y+" ; "+c+" ; "+(y-c+300));
  
  layerObj.style.left = (x-200) + "px";   
  //layerObj.style.top = (y-Math.abs(y-c)+300) + "px"; 
  layerObj.style.top = (y-320) + "px"; 
	
	//flyFormDragListener(document.getElementById("branchConTitleBar"),selPage);

	layerObj.style.display = "block"; 
	
	//5、设置全局变量，将上传发票上传标签<a>对象，设置为全局变量
	pubToolsParams_a.uploadReceiptObj = obj;
	
	return;
}
/**
   * 选择,指标、项目等
   * @param obj       选择对象。
   * @param typeFlag  选择类别。D，指标；I，指标。
   * @param flag      选择类别。"0|1|1|0|0".1返回值，0，不返回。
   * @return 
   */
function pubToolsSelCommon(obj,typeFlag,flag){	
	
	var selProgId = "";
	var preCon = "";
	var selType = "";
	var backFun = "";
	var selFlag = "";
	var conSql = ""; 	
	var orderBy = ""; 		
	
	
		
   if(typeFlag=="I"){//项目
  	
  	  //preCon = loginInsId_a+"|nbsp|nbsp|nbsp|nbsp|nbsp";
  	  preCon = loginInsId_a+"|"+loginDeptId_a+"|nbsp|nbsp|nbsp|nbsp";
	    selProgId = "projectSelPage";
	    backFun = "commonSelectSetSelInput";
	   
	    selFlag = (flag && flag.trim().length>0) ? flag : "0|1|0|0|0|0|0|1";	
	    
	 }else if(typeFlag=="D"){//指标
		
	   selProgId = "indexDetailSelect";
	   preCon = loginInsId_a;
	   backFun = "indexSet";
	   selFlag = "1|1|1|1|1";
	   conSql = " i_leaf='Y'"; 
	   orderBy = "i_year desc,case when decom_user_id in ('"+loginDeptId_a+"','"+loginPerId_a+"')  then 1 ELSE 6 END"; 
	  
	 }
	 
	 commonSelectPageInit(selProgId,preCon,"",90,80,3,10,selFlag,backFun,selType,conSql,obj,orderBy);
}
/**
   * 编辑、显示页面，主信息隐藏或显示。
   * @param obj  选择对象。
   * @return 
   */
function pubToolsShowHiddenMain(obj){	
	
	
	
	//1、隐藏主信息	
	var bodyDiv = window.document.getElementsByTagName("form");
	if(bodyDiv.length<1)
	   return;	   
	
	var mainDiv = bodyDiv[0].getElementsByTagName("div");
	
	if(mainDiv[0].style.display == "none"){
	   mainDiv[0].style.display = "block";
	   obj.innerHTML = "∨";
	}else{
		 mainDiv[0].style.display = "none";
		 obj.innerHTML = "∧";
	}
	
	//2、如果有审批进度，隐藏审批进度
	bodyDiv = window.document.getElementsByClassName("approve_area");
	
	//审批进度条，或审批表格
	if(bodyDiv.length>0 || document.getElementById('workflowprogresstableid')){
	
	    bodyDiv = window.document.getElementsByClassName("list_box_con");
  
      if(bodyDiv.length>0){
      	
      	 mainDiv = bodyDiv[0].getElementsByTagName("div");
      	 
      	 if(mainDiv[0].style.display == "none"){
	          mainDiv[0].style.display = "block";
	          obj.innerHTML = "∨";
	       }else{
		        mainDiv[0].style.display = "none";
		        obj.innerHTML = "∧";
	       }    	
      }  
  }

}
/**
   * 多选，模拟下拉列表，可多选。
   * @param obj             选择对象。
   * @param progId          导入程序代码ID，不可空。
   * @param scrollDivId     点击区域div的id,以滚动后确定坐标。   
   * @param preReq          选择程序前置条件，可为空。根据定义，对应前置条件值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @param query           选择程序查询条件，可为空。根据定义，对应搜索值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @return 
   */
function pubToolsMultipleSel(obj,progId,scrollDivId,preReq,query){	
	
	 var flyMutilSelLayer  = document.getElementById("flyPubToolsMutilSelLayer");
	 if(flyMutilSelLayer){ //如果存在返回
	    
	    flyMutilSelLayer.style.display="block";
	    
	    return;	    
	 }
	/*
   var str = "<div id='titleLayerExport' class='title_layer'  style='height:60px;'>"
     +"<span class='spanl' style='width:35%;'><label style='font-weight:bold;'>选择</span>"
     +"<span id='nodeTitleCenter' class='spanc'   style='width:5%;'></span>"
     +"<span class='spanr'  style='width:25%;'><a href='#' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';\"></a></span>"
     +"</div>"	
   */
     var str = "<div class='list_box_tb' style='width:96%;height:82%;margin-top:10px;'> "
     +"<form id='openLayerIndexForm' name='openLayerIndexForm' method='post'>"                                  
     +"<table id='multipleSelTableId' width='100%' border='0' cellpadding='0' cellspacing='0' flyflag='5'>"         
     +"<tr style='display:none;'>"                                                                                 
     +"<td width='50%'></td>" 
     +"<td width='50%'></td>" 
     +"</tr>" 
     +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox' flyflag='9'><label  flyflag='10'>年度</label></td>" 
     +"<td width='50%'><input type='checkbox' flyflag='9'><label  flyflag='10'>指标</label></td>" 
     +"</tr>" 
     /*
     +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
     +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"   
     
     +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>" 
      +"<tr>"                                                                                 
     +"<td width='50%'><input type='checkbox'>年度</td>" 
     +"<td width='50%'><input type='checkbox'>指标</td>" 
     +"</tr>"    
     */
     +"</table>"   
     +"</form>"                         
     +"</div>"   

     +"<div class='but_layer'  style='height:30px;padding-bottom:10px;'>"
     +"<a href=\"javascript:pubToolsMultipleSeled('flyPubToolsMutilSelLayer','multipleSelTableId');\" style='margin-right:50px;margin-left:50px;'>确定</a>"
     +"<a href='#' onclick=\"this.parentNode.parentNode.style.display='none';\"  style='margin-right:50px;margin-left:50px;'>取消</a>"	   
     +"</div>";  
    
     var xy = pubToolsGetAbsPoint(obj,scrollDivId);
   
     var divObj = document.createElement("div");
     divObj.id = "flyPubToolsMutilSelLayer";
     divObj.className = "branch_con";
     
     divObj.style.width = "650px";
     divObj.style.minHeight = "200px";
     
     divObj.style.left = xy.x + "px";
     divObj.style.top = (xy.y + obj.offsetHeight) + "px";
     divObj.style.display = "block";
    
     //divObj.style.cssText = "display:block;width:50%;height:68%;top:20%; left:15%;";
     divObj.innerHTML = str;
     
     document.getElementsByTagName('body')[0].appendChild(divObj);
     
     //对弹出的页面层，添加拖动监听
     //flyFormDragListener(document.getElementById("titleLayerExport"),divObj);

	   var info = "progId="+progId+"&preReq="+preReq+"&query="+query;
	 
	   //返回str：显示字段数量+"|"+value值+"|"+显示内容+"|"+value值+"|"+显示内容....	 
	   var str = getHttpResponse("/fwis/mssl/flyCommonSelectSrv","select",info); 	 

     if(!str || str.indexOf("|")<1)		   
	       return
	       
	   str = str.substring(str.indexOf("|")+1);
	   str = str.replace(/\|/g,"^");
     
     flyFormDataPageShowData(divObj,str,"S","^","~");
     
     //删除空字段
     var tableObj = document.getElementById("multipleSelTableId");
     var row = tableObj.rows.length;
	   var inputObj = tableObj.rows[row-1].cells[1].getElementsByTagName("input")[0];
	   	   
	   if(inputObj.getAttribute("flyvalue")=="undefined")	   
	       tableObj.rows[row-1].cells[1].innerHTML = "&nbsp;";
	       
	   //设置全局变量，供确认函数使用。
			pubToolsParams_a.multipleSelObj = obj;			
     
		  return;
	
}
/**
   * 多选点击确定按钮，返回选中值。
   * @param divId         选择表id   
   * @param tableId         选择表id   
   
   * @return pubToolsParams_a.multipleSelObj
   */
function pubToolsMultipleSeled(divId,tableId){	
	
	var labelObj = "";
	var str = "";	
	var strName = "";	
	
	var inputObj = document.getElementById(tableId).getElementsByTagName("input");	
	for(var i=0;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox" && inputObj[i].checked) {
			
			 //取得对象属性flyValue值			
		   str+= "^"+inputObj[i].getAttribute("flyvalue");	
		   
		   //取得对象属性名称值
		   strName+= ","+inputObj[i].parentNode.getElementsByTagName("label")[0].innerHTML;		   
		}		   
	}	
	
	if(str.length<2){
		
		 alert("请选择查询信息");
		 return;		
	}
	
	pubToolsParams_a.multipleSelObj.setAttribute("flyvalue",str.substring(1));
	pubToolsParams_a.multipleSelObj.value = strName.substring(1);	
	
	document.getElementById(divId).style.display="none";
	
	return;	
}
/**
   * 根据鼠标点击位置，取得x、y坐标。
   * @param e               点击事件。   
   * @param scrollDivId     点击区域div的id,以滚动后确定坐标。   
   * @return 
   */
function pubToolsGetAbsPoint(e,scrollDivId){	
	
	  var x = e.offsetLeft;

    var y = e.offsetTop;
    
    var v = y;//input宽度
    
    var z = document.documentElement.clientHeight;
   
    var c = document.getElementById(scrollDivId).scrollTop; 
    
    while(e = e.offsetParent){

        x += e.offsetLeft;

        y += e.offsetTop;

    }
     
     //选择层是否被最下端遮挡,与下部高度小于弹出日期层230的高度，遮挡则显示在input上方
     if((z- y + c)<230)
       y = y - 236 - v - c;
     else 
       y = y - c;
  
  
    return {"x": x, "y": y};
}
 /**
   * 设置默认日期 内部使用document.getElementById('date').bindDate = new Date('2019/05/13');
   * @param obj          选择表单对象
   * @param defaultDate  默认日期，可为空，或不传递。
   * @return 
   */
function pubToolsDateSel(obj,defaultDate){	
	
	   if(!defaultDate)
	      defaultDate = "";
	      
     new Rolldate({
            //el: '#date-group4-1',
            el: '#'+obj.id,
            format: 'YYYY-MM-DD',
            beginYear: 2000,
            endYear: 2100,
            value: defaultDate //或2017-10-21 23:52:50
            //value: '2017-10-21' //或2017-10-21 23:52:50
     })
}
 /**
   * 图片选择事件添加
   * @param objBlock  展示列表对象id，或对象
   * @param objNone   隐藏列表对象id，或对象
   * @return 
   */
function pubToolsImgSelEventAdd(objBlock,objNone){	
	
	var obj1 = (typeof(objBlock) == "string") ? document.getElementById(objBlock) : objBlock;
	var obj2 = (typeof(objNone) == "string") ? document.getElementById(objNone) : objNone;
	
	//图片选择事件
  obj1.onclick=function () {//显示下方选择按钮
        document.getElementById("ab1").style.display="block";
        document.getElementById("nav1").style.display="block";
  }
  obj2.onclick=function () {//隐藏下方选择按钮
        document.getElementById("ab1").style.display="none";
        document.getElementById("nav1").style.display="none";
  }
	
}
