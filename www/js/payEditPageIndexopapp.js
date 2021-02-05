/**
 * Created by hzy on 2019/7/10.widesky technology information, Inc. | flywings/license
 */
 
//设置指标是否输入，根据支出设置，确定指标区域为默认，或特定岗位输入

function setIndexArea(){	
	
	if(isPostSetPayIndex())//设置为录入人不选择指标，则不显示指标输入表单。	    
	   document.getElementById("indexArea").style.display = "none";
	   
}
function isPostSetPayIndex(){
	
	var pageObj = flyEditPageGetGlobalPageObj();
	var flag = pageObj.payIndexSet_a.flag;
	//var flag = self.parent.banner.payIndexSet_a.flag;
	//alert(flag);
	if(flag && flag == "N")//设置为录入人不选择指标，则不校验。	    
	   return true;
	   
	return false;	   
}
/** 
   * 保存校验。实现flyeditpage接口。
   * 实现js接口.修改或保存提交时，当前特殊业务进行校验。
   * (必输、编码合规性、数字、长度、非法字符这里不用校验，程序已自动校验。)  
   1、校验预算指标是否选择
   2、校验指标是否超额
   3、指标金额是否与保险金额一致      
   * @sumNum 合计总额表单数量，2，转账与公务卡，cashAmtId、pubAmtId；1，金额，planAmt；3，第三方转账，planAmt
             默认为2
   * @return true or false
   */
function payEditPageIndexCheck(sumNum){
	
	 if(!sumNum)
	    sumNum = 2;
	    
	 var balance = 0;//指标可用金额
	 var use = 0;//本次使用金额
	 
	 var balanceIndex = 0;//一个指标可用金额
	 var useIndex = 0;//一个本次使用金额
	 
	 var bValue = "";
	 var uValue = "";
	 var t = 0;//合计总金额
	
	 //1、校验预算指标是否选择
	 var inputObj = "";
	 var tableObj = document.getElementById("indexTable");
	 
	 for (var i=1;i<tableObj.rows.length;i++ ){ 	
	 	  
	 	  inputObj = tableObj.rows[i].cells[1].getElementsByTagName("input")[0];
	 	  bValue = tableObj.rows[i].cells[3].getElementsByTagName("input")[0].value;
	 	  uValue = tableObj.rows[i].cells[4].getElementsByTagName("input")[0].value;
	 	  
      if(inputObj.value.trim().length<1 || !inputObj.getAttribute("flyvalue")){
	 	
	 	     alert("请选择预算指标");
	 	     return false;
	    }
	    
	    if(bValue.trim().length<1 || bValue=="0"){
	    	
	       alert("预算指标没有可用金额，请更换指标");
	 	     return false;
	    }
	    
	    if(uValue.trim().length<1 || uValue=="0"){
	    	
	       alert("请输入指标使用金额");
	 	     return false;
	    }
	    
	    balanceIndex = parseFloat(bValue);//该指标可用金额
	    useIndex = parseFloat(uValue);//该指标使用金额
	    
	    if(useIndex>balanceIndex){
	    	
	       alert("抱歉，"+inputObj.value+"指标使用金额大于可用金额");
	 	     return false;
	    }
	    
	    balance = balance + balanceIndex;//指标可用金额
      use = use + useIndex;//本次使用金额
      //balance = balance + parseFloat(bValue);//指标可用金额
      //use = use + parseFloat(uValue);//本次使用金额
   }
   
   //2、校验指标是否超额
    if(sumNum == 2){
    	
        var cashAmt = document.getElementById("cashAmtId").value;
	      var pubAmt = document.getElementById("pubAmtId").value;
	  
	      var c = (cashAmt.trim().length<1) ? 0 : parseFloat(cashAmt);
	      var p = (pubAmt.trim().length<1) ? 0 : parseFloat(pubAmt);
	      t = c+p;
	      
	  }else  if(sumNum == 1){
	  	
	  	  var cashAmt = document.getElementById("planAmt").value;
	  	  t = (cashAmt.trim().length<1) ? 0 : parseFloat(cashAmt);
	  }
	  
	  if(t>balance){
	    	
	     alert("报销金额超出预算指标金额，请重新选择指标。");
	 	   return false;
	  }
   
   //3、指标金额是否与报销金额一致
    if(t!=use){
	    	
	     alert("报销金额与预算指标金额使用金额不一致，请重新设置。");
	 	   return false;
	  }   
	  
	  return true;
}
/** 
   * 审批中修改，进入修改页面，按审批可修改的字段处理页面。
   * 不可修改的，置readonly；可修改的，特殊标出颜色。   
   
   * 1)	隐藏计算按钮
     2) 置非flyUpd=3表单不可修改
     3）可修改字段，显示红色边框
   * @return 
   */
