/**
 * Created by hzy on 2019/7/10.widesky technology information, Inc. | flywings/license
 
 * 在审批过程中，使用该js，处理指标挂接、校核金额等功能。
 * 根据支出设置，判断指标是否输入、校核，并进行对应操作。
 */
 

document.write("<script type='text/javascript' src='/fwis/com/is/flywings/pub/js/flycommonselect.js'></script>");
document.write("<script type='text/javascript' src='/fwis/com/is/flywings/pub/js/flycommonpopbar.js'></script>");
document.write("<script type='text/javascript' src='/fwis/com/is/flywings/pub/js/pubUtil.js'></script>");

//是否设置指标为特定岗位设置。需要审批人挂接指标，返回true；不需要，返回false。
function isPostSetPayIndex(){
	
	var loginUserPost = self.parent.parent.banner.loginUserInfo_a.postId;

	var flag = self.parent.parent.banner.payIndexSet_a.flag;
	
	//是否校验指标，有的审批不需要校验设置指标。由程序变量设定。如没有指标的、有不需要校验的，如合同和采购
	//var isCheckIndex = (appIsCheckIndex_a && appIsCheckIndex_a == "N") ?  false : true;
	
	var isCheckIndex = (isExitsVariable("appIsCheckIndex_a") && appIsCheckIndex_a == "N") ?  false : true;
	
	
	//alert(flag+" ; "+loginUserPost+" ; "+self.parent.parent.banner.payIndexSet_a.arr+" ; "+self.parent.parent.banner.payIndexSet_a.arr.indexOf(loginUserPost));
	if(flag && flag == "N" && self.parent.parent.banner.payIndexSet_a.arr.indexOf(loginUserPost)>-1 && isCheckIndex)//设置为录入人不选择指标，则不校验。	    
	   return true;
	   
	return false;	   
}

/* 审批页面调用接口。
   1、editFlag为Y，如果为指定岗位录入指标，则弹出选择指标页面，并显示指标编辑按钮
   

   * @param editFlag 接口调用标识，是否是审批编辑页面。Y，审批页面；
   * @return 
   */
function openRelWindow(editFlag){	
	
	    if(editFlag!="Y")
	       return;
	
	    if(!isPostSetPayIndex())//非指定岗位录入指标，则返回。	    
	        return;
	        
	    //显示指标编辑按钮
	    document.getElementById("indexShowEdit").innerHTML = "<a href='#' onclick='openIndexEditPane()' style='clear:both'>编辑</a>";
	        
	    var tableObj = document.getElementById("indexShowTable");
	   
		 	var inputObj = tableObj.rows[1].cells[1];
	 	  var inputObj1 = tableObj.rows[1].cells[4];
	 	  
	 	  //alert(inputObj.innerHTML+" ; "+inputObj1.innerHTML);
      //1、已输入指标信息，则不弹出。
      if(inputObj.innerHTML.trim().length>0 && inputObj1.innerHTML.trim().length>0){
	 	     return;
	    }
	    //alert("ok1");
	    //2、审批通过的单据，不弹出   
	    
	    openIndexEditPane("N");
	    
	    return;
	}
/* 审批页面调用接口。用以获取相关信息
  
   * @param flag    调用标识。I，判断是否为指定岗位录入指标，是，返回Y。用以确定是否将指标挂接后即在途。
   * @return 
   */
function appPageGetIndexInfoInter(flag){	
	
	    if(flag=="I"){//审批页面调用,判断是否为指定岗位录入指标，返回Y，是。用以确定是否将指标挂接后即在途。
	    	
	    	 //指标在途方式，Y，审批过程中挂接指标即在途
	    	 var onWayFlag = self.parent.parent.banner.payIndexSet_a.onway;
	    	 
	       if(isPostSetPayIndex() && onWayFlag=="Y")
	          return "Y";
	       else 
	       	  return "";
      }
}
/* 审批页面调用接口。用以取得是否可以修改以在审批页面显示修改按钮，判断条件：
   1、审批显示页面 flyAppUpd_a = "Y";
   2、设置了该岗位可审批修改  
   
   * @return 
   */
