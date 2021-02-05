/**
 * Flywings. Created by hzy on 2019/1/17.Beijing WideSky Science Technology Information Co. Ltd。
 
 * 通用表单显示页面js处理
 */
document.write("<script type='text/javascript' src='/fwis/com/is/flywings/pub/js/flyFloatTip.js'></script>");
/**
   * 设置岗位操作人员，对该功能的权限，是只读还是编辑。
   * 根据菜单进入传递的功能标识来确定，S只读权限，E编辑权限。   
   * @return 
   */
var flyShowPageParams_a = {}; //通用全局json变量
var flyShowPageDetail_a = new Array(); //通用全局变量,新增明细项数组

flyShowPageParams_a.authFlag = "";//登录岗位权限标识，S只读权限，E编辑权限
flyShowPageParams_a.dataKey = "";//数据键值，进行取数
var flyShowPageSet_a = {}; //通用全局json变量,页面设置，配置变量
//flyShowPageParams_a.showFlag = "";//浏览标识，值为Y时，别的页面，进入只显示，不进行任何操作，只预览查看。所以进入页面只显示返回按钮，点击返回进入页面。
//flyShowPageParams_a.showImgObj = "";//点击附件图片浏览时，为当前浏览图片label对象。

function flyShowPageGetProgId(){	
	
	 return flyShowPageParams_a.progId;
}
function flyShowPageGetAuth(){	
	
	 return flyShowPageParams_a.authFlag;
}
function flyShowPageGetDataKey(){	
	
	 return flyShowPageParams_a.dataKey;
}
function flyShowPageSetDataKey(dateKey){	
	
	 flyShowPageParams_a.dataKey = dateKey;
}
function flyShowPageGetDataFlag(){	
	
	 return flyShowPageParams_a.flag;
}
/**
   * 设置页面显示区域对象Id
   * @param objId   区域对象id     
   * @return 
   */
function flyShowPageSetShowObjId(objId){	
	
	flyShowPageParams_a.objId = objId;
}
/**
   * 取得页面显示区域对象Id  
   * @return 
   */
function flyShowPageGetShowObjId(){	
	
	return flyShowPageParams_a.objId;
}
/**
   * 设置是否显示复制按钮。
   * @param copyBut   显示复制按钮，设置为Y   
   * @return 
   */
function flyShowPageSetCopyBut(copyBut){	
   
	flyShowPageSet_a.copyBut = copyBut;	
}
/**
   * 设置是否显示打印按钮。
   * @param printFlag   Y,  显示打印按钮
   * @return 
   */
function flyShowPageSetPrint(printFlag){	
   
	flyShowPageSet_a.printFlag = printFlag;	
}
/**
   * 取得是否显示复制按钮标识。显示复制按钮为Y。   
   * @return 
   */
function flyShowPageGetCopyBut(){	
   
	return flyShowPageSet_a.copyBut;	
}
/**
   * 设置功能是否要进行审批。如果需要审批，则显示按钮，程序处理，会按审批来走。
   * @param appFlag   需要审批，设置为Y   
   * @return 
   */
function flyShowPageSetApp(appFlag){	
   
	flyShowPageSet_a.appArr = appFlag;	
}
/**
   * 取得审批标识。如果需要审批，则显示按钮，程序处理，会按审批来走。
   * @param appFlag   需要审批，为Y   
   * @return 
   */
function flyShowPageGetApp(appFlag){	
   
	return flyShowPageSet_a.appArr;	
}
function flyShowPageSetAuth(){	
	
	flyShowPageParams_a = getRequest();
	
	var auth = flyShowPageParams_a.authFlag;
	
	/*
	if(!auth)
	  return;
	 */	 

	//键值解码	
	flyShowPageParams_a.dataKey = decodeURI(flyShowPageParams_a.dataKey);
	
	
	//单位名称解码，一般打印用到单位名称
	if(flyShowPageParams_a.insName)
	   flyShowPageParams_a.insName = decodeURI(flyShowPageParams_a.insName);
		  	
	//是否实现该方法，如果实现，则调用。主要解决，在button显示前，做一些处理设置。
	if(isExitsFunction("flyShowPagePreSet")){
		
		flyShowPagePreSet(flyShowPageParams_a.dataKey);
		
	}

	if(flyShowPageParams_a.flag == "Show"){		
		
		flyShowPageSetButton("Show");
		
	  if(flyShowPageParams_a.authFlag == "P"){
	  	
	  	 var bodyDiv = window.document.getElementsByClassName("list_box")[0];
	  	 
	  	 bodyDiv.style.marginLeft = "15px";
		  
		}
		/*
		if(flyShowPageParams_a.authFlag == "S") { 
	   document.getElementById('flyShowOp').style.display = "none";	   //新增、删除按钮
	   
	  }else if(flyShowPageParams_a.authFlag == "E"){
	   document.getElementById('flyShowOp').style.display = "block";
	   
	  }
	  
	  flyShowPageParams_a.updData = toServerOp("ShowData",flyShowPageParams_a.dataKey);	
	  
	  //浏览显示
	  flyShowPageShow(flyShowPageParams_a.updData);	   
	  */   
	}else if(flyShowPageParams_a.flag == "View"){
		
		flyShowPageSetButton("View");
		
		//document.getElementById('flyShowOp').style.display = "none";	 
		
				
		flyShowPagePreview(flyShowPageParams_a.dataKey);
	  //flyCreateFormParams_a.updData = toServerOp("ShowData",flyCreateFormParams_a.dataKey);	
	  
	  //浏览显示
	  //flyCreateFormReadShow(flyCreateFormParams_a.updData);	   
	}
	  
	/*
	if(auth == "S") {
	   document.getElementById('flyShowOp').style.display = "none";	   //新增、删除按钮
	   
	}else if(auth == "E"){
	   document.getElementById('flyShowOp').style.display = "block";
	   
	}
	 */
	
  //添加内控规范
  var listBoxCon = window.document.getElementsByClassName("list_box_con");
  if(listBoxCon.length>0){
	   
	   var h3 = listBoxCon[0].getElementsByTagName("h3");
	   if(h3.length>0)	    
	       h3[0].innerHTML = h3[0].innerHTML+"<span onclick='flyFloatWinPageShow(this);' style='float:right;margin-right:75px;'>∧</span>";
  }
  
}
/**
   * 设置右上角操作按钮 
   * @param flag  权限标识。S，只读；E，编辑；R，链接浏览；O，弹窗浏览。
   
     1、审批状态：N，保存未发起状态；P，审批中 ；T，退回状态；Y审批通过状态  
     2、单据状态：Y，正常单据；C，审批通过作废状态。单据两个流程，一个是审批流程，一个是作废流程；
                  D，退回作废状态。审批退回，制单人作废。一个流程，退回作废不需要审批；
                  T，退回状态。审批退回保留的单据。又重新发起的；
                  R，重新发起状态。退回重新发起的新单据。
     3、按钮操作逻辑：               
               2）审批中、审批通过的单子，不可修改
               3）所有单据，都可以复制。
               4）审批退回的单子，可以修改并重新发起审批。此时，要将原来的单子状态置T，再将修改单据重新插入库内，单据号相同，序号加1.将当前单据号值为R。
                  如果修改保存，没有发起审批，则将审批状态置为N
               5）退回的单子、审批通过的单子，可以作废。退回的，直接将单据状态置为C 。作废的要重新发起审批，通过后作将单据状态置为C。
               6）审批状态为N（保存未发起状态），可发起审批。
               
     4、按钮显示：
               1）按钮：返回、新增、修改、复制、作废、发起审批
               2）返回按钮：所有页面显示
               3）新增、复制按钮：有编辑权限的都可以显示。
               4）修改按钮：审批状态未发起、退回(且单据状态不为T)。与审批状态、单据状态有关
               4）作废：审批退回且单据状态不为T、审批通过的。只与审批状态、单据状态有关
               5）发起审批：审批状态为N（保存未发起状态）
   * @return 
   */
