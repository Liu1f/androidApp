/**
 * Flywings. Created by hzy on 2019/1/11.Beijing WideSky Science Technology Information Co. Ltd。
 
 * 通用编辑页面js处理
 */
 
  /**
   * 通用编辑页面js模板。1、页面默认为显示样式。置灰背景、必输*号不显示    
     
     * 参与数据输入显示的标签，必须放到一个form里面
   
     * flyflag： 取值标识，必设项.每一个取值或显示的html标签都必须设置这个属性：
 0，取标签value值；
               1，取属性flyvalue值；
               2，取标签value值、和属性flyvalue值；
               3，不取值，新增和修改显示，显示不显示。如必选项*，选择图片等
               4，该标签下面的多个span取值，以~拼串。解决多选取值，如人员多选、部门多选、多个附件。
               5，该标签下面的多个input、select等取值，每个表单值以^拼串,表单值中的内容以~拼串，内容中的值以§拼串。解决动态增加内容，如弹出面板进行增加 。
               6，该标签为段落标签，下面为该段落的多个字段信息，input、select等取值，
               7，该标签为分割线标签，取值时取得该flyvalue的分割线，显示的时候不显示。
               8，select标签,取值只取value值，显示只显示text值。0的时候，取value~text
               9，隐藏值标签,只取得、设置属性flyvalue值；
               
     * flyvalue：取值属性，选设项
               1）解决没有value的标签赋值、取值,如span、div等
               2）有value的，还要取键值，如input选择岗位，value赋值岗位名称，flyvalue赋值岗位代码
               
     * flyupd： 修改标识，选设项
               0，非末级不可修改；
               1，不可修改
               其他级次，定义。

     
      字段存取值:
   
     1、表单显示后台取得字段：
        1）需要显示的字段拼值串。
        2）input输入，传一个value
        3）弹出页面选择的值，code^name。最后一个必须为显示name；code可为多个字段拼接；
        4）下拉列表取值，value,不需要name
        5）多选、或附件，value~name^value~name^value~name。最后一个必须为显示name；code可为多个字段拼接；
        6）与后面列表值分隔符:~~^
     
     2、下方列表值：key|content|content|content|content|......
        1）表单值和列表值分隔符:~~^
        2）key列表每行键值，leaf^code^id(必须按这个顺序)，如果需要多个值，顺序往后拼.
     
     3、新增传递后台字段：
        1）拼值串前加一个值：level+"|"+，后面为所有拼串值
        2）input输入，传一个value
        3）弹出页面选择的值，code^name。最后一个必须为显示name；code可为多个字段拼接；
        4）下拉列表取值，value^name。最后一个必须为显示name；code可为多个字段拼接；
        5）多选、或附件，value~name^value~name^value~name。最后一个必须为显示name；code可为多个字段拼接；value可为多个键值拼串，以'~'
        6) 在最前面加一个level，即当前节点级别。
        7）成功返回菜单节点ID（treeId）
        8）错误返回错误标识符。并alert错误信息，返回调用js的false
     
     4、修改传递后台字段：
        1) 在拼串值前面加三个值：oldFatherCode+"|"+level+"|"+treeId。
           （1）第一个内容是修改前的父节点代码，如果没有改变父节点，则是空串。
           （2）第二个内容是修改后的节点级次，如果没有修改，则是空串。
           （3）第三个内容是treeId。
        2）input输入，传一个value
        3）弹出页面选择的值，code^name。最后一个必须为显示name；code可为多个字段拼接；
        4）下拉列表取值，value^name 最后一个必须为显示name；code可为多个字段拼接；
        5）多选、或附件，value~name^value~name^value~name.最后一个必须为显示name；value可为多个键值拼串，以'~'
        
        6) 注意：改变了父节点。通知后台，后台进行如下处理：
           (1)原父节点下，是否还有子节点,如果没有，则将该父节点修改为叶子节点。
           (2)新父节点，是否是子节点，如果是，则修改为非子节点。
        7）成功返回菜单节点ID（treeId）
        8）错误返回错误标识符。并alert错误信息，返回调用js的false
           
     5、删除传递后台值：
        1）单个删除，flag：del。向后台传递treeId
        2）批量删除，flag：batchDel。向后台传递leaf^code^id|leaf^code^id|leaf^code^id...该值为后台显示传递，可多个拼串
        3) 成功返回成功标识；
        4）错误返回错误标识符。并alert错误信息，返回调用js的false
     
     6、菜单取得后台字段：含5个字段：id|code|name|key|leaf.不需要或没有的以空串赋值。 
        1）id格式：style^id^。。。第一个为样式，第二个为节点id，其他次序往后拼。根节点id为root。
        2) name:code-name，则查询时，生成code-name.如果不显示code，则直接显示name
        
     7、弹出选择页面：
        1）点击父级input或其他表单，弹出选择父级列表。
        2）以code^id|name形式返回。'|'后必须为显示name；'|'前，第一个必须为code；多个依次往后拼串
        3）调用方法设置返回值，flyvalue设置第一个值，value（或InnerHtml）设置第二个值。
        4）显示和保存，都要取值flyvalue^value（或InnerHtml）
        
     8、select
       1）页面初始化时，调用通用方法flycommonselect.js中commonSelectOptionInit(progId,preReq,query,selectId,dv);方法，
          生成option字符串，赋值给页面。不用每次调用。
       2）value可以多个值以^拼串
       2）显示,从后台取值，只取select的value，不取name。
       3) 保存和修改，要传递后台value^name值。
     
     
   */
document.write("<script type='text/javascript' src='/fwis/com/is/flywings/pub/js/flyFloatTip.js'></script>");
var flyEditPageParams_a = {}; //通用全局json变量
var flyEditPageDetail_a = new Array(); //通用全局变量,新增明细项数组
var flyEditPageDetailJson_a = {}; //通用全局变量,新增明细项json数组
var flyEditPageSet_a = {}; //通用全局json变量,页面设置，配置变量
/**
   * 取得页面操作参数
   * 为修改页面，还是新增页面。修改页面要取得修改数据，并显示。   
   * @return 
   */
function flyEditPageGetProgId(){	
	
	 return flyEditPageParams_a.progId;
}
function flyEditPageGetAuth(){	
	
	 return flyEditPageParams_a.authFlag;
}
function flyEditPageGetUpdKey(){	
	
	 return flyEditPageParams_a.dataKey;
}
function flyEditPageGetFlag(){	
	
	 return flyEditPageParams_a.flag;
}
function flyEditPageSetFlag(pageFlag){	
	
	 flyEditPageParams_a.flag = pageFlag;
}
/**
   * 设置键值。一般经过处理后，重新设置键值。如解码等。
   * @param 键值   区域对象id     
   * @return 
   */
function flyEditPageSetUpdKey(newDataKey){	
   
	flyEditPageParams_a.dataKey = newDataKey;	
}
/**
   * 设置功能是否要进行审批。如果需要审批，则显示按钮，程序处理，会按审批来走。
   * @param appFlag   需要审批，设置为Y   
   * @return 
   */
function flyEditPageSetApp(appFlag){	
   
	flyEditPageSet_a.appFlag = appFlag;	
}
/**
   * 设置页面编辑区域对象Id
   * @param objId   区域对象id     
   * @return 
   */
function flyEditPageSetEditObjId(objId){	
	
	flyEditPageSet_a.objId = objId;
}
/**
   * 取得页面编辑区域对象Id
   * @param objId   区域对象id     
   * @return 
   */
function flyEditPageGetEditObjId(){	
	
	return flyEditPageSet_a.objId;
}
function flyEditPageGetParam(){	
	
	flyEditPageParams_a = getRequest();		
		
	if(!flyEditPageParams_a)
	  return;
	
	//var opButtons = document.getElementById('opButtons');
	
	//解码
	if(flyEditPageParams_a.dataKey)
	  flyEditPageParams_a.dataKey = decodeURI(flyEditPageParams_a.dataKey);
	  
	//是否实现该方法，如果实现，则调用。主要解决，在处理前尤其修改显示前，做一些处理设置。
	if(isExitsFunction("flyEditPagePreSet")){
		
		flyEditPagePreSet(flyEditPageParams_a.dataKey);
		
	}
	
	if(flyEditPageParams_a.flag == "Add") {
		
		 //按钮区，返回、保存、重置按钮		
		 //flyEditPageSetAddButton(); 
     //document.getElementById('opButtons').innerHTML = "<a href='javascript:flyEditPageAddCancel();'>返回</a><a href='javascript:flyEditPageAddSave();' class='active'>新增保存</a><a href='javascript:flyEditPageAddReset();'>重置</a> ";
	   
	}else if(flyEditPageParams_a.flag == "Upd"){		 
		
		 //按钮区，返回、保存、重置按钮
		 flyEditPageSetUpdButton();
 	   
	   //取得修改数据，调用接口后台
	   flyEditPageParams_a.updData = toServerOp("UpdData",flyEditPageParams_a.dataKey);		
	   
	   //修改显示
	   flyEditPageUpdShow(flyEditPageParams_a.updData);
	   
	}else if(flyEditPageParams_a.flag == "Copy"){
		
		 //按钮区，返回、保存、重置按钮
		 flyEditPageSetCopyButton();
     //document.getElementById('opButtons').innerHTML = "<a href='javascript:flyEditPageCopyCancel();'>返回</a><a href='javascript:flyEditPageCopySave();' class='active'>复制保存</a><a href='javascript:flyEditPageCopyReset();'>重置</a> ";	   
	   
	   //取得拷贝数据，调用接口后台
	   flyEditPageParams_a.updData = toServerOp("CopyData",flyEditPageParams_a.dataKey);		
	   
	   //拷贝显示
	   flyEditPageCopyShow(flyEditPageParams_a.updData);
	   
	}	
	
	//取得自定义附件
	flyEditPageSetAttch();
	
	
	//添加内控规范
  var listBoxCon = window.document.getElementsByClassName("list_box_con");
  if(listBoxCon.length>0){
	   
	   var h3 = listBoxCon[0].getElementsByTagName("h3");
	   if(h3.length>0)	    
	       h3[0].innerHTML = h3[0].innerHTML+"<span onclick='flyFloatWinPageShow(this);' style='float:right;margin-right:75px;'>∨</span>";
  }
	
	return;
}
function flyEditPageSetAddButton(){		
	
	 var form1 = document.getElementById("footerSaveButton").getElementsByTagName("a");
	 form1[0].innerHTML = "新增保存";
	
	 //var urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:flyEditPageAddCancel();'>返回</a><a href='javascript:flyEditPageAddSave();' class='active'>新增保存</a><a href='javascript:flyEditPageAddReset();'>重置</a> ";
	 
	 //if(flyEditPageSet_a.appFlag == "Y" )
	  //  urlStr+= "<a href='javascript:flyEditPageSaveApprove();' class='active'>保存审批</a>";
	 
			 //按钮区，返回、保存、重置按钮		 
   //document.getElementById('opButtons').innerHTML = urlStr;

	 return;
}
function flyEditPageSetUpdButton(){
	 
		//按钮区，返回、保存、重置按钮
	 //var urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:flyEditPageUpdCancel();'>返回</a><a href='javascript:flyEditPageUpdSave();' class='active'>修改保存</a><a href='javascript:flyEditPageUpdReset();'>重置</a> ";		 
	 //if(flyEditPageSet_a.appFlag == "Y" )
	 //   urlStr+= "<a href='javascript:flyEditPageSaveApprove();' class='active'>保存审批</a>";
	  //按钮区，返回、保存、重置按钮		 
   //document.getElementById('opButtons').innerHTML = urlStr;
   
	 var form1 = document.getElementById("footerSaveButton").getElementsByTagName("a");
	 form1[0].innerHTML = "修改保存";
			
	 return;
}
function flyEditPageSetCopyButton(){	 
	
	//按钮区，返回、保存、重置按钮
	 var urlStr = "<a href='#' onclick='pubToolsShowHiddenMain(this);' style='width:30px !important;font-size:20px;color:#FF8040;'>∨</a><a href='javascript:flyEditPageCopyCancel();'>返回</a><a href='javascript:flyEditPageCopySave();' class='active'>复制保存</a><a href='javascript:flyEditPageCopyReset();'>重置</a> ";	 
	 
	 if(flyEditPageSet_a.appFlag == "Y" )
	    urlStr+= "<a href='javascript:flyEditPageSaveApprove();'  class='active'>保存审批</a>";
	 
			 //按钮区，返回、保存、重置按钮		 
   document.getElementById('opButtons').innerHTML = urlStr;
   
	 return;
}
//
/**
   * 预览。取得当前输入数据，弹出显示页面。
   * @param formId     输入信息form
   * @return           
   */
