/**
 * Flywings. Created by hzy on 2019/1/17.Beijing WideSky Science Technology Information Co. Ltd。
 
 * 通用表单取数、显示、设置等
 */
 
 /**
 
checkListObj.parentNode.removeChild(checkListObj); 

document.getElementById('opButtons').innerHTML = "";

var obj = document.getElementById("pageFlag_a");

var form1 = document.getElementById("editForm").getElementsByTagName("*");

var liNum = ulObj.childNodes.length;
  
userStr+= "|"+ulObj.childNodes[i].firstChild.title;	

	var navNode = obj.firstChild.firstChild;//topNav
	navNode.nextElementSibling.style.display="none";//queryNav
	document.body.style.overflow = '';
	document.getElementById("shadeLay").style.display="none";
	navNode.style.display="block";	//topNav
  navNode.nextElementSibling.nextElementSibling.style.display="block";	//queryView
  obj.firstChild.nextElementSibling.style.marginTop="98px";	
  
  	obj.previousElementSibling.previousElementSibling.style.display="none";	//topNav
	obj.style.display="none";	//queryView
	obj.previousElementSibling.style.display="block";//queryNav
	obj.parentNode.nextElementSibling.style.marginTop="52px";	//item_select_page
	
  在用户注册的时候，常常用户点击文字就需要将光标聚焦到对应的表单上面，这个是怎么实现的呢？就是下面我要介绍的<label>标签的for属性
  定义：for 属性规定 label 与哪个表单元素绑定

  <label for="SSN">Social Security Number:</label>
  <input type="text" name="SocSecNum" id="SSn" />
  
  <td><label for="_boy">性别：</label></td>
	<td>
		<label><input type="radio" value="boy" name="sex" id="_boy">boy</label>
		<label><input type="radio" value="girl" name="sex">girl</label>
	</td>
 */
 
/**
 
 * 通用表单标识说明：
 
  * flyflag： 取值标识，必设项.每一个取值或显示的html标签都必须设置这个属性：
               0，取标签value值；
               1，取属性flyvalue值；显示分隔符最后一个字符串、设置flyvalue；
               2，取标签value值、和属性flyvalue值；flyvalue值以~拼串。
               3，不取值，新增和修改显示，显示不显示。如必选项*，选择图片，序号等
               4，该标签下面的多个span取值，以~拼串。解决多选取值，如人员多选、部门多选、多个附件。
               5，该标签下面的多个input、select等取值，每个表单值以^拼串,表单值中的内容以~拼串，内容中的值以§拼串。解决动态增加内容，如弹出面板进行增加 。
               6，该标签为段落标签，下面为该段落的多个字段信息，input、select等取值，
               7，该标签为分割线标签，取值时取得该flyvalue的分割线，显示的时候不显示,只取值，不显示。
               8，select标签,取值只取value值，显示只显示text值。0的时候，取value~text
               9，隐藏值标签,只取得、设置属性flyvalue值；
              10，只显示，不取值；只赋值不取值。
              11，隐藏值hidden标签,只取value值，不显示。
              12，打开关闭按钮。
                  取值：flyvalue值；
                  只读显示：1）设置flyvalue值为Y或N。2）设置revisable='1'.3)根据Y或N，显示对应按钮
                  编辑显示：1）设置flyvalue值为Y或N。2）设置revisable='0'.3)根据Y或N，显示对应按钮
              13，radio,单选框。 取值，选中：Y~value；不选中：N~value；
                                赋值：checked，Y选中N不选中，value
              14，select标签。取值，同flag='0'
                              赋编辑值：生成option，加到select对象
                              显示值：同flag='2'
              15,只取值，不赋值。一般用于查询条件，即只取查询值，不重置。
              16,显示table表格有合并行rowspan的table数据。
              17,合并行跳过非合并行数据。因为后台查询时，将重复的合并行数据也一并查询出来，所以显示时，非合并行要跳过这些数据。
	               flyflag=17，跳过合并行的数据。有多少个合并行，就跳过多少个.
	            18,非flyflag标识进行显示，在该区域内，以flyshow标识显示。flyshow的值同flyflag值显示方式。
	                flyshow值： 0,1,2,3,4,9,10，显示同flyflag标识显示方式
	            19,无论是编辑还是显示，都按只读显示.innerHTML方式显示。
	            20，无论是编辑还是显示，都按只读显示.innerHTML方式显示，且设置flyvalue，类似flyflag=2。
              
              
   * flyvalue：取值属性，选设项
               1）解决没有value的标签赋值、取值,如span、div等
               2）有value的，还要取键值，如input选择岗位，value赋值岗位名称，flyvalue赋值岗位代码
               
   * flyupd： 修改标识，选设项
               0，非末级不可修改；
               1，不可修改
               2，新增、修改都不可编辑.即不操作。
               3, 可修改，在处理显示表单时，直接显示为可修改。flyupd=3的表单可修改，其他不可修改
               4，可修改，但显示时不直接显示为修改，在点击修改时，转变为修改状态。
               5，修改中用到的或显示的表单，但不可修改。
               6，修改标识，标识该行为修改行，或该表单为修改表单
               
               其他级次，定义。
   * flytype： 字段类型。一般定义特殊类型。
               0，序号。
               1，图片。
               amt,新增行清空标识
               no，行没有序号.
               sum，行为合计行.
               
               
   * 间隔符： 
   字段值之间拼串： |，一级；^，二级；~，三级；⌒，四级（一般span内label的flyvalue与name之间的拼串）  
   各个块数据之间拼串：~^~,一级；々，二级；§，三级；
 */
 

 /**
   * 清除table一行数据。序号列不清空
   * @param trObj  一个table行对象
   * @return 
   */
function flyFormDataPageClearATrObj(trObj){	

  var flyflag = "";
  var flytype = ""; //表单类别，0为序号
  
  var obj = trObj.getElementsByTagName("*");//取得该行所有标签
 	
  for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	  flyflag = obj[i].getAttribute("flyflag"); 
 	  flytype = obj[i].getAttribute("flytype"); 
 	  
 	   	   
 	  if(!flyflag || flyflag.trim().length<1 || (flytype && flytype=="0"))//序号列不清空
 	     continue;
 	     
 	  flyFormDataPageClearAObj(obj[i]); 	  
 	}
}
 /**
   * 清空一个标签对象（重置为空）
   * @param obj  一个标签对象
   * @return 
   */
function flyFormDataPageClearAObj(obj){			
 	  
 	  var flyflag = obj.getAttribute("flyflag"); 
 	   	   
 	  if(!flyflag || flyflag.trim().length<1)
 	     return;
 	     
 	  if(flyflag=="0") {
 	  	   obj.value = "";
 	  }else if(flyflag=="1"){
 	  	   obj.innerHTML = "";
 	       obj.setAttribute("flyvalue",""); 
 	  }else if(flyflag=="2"){
 	  	   obj.value = "";
 	  	   obj.setAttribute("flyvalue","");  	       
    }else if(flyflag=="4"){
    	   obj.innerHTML = "";  	  
    }	
}
/**
   * 显示页面表单数据.显示一个数组内传递过来的具体表单数据。
   * @param idArr      页面对象id值数组   
   * @param dataArr    对应页面对象id显示数据数组。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @param sFlag      显示样式状态：E，编辑状态；S，显示状态。  
     
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyFormDataPageShowTagsData(idArr,dataArr,sFlag){
	
	if(!idArr || !dataArr || idArr.length!=dataArr.length)
	   return false;
	   
	var obj = "";
	var flyflag = "";
	
	for (var i=0;i<idArr.length;i++ ){ 	
		
		 if (typeof(idArr[i]) == "string") 
	       obj = document.getElementById(idArr[i]);
	   else if (typeof(idArr[i]) == "object")
	   	   obj = idArr[i];
	   else return false;
	   	   
	   flyflag = obj.getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11" || flyflag=="7")
 	      continue; 	      
 	      
 	   if(flyflag=="5"){ 	 
 	   	 
 	   	  flyFormDataPageShowListData(obj,dataArr[i],sFlag,"^","~");
       
 	   	  
 	   }else if(flyflag=="18"){ 	 
 	   	 
 	   	  flyFormDataPageShowAppData(obj,dataArr[i],sFlag,"^","~");
 	   	  //flyFormDataPageShowListData(obj,dataArr[i],sFlag,"^","~");
       
 	   	  
 	   }else{
 	   	
 	   	  if(sFlag=="E")
 	   	      flyFormDataPageShowAObjEditData(obj,dataArr[i],"~");//显示一个字段value
 	      else if(sFlag=="S")
 	   	      flyFormDataPageShowAObjReadData(obj,dataArr[i],"~");//显示一个字段value
 	   } 
  }
	return true;	 
}
/**
   * 显示页面表单数据
   * @param sId      页面对象id值,或者对象     段落（指标）所属对象   
   * @param sData    显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @param sFlag    显示样式状态：E，编辑状态；S，显示状态。  
   * @param   mark2   二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                      一级分隔符为 |
       
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyFormDataPageShowData(sId,sData,sFlag,mark2,mark3){		

	//if(!sData || sData.indexOf("|")<0)
	   //return; 
	   
	if(!sData)
	   return; 
	   
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
 
  var objArea = "";  
  var flyflag = "";  
 	var i = 0; 	
 	var arr = new Array();  	
 
  if(pubUtilIsArray(sData))
      arr = sData;
 	else
 		  arr = sData.split("|");	 
 		  //arr = sData.split(mark2);	 
 		  //
 	
 	if (typeof(sId) == "string") {
	   objArea = document.getElementById(sId);  
	}else
		 objArea = sId;
 	
 	//取得所有标签
 	var obj = objArea.getElementsByTagName("*");
 
 	for (var j=0;j<obj.length;j++ ){ 	  
 	
 	  
 	   flyflag = obj[j].getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11" || flyflag=="7" || flyflag=="6" || flyflag=="17")
 	      continue;
 	   
 	   if(flyflag=="5"){ 	 
 	   	 
 	   	  var n = flyFormDataPageShowListData(obj[j],arr[i],sFlag,mark2,mark3)
           
        j = n+j+1; 
 	   	  
 	   }else if(flyflag=="16"){//	有合并行rowspan的table
 	   	 
 	   	  var n = flyFormDataPageShowMergeTable(obj[j],arr[i],sFlag,mark2,mark3)
           
        j = n+j+1; 
 	   	  
 	   }else if(flyflag=="18"){ //手机端app明细显示 
 	   	 
 	   	  var n = flyFormDataPageShowAppData(obj[j],arr[i],sFlag,mark2,mark3);
           
        j = n+j+1; 
 	   	  
 	   }else{
 	   	
 	   	  if(sFlag=="E")
 	   	      flyFormDataPageShowAObjEditData(obj[j],arr[i],mark3);//显示一个字段value
 	      else if(sFlag=="S")
 	   	      flyFormDataPageShowAObjReadData(obj[j],arr[i],mark3);//显示一个字段value
 	   } 
 	      
 	   i++;
 	} 
 	
  return;	
}
/**
   * 显示页面表单数据,不含flyflag=5的表格,同时过滤掉flyflag=3、flyflag=7标签。
   * @param sId      页面对象id值     段落（指标）所属对象   
   * @param sData    显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @param sFlag    显示样式状态：E，编辑状态；S，显示状态。  
   * @param   mark2   二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                      一级分隔符为 |
       
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyFormDataPageNoFlyflag5ShowData(sId,sData,sFlag,mark2,mark3){		

	if(!sData || sData.indexOf(mark2)<0)
	   return; 
 
  var flyflag = "";  
 	var i = 0; 	  
 	
 	var arr = sData.split(mark2);	    
 	
 	//取得所有标签
 	var obj = document.getElementById(sId).getElementsByTagName("*");
 
 	for (var j=0;j<obj.length;j++ ){ 	  
 	
 	  
 	   flyflag = obj[j].getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="5" || flyflag=="7" || flyflag=="17")
 	      continue; 	      
 	  
 	   if(sFlag=="E")
 	   	    flyFormDataPageShowAObjEditData(obj[j],arr[i],mark3);//显示一个字段value
 	   else if(sFlag=="S")
 	   	    flyFormDataPageShowAObjReadData(obj[j],arr[i],mark3);//显示一个字段value
 	   	      
 	   i++;
 	} 
 	
  return;	
}

/**
   * 显示一个动态列表数据。该列表是动态的，flyflag=5的区域表单显示。
   * @param tableObj    页面list列表区对象 
   * @param sData       显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @param   mark2   二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                      一级分隔符为 |  

   * @return 成功返回表单数
   */