function flyShowPageSetButton(flag){	
	
	if(flag == "View"){//预览
	
	   //document.getElementById('opButtons').innerHTML = "<a href='javascript:window.history.back(-1);'>返回</a>";
	   //document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:window.close();'>返回</a>";
	   
	}else if(flyShowPageParams_a.authFlag == "S") {//只读权限，只显示审批信按钮
		
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='flyShowPageApprove(this);' class='active'>审批</a>";   
	   
    }else if(flyShowPageParams_a.authFlag == "E"){//编辑权限，新增、复制、修改等按钮
	   	   
	   // var urlStr = "<div><a href=\"javascript:toEditPage('Add');\">新增</a></div>";
	   var urlStr = "";

	   //是否显示复制按钮
	   if(flyShowPageGetCopyBut() && flyShowPageGetCopyBut()=="Y")
	      urlStr+= "<a href=\"javascript:toEditPage('Copy');\" class='active'>复制</a>";
	    
	    /*
	   arr=[审批状态，单据状态]
	   审批状态: N，保存未发起状态；P，审批中 ；T，退回状态；Y审批通过状态  
	   单据状态: Y，正常单据
               C，审批通过作废状态。单据两个流程，一个是审批流程，一个是作废流程；
               D，退回作废状态。审批退回，制单人作废。一个流程，退回作废不需要审批；
               T，退回状态。审批退回保留的单据。又重新发起的；
               R，重新发起状态。退回重新发起的新单据。
    */
	   var arr = flyShowPageSet_a.appArr;

	   if(arr && arr.length>0) {
	   	
	      if(arr[0] == "N" || arr[0] == "" || (arr[0] == "T" && arr[1] != "T"))
	         urlStr+= "<a href=\"javascript:toEditPage('Upd');\" class='active'>修改</a>";

        /*
           1、不可作废单据：
           已报销的申请、已支付的报销、已生成采购的事项申请、已采购执行的采购申请、
           已确认的合同、已记账的支付、金额不足的指标调剂和增减、执行完成的资产处置、
           已记账的收入确认和登记
           2、处理方式：调用相应页面方法flyshowpageIsVoid,返回false，不显示作废
        */
        var isVoid = (!isExitsFunction("flyshowpageIsVoid") || flyshowpageIsVoid());
	      if(isVoid && (arr[0] == "Y" || (arr[0] == "T" && arr[1] != "T")))
	         urlStr+= "<a href='javascript:flyShowPageVoid();' class='active'>作废</a>";

	      if(arr[0] == "N" || arr[0] == ""){
	         urlStr+= "<a href='#' onclick='flyShowPageApprove(this);' class='active'>发起审批</a>";
	         urlStr+= "<a href='#' onclick='flyShowPageDelOne(this);'>删除</a></div>";
	      }
	      
	      if(arr[0] == "S" && arr[1] == "Y")
	         urlStr+= "<a href='javascript:flyShowPageWithdrawApp();' class='active'>撤回审批</a>";
	         	      
	      //if(arr[1] == "C" || arr[1] == "D")
	       //  urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:toListPage();'>返回</a>";
	 
	      
	   } else {
	   	  urlStr+= "<a href=\"javascript:toEditPage('Upd');\" class='active'>修改</a>";
	      urlStr+= "<a href='#' onclick='flyShowPageDelOne(this);'>删除</a>";
	   }
	   //flyShowPageSet_a.printFlag
	   //if(flyShowPageSet_a.printFlag=="Y")
	   //   urlStr+= "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	      //urlStr+= "<a href='javascript:window.print();'>打印</a>";
	      
	  var regex = new RegExp('href', 'g'); // 使用baig表示整个字符串都要匹配du
    var result = urlStr.match(regex);
    var count = !result ? 0 : result.length;
    
    var opButtonsObj = document.getElementById('opButtons');
    
    if(count==1)
       opButtonsObj.classList.add("details-footer-one");
    else if(count==2)
       opButtonsObj.classList.add("details-footer-two");
    else if(count==3)
       opButtonsObj.classList.add("details-footer-three");
    	 
	     
	   //按钮区，返回、保存、重置按钮		 
     opButtonsObj.innerHTML = urlStr;

	   return;
	   
	}
	/*
	else if(flyShowPageParams_a.authFlag == "R"){//浏览权限，别的页面进入查看，只显示返回，返回window.history.back(-1)
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:window.history.back(-1);'>返回</a>";
	}else if(flyShowPageParams_a.authFlag == "O"){//浏览权限，别的页面通过弹窗进入查看，只显示关闭窗口，返回window.history.back(-1)
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:window.close();'>返回</a>";
	}else if(flyShowPageParams_a.authFlag == "P"){//打印
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:flyShowPagePrint();'>打印</a>";
	}else if(flyShowPageParams_a.authFlag == "M"){//返回和打印，2个功能按钮
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:window.history.back(-1);'>返回</a><a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	}else if(flyShowPageParams_a.authFlag == "V"){//弹窗浏览打印权限，别的页面通过弹窗进入查看，只显示关闭窗口，返回window.history.back(-1)
	   document.getElementById('opButtons').innerHTML = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:window.close();'  class='active'>返回</a><a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	}
	*/
	return;
}
/* 删除一个节点。列表中没有选中节点，删除当前显示节点，即树节点选中的节点。

   1、取得删除节点键值。  
   2、后台删除成功后，页面删除。
   3、不进行页面查询
   * @param obj    删除对象
   * @return 
   */
function flyShowPageDelOne(obj){
	
	
	 if (confirm("是否确认删除？")==true){
	 	
	 	    var delKey = flyShowPageGetDataKey();
	 	
	 	    if(!delKey || delKey.trim().length<1)
	          return;
	
	      var result = toServerOp("Del",delKey);		
	
	      if(result=="Y" || result.indexOf("^")>-1 || result.indexOf("|")>-1) { 
		    
		       var str = window.document.location.href;
	 
	         window.location.href = str.substring(0,str.indexOf("/www")+4)+"/mainpage.html";
	   
	      } else		
	         alert(ajaxPubAlertError(result));	 
   }
	 return;
}
/**
   * 显示  
   * @param showData  显示值。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @return 
   */
function flyShowPageShow(){			
	
	flyShowPageParams_a.updData = toServerOp("ShowData",flyShowPageParams_a.dataKey);	

	if(!flyShowPageParams_a.updData || flyShowPageParams_a.updData.indexOf("|")<1)
	   return; 
	   
	var arr = flyShowPageParams_a.updData.split("|");
	//if(arr[0].trim().length<1 || arr[0].trim()=="null")
	//   return;
	   
	var objId = flyShowPageGetShowObjId();	
	
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	   
	flyFormDataPageShowData(objId,flyShowPageParams_a.updData,"S","^","~");
	
	//显示定义附件
	flyShowPageGetAttch();
	
	//进入页面即打印
	if(flyShowPageParams_a.authFlag == "J"){		
		
		 wfProgressBarInit(appKey_a);
		 
	   flyShowPagePrint();
	}
	return;	 
}
/**
   * 显示一个对象的数据。如动态增加的区域数据。
   * @param objShow   区域对象。
   * @param dataShow  区域显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @return 成功返回表单数
   */
