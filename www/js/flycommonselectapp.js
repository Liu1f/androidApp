﻿/*! flywings v1.0 | (c) 2018,widesky science technology information, Inc. | flywings/license
//@ sourceMappingURL=
*/

/**   
   	js获取自定义属性（或者叫非标准属性）,只能使用getAttribute函数来获取。var dataType = 当前元素对象.getAttribute("自定义属性");  
    js为html元素添加自定义属性document.getElementById("#a").setAttribute("属性名","属性值");
    
    js提供了parseInt()和parseFloat()两个转换函数。前者把值转换成整数，后者把值转换成浮点数。只有对String类型调用这些方法，这两个函数才能正确运行；对其他类型返回的都是NaN(Not a Number)。

   * @param treeInitArry 初始化菜单数据。
   * @return 传输数据不合规返回提示。正常则初始化菜单。
   
   多选：
   1、传递多选标识
   2、单击行，选中显示到显示区
   3、点击确定返回选中值，取消关闭选择框
   2、返回一个json数组，一个大数组内包含每个选择的值，每个选择的值与单选相同
   
   1、显示选中框                   原来方法改
   2、数据更换为单击事件           原来方法改
   3、单击将选择内容，显示到显示区 加新方法
   4、确定返回值                   加新方法
   */
   
document.write("<link rel='stylesheet' type='text/css' href='/fwis/com/is/flywings/pub/style/flycommonselect.css'>");

var flyCommonSelectParams_a = {}; //通用全局变量
flyCommonSelectParams_a.pageCount = 0;
flyCommonSelectParams_a.progId = "";
flyCommonSelectParams_a.preReq = "";
flyCommonSelectParams_a.backValue = "";
flyCommonSelectParams_a.backFun = "";  //返回值调用函数
flyCommonSelectParams_a.selModel = ""; //选择类型，单选或多选。单选为空，多选multiple。
flyCommonSelectParams_a.sql = "";
flyCommonSelectParams_a.receiveObj = "";


function commonSelectOpen(){		
	
	 commonSelectPageInit("insSelect","","",90,80,3,10,"1|1|1");

	 //document.getElementById("commonSelectLayer").style.display = "block";
	 return;	
}
/**
   * 关闭弹出编码规则页面   
   * @return 
   */
function commonSelectClose(){	
	
	var obj = document.getElementById('commonSelectLayer');
	obj.parentNode.removeChild(obj); 	
	
	 //document.getElementById('commonSelectLayer').style.display = "none";
	 return;	
}
/**
   * 弹出选择页面   
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应条件值，如不传递则nbsp，返回则传递相应值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空
   * @ pageWidth   弹出页面宽度，不可为空。为整数，百分比，如80则，是整个页面宽度的80%
   * @ pageHeigth  弹出页面高度，不可为空。为整数，百分比，如60则，是整个页面高度的80%
   * @ fromLeft    弹出页面距离左边的距离，不可为空。为整数，百分比，如10则，是距离页面左边距的10%
   * @ fromTop     弹出页面距离顶边的距离，不可为空。为整数，百分比，如20则，是距离页面顶边距的20%
   * @ backValue   返回值拼串。根据定义，对应返回值，0不返回，1返回。如"1|0|1"，则返回第一个和第三个值。
   * @ backFun     返回值调用的函数。
   * @ model       选择模式。multiple多选，""单选。
   * @ sql         特殊sql查询语句，指where 后面的查询，开始不能用and或or。可为空
   * @ receiveObj  接收返回值对象      
   * @return       单选，返回一个数组[];多选返回组合数组，[[],[],[]]，组合数组中每个数组是选中的一个值。
   */
function commonSelectPageInit(progId,preReq,query,pageWidth,pageHeigth,fromLeft,fromTop,backValue,backFun,model,sql,receiveObj,orderBy){		
	 
	 if(!orderBy)
	    orderBy = "";
	    
	 //返回str：页面名称+"|"+标题字段+"|"+列宽+"|"+内容;	 
	 var str = commonSelectGetData(progId,preReq,query,"all",sql,1,orderBy);
	 
	 var arr = str.split("||");
	 
	 flyCommonSelectParams_a.progId = progId;
   flyCommonSelectParams_a.preReq = preReq;
   flyCommonSelectParams_a.backValue = backValue;
   flyCommonSelectParams_a.backFun = backFun; //返回值调用函数
   flyCommonSelectParams_a.selModel = model;
   flyCommonSelectParams_a.sql = sql;
   flyCommonSelectParams_a.receiveObj = receiveObj;
   flyCommonSelectParams_a.orderBy = orderBy;
   
   commonSelectCreatePage(arr[0],arr[1],arr[2],arr[3],pageWidth,pageHeigth,fromLeft,fromTop);
	 
	 return;	
}

/**
   * 生成弹窗选择页面   
   * @return 
   */
