/**
 * Flywings. Created by hzy on 2019/1/10.Beijing WideSky Science Technology Information Co. Ltd。
 
 * 通用列表页面js处理
 */
/**
   * 设置岗位操作人员，对该功能的权限，是只读还是编辑。
   * 根据菜单进入传递的功能标识来确定，S只读权限，E编辑权限。   
   * @return 
   */
flyListPagePage_a = {}; //pageNo页码、pageCount页数、记条录数dataCount
var flyListPageParams_a = {}; //通用全局json变量
var flyListPageSet_a = {}; //通用全局json变量,页面设置，配置变量

var flyListPageWindowHeight_a = 0;
var flyListPageScrollHeight_a = 0;

//flyListPageParams_a.authFlag = "";//登录岗位权限标识，S只读权限，E编辑权限
//flyListPageParams_a.progId = ""; 访问程序id
function flyListPageGetProgId(){	
	
	 return flyListPageParams_a.progId;
}
function flyListPageGetAuth(){	
	
	 return flyListPageParams_a.authFlag;
}
function flyListPageSetInitAuth(auth){	
	
	 flyListPageParams_a.authFlag = auth;
}
function flyListPageGetDataKey(){	
	
	 return flyListPageParams_a.dataKey;
}
function flyListPageSetDataKey(dataKey){	
	
	 flyListPageParams_a.dataKey = dataKey;
}
/**
   * 设置功能是否要进行审批。如果需要审批，则显示按钮，程序处理，会按审批来走。
   * @param appFlag   需要审批，设置为Y   
   * @return 
   */
function flyListPageSetApp(appFlag){	
   
	flyListPageSet_a.appArr = appFlag;	
}
function flyListPageSetAuth(){	
	
	flyListPageParams_a = getRequest();	
	
	var auth = flyListPageParams_a.authFlag;	
	
	//解码
	if(flyListPageParams_a.dataKey)
	   flyListPageParams_a.dataKey = decodeURI(flyListPageParams_a.dataKey);
	   
	//是否实现该方法，如果实现，则调用。主要解决，在审批button显示前，做一些处理设置。
	if(isExitsFunction("flyListPagePreSet")){
		
		flyListPagePreSet(flyListPageParams_a.dataKey);
		
	}
	
	flyListPageSetInitQuery(flyListPageParams_a.flyListQuery);	
	
	if(!auth)
	  return;
	  
	if(auth == "S") {
		 if(document.getElementById('flyOp'))
	     document.getElementById('flyOp').style.display = "none";	   //新增、删除按钮
	   
	   if(document.getElementById('flyListPageOpCol'))
	     document.getElementById('flyListPageOpCol').style.display = "none";//复选框td列
	
	}else if(auth == "E"){
		 if(document.getElementById('flyOp'))
	      document.getElementById('flyOp').style.display = "block";
	      
	   if(document.getElementById('flyListPageOpCol'))
	      document.getElementById('flyListPageOpCol').style.display = "block";
	}
	
	flyListPageSetButton();
		
	return;
}
/**
   * 列表页面设置右上角操作按钮 
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
function flyListPageSetButton(flag){	
	
	if(!flyListPageSet_a.appArr)//显示审批按钮
	    return;
	
	if(flag == "View"){//弹窗预览
	   
	   document.getElementById('opButtons').innerHTML = "<a href='javascript:window.close();'>返回</a>";
	   
	}else if(flyListPageParams_a.authFlag == "S") {//只读权限，只显示返回，返回列表界面
		
	   document.getElementById('opButtons').innerHTML = "<a href='javascript:toListPage();'>返回</a>";   
	   
  }else if(flyListPageParams_a.authFlag == "E"){//编辑权限，新增、复制、修改等按钮
	   	   
	   var urlStr = "<a href='javascript:toListPage();'>返回</a>";
	   	  
	    /*
	   arr=[审批状态，单据状态]
	   审批状态: N，保存未发起状态；P，审批中 ；T，退回状态；Y审批通过状态  
	   单据状态: Y，正常单据
               C，审批通过作废状态。单据两个流程，一个是审批流程，一个是作废流程；
               D，退回作废状态。审批退回，制单人作废。一个流程，退回作废不需要审批；
               T，退回状态。审批退回保留的单据。又重新发起的；
               R，重新发起状态。退回重新发起的新单据。
    */
	   var arr = flyListPageSet_a.appArr;	   
	   
	   if(arr && arr.length>0) {
	   	
	      //if(arr[0] == "N" || arr[0] == "" || (arr[0] == "T" && arr[1] != "T"))
	         //urlStr+= "<a href=\"javascript:toEditPage('Upd');\" class='active'>修改</a>";

	      if(arr[0] == "Y" || (arr[0] == "T" && arr[1] != "T"))
	         urlStr+= "<a href='javascript:flyListPageVoid();' class='active'>作废</a>";

	      if(arr[0] == "N" || arr[0] == "")
	         urlStr+= "<a href='#' onclick='flyListPageApprove(this);' class='active'>发起审批</a>";
	         
	      if(arr[0] == "S" && arr[1] == "Y")
	         urlStr+= "<a href='javascript:flyListPageWithdrawApp();' class='active'>撤回审批</a>";
	      
	      
	   } 
	   
	   //按钮区，返回、保存、重置按钮		 
     document.getElementById('opButtons').innerHTML = urlStr;

	   return;
	   
	}else if(flyListPageParams_a.authFlag == "R"){//浏览权限，别的页面进入查看，只显示返回，返回window.history.back(-1)
	   document.getElementById('opButtons').innerHTML = "<a href='javascript:window.history.back(-1);'>返回</a>";
	}else if(flyListPageParams_a.authFlag == "O"){//浏览权限，别的页面通过弹窗进入查看，只显示关闭窗口，返回window.history.back(-1)
	   document.getElementById('opButtons').innerHTML = "<a href='javascript:window.close();'>返回</a>";
	}
	
	return;
}
/**
   * 作废。
   * @param showData   显示数据。  
   * @return 
   */