function flyEditPagePreView(formId){	
	
	//1) 校验，对所有输入内容进行校验
	if(!flyEditPageSaveCheck(formId))
	  return;
	
	//2）取数通用方法实现。通过设置输入标签flyflag，flyvalue
	var viewInfo = flyEditPageGetData(formId);
	
	//alert("viewInfo = "+viewInfo);   
	
	//3）弹出显示页面。
	flyEditPageToShowPage(viewInfo,"P");
}

//app新增、修改保存处理。修改与保存调用这个方法，根据flag判断是修改还是新增。
function flyEditPageAddSave(addFlag){		
	
	/*
	1、	校验内容：
    1） 最大长度、特殊字符:onkeyup="flyCheckStrInput(this)"
    2） 数字:onkeyup="flyCheckDigitInput(this,'I')"
    2） 必输项:
            及时判断：        necessary="1" onblur="neceCheck(this)"
            保存时，统一判断：necessary="1" neceInput(obj)
    4)  回车移动光标：onLoad 时初始化加入 inputEnterTab(formId)
    5）	编码规则校验：由flyencode_n中通用函数实现onblur = isEncodeRuleRight(newEncode)。
    6） 编码输入，必输项、	编码规则校验由统一函数实现，onblur = fly3PartCodeRule(obj)
    7)  其他业务逻辑校验：由开发者自己完成
  2、	取得输入内容，
    1) 校验，对所有输入内容进行校验
       （1）	必输项
       （2）	编码规则
       （3）	输入编码与父级编码是否相符
       （4）	其他业务逻辑校验，实现js接口

    2）	取数通用方法实现。通过设置输入标签flyflag，flyvalue
  3、	保存（点击按钮）：
    1）	后台存储： 接口3
    2）	保存成功：
     （1）	将新增节点添加到左侧菜单
     （2）	显示新增节点内容。类似点击该节点。
    3）	保存失败：
     （1）	alert错误信息
     （2）	页面不动

	*/
	//取得标识
	addFlag = flyEditPageGetFlag();
	if(addFlag=="Add")
	   addFlag = "AddSave";
	else if(addFlag=="Upd")
		 addFlag = "UpdSave";
	else {
		
		  alert("抱歉，系统状态不正确，请重新登录。");
		  return;
	}
	
	//新增保存标识，默认为AddSave。特殊可由客户端定义自己的标识。
	//if(!addFlag || addFlag.trim().length<1)
	//  addFlag = "AddSave";
	
	var objId = flyEditPageGetEditObjId();	
	
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	   
	//1) 校验，对所有输入内容进行校验
	if(!flyEditPageSaveCheck(objId,addFlag))
	  return;
	
	//2）	取数通用方法实现。通过设置输入标签flyflag，flyvalue
	var addInfo = flyEditPageGetData(objId);
	
	if(addFlag=="UpdSave")
	   addInfo = flyEditPageGetUpdKey()+"|"+addInfo;//键值+修改内容

	alert("addInfo = "+addInfo);
	
	//3)保存，调用接口后台保存
	var addId = toServerOp(addFlag,addInfo);	
	
	//alert(addId);
	
	//4)保存成功，返回页面键值，导向显示页面
	if(addId=="Y" || addId.indexOf("^")>-1 || addId.indexOf("|")>-1) { 
		
	  flyEditPageToShowPage(addId,"L");//导向显示页面
	  
	} else if(addId=="AlreadyAlert")//页面已做了提示处理，直接返回。
		return;
	else		
	  alert(ajaxPubAlertError(addId));	 
	

	//5)保存失败，由接口alert原因，返回false	
	return;
	
}
/**
   * 保存审批。   
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageSaveApprove(appFlag){
	
	var objId = flyEditPageGetEditObjId();
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	   
	//3)取得标识
	if(!appFlag || appFlag.trim().length<1)	{
		
	    if(flyEditPageParams_a.flag=="Add" || flyEditPageParams_a.flag=="Copy") {
		
		       appFlag = "AddSaveApprove";
		 
	    }else if(flyEditPageParams_a.flag=="Upd") {
		
		       appFlag = "UpdSaveApprove";
		       //appInfo = flyEditPageParams_a.updKey+"|"+appInfo;
	    }	
  }
	   
	//1) 校验，对输入内容、审批要求内容进行校验
	if(!flyEditPageSaveCheck(objId,appFlag) || !flyEditPageAppCheck(objId))
	  return;
	
	//2）	取数通用方法实现。通过设置输入标签flyflag，flyvalue
	var appInfo = flyEditPageGetData(objId);
	
	//修改保存发起审批时，加键值。
	if(flyEditPageParams_a.flag=="Upd")
	   appInfo = flyEditPageGetUpdKey()+"|"+appInfo;
	//alert("appInfo = "+appInfo+" ; appFlag = "+appFlag);	
	
	//4)保存审批，调用接口后台保存
	var appId = toServerOp(appFlag,appInfo);	
	
	//4)保存成功，返回页面键值，导向显示页面
  if(appId=="Y" || appId.indexOf("^")>-1 || appId.indexOf("|")>-1) { 
		
	  flyEditPageToShowPage(appId,"L");//导向显示页面
	} else		
	  alert(ajaxPubAlertError(appId));	

	//5)保存失败，由接口alert原因，返回false	
	return;	
}
//(九)新增重置处理。
function flyEditPageAddReset(){
	
	window.location.reload();//重新进入新增页面
	
	return;		
	
 	//window.location.href="show.html"; 
}
//新增取消处理,确认取消后，返回列表页。
function flyEditPageAddCancel(){		
	
	if(flyEditPageIsAdd()){
	
	   if (confirm("是否确认放弃编辑保存？")==true){
		
		   toBackPage();
		
	   }
  }else
  	toBackPage();
  	
	return;
}
/**
   * 校验,保存或修改时。
   * @param fromId  输入区域form。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @param opFlag  操作标志
   * @return 合规返回true；不合规返回false
   */
function flyEditPageSaveCheck(fromId,opFlag){		
	
/*
 校验，对整体输入内容进行校验:
（1）	必输项,对必输附件等实现
（2）	其他业务逻辑校验，实现js接口
*/
  
	//（1）	必输项,对必输附件等实现	
	if(!neceAllInput(fromId)){
		
		alert("请输入必输项");
		return false;
	}
	
	//（2）	其他业务逻辑校验，实现js接口
	if(!flyEditPageSubmitCheck(fromId,opFlag))
	   return false;
	   
	return true;	
}
/**
   * 审批校验,一般通过页面实现接口实现。
   * @param fromId  输入区域form。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @return 合规返回true；不合规返回false
   */
function flyEditPageAppCheck(fromId){	
	
	return appPageCheck(fromId);
}
/**
   * 修改取值显示  
   * @param dataKey  键值，后台根据该键值取值。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageUpdShow(updData){			

	flyFormDataPageShowData("editForm",updData,"E","^","~");
	
	return;
	
	if(!updData || updData.indexOf("|")<1)
	   return;	   
	   
	
	
	var arr = updData.split("|");	   
 
  var flyflag = "";
  var str = "";
  var labelObj = "";
  var arr1 = new Array();
 
  var obj = "";
 	var i = 0; 	   
 	
 	//取得所有标签
 	var form1 = document.getElementById("editForm").getElementsByTagName("*");
 
 	for (var j=0;j<form1.length;j++ ){ 	  
 	
 	   obj = form1[j];
 	   flyflag = obj.getAttribute("flyflag"); 	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   switch (flyflag)
     {
       	
         case '0':         
       
           obj.value = arr[i];
           i++;	
           break;
           
         case '1':           
           
           n = arr[i].lastIndexOf("^");
           
           obj.innerHTML =  arr[i].substring(n+1);
           obj.setAttribute("flyvalue",arr[i].substring(0,n));           
           i++;	
           break;
           
         case '2':         
          
           n = arr[i].lastIndexOf("^");
           
           obj.value =  arr[i].substring(n+1);
           obj.setAttribute("flyvalue",arr[i].substring(0,n));     
           i++;	
           break;
           
         case '3':
           
           //obj.style.display = "none";
           break;
           
         case '4':
          
          //先删除原有的，以解决重置、浏览器默认值。
          labelObj = obj.getElementsByTagName("label"); 	
         
          var d = labelObj.length;	  
 	   	    for (var k=0;k<d;k++)
 	   	        obj.removeChild(labelObj[0]);
 	   	        
 	   	   
 	   	     //显示
           arr1 = arr[i].split("^");	 
           for(var k=0;k<arr1.length;k++){  
           	
           	 labelObj =  document.createElement("label"); 
           	 
           	 n = arr1[k].lastIndexOf("~");
           	 labelObj.setAttribute("flyvalue",arr1[k]);
           	 //labelObj.innerHTML =  arr1[k].substring(n+1)+"<a href='#' onClick=\"flyEditPageDelSelLabel("+JSON.stringify(labelObj)+",'"+arr1[k]+"');\">╳</a>";
             labelObj.innerHTML =  arr1[k].substring(n+1)+"<a href='#' onClick='flyEditPageDelSelLabel(this);'>╳</a>";  
             
             obj.appendChild(labelObj);            	
           }
           //<label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>刘涛<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label>
           //var labelObj = obj.getElementsByTagName("label");
           i++;	
           break;     
           
         case '5':
         
           
          // alert("5 : "+i);
           
           var n = flyEditPageObjShow(obj,arr[i]);
           
           
           j = n+j+1;   
           
            
           i++;	        
                    
           break;        
        
         default: break;   
     }   
 	} 
 	
  return;	
}
/**
   * 修改显示一个对象的数据。如动态增加的区域数据。
   * @param objShow   区域对象。
   * @param dataShow  区域显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级   
   * @return 成功返回表单数
   */
function flyEditPageObjShow(objShow,dataShow){	
	
	if(!objShow || !dataShow || dataShow.trim().length<1)
	   return;
 
  var flyflag = "";
  var str = "";
  var labelObj = "";
  var arr1 = new Array();
 
  var obj = "";
 	var i = 0; 
 	var j = 0; 	   
 	 
	var arr = dataShow.split("^");	
	
	var n = objShow.rows[1].cells.length - 1;	//取得列数，并减去操作列
	var r = arr.length/n; //取得行数
	
	flyEditPageDelList(objShow);//删除老数据，重置或有浏览器默认值
	
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
       
           obj.value = arr[i];
           
           break;
           
         case '1':           
           
           n = arr[i].lastIndexOf("~");
           
           obj.innerHTML =  arr[i].substring(n+1);
           obj.setAttribute("flyvalue",arr[i].substring(0,n));           
           
           break;
           
         case '2':         
          
           n = arr[i].lastIndexOf("~");
           
           obj.value =  arr[i].substring(n+1);
           obj.setAttribute("flyvalue",arr[i].substring(0,n));     
           
           break;
           
         case '3':
           
           //obj.style.display = "none";
           break;
           
         case '4':
           
           arr1 = arr[i].split("~");	 
           for(var j=0;j<arr1.length;j++){  
           	
           	 labelObj =  document.createElement("label"); 
           	 
           	 n = arr1[j].lastIndexOf("§");
           	 labelObj.setAttribute("flyvalue",arr1[j]);
           	 //labelObj.innerHTML =  arr1[j].substring(n+1)+"<a href='#' onClick=\"flyEditPageDelSelLabel("+JSON.stringify(labelObj)+",'"+arr1[j]+"');\">╳</a>";
             labelObj.innerHTML =  arr1[j].substring(n+1)+"<a href='#' onClick='flyEditPageDelSelLabel(this);'>╳</a>";           
             obj.appendChild(labelObj);            	
           }
           //<label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>刘涛<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label><label>智耀彤<a href="#" onClick="delOtherPerson(this);">╳</a></label>
           //var labelObj = obj.getElementsByTagName("label");
           
           break;  
        
         default: break;   
     }   
     
     i++;	
 	} 
 	
  return j;	
}