function flyFormDataPageShowListData(tableObj,sData,sFlag,mark2,mark3){	
		
	if(!tableObj)
	   return;
	
	if(!sData || sData.trim().length<1)
	   return tableObj.getElementsByTagName("*").length-1;   
	   
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
 
  var flyflag = "";  
  
 	var i = 0; 
 	var j = 0; 	   	
 	
	var arr = sData.split(mark2);	
	
	//var n = tableObj.rows[1].cells.length;//取得列数
	//alert(tableObj.rows.length);
	
	//复制行自定义序号。默认为1，因为有的表头有多行，需要自定义。
	var w = 1;	
	if(isExitsFunction("flyFormDataPageGetTableKeepRowNo"))
	   w = flyFormDataPageGetTableKeepRowNo();	
	   
	//复制行数自定义。默认为1，因为有的表要复制多行，需要自定义。
	var l = 1;	
	if(isExitsFunction("flyFormDataPageGetTableCopyRowNum"))
	   l = flyFormDataPageGetTableCopyRowNum();	
	 
  //取得复制行表单数（编辑或显示）
  var f = flyFormDataPageGetTableRowForms(tableObj,w,l+w-1,sFlag);
  
  //取得复制次数，复制行复制多少次
  var r = arr.length/f;
  
  //alert(r+" ;"+ f);
  
	/*
	var n = tableObj.rows[w].cells.length;//取得列数，按表格最后一行，实际为了确定表单数。
	//alert(n);
	if(sFlag=="E"){
		
		 var inputObj = tableObj.rows[w].cells[n-1].getElementsByTagName("input")[0];
		 if(inputObj && (inputObj.type=="button" || inputObj.type=="BUTTON"))
	      n = n - 1;	//编辑状态有操作列，要减去操作列
	}
	*/
	
	
	flyFormDataPageDelList(tableObj,w+l-1);//删除老数据，重置或有浏览器默认值
	
		
	//是否显示序号，如果默认的首行的第一列的flyflag=3，则该表格第一列为序号，显示时自动添加序号。
	//var orderNo = (tableObj.rows[1].cells[0].getAttribute("flyflag")=="3") ? 1 : 0;
	var orderNo = 0;
	if(sFlag=="E"){
		
		   if(tableObj.rows[w].cells[0].getElementsByTagName("input")[0])//首行不是input的情况
 	   	    orderNo = (tableObj.rows[w].cells[0].getElementsByTagName("input")[0].getAttribute("flyflag")=="3") ? 1 : 0;
 	}else if(sFlag=="S")
 	   	 orderNo = (tableObj.rows[w].cells[0].getAttribute("flyflag")=="3") ? 1 : 0;
 	
	//动态生成行，行数要比数据的少一个，因为原来有一个默认的首行。
	var newTr = "";
	for (var m=1;m<r;m++ ){ 	
		
		for (var k=0;k<l;k++ ){ 	
			
			  newTr = tableObj.rows[w+k].cloneNode(true);
			  tableObj.appendChild(newTr); 				  
			  
		    if(orderNo == 1 && k==0){//首行添加序号
			  
			 	   if(sFlag=="E")
 	   	         newTr.cells[0].getElementsByTagName("input")[0].value = m+1;
 	         else if(sFlag=="S")
 	   	         newTr.cells[0].innerHTML =  m+1; 	   	 
		    }
		}
	} 	
 	
 	//取得所有标签
 	var obj = tableObj.getElementsByTagName("*");
 	
 	for (j=0;j<obj.length;j++ ){ 	  	
 	  
 	   flyflag = obj[j].getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11" || flyflag=="17" || flyflag=="7")
 	      continue;
 	      
 	    //alert(arr[i]);
 	      
 	   if(sFlag=="E")
 	   	  flyFormDataPageShowAObjEditData(obj[j],arr[i],mark3);//显示一个字段value
 	   else if(sFlag=="S")
 	   	  flyFormDataPageShowAObjReadData(obj[j],arr[i],mark3);//显示一个字段value
 	   	  
 	   i++; 	  
  } 
  
  return j;	
}
/**
   * 显示一个有合并行rowspan的table数据。flyflag=16的区域表单显示。
   * @param tableObj    页面list列表区对象 
   * @param sData       显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @param   mark2   二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                      一级分隔符为 |  

   * @return 成功返回表单数
   */
function flyFormDataPageShowMergeTable(tableObj,sData,sFlag,mark2,mark3){	
		
	if(!tableObj)
	   return;
	
	if(!sData || sData.trim().length<1)
	   return tableObj.getElementsByTagName("*").length-1;   
	   
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
 
  var flyflag = "";  
  
 	var i = 0; 
 	var j = 0; 	   	
 	var jumpDataNum = 0; 	 
 	
 	//取得合并区域行数,截取数据串
 	var ind = sData.indexOf("~");
 	var rowArr = sData.substring(0,ind-1).split(mark2);
 	
 	//显示数据数组.
 	sData = sData.substring(ind+2); 	
 	var arr = sData.split(mark2);	
 	
 	//生成合并区域行表单
  flyFormDataMergeTableCreate(tableObj,rowArr,"E"); 	
  
  //return 1000;

 	//显示数据.
 	
 	//取得所有标签
 	var obj = tableObj.getElementsByTagName("*");
 	
 	for (j=0;j<obj.length;j++ ){ 	  	
 	  
 	   flyflag = obj[j].getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11" || flyflag=="7")
 	      continue;
 	      
 	   //合并行跳过非合并行数据。因为后台查询时，将重复的合并行数据也一并查询出来，所以显示时，非合并行要跳过这些数据。
	   //flyflag=17，跳过合并行的数据。有多少个合并行，就跳过多少个。
 	   if(flyflag=="17"){
 	   	
 	   	   var jumpDataNum = parseInt(obj[j].getAttribute("flyvalue")); 
 	   	   
 	   	   i = i+jumpDataNum;
 	   	   
 	   	   continue; 	   	
 	   }
 	      
 	    
 	   if(sFlag=="E")
 	   	  flyFormDataPageShowAObjEditData(obj[j],arr[i],mark3);//显示一个字段value
 	   else if(sFlag=="S")
 	   	  flyFormDataPageShowAObjReadData(obj[j],arr[i],mark3);//显示一个字段value
 	   	  
 	   i++; 	  
  } 
  
  //返回该区域表单数
  return j;	 	
}
/**
   * 手机端app明细显示 ,弹窗输入后，确定显示到app界面。flyflag=18
   * @param tableObj    明细区域对象 
   * @param sData       显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @param mark2       二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param mark3       三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                        一级分隔符为 |  
   * @param updObj      修改container对象，修改时传递修改对象

   * @return 成功返回表单数
   */
function flyFormDataPageShowAppData(detailObj,sData,sFlag,mark2,mark3,updObj){	
		
	if(!detailObj)
	   return;
	
	if(!sData || sData.trim().length<1)
	   return detailObj.getElementsByTagName("*").length-1;   
	   
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "~";
 
  var flyflag = "";  
  var str = "";  
  
 	var i = 0; 
 	var j = 0; 	  
 	var tem = new Array(); 	
 	var dArr = new Array();
 	var oArr = new Array();
 	
 	//取得手机端明细显示设置
 	var flyset = detailObj.getAttribute("flyset"); 
 	if(!flyset || flyset.trim().length<1){
 		 alert("抱歉，没有明细显示设置，请添加");
 		 return;
 	}	
 	
 	//取得设置信息
 	var setArr = flyset.split("|");	
 	
 	var len = parseInt(setArr[0]);//每个明细字段数
 	
 	var arr = sData.split(mark2);	 
 	if(len>arr.length)//字段显示数小于设置显示数，返回。
 	  return detailObj.getElementsByTagName("*").length-1;   
 	
 	//生成新的Container
 	var newContainer = "";
 	var firstFlag = "";//首次添加标识
 	var itemEle = "";//滑块删除对象 	
 	
 	//添加滑块删除标识，N，不添加删除事件
 	var flydel = detailObj.getAttribute("flydel"); 
 	if(!flydel || flydel!="N")
 	   flydel = "Y";
 	
 	
 	var container = detailObj.querySelectorAll(".container");//数据显示区
 	
 	if(sFlag=="U" && updObj)//修改时，在修改对象上修改数据
 	   newContainer = updObj;
 	else if(container[container.length-1].style.display == "none") {

 	   container[container.length-1].style.display = "block";
 	   newContainer = container[container.length-1];
 	   
 	   firstFlag = "Y";
 	   
 	}else{
 		
 		 newContainer = container[container.length-1].cloneNode(true);	//新克隆
 		 //detailObj.insertBefore(newContainer,container.nextElementSibling);//挂接
 	}		
 	
 	//container下一个表单，插入时，插入该表单前面
 	var nextDiv = container[container.length-1].nextElementSibling;
 	
 	//将数据显示到container
 	for (i=0;i<arr.length;i=i+len ){
 		
 		//container要显示的flyvalue数据
 		 str = ""; 
 		 dArr = new Array();
 		 
 		 for (h=0;h<len;h++){
 		 	
 		 	   if(h>0)
 		 	      str+= mark2;
 		 	      
 		 	   str+= arr[i+h]; 
 		 } 		 
 		 dArr.push(str);
 		
 		 //根据设置处理数据
 		 for (var m=1;m<setArr.length;m++ ){ 	
 		 	
 		    if(setArr[m].indexOf(",")>-1){//显示字段为拼串字符串，拆窜显示对应序号的字段。
 		 	
 		 	     tem = setArr[m].split(",");	
 		 	     
 		 	     oArr = arr[i+parseInt(tem[0])].split(mark3);	
 		 	   
 		 	     dArr.push(oArr[parseInt(tem[1])]); 
 		 	
 		    }else{//显示字段为单个字符串，直接显示
 		    	
 		    	dArr.push(arr[i+parseInt(setArr[m])]);
 		    }
 		 }
 		 //显示数据
 		 if(sFlag!="U" && (firstFlag != "Y" || (i>0 && firstFlag == "Y"))){
 		    newContainer = container[container.length-1].cloneNode(true);	//超过一个，新克隆
 		    detailObj.insertBefore(newContainer,nextDiv);//挂接
 		 }
 		 
 		 //添加滑动删除事件
 		 if(sFlag!="S" && flydel == "Y"){
 		 	
 		     itemEle = newContainer.querySelectorAll(".item")[0];
 		     addSlideDelete(itemEle);
 		 }
 		 
 		 var dataForm = newContainer.getElementsByTagName("*");
 		 var n = 0;
 		 for (w=0;w<dataForm.length;w++ ){ 	
 		 	
 		 	    flyshow = dataForm[w].getAttribute("flyshow"); 	
 		 	    if(!flyshow || flyshow.trim().length<1 || flyshow=="3" || flyshow=="11" || flyshow=="17" || flyshow=="7")
 	              continue;

 		 	    // alert(dArr[n]);
 		 	    if(flyshow=="9")
 		 	       dataForm[w].setAttribute("flyvalue",dArr[n]);
 		 	    else
 		 	    	 dataForm[w].innerHTML = dArr[n];
 		 	    n++;
 		 } 		 
 	}
	
	return detailObj.getElementsByTagName("*").length-1; 
}
/**
   * 将数据动态添加到列表后面
   * @param tableObj    页面list列表区对象 
   * @param sData       显示数据。数组或拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @param   mark2     二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3     三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                        一级分隔符为 |  
   * @param   addRowNo  新行添加的位置，-1或为null，添加到行尾；-2，添加到倒数第二行；1，添加到首行；2，添加到第二行

   * @return 成功返回表单数
   */
function flyFormDataPageAddLineData(tableObj,sData,sFlag,mark2,mark3,addRowNo){	
	
	if(!tableObj)
	   return;
	
	if(!sData || sData.trim().length<1)
	   return tableObj.getElementsByTagName("*").length-1;   
	   
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
 
  var flyflag = "";  
  
 	var i = 0; 
 	var j = 0; 	   	
 	
	var arr = sData.split(mark2);		
	
	 //复制行自定义序号。默认为1，因为有的表头有多行，需要自定义。
  var w = 1;	
	if(isExitsFunction("flyFormDataPageGetTableKeepRowNo"))
	   w = flyFormDataPageGetTableKeepRowNo();	
	   
	//是否显示序号，如果默认的首行的第一列的flyflag=3，则该表格第一列为序号，显示时自动添加序号。
	var orderNo = 0;
	if(sFlag=="E"){
		
		   if(tableObj.rows[w].cells[0].getElementsByTagName("input")[0])//首行不是input的情况
 	   	    orderNo = (tableObj.rows[w].cells[0].getElementsByTagName("input")[0].getAttribute("flyflag")=="3") ? 1 : 0;
 	
 	}else if(sFlag=="S")
 	   	 orderNo = (tableObj.rows[w].cells[0].getAttribute("flyflag")=="3") ? 1 : 0;

	
	var tem = "";
	var newTr = "";
	var temTr = "";
	var arrData = new Array();
	var pObj = "";
	
	//取得列数,最后一列为按钮，则数据列数减1
	
	var n = tableObj.rows[1].cells.length;//取得列数
	
	var inputObj = tableObj.rows[w].cells[n-1].getElementsByTagName("input");
	if(inputObj.length>0 && inputObj[0].type=="button")
	  n--;
	
	var cloneTr = tableObj.rows[w].cloneNode(true);	//复制第一行
	flyFormDataPageClearTrData(cloneTr,"");//清空复制行数据
	
	//判断第一行是否有数据，没有将第一行数据加到第一行，有则第一行数据加到复制
	if(sFlag=="E")
 	   	tem = tableObj.rows[w].cells[0].getElementsByTagName("input")[0].value;
 	else if(sFlag=="S")
 	   	tem = tableObj.rows[w].cells[0].innerHTML; 		
 	   	
 	if(tem.trim().length<1)
	   temTr = tableObj.rows[w]; 
	
	for (var i=0;i<arr.length;i=i+n ){ 	
			
			  if(i==0 && temTr!="")
			     newTr = temTr;			     
			  else
			     newTr = cloneTr.cloneNode(true);		 
			  
			  arrData = arr.slice(i,i+n);
			  
			  flyFormDataPageShowData(newTr,arrData,sFlag,mark2,mark3);	 
			  
		    if(orderNo == 1){//首行添加序号
			  
			 	   if(sFlag=="E")
 	   	         newTr.cells[0].getElementsByTagName("input")[0].value = m+1;
 	         else if(sFlag=="S")
 	   	         newTr.cells[0].innerHTML =  m+1; 	   	 
		    }	
		    
		    if(i==0 && temTr!="")
		       continue;
		    else if(!addRowNo || addRowNo==-1)
		       tableObj.appendChild(newTr); 
		    else if(addRowNo==-2){
		    
		    	 pObj = tableObj.rows[tableObj.rows.length-1].parentNode;
		    	 pObj.insertBefore(newTr,tableObj.rows[tableObj.rows.length-1]); 
		    
	      }
	} 	
	
	return;
}
/**
   * 取得复制行编辑或显示表单数
   * @param tableObj   表对象
   * @param startNo    第一个数据行，有的表头有好几行，数据行不一定是第一行，这时就要指定为第几行。
   * @param lineNum    待复制行数
   * @param sFlag      编辑或显示标识
   * @return 成功返回表单数
   */