function flyListPageVoid(){	
	
	if (confirm("是否确认作废单据？")==true){
	
	   var result = toServerOp("Void",flyListPageGetDataKey());	
	
	   if(result!= "Y"){
	      alert("抱歉，作废失败，请重试。");
	      return;
	   }
	
	   //设置作废后的按钮和单据状态。
	   flyListPageSetCancel();	
  }
	
	return;
}
/**
   * 发起审批。 
   * flyShowPageGetAppName方法，由show页面实现，
      返回审批的业务名称，如事项名称、合同名称等；  
   * @return 
   */
function flyListPageApprove(obj){		
	
	obj.onclick=null;
	
	var appInfo = flyListPageGetDataKey()+"|"+flyListPageGetAppName();
	
	var result = toServerOp("App",appInfo);		
	
	if(result.indexOf("|")<0 && result.indexOf("^")<0 && result.indexOf("ap")<0){
	   alert(ajaxPubAlertError(result));
	   obj.onclick = function() { flyListPageApprove(this) };    
	   
	}else {
		 
		 flyListPageSetDataKey(result);//设置键值为审批后的键值
		 flyListPageAppStartPageOp(result);//发起审批后的处理，如按钮改变等。
	}
	
	return;
}
/**
   * 撤回审批。 
   * 申请人发起审批，没有审批人审批时，可撤回申请。
      
   * @return 
   */
