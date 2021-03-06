/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function toPage(obj,flag) {
	
   if(flag=="ML1")
      window.location.href="oa/mytodo.html?authFlag=E&progId=";
   else if(flag=="ML2")
      window.location.href="oa/myhavetodo.html";
   else if(flag=="ML3")
      window.location.href="oa/myapply.html";
   else if(flag=="ML4")
      window.location.href="oa/myexpense.html";
   else if(flag=="PV1")
      window.location.href="payApply/travelapplyedit.html?flag=Add";
   else if(flag=="PV2")
      window.location.href="payApply/trainApplyEdit.html?flag=Add";
   else if(flag=="PV3")
      window.location.href="payApply/meetingapplyedit.html?flag=Add";
   else if(flag=="PV4")
      window.location.href="payApply/officialapplyedit.html?flag=Add";
   else if(flag=="PV5")
      window.location.href="payApply/outlayApplyEdit.html?flag=Add";
   else if(flag=="PE1")
      window.location.href="payExpense/travelexpenseedit.html?flag=Add";
   else if(flag=="PE2")
      window.location.href="payExpense/trainExpenseEdit.html?flag=Add";
   else if(flag=="PE3")
      window.location.href="payExpense/meetingexpenseedit.html?flag=Add";
   else if(flag=="PE4")
      window.location.href="payExpense/officialexpenseedit.html?flag=Add";
   else if(flag=="PE5")
      window.location.href="payExpense/outlayExpenseEdit.html?flag=Add";
   else if(flag=="PE6")
      window.location.href="payExpense/directlyexpenseedit.html?flag=Add";
   else if(flag=="BG1")
      window.location.href="budget/budgetFinanceIndexEdit.html?flag=Add";
   else if(flag=="BG2")
      window.location.href="budget/budgetIndexDetail.html?flag=Add";
   else if(flag=="BG3")
      window.location.href="budget/budgetIndexDecomposeEdit.html?flag=Add";
   else if(flag=="BG4")
      window.location.href="budget/budgetIndexAdjustEdit.html?flag=Add";
   else if(flag=="BG5")
      window.location.href="budget/budgetIndexAddEdit.html?flag=Add";
   else if(flag=="BG6")
      window.location.href="budget/budgetIndexAnalysis.html";
}
/**  
   * 待办点击进入审批页面，已办点击进入显示页面。 
   * @obj       点击对象
   * @showFlag  类别，E，待办审批；S，已办显示。
  
   * @return 
   */
function flynavToApproveShow(obj,showFlag){		
	
	var dataKey = "";
	var progId = "";
	
	var url = obj.getAttribute("flyvalue"); 
	
	//取得导向页面代码
	var s = url.indexOf("/mssl/");
	var e = url.indexOf("?");
	
	var pageId = url.substring(s+6,e);
	
	var str = url.substring(e+1);
	
	
	//取得导向页面键值、程序代码
	var arr = str.split("&");
	
	for (var i=0;i<arr.length;i++ ){ 			  
		
		  if(arr[i].indexOf("dataKey=")>-1)
		     dataKey = arr[i].substring(arr[i].indexOf("dataKey=")+8);
		     
		  else if(arr[i].indexOf("progId=")>-1){
		  	
		     progId = arr[i].substring(arr[i].indexOf("progId=")+7);
		     
		     if(progId.indexOf("~")>0)
		         progId = progId.substring(0,progId.indexOf("~"));
		     
		  }
  }
  
  if(progId.trim().length<1)//没有程序代码，将页面代码赋值于程序代码	
  	 progId = pageId;
  
	var url = flynavGetPageUrlByPageId(pageId);
	
	url+= "?appFlag="+showFlag+"&flag=Show&dataKey="+dataKey+"&authFlag=S&progId="+progId;
	
	openPopPage(url,0,0,1,1);
}
/**  
   * 我的申请、我的报销，点击明细导航到对应显示页面。 
   * @obj         点击对象
  
   * @return 
   */
function flynavTodetailShow(obj,authFlag){		
	
	var dataKey = obj.getAttribute("flyvalue"); 
	
	var arr = dataKey.split("^");
	
	//ins_id,'^',e_code,'^',IFNULL(approve_id,''),'^',IFNULL(a_state_code,''),'^',IFNULL(state_code,''),'^',IFNULL(total_amt,''),'^',bill_type_id,'^',IFNULL(pay_flag_id,'')
	var url = flynavGetPageUrlByBillType(arr[6]);
	
	url+= "&flag=Show&dataKey="+dataKey+"&authFlag="+authFlag;
	
	openPopPage(url,0,0,1,1);
	
	/*
	window.location.href="travelApplyShow.html?flag=Show&dataKey="+dataKey+"&authFlag="+authFlag+"&progId="+flyEditPageGetProgId();
	
	//alert(eval("applyShowPage_a."+arr[arr.length-1]));
	
	//var url = "/fwis/mssl/"+eval("expenseShowPage_a."+arr[arr.length-1]);
	var url = "/fwis/mssl/"+pubToolsGetProgIdByBillType(arr[arr.length-1]);
	
	dataKey = window.encodeURI(window.encodeURI(dataKey));　//编码 	
	
	openPopPage(url+"?flag=Show&dataKey="+dataKey+"&authFlag=O",0.1,0.05,0.8,0.8);
	*/

}