/**
   * 删除列表全部数据，保留标题行和第一行，在新显示数据前，将原来数据全部删除。
   * @param tableObj  表对象 
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageDelList(tableObj){	
	
	//var tableObj = document.getElementById("flyListPageTableList");
  var n = tableObj.rows.length;  
  for(var i=0;i<n-2;i++)
  	tableObj.deleteRow(n-i-1);
  	
  return;	
}
/**
   * 修改保存  
   * @param updFlag  修改标识。默认为UpdSave。特殊可由客户端定义自己的标识。
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageUpdSave(updFlag){	
	
	//修改保存标识，默认为UpdSave。特殊可由客户端定义自己的标识。
	if(!updFlag || updFlag.trim().length<1)
	  updFlag = "UpdSave";
	
	var objId = flyEditPageGetEditObjId();
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	
	//1) 校验，对所有输入内容进行校验
	if(!flyEditPageSaveCheck(objId,updFlag))
	  return;
	
	//2）	取数通用方法实现。通过设置输入标签flyflag，flyvalue
	var updInfo = flyEditPageGetData(objId);
	
	updInfo = flyEditPageGetUpdKey()+"|"+updInfo;//键值+修改内容
	
	//alert("updInfo = "+updInfo);
	
	//3)保存，调用接口后台保存
	var updId = toServerOp(updFlag,updInfo);	
	
	//4)保存成功，返回页面键值，导向显示页面
	if(updId=="Y" || updId.indexOf("^")>-1 || updId.indexOf("|")>-1) { 
		
	   flyEditPageToShowPage(updId,"L");
	   return ;
	   
	} else {		
		
	   alert(ajaxPubAlertError(updId));		
	   return ;
  }
	//5)保存失败，由接口alert原因，返回false	
	return ;	
}
/**
   * 修改放弃（返回）  
   * @param level  显示的级次
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageUpdCancel(){	
	
	var isUpd = flyEditPageIsUpd();
	
	if(isUpd){
	
	    if (confirm("已有内容修改，是否确认放弃？")==true){
		
          flyEditPageToShowPage(flyEditPageParams_a.dataKey,"L");
      
      } else{ return; } 	
  }else  	
  	flyEditPageToShowPage(flyEditPageParams_a.dataKey,"L");
}
/**
   * 修改重置
   * @param level  显示的级次
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageUpdReset(){	
	
	flyEditPageUpdShow(flyEditPageParams_a.updData);
}
/**
   * 拷贝取值显示
   * @param copyData  要显示的拷贝数据。   
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageCopyShow(copyData){	
	
	flyEditPageUpdShow(copyData);
}
/**
   * 拷贝保存  
   * @param level  显示的级次
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageCopySave(copyFlag){	
	
	//修改保存标识，默认为UpdSave。特殊可由客户端定义自己的标识。
	if(!copyFlag || copyFlag.trim().length<1)
	  copyFlag = "CopySave";
	  
	var objId = flyEditPageGetEditObjId();
	if(!objId || objId.trim().length<1)
	   objId = "editForm";
	
	//1) 校验，对所有输入内容进行校验
	if(!flyEditPageSaveCheck(objId,copyFlag))
	  return;
	
	//2）	取数通用方法实现。通过设置输入标签flyflag，flyvalue
	var copyInfo = flyEditPageGetData();
	
	//alert("copyInfo = "+copyInfo);
	
	//3)保存，调用接口后台保存
	var copyId = toServerOp(copyFlag,copyInfo);	
	
	//4)保存成功，返回页面键值，导向显示页面
	if(copyId=="Y" || copyId.indexOf("^")>-1 || copyId.indexOf("|")>-1) { 
		
	   flyEditPageToShowPage(copyId,"L");
	} else		
	  alert(ajaxPubAlertError(copyId));	 

	//5)保存失败，由接口alert原因，返回false	
	return;
	
}
/**
   * 拷贝放弃（返回）  
   * @param level  显示的级次
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageCopyCancel(){	
	
	var isUpd = flyEditPageIsUpd();
	
	if(isUpd){
	
	    if (confirm("已有内容修改，是否确认放弃？")==true){
		
          flyEditPageToShowPage(flyEditPageParams_a.dataKey,"L");
      
      } else{ return; } 	
  }else  	
  	flyEditPageToShowPage(flyEditPageParams_a.dataKey,"L");
}
/**
   * 拷贝重置
   * @param level  显示的级次
   * @return 成功返回true；失败alert错误信息，并返回false
   */
function flyEditPageCopyReset(){	
	
	flyEditPageUpdShow(flyEditPageParams_a.updData);
	
}
//
/**
   * 导向或弹出明细信息显示页面。
   * @param dataKey  显示页面键值
   * @param flag     标识，L，导向显示页；P弹出显示页面
   * @return 
   */
function flyEditPageToShowPage(dataKey,flag){		
	
	//alert(dataKey+" ; "+flyEditPageGetAuth());
	
	dataKey = window.encodeURI(dataKey);
	
	toShowPage(dataKey,flyEditPageGetAuth(),flag);
	
	//window.location.href="assetCofigIndexShow.html?dataKey="+dataKey+"&authFlag="+flyEditPageGetAuth(); 
}
/**
   * 取值,保存或修改时。
   * @param formId     from表单id
   * @return           数据拼串。拼串字符： |，一级；^，二级；~，三级；§，四级；々，五级
   */
function flyEditPageGetData(formId){		
	
	if(!formId || formId.trim().length<1)
     formId = "editForm";	     
 
	return flyFormDataPageGetData(formId,"^","~"); 
}
 /**
   * 插入行时，清空复制行一些内容。
   
   * @param obj         插入行  
  
   * @return  
   */
function flyEditPageInsertRowClearValue1(obj){	
	
	  var flytype = "";	
	
	  //如果明细插入行，则清空插入行金额、数量、选择项等
		var inputObj = obj.getElementsByTagName("input");
		
		for (var i=0;i<inputObj.length;i++ ){ 
			
			 flytype = inputObj[i].getAttribute("flytype");
			 if(flytype && flytype=="amt"){	
			 	
			 	  inputObj[i].setAttribute("flyvalue","");
			    inputObj[i].value = "";
			    inputObj[i].defaultValue = "";
       }
    }   
	
	return;
}
 /**
   * 插入行时，清空复制行一些内容。
   
   * @param obj         插入行  
  
   * @return  
   */
function flyEditPageInsertRowClearValue(obj){	
	
	  var flytype = "";	
	
	  //如果明细插入行，则清空插入行金额、数量、选择项等
		var inputObj = obj.getElementsByTagName("*");
		
		for (var i=0;i<inputObj.length;i++ ){ 
			
			 flytype = inputObj[i].getAttribute("flytype");
			 if(flytype && flytype=="amt"){	
			 	
			 	 if(inputObj[i].tagName=="INPUT" || inputObj[i].tagName=="SELECT"){
			 	     
			 	     inputObj[i].setAttribute("flyvalue","");
			       inputObj[i].value = "";
			       inputObj[i].defaultValue = "";
			       
			   }else if(inputObj[i].tagName=="SPAN")
			   	   inputObj[i].innerHTML = "";
       }
    }   
	
	return;
}
 /**
   * 删除行时，减去总计金额。
   
   * @param obj         删除行  
   * @param totalTagId  总计表单id。
   * @param sumOrder    删除行合计列的td位置序号，以0开始。  
   * @param sumOrder    删除行时，是否重置指标。 Y，重置指标；N，不重置。 
   * @return  
   */
function flyEditPageDelRowTotalMinus(obj,totalTagId,sumOrder,isSetIndex){	
	
	
	var flytype = obj.cells[0].getElementsByTagName("input")[0].getAttribute("flytype");
	
	//如果删除行，则总金额减去删除行金额
	if(!flytype ||  flytype!="detail")
	   return;		   

	var s = parseInt(sumOrder);
	   
	var delAmt = obj.cells[s].getElementsByTagName("input")[0].value;	//合计行金额
	
	if(delAmt.trim().length<1 || delAmt.trim()=="0")
	   return;  
	  
	var amt = document.getElementById(totalTagId).value;
	var a = (amt.trim().length<1) ? 0 : parseFloat(amt);	
	
	document.getElementById(totalTagId).value = Math.round((a - parseFloat(delAmt))*100/100);
	                                       
	//赋值指标使用金额  
	if(!isSetIndex || isSetIndex=="Y")
     flyEditPageSetIndexUse(- parseFloat(delAmt));
	
	return;	
	
}
 /**
   * 合计金额。用户输入时，取得单价、数量，计算该行合计，并计算总计。
   * 总计有的是1个，有的是2个。（申请1个，报销含现金金额、公务卡金额）     
   * @param obj       选择表单对象
   * @param toOrder   另一个乘数的td位置序号，以0开始。即单价、数量位置序号。
   * @param sumOrder  合计td的位置序号，以0开始
   * @param typeOrder 支付类别的位置序号，以0开始。如果没有，则为0，总计为一个；如果大于0，则总计2个
   * @param isChecked 是否校验标准。默认需校验（即不输入时要校验）、Y需校验，N或其他不校验。
   * @param isApped   是否校验审核金额。Y需校验，N或其他不校验。在报销时，为审核过金额的申请，此时所报销的金额不能大于审核金额。
   * @return  
   
   * 1、判断表单是否为修改行，如果是，则以上一行的数据计算
   * 2、计算后，行合计到修改行，其他不变，仍合计到原来位置。
   * 3、被修改行所有数据不变
   
   * 处理：判断，如果是修改行： 
       1）行对象置为被修改行
       2）当前数据置为修改行，默认数据置为原数据
       3）合计行，置为修改行
   * 
   */