function flyListPageWithdrawApp(){	
	
	var info = "opValue="+appKey_a;	
	
	var result = getHttpResponse("/fwis/mssl/workflowExcSrv","Withdraw",info);	
	
	if(result=="Y") { 
		
		//1、去除流程条
	  wfProgressDelShow();
	  
	  //2、将撤回审批按钮替换为修改按钮,增加发起审批按钮
	  var buts = document.getElementById("opButtons");
	  
	  var but = buts.getElementsByTagName("a");
	  
	  for (var i=0;i<but.length;i++ ){ 	
	  	
	  	 if(but[i].innerHTML=="撤回审批"){
	  	 	  buts.removeChild(but[i]); 
          //but[i].innerHTML="修改";
          //but[i].href = "javascript:toEditPage('Upd');";         
       }
    }
   
    buts.innerHTML = buts.innerHTML+"<a href='#' onclick='flyListPageApprove(this);' class='active'>发起审批</a>";
    	  
     //3、置键值中审批状态为N，默认为键值顺序为3
    var arr = flyListPageGetDataKey().split("^");
    
    var appSatus = 3;
  
   //非按如下键值顺序的insId,billId,appId,appSatus,billSatus
   //实现该接口，返回相应顺序。
   if(isExitsFunction("flyListPageGetAppStageOrder")){
   	
   	 var arrOrder = flyListPageGetAppStageOrder();
		
		 appSatus = arrOrder[3];     
	 }
   
    arr[appSatus] = "N";
   
    flyListPageSetDataKey(arr.join("^"));
    
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
function flyListPageAppStartPageOp(dataKey){	
	
	 //是否实现该方法，在显示页面发起审批时，实现该方法：
	 //1、取消发起审批、修改按钮；2、显示审批流程条
	if(isExitsFunction("flyListPageAppStartShow")){
		
		flyListPageAppStartShow(dataKey);
		
		return;
	}
	
	 //取消发起审批、修改按钮
	 //var urlStr = "<a href='javascript:toListPage();'>返回</a><a href=\"javascript:toEditPage('Add');\">新增</a><a href='javascript:flyShowPageWithdrawApp();'>撤回审批</a>";
	 var urlStr = "<a href='javascript:toListPage();'>返回</a><a href='javascript:flyShowPageWithdrawApp();'>撤回审批</a>";
   //if(flyShowPageSet_a.printFlag=="Y")
	     // urlStr+= "<a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	      
   document.getElementById('opButtons').innerHTML = urlStr;
   
   var arr = dataKey.split("^");
   
   var insId = 0;
   var appId = 2;
   
   //非按如下键值顺序的insId,billId,appId,appSatus,billSatus
   //实现该接口，返回相应顺序。
   if(isExitsFunction("flyListPageGetAppStageOrder")){
   	
   	 var arrOrder = flyListPageGetAppStageOrder();
		
		 insId = arrOrder[0];
     appId = arrOrder[2];		
	 }
   
   //流程键值
   appKey_a = arr[insId]+"|"+arr[appId];   
   
   //显示审批流程条
   wfProgressBarInit(appKey_a);
	
	 return;
}
/**
   * 设置作废后页面按钮为返回，如果设置了打印，则再加一个打印按钮；同时设置单据状态为作废。
   * @param obj          label   
   * @return 
   */
function flyListPageSetCancel(){		
	
	  //1、设置按钮	 
	   var urlStr = "<a href='javascript:toListPage();'>返回</a>";	 
	  
	   //if(flyShowPageSet_a.printFlag=="Y")
	    //  urlStr+= "<a href='javascript:flyShowPagePrintPreview();'>打印</a>";
	     
	   document.getElementById('opButtons').innerHTML = urlStr;
	 
	   //2、设置单据状态
	   //document.getElementById('billStatusId').innerHTML = "作废";
	  
	  return;	
}
/**
   * 取得点击按钮所在行的键值，根据标识确定是否编码该键值。
   * @param obj     点击按钮对象，即a对象。
   * @param flag    标识，D返回编码值；N返回原值，即不进行编码。
   * @return dataKey
   */
function flyListPageGetALineKey(obj,flag){	
	
	var dataKey = obj.parentNode.parentNode.getAttribute("flyvalue");
	
	if(flag=="D")
	   dataKey = window.encodeURI(dataKey);
	   
	return dataKey;
}
/**
   * 取得查询数据第一列的键值，页面其他功能会用到该键值。
  
   * @return dataKey
   */
function flyListPageGetFirstLineKey(){	
	
	var tableList = document.getElementById('flyListPageTableList');
	
	return tableList.rows[1].getAttribute("flyvalue");	
}
/**
   * 页面查询，通用取得查询条件进行查询。
   * 取得查询条件数据，以页码1进行查询 
   * @return 
   */
function flyListPageQuery(){	
	
	var showInfo = toServerOp("ListQuery","1|"+flyListPageGetQueryData());	
	
	//设置页码信息
	if(showInfo && showInfo.indexOf("|")>0){
		
     var i = showInfo.indexOf("|");
	
	   var pageInfo = showInfo.substring(0,i);
	   //showInfo = showInfo.substring(i+1);
	
	   var arr = pageInfo.split("|");
	    
	   flyListPagePage_a.pageNo = 1;
	   flyListPagePage_a.pageCount = parseInt(arr[0]);
	   flyListPagePage_a.dataNum = parseInt(arr[1]);		
  }
		
	flyListPageShow(showInfo,"1");
	
	return;
}
/**
   * 页面查询,自定义输入条件查询。
   * 取得查询条件数据，以页码1进行查询 
   * @param queryFlag 查询标识，后台识别操作 。 
   * @param queryCon  查询条件，以|拼串。 
   * @return 
   */
function flyListPageConQuery(queryFlag,queryCon){	
	
	var showInfo = toServerOp(queryFlag,(flyListPagePage_a.pageNo+1)+"|"+queryCon);	
	
	if(showInfo && showInfo.indexOf("|")>0)
	   flyListPagePage_a.pageNo++;	
	
	flyListPageShow(showInfo,"1");
}
/**
   * 翻页。
   * @param pageNo   翻页页码
   * @return 
   */
function flyListPageTurnPageQuery(){		
	
	var showInfo = toServerOp("TurnPage",(flyListPagePage_a.pageNo+1)+"|"+flyListPageGetQueryData());	
	
	if(showInfo && showInfo.indexOf("|")>0)
	   flyListPagePage_a.pageNo++;
	
	flyListPageShow(showInfo,flyListPagePage_a.pageNo);
}
/**
   * 重查（刷新）当前页。如删除超过5条数据时，重新查询当前页   
   * @return 
   */
function flyListPageFreshCurrentPage(){		
	
	var pageNo = flyListPageGetCurrentPageNo();
	
	var showInfo = toServerOp("ListQuery",pageNo+"|"+flyListPageGetQueryData());	
	
	flyListPageShow(showInfo,pageNo);
}
 /**
   * 页面数据显示。
   * 1、下方行信息根据标题行取得
     2、下方后台返回值以'|'拼串，第一个为该行键值，往后为各列值.
     3、键值由多个值组成，则以'^'拼串
     3、复选框，可全选，选中后可删除。
     4、删除时，后台要校验可否删除
     5、在显示数据前，将原来数据全部删除。
   * @param showInfo    显示内容，以'|'拼串，第一个为该行键值，往后为各列值    
   * @return 
   */
function flyListPageShow(showInfo,pageNo){
	
	
	var tableList = document.getElementById('flyListPageTableList');
	var firstDiv = tableList.getElementsByTagName("div")[0].cloneNode(true);	
	
	//1、第一次显示数据前，保留第一个，将其他数据全部删除。
	if(pageNo==1){
	
	   tableList.innerHTML = "";
	   tableList.appendChild(firstDiv); 
  }
	
	//2、没有显示数据，返回
	if(!showInfo || showInfo.indexOf("|")<1)
	   return;	
	
	//3、取得每一个数据行显示的字段数量,多一个键值.键值设置为flyvalue
	var len = firstDiv.querySelectorAll("span[flyflag='0']").length + 1;	

	var arr = showInfo.split("|");
	var n = 2;//第一个为页码，第二个为记录条数
	var dataForm = "";	
	var flyflag = "";	
		
	var lineNum = (arr.length-2)/len;
	for (i=0;i<lineNum - 1;i++){ 
		
		  //4、生成显示行
		  if(pageNo>1 || (pageNo==1 && i>0)){//除首页第一行外，其他都克隆挂接。
			   firstDiv = firstDiv.cloneNode(true);	//新克隆
 		     tableList.appendChild(firstDiv); //挂接		
 		  }
 		 
 		  //5、显示数据	
 		 dataForm = firstDiv.getElementsByTagName("*"); 		 
 		 for (w=0;w<dataForm.length;w++ ){ 	
 		 	
 		 	    flyflag = dataForm[w].getAttribute("flyflag"); 	
 		 	    if(!flyflag || flyflag.trim().length<1 || flyflag=="3" || flyflag=="11" || flyflag=="17" || flyflag=="7")
 	              continue;

 		 	    // alert(dArr[n]);
 		 	    if(flyflag=="0")
 		 	       dataForm[w].innerHTML = arr[n];
 		 	    else if(flyflag=="9")
 		 	    	 dataForm[w].setAttribute("flyvalue",arr[n]); 		 	    	 
 		 	    	
 		 	    n++;
 		 } 		 
 		 
 		 /*
 		  dataForm = firstDiv.querySelectorAll("span[flyflag='0']");
 		  for (var w=0;w<dataForm.length;w++ ){ 	
 		 	   
 		 	   dataForm[w].innerHTML = arr[n];
 		 	
 		 	   n++;
      } 		 
      */
	}
	
  return;
}
	
	
/**	
	
	//取得开始列、列数。传递列为减去操作列的列数。
	var colArr = flyListPageStartColShow(n);
	n = colArr[0];
	var opCol = colArr[1];		
	
	
	//动态显示首列操作按钮，如果存在动态生成方法。
	var b = isExitsFunction("flyListPageShowOpCol");
	
	for(var i=2;i<arr.length;i=i+n){
		
		str+="<tr flyvalue='"+arr[i]+"' ondblclick='flyListPageToDetailPage(this);'>";
		
		if(b){
			
			 tem = flyListPageShowOpCol(arr[i]);
			 
			 if(!tem)
			    str+= opCol;
			 else
		      str+= tem;
		     
		}else
		  str+= opCol;
		
		for(var j=1;j<n;j++)		
		  str+="<td align='"+flyListPageTdAlign_a[j+1]+"'>"+arr[i+j]+"</td>";
		
		str+="</tr>";		
	}
	
	tableList.innerHTML = tableList.innerHTML + str;	
	
	//设置页码
	flyListPageSetPage(pageNo,arr[0],arr[1]);	
	
	//当页面显示完成后，执行一些自定义处理  
	if(isExitsFunction("flyListPageShowEndOp"))		
		  flyListPageShowEndOp();
	
	return; 
}
 /**
   * 页面数据显示选择列、操作列定义。该方法为默认值，如果有特殊情况，则覆盖该方法。
     该方法主要是用来实现特殊开始列。
   * @param colNum  列数。实际列数减去操作列。
   * @return 二维数组：[列数，开始列]。列数没有操作列加1，有直接返回。
   */
function flyListPageStartColShow(colNum){	
   
   	//3、登录岗位权限标识，S只读权限，E编辑权限
	var opCol = "";		
	if(flyListPageParams_a.authFlag == "S") {
		
	   opCol = "<td align='center'><a href='#' onclick='javascript:flyListPageToDetailPage(this);'>明细</a></td>";
	   
	}else if(flyListPageParams_a.authFlag == "E"){
		
	   opCol ="<td align='center'><input type='checkbox' value=''></td>"; 
		 opCol+="<td align='center'><a href='#' onclick='flyListPageDelOne(this)'>删除</a> | <a href='#' onclick='javascript:flyListPageToDetailPage(this);'>明细</a></td>";
	}	
	
	return [colNum,opCol];
}
//删除列表全部数据，在显示数据前，将原来数据全部删除。
function flyListPageDelList(titleRowCount){	
	
	var m = 1;
	
	if(titleRowCount)
	   m = titleRowCount;
	
	var tableObj = document.getElementById("flyListPageTableList");
  var n = tableObj.rows.length;  
  for(var i=0;i<n-m;i++)
  	tableObj.deleteRow(n-i-1);
  //for(var i=0;i<n-1;i++)
  	//tableObj.deleteRow(n-i-1);
  	
  return;	
}

/**
   * 页面查询重置。   
   * @return 
   */
function flyListPageQueryReset(){		
	
  var flyflag = ""; 
  
 	var obj = document.getElementById("flyQuery").getElementsByTagName("*");//取得所有标签
 
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1 || flyflag=="15")//15,只取值，不赋值。一般用于查询条件，即只取查询值，不重置。
 	      continue;
 	      
 	   if(flyflag=="0") 
 	      obj[i].value = "";
 	      
 	   else if(flyflag=="1"){
 	      obj[i].setAttribute("flyvalue",""); 
 	      obj[i].value = ""; 
 	   }else if(flyflag=="2"){ 	   	
 	     obj[i].setAttribute("flyvalue","");
 	     obj[i].value = ""; 
 	         
 	   }else if(flyflag=="4"){ 	  
 	   	  obj[i].innerHTML = ""; 	   	 
 	   } 	   
 	}
	return;
}
/**
   * 取得查询数据。  
   * @return 返回查询条件数据。以|拼串。  
   
  
   * 输入表单样式。
   * 参与数据输入显示的标签，必须放到一个form里面
   * 每一个html标签都必须设置这个属性：
   * flyflag： 取值标识，必设项
               0，取标签value值；
               1，取属性flyvalue值；
               2，取标签value值、和属性flyvalue值；
               3，不取值，新增和修改显示，显示不显示。如必选项*，选择图片等
               4，该标签下面的多个span取值，以~拼串。解决多选取值，如人员多选、部门多选、多个附件。

   * flyvalue：取值属性，选设项
               1）解决没有value的标签赋值、取值,如span、div等
               2）有value的，还要取键值，如input选择岗位，value赋值岗位名称，flyvalue赋值岗位代码
   * flyupd： 修改标识，选设项
               0，非末级不可修改；
               1，不可修改
               其他级次，定义。
 
   */