function flyShowPageObjShow(objShow,dataShow){	
	
	if(!objShow || !dataShow || dataShow.trim().length<1)
	   return;
 
  var flyflag = ""; 
  var labelObj = "";
  var arr1 = new Array();
 
  var obj = "";
 	var i = 0; 
 	var j = 0; 	   
 	 
	var arr = dataShow.split("^");	
	
	var n = objShow.rows[1].cells.length;	//取得列数，并减去操作列
	var r = arr.length/n; //取得行数
	
	//动态生成行，行数要比数据的少一个，因为原来有一个默认的。
	for (var m=1;m<r;m++ ){ 	
		
		var newTr = objShow.rows[1].cloneNode(true);
		objShow.appendChild(newTr); 
	} 	
 	
 	//取得所有标签
 	var form1 = objShow.getElementsByTagName("*");
 
 	for (j=0;j<form1.length;j++ ){ 	  
 	
 	   obj = form1[j];
 	   flyflag = obj.getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   switch (flyflag)
     {
       	
         case '0':         
       
           obj.innerHTML = arr[i];
           i++;	
           break;
           
         case '4':
           
          obj.innerHTML = ""; 
 	   	   
 	   	     //显示
           arr1 = arr[i].split("^");	 
           for(var k=0;k<arr1.length;k++){  
           	
           	 labelObj =  document.createElement("label");            	 
           	
           	 labelObj.innerHTML =  arr1[k];
             
             obj.appendChild(labelObj);            	
           }
           
           i++;	
           break;     
        
         default: break;   
     }       
 	} 
 	
  return j;	
}
/**
   * 预览显示。
   * @param showData   显示数据。  
   * @return 
   */
function flyShowPagePreview(showData){	
	
	return;
}
/**
   * 作废。
   * @param showData   显示数据。  
   * @return 
   */
function flyShowPageVoid(){		
	
	if (confirm("是否确认作废单据？")==true){
	
	   var result = toServerOp("Void",flyShowPageGetDataKey());	
	
	   if(result!= "Y"){
	      alert("抱歉，作废失败，请重试。");
	      return;
	   }
	
	   //设置作废后的按钮和单据状态。
	   flyShowPageSetCancel();	
  }
	
	return;
}
/**
   * 发起审批。 
   * flyShowPageGetAppName方法，由show页面实现，
      返回审批的业务名称，如事项名称、合同名称等；  
   * @return 
   */
function flyShowPageApprove(obj){		
	
	obj.onclick=null;
	
	var appInfo = flyShowPageGetDataKey()+"|"+flyShowPageGetAppName();
	
	var result = toServerOp("App",appInfo);		
	
	if(result.indexOf("|")<0 && result.indexOf("^")<0 && result.indexOf("ap")<0){
	   alert(ajaxPubAlertError(result));
	   obj.onclick = function() { flyShowPageApprove(this) };    
	   
	}else {
		
		 flyShowPageSetDataKey(result);//设置键值为审批后的键值
		 flyShowPageAppStartPageOp(result);//发起审批后的处理，如按钮改变等。
	}
	
	return;
}
/**
   * 撤回审批。 
   * 申请人发起审批，没有审批人审批时，可撤回申请。
      
   * @return 
   */
function flyShowPageWithdrawApp(){	
	
	var info = "opValue="+appKey_a;	
	
	var result = getHttpResponse("/fwis/mssl/workflowExcSrv","Withdraw",info);	
	
	if(result=="Y") { 
		
		//1、去除流程条
	  //wfProgressDelShow();
	  
	  //2、设置按钮为：修改、发起审批、删除
	  var buts = document.getElementById("opButtons");
	  
	  var urlStr = "<a href=\"javascript:toEditPage('Upd');\" class='active'>修改</a><a href='#' onclick='flyShowPageApprove(this);' class='active'>发起审批</a><a href='#' onclick='flyShowPageDelOne(this);'>删除</a>";
	  
	  buts.innerHTML = urlStr;
	  
	  buts.classList.remove("details-footer-two");
	  buts.classList.add("details-footer-three");
	  
	  /*
	  var but = buts.getElementsByTagName("a");	  
	  for (var i=0;i<but.length;i++ ){ 	
	  	
	  	 if(but[i].innerHTML=="撤回审批"){
	  	 	
          but[i].innerHTML="修改";
          but[i].href = "javascript:toEditPage('Upd');";         
       }
    }
    */
    
    //buts.innerHTML = buts.innerHTML+"<a href='#' onclick='flyShowPageApprove(this);' class='active'>发起审批</a>";
    	  
     //3、置键值中审批状态为N，默认为键值顺序为3
    var arr = flyShowPageGetDataKey().split("^");
    
    var appSatus = 3;
  
   //非按如下键值顺序的insId,billId,appId,appSatus,billSatus
   //实现该接口，返回相应顺序。
   if(isExitsFunction("flyShowPageGetAppStageOrder")){
   	
   	 var arrOrder = flyShowPageGetAppStageOrder();
		
		 appSatus = arrOrder[3];     
	 }
   
    arr[appSatus] = "N";
   
    flyShowPageSetDataKey(arr.join("^"));
    
	  return;
	  
	} else		
	  alert(ajaxPubAlertError(result));	 

  return;	
}
/**
   * 审批发起后，页面进行处理：如果状态位置不是3，实现flyShowPageAppStartShow。
   
     DataKey一般按该顺序取得：单位代码^单据号^审批单号^审批状态^单据状态.....
     
     1、调用流程显示功能，显示流程。
     2、取消发起审批按钮，修改按钮
     3、置键值中审批状态为S。
     
   * @return 
   */
function flyShowPageAppStartPageOp(dataKey){	
	
	 //是否实现该方法，在显示页面发起审批时，实现该方法：
	 //1、取消发起审批、修改按钮；2、显示审批流程条
	if(isExitsFunction("flyShowPageAppStartShow")){
		
		flyShowPageAppStartShow(dataKey);
		
		return;
	}
	
	 //设置按钮为新增和撤回审批
	 var opButtonsObj = document.getElementById('opButtons');
	 opButtonsObj.innerHTML = "<a href=\"javascript:toEditPage('Add');\">新增</a><a href='javascript:flyShowPageWithdrawApp();' class='active'>撤回审批</a>";
	 
	 opButtonsObj.classList.remove("details-footer-three");
	 opButtonsObj.classList.add("details-footer-two");
	 
	 /*
	 //取消发起审批、修改按钮
	 var urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:toListPage();'>返回</a><a href=\"javascript:toEditPage('Add');\">新增</a><a href='javascript:flyShowPageWithdrawApp();'>撤回审批</a>";
   if(flyShowPageSet_a.printFlag=="Y")
	      urlStr+= "<a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	      
   document.getElementById('opButtons').innerHTML = urlStr;
   */
   
   var arr = dataKey.split("^");
   
   var insId = 0;
   var appId = 2;
   
   //非按如下键值顺序的insId,billId,appId,appSatus,billSatus
   //实现该接口，返回相应顺序。
   if(isExitsFunction("flyShowPageGetAppStageOrder")){
   	
   	 var arrOrder = flyShowPageGetAppStageOrder();
		
		 insId = arrOrder[0];
     appId = arrOrder[2];		
	 }
   
   //流程键值
   appKey_a = arr[insId]+"|"+arr[appId];   
   
   //显示审批流程条
   //wfProgressBarInit(appKey_a);
	
	 return;
}
/**
   * 点击小图片，弹出层显示大图片.
   * @ detailKey：单位代码^卡片id^卡片名称^折旧方式
   * @return 
   */
function flyShowPageOpenBigImg(obj,layerId,titleId){	
	
	 //alert(layerId.id+" ;"+titleId.id+" ;"+openLayerId.id);
	 flyShowPageParams_a.showImgObj = obj;
	 //对弹出的页面层，添加拖动监听
   flyFormDragListener(document.getElementById(titleId.id),document.getElementById(layerId.id));
	
	 //flyShowPageParams_a.showImgObj = obj;
	 flyShowPageShowAttchImg("S");
	 
	 openLayerId.style.display="block";
	  
	 return;
}
/**
   * 点击小图片，弹出层显示大图片
   * @ obj  direct  图片显示方向：S，显示当前点击图片；N，显示下一张图片；P，显示上一张图片。
   * @return obj.getAttribute("flyvalue")
   */