function commonSelectCreatePage(pageName,tabelTitleTr,tabelTdWidth,listValue,pageWidth,pageHeigth,fromLeft,fromTop){	
		 
	 var listHeight = "76%";//列表高度，默认为单选，不显示选择框。
	 
	 var selPage  = document.createElement("div"); 
	 selPage.id = "commonSelectLayer";
	 selPage.style.width = pageWidth+"%"; 
	 selPage.style.height = pageHeigth+"%"; 
	 selPage.style.left = fromLeft+"%"; 
	 selPage.style.top = fromTop+"%"; 
	 selPage.className = "commonselect_layer";	 
	 
	  //多选。
	 var logo = "<div id='flyCommonSelectLogoId' class='logo'>";
	 logo+= "<span class='spanl'>"+pageName+"</span>";
	 logo+= "<span class='spanr'><a href='javascript:commonSelectClose();' >关闭</a></span>";
   logo+= "</div>";   
   
   //多选框。
   var sel = "";
   //var bottomBut = "<div style='height:100px'></div>";
   if(flyCommonSelectParams_a.selModel == "multiple") {
   	
   	
   	 listHeight = "66%";
   	
     sel = "<div class='commonselect_choose'>";
	   sel+= "<span id='commonselectSelSpan'></span>";	   
     sel+= "</div>";
     /*
     bottomBut = "<div class='bottom_but'>";
     bottomBut+= "<a href='javascript:commonSelectMultiSel();'>确定</a>";
     bottomBut+= "<a href='javascript:commonSelectMultiReset();'>取消</a>";	 
     bottomBut+= "</div>";	
     */
   }  
   
   var query = "<div class='query'>";
   query+= "<div class='query_l'>";
   query+= "<input type='text' value='' id='queryValue' placeholder='输入'>";     
   query+= "<input name='' type='image' onclick='commonSelectQuery()' src='/fwis/com/is/flywings/pub/img/an01.png' class='btn'>";
   query+= "<input name='' type='image' onclick='commonSelectReset()' src='/fwis/com/is/flywings/pub/img/an02.png' class='btn'>";     
   query+= "</div>";
   
   //多选。
   if(flyCommonSelectParams_a.selModel == "multiple") {
      query+= "<div class='query_r'>";
      query+= "<a href='javascript:commonSelectMultiSel();' class='active_btn'>确定</a>";
      query+= "<a href='javascript:commonSelectMultiReset();'>取消</a>";	 
      query+= "</div>";
   }
   query+= "</div>";
   //query+= "<div class='clear_both'></div>";
	 
	 var titleArr = tabelTitleTr.split(",");
	 var tdWidthArr = tabelTdWidth.split(",");
	 var tdValue = listValue.split(",");	 
	 
	 var n = titleArr.length;	 
	 
	
	 //表格
	 var table = "<table id='flyCommonSelectTableList' width='100%' border='0' cellspacing='0' cellpadding='0'>";
	 
	 //表格标题行
	 table+= "<tr class='tab'>";
	 
	 for(var i=0;i<n;i++)	 	
	 	 table+= "<td width='"+tdWidthArr[i]+"%' align='center'>"+titleArr[i]+"</td>";
	 	 
	 table+= "<tr>";	 	
	 table+= "</table>";
	 
	 //翻页	 
	 var turnPage = "<div class='turnpage'>"
   + "<span>"                	  
     + "<a href=\"javascript:commonSelectToPage('U');\"><img src='/fwis/com/is/flywings/pub/img/jt_l.png'/></a>"
     + "<label id='commonSelectTurnPage'>"
       + "<a href='#' onclick='javascript:commonSelectToPage(this);'>1</a>"
       + "<a href='#' onclick='javascript:commonSelectToPage(this);' class='active'>2</a>"
       + "<a href='#' onclick='javascript:commonSelectToPage(this);'>3</a>"    
     + "</label>"                
       + "<a href=\"javascript:commonSelectToPage('D');\"><img src='/fwis/com/is/flywings/pub/img/jt_r.png'/></a>"                    
   + "</span>"
   + "<span class='left_span'>"
        + "<a href='#' class='longlong'>共<label id='commonSelectPageCount'></label>页&nbsp;&nbsp;&nbsp;&nbsp;到第&nbsp;<input type='text'  id='commonSelectTurnToNum' value='' onkeyup=\"flyCheckDigitInput(this,'I');\" style='width:40px;'>&nbsp;页</a>"
        + "<a href='#' onclick=\"javascript:commonSelectToPage('T');\" style='width:50px;'>确定</a>"                    
        + "<a href='#' class='longlong'>&nbsp;&nbsp;&nbsp;&nbsp;共<label id='commonSelectDataCount'></label>条数据&nbsp;&nbsp;&nbsp;&nbsp;</a>"
   + "</span>"                  
+ "</div>"; 	 
	
	
  
  //数据列表
	//var list = "<div class='list'>" + table + bottomBut + "</div>";	 
	var list = "<div class='list' style='height:"+listHeight+";'>" + table + "</div>";	 
  
  selPage.innerHTML = logo + sel + query + list + turnPage;
  
  document.getElementsByTagName("body")[0].appendChild(selPage);  
 	
 	//显示数据
	commonSelectShowData(listValue,1);
	
	//对弹出的页面层，添加拖动监听
  flyFormDragListener(document.getElementById("flyCommonSelectLogoId"),commonSelectLayer);
    
	return;	
}
/**
   * 多选情况下，点击取消按钮，将已选择内容清空       
   * @return 
   */
function commonSelectMultiReset(){	
	
	document.getElementById("commonselectSelSpan").innerHTML="";	
}
/**
   * 翻页。
   * @param pageNo   翻页页码
   * @return 
   */
function commonSelectTurnPageQuery(pageNo){	
	
	var queryValue = document.getElementById('queryValue').value;
	//var pageNo = commonSelectGetCurrentPageNo();
	
	var str = commonSelectGetData(flyCommonSelectParams_a.progId,flyCommonSelectParams_a.preReq,queryValue,"query",flyCommonSelectParams_a.sql,pageNo,flyCommonSelectParams_a.orderBy);
	
	commonSelectShowData(str,pageNo);
	
	return;	
}
/**
   * 查询       
   * @return 
   */
function commonSelectQuery(){	
	
	var queryValue = document.getElementById('queryValue').value;
	
	var str = commonSelectGetData(flyCommonSelectParams_a.progId,flyCommonSelectParams_a.preReq,queryValue,"query",flyCommonSelectParams_a.sql,1,flyCommonSelectParams_a.orderBy);
	
	commonSelectShowData(str,1);
}
/**
   * 查询重置       
   * @return 
   */
function commonSelectReset(){	
	
	document.getElementById('queryValue').value = "";
	
	var str = commonSelectGetData(flyCommonSelectParams_a.progId,flyCommonSelectParams_a.preReq,queryValue,"query",flyCommonSelectParams_a.sql,1,flyCommonSelectParams_a.orderBy);
	
	commonSelectShowData(str,1);
}
/**
   * 查询取数。从后台取得弹窗选择数据         
   
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应条件值，如不传递则nbsp，返回则传递相应值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空
   * @ model       选择模式，pc端All，第一次查询，取得页面显示信息，如标题、列表表头等。
   * @ sql         特殊情况时加入自己需要的sql
   * @ pageNo      查询页码
   * @ orderBy     排序语句
   * @ progType    程序类别，App，为手机端查询，只返回值部分，不返回页面显示信息，如标题、列表表头等。
   
   * @return 
   */
function commonSelectGetData(progId,preReq,query,model,sql,pageNo,orderBy,progType){		
	
	 var info = "progId="+progId+"&preReq="+preReq+"&query="+query+"&model="+model+"&sql="+sql+"&pageNo="+pageNo+"&orderBy="+orderBy;
	 
	 var queryFlag = (pageNo==1 || pageNo=="1") ? "ListQuery" : "TurnPage";
	 
	 //app访问，加后缀，后台只取得返回值数据。
	 if(progType && progType=="App")
	    queryFlag = queryFlag +"App"; 
	    
	 //返回str：内容;
	 var str = getHttpResponse("/fwis/mssl/flyCommonSelectSrv",queryFlag,info); 
	 
	 //alert(str);
	 
	 return str;
}

/**
   * 显示。将从后台取得的数据显示在前台.对翻页、查询数据。    
   * @lineObj 线条对象   
   * @return 
   */