function flyListPageGetQueryData(){	
	
	return document.getElementById("flylistpageappQueryId").value;//取得查询条件
  	
}
/**
   * 初次进入页面，取得上次离开页面查询条件，并设置到查询表单。
   * @param queryCon     查询条件   
   * @return 
   */
function flyListPageSetInitQuery(queryCon){	
	
	if (!queryCon || queryCon.trim().length<1)
	    return;
	    
	 queryCon = decodeURI(decodeURI(queryCon));
	 
	 //alert("ss = "+queryCon);
	 
	 var tem = new Array();
	 var arr = queryCon.split("|");
	 
	 var n = 0; 	 
	 
	
  var flyflag = ""; 
  var labelObj = "";
  
 	var obj = document.getElementById("flyQuery").getElementsByTagName("*");//取得所有标签
 
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)//15,只取值，不赋值。一般用于查询条件，即只取查询值，不重置。
 	      continue;
 	      
 	  // alert(flyflag +" ; "+arr[n]);
 	      
 	   if(flyflag=="0" || flyflag=="15"){  	   
 	      obj[i].value = arr[n];
 	      n++;
 	   }else if(flyflag=="1"){
 	   	
 	   	  obj[i].setAttribute("flyvalue",arr[n]);
 	   	  n++;
 	   	 
 	   }else if(flyflag=="2"){ 	
 	   	
 	   	   if(arr[n].indexOf("^")>-1){
 	   	   	
 	   	      tem = arr[n].split("^");
 	   	  
 	   	      obj[i].setAttribute("flyvalue",tem[0]);
 	   	      obj[i].value = tem[1]; 	
 	   	   }
 	   	  
 	   	   n++;  
 	      
 	   }else if(flyflag=="4"){
 	   	
 	   	  obj[i].innerHTML = "";
 	   	  var m = 0;
           
        if(arr[n].indexOf("⌒")>0){
        	
               tem = arr[n].split("^");	 
               
               for(var j=0;j<tem.length;j++){  
           	
           	      labelObj =  document.createElement("label"); 
           	 
           	      m = tem[j].lastIndexOf("⌒");
           	      labelObj.setAttribute("flyvalue",tem[j]);
           	
           	      labelObj.innerHTML =  tem[j].substring(m+1)+"<a href='#' onClick='commonSelectDelSelLabel(this,event);'>╳</a>";           
           	     
                  obj[i].appendChild(labelObj);            	
               }
        } 
        n++;	   	  
 	   }
 	}
	
	return;
}
/* 删除，点击删除按钮，或者多选后选择删除。

   1、取得选中列表的所有键值。  
   2、后台删除成功后，页面删除。
   3、如果删除数量大于5，则进行重新查询，小于5不查询。
                     
   * @return 
   */