function flyShowPageShowBigImg(direct){	
	        
	   var bigImage = "";
	   
	   var temObj = flyShowPageParams_a.showImgObj;
	   
	   if(direct=="S")
	        bigImage = flyShowPageParams_a.showImgObj;
	   else
	   	    bigImage = (direct=="N") ? flyShowPageParams_a.showImgObj.nextElementSibling : flyShowPageParams_a.showImgObj.previousElementSibling;	
	       
	   if(bigImage == null){
	   	   	
	   	    flyShowPageParams_a.showImgObj = temObj;
	   	    return;
	   }
	   
	   document.getElementById('flyShowPageImgSrc').src = bigImage.src;
	   
     return;
}
/**
   * 附件添加图片显示监听。点击附件弹出。 
   * @ detailKey：单位代码^卡片id^卡片名称^折旧方式
   * @return 
   */
function flyShowPageAttchImg(attchObj,layerId,titleId){	 	
	
	 var obj = "";
	 
	 if (typeof(attchObj) == "string") 
	    obj = document.getElementById(attchObj);
	 else
	 	  obj = attchObj;
	 	  
	 if(!obj)
	    return;
	 
	 var attch = obj.getElementsByTagName("label");
	 
	 for (var i=0;i<attch.length;i++ ){ 	
	 
	 	 
     attch[i].onclick = function (event)	{				 	 
	  	  
	  	   flyPopAttchOpenPad(this,layerId,titleId,event);
	   }
	   /*
	   attch[i].onmouseover = function (event)	{		 	
		 	 
	  	   flyPopAttchOpenPad(this,event);
	   }
	   attch[i].onmouseout = function (event)	{		 	
		 	 
	  	   flyPopAttchClosePad(this,event);
	   }
	   */
   }	
	 return;
}
/**
   * 弹出附件图片显示层。点击附件弹出。   
   * @return 
   */
function flyShowPageAttchImgLayerCreate(){	
	
	 if(document.getElementById("flyShowPageImgLayerId"))
	    return;
	
	 var str = "<div id='flyShowPageImgTitleLayerId' class='title_layer'  style='width:100%;height:40px;'>"
	           + "<span class='spanl' style='width:50%;'></span>"
	           + "<span id='nodeTitleCenter' class='spanc'   style='width:10%;'></span>"
	           + "<span class='spanr'  style='width:25%;'><a href='#' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';\">关闭</a></span>"
          + "</div>"	
   
   + "<div class='open_layer_div_img' onmousewheel='return flyShowPageToWheelImg(this)'>"   	
   	  + "<img id='flyShowPageImgSrc' src='' onload=\"flyShowPageShowImg(this,'flyShowPageImgLayerId')\" />"   	  	
   + "</div>" 
   
   + "<span style='clear:both;z-index:11;width:100%;height:60px;position:absolute;top:45%;'>"
   	  + "<a href='#' onclick=\"flyShowPageShowAttchImg('P');\"><img  src='/fwis/com/is/flywings/pub/img/derect_left.png' style='float:left;'></a>"
   	  + "<a href='#' onclick=\"flyShowPageShowAttchImg('N');\"><img  src='/fwis/com/is/flywings/pub/img/derect_right.png' style='float:right;'/></a>"
   + "</span>"
    
   + "<div class='title_layer'  style='width:100%;height:60px;text-align: center;'>"
   	 + "<a href='#'><img  src='/fwis/com/is/flywings/pub/img/add_circle.png'  onclick=\"flyShowPageToBigImg('B');\" width='40px' heigth='40px'/></a>"
   	 + "<a href='#'><img  src='/fwis/com/is/flywings/pub/img/remove_circle.png'  onclick=\"flyShowPageToBigImg('S');\" style='margin-left:20px;' width='40px' heigth='40px'/></a>"
   	 + "<a href='#'><img  src='/fwis/com/is/flywings/pub/img/rotate.png'  onclick=\"flyShowPageToBigImg('T');\" style='margin-left:20px; width='40px' heigth='40px'/></a>"
   	 + "<a href='#'><img  src='/fwis/com/is/flywings/pub/img/download.png' onclick='flyAttchDownload();' style='margin-left:20px;width='35px' heigth='35px'/></a>"
   + "</div>";
   
   var imgDiv =  document.createElement("div"); 
   imgDiv.id = "flyShowPageImgLayerId";   
   imgDiv.className = "open_layer_css";   
   imgDiv.innerHTML = str;
   
   document.getElementsByTagName("body")[0].appendChild(imgDiv);	
   
   //对弹出的页面层，添加拖动监听
   flyFormDragListener(document.getElementById("flyShowPageImgTitleLayerId"),imgDiv);
   //对图片，添加拖动监听
   pubToolsDragListener(document.getElementById("flyShowPageImgSrc"));
   
}
/**
   * 弹出附件图片显示页面。点击附件弹出。 
   * @ detailKey：
   * @return 
   */
function flyShowPageOpenAttchImg(layerId,titleId){	
	
    flyShowPageAttchImgLayerCreate();    
	
	  flyShowPageShowAttchImg("S");
	 
	  document.getElementById("flyShowPageImgLayerId").style.display="block";
	  
	 return;
}
/**
   * 弹出附件图片显示页面。点击附件弹出。 
   * @ detailKey：
   * @return 
   */
function flyShowPageOpenAttchImg1(layerId,titleId){	
	
	 //alert(layerId.id+" ;"+titleId.id+" ;"+openLayerId.id);
	 //对弹出的页面层，添加拖动监听
   flyFormDragListener(document.getElementById(titleId.id),document.getElementById(layerId.id));
	
	 //flyShowPageParams_a.showImgObj = obj;
	 flyShowPageShowAttchImg("S");
	 
	 openLayerId.style.display="block";
	  
	 return;
}

/**
   * 弹出附件图片显示页面
   * @ obj  direct  图片显示方向：S，显示当前点击图片；N，显示下一张图片；P，显示上一张图片。
   * @return obj.getAttribute("flyvalue")
   */
function flyShowPageShowAttchImg(direct){	
	
	     
	   var bigImage = "";
	   var suffix= "";
	   var imgSrc = "";	   
	   var temObj = "";	   
	   var arr = new Array();	   
	       
		 var bigImage = flyShowPageParams_a.showImgObj;
		 temObj = flyShowPageParams_a.showImgObj;	
	   
	   while(bigImage) {	   	
	   	  
	   	   if(direct=="N" || direct=="P")
	   	     flyShowPageParams_a.showImgObj = (direct=="N") ? flyShowPageParams_a.showImgObj.nextElementSibling : flyShowPageParams_a.showImgObj.previousElementSibling;	
	   	   
	   	   bigImage = flyShowPageParams_a.showImgObj;
	   	   
	   	   if(bigImage == null){
	   	   	
	   	   	  flyShowPageParams_a.showImgObj = temObj;
	   	      return;
	   	   }
	   	      
	   	   arr = bigImage.getAttribute("flyvalue").split("⌒");
	       
	       suffix= arr[0].substring(arr[0].lastIndexOf("."));
	   
	       if(suffix!=".bmp" && suffix!=".png" && suffix!=".gif" && suffix!=".jpg" && suffix!=".jpeg" && suffix!=".BMP" && suffix!=".PNG" && suffix!=".GIF" && suffix!=".JPG" && suffix!=".JPEG"){ 
	   	
	   	      if(direct=="S")
	   	         flyShowPageParams_a.showImgObj = (direct=="N" || direct=="S") ? bigImage.nextElementSibling : bigImage.previousElementSibling;	
	   
	       }else{
	       	
	       	  imgSrc = arr[0].substring(arr[0].indexOf("flywings/")+8);
	          imgSrc = "/fwis/com/is/flywings" + imgSrc;
	          
	          var imgObj = document.getElementById('flyShowPageImgSrc');
	          imgObj.style.cssText = "";
	          //imgObj.style.height = "";
	          imgObj.src = imgSrc;
	          //document.getElementById('flyShowPageImgSrc').src = imgSrc;
     
            flyShowPageParams_a.showImgObj = bigImage;
            return;
	       }	 
	   }
	            
     return;
}
/**  
   * 显示附件图片。 
   * @obj         图片对象
   * @layerId     弹出层Id
   
   * @return 
   */