function payEditPageAppUpdStyle(){
	
	var flyupd = "";	
	var flytype = "";	
	var flyflag = "";		
	
	var trObj = "";
	var tableObj = "";
	
	flyFormDataPageSetFormStatus("editForm","S","","");
	
	//1、如果为差旅报销，隐藏计算按钮 travelPerSelId
	if(document.getElementById('travelCountButtonId'))
	   document.getElementById('travelCountButtonId').style.display="none";
	   
	//2、如果为差旅报销，隐藏编外人员选择按钮 
	if(document.getElementById('travelPerSelId'))
	   document.getElementById('travelPerSelId').style.display="none";
	
	var form1 = document.getElementById("editForm").getElementsByTagName("*");
	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   	   
 	   if(flyupd && flyupd=="3")
 	      form1[i].style.border = "1px red solid"; 	
 	   else if(flyupd && flyupd=="4")
 	      form1[i].style.border = "1px #FF8040 solid"; 	     
 	}
 	
 	payEditPageAppUpdTrStyle();
	
}
/** 
   * 审批中修改，进入修改页面,对可修改表单的行：

   1）	可编辑行，添加点击增加新行事件
   2）	修改行，表单置可编辑，显示绿色边框   
   3）	修改行，添加点击删除行事件
   4）	修改行隐藏不可编辑表单，flyupd=5的不隐藏
  
   * @return 
   */
function payEditPageAppUpdTrStyle(){
	
	var form1 = document.getElementById("editForm").getElementsByTagName("tr");
	for (var i=0;i<form1.length;i++ ){ 	  
		
		  tableObj = form1[i].parentNode;	 
	    if(tableObj.tagName == "TBODY")
	       tableObj = tableObj.parentNode;
	      
	   flyflag = tableObj.getAttribute("flyflag");
	      
	   if(!flyflag || flyflag != "5")//非动态增加行table
	       continue;
	       
	   //取得行第一个input，一般为序号，第一个非序号的，为hidden表单，作为修改行标识。
	   //inputObj = form1[i].getElementsByTagName("var");
	   inputObj = form1[i].getElementsByTagName("input");
	   if(inputObj.length>0 && inputObj[0].type!="hidden")
	   	   inputObj = form1[i].cells[0].getElementsByTagName("input");
	   	   
	   if(inputObj.length<1)
   	    continue;
	  
	   var flyvalue = inputObj[0].getAttribute("flyvalue");
	   
	   if(!flyvalue)
	      continue;     
	      
	   if(flyvalue=="-1" || flyvalue=="-1.00"){//可修改行，添加点击增加新行事件
	   	
	       form1[i].ondblclick = function (event)	{	
		  	
		  	    payEditPageAddEditTr(this);
         }
	   }else  if(flyvalue=="-2" || flyvalue=="-2.00"){//修改行，添加点击删除行事件;可修改表单为绿色边框;隐藏不可编辑表单，flyupd=5的不隐藏
	   
	       form1[i].ondblclick = function (event)	{	
		  	
		  	    payEditPageDelEditTr(this);
         }
         
         //隐藏不可修改的，没有修改的。
 	       for (var j=0;j<form1[i].cells.length;j++ ){ 	 	   	
 	   	   
 	       	  inputObj = form1[i].cells[j].getElementsByTagName("input"); 
   	        if(inputObj.length<1)
   	          inputObj = form1[i].cells[j].getElementsByTagName("select"); 
   	    
   	        //非input、select暂不处理
   	        if(inputObj.length<1)   	    	    
   	    	      continue;   	    
   	    	    
   	    	  //序号不隐藏
   	    	  if(j==0 && inputObj[0].tagName=="INPUT" && isInteger(inputObj[0].value))
   	    		   continue;    		   
   	    		   	
   	    		flyupd = inputObj[0].getAttribute("flyupd"); 
 	   	   
 	   	      //非修改表单隐藏
 	          if(!flyupd || (flyupd!="4" && flyupd!="5")){
 	          	
 	             inputObj[0].style.display="none";
 	             
 	          //可修改表单置编辑状态
 	          }else if(flyupd=="4"){
 	          	
 	          	  inputObj[0].style.border = "1px #2E8B57 solid";//1、可修改置边框为绿色 	 
 	              inputObj[0].disabled = false;     //可修改
 	              if(inputObj[0].tagName=="SELECT")//显示下拉列表箭头
 	                inputObj[0].className = ""; 	 
 	          }
 	          	 
         }         
 	   }		
	}
}
/** 
   * 可修改表单所在行，双击时在下方增加行，可修改设定的表单数据
   
   * 1)	插入行
   * 2)	清空所有表单数据
   * 3)	将可修改表单边框置绿。
   * 4）计算序号，如果有序号
  
   * @return 
   */