function appPageGetAppUpdInter(){	
	    	
	    	 //审批过程中可修改岗位
	    	 var appUpdPost = self.parent.parent.banner.payAppUpdSet_a.updPost;
	    	 //审批岗位
	    	 var loginUserPost = self.parent.parent.banner.loginUserInfo_a.postId;
	    	 
	    	 if(typeof(flyAppUpd_a) != "undefined" && flyAppUpd_a == "Y" && appUpdPost.indexOf(loginUserPost)>-1)	    	 	
	    	    return "Y";
	       else 
	       	  return "";
	    	
}
function openIndexEditPane(flag){	
	
	    addIndexEditPane();//添加弹窗层。
	
		    //对弹出的页面层，添加拖动监听	    
      //flyFormDragListener(document.getElementById("titleLayerIndex"),document.getElementById("openLayerIndex"));

      if(!flag || (flag && flag!="N")){
      	
      	var result=toServerOp("AppGetIndex",document.getElementById('billCode').innerHTML);
      
        flyFormDataPageShowData("openLayerIndexForm",result,"E","^","~");
      }
	    document.getElementById("openLayerIndex").style.display = "block";	

}	
//校验指标是否正确，审批通过提交时。如果是指定岗位并是该岗位，则校验是否正确输入了指标信息。
function appRelVerify(flag){	
	
	    if(flag=="T")//审批退回，不校验
	       return true;
	
	    //任何条件都校验指标	   
	    if(!isPostSetPayIndex())//设置为默认(由录入人选择指标)、或非指标管控岗，则返回。	    
	       return true;
	    
	       
	    //走采购的项目，不校验指标。因为可能走第二年的指标	    	    
	    if(isExitsFunction("isOutlayPur")){
		
		      eval("var _function = isOutlayPur");
		      
          if(_function())//走采购的项目
             return true;
	    }	
	        
	    return payExpenseIndexCheck("indexShowTable");		        
	   
	   /*
	   if(document.getElementById("cashAmtId"))//报销提交
	       return payExpenseIndexCheck("indexShowTable");
	    else //支出申请提交
	    	 return payAppIndexCheck("indexShowTable");	
	   */
	}
function setIndexArea(){	
	
	document.getElementById("indexArea").style.display = "none";
}

//鼠标点击页面空白处，隐藏弹出功能 
function mouseDownBlank(event){
	
	flyPopBarMouseDown(event);	
	return;	
} 

  /** 
   * 保存校验。实现flyeditpage接口。
   * 实现js接口.修改或保存提交时，当前特殊业务进行校验。
   * (必输、编码合规性、数字、长度、非法字符这里不用校验，程序已自动校验。)  
  
   * @return true or false
   */
function payAppIndexCheck(tableId){	
	    
	 var inputObj = "";
	 var indexName = "";
	 var uValue = "";
	 
	 var tableObj = document.getElementById(tableId);
	 
	 for (var i=1;i<tableObj.rows.length;i++ ){ 	
	 	
	 	   if(tableId=="indexShowTable"){
	 	  	
	 	     inputObj = tableObj.rows[i].cells[1];
	 	     indexName = inputObj.innerHTML;
	 	     
	 	     uValue = tableObj.rows[i].cells[4].innerHTML;
	 	  
	 	  }else if(tableId=="indexTable"){
	 	  	
	 	  	 inputObj = tableObj.rows[i].cells[1].getElementsByTagName("input")[0];
	 	     indexName = inputObj.value;
	 	     
	 	     uValue = tableObj.rows[i].cells[4].getElementsByTagName("input")[0].value;
	 	  }
	 	  
	 	  //inputObj = tableObj.rows[i].cells[1].getElementsByTagName("input")[0];
	 	  //inputObj1 = tableObj.rows[i].cells[4].getElementsByTagName("input")[0];
	 	  
      if(indexName.trim().length<1){
	 	
	 	     alert("请选择预算指标");
	 	     return false;
	    }
	    if(uValue.trim().length<1){
	 	
	 	     alert("请输入使用金额");
	 	     return false;
	    }
   }
	 
	 return true;
}
/** 
   * 审批点击通过时、或弹出指标输入界面保存时，校验输入指标与报销申请金额。
     1)、审批点击通过时，申请指标金额大于报销金额，且为一个指标时，不提示，将实际报销金额修改后台指标使用金额。
     2)、弹出指标输入界面保存时，申请指标金额大于报销金额，且为一个指标时，不提示，同时将实际报销金额写到指标使用金额处。
   
   1、校验预算指标是否选择
   2、校验指标是否超额
   3、指标金额是否与保险金额一致      
   * @return true or false
   */