function flyFormDataPageGetTableRowForms(tableObj,startNo,lineNum,sFlag){	
	
	var f = 0;
	var row = tableObj.rows.length;	
 	
 	for (var i=startNo;i<=lineNum;i++ ){ 	
 		
 		//取得一行所有标签
 		 obj = tableObj.rows[i].getElementsByTagName("*"); 
 		 
 		 for (var j=0;j<obj.length;j++ ){ 
 		 	
 		 	    flyflag = obj[j].getAttribute("flyflag"); 	  
 		 	     
 	        if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11")
 	           continue;  
 	           
 	        //if(sFlag=="E" && flyflag=="10")//10只显示，不取值
 	   	        //continue;
 	        else if(sFlag=="S" && flyflag=="7" && flyflag=="11")//7、11不显示
 	   	        continue;
 	   	        
 	   	    f++; 	
 		 }
 		 
 		 //tr本身有flyflag
 		 flyflag = tableObj.rows[i].getAttribute("flyflag");
 		
 		 if(flyflag && flyflag.trim().length>0  &&  flyflag!="3" && flyflag!="11"){
 		 	
 		 	   if(sFlag=="E" && flyflag!="10")//10只显示，不取值
 	   	        f++;
 	        else if(sFlag=="S" && flyflag!="7" && flyflag!="11")//7、11不显示
 	   	        f++;	 	
 		 }
  }
 	
 	return f;
}
/**
   * 删除列表全部数据，保留标题行和第一行，在新显示数据前，将原来数据全部删除。
   * @param tableObj  表对象
   * @param startNo   删除开始行。第一个数据行，有的表头有好几行，数据行不一定是第一行，这时就要指定为第几行。
   * @param endNo     删除截止行。最后几行不删除，有的是合计行。序号从0开始。
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyFormDataPageDelList(tableObj,startNo,endNo){	
	
	//var tableObj = document.getElementById("flyListPageTableList");
	var n = tableObj.rows.length;  
	
  var m =2;
	if(startNo)
	  m = startNo+1;
	  
	var k = 1;
	if(endNo && isPInteger(endNo))		
	  k = n - endNo;	
	  
	if(k<=0)
	   return;
	
  for(var i=0;i<n-m;i++)
  	tableObj.deleteRow(n-i-k);
  	
  return;	
}
/**
   * 删除列表全部数据，保留标题行和第一行，在新显示数据前，将原来数据全部删除。
   * @param tableObj  表对象
   * @param startNo   删除开始行序号，序号从0开始计算。第一个数据行，有的表头有好几行，数据行不一定是第一行，这时就要指定为第几行。
   * @param endNo     最后几行不删除行数量，如有的是合计行。不传递参数从最后开始删除。
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyFormDataPageDelTableTr(tableObj,startNo,endNo){	
	
	//var tableObj = document.getElementById("flyListPageTableList");
	var n = tableObj.rows.length;  
	
  var m = 1;
	if(startNo)
	  m = startNo;
	  
	var k = 1;
	if(endNo && isPInteger(endNo))		
	  k = n - endNo - 1;	
	  
	if(k<=0)
	   return;
	
  for(var i=0;i<n-m;i++)
  	tableObj.deleteRow(n-i-k);
  	
  return;	
}
 /**
   * 显示一个标签对象的值,为编辑状态
   * @param obj     显示对象
   * @param val     显示对象的值   
   * @param mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
   * @return 
   */
function flyFormDataPageShowAObjEditData(obj,val,mark3){	
	
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
	
	   var n = 0;
	   var arr1 = new Array();
	   var labelObj =  "";
	   
	   var flyflag = obj.getAttribute("flyflag"); 	   
	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      return;
 	      
 	   switch (flyflag)
     {
       	
         case '0':         
         
           //alert(val);
           if(val.lastIndexOf(mark3)>0) //解决select显示 
              val = val.substring(0,val.lastIndexOf(mark3));
           //alert(val);
           obj.value = val;
           
           break;
           
         case '1':           
           
           n = val.lastIndexOf(mark3);
           
           if(n<0) 
              n = 0;
           else
           	  n = n+1;
           
           
           obj.innerHTML =  val.substring(n);
           obj.setAttribute("flyvalue",val);      
           //obj.setAttribute("flyvalue",val.substring(0,n));           
           
           break;
           
         case '2':         
           
           n = val.lastIndexOf(mark3);
           
           obj.value =  val.substring(n+1);
           obj.setAttribute("flyvalue",val.substring(0,n));     
           
           break;
           
         case '3':
           
           //obj.style.display = "none";
           break;
           
         case '4':
           
           obj.innerHTML = "";
           
           if(val.indexOf("⌒")>-1){
               arr1 = val.split(mark3);	 
               for(var j=0;j<arr1.length;j++){  
           	
           	      labelObj =  document.createElement("label"); 
           	 
           	      //n = arr1[j].lastIndexOf("§");
           	      n = arr1[j].lastIndexOf("⌒");
           	      labelObj.setAttribute("flyvalue",arr1[j]);
           	
           	      labelObj.innerHTML =  arr1[j].substring(n+1)+"<a href='#' onClick='commonSelectDelSelLabel(this,event);'>╳</a>";           
           	      //labelObj.innerHTML =  arr1[j].substring(n+1)+"<a href='#' onClick='pubToolsDelSelLabel(this,event);'>╳</a>";           
                  //labelObj.innerHTML =  arr1[j].substring(n+1)+"<a href='#' onClick='flyEditPageDelSelLabel(this);'>╳</a>";           
                  obj.appendChild(labelObj);            	
               }
           }
           
           //<label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>刘涛<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label>
           //var labelObj = obj.getElementsByTagName("label"); ⌒
           
           break;  
           
         case '8': //select只有value，不拼接text       
           
           arr1 = val.split(mark3);	
           
           obj.value =  arr1[0];           
           
           break;
           
         case '9':         
       
           obj.setAttribute("flyvalue",val);
           
           break;
           
         case '10':         
       
           obj.value =  val;  
           
           break;
           
        case '13':         
       
           n = val.indexOf(mark3);
           
           if(val.substring(0,n)=="Y")
              obj.checked = true;
           else 
           	  obj.checked = false;
           
           obj.value =  val.substring(n+1);
           
           break;
           
        case '14':         
       
           n = val.lastIndexOf(mark3);
           
           var objOption = document.createElement("option");
           objOption.text= val.substring(n+1);    
           objOption.value= val.substring(0,n); 
           obj.options.add(objOption); 
          
           break;
        
         default: break;   
     }   
     
     return;	
}
  /**
   * 显示一个标签对象的值,为显示只读状态，不可编辑
   * @param obj  显示对象
   * @param val  显示对象的值  
   * @param mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
   * @return 
   */
function flyFormDataPageShowAObjReadData(obj,val,mark3){	
	
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";
	
	   var n = 0;
	   var arr1 = new Array();
	   var labelObj =  "";
	   
	   var flyflag = obj.getAttribute("flyflag"); 	   
	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      return;
 	      
 	   switch (flyflag)
     {
       	
         case '0':         
         
           n = val.lastIndexOf(mark3);//解决select显示 
           if(n>0) 
              val = val.substring(n+1);
       
           obj.innerHTML = val;
           
           break;
           
         case '1':           
           
           n = val.lastIndexOf(mark3);
           
           obj.innerHTML =  val.substring(n+1);
           
           break;
           
         case '2':         
          
           n = val.lastIndexOf(mark3);
           
           obj.innerHTML =  val.substring(n+1);  
           obj.setAttribute("flyvalue",val.substring(0,n));     
           
           break;
           
         case '3':
           
           //obj.style.display = "none";
           break;
           
         case '4':
           
           obj.innerHTML = "";
           
           if(val.indexOf("⌒")>-1){
           	
              arr1 = val.split(mark3);	 
              for(var j=0;j<arr1.length;j++){  
           	
           	      labelObj =  document.createElement("label"); 
           	
           	      labelObj.setAttribute("flyvalue",arr1[j]);
           	      n = arr1[j].lastIndexOf("⌒");
           	 
                  labelObj.innerHTML =  arr1[j].substring(n+1);           
                  obj.appendChild(labelObj);            	
              }
           }
           
           break;  
           
        case '8': //下拉列表，只显示text        
       
           arr1 = val.split(mark3);	
           
           obj.innerHTML =  arr1[arr1.length-1];
           
           break;
           
        case '9': //不显示值，只设置flyvalue
       
           obj.setAttribute("flyvalue",val);
           
           break;
           
        case '10':          
           
           obj.innerHTML =  val;
           
           break;
           
        case '13':         
       
           n = val.indexOf(mark3);
           
           if(val.substring(0,n)=="Y")
              obj.checked = true;
           else 
           	  obj.checked = false;
           
           obj.value =  val.substring(n+1);
           
           break;
           
         case '14':         
       
           n = val.lastIndexOf(mark3);
           
           obj.innerHTML =  val.substring(n+1);            
           
           break;
        
         default: break;   
     }   
     
     return;	
}
 /**
   * 取得一个页面的输入数据（静态表单，固定页面），包含flyflag = "5"时的取数
   * @param   fromId  from对象id
   * @param   mark2   二级内容分隔符，指flyflag = "5"包含的数值的分隔符。
   * @param   mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
                      一级分隔符为 |
   * @return  数据拼串。拼串字符： |，一级；^，二级；~，三级；§，四级；々，五级
   */
function flyFormDataPageGetData(fromId,mark2,mark3){
	
	if(!mark2 || mark2.trim().length<1)			
	   mark2 = "^";
	   
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";

  var str = "";
  var tem = "";
  var str1 = "";
  var flyflag = "";
  var n = 0;
  
  var objArea = "";  
 
 	
 	if (typeof(fromId) == "string") {
	   objArea = document.getElementById(fromId);  
	}else
		 objArea = fromId;
 	
 	//取得所有标签
 	var obj = objArea.getElementsByTagName("*");
  
 	//var obj = document.getElementById(fromId).getElementsByTagName("*");//取得所有标签
 	
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   
 	  
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="10" || flyflag=="3")
 	       continue; 	      
 	     
 	   if(flyflag=="5" || flyflag=="16"){
 	   	 
 	   	  str1 = flyFormDataPageGetAFormData(obj[i],mark2,mark3);
 	   	  
 	   	  //n = parseInt(str1.substring(0,str1.indexOf("^")));
 	   	  n = parseInt(str1.substring(0,str1.indexOf(mark2)));
 	   	  
 	   	  i = i+n;//跳转已取数表单
 	   	  
 	      //str+= "|"+str1.substring(str1.indexOf("^")+1); 	 
 	      str+= "|"+str1.substring(str1.indexOf(mark2)+1); 	 
 	      
 	           
 	   }else if(flyflag=="18"){
 	   	 
 	   	  str1 = flyFormDataPageGetAppFormData(obj[i],mark2,mark3);
 	   	  
 	   	  n = parseInt(str1.substring(0,str1.indexOf(mark2)));
 	   	  
 	   	  i = i+n;//跳转已取数表单
 	   	  
 	      str+= "|"+str1.substring(str1.indexOf(mark2)+1); 	 
 	      
 	           
 	   }else{ 
 	   	
 	   	 tem = flyFormDataPageGetAObjData(obj[i],mark3); 
 	     if(tem!=null) 	    
 	       str+= "|"+tem; 	     
 	   }
 	}
 	
	if(str.indexOf("|")>-1)
	  str = str.substring(1); 
	  
	return str;
}
/**
   * 获得一个对象包含的数据。或单独取得动态行（动态增减行）列表数据，一般用作 如 flyflag = "5"时的取数，或不含flyflag = "5"时的页面数据。  
   * @param formObj   对象
   * @param mark      间隔符。拼串的间隔符
   * @param mark3     三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
   * @return          表单值+循环表单数
   */