function payEditPageAddEditTr(obj){
	
	 var inputObj = "";   
	 
	 //如果已插入修改行，则不再插入
   var tableObj = obj.parentNode;	 
	 if(tableObj.tagName == "TBODY")
	     tableObj = tableObj.parentNode;
	      
   if(tableObj.rows.length>obj.rowIndex+1){
   	
	 	 var nextTr = tableObj.rows[obj.rowIndex+1];	
	 	  	 
	 	 inputObj = nextTr.getElementsByTagName("input");   
	 	 
	 	 
	 	 var flyvalue = inputObj[0].getAttribute("flyvalue");
	 	 if(flyvalue=="-2" || flyvalue=="-2.00")
         return;
	 }
	 
	 //获得新行   
   var newTr = obj.cloneNode(true); 
   
   //设置序号flyvalue=-2，作为修改行标识符。
   inputObj = newTr.getElementsByTagName("input");     
   
   inputObj[0].setAttribute("flyvalue","-2");
   
   //设置表单可修改
   var form2 = obj.getElementsByTagName("*");	//select复制后，值变化了，要恢复为复制前的值。
   
   var form1 = newTr.getElementsByTagName("*");	 
	 for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   
 	   if(form1[i].tagName=="SELECT") {//select复制后，值变化了，要恢复为复制前的值。
 	   	
 	   	  form1[i].value = form2[i].value;
 	   }
 	   	   
 	   //隐藏不可修改表单
 	   if(!flyupd || (flyupd!="4" && flyupd!="5")){
 	   	
 	   	 if(form1[i].tagName=="SELECT" || form1[i].tagName=="INPUT")
 	        form1[i].style.display="none";	
 	        
 	      continue;       
 	   }
 	   if(flyupd=="5")
 	      continue;   
 	      
 	   //设置表单可修改
 	   form1[i].style.border = "1px green solid";//1、可修改置边框为绿色 	 
 	   form1[i].disabled = false;     //可修改
 	   if(form1[i].tagName=="SELECT")//显示下拉列表箭头
 	      form1[i].className = ""; 	
 	   //form1[i].setAttribute("flyvalue","-2");  //标识该字段为修改字段，该行为修改行
 	      
 	 }
 	 
 	 //序号列显示
 	 inputObj = newTr.cells[0].getElementsByTagName("input"); 
 	 if(inputObj.length>0 && isInteger(inputObj[0].value))
 	   inputObj[0].style.display="block";
 	   
    /*
   for (var i=0;i<newTr.cells.length;i++){
   	
   	    inputObj = newTr.cells[i].getElementsByTagName("input"); 
   	    if(inputObj.length<1)
   	       inputObj = newTr.cells[i].getElementsByTagName("select"); 
   	       
   	    if(inputObj.length<1)
   	    	 continue; 	    	    
   	     
   	    //1)可修改置边框为绿色
 	   	  flyupd = inputObj[0].getAttribute("flyupd"); 
 	   	  if(flyupd && flyupd=="2")  
 	         inputObj[0].style.border = "1px green solid"; 	 
 	   	  
 	   	 
 	      if(flyupd && flyupd=="2"){ 	      	
 	      	
 	      	 //1)可修改置边框为绿色
 	         inputObj[0].style.border = "1px green solid"; 	 
 	         
 	         //2)清空所有表单数据
 	         if(inputObj[0].tagName=="INPUT"){ 	         	   
 	         	   
   	           inputObj[0].value = "";     
               inputObj[0].setAttribute("flyvalue","");    
 	         } 	      
 	      }else 
 	      	 newTr.cells[i].innerHTML = ""; 	 
 	      
   }
   */ 
   
   // 3)插入行  
   if(tableObj.rows.length>obj.rowIndex+1){
	 	 var nextTr = tableObj.rows[obj.rowIndex+1];	 	 
	   nextTr.parentNode.insertBefore(newTr,nextTr);
	 }else
	 	 tableObj.appendChild(newTr); 
	 	 
	 //添加删除行事件
	 newTr.ondblclick = function (event)	{	
		  	
		  	payEditPageDelEditTr(this);
   }
  
   //4）重新设置序号，为显示序号，或隐藏hidden表单，作为序号标识。
	 inputObj = obj.getElementsByTagName("input"); 
	 if(inputObj.length>0 && isInteger(inputObj[0].value)){
	 	
	 	   var n = parseInt(inputObj[0].value);
	 	   
	 	   for (var i=obj.rowIndex+1;i<tableObj.rows.length;i++){
	 	   	
	 	   	   n++;
	 	   	   
	 	   	   tableObj.rows[i].getElementsByTagName("input")[0].value = n; 
	 	   }	 	
	 }	
}
/** 
   * 审批中修改，删除修改行。
   
     1）	重新计算数据（恢复原来行数据）
     2）	计算序号
     3）	删除行

   * @return 
   */