function commonSelectShowData(str,pageNo){	
	
	var table = document.getElementById('flyCommonSelectTableList');
	
	if(!str || str.indexOf("|")<1) {  
		
		var m = table.childNodes.length;//行数
		for(var i=0;i<m-1;i++)
		  table.removeChild(table.lastChild); 	
		  
		return;
	}
	
	var arr = str.split("|");
	
	//处理以,分割的返回值。
	var pArr = new Array();
	var m = 0;
	
	if(arr[0].indexOf(",")>0){
		
		 pArr = arr[0].split(",");
		 
		 m = 1;
	}else {
		
		 pArr = [arr[0],arr[1]];
		 
		 m = 2;		
	}
	   
	
	var node = table.getElementsByTagName("tr")[0].cloneNode(true);
	
	//var n = table.getElementsByTagName("tr")[0].childNodes.length;//列数
	
	var n = node.childNodes.length;//列数
	
	//alert(table.firstChild.tagName);
	var dataList = "";
	var model = "ondblclick='commonSelectSel(this);'";
	
	if(flyCommonSelectParams_a.selModel == "multiple") 
     model = "onClick='commonSelectMulti(this);'";
    
	
	//表格信息行
	for(var i=m;i<arr.length;i=i+n+1){	 	
	 	
	 	 dataList+= "<tr id='"+arr[i]+"' "+model+">";	 	 
	 	
	 	 for(var j=0;j<n;j++)	
	 	   dataList+= "<td>"+arr[i+j+1]+"</td>";
	 	   
	 	 dataList+= "</tr>";	 	
	}	
	
	//var node = table.firstChild.cloneNode(true);
	
	table.innerHTML = dataList;
	table.insertBefore(node,table.firstChild);
	
	//设置页码
	commonSelectSetPage(pageNo,pArr[0],pArr[1]);
	
	return;
}
/**
   * 双击取值返回      
   * @return 
   */
function commonSelectSel(obj){	
	
	//alert(obj.id);
	
	var arr1 = obj.id.split(",");
	var arr2 = flyCommonSelectParams_a.backValue.split("|");
	
	var arr = new Array();	
	
	for(var i=0;i<arr1.length;i++){	
		
		if(arr2[i]=="1")
		   arr.push(arr1[i]);		   
	}	
	
	if(flyCommonSelectParams_a.backFun!="") {	  	
	  	 
     eval( "var _function = " + flyCommonSelectParams_a.backFun);
     _function(arr,flyCommonSelectParams_a.receiveObj);
	}	
	
	//commonSelectBackValue(arr);
	
	commonSelectClose();
	
	return;
}
/**
   * 多选情况下，点击确定按钮，取值返回      
   * @return 
   */
function commonSelectMultiSel(){	
	
	//alert(obj.id);
	var arr0 = new Array();
	var arr = new Array();	
	var arr1 = new Array();
	var arr2 = flyCommonSelectParams_a.backValue.split("|");
	
	var objLabel = document.getElementById("commonselectSelSpan").getElementsByTagName("label");	
	
	for(var j=0;j<objLabel.length;j++){	
	
	   arr1 = objLabel[j].id.split(",");
	   arr = new Array();	
	   
	   for(var i=0;i<arr1.length;i++){	
		
		   if(arr2[i]=="1")
		     arr.push(arr1[i]);		   
	   }	
	   
	   arr0.push(arr);
  }  
  
	if(flyCommonSelectParams_a.backFun!="") {	  	
	  	 
     eval( "var _function = " + flyCommonSelectParams_a.backFun);
     _function(arr0,flyCommonSelectParams_a.receiveObj);
	}		
	
	commonSelectClose();
	
	return;
}
/**
   * 单击取值添加到选中区      
   * @return 
   */
function commonSelectMulti(obj){	
	
	var objSpan = document.getElementById("commonselectSelSpan");
	
	var objLabel = 	objSpan.getElementsByTagName("label");	
	
	for(var i=0;i<objLabel.length;i++)		
		 if(obj.id==objLabel[i].id)
		    return;	
	
	var arr = obj.id.split(",");
	
	var selLabel = document.createElement("label"); 
  selLabel.id = obj.id;
  selLabel.innerHTML = arr[arr.length-1]+"<a href='#' onClick='commonSelectDelSelected(this);'>╳</a>";
  
  objSpan.appendChild(selLabel);
  
  //选中将字体颜色置为红色
  for (var i=0;i<obj.cells.length;i++ )
      obj.cells[i].style.color = "red";
  
 
	return;
}
  /**
   *  删除已选择项
   *  @return 
   */
function commonSelectDelSelected(obj){		
	
	obj.parentNode.parentNode.removeChild(obj.parentNode);	
}
 /**
   * 设置页码区域显示。
   * @param pageNo    页码  
   * @param pageCount 总页数
   * @param dataCount 数据总条数 
   * @return 
   */
function commonSelectSetPage(pageNo,pageCount,dataCount){	
	
	//alert(pageNo+"; "+pageCount+"; "+dataCount);
	
	if(pageCount.toString().trim().length>0)
	   document.getElementById("commonSelectPageCount").innerHTML = pageCount;	
	if(dataCount.toString().trim().length>0)
	   document.getElementById("commonSelectDataCount").innerHTML = dataCount;	
	if(pageNo.toString().trim().length>0)
	   document.getElementById("commonSelectTurnToNum").value = pageNo;	
	
	//设置翻页按钮 
  commonSelectSetPageNo(pageNo,pageCount);
	
	return;
}
 /**
   * 设置翻页按钮 
   * @param pageNo    页码
   * @param pageCount 总页数   
   * @return 
   */
function commonSelectSetPageNo(pageNo,pageCount){	
	
	var pn = parseInt(pageNo);
	
	if(pageCount.toString().trim().length<1)
	   pageCount = document.getElementById("commonSelectPageCount").innerHTML;	
	var pc = parseInt(pageCount);
	
	var obj = document.getElementById("commonSelectTurnPage").getElementsByTagName("a");
	
	obj[0].style.display = "inline-block";
	obj[1].style.display = "inline-block";		
	obj[2].style.display = "inline-block";	
	
	obj[0].className = "";
	obj[1].className = "";
	obj[2].className = "";
	
	if(pc==0 || pc==1) {
		
		obj[0].innerHTML = "1";
		obj[0].className = "active";
		
		obj[1].style.display = "none";
		obj[2].style.display = "none";		
		
	}else if (pc==2){
		
		obj[0].innerHTML = "1";
		obj[1].innerHTML = "2";
		obj[2].style.display = "none";	
		
		if(pn==1)
		   obj[0].className = "active";
		else 
		   obj[1].className = "active";
		   
	}else if (pc>=3){
		
		if(pn==1){
			
			obj[0].innerHTML = "1";
		  obj[1].innerHTML = "2";
		  obj[2].innerHTML = "3";
		  
		  obj[0].className = "active";
			
		}else if(pn>1 && pn<pc) {
			
			obj[0].innerHTML = pn-1;
		  obj[1].innerHTML = pn;
		  obj[2].innerHTML = pn+1;
		  
		  obj[1].className = "active";
			
		}	else if(pn==pc) {
			
			obj[0].innerHTML = pn-2;
		  obj[1].innerHTML = pn-1;
		  obj[2].innerHTML = pn;
		  
		  obj[2].className = "active";
			
		}		
	}	
	return;
}
/**
   * 翻页.点击按钮翻页
   * @param obj    翻页点击对象或参数      
   * @return 
   */