function flyEditPageAmtCount(obj,toOrder,sumOrder,typeOrder,isChecked,isApped){	
	
	//alert(toOrder+" ; "+sumOrder+" ; "+typeOrder);
	
	//行对象
	var trObj = obj.parentNode.parentNode;
	
	//输入数据，和原来数据
	var c = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);
	var d = (obj.defaultValue.trim().length<1) ? 0 : parseFloat(obj.defaultValue);
	
	//1、校验审批中核定金额. 校验报销金额，是否大于审批中核定金额
	if(isApped && isApped=="Y"){
		
		  var stand = 0;
		  var flystand = obj.getAttribute("flystand"); 		
		  
		  //设置审核金额  
		  if(!flystand || flystand.trim().length<1){
		     obj.setAttribute("flystand",d);
		     stand = d;
		  }else
		  	 stand = parseFloat(flystand);
		     
		  if(c>stand){
		  	
		  	 obj.value = d;
	   	   alert("抱歉，报销超出核定标准:"+stand+"，请重新输入。");
	   	   return;
		  }
	}

	//2、校验价格不能超过标准	
	if(!isChecked) //默认需校验（即不输入时要校验）
	   isChecked = "Y";	 
	     
	var n = obj.parentNode.cellIndex;//当前输入表单所在td序号
	if(n==4 && isChecked == "Y"){//第四td为价格，在这里写死了。
		
		  //标准金额	
     var standStr = trObj.cells[3].getElementsByTagName("input")[0].value;	  
	   var stand = (standStr.trim().length<1) ? 0 : parseFloat(standStr);
	   
	   if(c-stand>0.01){
	   	
	   	   obj.value = d;
	   	   alert("抱歉，价格超出标准，请重新输入。");
	   	   return;
	   }
		
	}	
	
	if(obj.value == obj.defaultValue)		
		return;
	
	var tagId = "";//总计表单id	
	
	var w = parseInt(toOrder);
	var s = parseInt(sumOrder);
	var t = parseInt(typeOrder);
	
		
	//取得总计金额
	if(t>0){//3个总计，转账、公务卡、第三方
		
	    var sel = trObj.cells[t].getElementsByTagName("select");
	
	    if(sel.length<1 || sel[0].value=="C")
	       tagId = "cashAmtId";
	    else if(sel[0].value=="P")
		     tagId = "pubAmtId";
		  else if(sel[0].value=="T")
		     tagId = "thirdAmtId";
		     
	}else {
		
		  tagId = "planAmt";		
	}
	
	//报销总金额	
  var allAmtStr = document.getElementById("planAmt").value;  
	var allAmt = (allAmtStr.trim().length<1) ? 0 : parseFloat(allAmtStr);
	
	//总计金额(要改变的主信息金额)
  var amt = document.getElementById(tagId).value;  
	var total = (amt.trim().length<1) ? 0 : parseFloat(amt);
	
	//乘数金额	
	var mulStr = trObj.cells[w].getElementsByTagName("input")[0].value;	
	var mul = (mulStr.trim().length<1) ? 0 : parseFloat(mulStr);//乘数金额		
	
	//合计金额		
	var sumStr = trObj.cells[s].getElementsByTagName("input")[0].value;
	var sum = (sumStr.trim().length<1) ? 0 : parseFloat(sumStr);//合计金额	
	
	//原来的相乘金额
	var origin = mul * d;	
	
	//现在的相乘金额
	var now = mul * c;	
	
	//1、如果乘数为空或0，则返回	
	if(mul<0.01)
	   return;	
	
	//2、如果清空了输入数据。原来有数，则合计、总计、和报销总额要减去原来的数。
	if(c<0.01 && d>0.01){
		
		 document.getElementById("planAmt").value = allAmt - origin;	//报销金额
		 document.getElementById(tagId).value = total - origin;	//总计金额
		 trObj.cells[s].getElementsByTagName("input")[0].value = sum - origin;//合计金额	
		 
		 return;
	}
	
	//3、赋值金额   Math.round((original-original2+original3)*100)/100
	document.getElementById("planAmt").value = Math.round((allAmt - origin + now)*100)/100;	//报销金额
	document.getElementById(tagId).value = Math.round((total - origin + now)*100)/100;	//总计金额	
	trObj.cells[s].getElementsByTagName("input")[0].value = Math.round((c*mul)*100)/100;//合计金额	
	
  //4、赋值指标使用金额  
  flyEditPageSetIndexUse(now-origin);
  
  
  //5、赋值支付信息金额  
  
  var payTableObj = document.getElementById("payTableId");  	 
  if(!payTableObj)
     return;
  
  //1)找到人员  
  var payId = ""; 
  var thirdIns = trObj.cells[t+1].getElementsByTagName("span")[0].getElementsByTagName("label");
  if(tagId == "thirdAmtId" && thirdIns.length>0){//第三方单位，
  	
  	 if(thirdIns.length>1)//多个第三方单位，无法确定给哪个支付
  	    return;
  	
  	 payId = thirdIns[0].getAttribute("flyvalue").split("⌒")[0]; 
  	 
  }else  //人员
  	 payId = document.getElementById('personSelId').value;
  	 
  //2)人员（公司）赋值、总计
  
  for (var i=1;i<payTableObj.rows.length-1;i++ ){ 
  	 	
  	 	//支付列表人员（公司）flyvalue：typeId~perId
  	 	per = payTableObj.rows[i].cells[0].getElementsByTagName("input")[0].getAttribute("flyvalue"); 
  	 	
  	 	if(!per)
  	 	  continue;
  	 	  
  	 	tem = per.split("~");
  	 	
  	 	//第三方时，找到第一个第三方公司；非第三方，找到对应人员。
  	 	if(payId==tem[1]){  	 	
  	 	
  	 	   //var m = (tagId == "pubAmtId") ? 6 : 3;  
  	 	   var payOriginStr = payTableObj.rows[i].cells[3].getElementsByTagName("input")[0];
  	 	   var payOrigin = (payOriginStr.value.trim().length<1) ? 0 : parseFloat(payOriginStr.value);//原来金额	
  	 	   	
  	 	   payOriginStr.value = Math.round((payOrigin - origin + now)*100)/100;	//当前金额	; 
  	 	  
  	 	   //将各行改变，合计到总计行
	       flyFormDataPageTableSum(payTableObj,[3]);
	       
  	 	   break;  	 	  
  	 	}
  }    
  
	return;
}
 /**
   * 合计,表格一行中输入数字合计到某个td。用户输入时，取得数量，计算到合计和总计。   
   * @param obj           选择表单对象。
   * @param mulOrder      乘数td的位置序号。为空，没有乘数
   * @param sumOrder      合计td的位置序号字符串，以,分隔，以0开始.为空，没有合计                         
   * @param totalInputId  总计input的id,为空，没有总计
   * @param isIndex       是否改变指标金额：Y，是。调用flyEditPageSetIndexUse方法改变指标。
   * @param isMinus       输入表单为减数：-，其他为加数。
   * @return   
   * 
   */
function flyEditPageTableLinePlusSum(obj,mulOrder,sumOrder,totalInputId,isIndex,isMinus){	
	
	//alert(toOrder+" ; "+sumOrder+" ; "+typeOrder);
	
	//行对象
	var trObj = obj.parentNode.parentNode;
	
	//输入数据，和原来数据
	var c = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);
	var d = (obj.defaultValue.trim().length<1) ? 0 : parseFloat(obj.defaultValue);
	
	
  //输入数据和原来数据相等，返回。
	if(c == d)
	   return;
	   
	var s = c - d;
	
	var sumInput = "";
	var sum = 0;
	var w = 0;	   
	
	//处理乘数
	if(mulOrder.trim().length>0){
		
	    w = parseInt(mulOrder);
	    sumInput = trObj.cells[w].getElementsByTagName("input")[0];	
	    
	    //乘数值
	    var m = (sumInput.value.trim().length<1) ? 0 : parseFloat(sumInput.value);
	    if(m<0.01)
	       return;
	       
	    s = m*s;
   }
	
	//计算到行合计
	if(sumOrder.trim().length>0){
		
	    var arr = sumOrder.split(","); 
      for (var i=0;i<arr.length;i++ ){ 	
  	
  	      w = parseInt(arr[i]);
  	      
  	      sumInput = trObj.cells[w].getElementsByTagName("input")[0];	
  	      sum = (sumInput.value.trim().length<1) ? 0 : parseFloat(sumInput.value);//合计金额	
          
          if(isMinus && isMinus=="-")//该行为减数时
             sumInput.value = (sum - s).toFixed(2);
          else
          	 sumInput.value = (sum + s).toFixed(2);
      }
  }
  
   //计算到总计
  if(totalInputId && totalInputId.trim().length>0) {  
 
      var amt = document.getElementById(totalInputId);  
	    var total = (amt.value.trim().length<1) ? 0 : parseFloat(amt.value);
	    
	    if(isMinus && isMinus=="-")//该行为减数时
	       amt.value = (total - s).toFixed(2);
	    else	    	
	       amt.value = (total + s).toFixed(2);
  }
	
	//赋值指标使用金额  
	if(isIndex=="Y"){
		
		 if(isMinus && isMinus=="-")//该行为减数时
		    flyEditPageSetIndexUse(-s);
		 else
        flyEditPageSetIndexUse(s);
	}
	return;
}
 /**
   * 改变支付类别时，自动修改现金或公务卡金额。
   * @param obj  选择表单对象
   * @return  pubAmtId
   */
function flyEditPageChangePayWay(obj){	
	
	 	//取得金额
	  var trObj = obj.parentNode.parentNode;
	  var n = obj.parentNode.cellIndex;
	  
	  //删除行对象，无法获得下拉列表选择值，只能取到默认值。将select选择值，放置到合计值flyvalue。
	  //当删除行时，取得现金或公务卡值，减去相应值。
	  var amtInput = trObj.cells[n-2].getElementsByTagName("input")[0];
	  amtInput.setAttribute("flyvalue",obj.value);//在删除时，取得标识，删除相应金额。
	  
	  var amt = amtInput.value;
	  
	  if(amt.trim().length<1)
	     return;
	     
	  var a = parseFloat(amt);
	  var l = obj.getAttribute("flylast");//选择类别的上一个类别。
	  
	  var cashAmt = document.getElementById("cashAmtId");
	  var pubAmt = document.getElementById("pubAmtId");
	  var thirdAmt = document.getElementById("thirdAmtId");
	  
	  var c = (cashAmt.value.trim().length<1) ? 0 : parseFloat(cashAmt.value);
	  var p = (pubAmt.value.trim().length<1) ? 0 : parseFloat(pubAmt.value);
	  var t = (thirdAmt.value.trim().length<1) ? 0 : parseFloat(thirdAmt.value);

	  
	  if(obj.value=="C"){
	  	
	  	 cashAmt.value = c+a;
	  	
	  	 if(l=="P"){   	 
	  	 	
	  	 	 pubAmt.value = p-a;
	  	    
	  	 }else if(l=="T")	{  		
	  	 	
	  	 	 thirdAmt.value = t-a;	  	 	
	  		  
	  	 }	
	  	
	  }else if(obj.value=="P"){
	  	
	  	 pubAmt.value = p+a;
	  	
	  	 if(l=="C"){   	 
	  	 	
	  	 	 cashAmt.value = c-a;
	  	    
	  	 }else if(l=="T")	{  		
	  	 	
	  	 	 thirdAmt.value = t-a;	  	 	
	  		  
	  	 }		  	 	
	  }else if(obj.value=="T"){
	  	
	  	 thirdAmt.value = t+a;
	  	
	  	 if(l=="C"){   	 
	  	 	
	  	 	 cashAmt.value = c-a;
	  	    
	  	 }else if(l=="P")	{  		
	  	 	
	  	 	 pubAmt.value = p-a;	  	 	
	  		  
	  	 }		  	 	
	  }
	     
	  return;	
}
 /**
   * 改变支付类别时，自动修改现金或公务卡金额。主要针对五个报销
   * @param obj  选择表单对象
   * @return  pubAmtId
   */
function flyEditPageChangePayWay1(obj){	
	
	 	//取得金额
	  var trObj = obj.parentNode.parentNode;
	  var n = obj.parentNode.cellIndex;
	  
	  //删除行对象，无法获得下拉列表选择值，只能取到默认值。将select选择值，放置到合计值flyvalue。
	  //当删除行时，取得现金或公务卡值，减去相应值。
	  var amtInput = trObj.cells[n-2].getElementsByTagName("input")[0];
	  amtInput.setAttribute("flyvalue",obj.value);//在删除时，取得标识，删除相应金额。
	  
	  var amt = amtInput.value;
	  
	  if(amt.trim().length<1)
	     return;
	     
	  var a = parseFloat(amt);
	  var l = obj.getAttribute("flylast");//选择类别的上一个类别。
	  
	  var cashAmt = document.getElementById("cashAmtId");
	  var pubAmt = document.getElementById("pubAmtId");
	  var thirdAmt = document.getElementById("thirdAmtId");
	  
	  var c = (cashAmt.value.trim().length<1) ? 0 : parseFloat(cashAmt.value);
	  var p = (pubAmt.value.trim().length<1) ? 0 : parseFloat(pubAmt.value);
	  var t = (thirdAmt.value.trim().length<1) ? 0 : parseFloat(thirdAmt.value);
	  
	  
  
    //1)找到人员  
    var payId = ""; 
    var payThirdId = ""; 
    var payTrObj = "";
    
    var tCashAmt = "";
    var tPubAmt = "";
    var tc = 0;
    var tp = 0;
    
    var payTableObj = document.getElementById("payTableId");
    
    var thirdIns = trObj.cells[n+1].getElementsByTagName("span")[0].getElementsByTagName("label");
   
    if(thirdIns.length==1)//多个第三方单位，无法确定给哪个支付  	      
  	    payId = thirdIns[0].getAttribute("flyvalue").split("⌒")[0];   	 
    else  //人员
  	    payId = document.getElementById('personSelId').value;
  	    
  	
    for (var i=1;i<payTableObj.rows.length-1;i++ ){ //减去总计行
  	 	
  	 	  //支付列表人员（公司）flyvalue：typeId~perId
  	 	  per = payTableObj.rows[i].cells[0].getElementsByTagName("input")[0].getAttribute("flyvalue"); 
  	 	  
  	 	  if(!per || per.trim().length<2)//没有人员的空行
  	 	     continue;
  	 	     
  	 	  tem = per.split("~");
  	 	
  	 	  //alert(sPer+" ; "+per+" ; "+arr[2]+" ; "+tem[1]);
  	 	
  	 	  //找到对应人员。
  	 	  if(payId.trim()==tem[1].trim()) 	 
  	 	      payTrObj = payTableObj.rows[i];   	 	  
    }  
    
    if(payTrObj != ""){  	
     	
     	  tCashAmt = payTrObj.cells[3].getElementsByTagName("input")[0];
     	  tPubAmt = payTrObj.cells[6].getElementsByTagName("input")[0];
        
        tc = (tCashAmt.value.trim().length<1) ? 0 : parseFloat(tCashAmt.value);
	      tp = (tPubAmt.value.trim().length<1) ? 0 : parseFloat(tPubAmt.value);
    }
  
	  if(obj.value=="C"){
	  	
	  	 cashAmt.value = c+a;
	  	 if(payTrObj != "")
	  	   tCashAmt.value = tc+a;
	  	 
	  	 if(l=="P"){  	    
	  	    pubAmt.value = p-a;	 
	  	    if(payTrObj != "")
	  	      tPubAmt.value = tp-a;	
	  	    
	  	 }else if(l=="T")	{  			  	 	
	  		  thirdAmt.value = t-a;	  
	  		  if(payTrObj != "")
	  	      tCashAmt.value = tc-a;	
	  	 }		 
	  	 
	  }else if(obj.value=="P"){
	  	
	  	 pubAmt.value = p+a;	 
	  	 
	  	 if(l=="C"){  	    
	  	    cashAmt.value = p-a;	 
	  	   
	  	    
	  	 }else if(l=="T")	{  			  	 	
	  		  thirdAmt.value = t-a;	  
	  		  if(payTrObj != "")
	  	      tCashAmt.value = tc-a;	
	  	 }		 
	  	
	  	document.getElementById("cashAmtId").value = c-a;
	  	document.getElementById("pubAmtId").value = p+a;	  
	  		
	  }else if(obj.value=="T"){
	  	
	  	document.getElementById("cashAmtId").value = c-a;
	  	document.getElementById("pubAmtId").value = p+a;	  	
	  }
	     
	  return;	
}
 /**
   * 设置金额。每行只有一个输入金额，用户输入时，计算总计和指标金额，不校验。
   * 总计有的是1个，有的是2个。（申请1个，报销含现金金额、公务卡金额）     
   * @param obj       选择表单对象  
   * @param typeOrder 支付类别的位置序号，以0开始。如果没有，则为0，总计为一个；如果大于0，则总计2个   
   * @return  
   */
