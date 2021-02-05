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
   * ��������������ҳ�棬�Ѱ���������ʾҳ�档 
   * @obj       �������
   * @showFlag  ���E������������S���Ѱ���ʾ��
  
   * @return 
   */
function flynavToApproveShow(obj,showFlag){		
	
	var dataKey = "";
	var progId = "";
	
	var url = obj.getAttribute("flyvalue"); 
	
	//ȡ�õ���ҳ�����
	var s = url.indexOf("/mssl/");
	var e = url.indexOf("?");
	
	var pageId = url.substring(s+6,e);
	
	var str = url.substring(e+1);
	
	
	//ȡ�õ���ҳ���ֵ���������
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
  
  if(progId.trim().length<1)//û�г�����룬��ҳ����븳ֵ�ڳ������	
  	 progId = pageId;
  
	var url = flynavGetPageUrlByPageId(pageId);
	
	url+= "?appFlag="+showFlag+"&flag=Show&dataKey="+dataKey+"&authFlag=S&progId="+progId;
	
	openPopPage(url,0,0,1,1);
}
/**  
   * �ҵ����롢�ҵı����������ϸ��������Ӧ��ʾҳ�档 
   * @obj         �������
  
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
	
	dataKey = window.encodeURI(window.encodeURI(dataKey));��//���� 	
	
	openPopPage(url+"?flag=Show&dataKey="+dataKey+"&authFlag=O",0.1,0.05,0.8,0.8);
	*/

}

/**
   * ���ݵ�����𷵻�ҳ���ַ��һ�����б�ҳ�棬�����ϸ�����ݵ�����𣬵�����Ӧҳ�档    
   * @param typeId  ������  
   * @return 
   */
function flynavGetPageUrlByBillType(typeId){	
	 
	  
	  switch  (typeId)  {	
	  
	    case   "PV" : return "../payApply/travelapplyshow.html?progId=travelApplyShowPage";  //��������	      
	    case   "PL" : return "../payApply/outlayApplyShow.html?progId=outlayApplyShowPage";  //һ����������
	    case   "PM" : return "../payApply/meetingapplyshow.html?progId=meetingApplyShowPage";//��������
	    case   "PO" : return "../payApply/officialapplyshow.html?progId=officialApplyShowPage";//�Ӵ�����
	    case   "PT" : return "../payApply/trainApplyShow.html?progId=trainApplyShowPage"; //��ѵ����
	    
	    case   "EV" : return "../payExpense/travelexpenseshow.html?progId=travelExpenseShowPage";  //���ñ���	   
	    case   "EL" : return "../payExpense/outlayExpenseShow.html?progId=outlayExpenseShowPage"; //һ�������
	    case   "EM" : return "../payExpense/meetingexpenseshow.html?progId=meetingExpenseShowPage"; //���鱨��
	    case   "EO" : return "../payExpense/officialexpenseshow.html?progId=officialExpenseShowPage";//�Ӵ�����
	    case   "ET" : return "../payExpense/trainExpenseShow.html?progId=trainExpenseShowPage";  //��ѵ����
	    case   "ED" : return "../payExpense/directlyexpenseshow.html?progId=directExpenseShowPage";  //ֱ�ӱ���
	    
	    case   "CS" : return "../contract/contractSigningShow.html?progId=contractSigningShowPage";   //��ͬ����
	    case   "CP" : return "../contract/contractPayShow.html?progId=contractPayShowPage"; //��֧ͬ��
	    
	    case   "UA" : return "../pur/purPerApplyShow.html?progId=purPerApplyShowPage";//�ɹ�����
	    case   "UE" : return "../pur/purApplyShow.html?progId=purApplyShowPage"; //�ɹ�ִ��
	    
	    case   "IJ" : return "../index/budgetIndexAdjustShow.html?progId=budgetIndexAdjustShowPage"; //ָ�����
	    case   "IA" : return "../index/budgetIndexAddShow.html?progId=budgetIndexAddShowPage"; //ָ������
	   	    
	    default:return null;	       
	  }	
	   
		return;
}
/**
   * ���ݵ�����𷵻�ҳ���ַ��һ�����б�ҳ�棬�����ϸ�����ݵ�����𣬵�����Ӧҳ�档    
   * @param typeId  ҳ�����  
   * @return 
   */
function flynavGetPageUrlByPageId(typeId){	
	 
	  
	  switch  (typeId)  {	
	  
	    case   "travelApplyShowPage" : return "../payApply/travelapplyshow.html";  //��������	      
	    case   "outlayApplyShowPage" : return "../payApply/outlayApplyShow.html";  //һ����������
	    case   "meetingApplyShowPage" : return "../payApply/meetingapplyshow.html";//��������
	    case   "officialApplyShowPage" : return "../payApply/officialapplyshow.html";//�Ӵ�����
	    case   "trainApplyShowPage" : return "../payApply/trainApplyShow.html"; //��ѵ����
	    
	    case   "travelExpenseShowPage" : return "../payExpense/travelexpenseshow.html";  //���ñ���	   
	    case   "outlayExpenseShowPage" : return "../payExpense/outlayExpenseShow.html"; //һ�������
	    case   "meetingExpenseShowPage" : return "../payExpense/meetingexpenseshow.html"; //���鱨��
	    case   "officialExpenseShowPage" : return "../payExpense/officialexpenseshow.html";//�Ӵ�����
	    case   "trainExpenseShowPage" : return "../payExpense/trainExpenseShow.html";  //��ѵ����
	    case   "directExpenseShowPage" : return "../payExpense/directlyexpenseshow.html";  //ֱ�ӱ���
	    
	    case   "contractSigningShowPage" : return "../contract/contractSigningShow.html";   //��ͬ����
	    case   "contractPayShowPage" : return "../contract/contractPayShow.html"; //��֧ͬ��
	    
	    case   "purPerApplyShowPage" : return "../pur/purPerApplyShow.html";//�ɹ�����
	    case   "purApplyShowPage" : return "../pur/purApplyShow.html"; //�ɹ�ִ��
	   	    
	    default:return null;	       
	  }	
	   
		return;
}
function flynavExit() {
  	
  	 var str = getHttpResponse("/fwis/mssl/loginSrv","Exit",""); 
  	
	   window.location.href="./login.html";
}