function flyListPageDel(delFlag,delKey){	
	
	if(!delKey || delKey.trim().length<1)
	   return;
	
	var result = toServerOp(delFlag,delKey);		
	
	if(result=="Y" || result.indexOf("^")>-1 || result.indexOf("|")>-1) { 
		
	   var arr = delKey.split("|");
		 if(arr.length>5) //如果删除数量大于5，则进行重新查询当前页 
		   flyListPageFreshCurrentPage();
		 else
	     flyListPageDelLines(arr);
	     
	} else		
	     alert(ajaxPubAlertError(result));	 
	
	if(result == "Y") {
		
		 var arr = delKey.split("|");
		 if(arr.length>5) //如果删除数量大于5，则进行重新查询当前页 
		   flyListPageFreshCurrentPage();
		 else
	     flyListPageDelLines(arr);
	}else if(result == "ERRO")
	   alert("抱歉，删除失败，请重试。");
	else if(result == "DELEXIST")
	   alert("抱歉，该数据已使用，不可删除。");	 	

	return;
}
/* 批量删除，当选择列表复选框时，对选中的所有节点进行批量删除。

   1、取得选中列表的所有键值。  
   2、后台删除成功后，页面删除。
   3、如果删除数量大于5，则进行重新查询，小于5不查询。
                     
   * @return true or false
   */
function flyListPageBatchDel(){	
	
	var delKey = flyListPageGetSelListKey();
	    
	if(delKey.trim().length<1)
	    return;
	
	if (confirm("是否确认删除选择数据？")==true){
	    flyListPageDel("BatchDel",delKey);	    
   }
	return;
	
}
/* 删除一个节点。列表中没有选中节点，删除当前显示节点，即树节点选中的节点。

   1、取得删除节点键值。  
   2、后台删除成功后，页面删除。
   3、不进行页面查询
   * @param obj    删除对象
   * @return 
   */
function flyListPageDelOne(obj){
	
	
	 if (confirm("是否确认删除数据？")==true){
	 	
	 	  var trObj = obj.parentNode.parentNode;
	
	    var delKey = trObj.getAttribute("flyvalue");
	
	    flyListPageDel("Del",delKey);	    
   }
	return;
}
/* 取得选中列表行的键值

   1、列表每行键值，存储在tr行的flyvalue值，属性值中的拼串以'^'分隔。
   2、将所有属性值以|拼串。  
   * @return 选中值拼串
   */
function flyListPageGetSelListKey(){
	
	var str = "";	
	var trObj = "";	
	
	var inputObj = document.getElementById("flyListPageTableList").getElementsByTagName("input");	
	for(var i=1;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox" && inputObj[i].checked) {
			
			 //取得行对象属性flyValue值，为行键值
			 trObj = inputObj[i].parentNode.parentNode;	
		   str+= "|"+trObj.getAttribute("flyvalue");	
		}		   
	}	
	
	if(str.length>1)
	  str = str.substring(1);
	 
	return str;	
}
/* 取得选中列表行的键值

   1、列表每行键值，存储在tr行的flyvalue值，属性值中的拼串以'^'分隔。
   2、将所有属性值以|拼串。  
   * @return 选中值拼串
   */
function flyListPageGetSelKeyArr(){	

	var trObj = "";	
	var arr = new Array();
	
	var inputObj = document.getElementById("flyListPageTableList").getElementsByTagName("input");	
	for(var i=1;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox" && inputObj[i].checked) {
			
			 //取得行对象属性flyValue值，为行键值
			 trObj = inputObj[i].parentNode.parentNode;			   
		   arr.push(trObj.getAttribute("flyvalue"));
		}		   
	}	
	
	return arr;	
}
  /* 取得选中列表行的对象，将对象存储于数组中返回。

   * @return 选中值对象数组
   */
function flyListPageGetSelListObjArr(){	
	
	var arr = new Array();
	
	var inputObj = document.getElementById("flyListPageTableList").getElementsByTagName("input");	
	for(var i=1;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox" && inputObj[i].checked) {
			
			 //取得行对象属性flyValue值，为行键值
			 arr.push(inputObj[i].parentNode.parentNode);			 
		}		   
	}		
	
	return arr;	
}
/* 取得所有列表行的键值，不管是否选中

   1、列表每行键值，存储在tr行的flyvalue值，属性值中的拼串以'^'分隔。
   2、将所有属性值以|拼串。  
   * @return 选中值拼串
   */
function flyListPageGetAllListKey(){
	
	var str = "";	
	var trObj = "";	
	
	var trObj = document.getElementById("flyListPageTableList").getElementsByTagName("tr");	
	for(var i=1;i<trObj.length;i++){
			
			 //取得行对象属性flyValue值，为行键值			
		   str+= "|"+trObj[i].getAttribute("flyvalue");				   
	}	
	
	if(str.length>1)
	  str = str.substring(1);
	 
	return str;	
}
/*   取得行对象，根据行键值。
   * @dataKey:行键值
   * @return 
   */