function flyFormDataPageGetAFormData(formObj,mark,mark3){		
	
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";	

  var str = "";
  var tem = "";
  var flyflag = "";
  var i = 0;
 	
 	var obj = formObj.getElementsByTagName("*");//取得所有标签
 
 	for (i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="10" || flyflag=="3")
 	      continue;
 	     
 	   tem = flyFormDataPageGetAObjData(obj[i],mark3); 
 	   if(tem!=null) 	    
 	      str+= mark+tem; 	   
 	}
 	
	return i+str; 
}
/**
   * 获得一个手机端app对象包含的数据。或单独取得动态行（动态增减行）列表数据，一般用作 如 flyflag = "18"时的取数，或不含flyflag = "18"时的页面数据。  
   * @param formObj   对象
   * @param mark      间隔符。拼串的间隔符
   * @param mark3     三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
   * @return          表单值+循环表单数
   */
function flyFormDataPageGetAppFormData(formObj,mark,mark3){		
	
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";	

  var str = "";
  var tem = "";
  var flyflag = "";
  var i = 0;
 	
 	var obj = formObj.getElementsByTagName("*");//取得所有标签
 
 	for (i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="10" || flyflag=="3")
 	      continue;
 	     
 	   tem = flyFormDataPageGetAObjData(obj[i],mark3); 
 	   if(tem!=null) 	    
 	      str+= mark+tem; 	   
 	}
 	
	return i+str; 
}
 /**
   * 取得一个标签对象的输入数据
   * @param obj     一个对象
   * @param mark3   三级内容分隔符，1、flag=0的指下拉列表value与text；2、flag=2的flyvalue与value；3、flag=4的多个label标签
   * @return 
   */
function flyFormDataPageGetAObjData(obj,mark3){
	
	if(!mark3 || mark3.trim().length<1)			
	   mark3 = "^";	
  
  var str = null;
  var str1 = "";
  var tem = "";
  var flyflag = "";
  var flytype = "";
  var labelObj = "";//flyflag = "4"
 	  
 	flyflag = obj.getAttribute("flyflag"); 
 	   	   
 	if(!flyflag || flyflag.trim().length<1)
 	    return null;
 	      
 	if(flyflag=="0") {
 	   	
 	   	if(obj.tagName=="SELECT"){ //select保存和修改时，取值value和name,传递到后台
 	   	      	   	  	
 	   	  	if(!obj.options[obj.selectedIndex] || obj.options[obj.selectedIndex].value.trim().length<1)
 	   	  	  str = " "+mark3+" "
 	   	  	else
 	   	      str =  obj.options[obj.selectedIndex].value+mark3+obj.options[obj.selectedIndex].text;

 	    }else { 	
 	      	 
 	      	 flytype = obj.getAttributeNode("onkeyup");//解决数字数据库插入时不能为空，置为0
 	      	 
 	      	 if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1 && obj.value.trim().length<1)
 	      	    str = "0";
 	      	 else
 	      	    str =  obj.value;
 	    }
 	}else if(flyflag=="1" || flyflag=="7" || flyflag=="9")
 	      str =  obj.getAttribute("flyvalue"); 
 	else if(flyflag=="2"){
 		
 		    tem = obj.getAttribute("flyvalue");
 		   
 		    if(tem==null)
 		       tem = "";
 		       
 		    flytype = obj.getAttributeNode("onkeyup");//解决数字数据库插入时不能为空，置为0
 	      	 
 	      if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1 && obj.value.trim().length<1)
 	      	 str = "0";
 	      else
 	      	 str =  obj.value;
 	      
 	      str =  tem+mark3+str; 
 	     
  }else if(flyflag=="4"){
 	   	
 	   	  str1 = "";
 	   	  labelObj = obj.getElementsByTagName("label");
 	   	  
 	   	  for (var j=0;j<labelObj.length;j++) {
 	   	  	
 	   	  	tem = labelObj[j].getAttribute("flyvalue");
 	   	  	if(tem)
 	   	       str1+= mark3+labelObj[j].getAttribute("flyvalue");
 	   	    else
 	   	    	 str1+= " "+mark3+" ";
 	   	    
 	   	  }
 	   	  str1 = (str1.length>0) ? str1.substring(1) : str1;
 	   	  
 	      str = str1; 	      
 	} else if(flyflag=="8"){//下拉列表，只取value值
 	     str =  obj.value;
  }	else if(flyflag=="13"){//radio取值
 	     tem = (obj.checked) ? "Y" : "N";
 	     str =  tem+mark3+obj.value;
  }	else if(flyflag=="14"){//下拉列表，取值同flag='0'
 	     
 	     if(!obj.options[obj.selectedIndex] || obj.options[obj.selectedIndex].value.trim().length<1)
 	   	  	  str = " "+mark3+" "
 	   	 else
 	   	      str =  obj.options[obj.selectedIndex].value+mark3+obj.options[obj.selectedIndex].text;
  }	
 	
	return str; 
}
/**
   * 根据定义生成表单（不含数据）。即生成定义的所有显示节（段落）,包含标题和表单。根据节的定义。
   * @param objId        生成动态表单的区域对象id
   * @param params       参数拼串   
   * @param styleFlag    显示样式类别：C，大节下的一个小节，显示：标题（名称）+删除按钮；
                                       S，一个独立的节，显示：序号+标题（名称）+输入名称+样式+删除按钮
   * @param sFlag        显示样式状态：E，编辑状态；S，显示状态。
   
     1、params拼串： 节々节々节々节々...
     2、节拼串组成：段落id^序号^段落名称^段落样式|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别。
     3、	段落（指标）信息。大串第一个为段落（指标）信息。
       (1)段落id^段落样式^序号^段落名称.
       (2)段落（指标）样式：I，表单；L，列表
     4、	字段信息：每个字段四个信息，以^拼串。
       (1)	字段id，  表单代码
       (2)	字段名称，字段显示名称
       (3)	字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，需在flycreateformselect.js和flycreateformpopwin.js定义好。
       (4)	字段数据类别，文本为长度，小数为小数点几位，弹窗为多选（multiple）还是单选等，没有为空。
      （5） 字段顺序，根据取得定义时排序（order by）
   */
function flyFormDataPageCreateSections(objId,params,styleFlag,sFlag){	
	
	
	var obj = document.getElementById(objId);
	
	var arr = params.split("々");	
	
	for(var i=0;i<arr.length;i++){  	
		
		flyFormDataPageCreateASection(obj,arr[i],styleFlag,sFlag);
		
	}
	
	return;
}
/**
   * 生成一个显示节（段落）,包含标题和表单。根据节的定义。
   * @param obj          生成动态表单的区域对象
   * @param params       参数拼串   
   * @param styleFlag    显示样式类别：C，大节下的一个小节，显示：标题（名称）+删除按钮；
                                       S，一个独立的节，显示：序号+标题（名称）+输入名称+样式+删除按钮
   * @param sFlag        显示样式状态：E，编辑状态；S，显示状态。
     
     1、	字段拼串组成：段落id^序号^段落名称^段落样式|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别。
     2、	段落（指标）信息。大串第一个为段落（指标）信息。
       (1)段落id^序号^段落名称^段落样式.
       (2)段落（指标）样式：I，表单；L，列表
     3、	字段信息：每个字段四个信息，以^拼串。
       (1)	字段id，  表单代码
       (2)	字段名称，字段显示名称
       (3)	字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，需在flycreateformselect.js和flycreateformpopwin.js定义好。
       (4)	字段数据类别，文本为长度，小数为小数点几位，弹窗为多选（multiple）还是单选等，没有为空。
      （5） 字段顺序，根据取得定义时排序（order by）
   * @return 
   */
function flyFormDataPageCreateASection(obj,params,styleFlag,sFlag){		
	
	if(!obj || !params || params.indexOf("|")<0)
	   return;
	
	
	var arr = params.split("|");		
	var fieldArr = new Array();		
	var str = "";
	var tem = "";
	var sec = "";	
	var secId = "";	
	
	//是否有节的父级，如果有，作为节的属性 
	var fatherForm = obj.getAttribute("flyvalue"); 	
	if(fatherForm && fatherForm.trim().length>0)//段落的父级表单
	   arr[0] = arr[0]+"^"+fatherForm; //所属类别与段落(指标)id拼串，所属类别:D数量上限，P价格上限，Y使用年限
				
	var area =  document.createElement("div"); //段落区	
	area.setAttribute("flyflag","6");//6为段落(指标)标签 
	area.setAttribute("flyvalue",arr[0]);//设置 段落(指标)信息：段落id^序号^段落名称^段落样式^所属类别

  //alert(arr[0]);
	var sArr = arr[0].split("^");//段落拆串，0段落id^序号^段落名称^段落样式
	
	arr.splice(0,1); //删除起始下标为1，长度为1的一个值(len设置1，如果为0，则数组不变) 
	
	if(sArr[3]=="I")//生成表单
	   str = flyFormDataPageCreateForm(arr,sFlag);
	else if(sArr[3]=="L")//生成列表
	   str = flyFormDataPageCreateList(arr,sFlag);
	   
	if(styleFlag=="C"){ //标题（名称）+删除按钮
				
		 	sec = "<h3>"+sArr[2]+"<span class='hollow_round' onclick='flySectionPageDelSection(this)'>--</span></h3>";
      sec+= str;
	
	}else if(styleFlag=="S"){//序号+标题（名称）+输入名称+样式+删除按钮
		
		 sec = "<h3><span>"+sArr[1]+"</span>名称：<input type='text'  value='"+sArr[2]+"' flyflag='0' necessary='1'  onblur='neceCheck(this)' maxlength='30' onkeyup='flyCheckStrInput(this);'>";
     sec+= "样式：<select id='selectId' class='commonSelectSel'  flyflag='0'>";
     sec+= "<option value='I'>表单</option>";
     sec+= "<option value='L'>列表</option>";         	  	                                 
     sec+= "</select>";	
     sec+= "<span class='hollow_round' onclick='flySectionPageDelSection(this)'>--</span><h3>";
	   sec+= "<div class='list_box_con_t' >"+str+"</div>"; 	
	   
	}else if(styleFlag=="W"){//序号+标题（名称）
		
		 sec = "<h3><span>"+sArr[1]+"</span>"+sArr[2]+"</h3>";     
	   sec+= "<div class='list_box_con_t'>"+str+"</div>"; 	
	}
		   
	area.innerHTML = sec;
	
	obj.appendChild(area);
	   
	return;
}
  /**
   * 动态生成表单
  * @param arr    弹出参数数组    
  * @param sFlag     显示样式状态：E，编辑状态；S，显示状态。
     
      1、数组结构（新）：字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别...
      2、字段信息：大串前两个往后为多个字段拼串，每个字段三个信息。
        (1)	0字段id^字段名称，显示的一个html表单代码
        (2)	1字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，取已定义好的。
        (3)	2数据类别，文本为长度，没有为空。

  * @return 拼串列表表单
  */
function flyFormDataPageCreateForm(arr,sFlag){		

	var n = 0;
	var fArr = new Array();
	var nArr = new Array();	
	
	var str = "<table width='1000' border='0' cellpadding='0' cellspacing='0'> ";
	 
	for(var i=0;i<arr.length;i++){
		
		fArr = arr[i].split("^");//字段拆串,字段id^字段名称^字段（表单）类别^字段数据类别
		
		if(n%2==0)
		   str+="<tr>";
		
		//生成标题td区		
		str+="<td align='right'>"+fArr[1]+"：</td>"; //名称
		
		//弹窗多选占一行处理
		if(fArr[2].substring(0,2)=="PM"){//生成的td colspan='3'
	  	 	
	  	 	 if(n%2==0)//行开始	  	 	   
	  	 	    n++;//末尾会关闭行
	  	   else //第二列 ,关闭本行，再新起一行,末尾会关闭行	  	   	
	  	   	  str+="<td></td></tr><tr>";	
	  }
	  	 
		//生成输入td区
		//nArr = arr.slice(i+1,i+3);
		//nArr.push(fArr[0]); //1字段（表单）类别|2数据类别|3字段id
		if(sFlag=="E")
		   str+=flyFormDataPageCreateAEditTd(fArr);	
		else if(sFlag=="S")
		   str+=flyFormDataPageCreateAReadTd(fArr);			
	  
		if(n%2!=0)
		  str+="</tr>";		
		  
		 n++;
	}
	
	str+= "</table>";
	
	return str;		
}
  /**
   * 动态生成列表  
   * @param arr    弹出参数数组
   * @param sFlag     显示样式状态：E，编辑状态；S，显示状态。
      数组结构：0表单代码|1表单名称|2表单类别|3数据类别|4数据类别参数|0表单代码|1表单名称|2表单类别|3数据类别|4数据类别参数|0表单代码|1表单名称|2表单类别|3数据类别……
   
      1、数组结构（新）：0字段id^字段名称|1字段（表单）类别|2数据类别|0字段id^字段名称|1字段（表单）类别|2数据类别|0字段id^字段名称|1字段（表单）类别|2数据类别|0字段id^字段名称|1字段（表单）类别|2数据类别。
      2、字段信息：大串前两个往后为多个字段拼串，每个字段三个信息。
        (1)	0字段id^字段名称，显示的一个html表单代码
        (2)	1字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，取已定义好的。
        (3)	2数据类别，文本为长度，没有为空。

   * @return 拼串列表表单
   */