function commonSelectToPage(obj){	
	
	
	//1、取得当前页
	//2、取得到达页码
	//3、校验是否能翻页：1）点击当前页；2）到达页大于总页数；3）到达页小于1；
	//4、查询数据（查询后会设置页码）	
	
	var toNo = 0;//到达页
	var no = parseInt(commonSelectGetCurrentPageNo());	//当前页
	var pageCount = parseInt(document.getElementById("commonSelectPageCount").innerHTML);//总页数
	  
  //2、取得到达页码	
	if (typeof(obj) == "string") {//点击翻页键 
		
		if(obj=="U")
		  toNo = no - 1;//上翻到达页
		else if(obj=="D")
		  toNo = no + 1;//下翻到达页
	  else if(obj=="T")
		  toNo = parseInt(document.getElementById("commonSelectTurnToNum").value);//输入页码到达页
		  
	}else {//点击页码		
		
		toNo = parseInt(obj.innerHTML);	//到达页		
	}	
	
	//3、校验是否能翻页：1）点击当前页；2）到达页大于总页数；3）到达页小于1；
	if(no==toNo || toNo>pageCount || toNo<1)
	   return;
	   
	//4、查询数据（查询后会设置页码）
	commonSelectTurnPageQuery(toNo);
	
	//5、复选，将已选内容置红
	commonSelectSetSelFontColor();
}
/**
   * 取得当前页码.    
   * @return 
   */
function commonSelectGetCurrentPageNo(){	
	
	//1、取得当前页
	var aObj = document.getElementById("commonSelectTurnPage").getElementsByTagName("a");
	for(var i=0;i<aObj.length;i++){
		
	  if(aObj[i].className == "active")
	     return aObj[i].innerHTML;	
  }  
	
	return "0";
}
/**
   * 复选，将已选内容置红 
   * @return 
   */
function commonSelectSetSelFontColor(){		
	 
	if(flyCommonSelectParams_a.selModel != "multiple") 
	   return;
	   
	var objLabel = document.getElementById("commonselectSelSpan").getElementsByTagName("label");
	
	if(objLabel.length<1)
	  return;
	  
	var tableObj = document.getElementById("flyCommonSelectTableList");
	
	if(tableObj.rows.length<2)
	  return;
	
	for(var j=1;j<tableObj.rows.length;j++){
		
		 for(var i=0;i<objLabel.length;i++)	{	
		 	
		     if(tableObj.rows[j].id==objLabel[i].id){
		       
		       //选中将字体颜色置为红色
           for (var k=0;k<tableObj.rows[j].cells.length;k++ )
              tableObj.rows[j].cells[k].style.color = "red";
		     }
		 }
	}
	return;
}
/**
   * input弹窗选择的返回值处理方法，都为单选。   
   * 弹窗选择返回二维数组。一维数组中最后一个为显示内容，之前为flyvalue 。  
   * @param arr    弹窗选择返回数组   
   * @param obj    input对象   
   * @return 有修改返回true；没有修改返回false   
   */
function commonSelectSetSelInput(arr,obj){		
	
	var flyvalue = "";
	
	for(var i=0;i<arr.length-1;i++)
	    flyvalue+= "~"+arr[i];
	    
	obj.setAttribute("flyvalue",flyvalue.substring(1)); 
	obj.value = arr[arr.length-1];      
 
  return true;
}
function commonSelectSetSelInput1(arr,obj){	
	
	var flyvalue = "";
	
	for(var i=0;i<arr[0].length-1;i++)
	    flyvalue+= "~"+arr[0][i];
	    
	obj.setAttribute("flyvalue",flyvalue.substring(1)); 
	obj.value = arr[0][arr[0].length-1];      
 
  return true;
}
/**
   * 以下四个个方法为span弹窗选择的处理方法。
   * 1、span弹窗多选回调函数。
   * span框多选时，弹窗选择返回二维数组。每个一维数组中最后一个为label显示内容，全部为 flyvalue 。  
   * @param arr       弹窗选择返回二维数组,或为一维数组 
   * @param obj       span对象  
   * @param delFun    删除方法 
   * @param showFlag  显示标识：E，编辑；S，显示。 
   * @return 有修改返回true；没有修改返回false   
   */
function commonSelectSetSelArrLabel(arr,obj,delFun,showFlag){		
	
	if(!Array.isArray(arr[0])){//如果传递一维数组，处理为二维数组。因为该方法按二维数组处理数据。
		
	   var tem = arr;
	   arr = new Array();
	   
	   arr.push(tem);	   
	}
	//是否实现该方法，如果实现，则增加前调用。主要解决，在页面显示后，调用后台进行选择的内容处理。
	if(isExitsFunction("commonSelectSetSelArrLabelReback")){
		
		if(!commonSelectSetSelArrLabelReback(arr,obj))
		   return;
		
	}
	
	var flyvalue = "";
	var delBut = "";
	
	//没有传递删除方法 ，则使用默认方法
	if(!delFun || delFun.trim().length<1)
	   delFun =  "commonSelectDelSelLabel";
	   
	//显示方式。编辑状态，有删除号，显示状态无
	if(!showFlag || showFlag=="E")
	   delBut = "<a href='#' onClick='"+delFun+"(this,event);'>╳</a>";
	
	for(var i=0;i<arr.length;i++){	
	
	   var labelObj =  document.createElement("label"); 
	   
	   flyvalue = "";
	   for(var j=0;j<arr[i].length;j++)
	      flyvalue+= "⌒"+arr[i][j]; 
 
     labelObj.setAttribute("flyvalue",flyvalue.substring(1)); 
     //labelObj.innerHTML =  arr[i][arr[i].length-1]+"<a href='#' onClick='"+delFun+"(this,event);'>╳</a>";
     labelObj.innerHTML =  arr[i][arr[i].length-1]+delBut;
           
     obj.appendChild(labelObj); 
  } 
  
  //是否实现该方法，如果实现，则增加后调用。主要解决，在页面显示后，调用后台进行选择的内容处理。
	if(isExitsFunction("commonSelectSetSelArrLabelRebackAfter")){
		
		if(!commonSelectSetSelArrLabelRebackAfter(arr,obj))
		   return;
		
	}
  
  return true;
}
/**   
 * 2、span弹窗单选。将选择一个内容时，生成label设置为span内容。    
 * @param obj          span对象
 * @param labelValue   flyvalue值
 * @param labelName    显示名称
 * @return 有修改返回true；没有修改返回false   
 */