function flyListPageGetLineObjByKey(dataKey){	
	
	var trObj = document.getElementById("flyListPageTableList").getElementsByTagName("tr");	
	for(var i=1;i<trObj.length;i++){  
			
			 if(dataKey==trObj[i].getAttribute("flyvalue"))			 
			     return trObj[i];	
	}	
	
	return null;
}
/*   删除选中的列表行。当选择列表复选框时，对选中的所有行批量删除。
   * @lineKeyArr:行键值数组  
   * @return true or false
   */
function flyListPageDelLines(lineKeyArr){	
	
	var trObj = document.getElementById("flyListPageTableList").getElementsByTagName("tr");	
	for(var i=1;i<trObj.length;i++){  
		
		for(var j=0;j<lineKeyArr.length;j++){  
			
			 if(lineKeyArr[j]==trObj[i].getAttribute("flyvalue"))
			 
			 trObj[i].parentNode.removeChild(trObj[i]);	
		}
	}	
	
	return;
}
/**
   * 点击明细，进入明细页面。取得明细页面键值，调用实现接口，进入明细页面
   * @param obj    进入明细页面数据对象    
   * @return 
   */
function flyListPageToDetailPage(obj){	

	var detailKey = "";
	
	if(obj.tagName=="A")
	   detailKey = obj.parentNode.parentNode.getAttribute("flyvalue");	
	else if(obj.tagName=="TR")	   
	   detailKey = obj.getAttribute("flyvalue");
	
	//var tm = window.encodeURI(window.encodeURI(detailKey));　//编码 
	detailKey = window.encodeURI(detailKey);　//编码 
	toDetail(detailKey);
}
/**
   * 点击明细，进入明细页面。取得明细页面键值，调用实现接口，进入明细页面
   * @param obj    进入明细页面数据对象    
   * @return 
   */
function flyListPageAppToDetailPage(obj,url){	
	
	var dataKey = obj.getAttribute("flyvalue"); 
	
	url+= "?flag=Show&dataKey="+dataKey+"&authFlag=E";
	
	openPopPage(url,0,0,1,1);
}

 /**
   * 设置页码区域显示。
   * @param pageNo    页码  
   * @param pageCount 总页数
   * @param dataCount 数据总条数 
   * @return 
   */
function flyListPageSetPage(pageNo,pageCount,dataCount){	
	
	if(pageCount.toString().trim().length>0)
	   document.getElementById("flyListPagePageCount").innerHTML = pageCount;	
	if(dataCount.toString().trim().length>0)
	   document.getElementById("flyListPageDataCount").innerHTML = dataCount;	
	if(pageNo.toString().trim().length>0)
	   document.getElementById("flyListPageTurnToNum").value = pageNo;	
	
	//设置翻页按钮 
  flyListPageSetPageNo(pageNo,pageCount);
	
	return;
}
 /**
   * 设置翻页按钮 
   * @param pageNo    页码
   * @param pageCount 总页数   
   * @return 
   */