function flyShowPageShowImg(obj,layerId){		
	
	var lw = 0; //层宽
	var lh = 0; //层高
	var ll = 0; //层左边距
	var lt = 0; //层上边距
	
	
	var iw = 0; //图片宽
	var ih = 0; //图片高
	
	//图片实际尺寸
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	
	//页面可见区域尺寸
	var pw = document.documentElement.clientWidth;// ==> 可见区域宽度
  var ph = document.documentElement.clientHeight;// ==> 可见区域高度

  //层对象
  var layerObj = document.getElementById(layerId);
  
  //宽度处理
  if(w+30>pw){
  	
  	 lw = pw-pw*0.1;
  	 iw = (pw-pw*0.1-30);
  	 ll = pw*0.1/3;
  	 
  }else if(w<pw*0.8) {
  	
  	 lw = (pw*0.8+30);  	
  	 iw = w + "px";
  	 ll = (pw*0.2-30)/3;  	 
  	 
  }else {
  	
  	 //lw = (w+30);
  	 lw = w;
  	 iw = w;
  	 ll = (pw-w-30)/3;  
  	
  }

	//高度处理
  if(h+100>ph){
  	 
  	 lh = ph*0.9;
  	 ih = (lh-100);
  	 lt = 0;  
  	 
  }else if(h<ph*0.7) {
  	
  	 lh = (ph*0.7+100);
  	 ih = h;
  	 lt = 100;  
  	
  }else{
  	
  	 lh = (h+100);
  	 ih = h;
  	 lt = 100;    	 
  }
  
  var imgL = iw/2;
  var imgH = ih/2;
  
	
	layerObj.style.cssText = "width:"+lw+"px;height:"+lh+"px;left:"+ll+"px;top:"+lt+"px;";
	//obj.parentNode.style.cssText = "overflow:hidden;width:"+lw+"px;height:"+(lh-100)+"px;line-height:"+(lh-100)+"px;";
	obj.parentNode.style.cssText = "width:"+lw+"px;height:"+(lh-100)+"px;";
	//obj.style.cssText = "clear:both;overflow:hidden;border:2px solid red;display:inline-block;vertical-align:middle;min-width:"+iw+"px;min-height:"+ih+"px;";
	obj.style.cssText = "position:absolute;display:inline-block;vertical-align:middle;width:"+iw+"px;height:"+ih+"px;left:50%;margin-left:-"+imgL+"px;top:50%;margin-top:-"+imgH+"px; ";
		
	layerObj.style.display="block";
	
	//alert(obj.style.cssText+" ; "+obj.parentNode.style.cssText);
}
/**  
   * 放大、缩小、旋转图片。   
   * @obj         图片对象   
   * @return 
   */
function flyShowPageToBigImg(imgFlag){	

  var r = 0;
  
	var imgObj = document.getElementById('flyShowPageImgSrc');
	
	if(imgFlag=="B"){
		
		 //根据高宽比例，计算缩放高
		 //r = (imgObj.offsetHeight/imgObj.offsetWidth) * 0.1 + 1;
		 
     imgObj.style.width = (imgObj.offsetWidth*1.1) + "px";
     imgObj.style.height = (imgObj.offsetHeight*1.1) + "px";
     
     //imgObj.style.height = (imgObj.offsetHeight*r) + "px";
     
  }else if(imgFlag=="S"){
  	
  	 //根据高宽比例，计算缩放高
		 //r = 1 - (imgObj.offsetHeight/imgObj.offsetWidth) * 0.1;
		 
     imgObj.style.width = (imgObj.offsetWidth*0.9) + "px";
     imgObj.style.height = (imgObj.offsetHeight*0.9) + "px";
     //imgObj.style.height = (imgObj.offsetHeight*r) + "px";
     
  }else if(imgFlag=="T"){
  	
  	 r = 90;
  	 var f = imgObj.getAttribute("flyvalue");
  	 if(f){
  	 	
  	 	   r = parseInt(f);
  	 	   
  	 	   r = (r>=360) ? 90 : (r+90);  	 	
  	 }  	    
  	 imgObj.setAttribute("flyvalue",r);  
     imgObj.style.MozTransform = "rotate("+r+"deg)"; 
     imgObj.style.WebkitTransform = "rotate("+r+"deg)";
     imgObj.style.transform = "rotate("+r+"deg)";     
  }
	
}	
/**  
   * 通过鼠标滚轮放大、缩小图片。   
   * @obj     图片所在div对象   
   * @return 
   */
function flyShowPageToWheelImg(divObj){    

   var obj = divObj.getElementsByTagName("img")[0];

   var zoom = parseInt(obj.style.zoom,10)||100;
    
   zoom += event.wheelDelta / 12;
     if(zoom > 0 )
        
    obj.style.zoom=zoom+'%';
    
    return false;
}

/**  flyShowPageToBigImg
   * 附件下载。 
   * @scrollDivId 弹出功能条所在滚动div的ID值
   * @rowHeight    弹出功能条所在行高度
   * @obj         弹出功能条button对象
   * @e           点击事件
   * @return 
   */
function flyAttchDownload(){	
	
	 var a = flyShowPageParams_a.showImgObj.getAttribute("flyvalue");
	 var a1 = a.substring(a.indexOf("/flywings/")+10,a.indexOf("⌒"));
	 
	 var s = window.location.href;
	 var s1 = s.substring(0,s.indexOf("/flywings/")+10);
	 //alert(pubToolsGetBrowserType());
	 //alert(s1+a1);
	 
	 var suffix = a.substring(a.lastIndexOf(".")+1);
	
	 if (pubToolsIsImg(suffix) && (pubToolsGetBrowserType() == "IE" || pubToolsGetBrowserType() == "Edge")) {
	 	
	 	  var oPop = window.open(s1+a1, "", "width=1, height=1, top=5000, left=5000");
      for (; oPop.document.readyState != "complete";) 
      {
          if (oPop.document.readyState == "complete") break;
      }
      oPop.document.execCommand("SaveAs");
      oPop.close();
   
	 }else{
	 	
	 	 // 创建隐藏的可下载链接
     var eleLink = document.createElement('a');
     eleLink.download = s1+a1;
     eleLink.style.display = 'none';
      // 字符内容转变成blob地址
     eleLink.href = s1+a1;
     // 触发点击
     document.body.appendChild(eleLink);
     eleLink.click();
     // 然后移除
     document.body.removeChild(eleLink);
	 	
	 }	
}
/**
   * 弹出附件浏览、下载层。 
   * @scrollDivId 弹出功能条所在滚动div的ID值
   * @rowHeight    弹出功能条所在行高度
   * @obj         弹出功能条button对象
   * @e           点击事件
   * @return 
   */