function flyEditPageOneAmtCount(obj,typeOrder){	
		
	if(obj.value == obj.defaultValue)		
		return;
	
	//输入数据，和原来数据
	var c = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);
	var d = (obj.defaultValue.trim().length<1) ? 0 : parseFloat(obj.defaultValue);
		
	var tagId = "";//总计表单id	
	
	var t = parseInt(typeOrder);	
		
	//取得总计金额
	if(t>0){//2个总计，转账、公务卡
		
		   //行对象
	    var trObj = obj.parentNode.parentNode;
		
	    var sel = trObj.cells[t].getElementsByTagName("select");
	
	    if(sel.length<1 || sel[0].value=="C")
	       tagId = "cashAmtId";
	    else if(sel[0].value=="P")
		     tagId = "pubAmtId";
	}else {
		
		  tagId = "planAmt";		
	}
	
	//总计金额	
  var amt = document.getElementById(tagId).value;  
	var total = (amt.trim().length<1) ? 0 : parseFloat(amt);
	
	
	//2、如果清空了输入数据。原来有数，则总计要减去原来的数。
	if(c<0.01 && d>0.01){
		
		 document.getElementById(tagId).value = total - d;	//总计金额
		 
		 return;
	}
	
	//3、赋值金额   Math.round((original-original2+original3)*100)/100
	document.getElementById(tagId).value = Math.round((total - d + c)*100)/100;	//总计金额
	
  //4、赋值指标使用金额  
  flyEditPageSetIndexUse(c-d);
 
	return;
}
/**  
   * 计算多个table里的费用合计，并设置在主信息总计中。
   * @param tableIdArr     表id数组  
   * @param amtRowNoArr    表中，金额的列序号数组，以0开始计算。
   * @param totalNum       总计数量，0，总计为一个；如果大于0，则总计2个   
   * @return  
   */
function flyEditPageTotalAmtSet(tableIdArr,amtRowNoArr,totalNum){	
	 
	  var sum = 0;
	  var a = "";
	  var rowsObj = "";
	  
	  for (var i=0;i<tableIdArr.length;i++ ){ 	
	  	
		    rowsObj = document.getElementById(tableIdArr[i]).rows;
		    
		    for (var j=1;j<rowsObj.length;j++ ){ 	
		
		        a = rowsObj[j].cells[amtRowNoArr[i]].getElementsByTagName("input")[0].value;
		       
		        if(a.trim().length<1 || a=="0")
		          continue;
		      
		        sum+=  parseFloat(a);
        }	   
    }
	  
	  document.getElementById("planAmt").value = sum;
	  
    return;
}
/**
   * 自动计算支付信息表合计金额。用户输入时，计算该列合计。
    
   * @param obj       选择表单对象
   * @return     
 
   */
function flyEditPagePayAmtCount(obj){	
	
	   //总计行对应列值    
	  var tableObj = obj.parentNode.parentNode.parentNode;
	  
	  if(tableObj.tagName == "TBODY")
	     tableObj = tableObj.parentNode;
	     
	  flyFormDataPageTableSum(tableObj,[3]); //将各行改变，合计到总计行
	
	  return;
	  
	  /*
		if(obj.value == obj.defaultValue)		
		   return;
	
	  //输入数据，和原来数据
	  var c = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);
	  var d = (obj.defaultValue.trim().length<1) ? 0 : parseFloat(obj.defaultValue);
		
    var n = obj.parentNode.cellIndex;//当前输入表单所在td序号
    
   
	     
	  var inputObj = tableObj.rows[tableObj.rows.length-1].cells[n].getElementsByTagName("input")[0];

    inputObj.value = parseFloat(inputObj.value)+c-d;

    return;	

   */
}
/**
   * 取得指标设置标识，确定是否填表人选择指标。  
   
   * @return 
   */
function flyEditPageIsPostSetPayIndex(){
	
	var flag = getGloblePayIndexSetFlag();
	
	if(flag && flag == "N")//设置为录入人不选择指标，则不校验。	    
	   return true;
	   
	return false;	   
}
/**
   * 动态赋值指标使用金额，当输入或修改金额时，自动设置指标当前使用金额。  
   * 当多个指标时，第一个指标可用金额低于使用金额，则，第一个指标使用金额为可用金额，依次此到第二个、第三个。。。都不够提示。
   * @param changeAmt 本次变化金额
  
   * @return 
   */
function flyEditPageSetIndexUse(changeAmt){	
	
	var flyshowObj = "";
	var flyvalueObj = "";
	var inputObj = "";
	var inputObj1 = "";
	var i = 0;
	var i1 = 0;
	
	var arr = new Array();
	
	var b = 0;
	var m = changeAmt;//本次变化金额
	
	var indexTable = document.getElementById("indexTable");
	if(!indexTable)
	   indexTable = document.getElementById("indexArea");
	
	var indexTableObj = indexTable.querySelectorAll(".container");
	
	//指标为负值，从列表最后开始减指标
	var x = 0;
	var y = 1;
	if(changeAmt<0){
		x = indexTableObj.length - 1;
		y = -1;
	}		
	
	for (var j=x;j<indexTableObj.length && j>=0;j=j+y ){
		
		 //展示金额对象
		 flyshowObj = indexTableObj[j].querySelectorAll("span[flyshow='0']");
		 //flyvalue值对象
		 flyvalueObj = indexTableObj[j].querySelectorAll(".content")[0];
		 arr = flyvalueObj.getAttribute("flyvalue").split("^");
		 alert(arr);
		 
		//余额（可用金额）
		 i = (flyshowObj[4].innerHTML.trim().length<1) ? 0 : parseFloat(flyshowObj[4].innerHTML);
		 //本次使用金额
		 i1 = (flyshowObj[1].innerHTML.trim().length<1) ? 0 : parseFloat(flyshowObj[1].innerHTML);
		 
		 if(changeAmt>=0){//指标金额为正
		 	
		    b = i - i1 - m;//可用金额 - 已使用金额 - 待用金额。
		    
		    if(b>=0){
		    	
		       flyshowObj[1].innerHTML = Math.round((i1 + m)*100)/100;//设置显示金额
		       
		       //设置flyvalue
		       arr[3] = Math.round((i1 + m)*100)/100;
		       flyvalueObj.setAttribute("flyvalue",arr.join("^"))
		       
		       return;
		       
		    } else {
		    	
		    	 flyshowObj[1].innerHTML = Math.round((i)*100)/100;
		    	 
		    	 //设置flyvalue
		       arr[3] = Math.round((i)*100)/100;
		       flyvalueObj.setAttribute("flyvalue",arr.join("^"))
		       
		    	 m = Math.abs(b);
		    	 
		    	 continue;
		    }
		    
		 } else {//指标金额为负
		 	
		 	  b = i1 + m;//已使用金额 + 负待用金额。
		 	  
		 	  if(b>=0){
		    	
		       flyshowObj[1].innerHTML = Math.round(b*100)/100;
		       
		       //设置flyvalue
		       arr[3] =  Math.round(b*100)/100;
		       flyvalueObj.setAttribute("flyvalue",arr.join("^"))
		       
		       return;
		       
		    } else {
		    	
		    	 flyshowObj[1].innerHTML = 0;
		    	 
		    	 //设置flyvalue
		       arr[3] =  0;
		       flyvalueObj.setAttribute("flyvalue",arr.join("^"))		       
		       
		    	 m = b;
		    	 
		    	 continue;
		    }		 	
		 } 
  }
  
   //提示，并且将指标使用大于或小于的金额，显示到第一个
  if(!flyEditPageIsPostSetPayIndex() && (m>0 || m<0)){  	
  	
  	 alert("抱歉，未选择指标或使用金额大于指标金额，请重新设置指标。");  	 
  	 	
		 //flyvalue值对象
		 flyvalueObj = indexTableObj[0].querySelectorAll(".content")[0];
		 
		 var flyvalue = flyvalueObj.getAttribute("flyvalue");
		 if(flyvalue && flyvalue.indexOf("^")>0){
		 	
		 	   //展示金额对象
		    flyshowObj = indexTableObj[0].querySelectorAll("span[flyshow='0']");
		 	 	
		    arr = flyvalueObj.getAttribute("flyvalue").split("^");
		    //设置flyvalue
		    arr[2] =  Math.round((i1+m)*100)/100;
		    flyvalueObj.setAttribute("flyvalue",arr.join("^"))
		     
		      //本次使用金额
		    i1 = (flyshowObj[1].innerHTML.trim().length<1) ? 0 : parseFloat(flyshowObj[1].innerHTML);
		    flyshowObj[1].innerHTML = Math.round((i1+m)*100)/100;
		 }
  } 
  
  /*
  var inputObj = indexTableObj.rows[1].cells[4].getElementsByTagName("input")[0];
  
  var i = (inputObj.value.trim().length<1) ? 0 : parseFloat(inputObj.value);
  inputObj.value = Math.round((i + changeAmt)*100)/100;
  */
  return;	
}
/**
   * 指标清零。将指标列表中，指标金额设置为零。 
   * @param changeAmt 变化金额
  
   * @return 
   */
function flyEditPageSetIndexZero(){		
	
	var indexTableObj = document.getElementById("indexTable");
	
	for (var j=1;j<indexTableObj.rows.length;j++){ 	
		 indexTableObj.rows[j].cells[4].getElementsByTagName("input")[0].value = "";
	}  
   
  return;	
}
/**
   * 指标列表标题显示。收入中，与合同中使用。根据合同性质为收入时，显示收入标题，其他显示支出标题。
   * @param obj          label   
   * @return 有修改返回true；没有修改返回false   
   */
function flyEditPageShowIndexTitle(indexTableObj,flag){	
	
	
	if(typeof(indexTableObj) == "string")
	   indexTableObj = document.getElementById(indexTableObj);
	
	if(flag=="R")
	   indexTableObj.rows[0].innerHTML = "<td width='5%' align='center'>序号</td>" 
       +"<td width='19%' align='center'>指标</td>"                                          
       +"<td width='12%' align='center'>应收金额</td>"  
       +"<td width='12%' align='center'>已收入金额</td>" 
       +"<td width='14%' align='center'>本次收入金额 </td>" 
       +"<td width='20%' align='center'>对应收入项</td>"                           
       +"<td width='18%' align='center'>备注 </td>";	   
  else
  	indexTableObj.rows[0].innerHTML = "<td width='5%' align='center'>序号</td>" 
       +" <td width='19%' align='center'><label flyflag='3' class='flyListPageStarLabel'>*</label>指标</td>"                                          
       +"<td width='10%' align='center'>总金额</td>" 
       +"<td width='10%' align='center'>可用额度</td>"
       +"<td width='10%' align='center'>本次使用金额 </td>"
       +"<td width='20%' align='center'>对应支出项</td>"                          
       +"<td width='20%' align='center'>备注</td>"
       +"<td width='6%' align='center'>操作</td>";
	
	return;
}
/**
   * 动态附件服务器操作接口。
   * 1、确定servlet地址即可   
   * 2、后台取值两个，flag、opValue。
   * 3、根据flag判断，拆串opValue，进行处理
   * @param flag     操作标识
   * @param opValue  处理的值，一般为拼串。到后台要拆串
   * @return 处理结果值。正确返回相应值或标识，错误返回错误标识，由前台提示   
   */