function payEditPageDelEditTr(obj){
	
	 var tableObj = obj.parentNode;	 
	 if(tableObj.tagName == "TBODY")
	     tableObj = tableObj.parentNode;
	     
	 var upTr = tableObj.rows[obj.rowIndex-1];	 
	 
	 var tdIndex = 0;	
	 var inputObj = "";	
	
	 //1、重新计算
	 var form1 = obj.getElementsByTagName("*");	 
	 for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   	   
 	   if(!flyupd || flyupd!="4" || !form1[i].tagName=="INPUT" || !isDecimal(form1[i].value))
 	      continue; 	 
 	      
 	   //取得被修改行对应数据对象
 	   tdIndex = form1[i].parentNode.cellIndex;	
     inputObj = upTr.cells[tdIndex].getElementsByTagName("input")[0];
     
     if(form1[i].value==inputObj.value)//没有修改
        continue; 	        
       
     //inputObj.defaultValue = form1[i].value;//原值设为修改值，进行计算。
 	   
 	   form1[i].defaultValue = form1[i].value;
 	   form1[i].value = inputObj.value;
 	   
 	   //alert(form1[i].value+" ; "+inputObj.defaultValue+" ; "+inputObj.value);
 	   //重新计算
 	   form1[i].onblur();     	  
 	 }
 	 
 	 //2、	删除行
 	 tableObj.deleteRow(obj.rowIndex);
 	 
 	  //3、重新设置序号，如果有序号
	 inputObj = upTr.getElementsByTagName("input"); 
	 if(inputObj.length>0 && isInteger(inputObj[0].value)){
	 	
	 	   var n = parseInt(inputObj[0].value);
	 	   
	 	   for (var i=upTr.rowIndex+1;i<tableObj.rows.length;i++){
	 	   	
	 	   	   n++;
	 	   	   
	 	   	   tableObj.rows[i].getElementsByTagName("input")[0].value = n; 
	 	   }	 	
	 }		
}
/** 
   * 审批中修改，进行校验。
   
   * @return 
   */