function flyPopAttchOpenPad(attchObj,layerId,titleId,e){	
	
	 //alert(attchObj+" ; "+layerId+" ; "+titleId);  window.location.href
	 
	 //alert(document.getElementsByTagName("body")[0].onmousedown);
	
	 flyShowPageParams_a.showImgObj = attchObj;
	
   if(document.getElementById("attchPopPad"))
      flyPopAttchMouseDown(event);
      
   
   //var jsonObj=JSON.stringify(attchObj);
   
	 var liSpan=document.createElement("span"); 
	 liSpan.id = "attchPopPad";
   liSpan.innerHTML = "<a href='javascript:void(0);' onclick=\"flyShowPageOpenAttchImg('"+layerId+"','"+titleId+"');\">浏览</a><a href='javascript:void(0);' style='border:0px' onclick='flyAttchDownload();' >下载</a>";
   liSpan.className = "flyAttchPopPad";
   
   document.getElementsByTagName("body")[0].appendChild(liSpan);
   
   //鼠标抬起点
   var event = e || e.event;//兼容ie浏览器      flyShowPageOpenAttchImg(this,layerId,titleId)
   
   liSpan.style.left = (event.clientX)+ "px";   
   liSpan.style.top = (event.clientY-50) + "px";     
   
}
/**
   * 1、移除弹出附件浏览、下载层；2、移除弹出审批显示层。 
   * @event 点击事件 
   * @return 
   */
function flyPopAttchMouseDown(event){	
	
	 var attchObj = document.getElementById("attchPopPad");
	 if(attchObj){
	 	
	 	   var obj = getEventObj(event);//取得点击元素对象		
		
	     if(obj.parentNode.id=="attchPopPad")		 
	        return;	 
	        
	     document.getElementsByTagName("body")[0].removeChild(attchObj);
	 }
	 
	 //移除弹出审批显示层。 
	 var appObj = document.getElementById("approveInfoLayerId");
	 if(appObj && appObj.style.display=="block"){
	 	
	 	   var obj = getEventObj(event);//取得点击元素对象		
	 	   
	 	   while (obj && obj != appObj) 
         obj = obj.parentNode;
		
	     if(obj==appObj)		 
	        return;	 
	     
	     appObj.style.display="none";
	 }	
	    
	 return;
}
/**
   * 打印，弹出窗口预览。 
   
   * @return 
   */
function flyShowPagePrintPreview(){	
	
	 var s = window.location.href;
	 
	 var url = s.substring(0,s.lastIndexOf("&")+1)+"authFlag=P";
	 //alert(s.indexOf("&authFlag=E"));
	 //s.replace("authFlag","authFlag=P");
	// s.replace("authFlag","authFlag=P");
	 //alert(url);
	 openPopPage(url,0.1,0.05,0.8,0.8);
}
/**
   * 打印，截取需要打印的内容打印，然后关闭打印窗口。 
   
   * @return 
   */
function flyShowPagePrint(){	
	
	//var bodyDiv = window.document.getElementsByClassName("list_box")[0];
	
	var explore = pubToolsGetBrowserType();
	
	if(explore=="IE"){
	   document.getElementsByClassName("list_box")[0].style.width = "97%";
	   document.getElementsByClassName("list_box_con")[0].style.padding = "0 6px";	
	   document.getElementsByClassName("list_box_con")[0].style.overflow = "hidden";
  }
	
	//1、将主信息下列表宽度设置为1000，以免超宽，不能打印完整。
	//var tables = document.getElementById("editForm").getElementsByTagName("table");
	var tables = document.getElementsByTagName('body')[0].getElementsByTagName("table");
	for (var i=0;i<tables.length;i++ ){ 	
		
		//tables[i].style.width="1000px";
		
		tables[i].style.width="100%";
		
		if(explore=="IE")
		   tables[i].style.fontSize="11px";
 
  }
 
  //2、显示打印页面标题，单位名称+业务名称
  var titleObj = document.getElementsByClassName("list_box_top");
  if(titleObj){
  	
  	 var titleName = titleObj[0].getElementsByTagName("h3")[0].innerHTML;
  	 
  	 document.getElementsByTagName("title")[0].innerHTML = titleName;
  	
  	 titleObj[0].style.textAlign = "center";  
  	 titleObj[0].style.fontWeight="bolder";//加粗文本
  	 titleObj[0].style.fontSize="28px";//加粗文本
  	 
  	 var loginInsName = "";
  	 if(!opener.parent.banner)
  	    loginInsName = flyShowPageParams_a.insName;
  	  else
  	  	loginInsName = opener.parent.banner.loginUserInfo_a.insName;
	  
	   
	   var billName = "单";
	   var progId = flyShowPageGetProgId();
	   if(progId && progId.indexOf("App")>-1)
	   	  billName = "表";
	   
	   
	   titleObj[0].innerHTML = loginInsName+titleName+billName;
  	 
  	 //titleObj[0].innerHTML = "<h3 style='margin-left:40%;'>"+loginInsName+titleName+"</h3>";
  	
  }
  
  //3、不打印指标信息。
  var obj = document.getElementById("indexShowTable").parentNode.parentNode;
  if(obj.tagName == "DIV")
     obj.style.display="none";
 
	//4、将主信息处理为每行3个字段信息，将预算添加到主信息。
	flyShowPagePrintSetMainTable();
	
	var pageStyle="html,body{width:100%;height:auto;overflow:auto;margin-top:60px;}";
  var style=document.createElement("style");
  style.innerText= pageStyle;
  document.getElementsByTagName("head")[0].appendChild(style);
  
  //5、添加水印。
  var shuiyinObj = document.getElementsByClassName("list_box");
  if(shuiyinObj.length>0){ //background-size: 100%
  	
  	  shuiyinObj[0].style.backgroundImage = "url('/fwis/com/is/flywings/login/images/shuiyin13.png')";
  	
  }
  //6、附件或链接颜色设置为黑色，并取消下划线，以打印清晰。
  flyShowPagePrintSetAttchColor();
  
  //doc.getElementsByTagName("head")[0].appendChild(style)
	/*
	var newWin = window.open(window.document.URL); //将本页在新窗口中打开,方便打印完成后关闭
  var bdhtml = document.getElementById('scrollBox').innerHTML; //获取当前页面的body部分
  //var sprnstr = "<!--startprint-->"; //标记自己想要打印的部分，方便截取
  //var eprnstr = "<!--endprint-->";//标记的中间部分就是想要打印的部分
 // var prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr)+17); //截取需要打印的部分
  //prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr)) ;
  newWin.document.body.innerHTML = bdhtml; //将打印的部分覆盖新打开窗帘的body元素；
  newWin.print();//打印
  newWin.close();//关闭打印窗口
 
	var iframe = document.createElement('IFRAME');
document.body.appendChild(iframe);
var doc = iframe.contentWindow.document;
doc.write(el);
doc.close();
iframe.contentWindow.focus();
iframe.contentWindow.print();
 */
	
	//window.document.body.innerHTML = document.getElementById('scrollBox').innerHTML;
	
	window.print();
	setTimeout("window.close();", 0);//解决chorme浏览器，直接关闭页面，无法打印。
	//window.close();	
}

/**
   * 打印时，将主信息处理为每行3个字段信息的带线表格。
   * @param obj          label   
   * @return 
   */