function commonSelectSetSelALabel(arr,obj){	
	
	 var labelObj =  document.createElement("label"); 
	 var flyvalue = "";
	   
	 for(var j=0;j<arr.length;j++)
	      flyvalue+= "⌒"+arr[j];  
 
     labelObj.setAttribute("flyvalue",flyvalue.substring(1)); 
     labelObj.innerHTML =  arr[arr.length-1]+"<a href='#' onClick='commonSelectDelSelLabel(this,event);'>╳</a>";
           
     obj.innerHTML = ""; 
     obj.appendChild(labelObj); 
     
   //是否实现该方法，如果实现，则增加后调用。主要解决，在页面显示后，调用后台进行选择的内容处理。
	  if(isExitsFunction("commonSelectSetSelALabelAfter")){
		
		  if(!commonSelectSetSelALabelAfter(arr,obj))
		     return;
		
	  }
    return true;
}
/**   
   * 3、span弹窗单选。将选择一个内容时，生成label设置为span内容。    
   * @param obj          span对象
   * @param labelValue   flyvalue值
   * @param labelName    显示名称
   * @return 有修改返回true；没有修改返回false   
   */
function commonSelectSetSelLabel(obj,labelValue,labelName){	
	
	var labelObj =  document.createElement("label"); 
 
  labelObj.setAttribute("flyvalue",labelValue+"⌒"+labelName); 
  labelObj.innerHTML =  labelName+"<a href='#' onClick='commonSelectDelSelLabel(this,event);'>╳</a>";
               
  obj.appendChild(labelObj); 
  
  return true;
}

/**
   * 3、span弹窗取得已选择的多选label  
   * 取得已选择的多选label  
   * @param obj          span对象  
   * @return flyvalue以|拼串  
   */
function commonSelectGetSelLabel(obj){	   
   	
  var labelObj = obj.getElementsByTagName("label");
  var tem = "";
 	   	  
 	for (var j=0;j<labelObj.length;j++) 
 	   tem+="|"+labelObj[j].getAttribute("flyvalue");
 	   	
 	tem = (tem.length>0) ? tem.substring(1) : tem;
	
  return tem;
}
/**
   * 根据附件系统生成的文件名，删除附件区域中的其中一个。该文件名在键值第二个
   * @param attch          附件区域id，或对象
   * @param sysFileName    系统生成的文件名
   * @return 
   */
function commonSelectDelALabelByKey(attch,sysFileName){	
	
	 var obj = "";
	 var tem = "";
	 var arr = new Array();
	 
	 if (typeof(attch) == "string") 
	       obj = document.getElementById(attch);
	 else if (typeof(attch) == "object")
	   	   obj = attch;
	   	   
	 var labelObj = obj.getElementsByTagName("label");   
 	   	  
 	 for (var j=0;j<labelObj.length;j++) {
 	 	
 	    arr = labelObj[j].getAttribute("flyvalue").split("⌒");
 	    
 	    if(arr[1]==sysFileName){
 	       obj.removeChild(labelObj[j]); 
 	       break;
 	    }
	 }	   
	 return;
}
/**
   * 4、span弹窗删除多选的label对象  
   * @param obj          label   
   * @return 有修改返回true；没有修改返回false   
   */
function commonSelectDelSelLabel(obj,e){	
	
	var spanObj = obj.parentNode.parentNode;//span对象，为删除后调用传回对象。
	
	commonSelectStopbubble(e);//阻止冒泡 
	
	//是否实现该方法，如果实现，则在删除前调用。主要解决，在删除页面显示时，调用后台进行实际文件删除。
	if(isExitsFunction("commonSelectDelSelLabelData")){
		
		if(!commonSelectDelSelLabelData(obj.parentNode))
		   return;
		
	}
	
	obj.parentNode.parentNode.removeChild(obj.parentNode);		
	
	//是否实现该方法，如果实现，则在删除后调用。
	if(isExitsFunction("commonSelectDelSelLabelDataAfter")){
		
		if(!commonSelectDelSelLabelDataAfter(spanObj))
		   return;
		
	}
	
	return;
}
/**
   * 阻止冒泡
   * @param event onclick事件 
   * @return 
   */
function commonSelectStopbubble(event){
	
    var event = event||window.event;        //兼容火狐
    if(event.stopPropagation){
        event.stopPropagation();            //标准浏览器
    }else{
        event.cancaleBubble==true;          //老ie
    }
} 
	/**
   * 通用下拉列表select,value字段，可多个时，返回时以,分割。显示字段，多个时，显示时以空格分割
     commonSelectInit(progId,preReq,query,selectId,dv)
     @ 参数说明:     
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应前置条件值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空。根据定义，对应搜索值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ selectId    当前select对象id，不可为空
   * @ dv          defaultValue 默认值，可为空。  
   * @ initInfo    当前select对象的初始化选项，如"<option value=''>---请选择---</option>" 
   * @return     
   */	
function commonSelectInit(progId,preReq,query,selectId,dv,initInfo){	
	
	var selectObj = "";   
 	
 	if (typeof(selectId) == "string") {
	   selectObj = document.getElementById(selectId);
	}else
		 selectObj = selectId;		 
	
	if(selectObj.options.length>1)
	    return;
	
	var info = "progId="+progId+"&preReq="+preReq+"&query="+query;
	 
	//返回str：显示字段数量+"|"+value值+"|"+显示内容;	 
	var str = getHttpResponse("/fwis/mssl/flyCommonSelectSrv","select",info); 	 
	
	//alert(str);
	
	selectObj.innerHTML = commonSelectCreateOption(str,initInfo,dv);	
	
	/*
	if(!str || str.indexOf("|")<1)
	   return;
	
	var arr = str.split("|");
	
	var n = parseInt(arr[0]);//显示字段数量		
	
	var option = selectObj.innerHTML;
	var sel = "";
	var selText = "";
	
	for(var i=1;i<arr.length;i=i+n+1){  
		
		if(dv.length>1 && arr[i].indexOf(dv)>-1)
		  sel = "selected";
		  
		selText = "";
		for(var j=1;j<=n;j++)
		  selText+= "  "+arr[i+j];
		  
		option+= "<option value='"+arr[i]+"' "+sel+">"+selText.substring(2)+"</option>";
		
	}*/
	
	
	//alert(selectObj.length);
	
	//selectObj.size=selectObj.length;
	
	//selectObj.focus();
	
	  //var event = document.createEvent('MouseEvents');
	  
    //event.initEvent('mousedown',false,true);
    
   
    //event.eventType = 'message';
    //selectObj.dispatchEvent(event);
	  // alert(event.type);
	return;
}
	/**
   * 通用下拉列表select,value字段，可多个时，返回时以,分割。显示字段，多个时，显示时以空格分割
     commonSelectInit(progId,preReq,query,selectId,dv)
     @ 参数说明:     
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应前置条件值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空。根据定义，对应搜索值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ initInfo    当前select对象的初始化选项，如"<option value=''>---请选择---</option>"
   * @ dv          defaultValue 默认值，可为空。   
   * @return     
   */	