function flyFormDataPageCreateList(arr,sFlag){	
	
	var fArr = new Array();
	var nArr = new Array();	
	
	var wid = 86/(arr.length)+"%";//每列宽度
	
	var str = "<div class='list_box_con_m' style='border-bottom:0px;'>";                                
  str+= "<table width='1000' border='0' cellpadding='0' cellspacing='0' flyflag='5'>";  
  
  var str1 = "<tr><td align='center' width='6%'>序号</td>";
	var str2 = "<tr><td><input type='text' value='1' style='text-align:center;' readonly></td>";       
	 
	for(var i=0;i<arr.length;i++){
		
		//生成标题td区
		fArr = arr[i].split("^");//字段拆串,字段id^字段名称^字段（表单）类别^字段数据类别
		str1+="<td align='center' width='"+wid+"'>"+fArr[1]+"</td>"; 		
		
		//生成输入td区
		//nArr = arr.slice(i+1,i+3);
		//nArr.push(fArr[0]); //1字段（表单）类别|2数据类别|3字段id
		if(sFlag=="E")
		   str2+=flyFormDataPageCreateAEditTd(fArr);
		else if(sFlag=="S")
		   str2+=flyFormDataPageCreateAReadTd(fArr);			
	 
	}
	
	//编辑状态加入最后一列动态增加行操作
	if(sFlag=="E"){	   
	    str1 = str1+"<td align='center' width='8%'>操作</td></tr>";
	    str2 = str2+"<td align='center'><input type='button' onClick=\"flyPopBarShowPad('scrollBox','35',this,event);\"></td></tr>";
  }
  
	str+= str1+str2+"</table></div>";
	
	return str;	
}
  /**
   * 动态生成一个td表单，根据定义  
   * @param arr    组成一个td表单的参数数组
      数组结构：字段id^字段名称^字段（表单）类别^字段数据类别
     
      1，字段（表单）类别:I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以P开头，弹窗选择；以S开头，下拉列表。弹窗和下拉列表，取已定义好的。						
      2、数组结构（新）：字段id^字段名称^字段（表单）类别^字段数据类别
      3、字段信息：     
        (1)	1字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，取已定义好的。
        (2)	2数据类别，文本为长度，没有为空。

   * @return 拼串列表表单
   */
function flyFormDataPageCreateAEditTd(arr){		
	
	var tem = "";
	var tem1 = "";
	var arr1 = new Array();	
	
	var str = "";	
			
	//生成输入区.数组结构：字段id^字段名称^字段（表单）类别^字段数据类别
  if(arr[2]=="I" || arr[2]=="D" || arr[2]=="T" || arr[2]=="L"){ //0输入input
			
			 tem = "";
			
			 if(arr[2]=="I")
			   tem = " onkeyup=\"flyCheckDigitInput(this,'I');\" ";
			 else if(arr[2]=="D")
			 	 tem = " onkeyup=\"flyCheckDigitInput(this,'D');\" ";
			 else if(arr[2]=="T")
			   tem = " maxlength='"+arr[3]+"' onkeyup='flyCheckStrInput(this);' "			   
		   
       str+="<td><input type='text' id='"+arr[0]+"' flyflag='0' "+tem+"></td>";
	  
	}else if(arr[2].substring(0,2)=="SD" || arr[2].substring(0,2)=="SF"){//1下拉列表,以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值
	  	
	  	
	  	tem = flyCreateFormGetSelect(arr[2]);
	  	str+= "<td><select id='"+arr[0]+"' flyflag='0'>"+tem+"</select></td>";	
     
	}else if(arr[2].substring(0,2)=="PM" || arr[2].substring(0,2)=="PS"){//2弹窗选择，以PM开头，弹窗多选，以PS开头，弹窗单选选
	  	
	  	 if(arr[2].substring(0,2)=="PM"){//弹窗多选，占一行
	  	 	
	  	 	  str+= "<td colspan='3'>";
	  	 	  
	  	 }else{//弹窗单选，占半行
	  	 	
	  	 	  str+= "<td>";
	  	 }
	  	 
	  	 str+= "<span id='"+arr[0]+"' flyflag='4'>";
       str+= "<img src='../../pub/img/view.gif'  onclick=\"selAssetType(this,'"+arr[2]+"')\"  style='float:right;display:inline-block;width:20px;height:19px;margin-top:6px;'>";                        	  
       str+= "</span>";                            	 
       str+= "</td>"; 
	  	
	}
	return str;	
	
	//var str = "I|面积数量|ac001|单位使用面积|0|D| |ac002|可配置数量|0|I| |ac003|配置比例|0|P| ";
}
  /**
   * 动态生成一个td表单，根据定义  
   * @param arr    组成一个td表单的参数数组
      数组结构：字段id^字段名称^字段（表单）类别^字段数据类别
     
      1，字段（表单）类别:I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以P开头，弹窗选择；以S开头，下拉列表。弹窗和下拉列表，取已定义好的。						
      2、数组结构（新）：字段id^字段名称^字段（表单）类别^字段数据类别
      3、字段信息：     
        (1)	1字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，取已定义好的。
        (2)	2数据类别，文本为长度，没有为空。

   * @return 拼串列表表单
   */
function flyFormDataPageCreateAReadTd(arr){		
	
	var tem = "";
	var tem1 = "";
	var arr1 = new Array();	
	
	var str = "";	
			
	//生成输入区.数组结构：字段id^字段名称^字段（表单）类别^字段数据类别
  if(arr[2]=="I" || arr[2]=="D" || arr[2]=="T" || arr[2]=="L"){ //0输入input			
			 
       str+="<td id='"+arr[0]+"' flyflag='0'></td>";
	  
	}else if(arr[2].substring(0,2)=="SD" || arr[2].substring(0,2)=="SF"){//1下拉列表,以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值
	  	
	  	str+= "<td id='"+arr[0]+"' flyflag='0'></td>";	
     
	}else if(arr[2].substring(0,2)=="PM" || arr[2].substring(0,2)=="PS"){//2弹窗选择，以PM开头，弹窗多选，以PS开头，弹窗单选选
	  	
	  	 if(arr[2].substring(0,2)=="PM"){//弹窗多选，占一行
	  	 	
	  	 	  str+= "<td colspan='3'>";
	  	 	  
	  	 }else{//弹窗单选，占半行
	  	 	
	  	 	  str+= "<td>";
	  	 }
	  	 
	  	 str+= "<span id='"+arr[0]+"' flyflag='4'>";       
       str+= "</span>";                            	 
       str+= "</td>"; 
	  	
	}
	return str;		
}
 /**
   * 显示定义页面数据值。包含两部分：1、固定表单数据；2、动态定义的节的数据。
   * @param sectionFatherId   节的父级对象Id.
   * @param fixFormId         固定表单对象Id.                
   * @return 
      返回数据拼串：固定表单数据々节数据々节数据
      固定表单数据：以|拼串
            节数据：节id^节样式|字段数据|字段数据|字段数据|字段数据
          字段数据：字段序号^字段id^字段值。（节样式为表单（I）的数据，序号为空）
   */
function flyFormDataPageGetDefPageData(sectionFatherId,fixFormId){	
	
	  var str = flyFormDataPageGetData(fixFormId);
	  
	  str+=  "々"+flyFormDataPageGetDefFieldData(sectionFatherId);
	 
	  return str;
}
/**
   * 取得动态定义表单数据（页面表单通过定义生成）。要取得字段id与其的值
   * @param objId   取值对象id  
   * @return 1）段落(指标)~~^2）字段值
      1）段落(指标)拼串：所属类别^段落 (指标)id|所属类别^段落 (指标)id|所属类别^段落 (指标)id...
      2）字段值拼串：每个段落(指标)之间以々拼串
         （1）表单字段值拼串：所属类别^段落(指标)id|字段id^字段值|字段id^字段值|字段id^字段值...
	       （2）列表字段值拼串：所属类别^段落(指标)id|序号^字段id^字段值|序号^字段id^字段值|序号^字段id^字段值...
   */
function flyFormDataPageGetDefFieldData(objId){		
	
	/*
	 1、返回值包含三部分信息：四个标准说明~~^显示段落（指标）信息~~^段落（指标）字段值信息
	 2、页面取得配置段落(指标)。拼串：所属类别|段落 (指标)id
	    1）每个指标，取得指标所属类别|指标id即可，取段落对象取flyvalue。不需要取得详细字段，因为显示的时候，字段是从定义表取得。
	    2) 每个段落(指标)，以|拼串
	 4、节flyvalue：段落(指标)id^序号^节名称^节样式
	 3、页面取得字段输入值
	    1）一个表单字段返回拼串：段落(指标)id^段落样式| ^字段id^字段值|字段id^字段值|字段id^字段值...
	    2）一个列表字段返回拼串：段落(指标)id^段落样式|序号^字段id^字段值|序号^字段id^字段值|序号^字段id^字段值...
	    3）后台根据段落样式，确定插入哪个表
	    4）每个段落(指标)字段值，以々拼串
	    5)指标所属类别|指标id,段落对象取flyvalue
	    6）字段id：取表单id
	    7）字段值：根据flyflag：取flyvalue
	     0，取标签value值；
       1，取属性flyvalue值；
       2，属性flyvalue值^标签value值；               
       4，该标签下面的多个label取值，以^拼串。label内值，以~拼串，显示值在最后。
       5，该标签下面的多个input、select等取值，每个表单值以^拼串,表单值中的内容以~拼串，内容中的值以§拼串。解决动态增加内容，如弹出面板进行增加 。
       6，该标签为段落标签，内有段落id，所属类别信息。下面为该段落的多个字段信息，input、select等取值，
	*/		
	
  var flyflag = ""; 
  var sectionStr = "";
  var fieldStr = ""; 
  var arr = new Array();
  
 	//var obj = document.getElementById("editForm").getElementsByTagName("*");//取得所有标签
 	var obj = document.getElementById(objId).getElementsByTagName("*");//取得所有标签
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag!="6")
 	      continue;
 	   	
 	   arr = obj[i].getAttribute("flyvalue").split("^");//段落id^段落样式^序号^段落名称^所属类别
 	   	
 	   	  //段落(指标)信息
 	   //sectionStr+= "|"+arr[0]+"|"+arr[3]; //段落(指标)信息：所属类别^段落 (指标)id
 	   	
 	   	  //字段输入值信息
 	   if(arr[3]=="I")
 	   	   fieldStr+= "々"+arr[0]+"|"+arr[3]+"|"+flyFormDataPageGetDefFormData(obj[i]);
 	   else if(arr[3]=="L")
 	   	   fieldStr+= "々"+arr[0]+"|"+arr[3]+"|"+flyFormDataPageGetDefListData(obj[i]); 	   	 
 	}  
 	
	//return getSpecInfo()+"~~^"+sectionStr.substring(1)+"~~^"+fieldStr.substring(1);
	return fieldStr.substring(1);
}

/**
   * 动态定义表单，取得一个表单段落(指标)下所有字段id与字段值
   * @param obj   段落(指标)对象 
   * @param flag  段落(指标)样式 ，I，表单；L，列表。
   * @return 字段值拼串
   
   页面取得字段输入值
	    1）一个表单字段四个值：所属类别^段落(指标)id^字段id^字段值
	    2）一个列表字段五个值：所属类别^段落(指标)id^序号^字段id^字段值	    
	    3）字段id：取表单id
	    4）字段值：根据flyflag：取flyvalue
	     0，取标签value值；
       1，取属性flyvalue值；
       2，属性flyvalue值^标签value值；               
       4，该标签下面的多个label取值，以^拼串。label内值，以~拼串，显示值在最后。
       5，该标签下面的多个input、select等取值，每个表单值以^拼串,表单值中的内容以~拼串，内容中的值以§拼串。解决动态增加内容，如弹出面板进行增加 。
       6，该标签为段落标签，内有段落id，所属类别信息。下面为该段落的多个字段信息，input、select等取值，

   
   */
function flyFormDataPageGetDefFormData(formObj){		
	
  var str = "";
  var flyflag = "";
  var f = "";//取得字段id
  var v = "";//取得字段value
  
  
 	var obj = formObj.getElementsByTagName("*");//取得所有标签
 	
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   f = obj[i].id;//取得字段id
 	   v = flyFormDataPageGetAObjData(obj[i]);//取得字段value
 	   if(v!==null)
 	     str+= "| |"+f+"|"+v;
 	     //str+= "| ^"+f+"^"+v;
 	}
	
	return str.substring(1); 	
}
/**
   * 动态定义表单，取得一个列表段落(指标)下所有字段id与字段值
   * @param obj   段落(指标)对象   
   * @return      序号^字段id^字段值|序号^字段id^字段值|序号^字段id^字段值...
   
   页面取得字段输入值	    
	    1）一个列表字段五个值：所属类别^段落(指标)id^序号^字段id^字段值	    
	    2）字段id：  取表单id
	    3）字段序号：取每行第一列序号
	    4）字段值：根据flyflag：取flyvalue
	     0，取标签value值；
       1，取属性flyvalue值；
       2，属性flyvalue值^标签value值；               
       4，该标签下面的多个label取值，以^拼串。label内值，以~拼串，显示值在最后。
       5，该标签下面的多个input、select等取值，每个表单值以^拼串,表单值中的内容以~拼串，内容中的值以§拼串。解决动态增加内容，如弹出面板进行增加 。
       6，该标签为段落标签，内有段落id，所属类别信息。下面为该段落的多个字段信息，input、select等取值，

   
   */