function flyListPageSetPageNo(pageNo,pageCount){	
	
	var pn = parseInt(pageNo);
	
	if(pageCount.toString().trim().length<1)
	   pageCount = document.getElementById("flyListPagePageCount").innerHTML;	
	var pc = parseInt(pageCount);
	
	var obj = document.getElementById("flyListPageTurnPage").getElementsByTagName("a");
	
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
function flyListPageToPage(obj){	
	
	
	//1、取得当前页
	//2、取得到达页码
	//3、校验是否能翻页：1）点击当前页；2）到达页大于总页数；3）到达页小于1；
	//4、查询数据（查询后会设置页码）	
	
	var toNo = 0;//到达页
	var no = parseInt(flyListPageGetCurrentPageNo());	//当前页
	var pageCount = parseInt(document.getElementById("flyListPagePageCount").innerHTML);//总页数
	  
  //2、取得到达页码	
	if (typeof(obj) == "string") {//点击翻页键 
		
		if(obj=="U")
		  toNo = no - 1;//上翻到达页
		else if(obj=="D")
		  toNo = no + 1;//下翻到达页
	  else if(obj=="T")
		  toNo = parseInt(document.getElementById("flyListPageTurnToNum").value);//输入页码到达页
		  
	}else {//点击页码		
		
		toNo = parseInt(obj.innerHTML);	//到达页		
	}	
	
	//3、校验是否能翻页：1）点击当前页；2）到达页大于总页数；3）到达页小于1；
	if(no==toNo || toNo>pageCount || toNo<1)
	   return;
	   
	//4、查询数据（查询后会设置页码）
	flyListPageTurnPageQuery(toNo);
}
/**
   * 取得当前页码.    
   * @return 
   */
function flyListPageGetCurrentPageNo(){	
	
	//1、取得当前页
	var aObj = document.getElementById("flyListPageTurnPage").getElementsByTagName("a");
	for(var i=0;i<aObj.length;i++){
		
	  if(aObj[i].className == "active")
	     return aObj[i].innerHTML;	
  }  
	
	return "0";
}
/**
   * 处理最后一行合计字段显示 
   * @return 
   */
function flyListPageShowSumTitle(){
	
	var tableObj = document.getElementById("flyListPageTableList");
	
	var len = tableObj.rows.length;	
	
	if(len>1){
		
		var boxObj = tableObj.rows[len-1].cells[0].getElementsByTagName("input")[0];
		if(boxObj && boxObj.type=="checkbox"){
		
	     tableObj.rows[len-1].cells[0].innerHTML = "";
	     tableObj.rows[len-1].cells[1].innerHTML = "<label style='color:red'>合计</label>";
	  }else
	  	 tableObj.rows[len-1].cells[0].innerHTML = "<label style='color:red'>合计</label>";
	}
	
	return;	
} 
/*
1、点击+，根据键值取得数据，显示在下方
  1）判断下方是否已有展开数据，如果有展开的隐藏行，则显示。
  2）下方没有展开数据，则后台取数，展开。
  3）各列根据定义，数据显示不同颜色、字体
  4）生成行flycode数字编码，一级行为2位，二级行为2为，三级行为3为。
     flycode，用来闭合或展开行。
  5）将+号，变换为-号
2、点击-，将该行包含的数据行，隐藏。
  1）根据flycode，将该行下面的行隐藏
  2）将-号，变换为+号
*/
/**
   * 页面查询，通用取得查询条件进行查询。
   * 取得查询条件数据，以页码1进行查询 
   * @return 
   */
function flyListPageTreeQuery(){	
	
	var showInfo = toServerOp("ListQuery","1|"+flyListPageGetQueryData());	
	
	flyListPageTreeShow("",1,10,showInfo,"1");
	
	return;
}
 /**
   * 树形页面数据显示。
   * 1、下方行信息根据标题行取得
     2、下方后台返回值以'|'拼串，第一个为该行键值，往后为各列值.
     3、键值由多个值组成，则以'^'拼串
     3、复选框，可全选，选中后可删除。
     4、删除时，后台要校验可否删除
     5、在显示数据前，将原来数据全部删除。
   * @param obj       展开行对象
   * @param level     展开级次   
   * @param code      展开行编码    
   * @param showInfo  显示内容，以'|'拼串，第一个为该行键值，往后为各列值    
   * @param pageNo    页码
   * @return 
   */
function flyListPageTreeShow(obj,level,code,showInfo,pageNo){	
	
	
	//在显示数据前，一级显示时，将原来数据全部删除。	
	flyListPageDelList();
	
	if(!showInfo || showInfo.indexOf("|")<1)
	   return;	   
	
	//1、取得列数
	var tableList = document.getElementById('flyListPageTableList');
	var n = tableList.rows[0].cells.length - 1;	//减去操作列。实际应该是减去两列，因为数据中有一列键值，所以减去一列。
	
	//2、显示	
	var str = "";
	var arr = showInfo.split("|");
	
	//取得开始列、列数。传递列为减去操作列的列数。
	var colArr = flyListPageStartColShow(n);
	n = colArr[0];
	var opCol = colArr[1];		
	var code = 10;
	var p = 0;
	
	for(var i=2;i<arr.length;i=i+n){
		
		str+="<tr flyvalue='"+arr[i]+"' flylevel='"+level+"' flycode='"+code+"' ondblclick='flyListPageToDetailPage(this);'>";
		str+= opCol;
		
		for(var j=1;j<n;j++)		
		  str+="<td align='"+flyListPageTdAlign_a[j+1]+"' style='"+A1[j-1]+"'>"+arr[i+j]+"</td>";
		
		str+="</tr>";		
		
		code++;//行编码
		p++;//页码
	}
	
	tableList.innerHTML = tableList.innerHTML + str;	
	
	//设置页码
	flyListPageSetPage(pageNo,1,p);	
	
	//当页面显示完成后，执行一些自定义处理  
	if(isExitsFunction("flyListPageShowEndOp"))		
		  flyListPageShowEndOp();
	
	return; 
}
 /**
   * 树形页面展开显示。
   * 1、下方行信息根据标题行取得
     2、下方后台返回值以'|'拼串，第一个为该行键值，往后为各列值.
     3、键值由多个值组成，则以'^'拼串
     3、复选框，可全选，选中后可删除。
     4、删除时，后台要校验可否删除
     5、在显示数据前，将原来数据全部删除。
   * @param obj       展开行对象
   * @param level     展开级次   
   * @param code      展开行编码    
   * @param showInfo  显示内容，以'|'拼串，第一个为该行键值，往后为各列值    
   * @param pageNo    页码
   * @return 
   */
function flyListPageTreeOpen(obj,level,upCode,showInfo){	
	
	
	if(!showInfo || showInfo.indexOf("|")<1)
	   return;	   
	
	//1、取得列数
	var tableList = document.getElementById('flyListPageTableList');
	var n = tableList.rows[0].cells.length - 1;	//减去操作列。实际应该是减去两列，因为数据中有一列键值，所以减去一列。
	
	//2、显示	
	var str = "";
	var arr = showInfo.split("|");
	
	//取得开始列、列数。传递列为减去操作列的列数。
	var colArr = flyListPageStartColShow(n);
	n = colArr[0];
	var opCol = colArr[1];			
	
	var trObj = "";
	var code = 0;
	var rowIndex = obj. rowIndex+1;//返回该行在表中的位置的下一行
	level = parseInt(level)+1;
	
	var sArr = new Array();
	eval("sArr=A"+level);
	
	//生成行flycode数字编码，一级行为2位，二级行为2为，三级行为3为。
  if(level==2)
     code = 10;
  else if(level==3)
     code = 100;	
	
	for(var i=2;i<arr.length;i=i+n){
		
		//trObj =  document.createElement("tr");   
		trObj =  tableList.insertRow(rowIndex); 
    trObj.setAttribute("flyvalue",arr[i]);
    trObj.setAttribute("flylevel",level);
    trObj.setAttribute("flycode",upCode+""+code);
    
		//str+="<tr flyvalue='"+arr[i]+"' flylevel='"+level+"' flycode='"+code+"' ondblclick='flyListPageToDetailPage(this);'>";
		str = opCol;
		
		for(var j=1;j<n;j++)		
		  str+="<td align='"+flyListPageTdAlign_a[j+1]+"' style='"+sArr[j-1]+"'>"+arr[i+j]+"</td>";
		
		//str+="</tr>";		
		
		trObj.innerHTML = str;
		
		if(level == 3)		
		   trObj.cells[0].innerHTML = "";
		
	  
		/*
		if(rowIndex>=tableList.rows.length)
		   tableList.appendChild(trObj);
		else 
			 tableList.insertRow(rowIndex);
		*/
		code++;//行编码		
	}	
	
	
	//当页面显示完成后，执行一些自定义处理  
	if(isExitsFunction("flyListPageShowEndOp"))		
		  flyListPageShowEndOp();
	
	return; 
}
/**
   * 点击树形页面行首+或-号处理。
   * 
   * @param obj       点击+或-对象   
   * @return 
   */
function flyListPageTreeClickBut(obj){	
	
	var tableObj = document.getElementById('flyListPageTableList');
	var trObj = obj.parentNode.parentNode;	
	var code = trObj.getAttribute("flycode");
	
	if(obj.innerHTML == "+"){		
		
		 //是否已展开
		 var rowIndex = trObj.rowIndex;
		 var c = "";
		 for (var i=rowIndex;i<tableObj.rows.length;i++ ){ 	
		 	
		 	 c = tableObj.rows[i].getAttribute("flycode");
		 	
		 	 if(c.indexOf(code)==0 && c.length>code.length){
		 	 	  flyListPageTreeOnOff(trObj,code,"N");
		 	 	  return;
		 	 }
 
     }
		 
		 //未展开
		 var dataKey = trObj.getAttribute("flyvalue");	
		 var level = trObj.getAttribute("flylevel");			 
		 
		 var showInfo = toServerOp("ListQuery",dataKey+"|"+flyListPageGetQueryData());	
		 
		 flyListPageTreeOpen(trObj,level,code,showInfo);
		 
		 obj.innerHTML = "-";		
		 
	}else if(obj.innerHTML == "-"){
		
		 flyListPageTreeOnOff(trObj,code,"F");
		 
		 obj.innerHTML = "+";	
	}
	
	return;
}
/**
   * 已展开的数据，进行关闭或打开。
   * 
   * @param trObj       行对象对象   
   * @param code        行编码 
   * @param flag        标识，F，关闭；N，打开
   * @return 
   */
function flyListPageTreeOnOff(trObj,code,flag){	
	
	var tableObj = document.getElementById('flyListPageTableList');
	
	var c = "";
	var rowIndex = trObj.rowIndex+1;
	for (var i=rowIndex;i<tableObj.rows.length;i++ ){ 	
		 	
		 c = tableObj.rows[i].getAttribute("flycode");
		 	 
		 if(c.indexOf(code)==0){
		 	 	if(flag=="F")
		 	 	  tableObj.rows[i].style.display="none";
		 	 	else if(flag=="N")
		 	 		tableObj.rows[i].style.display = (document.all ? "block" : "table-row");
		 } 
  }
  
  if(flag=="F")
		 trObj.cells[0].getElementsByTagName("a")[0].innerHTML = "+";
	else if(flag=="N")
		 trObj.cells[0].getElementsByTagName("a")[0].innerHTML = "-";
  
  
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
		
		if(inputObj[i].type == "checkbox" && inputObj[i].disabled==false)
		   inputObj[i].checked = b;
	}	
	
	return;
}
  /* 取得选中行的每个td值数组

   * @para startColIndex  行td开始取数列号，以0开始计算
   * @return 选中行，所有td值二维数组
   */