function flyShowPagePrintSetMainTable(){		
	
	
	var str = "";
	var arr = new Array(6);
	var n = 0;
	var k = 0;//计数
	var m = 1;
	var c = 0;//一行4个td（4列）的所有行td数量
	
	var divObj = document.getElementsByClassName("list_box_con_t")[0];
	var tableObj = divObj.getElementsByTagName("table")[0];
	
	var tdObj = tableObj.getElementsByTagName("td");
	
	var len = tdObj.length;//主信息table内td数量
	
	var obj = tdObj[len-1];//最后一个td
	
	//计算出colSpan=="3"的行数量，这类行在新生成表格行时，也是一行2个td。
	while(obj.colSpan=="3"){//一行内第二个td的colSpan=="3"，
		
		  n++;
		  m = m+2;
		  
		  obj = tdObj[len-m];		 
	}
	
	c = len - n*2;//一行4个td（4列）的所有行td数量
	
	//alert(n+" ; "+c+" ; "+len);
	
  //处理一行4列的表格行
	for (var i=0;i<c;i++){ 		
		
		 if(tdObj[i].style.display=="none" || tdObj[i].parentNode.style.display=="none")
		 	     continue;
		 	     
		 tem = tdObj[i].innerHTML;
		 	     
		 k++;
		 
		 if(k==1)		
		    str+= "<tr>";
		    
		 if(k%2==0)		    
		   str+= "<td width='20%'>"+tem+"</td>"
		 else
		 	 str+= "<td width='13%' align='right'>"+tem+"</td>"
		 
		 if(k==6)	{	
		    str+= "</tr>";
		    k = 0;
		 }
	}	    
		 
  //不够6个td，补上
  if(k!=0){
  	
      for (var j=0;j<=6-k;j++)  	
  	     str+= "<td></td>";
  	     
  	  str+= "</tr>";  	
  }
  
  //处理非一行2列的表格行
  n = n*2;	//一行2个td
  for (var j=0;j<n;j=j+2){
  	
  	 str+= "<tr>"
        +"<td align='right'>"+tdObj[len-n+j].innerHTML+"</td>"
        +"<td  colspan='5'>"+tdObj[len-n+j+1].innerHTML+"</td>"
       
        +"</tr>";    	
  }
  
  //添加预算指标名称
  var indexName = "";
  
  var indexTableObj = document.getElementById('indexShowTable'); 
  if(indexTableObj) { 	
  	
  	  for (var i=1;i<indexTableObj.rows.length;i++ ){ 	
  	  	
  	  	 indexName+= ","+indexTableObj.rows[i].cells[1].innerHTML;  
  	  	 indexName+= "("+indexTableObj.rows[i].cells[4].innerHTML+")"; 
      }
  	  //indexName = indexTableObj.rows[1].cells[1].innerHTML;   
  } 
  
  if(indexName.length>1)
     indexName = indexName.substring(1)
     
   str+= "<tr>"
        +"<td align='right'>预算指标：</td>"
        +"<td  colspan='5'>"+indexName+"</td>"       
        +"</tr>"; 
  
  
  tableObj.innerHTML = str;
  divObj.className = "list_box_con_m";  
  
  return;	
}
/**
   * 打印时，将主信息处理为每行3个字段信息的带线表格。
   * @param obj          label   
   * @return 
   */
function flyShowPagePrintSetMainTable1(){		
	
	
	var str = "";
	var arr = new Array(6);
	var n = 0;
	var m = 1;
	var c = 0;//一行4个td（4列）的所有行td数量
	
	var divObj = document.getElementsByClassName("list_box_con_t")[0];
	var tableObj = divObj.getElementsByTagName("table")[0];
	
	var tdObj = tableObj.getElementsByTagName("td");
	
	var len = tdObj.length;//主信息table内td数量
	
	var obj = tdObj[len-1];//最后一个td
	
	//计算出colSpan=="3"的行数量，这类行在新生成表格行时，也是一行2个td。
	while(obj.colSpan=="3"){//一行内第二个td的colSpan=="3"，
		
		  n++;
		  m = m+2;
		  
		  obj = tdObj[len-m];		 
	}
	
	//n = n*2;	
	
	c = len - n*2;//一行4个td（4列）的所有行td数量
	
	alert(n+" ; "+c+" ; "+len);
	
  //处理一行4列的表格行
	for (var i=0;i<c;i=i+6){ 			
     
     arr[0] = (tdObj[i] && i<c) ? tdObj[i].innerHTML : "";
     arr[1] = (tdObj[i+1] && i<c) ? tdObj[i+1].innerHTML : "";
     arr[2] = (tdObj[i+2] && i<c) ? tdObj[i+2].innerHTML : "";
     arr[3] = (tdObj[i+3] && i<c) ? tdObj[i+3].innerHTML : "";
     arr[4] = (tdObj[i+4] && i<c) ? tdObj[i+4].innerHTML : "";
     arr[5] = (tdObj[i+5] && i<c) ? tdObj[i+5].innerHTML : "";
     
 
     str+= "<tr>"
        +"<td width='13%' align='right'>"+arr[0]+"</td>"
        +"<td width='20%'>"+arr[1]+"</td>"
        +"<td width='13%' align='right'>"+arr[2]+"</td>"
        +"<td width='20%'>"+arr[3]+"</td>"
        +"<td width='13%' align='right'>"+arr[4]+"</td>"
        +"<td width='20%'>"+arr[5]+"</td>"
        +"</tr>";  
  }
  
  //处理非一行2列的表格行
  for (var j=0;j<n;j=j+2){ 		
  	
  	 str+= "<tr>"
        +"<td align='right'>"+tdObj[len-n+j].innerHTML+"</td>"
        +"<td  colspan='5'>"+tdObj[len-n+j+1].innerHTML+"</td>"
       
        +"</tr>";    	
  }
  
  //添加预算指标名称
  var indexName = "";
  
  var indexTableObj = document.getElementById('indexShowTable'); 
  if(indexTableObj) { 	
  	
  	  for (var i=1;i<indexTableObj.rows.length;i++ ){ 	
  	  	
  	  	 indexName+= ","+indexTableObj.rows[i].cells[1].innerHTML;  
  	  	 indexName+= "("+indexTableObj.rows[i].cells[4].innerHTML+")"; 
      }
  	  //indexName = indexTableObj.rows[1].cells[1].innerHTML;   
  } 
  
  if(indexName.length>1)
     indexName = indexName.substring(1)
     
   str+= "<tr>"
        +"<td align='right'>预算指标：</td>"
        +"<td  colspan='5'>"+indexName+"</td>"       
        +"</tr>"; 
  
  
  tableObj.innerHTML = str;
  divObj.className = "list_box_con_m";  
  
  return;	
}
/**
   * 打印时，将附件、链接的颜色，设置为黑色，以打印清晰。   
   * @return 
   */
function flyShowPagePrintSetAttchColor(){		
	
	var label = "";
	var attchs = window.document.getElementsByClassName("attch_files_span");
	
	for(var i=0;i<attchs.length;i++){	
		
		 labels = attchs[i].getElementsByTagName("label");
		 
		 for(var j=0;j<labels.length;j++){	
		 	
		 	   labels[j].style.color = "black";
		 	   labels[j].style.borderBottom = "0px";
		 }		
	}	
}
/**
   * 指标列表标题显示。收入中，与合同中使用。根据合同性质为收入时，显示收入标题，其他显示支出标题。
   * @param obj          label   
   * @return 有修改返回true；没有修改返回false   
   */
function flyShowPageShowIndexTitle(indexTableObj,flag){		

	if(typeof(indexTableObj) == "string")
	   indexTableObj = document.getElementById(indexTableObj);
	
	
	if(flag=="R"){
		
	    indexTableObj.rows[0].innerHTML = "<td width='5%' align='center'>序号</td>" 
        +" <td width='19%' align='center'>指标</td>"                                           
        +" <td width='10%' align='center'>应收金额</td>"  
        +" <td width='10%' align='center'>已收金额</td>" 
        +" <td width='12%' align='center'>本次收入金额</td>" 
        +" <td width='20%' align='center'>对应收入项</td>" 
        +" <td width='18%' align='center'>备注</td>";	   
  }else
  	 indexTableObj.rows[0].innerHTML = "<td width='5%' align='center'>序号</td>" 
        +" <td width='19%' align='center'>指标</td>"                                           
        +" <td width='10%' align='center'>总金额</td>"  
        +" <td width='10%' align='center'>可用额度</td>" 
        +" <td width='12%' align='center'>本次使用金额</td>" 
        +" <td width='20%' align='center'>对应支出项</td>" 
        +" <td width='18%' align='center'>备注</td>";	
	
	return;
}
/**
   * 显示动态定义附件。取得当前progId，取得定义附件，显示到主信息最下发、老附件上方。
   * 如果传递defType，则为选择不同类别，动态显示相应类别附件。
   * 在span里，不加flyflag=4，以免得修改原来程序。  
   
   * @param defType    业务类别对象
   * @return 
   */