function flyFormDataPageGetDefListData(sectionObj){		
	
	var str = "";  
  var flyflag = ""; 
  var m = 0;//字段序号
  var f = "";//字段id
  var v = "";//字段值
  var rowObj = "";
  var tdObj = "";
  var obj = "";
  
 	var tableObj = sectionObj.getElementsByTagName("table")[0];//取得table
 	
 	for (var j=1;j<tableObj.rows.length;j++ ){ 	 
 		
 		 rowObj = tableObj.rows[j];
 		 
 		 //取得一行的序号
 		 tdObj = rowObj.cells[0];
 		 m = tdObj.getElementsByTagName("input")[0].value;//序号
 	  
 	   obj = rowObj.getElementsByTagName("*");//取得所有标签
 	
 	   for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	      flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	      if(!flyflag || flyflag.trim().length<1)
 	         continue;
 	      
 	      f = obj[i].id;//取得字段id	   
 	   
 	      v = flyFormDataPageGetAObjData(obj[i]);//取得字段value
 	      
 	      if(v!=null) 	      
 	        str+="|"+ m+"|"+f+"|"+v;
 	        //str+="|"+ m+"^"+f+"^"+v;
 	   }
 	}
	
	return str.substring(1); 	
}
  /**
   * 根据定义字段显示页面的数据，包括两部分，固定字段数据、定义字段数据
   * @param sectionFatherId   定义节的父级对象Id.
   * @param fixFormId         固定表单对象Id.
   * @param showData          显示数据字符串。
   * @param sFlag             显示样式状态：E，编辑状态；S，显示状态。
   
     拼串：固定字段数据々节数据々节数据々节数据々节数据
     固定字段数据：以|拼串
           节数据：段落id|段落样式|序号|字段id|字段值|序号|字段id|字段值|序号|字段id|字段值...
     
             说明：列表样式下，序号为空；列表样式下，为实际序号。
   * @return 
   */
function flyFormDataPageShowDefPageData(sectionFatherId,fixFormId,showData,sFlag){	
	
	//固定值显示
	var fixStr = showData.substring(0,showData.indexOf("々"));	
	flyFormDataPageShowData(fixFormId,fixStr,sFlag);
	
	//定义值显示
	var dynStr = showData.substring(showData.indexOf("々")+1);
	flyFormDataPageShowSectionsData(sectionFatherId,dynStr,sFlag);	
}
  /**
   * 动态定义表单显示数据，显示一个或多个节的字段值
   * @param fatherObj     段落（指标）所属对象
   * @param sFlag         显示样式状态：E，编辑状态；S，显示状态。
   * @param aSectionData       
     1）表单值拼串：段落id|段落样式| |字段id|字段值| |字段id|字段值| |字段id|字段值...
     2）列表值拼串：段落id|段落样式|序号|字段id|字段值|序号|字段id|字段值|序号|字段id|字段值...
   * @return 
   */
function flyFormDataPageShowSectionsData(sectionFatherId,aSectionData,sFlag){	
	
	//var obj = fatherObj.getElementsByTagName("*");//取得所有标签
	var obj = document.getElementById(sectionFatherId).getElementsByTagName("*");//取得所有标签
	var arr = aSectionData.split("々");
	var sArr = new Array();
	var vArr = new Array();
	var sectionId = "";
	var tem = "";
	
	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	    
 	   if(!flyflag || flyflag.trim().length<1 || flyflag!="6")
 	      continue;
 	      
 	   //alert(obj[i].getAttribute("flyvalue"));
 	   sArr = obj[i].getAttribute("flyvalue").split("^");//段落id^序号^段落名称^段落样式
 	   
 	   for (var j=0;j<arr.length;j++ ){
 	   	
 	   	  tem = arr[j].substring(0,arr[j].indexOf("|"));
 	   	  
 	   	  if(sArr[0].trim()==tem.trim()){ 	
 	   	       
 	   	      vArr = arr[j].split("|");
 	   	      
 	   	      vArr.splice(0,2);//删除段落id字段,段落样式
 	   	  
 	   	      if(sArr[3]=="I")
 	             flyFormDataPageShowASectionFormData(obj[i],vArr,sFlag);
 	          else if(sArr[3]=="L")
 	             flyFormDataPageShowASectionListData(obj[i],vArr,sFlag);
 	      
 	          j=arr.length;   
 	      }  	
 	   }	   
 	}
	return;
}
  /**
   * 动态定义表单显示数据，显示一个表单段落的字段值
   * @param sectionObj     段落（指标）对象
   * @param sFlag         显示样式状态：E，编辑状态；S，显示状态。
   * @param arr            段落（指标）字段值 
     
     1）arr表单值拼串：|字段id|字段值| |字段id|字段值| |字段id|字段值...
     2）arr列表值拼串：序号|字段id|字段值|序号|字段id|字段值|序号|字段id|字段值...
   * @return 
   */
function flyFormDataPageShowASectionFormData(sectionObj,arr,sFlag){	
	
	var f = "";//字段id
	var flyflag = "";
	
	var obj = sectionObj.getElementsByTagName("*");//取得所有标签
 	
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   f = obj[i].id;//取得字段id
 	   
 	   for (var j=0;j<arr.length;j=j+3 ){ 	
 	   	   	
 	   	  if(f==arr[j+1]) {
 	   	  	
 	   	  	if(sFlag=="E")
 	   	       flyFormDataPageShowAObjEditData(obj[i],arr[j+2]);//显示一个字段value
 	   	    else if(sFlag=="S")
 	   	       flyFormDataPageShowAObjReadData(obj[i],arr[j+2]);//显示一个字段value
 	   	    
 	   	    j = arr.length;
 	   	  }
 	   } 	   
 	}
	
	return;
}
 /**
   * 动态定义表单显示数据。显示一个列表节的字段值
   * @param sectionObj     段落（指标）对象
   * @param sFlag          显示样式状态：E，编辑状态；S，显示状态。
   * @param arr            段落（指标）字段值:序号|字段id|字段值|序号|字段id|字段值|序号|字段id|字段值...     
     
   * @return 
   */
function flyFormDataPageShowASectionListData(sectionObj,arr,sFlag){	
	
	var m = "";
	var f = ""; 
	var obj = "";
	var rowObj = "";
	var tdObj = "";
	var flyflag = "";
	
	var tableObj = sectionObj.getElementsByTagName("table")[0];//取得table
	
  var n = tableObj.rows[1].cells.length;//取得列数
  
  //1、编辑状态,减去操作列和序号列;2、只读状态：减去序号列。
  n = (sFlag=="E") ? n-2 : n-1;
  
  /*
	if(sFlag=="E")
	   n = tableObj.rows[1].cells.length - 1;	//编辑状态有操作列，要减去操作列

	var n = tableObj.rows[1].cells.length - 2;	//取得列数，并减去操作列和序号列
	*/
	var r = arr.length/(n*3); //取得行数。因一个字段有三个数据，所有要除3
		
	//生成行，行数要比数据的少一个，因为原来有一个默认的。
	for (var m=1;m<r;m++ ){ 	
		
		var newTr = tableObj.rows[1].cloneNode(true);
		newTr.cells[0].getElementsByTagName("input")[0].value = m+1;
		tableObj.appendChild(newTr); 
	} 	
 	
  //显示数据
 	for (var j=1;j<tableObj.rows.length;j++ ){ 	 
 		
 		 rowObj = tableObj.rows[j];
 		 
 		 //取得一行的序号
 		 tdObj = rowObj.cells[0];
 		 m = tdObj.getElementsByTagName("input")[0].value.trim();//序号
 	  
 	   obj = rowObj.getElementsByTagName("*");//取得该行所有标签
 	
 	   for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	      flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	      if(!flyflag || flyflag.trim().length<1)
 	         continue;
 	      
 	      f = obj[i].id;//取得字段id	   
 	      
 	      for (var n=0;n<arr.length;n=n+3 ){ 	
 	   	   	
 	   	    if(m==arr[n].trim() && f==arr[n+1].trim()) {
 	   	  	
 	   	  	  if(sFlag=="E")
 	   	         flyFormDataPageShowAObjEditData(obj[i],arr[n+2]);//显示一个字段value
 	   	      else if(sFlag=="S")
 	   	         flyFormDataPageShowAObjReadData(obj[i],arr[n+2]);//显示一个字段value
 	   	    
 	   	      n = arr.length;
 	   	    }
 	      } 	   	     
 	   }
 	}
	
	return;
}
 /**
   * 自定义字段页面数据显示。显示两部分：1、固定表单数据；2、动态定义的节的列表数据。
   * @param sectionFatherId   节的父级对象Id.
   * @param fixFormId         固定表单对象Id.
   * @param strData           显示数据字符串。
                两部分信息：固定表单数据~~^节的数据
              固定表单数据：以|拼串
                  节的数据：节々节々节々节々节...
                一节的数据：节id|节序号|节名称|节样式|字段序号^字段名称^字段类别^字段长度^字段说明^字段序号^字段名称^字段类别^字段长度^字段说明^字段序号^字段名称^字段类别^字段长度^字段说明...
     
   * @param sFlag              显示样式状态：E，编辑状态；S，显示状态。  
   * @return 
   */
function flyFormDataPageShowDefSectionsPage(sectionFatherId,fixFormId,strData,sFlag){	
	
	 var arr = strData.split("~~^");
	 var sArr = new Array();
	 var sObj = "";
	 var sId = "";
	 
	 //alert(arr[0]);
	 //alert(arr[1]);
	 //显示固定数据
	 flyFormDataPageShowData(fixFormId,arr[0],sFlag);
	 
	  //显示节数据
	 var sArr = arr[1].split("々");
	 
	 for(var i=0;i<sArr.length;i++){
	 	
	 	  //生成节，从第二个生成，因为有一个固定的。
	 	  if(i>0) {
	 	  	
	 	  	 flySectionPageCopyFirstSection(sectionFatherId,sFlag);//复制生成一个节
	 	  	
	 	  }
	 	  
	 	  sObj = flySectionPageGetLastSection(sectionFatherId);//取得最后一个节
	 	  
	 	  sId = sArr[i].substring(0,sArr[i].indexOf("|"));//取得节id
	 	  
	 	  sObj.id = sId;	//节div赋值节id
	 	  //alert(sArr[i]);
	 	  flyFormDataPageShowData(sId,sArr[i],sFlag);//显示一节数据	 	
	 }
}
 /**
   * 根据定义显示页面样式（不含数据）。显示两部分：1、固定表单数据；2、动态定义的节的列表数据。
   * @param sectionFatherId   节的父级对象Id.
   * @param fixFormId         固定表单对象Id.
   * @param strData           显示数据字符串。
                1、两部分信息：固定表单数据~~^节的数据
              2、固定表单数据：表单数据以|拼串，列表数据作为一个表单（内数据以^拼串）
                  3、节的数据：节々节々节々节々节...
                4、一节的数据：段落id^序号^段落名称^段落样式|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别|字段id^字段名称^字段（表单）类别^字段数据类别。
         
                      (1)段落id^段落样式^序号^段落名称.
                      (2)段落（指标）样式：I，表单；L，列表
     	        5、一个字段数据：每个字段四个信息，以^拼串。
                      (1)	字段id，  表单代码
                      (2)	字段名称，字段显示名称
                      (3)	字段（表单）类别： I整数；D小数,L百分比,T文本,S区间为input，DA，日期弹窗选择；以PM开头，弹窗多选，以PS开头，弹窗单选；以SD开头，下拉列表动态取值，以SF开头，下拉列表固定值。弹窗和下拉列表，需在flycreateformselect.js和flycreateformpopwin.js定义好。
                      (4)	字段数据类别，文本为长度，小数为小数点几位，弹窗为多选（multiple）还是单选等，没有为空。
                     （5） 字段顺序，根据取得定义时排序（order by）

   * @param sFlag              显示样式状态：E，编辑状态；S，显示状态。  
   * @return 
   */
function flyFormDataPageShowDefFormPage(sectionFatherId,fixFormId,strData,sFlag){	
	
	 var arr = strData.split("~~^");
	 
	 //显示固定数据
	 flyFormDataPageShowData(fixFormId,arr[0],sFlag);
	
	 //根据定义显示表单，不含数据
	 flyFormDataPageCreateSections(sectionFatherId,arr[1],"W",sFlag);
}
 /**
   * 在编辑页面，显示主信息的明细信息列表。没有翻页、复选框，有序号。
   * 1、下方行信息根据标题行取得
     2、下方后台返回值以'|'拼串，第一个为该行键值，往后为各列值.
     3、键值由多个值组成，则以'^'拼串     

   * @param showInfo    显示内容，以分隔符拼串，第一个为该行键值，往后为各列值    
   * @param tableId     列表table的id   
   * @param flag        分隔符
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。    
   * @param orderFlag   自动生成序号标识，Y,自动生成序号。
   * @return 
   */