function flyListPageGetSelTrValue(startColIndex){

	var trObj = "";	
	var tem = new Array();
	var arr = new Array();
	
	var inputObj = document.getElementById("flyListPageTableList").getElementsByTagName("input");	
	for(var i=1;i<inputObj.length;i++){  
			
		if(inputObj[i].type == "checkbox" && inputObj[i].checked) {
			
			 tem = new Array();
			 //取得行对象
			 trObj = inputObj[i].parentNode.parentNode;	
			 
			 tem[0] = trObj.getAttribute("flyvalue");	
			 
			 for (var j=startColIndex;j<trObj.cells.length;j++ )				 	
			 	   tem.push(trObj.cells[j].innerHTML);
			 	   
			 arr.push(tem);
		}		   
	}	
	
	return arr;	
}
/**
   * 取得顶部页面对象，以获取全局变量，如单位、人员等设置    
   * @return 顶部页面对象  
   */
function flyListPageGetGlobalPageObj(){	
	
	var pageObj  = self.parent.banner;
	
	if(!self.parent.banner)//一般在审批页面中
	   pageObj  = self.parent.parent.banner;	
	   
	if(!pageObj)//一般在弹窗中使用。
	   pageObj  = self.opener.parent.banner;	
	
	return pageObj;
}
/**
   * 取得定义页面的标题和列表字段    
   * @return 顶部页面对象  
   */
function flyListPageGetDefTitleField(){	
	
	var tem = toServerOp("ShowDataList",loginInsId_a+"^"+flyListPageGetProgId());
	var arr = tem.split("|");
	
	document.getElementById('pageTitle').innerHTML = arr[0];	
	
	
	var str = "<tr class='tab_title' style='background:#F0F0F0;'>"
              +"<td width='60' id='flyListPageOpCol' align='center'><input name='' type='checkbox' value=''  onclick=\"flyTableCheckboxSel('flyListPageTableList',this);\"></td>"
              +"<td width='120' align='center'>操作</td> ";
	
	
	var w = 200;
	if(arr.length<6)
	   w = 1300/arr.length;
	
	for (var i=1;i<arr.length;i++ ){ 	
		
		 str+= "<td width='"+w+"'>"+arr[i]+"</td>";
 
  }
  str+= "</tr>";
  
  document.getElementById('flyListPageTableList').innerHTML = str;	
	
	return 
}
//滚动条在Y轴上的滚动距离
function flyListPageScrollTurnPage(){
	
	var flyListPageWindowHeight_a = flyListPageGetWindowHeight();
  var flyListPageScrollHeight_a = flyListPageGetScrollHeight();
	
	 //滑动翻页
	window.onscroll = function(){
		
		//alert(flyListPageGetScrollTop()+" ; "+flyListPageGetWindowHeight()+" ; "+flyListPageGetScrollHeight());
		
    if(flyListPageGetScrollTop() + flyListPageGetWindowHeight() >= flyListPageGetScrollHeight()-1){
        
        //alert("you are in the bottom!");
       flyListPageTurnPageQuery();        
    }
  };
	
}
//滚动条在Y轴上的滚动距离
function flyListPageGetScrollTop(){
	
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function flyListPageGetScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function flyListPageGetWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