/**
   * 根据单据类别返回页面地址。一般在列表页面，点击明细，根据单据类别，弹出相应页面。    
   * @param typeId  类别代码  
   * @return 
   */
function flynavGetPageUrlByBillType(typeId){	
	 
	  
	  switch  (typeId)  {	
	  
	    case   "PV" : return "../payApply/travelapplyshow.html?progId=travelApplyShowPage";  //差旅申请	      
	    case   "PL" : return "../payApply/outlayApplyShow.html?progId=outlayApplyShowPage";  //一般事项申请
	    case   "PM" : return "../payApply/meetingapplyshow.html?progId=meetingApplyShowPage";//会议申请
	    case   "PO" : return "../payApply/officialapplyshow.html?progId=officialApplyShowPage";//接待申请
	    case   "PT" : return "../payApply/trainApplyShow.html?progId=trainApplyShowPage"; //培训申请
	    
	    case   "EV" : return "../payExpense/travelexpenseshow.html?progId=travelExpenseShowPage";  //差旅报销	   
	    case   "EL" : return "../payExpense/outlayExpenseShow.html?progId=outlayExpenseShowPage"; //一般事项报销
	    case   "EM" : return "../payExpense/meetingexpenseshow.html?progId=meetingExpenseShowPage"; //会议报销
	    case   "EO" : return "../payExpense/officialexpenseshow.html?progId=officialExpenseShowPage";//接待报销
	    case   "ET" : return "../payExpense/trainExpenseShow.html?progId=trainExpenseShowPage";  //培训报销
	    case   "ED" : return "../payExpense/directlyexpenseshow.html?progId=directExpenseShowPage";  //直接报销
	    
	    case   "CS" : return "../contract/contractSigningShow.html?progId=contractSigningShowPage";   //合同申请
	    case   "CP" : return "../contract/contractPayShow.html?progId=contractPayShowPage"; //合同支付
	    
	    case   "UA" : return "../pur/purPerApplyShow.html?progId=purPerApplyShowPage";//采购申请
	    case   "UE" : return "../pur/purApplyShow.html?progId=purApplyShowPage"; //采购执行
	    
	    case   "IJ" : return "../index/budgetIndexAdjustShow.html?progId=budgetIndexAdjustShowPage"; //指标调剂
	    case   "IA" : return "../index/budgetIndexAddShow.html?progId=budgetIndexAddShowPage"; //指标增减
	   	    
	    default:return null;	       
	  }	
	   
		return;
}
/**
   * 根据单据类别返回页面地址。一般在列表页面，点击明细，根据单据类别，弹出相应页面。    
   * @param typeId  页面代码  
   * @return 
   */
function flynavGetPageUrlByPageId(typeId){	
	 
	  
	  switch  (typeId)  {	
	  
	    case   "travelApplyShowPage" : return "../payApply/travelapplyshow.html";  //差旅申请	      
	    case   "outlayApplyShowPage" : return "../payApply/outlayApplyShow.html";  //一般事项申请
	    case   "meetingApplyShowPage" : return "../payApply/meetingapplyshow.html";//会议申请
	    case   "officialApplyShowPage" : return "../payApply/officialapplyshow.html";//接待申请
	    case   "trainApplyShowPage" : return "../payApply/trainApplyShow.html"; //培训申请
	    
	    case   "travelExpenseShowPage" : return "../payExpense/travelexpenseshow.html";  //差旅报销	   
	    case   "outlayExpenseShowPage" : return "../payExpense/outlayExpenseShow.html"; //一般事项报销
	    case   "meetingExpenseShowPage" : return "../payExpense/meetingexpenseshow.html"; //会议报销
	    case   "officialExpenseShowPage" : return "../payExpense/officialexpenseshow.html";//接待报销
	    case   "trainExpenseShowPage" : return "../payExpense/trainExpenseShow.html";  //培训报销
	    case   "directExpenseShowPage" : return "../payExpense/directlyexpenseshow.html";  //直接报销
	    
	    case   "contractSigningShowPage" : return "../contract/contractSigningShow.html";   //合同申请
	    case   "contractPayShowPage" : return "../contract/contractPayShow.html"; //合同支付
	    
	    case   "purPerApplyShowPage" : return "../pur/purPerApplyShow.html";//采购申请
	    case   "purApplyShowPage" : return "../pur/purApplyShow.html"; //采购执行
	   	    
	    default:return null;	       
	  }	
	   
		return;
}
function flynavExit() {
  	
  	 var str = getHttpResponse("/fwis/mssl/loginSrv","Exit",""); 
  	
	   window.location.href="./login.html";
}