function flyFormDataPageShowList(showInfo,tableId,flag,sFlag,orderFlag){	
	
	//在显示数据前，将原来数据全部删除。
	//flyListPageDelList();	
	
	//1、取得列数
	var tableList = document.getElementById(tableId);
	var n = tableList.rows[0].cells.length;	//实际应该减去操作列，但还得加键值列，正好抵消。
	
	//自动生成序号，每列值少一个。
	if(orderFlag && orderFlag=="Y") 
	  n = n-1;
	  
	//2、显示	
	var str = "";
	var m = 0;//序号
	var arr = showInfo.split(flag);
	
	//3、登录岗位权限标识，S只读权限，E编辑权限
	var opCol = "";		
	if(sFlag == "S") {
		
	   opCol = "<td align='center'><a href='#' onclick='flyFormDataPageShowListShow(this);'>明细</a></td>";
	   
	}else if(sFlag == "E"){		
	   
		 opCol+="<td align='center'><a href='#' onclick='flyFormDataPageShowListUpd(this)'>明细</a> | <a href='#' onclick='javascript:flyFormDataPageShowListDel(this);'>删除</a></td>";
	
	}else if(sFlag == "D"){		
	   
		 opCol+="<td align='center'><a href='#' onclick='flyFormDataPageShowListShow(this)'>明细</a> | <a href='#' onclick='javascript:flyFormDataPageShowListDel(this);'>删除</a></td>";
	}
	
	for(var i=0;i<arr.length;i=i+n){
		
		str+="<tr flyvalue='"+arr[i]+"' ondblclick='flyFormDataPageShowListShow(this);'>";
				
		if(orderFlag && orderFlag=="Y"){
		  m++;
		  str+="<td align='center'>"+m+"</td>";
		}
		
		for(var j=1;j<n;j++)		
		  str+="<td align='"+flyListPageTdAlign_a[j-1]+"'>"+arr[i+j]+"</td>";
		
		str+= opCol;
		
		str+="</tr>";		
	}
	
	tableList.innerHTML = tableList.innerHTML + str;
	
	return; 
}
//删除列表全部数据，只保留第一行（标题行）。在显示新数据前，将原来数据全部删除。
function flyFormDataPageShowListEmpty(tableId){	
	
	var tableObj = document.getElementById(tableId);
  var n = tableObj.rows.length;  
  for(var i=0;i<n-1;i++)
  	tableObj.deleteRow(n-i-1);
  	
  return;	
}
 /**
   * 在编辑页面，修改主信息明细列表的一行数据。键值不变、序号不变
   * @param tableId   列表table的id   
   * @param mark      分隔符
   * @param dataKey   键值
   * @param trData    行数据。格式：键值|序号|字段|字段|字段|字段...
   * @param sFlag     显示样式状态：E，编辑状态；S，显示状态。 
   * @return 
   */
function flyFormDataPageShowListUpdTr (tableId,mark,dataKey,trData,sFlag){	
	
	var tableList = document.getElementById(tableId);
	var arr = trData.split(mark);
	
	var tdObj = "";	
	var n = 0;	
	
	for(var i=1;i<tableList.rows.length;i++){
		
		  if(tableList.rows[i].getAttribute("flyvalue")==dataKey){
		  	
		  	  tdObj = tableList.rows[i].cells;
		  	  
		  	  n = (sFlag == "E") ? tdObj.length-1 : tdObj.length;//编辑时有操作列，要减去；显示没有操作列，不减。
		  	
		  	  for(var j=1;j<n;j++){//序号不变，所以从1开始，同时减去操作列。
		  	
		  	     tdObj[j].innerHTML = arr[j+1]; //行数据，前两个为键值和序号，所以从2开始。
		  	  
		  	  }
		  	  
		  	  break;		  	
		  }  
	}
	return;	
}
 /**
   * 在编辑页面，主信息的明细列表删除一条数据。   
   * @param obj    链接a对象
   * @return 
   */
function flyFormDataPageShowListDel(obj){	
	
	if (confirm("是否确认删除？")==true){
		
	    var trObj = obj.parentNode.parentNode;
	
	    //调用实际页面方法，进行数据删除处理,成功后，将该行删除。
	   if(listDelInter(trObj.getAttribute("flyvalue")));	
	      trObj.parentNode.removeChild(trObj);	
	}
	return;	
}
 /**
   * 在编辑页面，主信息的明细列表弹出修改页面。   
   * @param obj    链接a对象
   * @return 
   */
function flyFormDataPageShowListUpd(obj){	
	
	var trObj = obj.parentNode.parentNode;
	
	//调用实际页面方法，进行删除处理,删除成功后，将该行删除。
	listUpdInter(trObj.getAttribute("flyvalue"));	
	   
	return;	
}
 /**
   * 在编辑页面，主信息的明细列表弹出显示页面。   
   * @param obj    链接a对象
   * @return 
   */
function flyFormDataPageShowListShow(obj){	
	
	var trObj = obj.parentNode.parentNode;
	
	//调用实际页面方法，进行删除处理,删除成功后，将该行删除。
	listShowInter(trObj.getAttribute("flyvalue"));	
	   
	return;	
}
/**
   * 将表单设置为可编辑或只读状态。
      可编辑：背景置白，显示必输星号，select、input可输入，disable=false。 
        只读：背景灰，不显示必输星号，select、input不可输入，disable=true。 
   * @param objId        设置表单对象id   
   * @param flag         S，只读；E编辑。
   * @param isBgC        只读时背景是否置灰。Y，置灰；
   * @param isBorder     只读时表单边框线是否有。 Y，边框线没有。
   * @return 
   */
function flyFormDataPageSetFormStatus(objId,flag,isBgC,isBorder){		
	
	var tem = "";
	var temObj = "";
	var showType = "";	
	var labelObjs = "";
  var flyflag = "";	
  var flyupd = "";	
  var flytype = "";	
 
  var obj = "";	
  var bgC = "white"; //背景颜色
  var bord = false;  //是否有边框 
  
  
  var b = (flag=="E") ? false : true; 
  var f3 = (flag=="E") ? "inline-block" : "none";
  
  if(flag=="S" && isBgC && isBgC=="Y")//背景置灰
     bgC = "#f6f6f6";
     
  if(flag=="S" && isBorder && isBorder=="Y")//边框线没有
     bord = true;  
 
 	//var form1 = document.getElementById(objId).getElementsByTagName("*");//取得所有标签
 
  obj = document.getElementById(objId);//取得对象
  var form1 = obj.getElementsByTagName("*");//取得所有标签
  var tableForm = obj.getElementsByTagName("table");//取得table
  
  
  //将动态增加行的table编辑表单，弹出按钮显示或隐藏
  for (var i=0;i<tableForm.length;i++ ){ 	
  	
  	 flyupd = tableForm[i].getAttribute("flyupd"); 
  	 flyflag = tableForm[i].getAttribute("flyflag"); 
  	 if(!flyflag || flyflag!="5" || (flyupd && flyupd=="3"))//非动态增加行的table不处理
 	      continue;
 	      
 	   
 	   n = tableForm[i].rows[0].cells.length;//取得列数
 	   
 	   //隐藏或显示最后一列操作列
 	   for (var j=0;j<tableForm[i].rows.length;j++ ){	 
 	   	
 	   	   temObj = tableForm[i].rows[j].cells[n-1];
 	   	   
 	   	   //最后一列不是弹出按钮，则不隐藏
 	   	   tem = temObj.getElementsByTagName("input")[0]; 	   	   
 	   	   if(!tem || tem.type!="button") 	
 	   	      continue;   	   
 	   	
 	   	   if(f3=="inline-block")	
 	   	      tableForm[i].rows[j].cells[n-1].style.display =  "inline"; 	
 	   	   else
 	   	   	  tableForm[i].rows[j].cells[n-1].style.display =  f3; 
 	   }
  }
  
  //设置表单只读或编辑状态。
 	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyflag = form1[i].getAttribute("flyflag"); 
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   showType = form1[i].getAttribute("flytype"); 
 	   
 	   if(showType && showType=="C"){//为C则进行隐藏或显示处理，通过flytype设置
 	   	
 	   	   form1[i].style.display = f3; 	   	  
 	   }
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || (flyupd && flyupd=="3"))
 	      continue;
 	      
 	   if(flyflag=="0" || flyflag=="1" || flyflag=="2" || flyflag=="8"){
 	   	
 	       //form1[i].style.backgroundColor = "white";
 	       form1[i].style.backgroundColor = bgC;
 	       
 	       form1[i].disabled = b;	 	       
 	       
 	       if(bord)
 	         form1[i].style.border = "0px"; 	
 	       //else if(form1[i].readOnly != true)
 	       else
 	       	 form1[i].style.border = "1px #ddd solid"; 	         
 	       
 	       if(flag=="S" && form1[i].tagName=="SELECT")//隐藏下拉列表箭头
 	          form1[i].className = "select-not-arrow";
 	       else if(flag=="E" && form1[i].tagName=="SELECT")//显示下拉列表箭头
 	       	  form1[i].className = ""; 	       	  
 	       
 	       //处理onclick事件
 	   	   flytype = form1[i].getAttributeNode("onclick");
 	   	   if(flytype){
 	   	  		
 	   	  		if(flag=="S"){//去除onclick事件，将之置于flyonclick
 	   	  			
 	   	  			 if(flytype.nodeValue && flytype.nodeValue.trim().length>0){//解决多次点击置空问题
 	   	  			 	
 	   	  	         form1[i].setAttribute("flyonclick",flytype.nodeValue); 	   	  	   
 	   	  	         flytype.nodeValue = null;
 	   	  	     }
 	   	  	        	  	   
 	   	  	  }else if(flag=="E"){//恢复onclick事件
 	   	  			 	   	  	   
 	   	  	     flytype.nodeValue = form1[i].getAttribute("flyonclick");  	   	  	     
 	   	  	  }
 	   	  	} 
 	         
 	   }else if(flyflag=="4"){   
 	   	    
 	   	  	//处理onclick事件
 	   	  	flytype = form1[i].getAttributeNode("onclick");
 	   	  	if(flytype){
 	   	  		
 	   	  		if(flag=="S"){//去除onclick事件，将之置于flyonclick
 	   	  			
 	   	  			  if(flytype.nodeValue && flytype.nodeValue.trim().length>0){//解决多次点击置空问题
 	   	  	          form1[i].setAttribute("flyonclick",flytype.nodeValue); 	   	  	   
 	   	  	          flytype.nodeValue = null; 	
 	   	  	      }
 	   	  	        	  	   
 	   	  	  }else if(flag=="E"){//恢复onclick事件
 	   	  			 	   	  	   
 	   	  	     flytype.nodeValue = form1[i].getAttribute("flyonclick"); ; 	   	  	   
 	   	  	  }
 	   	  	} 
 	   	  	
 	   	  	//处理删除叉号
 	   	  	labelObjs = form1[i].getElementsByTagName("label");
 	   	  	
 	   	  	for (var m=0;m<labelObjs.length;m++ ){ 	
 	   	  		
 	   	  		 tem = labelObjs[m].innerHTML;
 	   	  		 
 	   	  		 if(flag=="S" && tem.indexOf("<a")>0){
 	   	  		 	
 	   	  		     labelObjs[m].innerHTML =  tem.substring(0,tem.indexOf("<a"));
 	   	  		    
 	   	  		 }else if(flag=="E" && tem.indexOf("<a")<0){
 	   	  		 	
 	   	  		 	   labelObjs[m].innerHTML = tem  +"<a href='#' onClick='commonSelectDelSelLabel(this,event);'>╳</a>";     
             
             }
          }
          //处理边框
          if(flag=="E")
             form1[i].style.border = "1px #ddd solid";
           else
           	 form1[i].style.border = "0px";
           	 
         //如果是附件，添加附件显示
         if(form1[i].className == "attch_files_span" && isExitsFunction("flyShowPageAttchImg"))              
              flyShowPageAttchImg(form1[i].id,"flyShowPageImgLayerId","flyShowPageImgTitleLayerId");   
 	   	  	
 	   }else if(flyflag=="3"  && form1[i].tagName!="INPUT"){
 	   	  	   	    
 	   	   form1[i].style.display = f3; 	   
 	   }
 	} 	
}
/**
   * 将动态增加行的table编辑表单，设置为可编辑或只读状态。
      可编辑：显示必输星号，select、input可输入，disable=false，显示弹出条按钮。 
        只读：不显示必输星号，select、input不可输入，disable=true，隐藏弹出条按钮。 
   * @param objId     设置表单对象id   
   * @param flag      S，只读；E编辑。
   * @return 
   */