function payEditPageAppUpdSaveCheck(){
	
	var objId = flyEditPageGetEditObjId();		
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	   
	if(!flyEditPageSaveCheck(objId,"Upd"))
	   return false;
	
	return true;	
}
/** 
   * 审批中修改，同意保存时，校验是否修改，如果修改，置原值到flyvalue。
   
   * @return 
   */
function payEditPageAppUpdSaveCheck1(){
	
	var tableObj = "";
	var upTr = "";
	var flyupd = "";	
	var flyflag = "";	
	
	var form1 = document.getElementById("editForm").getElementsByTagName("*");
	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	      
 	   if(!flyupd || flyupd!="4")
 	      continue;
 	  
 	   //清空不可修改的，没有修改的。
 	   for (var j=0;j<form1[i].cells.length;j++ ){ 	 	   	
 	   	   
 	       	inputObj = form1[i].cells[j].getElementsByTagName("input"); 
   	      if(inputObj.length<1)
   	          inputObj = form1[i].cells[j].getElementsByTagName("select"); 
   	    
   	      //非input、select暂不处理
   	      if(inputObj.length<1)   	    	    
   	    	    continue;   	    
   	    	    
   	    	//序号不清空
   	    	if(j==0 && inputObj[0].tagName=="INPUT" && isInteger(inputObj[0].value))
   	    		 continue;     	    	
   	    	
   	    	/*
   	    	flyupd = inputObj[0].getAttribute("flyupd");  	      
 	        if(!flyupd || flyupd!="3"){//不可修改，清空原内容
 	        	
 	           inputObj[0].value = "";
 	           inputObj[0].setAttribute("flyvalue",""); 
 	              
 	       	}else {//可修改，但没有修改，清空原内容
 	       	*/	
 	       		 //取得上一行（被修改行）
 	       		 tableObj = form1[i].parentNode;	 
	           if(tableObj.tagName == "TBODY")
	              tableObj = tableObj.parentNode;
	     
	           upTr = tableObj.rows[form1[i].rowIndex-1];	
 	       		
 	       		 //取得被修改行对应td数据对象
 	           tdIndex = form1[i].cells[j].cellIndex;	
             upInputObj = upTr.cells[tdIndex].getElementsByTagName("input");
             
             if(upInputObj.length<1)
   	            upInputObj = upTr.cells[tdIndex].getElementsByTagName("select"); 
                            
             if(upInputObj[0].value==inputObj[0].value){//没有修改
                 inputObj[0].value = "";
 	               inputObj[0].setAttribute("flyvalue",""); 
             }
 	       	/*} 	    */   	
 	   }
 	}
	
	return;
}
/** 
   * 审批中修改，进入修改页面，按审批可修改的字段处理页面。
   * 不可修改的，置readonly；可修改的，特殊标出颜色。
   
   * 1)	隐藏计算按钮、置非flyUpd=2表单不可修改
   * 2)	进入审批修改界面，根据flyUpd=P，置原数据值到flyOrigin。
   * 3)	进入修改界面，根据flyUpd=P，如果flyvalue大于零且与实际值不同，显示三角。
  
   * @return 
   */