function commonSelectOptionInit(progId,preReq,query,initInfo,dv){	

	var info = "progId="+progId+"&preReq="+preReq+"&query="+query;
	 
	//返回str：显示字段数量+"|"+value值+"|"+显示内容;	 
	var str = getHttpResponse("/fwis/mssl/flyCommonSelectSrv","select",info); 	 
	
	return commonSelectCreateOption(str,initInfo,dv);	
}
	/**
   * 生成页面的下拉列表。通过页面select的id，与拼串内容。
    
     @ 参数说明:     
   * @ selectId    页面select的id
   * @ strValue    下拉列表内容，以|拼串。第一个为text显示数量，往后为value，和text。每个option，一个value，可多个text（依次以|拼串，具体数量在第一个定义）
   * @ initInfo    当前select对象的初始化选项，如"<option value=''>---请选择---</option>"
   * @ dv          defaultValue 默认值，可为空。   
   * @return     
   */	
function commonSelectCreateSelect(selectId,strValue,initInfo,dv){	
	
	var selOptions = commonSelectCreateOption(strValue,initInfo,dv);
	
	document.getElementById(selectId).innerHTML = selOptions;

	return;
}
	/**
   * 生成通用下拉列表select的option。根据以|拼串的字符串。
     
     @ 参数说明:     
   * @ strValue    下拉列表内容，以|拼串。第一个为text显示数量，往后为value，和text。每个option，一个value，可多个text（依次以|拼串，具体数量在第一个定义）
   * @ initInfo    当前select对象的初始化选项，如"<option value=''>---请选择---</option>"
   * @ dv          defaultValue 默认值，可为空。   
   * @return     
   */	
function commonSelectCreateOption(strValue,initInfo,dv){
	 
	if(!strValue || strValue.indexOf("|")<1){
		
		if(!initInfo)		
		   initInfo = "";
		   
	  return initInfo;
	}
	var arr = strValue.split("|");
	
	var n = parseInt(arr[0]);//显示text字段数量	
	
	var option = "";
	var sel = "";
	var selText = "";
	
	if(initInfo && initInfo.trim().length>1)
	   option = initInfo;
	
	for(var i=1;i<arr.length;i=i+n+1){  
		
		sel = "";
		//if(dv.length>1 && arr[i].indexOf(dv)>-1)
		if(dv.length>1 && arr[i].trim()==dv)
		  sel = "selected";
		  
		selText = "";
		for(var j=1;j<=n;j++)
		  selText+= "  "+arr[i+j];
		  
		//如果value是以‘,’分割的多个字段，则以‘~’替代所有‘,’
		if(arr[i].indexOf(",")>-1)
		   arr[i] = arr[i].replace(/,/g,"~")
		  
		option+= "<option value='"+arr[i]+"' "+sel+">"+selText.substring(2)+"</option>";
		
	}	
	return option;
}
/**
   * app通用下拉列表div,value字段，可多个时，返回时以,分割。显示字段，多个时，显示时以空格分割
     commonSelectInit(progId,preReq,query,selectId,dv)
     @ 参数说明:     
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应前置条件值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空。根据定义，对应搜索值如果定义多个，如果不传递全部，则不传的设置为nbsp，传的则设置为实际值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ selectId    当前select对象id，不可为空
   * @ dv          defaultValue 默认值，可为空。  
   * @ initInfo    当前select对象的初始化选项，如"<option value=''>---请选择---</option>" 
   * @return     
   */	
function commonSelectAppSelectInit(progId,preReq,query,selectId,dv,initInfo,bakFun){	
	
	  var info = "progId="+progId+"&preReq="+preReq+"&query="+query;
	 
	  //返回str：显示字段数量+"|"+value值+"|"+显示内容;	 
	  var str = getHttpResponse("/fwis/mssl/flyCommonSelectSrv","select",info); 	
	  
	  if(!str || str.indexOf("|")<1)		
	     return;	 
 	
	  var selectObj = "";   
	  var option = "";
	  var sel = "";
	  var selText = "";
	  var divLi = "";
	  
	  //下拉对象
	  if (typeof(selectId) == "string") {
	      selectObj = document.getElementById(selectId);
	  }else
		    selectObj = selectId;		 
	
	  var arr = str.split("|");
	
	  var n = parseInt(arr[0]);//显示text字段数量	
	  
	  if(initInfo && initInfo.trim().length>1)
	     option = initInfo;
	   	
		selectObj.parentElement.previousElementSibling.value = arr[2];
		selectObj.parentElement.previousElementSibling.setAttribute("flyvalue",arr[1]); 
	
	  for(var i=1;i<arr.length;i=i+n+1){  
		
		   sel = "";
		  
		   selText = "";
		   for(var j=1;j<=n;j++)
		      selText+= "  "+arr[i+j];
		  
		   //如果value是以‘,’分割的多个字段，则以‘~’替代所有‘,’
		   if(arr[i].indexOf(",")>-1)
		     arr[i] = arr[i].replace(/,/g,"~")
		   
		   //赋默认值
		   if(dv.length>1 && arr[i].trim()==dv){
		   	
		      selectObj.parentElement.previousElementSibling.value=selText.substring(2);
		      selectObj.parentElement.previousElementSibling.setAttribute("flyvalue",arr[i]); 
		   
		   }
		   
		   //创建下拉div
		   divLi =  document.createElement("div"); 
		   divLi.setAttribute("flyvalue",arr[i]); ;
		   divLi.innerHTML = selText.substring(2);
		   
		    //添加下拉div选中事件
		   divLi.addEventListener('click', function (e) {
		   	
         e.cancelBubble = true;
         e.stopPropagation();
        
         this.parentElement.parentElement.previousElementSibling.value=this.innerHTML;
         this.parentElement.parentElement.previousElementSibling.setAttribute("flyvalue",this.getAttribute("flyvalue")); 
         this.parentElement.style.display="none";
         this.parentElement.parentElement.style.display="none";
         
         if(bakFun && isExitsFunction(bakFun)){
         	
         	    eval( "var _function = " + bakFun );
              _function(this.parentElement.parentElement.previousElementSibling);         	
         }
            
       })
       
       selectObj.appendChild(divLi); 
		   
		   //option+= "<option value='"+arr[i]+"' "+sel+">"+selText.substring(2)+"</option>";		
    }	
    
    //添加下拉div取消事件
    divLi =  document.createElement("p"); 
    divLi.className = "quxiao";		
		divLi.innerHTML = "取消";
		
		//添加下拉p取消选中事件
		divLi.addEventListener('click', function (e) {
		   	
      e.cancelBubble = true;
      e.stopPropagation();
      
      this.parentElement.style.display="none";
      this.parentElement.parentElement.style.display="none";
    })
		
		selectObj.appendChild(divLi); 
}
/**
   * app静态通用下拉列表。固定字段的下拉列表
    
     @ 参数说明:     
   * @ obj     下拉对象
   * @ bakFun  回调函数
  
   * @return     
   */	