function flyShowPageGetAttch(){	
	
	var billCode = document.getElementById("billCode");
	
	if(!billCode)
	  return;
	  
	var info = "opValue="+document.getElementById("billCode").innerHTML;	
	
	var result = getHttpResponse("/fwis/mssl/attchDefSrv","ShowAttch",info);	
	
	//名称|说明|附件拼串,3个
	var arr = result.split("|");
	
	if(arr.length<3)
	   return;
	   
	var trObj = "";
	var str = "";
	var str1 = "";//附件拼串
	var n =  0;
	var aArr = new Array();
	
	var tableObj = document.getElementsByClassName("list_box_con_t")[0].getElementsByTagName("table")[0];
	 
	for (var i=0;i<arr.length;i=i+3 ){ 	
		
		str1 = "";
		
		if(!arr[i+2] || arr[i+2].indexOf("⌒")<1)
		   continue;
		   
		 //添加附件内容
		 aArr = arr[i+2].split("~");					 	   
		 	   
     for(var j=0;j<aArr.length;j++){  
         	
        n = aArr[j].lastIndexOf("⌒");
         	           	   
        str1+= "<label flyvalue='"+aArr[j]+"'>"+aArr[j].substring(n+1)+"</label>";           	         	
     }		
		 
		 str = "<td align='right' title="+arr[i+1]+">"+arr[i]+"：</td>"
            +"<td  colspan='3'>"            
               +"<span  id='Attch"+i+"'  class='attch_files_span' style='width:100%;margin-right:15px;overflow:hidden;border:0px;'>"
               + str1    
               +"</span>"
            +"</td>";
            
     trObj = document.createElement("tr"); 
     trObj.innerHTML = str;    
     
     tableObj.appendChild(trObj); 
     
      //附件图片显示
     flyShowPageAttchImg("Attch"+i,"flyShowPageImgLayerId","flyShowPageImgTitleLayerId");    
  } 
  return;	
}
/**
   * 在显示页面，弹出显示链接页面，如报销显示页面的申请单等。
   * @param obj          label   
   * @return 有修改返回true；没有修改返回false   
   */
function flyShowPageToHrefSrc(obj,progId,valueFlag,authFlag){		
	
	 var dataKey = "";
	 
	 if(valueFlag=="S")
	    dataKey = obj.innerHTML;
	 else if(valueFlag=="V")
	    dataKey = obj.getAttribute("flyvalue"); 
	 else if(valueFlag=="F")
	 	  dataKey = flyShowPageGetHrefSrcKey(obj,progId,valueFlag,authFlag);	 
	 	  
	 	  
	 if(!authFlag || authFlag.trim().length<1) 
	    authFlag = "M";
	    
	 dataKey = window.encodeURI(window.encodeURI(dataKey));
	 
	 var url = "/fwis/mssl/"+	progId +"?flag=Show&dataKey="+dataKey+"&authFlag="+authFlag;
	
	 openPopPage(url,0.2,0.05,0.7,0.8);
	
}
/**
   * 审批节点显示审批信息。鼠标移动到审批节点时，弹窗显示审批信息和附件。   
   * @return 
   */
function flyShowPageApproveInfoLayerOpen(obj,e){		
	
	  var layerObj = document.getElementById("approveInfoLayerId");
	  
	  var v = obj.getAttribute("flyvalue"); //审批信息
	  var arr = v.split("|");
	  
	  //没有审批信息，隐藏信息显示层，返回
	  if(arr[0].trim().length<1 && arr[1].trim().length<1){
	  	
	  	 if (layerObj)
	  	     layerObj.style.display="none";
	  	     
	     return;
	  }
	  
	  if (!layerObj) {//不存在审批信息显示层，添加
	  	
	  	  str = "<p style='padding:10px;'></p>"	 
            + "<span  class='attch_files_span' style='width:96%;border:0;'></span>";
	  	
	      var layerObj =  document.createElement("div"); 
        layerObj.id = "approveInfoLayerId";   
        layerObj.style.cssText= "display:none;z-index:2;background-color: white;min-width:20%;max-width:40%; min-height:10%;max-height:30%;border:1px #000 solid;position:absolute;border-radius:8px;overflow-y:auto;overflow-x:hidden;box-shadow: 5px 5px 5px #888888;";   
        layerObj.innerHTML = str;
   
        document.getElementsByTagName("body")[0].appendChild(layerObj);		  
	  
	  }else {//存在审批信息显示层，清空已有信息	  	
	  	
	  	  layerObj.getElementsByTagName("p")[0].innerHTML = "";
	  	  layerObj.getElementsByTagName("span")[0].innerHTML = "";	  	
	  }
	  
	  
	
	  if (!e) 
	    e = window.event;	 //兼容ie浏览器    
	
	  //鼠标抬起点
    var x = e.clientX;
    var y = e.clientY;       
	  
	  layerObj.style.display="block";
	  
	  var w = layerObj.clientWidth || layerObj.offsetWidth;
	 
	  layerObj.style.top = (y + 50)+"px";
	  layerObj.style.left = (x - w/2)+"px"; 
	  
	  if(arr[0].trim().length>0){//显示审批信息
	  	
	  	 var pObj = layerObj.getElementsByTagName("p")[0];
	  	 pObj.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+arr[0];
	  }
	  
	  if(arr[1].trim().length>0){//显示附件
	  	
	  	 var aObj = layerObj.getElementsByTagName("span")[0];
	  	 flyFormDataPageShowAObjAttch(aObj,arr[1],"~");
	  
	     //附件添加监听,点击附件弹出操作按钮。
       flyShowPageAttchImg(aObj,"flyShowPageImgLayerId","flyShowPageImgTitleLayerId");   

	  } 
	  return;	    
}
/**
   * 设置作废后页面按钮为返回，如果设置了打印，则再加一个打印按钮；同时设置单据状态为作废。
   * @param obj          label   
   * @return 
   */
function flyShowPageSetCancel(){		
	
	  //1、设置按钮	 
	   var urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:toListPage();'>返回</a>";	 
	  
	   if(flyShowPageSet_a.printFlag=="Y")
	      urlStr+= "<a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	     
	   document.getElementById('opButtons').innerHTML = urlStr;
	 
	   //2、设置单据状态
	  document.getElementById('billStatusId').innerHTML = "作废";
	  
	  return;	
}
/**
   * 处理支付信息最后一行总计字段显示样式
   * @return 
   */
function flyShowPageSetPayTitle(){
	
	var tableObj = document.getElementById("payTableId");	
	
	var sumTr = tableObj.rows[tableObj.rows.length-1];	
	
	sumTr.cells[0].style.cssText = "text-align:center;color:red;";

	return;
}
/**
   * 取得顶部页面对象，以获取全局变量，如单位、人员等设置    
   * @return 顶部页面对象  
   */
function flyShowPageGetGlobalPageObj(){	
	
	var pageObj  = self.parent.banner;
	
	if(!self.parent.banner)//一般在审批页面中
	   pageObj  = self.parent.parent.banner;	
	   
	if(!pageObj)//一般在弹窗中使用。
	   pageObj  = self.opener.parent.banner;	
	
	return pageObj;
}