function payEditPageAppUpdStyle1(){
	
	var flyupd = "";	
	var flytype = "";	
	
	var ms = "";	
	var ns = "";	
	var m = 0;	
	var n = 0;	
	
	flyFormDataPageSetFormStatus("editForm","S","","");
	
	//1、如果为差旅报销，隐藏计算按钮 travelPerSelId
	if(document.getElementById('travelCountButtonId'))
	   document.getElementById('travelCountButtonId').style.display="none";
	   
	//2、如果为差旅报销，隐藏编外人员选择按钮 
	if(document.getElementById('travelPerSelId'))
	   document.getElementById('travelPerSelId').style.display="none";
	
	var form1 = document.getElementById("editForm").getElementsByTagName("*");
	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   	   
 	   if(!flyupd || flyupd!="2")
 	      continue;
 	      
 	   //3、可修改置边框为红色
 	   form1[i].style.border = "1px red solid"; 	   
 	   
 	   //4、置原数据值到flyOrigin。
 	   flytype = form1[i].getAttributeNode("onkeyup"); 	      	 
 	   if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1){ 	   	
 	   	  
 	      form1[i].setAttribute("flyOrigin",form1[i].value);
 	   }
 	   
 	   /*
 	   //数字flyvalue与显示值不同，显示红三角
 	   flytype = form1[i].getAttributeNode("onkeyup"); 	      	 
 	   if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1){
 	   	
 	   	  //置原数据值到flyOrigin。
 	      form1[i].setAttribute("flyOrigin",form1[i].value);
 	         
 	      ms = form1[i].getAttribute("flyvalue"); //原值
 	      ns = form1[i].value; 	      //现值 	      
 	      
 	      if(ms && ms.trim().length>0){//保存过原值
 	      	
 	      	 m = parseFloat(ms); 	  
 	      	   
 	      	if(m >=0 ){//没有修改过的原值默认为-1
 	      	
 	      	  ns = (ns.trim().length>0) ? ns : "0";
 	      	  n = parseFloat(ns);
 	      	  
 	      	     	  
 	      	  
 	      	  if(Math.abs(m-n)>0.001){//原值与现值不同，显示红三角
 	      	  	
 	      	  	 var str = "<i style='width:0;height:0;margin-top:10px;border-top:10px solid #FF8040;border-right:10px solid transparent;' title='填报金额:'"+m+"></i>";
 	      	  
 	      	     form1[i].parentNode.style.cssText = "padding-left:0px;padding-top:5.5px;";
 	      	     
 	      	     form1[i].parentNode.innerHTML = str + form1[i].innerHTML; 	      	       
 	      	  } 	
 	      	}      	     
 	      }	    
 	   }
 	   */
 	   
 	}
	
}
/** 
   * 审批中修改，同意保存时，校验是否修改，如果修改，置原值到flyvalue。
   
   * @return 
   */
function payEditPageAppUpdSaveCheck1(){
	
	var flyupd = "";	
	
	var ms = "";	
	var ns = "";	
	var m = 0;	
	var n = 0;	
	
	var form1 = document.getElementById("editForm").getElementsByTagName("*");
	for (var i=0;i<form1.length;i++ ){ 	   	
 	  
 	   flyupd = form1[i].getAttribute("flyupd"); 
 	   ms = form1[i].getAttribute("flyOrigin"); //原值,修改的非数字不设原值
 	   	   
 	   if(!flyupd || flyupd!="2" || !ms)
 	      continue;
 	      
 	    
 	    ns = form1[i].value; 	      //现值 	   
 	    
 	    ms = (ms.trim().length>0) ? ms : "0";
 	    ns = (ns.trim().length>0) ? ns : "0";
 	    
 	    m = parseFloat(ms); 	 
 	    n = parseFloat(ns); 	    
 	    
 	    if(Math.abs(m-n)>0.001)//原值与现值不同，置原值到flyvalue。 	      	  	
 	      form1[i].setAttribute("flyvalue",m);
 	}
	
	return;
}