function flyEditPageAttchServerOp(flag,opValue){		
	
	 var info = "opValue="+opValue;
	 var result = getHttpResponse("/fwis/mssl/attchDefSrv",flag,info);	
	       
   return result;
}
/**
   * 新增、修改时，显示上传附件表单。取得当前progId，取得定义附件，显示到主信息最下发、老附件上方。
   * 如果传递defType，则为选择不同类别，动态显示相应类别附件。
   * 在span里，不加flyflag=4，以免得修改原来程序。  
   
   * @param selDefTypeObj    业务类别对象，选择业务类别
   * @return 
   */
function flyEditPageSetAttch(selDefTypeObj){	
	
	
	
	var defTypeObj = "";	
	var typevalue = "";	
	var info = "";
	var billId = "";
	var aFlag = "";
	var n = 0;	
	
	var progId = flyEditPageGetProgId();
	if(!progId)
	   return;
	
	if(!selDefTypeObj)
	     defTypeObj = document.getElementById("defType");	   
	else
		   defTypeObj = selDefTypeObj;
	 
	if(defTypeObj)
	     typevalue = defTypeObj.value;	
	   
	if(typevalue.trim().length<1)
		   typevalue = "a01";//明细类，没有传值，默认为基本附件明细类
	
	
	if(flyEditPageGetFlag()=="Add" || typeof(selDefTypeObj) == "object"){
		
		  aFlag = "AddAttch";
		  n = 6;
		  
	}else if(flyEditPageGetFlag()=="Upd"){
		
		aFlag = "UpdAttch";
		billId= document.getElementById("billId").value;
		n = 7;
		
	}else
		return;
	
	info = progId+"^"+typevalue+"^"+billId;
	
	var result = flyEditPageAttchServerOp(aFlag,info);
	
	//新增：序号(a_order一个功能的所有附件的唯一序号)|名称|是否必输|数量|说明|大类代码,6个
	//修改：序号(a_order一个功能的所有附件的唯一序号)|名称|是否必输|数量|说明|大类代码|附件,7个
	var arr = result.split("|");
	
	if(arr.length<n)
	   return;
	   
	var trObj = "";
	var flytype = "";
	var str = "";
	var str1 = "";//附件拼串
	var isMustStar = "";
	var isMustTip = "";
	var flyvalue = "";//上传附件时，同时提交到后台进行存储的信息
	
	
	var tableObj = document.getElementsByClassName("list_box_con_t")[0].getElementsByTagName("table")[0];
	 
	//如果重新选择类别，则将原来类别附件删除
	if (selDefTypeObj && typeof(selDefTypeObj) == "object") {
	
		   var m = tableObj.rows.length; 
	     for (var i=0;i<m;i++ ){ 	
	     	
	     	   flytype = tableObj.rows[m-i-1].getAttribute("flytype");
	     	   if(flytype && flytype=="attch")
	     	       tableObj.deleteRow(m-i-1); 
       }
  }
	 
	for (var i=0;i<arr.length;i=i+n ){ 	
		
		 str1 = "";
		
		 if(arr[i+2]=="Y"){
		 	  isMustTip = " necessary='2'  onblur='neceCheck(this)' ";
		    isMustStar = "<label flyflag='3' class='flyListPageStarLabel'>*</label>";
		 }else{
		 	  isMustStar = "";
		 	  isMustTip = "";
		 }
		 	  
		 //序号|名称|是否必输|数量|说明|大类代码|明细类代码|程序代码，8个
		 flyvalue = arr[i]+"^"+arr[i+1]+"^"+arr[i+2]+"^"+arr[i+3]+"^"+arr[i+4]+"^"+arr[i+5]+"^"+typevalue+"^"+progId;
		 	  
		 //添加附件内容
		 if(aFlag=="UpdAttch" && arr[i+6] && arr[i+6].indexOf("⌒")>0){
		 	
		 	   var aArr = arr[i+6].split("~");	
		 	   var m =  0;		 	   
		 	   
         for(var j=0;j<aArr.length;j++){  
         	
         	  m = aArr[j].lastIndexOf("⌒");
         	           	   
         	  str1+= "<label flyvalue='"+aArr[j]+"'>"+aArr[j].substring(m+1)+"<a href='#' onClick='flyEditPageDelAttch(this,event);'>╳</a></label>";           	         	
         }		 	
		 }
		
		 str = "<td align='right' title="+arr[i+4]+">"+isMustStar+arr[i+1]+"：</td>"
            +"<td  colspan='3'>"
            
            +"<span "+isMustTip+" flytype='attch' flynum='"+arr[i+3]+"' flyorder='"+arr[i]+"' class='attch_files_span' style='width:84%;margin-right:15px;overflow:hidden;'>"
            + str1    
            +"</span>"
            
            +"<a href='#' style='width:90px;white-space:nowrap;cursor:hand;display:inline-block;color:#003C9D;margin-bottom:3px !important;overflow:hidden;'>添加附件<input type='file' class='fileAttchBut' flyvalue='"+flyvalue+"' onchange = \"flyEditPageUploadAttch(this)\"></a>"
            
            +"</td>";
            
     trObj = document.createElement("tr"); 
     trObj.innerHTML = str; 
     trObj.setAttribute("flytype","attch");   
     
     tableObj.appendChild(trObj);  
  }
 
  return;	
}
/**
   * 上传附件，调用pubToolsUploadFile(obj,fileKey,showObj,uploadServer,delFun)方法
                     
   * @ return 
   */	
function flyEditPageUploadAttch(obj){		

	var fileKey = document.getElementById('billId').value;
	fileKey = fileKey+"^"+obj.getAttribute("flyvalue"); 
	
	var showObj = obj.parentNode.previousElementSibling; 
	
	pubToolsUploadFileAsyn(obj,fileKey,showObj,"/fwis/mssl/attchDefSrv","flyEditPageDelAttch");	
	
	return;
}
/**
   * 删除一个附件
                     
   * @ return 
   */	
function flyEditPageDelAttch(obj,e){		

  var spanObj = obj.parentNode.parentNode;//span对象。
  var aOrder = spanObj.getAttribute("flyorder");
  var arr = obj.parentNode.getAttribute("flyvalue").split("⌒");
	
	opValue = document.getElementById("billId").value+"^"+aOrder+"|"+arr[1];
	
	var result = flyEditPageAttchServerOp("DelAFile",opValue)	
	
	if(result!="Y"){
		alert("抱歉，删除失败，请重试。");	
	}else{
		spanObj.removeChild(obj.parentNode);	
	}
	
	return;
}
/**
   * 删除一个单据全部附件，一般是在编辑状态退出页面。
                     
   * @ return 
   */	
function flyEditPageDelAllAttch(){	
  
	var opValue = document.getElementById("billId").value+"|"+arr[1];
	
	var result = flyEditPageAttchServerOp("DelAllFile",opValue)	
	
	if(result!="Y"){
		alert("抱歉，删除失败，请重试。");	
	}
	return;
}

/**
   * 获得一个对象包含的数据。一般用作 var flyflag = "5"时的取数。  
   * @param formObj   对象
   * @param mark      间隔符。拼串的间隔符
   * @return 返回以|拼串的字符串
   */
function flyEditPageGetObjData(formObj,mark){			

  var str = "";
  var str1 = "";
  var tem = "";
  var flyflag = "";
  var flytype = "";
  var labelObj = "";//flyflag = "4" 
  var i = 0;
 	
 	var obj = formObj.getElementsByTagName("*");//取得所有标签
 
 	for (i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   if(flyflag=="0") {
 	   	
 	   	  if(obj[i].tagName=="SELECT"){ //select保存和修改时，取值value和name,传递到后台
 	   	      	   	  	
 	   	  	if(!obj[i].options[obj[i].selectedIndex] || obj[i].options[obj[i].selectedIndex].value.trim().length<1)
 	   	  	  str+= mark+" ~ "
 	   	  	else
 	   	      str+= mark+obj[i].options[obj[i].selectedIndex].value+"~"+obj[i].options[obj[i].selectedIndex].text;

 	      }else {
 	      	 
 	      	 flytype = obj[i].getAttributeNode("onkeyup");//解决数字数据库插入时不能为空，置为0
 	      	 
 	      	 if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1 && obj[i].value.trim().length<1)
 	      	    str+= mark+"0";
 	      	 else
 	      	    str+= mark+obj[i].value;
 	      }
 	   }else if(flyflag=="1")
 	      str+= mark+obj[i].getAttribute("flyvalue"); 
 	   else if(flyflag=="2"){
 	      str+= mark+obj[i].getAttribute("flyvalue")+"~"+obj[i].value; 
 	   }else if(flyflag=="4"){
 	   	
 	   	  str1 = "";
 	   	  labelObj = obj[i].getElementsByTagName("label");
 	   	  
 	   	  for (var j=0;j<labelObj.length;j++) {
 	   	  	
 	   	  	tem = labelObj[j].getAttribute("flyvalue");
 	   	  	if(tem)
 	   	       str1+= "~"+labelObj[j].getAttribute("flyvalue");
 	   	    else
 	   	    	 str1+= "~ ";
 	   	    	 
 	   	    //str1+= "~"+labelObj[j].getAttribute("flyvalue");
 	   	  }  
 	   	  str1 = (str1.length>0) ? str1.substring(1) : str1;
 	   	  
 	      str+= mark+str1;
 	   } 
 	}
	
	//return str.substring(1); 
	return i+str; 
}
/**
   * 判断内容是否已修改。   
   * @param 
   * @return 有修改返回true；没有修改返回false   
   */
function flyEditPageIsUpd(){		
	
	//alert(flyEditPageParams_a.updData);
	if(!flyEditPageParams_a.updData || flyEditPageParams_a.updData.indexOf("|")<1)
	   return; 
	   
	var arr = flyEditPageParams_a.updData.split("|");		
 
  var str1 = "";
  var tem = "";
  var flyflag = "";
  var flytype = "";
  var labelObj = "";//flyflag = "4" 
  
  var m = 0;  
  var n = 0; 	
 	
 	var obj = document.getElementById("editForm").getElementsByTagName("*");
 
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   if(flyflag=="0") {
 	   	
 	   	  if(obj[i].value!=arr[n])
 	   	     return true;
 	   	
 	   	  n++;
 	   }else if(flyflag=="1") {
 	   	
 	   	  if(obj[i].getAttribute("flyvalue")!=arr[n])
 	   	     return true;
 	   	
 	   	  n++;
 	      
 	   }else if(flyflag=="2"){
 	   	
 	   	     m = arr[n].lastIndexOf("^");
           
           if(obj[i].value !=  arr[n].substring(m+1))
             return true;
 	   	
 	   	      n++; 	   	      
           
 	   }else if(flyflag=="4"){
 	   	
 	   	  str1 = "";
 	   	  labelObj = obj[i].getElementsByTagName("label");
 	   	  
 	   	  for (var j=0;j<labelObj.length;j++) {
 	   	  	
 	   	  	tem = labelObj[j].getAttribute("flyvalue");
 	   	  	if(tem)
 	   	       str1+= "^"+labelObj[j].getAttribute("flyvalue");
 	   	    else
 	   	    	 str1+= "^ "; 	    	 
 	   	  }  
 	   	  str1 = (str1.length>0) ? str1.substring(1) : str1;
 	   	  
 	   	  if(str1 !=  arr[n])
             return true;
         
        n++; 	   	 
 	   } else if(flyflag=="5"){
 	   	
 	   	  var b = flyEditPageObjIsUpd(obj[i],arr[n]);
 	   	 
 	   	  if(b==0)
          return true;
          
        i = i+b+1;
         
        n++; 
 	   }
 	}	
}
/**
   * 获得一个对象包含的数据是否修改。一般用作 var flyflag = "5"时的取数。  
   * @param formObj    对象
   * @param formData   对象内数据拼串，以^拼串
   * @return true or false
   */