function commonSelectAppStaticSelectInit(obj,bakFun){	
	
	  var selectObj = "";   
	  
	 //下拉对象
	  if (typeof(obj) == "string") {
	      selectObj = document.getElementById(obj);
	  }else
		    selectObj = obj;		 
	
	 //下拉添加事件
	 var divSelect = selectObj.getElementsByTagName("div");	 
	 
	 divSelect = Array.from(divSelect);
	 
	 divSelect.forEach(element => {
    element.addEventListener('click', function (e) {
    	
         e.cancelBubble = true;
         e.stopPropagation();
        
         element.parentElement.parentElement.previousElementSibling.value=element.innerHTML;
         element.parentElement.parentElement.previousElementSibling.setAttribute("flyvalue",element.getAttribute("flyvalue")); 
         element.parentElement.style.display="none";
         element.parentElement.parentElement.style.display="none";
         
         if(bakFun && isExitsFunction(bakFun)){
         	
         	    eval( "var _function = " + bakFun );
              _function(this.parentElement.parentElement.previousElementSibling);         	
         }
    })
   })
   
   //添加取消按钮和事件 
    var divLi =  document.createElement("p"); 
    divLi.className = "quxiao";		
		divLi.innerHTML = "取消";
		
		//添加下拉p取消选中事件
		divLi.addEventListener('click', function (e) {
		   	
      e.cancelBubble = true;
      e.stopPropagation();
      
      this.parentElement.style.display="none";
      this.parentElement.parentElement.style.display="none";
    })
		
		selectObj.appendChild(divLi); 		
}
/**
   * 弹窗页面选择
   
   * @ progId      选择程序代码，不可为空
   * @ preReq      选择程序前置条件，可为空。根据定义，对应条件值，如不传递则nbsp，返回则传递相应值，如nbsp|001|T03。则传递第二、第三个值，第一个不传递。
   * @ query       选择程序查询条件，可为空
   * @ backValue   返回值拼串。根据定义，对应返回值，0不返回，1返回。如"1|0|1"，则返回第一个和第三个值。     
   * @ backFun     返回值调用的函数。   
   * @ selMode     选择模式，S，单选；M，多选
   * @ sql         特殊情况时加入自己需要的sql     
   * @ receiveObj  接收返回值对象      
   * @ orderBy     排序语句
   * @ showModel   显示模式。A，一行内容2个值，一个左对齐、一个右对齐；T，两行，4个值，每行2个。不够显示值的，以空
   * @ showValue   显示字段。如果为定义的下拉列表选择，为SELECT；
                   如果为定义的弹窗选择，将显示数据序号转为整数数组，显示的数字不为零，为返回拼串拆分数组的序号。如5|0|3|0|1，则第一个显示为
                   第5个内容，第二个不显示，第二个显示为第3个内容

   * @ return      单选，返回一个数组[];多选返回二维数组，[[],[],[]]，数组中每个数组是选中的一个值。
   */
function commonSelectAppPageInit(progId,preReq,query,backValue,backFun,selModel,sql,receiveObj,orderBy,showModel,showValue){		
	 
	 if(!orderBy)
	    orderBy = "";    
	    
	 flyCommonSelectParams_a.progId = progId;
   flyCommonSelectParams_a.preReq = preReq;
   flyCommonSelectParams_a.backValue = backValue;
   flyCommonSelectParams_a.backFun = backFun; //返回值调用函数
   flyCommonSelectParams_a.selModel = selModel;
   flyCommonSelectParams_a.sql = sql;
   flyCommonSelectParams_a.receiveObj = receiveObj;
   flyCommonSelectParams_a.orderBy = orderBy;
   flyCommonSelectParams_a.showModel = showModel;
   flyCommonSelectParams_a.showValue = showValue;
   flyCommonSelectParams_a.pageNo = 1; //当前页码
   flyCommonSelectParams_a.pageCount = 0;//页数
   flyCommonSelectParams_a.listCount = 0;//记录数
	    
	 var multipleStr = "";
	 var confirmBut = "";
	 var queryInputWidth = "90%";
	 
	 var str = commonSelectGetData(progId,preReq,query,"",sql,1,orderBy,"App"); 	
	
   //多选区域
   if(selModel == "multiple") {  	
   	   multipleStr =  "<div class='h-160 shearchInfo'><span  id='flyCommonSelectAppMultiSpan'></span></div>";
       confirmBut = "<button class='qd-btn' onclick='commonSelectAppMultiSelOk()'>确认</button>";
       queryInputWidth = "70%";
   }
   
   
   var  pageStr = "<div class='h-120'>"
    +"<span>出差人员</span>"
    +"<span class='wd-30 mulSelShow'  level='' flyvalue='0'>tankuang</span>"
    +"<div class='hei' id='mulSel' style='display: block'>"
      +"<div class='examine1' id='mulSelChild' style='display: block;'>"
          +"<div class='h-150 searchDiv'>"
              +"<input type='text' id='flyCommonSelectAppQueryValue' style='width: "+queryInputWidth+";' placeholder='中文/拼音/首字母'>"
              + confirmBut
          +"</div>"
          
          + multipleStr //多选区域
          
          +"<div  id='flyCommonSelectAppDataShow' class='searchPeople'>"
              
          +"</div>"
      +"</div>"
  +"</div>"
  +"<span class='iconfont icon-z043'></span>"
+"</div>";
   
   var selPage  = document.createElement("div"); 
	 selPage.id = "commonSelectAppLayer";	 
	 selPage.className = "h-120";	 
	 selPage.innerHTML = pageStr;
	 
   document.getElementsByTagName("body")[0].appendChild(selPage);  
 	
 	 //显示数据
	 commonSelectAppShowData(str,1);
	
  // commonSelectCreatePage(arr[0],arr[1],arr[2],arr[3],pageWidth,pageHeigth,fromLeft,fromTop);
	 
	 return;	
}
/**
   * 显示。将从后台取得的数据显示在前台.对翻页、查询数据。    
   * @dataStr 显示数据  
   * @pageNo  当前页码
   * @return 
   */