function payExpenseIndexCheck(tableId){
	
	 var balance = 0;//指标可用金额
	 var use = 0;//本次使用金额
	 
	 var balanceIndex = 0;//一个指标可用金额
	 var useIndex = 0;//一个本次使用金额
	 
	 var indexName = "";
	 var bValue = "";
	 var uValue = "";
	
	 //1、校验预算指标是否选择
	 var inputObj = "";
	 var i=1;//指标数量，有几个指标。
	 var tableObj = document.getElementById(tableId);
	 
	 for (i=1;i<tableObj.rows.length;i++ ){ 	
	 	  
	 	  if(tableId=="indexShowTable"){
	 	  	
	 	     inputObj = tableObj.rows[i].cells[1];
	 	     indexName = inputObj.innerHTML;
	 	     bValue = tableObj.rows[i].cells[3].innerHTML;
	 	     uValue = tableObj.rows[i].cells[4].innerHTML;
	 	  
	 	  }else if(tableId=="indexTable"){
	 	  	
	 	  	 inputObj = tableObj.rows[i].cells[1].getElementsByTagName("input")[0];
	 	     indexName = inputObj.value;
	 	     bValue = tableObj.rows[i].cells[3].getElementsByTagName("input")[0].value;
	 	     uValue = tableObj.rows[i].cells[4].getElementsByTagName("input")[0].value;
	 	  }
	 	  
      if(indexName.trim().length<1){
	 	
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
    var t = 0;
    
    if(document.getElementById("appAmtId")){//有总计的提交,取得报销金额
    	
    	var appAmt = document.getElementById("appAmtId").innerHTML;
	  
	    t = (appAmt.trim().length<1) ? 0 : parseFloat(appAmt);  
	     
	 }else{ //没有总计的提交，取得申请金额 
	     
	      var cashAmt = document.getElementById("cashAmtId").innerHTML;
	      var pubAmt = document.getElementById("pubAmtId").innerHTML;
	  
	      var c = (cashAmt.trim().length<1) ? 0 : parseFloat(cashAmt);
	      var p = (pubAmt.trim().length<1) ? 0 : parseFloat(pubAmt);
	      t = c+p;	    
	 }  
	 
	 //如果数字是小数，保留2位小数返回，如果是整数，则返回原整数。
	 t = pubUtilIsDecimalTwo(t);
	 use = pubUtilIsDecimalTwo(use);	 
	 balance = pubUtilIsDecimalTwo(balance);	 
	 
	  if(t>balance){
	    	
	     alert("报销金额超出预算指标可用金额，请重新选择指标。");
	 	   return false;
	  }
	  
	  //走采购的项目，不校验金额是否与指标一致。因为可能走第二年的指标	    	    
	  if(isExitsFunction("isOutlayPur")){
		
		   eval("var _function = isOutlayPur");
		      
       if(_function())//走采购的项目
           return true;
	  }	
	  
	  //if(t!=use){//校验指标金额是否与使用金额不一致。在选择指标时，已将报销金额默认为指标使用金额。
	  if(t-use>0.001){  	
	     alert("报销金额与预算指标金额使用金额不一致，请重新设置。");
	 	   return false;
	  }  
   /*
   //3、多个指标，且指标金额是否与报销金额一致
    if(t!=use && i>2){
	    	
	     alert("报销金额与预算指标金额使用金额不一致，请重新设置。");
	 	   return false;
	  }   
	  
	  //4、1个指标，且指标金额大于报销金额，从后台修改报销单对指标使用金额为报销金额。
	  //审批点击通过时，修改后台。
	  //弹出指标输入界面保存时.
	  if(t!=use && i==2){
	  	
	  	  tableObj.rows[1].cells[4].innerHTML = t;
	  }
	  */
	  return true;
}
  /**
   * 移动行时，调用方法 
   * @ currentObj  点击对象。
   * @ moveObj     移动对象。
   * @ flag        移动方向，U向上，D向下。
   * @return 
   */
function flyPopBarMoveTr(currentObj,moveObj,flag){
	
 var moveNo = flyPopBarOrderMoveTr(currentObj,moveObj,flag)
 
 return;	
}

  /**
   * 删除行时，调用方法 
   * @ obj         删除对象。
   * @ nextObj     删除对象的下一个对象。  
   * @return 
   */
function flyPopBarDeledTr(obj,nextObj){
	
	var delOrder = flyPopBarOrderDelTr(obj,nextObj);	
	
	return;	
}
 
 /**
   * 插入行时，调用方法 
   * @ obj     插入对象。  
   * @return 
   */
function flyPopBarInsertTr(obj){
	
	var addOrderNo = flyPopBarOrderInsertTr(obj);//新增序号	
	
	//如果是插入一行指标，则清空新增行指标。其他不清空
	var inputObj = obj.cells[1].getElementsByTagName("input")[0];
	if(!inputObj)
	  return;
	  
	var flytype = inputObj.getAttribute("flytype");
	if(flytype && flytype=="N"){
	   inputObj.value = "";
	   inputObj.setAttribute("flyvalue",null);
	} 
	
	return;	
}
/**
   * 选择
   * 弹出选择页面,参数说明   
   * commonSelectPageInit(progId,preReq,query,pageWidth,pageHeigth,fromLeft,fromTop,backValue,model)
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
   * @ sql         特殊情况时加入自己需要的sql
   * @ return      单选，返回一个数组[];多选返回组合数组，[[],[],[]]，组合数组中每个数组是选中的一个值。
   
   回调函数setSelAssetType(assetArr)
   */	
function getSel(obj,typeFlag){		
	
	
	if(!isExitsVariable("loginInsId_a") || loginInsId_a.trim().length<1){
		
		 var pageObj_a = flyShowPageGetGlobalPageObj();
		 
	   loginInsId_a = pageObj_a.loginUserInfo_a.insId;//取得登录单位
	  
	   loginDeptId_a = pageObj_a.loginUserInfo_a.deptId; //取得登录部门
     
	   loginPerId_a = pageObj_a.loginUserInfo_a.personId;//取得登录人员		
	}
	
	var selProgId = "";
	var preCon = "";
	var selType = "";
	var backFun = "";
	var selFlag = "";
	var conSql = "";
	var orderBy = ""; 	
	
  if(typeFlag=="D"){//指标
  	
	  selProgId = "indexDetailSelect";
	  preCon = loginInsId_a;
	  backFun = "indexSet";
	  selFlag = "1|1|1|1|1";
	  conSql = " i_leaf='Y'"; 
	  orderBy = " i_year desc,case when decom_user_id in ('"+loginDeptId_a+"','"+loginPerId_a+"')  then 1 ELSE 6 END"; 

	}
	commonSelectPageInit(selProgId,preCon,"",90,80,3,10,selFlag,backFun,selType,conSql,obj,orderBy);
	//commonSelectPageInit(selProgId,"","",90,80,3,10,selFlag,backFun,selType,"",obj);
	
}
 /**
   * 预算指标区域，选择指标回调函数
   * @param arr  选择返回指标信息数组
   * @param obj  选择表单对象
   * @return 
   */
function indexSet(selArr,obj){
	
	var trObj = obj.parentNode.parentNode;
	var n = obj.parentNode.cellIndex;
	
	obj.value = selArr[4];
	obj.setAttribute("flyvalue",selArr[0]+"~"+selArr[1]);
	
	trObj.cells[n+1].getElementsByTagName("input")[0].value = selArr[2];
	trObj.cells[n+2].getElementsByTagName("input")[0].value = selArr[3];
	
	//指标输入区，有多少个指标
	var tableObj = trObj.parentNode;
	var row = tableObj.rows.length;
	
	//选择了一个指标时，将报销或申请金额作为指标的使用金额填入。
	if(row<3)
	  setAmtToIndexUse(trObj.cells[n+3].getElementsByTagName("input")[0]);
	
	return;	
}
  /**
   * 审批添加指标时，选择指标时，如果指标是一个，则将指标使用金额设置为报销或申请金额。
   * @inputObj    指标使用金额input对象
   * @return 
   */
function setAmtToIndexUse(inputObj){
	
	 var amt = 0;
	
   if(document.getElementById("cashAmtId")){//报销提交,取得报销金额
   	
   	  var cashAmt = document.getElementById("cashAmtId").innerHTML;
	    var pubAmt = document.getElementById("pubAmtId").innerHTML;
	  
	    var c = (cashAmt.trim().length<1) ? 0 : parseFloat(cashAmt);
	    var p = (pubAmt.trim().length<1) ? 0 : parseFloat(pubAmt);
	    amt = c+p;
	     
	 }else{ //支出申请提交，取得申请金额 
	     
	    var appAmt = document.getElementById("appAmtId").innerHTML;
	  
	    amt = (appAmt.trim().length<1) ? 0 : parseFloat(appAmt);
	 }  	
	 
	 inputObj.value = Math.round(amt*100)/100; 
   return;	
}
 /**
   * 预算指标区域，用户输入本次使用金额，判断是否超出可用金额。如果超出，提示并恢复为原来金额。
   * @param obj  选择表单对象
   * @return  openLayerIndexSave
   */
function inputIndexAmtCheck(obj){	
	  
	  //取得可用指标金额
	  var trObj = obj.parentNode.parentNode;
	  var n = obj.parentNode.cellIndex;
	  var e = parseInt(trObj.cells[n-1].getElementsByTagName("input")[0].value);
    
    var v = (obj.value.trim().length<1) ? 0 : parseInt(obj.value);
    
    if(v>e){
    	
    	 alert("使用金额大于可用金额，请重新输入。");
    	 obj.value = obj.defaultValue;
    	 
    	 return;    	
    }
}
 /**
   * 保存输入指标
   * @param obj  选择表单对象
   * @return  成功保存后，将新增指标添加到显示页面。通过刷新。
   */
function openLayerIndexSave(obj){	
	
	   if(!payExpenseIndexCheck("indexTable"))	
	       return;
	  /*
	  if(document.getElementById("cashAmtId")){//报销提交
	     
	     if(!payExpenseIndexCheck("indexTable"))	
	       return;
	    
	  }else{ //支出申请提交
	     
	     if(!payAppIndexCheck("indexTable"))	
	       return;
	  }
	  */  
	  var str = flyFormDataPageGetData("openLayerIndexForm","^","~");
	  
	  //alert(str);
	  
	  var result=toServerOp("AppAddIndex",document.getElementById('billCode').innerHTML+"|"+str);
	  
	  
	  if(result=="Y"){
	  	
	  	 var indexShowDivobj = document.getElementById("indexShowTable").parentNode;
	  	 
	     flyFormDataPageShowData(indexShowDivobj,str,"S","^","~");
	     
	     document.getElementById("openLayerIndex").style.display = "none";
	  //  self.parent.location.reload();	
	  }  
}

 /**
   * 保存输入指标
   * @param obj  选择表单对象
   * @return  成功保存后，将新增指标添加到显示页面。通过刷新。
   */
function openLayerIndexClose(obj){	
	
	document.getElementById("openLayerIndex").style.display = "none";
	
}
 /**
   * 页面添加指标编辑弹窗。如果存在则不添加，不存在添加。  
   * @return  
   */
function addIndexEditPane(){	
	
	 var indexLayer  = document.getElementById("openLayerIndex");
	 if(indexLayer) //如果存在返回
	    return;
	
   var str = "<div id='titleLayerIndex' class='title_layer'  style='height:15%;'>"
     +"<span class='spanl' style='width:50%;'>选择指标</span>"
     +"<span id='nodeTitleCenter' class='spanc'   style='width:10%;'></span>"
     +"<span class='spanr'  style='width:25%;'><a href='#' onclick=\"this.parentNode.parentNode.parentNode.style.display='none';\">关闭</a></span>"
     +"</div>"	

     +"<div class='list_box_con_m' > "
     +"<form id='openLayerIndexForm' name='openLayerIndexForm' method='post'>"                                  
     +"<table id='indexTable' width='1200' border='0' cellpadding='0' cellspacing='0' flyflag='5'>"         
     +"<tr>"                                                                                 
     +"<td width='5%' align='center'>序号</td>" 
     +"<td width='19%' align='center'><label flyflag='3' class='flyListPageStarLabel'>*</label>指标</td>"                                          
     +"<td width='10%' align='center'>总金额</td>" 
     +"<td width='10%' align='center'>可用额度</td>"
     +"<td width='10%' align='center'>本次使用金额 </td>"
     +"<td width='20%' align='center'>对应支出项</td>"                          
     +"<td width='20%' align='center'>备注 </td>"
     +"<td width='6%' align='center'>操作 </td> "                                                                  
     +"</tr>" 
                                                                              
     +"<tr>"                                                                                 
     +"<td><input type='text'  flyflag='3' value='1' style='text-align:center;'  ></td>"   
     +"<td><input type='text'  flyflag='2' flytype='N'  style='text-align:left;'  onclick=\"pubToolsSelCommon(this,'D')\"  value='' readonly></td>"
     +"<td><input type='text'  flyflag='0' style='text-align:right;'  readonly></td>"
     +"<td><input type='text'  flyflag='0' style='text-align:right;'  readonly></td>"           
     +"<td><input type='text'  flyflag='0' style='text-align:right;'  onfocus='this.defaultValue = this.value;' onkeyup=\"flyCheckDigitInput(this,'D');\" onblur='inputIndexAmtCheck(this)'></td>"   
     +"<td><input type='text'  flyflag='0' style='text-align:left;'  maxlength='100' onkeyup='flyCheckStrInput(this);'></td>"        
     +"<td><input type='text'  flyflag='0' style='text-align:left;'  maxlength='100' onkeyup='flyCheckStrInput(this);'></td>"  
     +"<td align='center'><input type='button' onClick=\"flyPopBarShowPad('indexTable','35',this,event);\"></td>"
     +"</tr>"
     +"</table>"   
     +"</form>"                         
     +"</div>"   

     +"<div class='but_layer'  style='height:35%;padding-bottom:10px;'>"
     +"<a href='javascript:openLayerIndexSave();'>确认</a>"
     +"<a href='javascript:openLayerIndexClose();'>取消</a>"	   
     +"</div>";  
    
     var divObj = document.createElement("div");
     divObj.id = "openLayerIndex";
     divObj.className = "open_layer_css";
     divObj.style.cssText = "width:80%;height:46%;left:10%;";
     divObj.innerHTML = str;
     
     document.getElementsByTagName('body')[0].appendChild(divObj);
	
		 return;
}	
/** 
   * 显示审批中修改过的痕迹，修改行隐藏不可修改表单、可修改未修改表单
   
   * @return 
   */
function payindexopAppUpdShow(){
	
	var tableObj = ""; 
	var upTr = "";
	var inputObj = "";
	var flyupd = "";
	
	var form1 = document.getElementById("editForm").getElementsByTagName("tr");
	for (var i=0;i<form1.length;i++ ){ 	  
		
		  tableObj = form1[i].parentNode;	 
	    if(tableObj.tagName == "TBODY")
	       tableObj = tableObj.parentNode;
	      
	   flyflag = tableObj.getAttribute("flyflag");
	      
	   if(!flyflag || flyflag != "5")//非动态增加行table
	       continue;
	       
	   //取得行第一个input，一般为序号，第一个非序号的，为隐藏var表单，作为修改行标识。
	   /*
	   inputObj = form1[i].getElementsByTagName("var");
	   if(inputObj.length>0)
	      orderNoH = inputObj[0].getAttribute("flyvalue"); 
	   else
	   	  orderNoH = form1[i].cells[0].getAttribute("flyvalue"); 
	   	*/  
	   inputObj = form1[i].getElementsByTagName("input");
	   if(inputObj.length>0 && inputObj[0].type=="hidden")
	       orderNoH = inputObj[0].getAttribute("flyvalue"); 
	   else
	   	   orderNoH = form1[i].cells[0].getAttribute("flyvalue"); 
	      
	   //alert(form1[i].cells[0].innerHTML +" ; orderNoH="+orderNoH);
	   
	   if(!orderNoH || (orderNoH != "-2" && orderNoH != "-2.00"))
	      continue;  
	 
	   var upTr = tableObj.rows[form1[i].rowIndex-1];	
	      
	   //隐藏修改行不可修改的、可修改没有修改的。
 	   for (var j=0;j<form1[i].cells.length;j++ ){ 	 	   	
 	   	   
 	   	       //序号不隐藏
   	    	  if(j==0 && isInteger(form1[i].cells[j].innerHTML))
   	    		    continue;	   
 	   	      
 	       	  flyupd = form1[i].cells[j].getAttribute("flyupd");  	       	  
 	       	 
   	        if(!flyupd ||  form1[i].cells[j].innerHTML == upTr.cells[j].innerHTML) 	    	    
   	    	      form1[i].cells[j].innerHTML = "";       	    		
   	    		
   	    		form1[i].cells[j].style.color = "red";
   	 }  	
   	 
   	 form1[i].removeChild(form1[i].cells[2]);
   	 form1[i].cells[1].colSpan = 2;
   	 form1[i].cells[1].innerHTML = "核定金额";    
   	 form1[i].cells[1].style.cssText = "color:red;text-align:right;"; 	
   	  
	}
	return;
}