function flyEditPageObjIsUpd(formObj,formData){	
 
  var str1 = "";
  var tem = "";
  var flyflag = "";
  var flytype = "";
  var labelObj = "";//flyflag = "4" 
 
  var i=0;
  var n = 0;
 	
 	var arr = formData.split("^");
 	var obj = formObj.getElementsByTagName("*");//取得所有标签
 
 	for (i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   if(flyflag=="0") {
 	   	
 	   	  if(obj[i].value!=arr[n])
 	   	     return 0;
 	   	
 	   	  n++;
 	   	  
 	   }else if(flyflag=="1"){
 	      if(obj[i].getAttribute("flyvalue")!=arr[n])
 	   	     return 0;
 	   	
 	   	  n++;
 	   }else if(flyflag=="2"){
 	         m = arr[n].lastIndexOf("~");
           
           if(obj[i].value !=  arr[n].substring(m+1))
             return 0;
 	   	
 	   	      n++; 	   	
 	   }else if(flyflag=="4"){
 	   	
 	   	  str1 = "";
 	   	  labelObj = obj[i].getElementsByTagName("label");
 	   	  
 	   	  for (var j=0;j<labelObj.length;j++) {
 	   	  	
 	   	  	tem = labelObj[j].getAttribute("flyvalue");
 	   	  	if(tem)
 	   	       str1+= "~"+labelObj[j].getAttribute("flyvalue");
 	   	    else
 	   	    	 str1+= "~ "; 	    	 
 	   	  }  
 	   	  str1 = (str1.length>0) ? str1.substring(1) : str1;
 	   	  
 	   	  if(str1 !=  arr[n])
             return 0;
         
        n++; 	   	 
 	   } 
 	}

	return i; 
}
/**
   * 新增时，判断内容是否已有填写。   
   * @param 
   * @return 有修改返回true；没有修改返回false   
   */
function flyEditPageIsAdd(){		
	
	return true;
	
  var flyflag = "";
  var flytype = "";
  var labelObj = "";//flyflag = "4"   
 
 	var obj = document.getElementById("editForm").getElementsByTagName("*");
 
 	for (var i=0;i<obj.length;i++ ){ 	   	
 	  
 	   flyflag = obj[i].getAttribute("flyflag"); 
 	   	   
 	   if(!flyflag || flyflag.trim().length<1)
 	      continue;
 	      
 	   if(flyflag=="0") { 	   	
 	   	
 	   	 if(obj[i].tagName=="SELECT"){ 
 	   	 	  //alert(obj[i].options[obj[i].selectedIndex].defaultSelected);
 	   	 	  
 	   	 	  if(!obj[i].options[obj[i].selectedIndex].defaultSelected)
 	   	 	     return true; 	 
 	   	 }else {
 	   	
 	   	  //alert(obj[i].value+"="+ obj[i].defaultValue);
 	   	
 	   	  if(obj[i].value != obj[i].defaultValue)
 	   	     return true; 
 	   	 }	   	
 	   	 
 	   }else if(flyflag=="1") {
 	   	
 	   	  if(obj[i].getAttribute("flyvalue")!="")
 	   	     return true;
 	   	
 	   }else if(flyflag=="2"){ 	   	
 	   	    
           if(obj[i].value != obj[i].defaultValue)
             return true; 	   	   	      
           
 	   }else if(flyflag=="4"){ 	   	
 	   	 
 	   	  labelObj = obj[i].getElementsByTagName("label");
 	   	  
 	   	  if(labelObj.length>0)
 	   	    return true; 	   	  
 	   	     	 
 	   } 
 	}	
	return false; 	
}
/**
   * 多选时，将选择内容，生成label设置为span内容。    
   * @param obj          span对象
   * @param labelValue   flyvalue值
   * @param labelName    显示名称
   * @return 有修改返回true；没有修改返回false   
   */
function flyEditPageSetSelLabel(obj,labelValue,labelName){	
	
	labelObj =  document.createElement("label"); 
 
  labelObj.setAttribute("flyvalue",labelValue);//"+JSON.stringify(labelObj)+",'"+labelValue+"'
  //labelObj.innerHTML =  labelName+"<a href='#' onClick=\"flyEditPageDelSelLabel("+JSON.stringify(labelObj)+",'"+labelValue+"');\">╳</a>";
  labelObj.innerHTML =  labelName+"<a href='#' onClick='flyEditPageDelSelLabel(this);'>╳</a>";
  
             
  obj.appendChild(labelObj); 
  
  return true;
}
/**
   * 取得已选择的多选label  
   * @param obj          span对象  
   * @return flyvalue以|拼串  
   */
function flyEditPageGetSelLabel(obj){	   
   	
  var labelObj = obj.getElementsByTagName("label");
  var tem = "";
 	   	  
 	for (var j=0;j<labelObj.length;j++) 
 	   tem+="|"+labelObj[j].getAttribute("flyvalue");
 	   	
 	tem = (tem.length>0) ? tem.substring(1) : tem;
	
  return tem;
}
/**
   * 删除多选的label对象  
   * @param obj          label   
   * @return 有修改返回true；没有修改返回false   
   */
function flyEditPageDelSelLabel(obj,labelValue){	
	
	if(flyEditPageDelAlabel(obj.parentNode,obj.parentNode.getAttribute("flyvalue")))
	   obj.parentNode.parentNode.removeChild(obj.parentNode);		
	   
	return;
}

/**
   * 删除报销明细时，修改主信息的4个金额：总金额、公务卡金额、个人金额、第三方金额。
   * @param obj 删除行对象           
   * @return 
   */
function flyEditPageDelDetailUpdAmt(obj){	
	
	/*
	//1、取得支付方式。删除行对象，无法获得下拉列表选择值，只能取到默认值。将select选择值，放置到合计值flyvalue 
	//当删除行时，取得现金或公务卡值，减去相应值。如果没有放置，则为默认值。
	var payWay = obj.getElementsByTagName("input")[6].getAttribute("flyvalue");	
	if(!payWay)
	   payWay = obj.getElementsByTagName("select")[0].value;
	*/  
	var payWay = obj.cells[8].getElementsByTagName("select")[0].value;
	//alert(payWay);
	
	var tagId = "";
	
	//2、计算主信息对应支付类别金额、总计金额。
	if(payWay=="C")
	    tagId = "cashAmtId";
	else if(payWay=="P")
		  tagId = "pubAmtId";	
  else if(payWay=="T")
		  tagId = "thirdAmtId";	
	   
	//对应支出类别当前金额
	var amt = document.getElementById(tagId).value;
	var a = (amt.trim().length<1) ? 0 : parseFloat(amt);	
	
  //当前总金额
	var totalAmt = document.getElementById("planAmt").value;
	var t = (totalAmt.trim().length<1) ? 0 : parseFloat(totalAmt);	
	
  //删除明细金额
	var delAmt = obj.getElementsByTagName("input")[6].value;	
	var b = (delAmt.trim().length<1) ? 0 : parseFloat(delAmt);	
	
	//设置对应支出类别当前金额  Math.round((a - b)*100)/100;
	document.getElementById(tagId).value = Math.round((a - b)*100)/100;
	
	//设置对应支出类别当前金额
	document.getElementById("planAmt").value = Math.round((t - b)*100)/100;
	
	return;
}
/**
   * 删除第三方支付单位列表中的一个单位、或个人.一般在报销中使用  
   * @param payInsId           
   * @return 
   */
function flyEditPageDelThirdPayIns(payInsId){		
	
	   //alert(payInsId);
	 
	   var per = "";
	   var arr = new Array();
	   
		 var tableObj = document.getElementById("payTableId");	
		 for (var i=1;i<tableObj.rows.length-1;i++ ){ 
  	 	
  	 	    //合计行人员(或第三方单位)代码
  	 	  	per = tableObj.rows[i].cells[0].getElementsByTagName("input")[0].getAttribute("flyvalue"); 
  	 	  	
  	 	  	
  	 	  	if(!per || per.indexOf("~")<0)
  	 	  	   continue;
  	 	  	
  	 	  	arr = per.split("~");
  	 	  	
  	 	  	//alert(payInsId+" ; "+arr);
  	 	  	
  	 	  	if(payInsId==arr[1]){
  	 	  		
             
  	 	  		 //删除行。
  	 	  		 if(i==1 && tableObj.rows.length==3)//只有一行，清空
  	 	  		    pubToolsClearTrData(tableObj.rows[i],"");
  	 	  		 else //多行删除
  	 	  	      tableObj.deleteRow(i);
  	 	  	      
  	 	  	   flyFormDataPageTableSum(tableObj,[3]); //将各行改变，合计到总计行
  	 	  	      
  	 	  	   break;
  	 	  	}
     }  
  	
     return true;
}
/**
   * 处理支付信息最后一行总计字段显示 
   * @return 
   */
function flyEditPageSetPayTitle(){
	
	var tableObj = document.getElementById("payTableId");	
	
	var sumTr = tableObj.rows[tableObj.rows.length-1];
	
	var inputObj = sumTr.getElementsByTagName("input");   
	
	sumTr.setAttribute("flytype","sum"); //设置行属性为合计，删除时，不删除合计
	inputObj[0].value = "总计";
	inputObj[0].style.cssText = "text-align:center;color:red;";
	
	inputObj[1].readOnly = true;//只读。
	inputObj[2].readOnly = true;//只读。
	inputObj[3].readOnly = true;//只读。
	sumTr.cells[4].innerHTML = "<input type='text'  flyvalue='' flyflag='2' readonly>";	
	sumTr.cells[5].innerHTML = "";	
	
	
	/*
	inputObj[4].readOnly = true;//只读。
	inputObj[5].readOnly = true;//只读。
	inputObj[6].readOnly = true;//只读。
	
	inputObj[3].removeAttribute("onclick");//删除可修改属性，总计不可修改。
	inputObj[6].removeAttribute("onclick");//删除可修改属性，总计不可修改。
	*/
	return;
}


/**
 * 设置人员支付银行账户信息,申请单带入时，设置会议、培训、接待、事项报销.
 * @return
 */
function flyEditPageSetPayInfo(){

	//报销人一维数组  报销人id
	var tem = [document.getElementById('personSelIdName').getAttribute("flyvalue")];

	//清空支付表格，以免修改申请单，累加支付信息
	var payTable = document.getElementById("payTableId");

	var payContainer = payTable.querySelectorAll(".container");

	for(var i = payContainer.length-1; i > 0 ; i--){
		payContainer[i].remove();
	}
	payContainer[0].style.display = "none";

	var flyvalues = getPersonPayBankInfo(tem,loginInsId_a,-2);

	if(document.getElementById('appBillAmtId')){
		var appBillName =  document.getElementById('appBillAmtId');
		var arr = flyvalues.split("^");
		if(appBillName.tagName.toLowerCase() == "input"){
			flyvalues = arr[0]+"^"+arr[1]+"^"+arr[2]+"^"+appBillName.value+"^"+arr[4]+"~^~~总计^~^^"+appBillName.value+"^~";;
			document.getElementById("finalMoneyData").textContent = appBillName.value;

		}else{
			flyvalues = arr[0]+"^"+arr[1]+"^"+arr[2]+"^"+appBillName.textContent+"^"+arr[4]+"~^~~总计^~^^"+appBillName.textContent+"^~";;
			document.getElementById("finalMoneyData").textContent = appBillName.textContent;

		}
	}



	flyFormDataPageShowAppData(payTable,flyvalues,"S","^","~") //方法显示

	var containerEle = payTable.querySelectorAll(".container");
	containerEle[containerEle.length-1].style.display = "none";


	// //报销人一维数组
	// var tem = [document.getElementById('personSelId').value];
	//
	// //清空支付表格，以免修改申请单，累加支付信息
	// var payTable = document.getElementById("payTableId");
	//
	// //保留合计行和除标题外的第一行，其他的全部删除
	// var newTr = payTable.rows[payTable.rows.length-1].cloneNode(true);
	//
	// flyFormDataPageClearTrData(payTable.rows[1],"");//清空第二行数据
	//
	// var n = payTable.rows.length - 2;
	// flyFormDataPageDelList(payTable,2,n);//保留1、2行，和最后一行。
	//
	// //flyFormDataPageDelList(payTable,1);//删除第二行以后的行
	//
	// //payTable.appendChild(newTr); //添加合计行
	//
	// setPersonBankInfo(tem,loginInsId_a,-2);
	//
	// //置报销人金额与合计金额
	// if(document.getElementById('appBillAmtId')){
	//
	//    payTable.rows[1].cells[3].getElementsByTagName("input")[0].value = document.getElementById('appBillAmtId').value;
	//    payTable.rows[2].cells[3].getElementsByTagName("input")[0].value = document.getElementById('appBillAmtId').value;
	// }
	return;
}

 /**
   * 改变报销人时，重设置支付人。删除原支付人，设置现在支付人。
   * @return 
   */