function commonSelectAppShowData(dataStr,pageNo){	
	
	var dataDiv = document.getElementById('flyCommonSelectAppDataShow');
	
	if(!dataStr || dataStr.indexOf("|")<1) 		
		return;	
	
	var str = "";
	var tem = new Array();
	
	var arr = dataStr.split("|");
	
  var n = (pageNo==1) ? 1 : 2;
  
  //设置选择事件
  var selEvent = "onclick='commonSelectAppSel(this);'";	
	if(flyCommonSelectParams_a.selModel == "multiple") 
     selEvent = "onClick='commonSelectAppMultiSel(this);'";

  //将显示数据序号转为整数数组，显示的数字不为零，为返回拼串拆分数组的序号。如5|0|3|0|1，则第一个显示为
  //第5个内容，第二个不显示，第二个显示为第3个内容
  var orderArr = flyCommonSelectParams_a.showValue.split("|");  
  for(var i=0;i<orderArr.length;i++)
     orderArr[i] = parseInt(orderArr[i]);

  //显示数据 
  for(var i=n;i<arr.length;i=i+1){ 
      
     str+= "<div flyvalue='"+arr[i]+"' "+selEvent+">";

     tem = arr[i].split(",");  
               
     for(var j=0;j<orderArr.length;j++){

        if(orderArr[j]!=0) 
           str+= "<span>"+tem[orderArr[j]]+"</span>";     
     }
     str+= "</div>";
       
  }		
  //alert(str);
	dataDiv.innerHTML = dataDiv.innerHTML + str;
	
	//设置页码
	flyCommonSelectParams_a.pageNo = pageNo;//当前页码
	if(pageNo==1){
		
		 tem = arr[0].split(",");  
     flyCommonSelectParams_a.pageCount = parseInt(tem[0]);//页数
     flyCommonSelectParams_a.listCount = parseInt(tem[1]);//记录数
	}
	
	return;
}
/**
   * 翻页。
   * @param pageNo   翻页页码
   * @return 
   */
function commonSelectAppTurnPageQuery(pageNo){	
	
	var queryValue = document.getElementById('flyCommonSelectAppQueryValue').value;
	
	var str = commonSelectGetData(flyCommonSelectParams_a.progId,flyCommonSelectParams_a.preReq,queryValue,"query",flyCommonSelectParams_a.sql,pageNo,flyCommonSelectParams_a.orderBy,"App");
	
	commonSelectAppShowData(str,pageNo);
	
	return;	
}
/**
   * 单选，点击取值并返回      
   * @return 
   */
function commonSelectAppSel(obj){	
	
	var arr1 = obj.getAttribute("flyvalue").split(",");
	var arr2 = flyCommonSelectParams_a.backValue.split("|");
	
	var arr = new Array();	
	
	for(var i=0;i<arr1.length;i++){	
		
		if(arr2[i]=="1")
		   arr.push(arr1[i]);		   
	}	
	
	if(flyCommonSelectParams_a.backFun!="") {	  	
	  	 
     eval( "var _function = " + flyCommonSelectParams_a.backFun);
     _function(arr,flyCommonSelectParams_a.receiveObj);
	}	
	
	commonSelectAppClose();
	
	return;
}
/**
   * 多选情况下，单击取值添加到选中区      
   * @return 
   */
function commonSelectAppMultiSel(obj){	
	
	var labelId = obj.getAttribute("flyvalue");
	
	var objSpan = document.getElementById("flyCommonSelectAppMultiSpan");
	
	var objLabel = 	objSpan.getElementsByTagName("label");	
	
	//如果重复选择，则返回，不添加到显示区
	for(var i=0;i<objLabel.length;i++)		
		 if(labelId==objLabel[i].id)
		    return;	
	
	var arr = labelId.split(",");
	
	var selLabel = document.createElement("label"); 
  selLabel.id = labelId;
  selLabel.innerHTML = arr[arr.length-1]+"<a href='#' onClick='commonSelectDelSelected(this);'>╳</a>";
  
  objSpan.appendChild(selLabel);
  
  /*
  //选中将字体颜色置为红色
  for (var i=0;i<obj.cells.length;i++ )
      obj.cells[i].style.color = "red";
  */
 
	return;
}
/**
   * 多选情况下，点击确定按钮，取值返回      
   * @return 
   */
function commonSelectAppMultiSelOk(){	
	
	var arr0 = new Array();
	var arr = new Array();	
	var arr1 = new Array();
	var arr2 = flyCommonSelectParams_a.backValue.split("|");
	
	var objLabel = document.getElementById("flyCommonSelectAppMultiSpan").getElementsByTagName("label");	
	
	for(var j=0;j<objLabel.length;j++){	
	
	   arr1 = objLabel[j].id.split(",");
	   arr = new Array();	
	   
	   for(var i=0;i<arr1.length;i++){	
		
		   if(arr2[i]=="1")
		     arr.push(arr1[i]);		   
	   }	
	   
	   arr0.push(arr);
  }  
  
	if(flyCommonSelectParams_a.backFun!="") {	  	
	  	 
     eval( "var _function = " + flyCommonSelectParams_a.backFun);
     _function(arr0,flyCommonSelectParams_a.receiveObj);
	}		
	
	commonSelectAppClose();
	
	return;
}
//多选，点击确认，返回多选值
function flyCommonSelectAppMultiSelConfirm(){ 

    var obj = document.getElementById('flyCommonSelectAppMultiSpan');
    
    obj.parentNode.removeChild(obj);
    //document.getElementById('commonSelectAppLayer').style.display="none";
}
//关闭app弹窗选择页面 flyCommonSelectAppMultiSelConfirm
function commonSelectAppClose(){ 

    var obj = document.getElementById('commonSelectAppLayer');
    obj.parentNode.removeChild(obj);
    //document.getElementById('commonSelectAppLayer').style.display="none";
}
function showDropdown(element){ 

    var event = document.createEvent('MouseEvents');

    event.initMouseEvent('mousedown',true,true,window);

    element.dispatchEvent(event);
}