function flyFormDataPageSetTableFormStatus(objId,flag){		
	
  var flyflag = "";	
  var flyupd = "";	
  var obj = "";	
  var n = 0;
  
  var b = (flag=="E") ? false : true;
  var bgC = (flag=="E") ? "white" : "#f6f6f6";
  var f3 = (flag=="E") ? "inline-block" : "none";
 
 	obj = document.getElementById(objId);//取得对象
  var form1 = obj.getElementsByTagName("*");//取得所有标签
  var tableForm = obj.getElementsByTagName("table");//取得table
  
  
  //将将态增加行的table编辑表单，弹出按钮显示或隐藏
  for (var i=0;i<tableForm.length;i++ ){ 	
  	
  	 flyflag = tableForm[i].getAttribute("flyflag"); 
  	 if(!flyflag || flyflag!="5")//非态增加行的table不处理
 	      continue;
 	      
 	   
 	   n = tableForm[i].rows[0].cells.length;//取得列数
 	   
 	   //隐藏或显示最后一列操作列
 	   for (var j=0;j<tableForm[i].rows.length;j++ )	 	   	
 	   	   tableForm[i].rows[j].cells[n-1].style.display =  f3; 	
  }
  
  
  //设置表单只读或编辑状态。
 	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyflag = form1[i].getAttribute("flyflag"); 
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || (flyupd && flyupd=="2"))
 	      continue;
 	      
 	   if(flyflag=="0" || flyflag=="1" || flyflag=="2" || flyflag=="8" || flyflag=="4"){
 	   	
 	       //form1[i].style.backgroundColor = bgC;
 	       
 	       form1[i].disabled = b;	
 	         
 	   }else if(flyflag=="3" && form1[i].tagName!="INPUT")  	   	    
 	   	   form1[i].style.display = f3; 	   
 	} 	
 	
}
/**
   * 将表单设置为可编辑或只读状态。
      可编辑：背景置白，显示必输星号，select、input可输入，disable=false。 
        只读：背景置白，不显示必输星号，select、input不可输入，disable=true。 
   * @param obj       设置表单对象   
   * @param flag      S，只读；E编辑。
   * @return 
   */
function flyFormDataPageSetFormObjStatus(obj,flag){		
	
  var flyflag = "";	
  
  var b = (flag=="E") ? false : true;
  var bgC = "white";
  //var bgC = (flag=="E") ? "white" : "#f6f6f6";
  var f3 = (flag=="E") ? "inline-block" : "none";  
 
  var form1 = "";
  if (typeof(obj) == "string")
    form1 = document.getElementById(obj).getElementsByTagName("*");//取得所有标签
  else if (typeof(obj) == "object")
 	  form1 = obj.getElementsByTagName("*");//取得所有标签
 
 	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyflag = form1[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   if(flyflag=="0" || flyflag=="1" || flyflag=="2" || flyflag=="8"){
 	   	
 	       form1[i].style.backgroundColor = bgC;
 	       
 	       form1[i].disabled = b;	
 	         
 	   }else if(flyflag=="3")  	   	    
 	   	   form1[i].style.display = f3; 	   
 	} 	
}
/**
   * 将表单设置为可编辑或只读状态。
      可编辑：背景置白，显示必输星号，select、input可输入且显示边框，disable=false。flytype='E'的按钮，显示。
        只读：背景置白，不显示必输星号，select、input不可输入且不显示边框，disable=true。 flytype='E'的按钮，隐藏。
   * @param obj       设置表单对象   
   * @param flag      S，只读；E编辑。
   * @return 
   */
function flyFormDataPageSetFormDivStatus(obj,flag){		
	
  var flytype = "";	
  var flyflag = "";	
  
  var b = (flag=="E") ? false : true;  
  var f3 = (flag=="E") ? "inline-block" : "none";  
  var bo = (flag=="E") ? "1px #ddd solid" : "0";
 
  //取得所有标签
  var form1 = "";
  if (typeof(obj) == "string")
    form1 = document.getElementById(obj).getElementsByTagName("*");//取得所有标签
  else if (typeof(obj) == "object")
 	  form1 = obj.getElementsByTagName("*");
 
 	for (var i=0;i<form1.length;i++ ){ 	   	
 		
 		flyflag = form1[i].getAttribute("flyflag"); 
 		flytype = form1[i].getAttribute("flytype"); 
 		
 		if(!flyflag && !flytype)
 	      continue;
 	  
 	   //编辑按钮，根据编辑和只读状态改变 	   
 	   if(flytype && flytype=="C")
 	      form1[i].style.display = f3;
 	   
 	   //必输星号，根据编辑和只读状态隐藏和显示 	   
 	   if(flyflag && flyflag=="3")
 	   	  form1[i].style.display = f3;
 	   	   
 	   //input和span，根据编辑和只读状态改变边框
 	   if(form1[i].tagName=="INPUT" || form1[i].tagName=="SPAN"){
 	   	
 	   	  //form1[i].style.cssText = bo;
 	   	  form1[i].style.border = bo;
 	   	  form1[i].style.backgroundColor = "white";
 	   	  form1[i].disabled = b;	 	   	  
 	   }
 	} 	
 	return;
}
/**
   * 将弹出面板按钮设置为失效或有效。
   * @param obj       设置表单对象   
   * @param flag      S，只读；E编辑。
   * @return 
   */
function flyFormDataPageSetPopStatus(obj,flag){	
	
	 var b = (flag=="E") ? false : true;
	
	 var popButton = obj.getElementsByTagName("input");
	
	 for (var i=0;i<popButton.length;i++ ){ 
	 	
	 	   if(popButton[i].type=="button")
	 	      popButton[i].disabled = b;	
	 	
	 }
}
/**
   * 将附件或图片显示到一个span内。每个附件或图片形成label
   * @param obj       span表单对象   
   * @param srcStr    信息拼串。
   * @param mark      拼串符号。
   * @return 
   */
function flyFormDataPageShowAObjAttch(obj,srcStr,mark){	
		  
	  if(srcStr.indexOf("⌒")<0)
	     return;	     
	  
	  var n = 0;
	  var labelObj = "";
	  
	  obj.innerHTML = "";
   
    var arr = srcStr.split(mark);	 
    
    for(var j=0;j<arr.length;j++){  
           	
        labelObj =  document.createElement("label"); 
           	
        labelObj.setAttribute("flyvalue",arr[j]);
        n = arr[j].lastIndexOf("⌒");
           	 
        labelObj.innerHTML =  arr[j].substring(n+1);           
        obj.appendChild(labelObj);            	
    }  
}
/**
   * 将附件或图片显示到一个span内,返回字符串。每个附件或图片形成label
   * @param obj       span表单对象   
   * @param srcStr    信息拼串。
   * @param mark      拼串符号。
   * @return 
   */
function flyFormDataPageShowAStrAttch(srcStr,mark){	
		  
	  if(srcStr.indexOf("⌒")<0)
	     return "";	     
	  
	  var n = 0;
	  var str = "";	 
    var arr = srcStr.split(mark);	 
    
    for(var j=0;j<arr.length;j++){  
        
        n = arr[j].lastIndexOf("⌒");
        
        str+= "<label flyvalue='"+arr[j]+"'>"+arr[j].substring(n+1)+"</label>";
               	
    }  
    
    str = "<span>"+str+"</span>";
    
    return str;
}
/**
   * 清空一个表单区域的编辑内容。
   * @param trObj         表单区域对象   
   * @param isOrder       是否保留序号。Y,保留。
   
   * @return     
   */
function flyFormDataPageClearTrData(trObj,isOrder) {	
	     
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
   * 计算一个表格内，指定1列的数据合计。
   * @param tableId        表格对象或id
   * @param colNum         计算合计列，从0开始计数的列
   * @param startRow       开始行，默认为1,即第二行
   * @param endRow         结束行,默认为tableObj.rows.length-1，即倒数第二行
   
   * @return     
   */
function flyFormDataPageGetTableColSum(tableId,colNum,startRow,endRow) {	
	
	var tableObj = "";
	var v = "";
	var sum = 0;	
	
	if (typeof(tableId) == "string") {
	   tableObj = document.getElementById(tableId);  
	}else
		 tableObj = tableId;
	
	 
	//计算 
	for (var i=startRow;i<tableObj.rows.length-endRow;i++ ){ //从第二行开始，并减去总计行
		 		 		
		 		v = tableObj.rows[i].cells[colNum].getElementsByTagName("input")[0].value;
		    sum+= (v.trim().length<1) ? 0 : parseFloat(v);			 	   
	   
	}	 	
	  	   
	return sum;		
}
/**
   * 计算一个表格内，指定列到最后一行合计。
   * @param tableId        表格对象或id
   * @param colArr         列数组,从0开始的序号
   
   * @return     
   */
function flyFormDataPageTableSum(tableId,colArr) {	
	
	var tableObj = "";
	var v = "";
	
	var arr = new Array(colArr.length);
	for(var i = 0;i <arr.length;i++){
       arr[i] = 0;
  }
	
	if (typeof(tableId) == "string") {
	   tableObj = document.getElementById(tableId);  
	}else
		 tableObj = tableId;
		 
	
	//计算 
	for (var i=1;i<tableObj.rows.length-1;i++ ){ //从第二行开始，并减去总计行
		 
		 	for (var j=0;j<colArr.length;j++ ){ 
		 		
		 		  v = tableObj.rows[i].cells[colArr[j]].getElementsByTagName("input")[0].value;
		      arr[j]+= (v.trim().length<1) ? 0 : parseFloat(v);			 	   
	    }	
	}	 
	
	//显示到总计行
	var sumRow = tableObj.rows[tableObj.rows.length-1];
	for (var j=0;j<colArr.length;j++ )		 		
		 	sumRow.cells[colArr[j]].getElementsByTagName("input")[0].value = arr[j];
		  	   
	return;		
}
/**
   * 表格内有合并行的，根据数据合并行段，与每个段的行数，生成表格。
   * @param tableId        表格对象或id
   * @param rowArr         整数段数组，长度为段数，每个段的数值为行数。
   * @param flag           类别，E，编辑表格；S，显示表格。
   
   * @return     
   */
function flyFormDataMergeTableCreate(tableId,rowArr,flag) {	
	
	
	var tableObj = "";
	
	if (typeof(tableId) == "string") {
	   tableObj = document.getElementById(tableId);  
	}else
		 tableObj = tableId;
		 
  var flyrowspan = tableObj.getAttribute("flyrowspan");
  if(!flyrowspan || flyrowspan.trim().length<1)
     return;
		 
	var arr = flyrowspan.split(",");//合并列序号，从0开始，以英文,分割。
	
	
	var spanObj = tableObj.rows[1].cloneNode(true);	 
	var temObj = spanObj.cloneNode(true);	
	var firstObj = "";
	var newTr = "";		
	
	var m = 0;
	var n = 0;	
	var orderNo = 0;	
	var num = 0;	
	
	//是否有序号
	if(flag=="E"){
		
		 firstObj = tableObj.rows[1].cells[0].getElementsByTagName("input");
		 if(firstObj.length>0)
		    orderNo = firstObj[0].value;	
		
	}else if(flag=="S"){
		
		 orderNo = tableObj.rows[1].cells[0].innerHTML;
	}	   
	
	
	//生成非合并行
	for (var j=0;j<arr.length;j++ ){ 
		
		   m = parseInt(arr[j]) - n;
	 	   	   	   	  	   
	 	   temObj.deleteCell(m); 
	 	   	   	   	  	 
	 	   n++;	 	   	   	   
	}	
	
	//合并行跳过非合并行数据。因为后台查询时，将重复的合并行数据也一并查询出来，所以显示时，非合并行要跳过这些数据。
	//flyflag=17，跳过合并行的数据。有多少个合并行，就跳过多少个。
	temObj.setAttribute("flyflag","17");
	temObj.setAttribute("flyvalue",arr.length);
	
	
	//删除原来的行,除标题外，全部删除
	//tableObj.deleteRow(1);
	flyFormDataPageDelTableTr(tableObj,1);
	
	//alert(tableObj.innerHTML);
	//alert(rowArr);
	
	//生成表格
  for(var i = 0;i <rowArr.length;i++){  	
  	
  	/*
  	 if(i==0)
  	     newTr = tableObj.rows[1];
  	 else
  	 	   newTr = spanObj.cloneNode(true);
  	*/ 	   
  	newTr = spanObj.cloneNode(true);
  	
  	 //设置rowspan
  	 for (var j=0;j<arr.length;j++ )  	 	
  	 	    newTr.cells[parseInt(arr[j])].setAttribute("rowspan",rowArr[i]);   	 	   
  	 
  	 
  	 //设置序号
  	 if(orderNo == "1" || orderNo == 1){
  	 	
  	 	  if(flag=="E")
  	 	      newTr.cells[0].getElementsByTagName("input")[0].value = i+1;
  	 	  else if(flag=="S")
  	 	  	  newTr.cells[0].innerHTML =  i+1; 
  	 }
  	    
  	 //生成合并行
  	 //if(i>0)
  	   tableObj.appendChild(newTr); 
  	 
  	 //生成非合并行
  	 num = parseInt(rowArr[i])-1;
  	 for(var j = 0;j <num;j++)
  	 	  tableObj.appendChild(temObj.cloneNode(true)); 
  }
  
  return;
  
}
/**
   * 动态增加行，行内部门下拉列表改变，对应改行人员下拉列表改变。
     指定:
        1、人员下拉列表，在部门下拉列表后一个td内容。
        2、页面有全局变量loginInsId_a
     
   * @param obj        部门select 对象
  
   * @return     
   */
function flyFormDataTrDeptChange(obj) {	
	
	  var trObj = obj.parentNode.parentNode;
	  var n = obj.parentNode.cellIndex;
	  var perSelObj = trObj.cells[n+1].getElementsByTagName("select")[0];
	  
	  perSelObj.options.length=0;
	
	  commonSelectInit("personNewSel",loginInsId_a+"|"+obj.value,"",perSelObj,"","");//人员下拉列表
}
