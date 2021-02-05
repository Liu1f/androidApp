
//取得服务器地址
function getGlobleServerIp(){
	 
	return window.localStorage.getItem("serverIp");
}
//取得登录单位代码
function getGlobleInsId(){
	 
	return window.localStorage.getItem("loginInsId");
}
//取得登录单位名称
function getGlobleInsName(){
	 
	return window.localStorage.getItem("loginInsName");
}
//取得登录部门代码
function getGlobleDeptId(){
	 
	return window.localStorage.getItem("loginDeptId");
}
//取得登录部门名称
function getGlobleDeptName(){
	 
	return window.localStorage.getItem("loginDeptName");
}
//取得登录人员代码
function getGloblePerId(){
	 
	return window.localStorage.getItem("loginPerId");
}
//取得登录人员名称
function getGloblePerName(){
	 
	return window.localStorage.getItem("loginPerName");
}
//取得登录人员岗位代码
function getGloblePostId(){
	 
	return window.localStorage.getItem("loginPostId");
}
//取得登录人员岗位名称
function getGloblePostName(){
	 
	return window.localStorage.getItem("loginPostName");
}
//取得登录人员是否管理员
function getGlobleIsAdmin(){
	 
	return window.localStorage.getItem("loginAdminFlag");
}
//取得登录人员密码
function getGloblePassword(){
	 
	return window.localStorage.getItem("loginPass");
}
//取得指标录入方式。录入人不选择指标，则不校验。	 
function getGloblePayIndexSetFlag(){
	 
	return window.localStorage.getItem("payIndexSetFlag");
}
//指标在途方式，Y，审批过程中挂接即在途,N,审批通过后在途
function getGloblePayIndexOnway(){
	 
	return window.localStorage.getItem("payIndexOnway");
}
//取得指标设置岗数组
function getGloblePayIndexSetPost(){
	 
	var arr = new Array();
	
	var str = window.localStorage.getItem("payIndexSetPost");
	if(str && str.trim().length>0)
	  arr = str.split("|");
	  
	return arr;
}
//取得出差申请行程是否必输标志,Y必输   payIndexSet_a.flag
function getGloblePayTravelApp(){
	 
	return window.localStorage.getItem("payTravelApp");
}
//出差是否按自然天数计算住宿费用
function getGloblePayTravelDay(){
	 
	return window.localStorage.getItem("payTravelDay");
}
//出差住宿是否按人员合并住宿
function getGloblePayTravelHotel(){
	 
	return window.localStorage.getItem("payTravelHotel");
}
//采购方式设置
function getGloblePurSetModel(){
	 
	return window.localStorage.getItem("purSetModel");
}
//采购设置岗
function getGloblePurSetPost(){
	
	var arr = new Array();
	
	var str = window.localStorage.getItem("purSetPost");
	if(str && str.trim().length>0)
	  arr = str.split("|");
	  
	return arr;	 
}
//取得报销审批中修改岗
function getGlobleExpApprSetPost(){
	
	var arr = new Array();
	
	var str = window.localStorage.getItem("expApprSetPost");
	if(str && str.trim().length>0)
	  arr = str.split("|");
	  
	return arr;	 
}
//预算编制编制任务Id
function getGlobleBmaOrderId(){
	 
	return window.localStorage.getItem("bmaOrderId");
}
//预算编制编制任务年份
function getGlobleBmaOrderYear(){
	 
	return window.localStorage.getItem("bmaOrderYear");
}
//预算编制编制任务标识  
function getGlobleBmaOrderFlag(){
	 
	return window.localStorage.getItem("bmaOrderFlag");
}