function flyEditPageResetPerPayInfo(obj){	
	
	   var l = obj.getAttribute("flylast");//选择人员的上一个人员。
	   
	   flyEditPageDelThirdPayIns(l);
	   flyEditPageDelThirdPayIns(l);//可能为同一个人公务卡或储蓄卡
	   
	   setPersonBankInfo([obj.value],loginInsId_a,-2,"P");	
	  
	   return;
}
/**
   * 校验支付金额是否与报销金额一致。
   * @param   total    报销金额       
   * @return  true or false
   */
function flyEditPageCheckPaySame(total){	
	
	 //校验支付金额是否等于报销金额。
	 var tableObj = document.getElementById("payTableId");	
	 
	 var s = tableObj.rows[tableObj.rows.length-1].cells[3].getElementsByTagName("input")[0].value;
	 //var p = tableObj.rows[tableObj.rows.length-1].cells[6].getElementsByTagName("input")[0].value;

   var sa = (s.trim().length<1) ? 0 : parseFloat(s);
	 //var pa = (p.trim().length<1) ? 0 : parseFloat(p);
	 
   if(Math.abs(total-sa)>0.001){
	  	
	  	  alert("抱歉，报销金额与支付金额不一致，请重新调整。");
	  	  return false;	 
	 }
	 return true;	
}
 /**
   * 合同录入明细金额，自动计算。用户输入时，取得单价、数量，计算该行合计，并计算总计。
   * 总计有的是1个，有的是2个。（申请1个，报销含现金金额、公务卡金额）     
   * @param obj       选择表单对象
   * @param toOrder   另一个乘数的td位置序号，以0开始。即单价、数量位置序号。
   * @param sumOrder  合计td的位置序号，以0开始
   * @param typeOrder 支付类别的位置序号，以0开始。如果没有，则为0，总计为一个；如果大于0，则总计2个
   * @param isChecked 是否校验标准。默认需校验（即不输入时要校验）、Y需校验，N或其他不校验。
   * @param isApped   是否校验审核标准。Y需校验，N或其他不校验。在报销时，为审核过金额的申请，此时所报销的金额不能大于审核金额。
   * @return  
   
   * 1、判断表单是否为修改行，如果是，则以上一行的数据计算
   * 2、计算后，行合计到修改行，其他不变，仍合计到原来位置。
   * 3、被修改行所有数据不变
   
   * 处理：判断，如果是修改行： 
       1）行对象置为被修改行
       2）当前数据置为修改行，默认数据置为原数据
       3）合计行，置为修改行
   * 
   */
function flyEditPageConAmtCount(obj,toOrder,sumOrder,typeOrder,isChecked,isApped){	
	
	//alert(toOrder+" ; "+sumOrder+" ; "+typeOrder);
	
	//行对象
	var trObj = obj.parentNode.parentNode;
	
	//输入数据，和原来数据
	var c = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);
	var d = (obj.defaultValue.trim().length<1) ? 0 : parseFloat(obj.defaultValue);
	
	//校验报销金额，是否大于申请审核金额
	if(isApped && isApped=="Y"){
		
		  var stand = 0;
		  var flystand = obj.getAttribute("flystand"); 		
		  
		  //设置审核金额  
		  if(!flystand || flystand.trim().length<1){
		     obj.setAttribute("flystand",d);
		     stand = d;
		  }else
		  	 stand = parseFloat(flystand);
		     
		  if(c>stand){
		  	
		  	 obj.value = d;
	   	   alert("抱歉，报销超出核定标准:"+stand+"，请重新输入。");
	   	   return;
		  }
	}

	//校验价格不能超过标准	
	if(!isChecked) //默认需校验（即不输入时要校验）
	   isChecked = "Y";	   
	var n = obj.parentNode.cellIndex;//当前输入表单所在td序号
	if(n==4 && isChecked == "Y"){//第四td为价格，在这里写死了。
		
		  //标准金额	
     var standStr = trObj.cells[3].getElementsByTagName("input")[0].value;	  
	   var stand = (standStr.trim().length<1) ? 0 : parseFloat(standStr);
	   
	   if(c-stand>0.01){
	   	
	   	   obj.value = d;
	   	   alert("抱歉，价格超出标准，请重新输入。");
	   	   return;
	   }
		
	}	
	
	if(obj.value == obj.defaultValue)		
		return;
	
	var tagId = "";//总计表单id	
	
	var w = parseInt(toOrder);
	var s = parseInt(sumOrder);
	var t = parseInt(typeOrder);
	
		
	//取得总计金额
	if(t>0){//2个总计，转账、公务卡
		
	    var sel = trObj.cells[t].getElementsByTagName("select");
	
	    if(sel.length<1 || sel[0].value=="C")
	       tagId = "cashAmtId";
	    else if(sel[0].value=="P")
		     tagId = "pubAmtId";
	}else {
		
		  tagId = "planAmt";		
	}
	
	//总计金额	
  var amt = document.getElementById(tagId).value;  
	var total = (amt.trim().length<1) ? 0 : parseFloat(amt);
	
	//乘数金额	
	var mulStr = trObj.cells[w].getElementsByTagName("input")[0].value;	
	var mul = (mulStr.trim().length<1) ? 0 : parseFloat(mulStr);//乘数金额		
	
	//合计金额		
	var sumStr = trObj.cells[s].getElementsByTagName("input")[0].value;
	var sum = (sumStr.trim().length<1) ? 0 : parseFloat(sumStr);//合计金额	
	
	//原来的相乘金额
	var origin = mul * d;	
	
	//现在的相乘金额
	var now = mul * c;	
	
	//1、如果乘数为空或0，则返回	
	if(mul<0.01)
	   return;	
	
	//2、如果清空了输入数据。原来有数，则合计和总计要减去原来的数。
	if(c<0.01 && d>0.01){
		
		 document.getElementById(tagId).value = total - origin;	//总计金额
		 trObj.cells[s].getElementsByTagName("input")[0].value = sum - origin;//合计金额	
		 
		 return;
	}
	
	//3、赋值金额   Math.round((original-original2+original3)*100)/100
	document.getElementById(tagId).value = Math.round((total - origin + now)*100)/100;	//总计金额
	//trObj.cells[s].getElementsByTagName("input")[0].value = Math.round((sum - origin + now)*100)/100;//合计金额	
	trObj.cells[s].getElementsByTagName("input")[0].value = Math.round((c*mul)*100)/100;//合计金额	
	//alert(document.getElementById(tagId).value);
  //4、赋值指标使用金额  
  flyEditPageSetIndexUse(now-origin);
 
	return;
}
/**
   * 根据出差人员动态生成下拉列表，不含已有支付人员显示。
   * @param   payPerArr  人员数组对象[代码、姓名]
   * @return 
   */
function flyEditPageGetPayPerSel(payPerArr,loginInsId){
	
	  var arr = new Array();
	  var perArr = new Array();
		var per = "";
		var tem = "";
		var payType = "";
		var opt = "";
		var perObj = "";
		
	  var tableObj = document.getElementById("payTableId");	
	  //var labelObj = document.getElementById("togetherId").getElementsByTagName("label");
 	   	  
 	  for (var j=0;j<payPerArr.length;j++) {
 	  	
 	   	  perArr.push([payPerArr[j][0],"C",payPerArr[j][1]+" 储蓄卡"]);
 	   	  perArr.push([payPerArr[j][0],"P",payPerArr[j][1]+" 公务卡"]);
 	  } 	  
 	  //alert(perArr); 	
		for (var i=1;i<tableObj.rows.length-1;i++ ){ 
  	 	
  	 	      //合计行人员(或第三方单位)代码
  	 	      perObj = tableObj.rows[i].cells[0].getElementsByTagName("input");
  	 	      if(perObj.length<1){//插入行后，没有选择支付人员提示。
  	 	      	
  	 	      	  alert("抱歉，请选择支付人员后，再添加");
  	 	      	  return null;
  	 	      }
  	 	      
  	 	  	  per = perObj[0].getAttribute("flyvalue");   	 	  	
  	 	  	  arr = per.split("~");
  	 	  	  
  	 	  	  payType = tableObj.rows[i].cells[4].getElementsByTagName("select")[0].value;
  	 	  	  
  	 	  	  for (var j=0;j<perArr.length;j++) {
  	 	  	  	
  	 	  	  	 if(perArr[j][0]==arr[1] && perArr[j][1]==payType)
  	 	  	  	    perArr.splice(j, 1);
  	 	  	  	
  	 	  	  }  	   
    }  
 	   	  	
 	 //alert(perArr); 	
 	  for (var j=0;j<perArr.length;j++) {
 	  	
 	   	 opt+= "<option value="+perArr[j][1]+"~"+perArr[j][0]+">"+perArr[j][2]+"</option>";  		
 	  }
 	  
 	  if(opt=="")
 	     return null;
 	  
 	  opt = "<select onclick=\"flyEditPagePayPerSel(this,'"+loginInsId+"');\"><option value=''>请选择支付人员</option>"+opt+"</select>";  
               	  	                       	  	                          
    return opt;   	    
}
/**
   * 选择支付人员，显示到支付列表。
   * @param   obj         select对象  
   * @param   loginInsId  单位代码  
       
   * @return 
   */
function flyEditPagePayPerSel(obj,loginInsId){
	
	if(obj.value.trim().length<2)
	   return;
	   
	var arr = obj.value.split("~");
  var rowObj = obj.parentNode.parentNode;
	
	rowObj.cells[0].innerHTML = "<input type='text'  flyvalue='' flyflag='2' readonly>";	
	
	outPersonSetAPersonBank(loginInsId,arr[1],arr[0],rowObj);	
  
  return;   
}
/**
   * 支付信息插入行时，校验是否有未插入人员，如果有返回true，反之返回false。
     * @param   obj  插入行对象 
     * @param   payPerArr  人员数组对象[代码、姓名] 
       
   * @return 
   */
function flyEditPagePayRowInsertCheck(obj,payPerArr,loginInsId){
	
	payAddPer_a = flyEditPageGetPayPerSel(payPerArr,loginInsId);
	
	if(payAddPer_a==null){
		
		 alert("抱歉，人员支付信息已全部显示，不可再增加。");
	   return false;	   
	   
	}	
	return true;
}
/**
   * 支付信息不可删除第三方，如果不是第三方返回true，反之返回false。
   * @param   rowObj  插入行对象  
       
   * @return 
   */
function flyEditPagePayRowDelCheck(obj){		
	
	var perInfo = obj.cells[0].getElementsByTagName("input")[0].getAttribute("flyvalue");
	//alert(perInfo);
	var arr = perInfo.split("~");
	if(arr[0]=="C"){
		
		 alert("抱歉，第三方支付请从添加处删除。");
	   return false;	
	}
	
	return true;
}
/**
   * 取得顶部页面对象，以获取全局变量，如单位、人员等设置    
   * @return 顶部页面对象  
   */
function flyEditPageGetGlobalPageObj(){	
	
	var pageObj  = self.parent.banner;
	
	if(!self.parent.banner)//一般在frame框架中用
	   pageObj  = self.parent.parent.banner;	
	   
	if(!pageObj)//一般在弹窗中使用。
	   pageObj  = self.opener.parent.banner;	
	
	return pageObj;
}
/**
   * 取得指标使用总额   
   * @param   indexTable  指标表对象或表的id
   * @return  指标使用总额   
   */
function flyEditPageGetIndexTotalAmt(indexTable){	
	
	var tableObj = "";
	var use = 0;
	
	if (typeof(indexTable) == "string") {
	   tableObj = document.getElementById(indexTable);
	}else
		 tableObj = indexTable;
	 
	 for (var i=1;i<tableObj.rows.length;i++ ){ 		 	  
	 	 
	 	  uValue = tableObj.rows[i].cells[4].getElementsByTagName("input")[0].value;
	 	  if(uValue.trim().length<1)
	 	    uValue=="0";
	 	    
	 	  use = use + parseFloat(uValue);//本次使用金额
   }
   
   return use;
}
//设置指标是否输入，根据支出设置，确定指标区域为默认，或特定岗位输入

function flyEditPageSetIndexArea(){	
	
	if(flyEditPageIsPostSetPayIndex())//设置为录入人不选择指标，则不显示指标输入表单。	    
	   document.getElementById("indexArea").style.display = "none";
	   
}
function flyEditPageIsPostSetPayIndex(){	
	
	var flag = getGloblePayIndexSetFlag();
	
	if(flag && flag == "N")//设置为录入人不选择指标，则不校验。	    
	   return true;
	   
	return false;	   
}