﻿/*! flywings v1.0 | (c) 2018,widesky technology information, Inc. | flywings/license
//@ sourceMappingURL=

*/
document.write("<script type='text/javascript' src='./js/ajaxPubapp.js'></script>");
document.write("<script type='text/javascript' src='./js/pubUtilapp.js'></script>");



/**
   * 解析进入该页url传递参数。将多个变量，赋值给json 
   * @return   json对象
   */
function loginGetRequest() {  
	
	 
   var url = window.location.search; //获取url中"?"符后的字串
   //var url1 = document.location.toString();//获取url地址
   //var url2 = location.href;
   
   var params_a = {};
   var arr = "";

   if (url.indexOf("?") != -1) {
   	
   	 
      var str = url.substr(1);

      strs = str.split("&");

      for(var i = 0; i < strs.length; i ++) {
      	
         arr = strs[i].split("=");
         eval("params_a."+arr[0]+"='"+arr[1]+"'");  
      }
   }
   
   return params_a;
}

function toMainFrame(loginInfo){	  
	
	 //window.location.href="/wsis/servlet/mainserver?program=loginPage"; 
	 //window.location.href="/wsis/com/is/flywings/www/gsdy.html"; 
	 
	 //wh= window.open('/fwis/com/is/flywings/login/index.html', "mainFrame",'location=no scrollbars=no menubar=no status=yes resizable=1 width=screen.width height=screen.height left=0 top=0')
	 var pageWid = window.screen.width;
   var pageHei = window.screen.height;
   
   /*
   var paramArr = ["loginInfo",loginInfo];  
   var openParam = 'location=no scrollbars=no menubar=no status=yes resizable=1 width='+ (window.screen.availWidth+200) +' height='+ (window.screen.availHeight-80) +'  left=0 top=0';
   locationPostWindow("index.html", paramArr,"O",openParam,"mainFrame");
  
   return;
   */
   //var tm = window.encodeURI(window.encodeURI(loginInfo)); 　　//编码 
   
   //记住用户名
   if(window.localStorage){
   	
   	   var re = document.getElementById('rememberme');
   	   
   	  if(!re ||re.checked)
   	     window.localStorage.setItem('flywingslocalusername', document.form1.user_code.value);
   	  else
   	  	 window.localStorage.setItem('flywingslocalusername', '');
   }  
  
   //设置全局变量
   setLoginInfo(loginInfo);   
  
   
   //导向主页面
   window.location.href = "mainpage.html";
   
   /*
   var tm = window.encodeURI(loginInfo); 　　//编码 
	 
	 //wh= window.open('index.html', "mainFrame",'location=no scrollbars=no menubar=no status=yes resizable=1 width="+pageWid+" height="+pageHei+" left=0 top=0');
	 var wh= window.open("index.html?loginInfo="+tm, "mainFrame",'location=no scrollbars=no menubar=no status=yes resizable=1 width='+ (window.screen.availWidth+200) +' height='+ (window.screen.availHeight-80) +'  left=0 top=0');
	 wh.focus();
	 
	 window.opener=null;
   window.open('','_self');
   window.close();
   return;	
   */
	  
}
function login(){
	
	  var loginUser = document.form1.user_code.value;
	  var loginPass = document.form1.user_pass.value; 	 
	  var serverIp = document.form1.serverIp.value; 	   
	  
	 	if(loginUser.trim().length<1 || loginPass.trim().length<1) {
	  	 alert("请输入用户名密码！");	  	 
	  	 return;	  	 
	  }
	  
	  //设置服务器ip，在调试的时候用。正式使用去掉。
	  window.localStorage.setItem('serverIp', serverIp);
	  
	  var info = "userCode="+loginUser+"&userPass="+loginPass;  
	  var str = getHttpResponse("/fwis/mssl/loginSrv","login",info); 	
	 
	 //返回str：内容;192.168.20.58
	 //http://192.168.137.1:8081/fwis/mssl/loginSrv?flag=login&userCode=admin&userPass=Pass1111
	  //var serverUrl_a = "http://localhost:8081/fwis/mssl/loginSrv";
	  //var serverUrl_a = "http://localhost:8081/fwis/mssl/loginSrv";	  
	  //var serverUrl_a = "http://39.105.211.59:5568/fwis/mssl/loginSrv";
	  //var serverUrl_a = "http://192.168.20.50:8081/fwis/mssl/loginSrv";
	
	  
	  //var serverUrl_a = "http://"+serverIp+":8081/fwis/mssl/loginSrv";
	  
	  //alert(serverUrl_a);
	  /*
	  $.ajax({
            type: "POST",    //请求类型
            url: serverUrl_a,    //请求地址和参数    GET请求才把参数写在这里
            
            //dataType:"json",
		        //contentType:"application/json;charset=utf-8",

            data:{
            	   flag: "login",
                 userCode: "admin",
                 userPass:"Pass1111"
            },    //POST请求的参数以JSON格式传参
            success: function (res) {   //请求成功后执行的函数res是返回的值
                alert(res);
                console.log(res)
            },
            error: function (e) {   //请求成功后执行的函数res是返回的值
               alert(e.responseText+" ; "+e.readyState+" ; "+e.status+" ; "+e.statusText);
                console.log(e.responseText);
            }
    });
	  */
	   
	  //var str = getHttpResponse(serverUrl_a,"login",info); 	  	    
	 
	 
	 
	  if(str && str.indexOf("|")>0){ 	
	  	
	  	var arr = str.split("々");
	  	
	  	window.localStorage.setItem('sessionId', arr[arr.length-1]);
	  	
	    arr.pop();//删除sessionId
	    
	  	arr[0] = arr[0]+"|"+loginPass;
	  	
	  	str = arr.join("々");  	
	  	
	  	//if(checkLoginPwd(loginPass))//校验密码是否合规。	  	
	        toMainFrame(str);
	    
	    return;
	    
	  }else {
	  	alert("抱歉，用户名或密码输入错误！");
	  	document.getElementById('user_pass').focus();
	  	return;
	  }
	  
}
function backFun(str){
	
	alert("str = "+str);
	
}
//初始化，回车光标移到下一个表单backFun
function init(){
	
	//pageLogin();
	
	platFormAuthLogin();
	
  inputEnterTab("form1");  
 
  if(window.localStorage){//记住用户名设置
   	
   	 document.form1.user_code.value = window.localStorage.getItem('flywingslocalusername');
   	
  }

}
//校验密码是否合规，不合规跳转密码修改页面
function checkLoginPwd(loginPass){
	
	 //var loginPass = loginUserInfo_a.loginPass;
	 
   var checkPwd = false;
   
	 var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
	 var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
	 var regUpCase = /[A-Z]/; //验证密码是否包括大写字母。
	 
	 if(regNumber.test(loginPass) && regString.test(loginPass) && regUpCase.test(loginPass))
	 	  checkPwd = true;
   
   if(!checkPwd){
   	
	   alert("您的密码安全性较低，为了您的账号安全，请及时修改密码！");     
	   //openPopPage(url,pageLeft,pageTop,pageWid,pageHei) 
	   //var passPage= window.open ("password.html" , "password" ,"height=240,width=500,left=800,top=200,scrollbars=no,location=no,toolbar=no,menubar=no ,status=no") ;
     passPageName_a =  openPopPage("password.html",0.35,0.2,0.3,0.3,"passWin");
   }
   
   return checkPwd;
}
function pageLogin(){
	
	  var loginUser = loginGetRequest();		
	  
	  if(loginUser.flag!="Gone" || loginUser.userId.trim().length<1)	  
	      return;
	      
	  var info = "userCode="+loginUser.userId+"&userPass=flyntt88";  
	 
	 //返回str：内容;
	  var str = getHttpResponse("/fwis/mssl/loginSrv","PageLogin",info); 	  
	 
	  if(str && str.indexOf("|")>0){
	  	
	  	var arr = str.split("々");
	  	
	  	arr[0] = arr[0]+"|Flyntt88";
	  	
	  	str = arr.join("々");  	
	  	
	  	//if(checkLoginPwd(loginPass))//校验密码是否合规。	  	
	        toMainFrame(str);
	       
	    return;
	    
	  }else {
	  	alert("抱歉，用户名或密码输入错误！");
	  	document.getElementById('user_pass').focus();
	  	return;
	  }
}
//第三方平台认证登录，如公安网平台取得登录人信息，直接登录
function platFormAuthLogin(){
	
	  var loginUser = loginGetRequest();		
	  
	  if(loginUser.flag!="LoginUkey" || !loginUser.staffIdno || loginUser.staffIdno.trim().length<15)	  
	      return;
	      
	  var info = "opValue="+loginUser.staffIdno;  
	  
	  alert("1、staffIdno="+staffIdno);
	 
	 //返回str：内容;
	  var str = getHttpResponse("/fwis/mssl/loginSrv","LoginUkey",info); 
	  
	  alert("2、str="+str);	  
	 
	  if(str && str.indexOf("|")>0){
	  	
	  	var arr = str.split("々");
	  	
	  	arr[0] = arr[0]+"|Flyntt88";
	  	
	  	str = arr.join("々");  	
	  	
	  	//if(checkLoginPwd(loginPass))//校验密码是否合规。	  	
	    toMainFrame(str);
	       
	    return;
	    
	  }else {
	  	alert("抱歉，登录认证错误，请重试或联系管理员。");	  	
	  	return;
	  }
}
 /**
   * 设置登录信息到本地
   * @para loginInfo 登录时取得的系统配置信息  
   * @return 
   */
function setLoginInfo(loginInfo) {
	
	//var loginUserInfo_a = {}; //登录用户信息全局变量
  var payIndexSet_a = {}; //支出指标设置岗位信息全局变量
  var payTravelSet_a = {}; //差旅设置信息全局变量
  var payPurSet_a = {}; //事项申请采购设置信息全局变量
  var payAppUpdSet_a = {}; //报销审批中修改设置全局变量
  var bmaSet_a = {}; //预算编制设置全局变量，bmaOrderId，编制任务Id；bmaOrderYear，编制任务年份
  payIndexSet_a.arr = new Array();
	
	//alert(loginInfo);
	var aArr = loginInfo.split("々");
	
  //deptName|personName|postName|insId|insName|deptId|personId|postId|adminFlag
	var arr = aArr[0].split("|");			
	
  //一、登录用户信息全局变量
  window.localStorage.setItem('loginInsId', arr[3]);
  window.localStorage.setItem('loginInsName', arr[4]);
  window.localStorage.setItem('loginDeptId', arr[5]);
  window.localStorage.setItem('loginDeptName', arr[0]);
  window.localStorage.setItem('loginPerId', arr[6]);
  window.localStorage.setItem('loginPerName', arr[1]);
  window.localStorage.setItem('loginPostId', arr[7]);
  window.localStorage.setItem('loginPostName', arr[2]);
  window.localStorage.setItem('loginAdminFlag', arr[8]);
  window.localStorage.setItem('loginPass', arr[9]); 
  
  //二、支出设置
  var paySetarr = aArr[1].split("|");
  
  
	var payIndexSetarr = paySetarr[0].split("^");
	var payTravelSetarr = paySetarr[1].split("^");
	var payPurSetarr = paySetarr[2].split("^");
	var payAppUpdarr = paySetarr[3].split("^");//审批中修改设置
  
  //1、支出指标设置岗位信息全局变量
  if(payIndexSetarr.length>0) {
  	
  	  var j = 0;
  	  
  	  window.localStorage.setItem('payIndexSetFlag', payIndexSetarr[0]); //指标选择方式，Y，默认录入人选择指标，N，特定岗位选择
  	  window.localStorage.setItem('payIndexOnway', payIndexSetarr[2]); //指标在途方式，Y，审批过程中挂接即在途,N,审批通过后在途
  	  
      for (var i=4;i<payIndexSetarr.length;i=i+2 ){ 	
 
        payIndexSet_a.arr[j] = payIndexSetarr[i+1];
        
        j++;
      }
      
      var payIndexSetPost =  payIndexSet_a.arr.join("|");//指标设置岗
      window.localStorage.setItem('payIndexSetPost', payIndexSetPost);
  }  
  
  //alert(payIndexSet_a.flag+" ; "+payIndexSet_a.onway+" ; "+payIndexSet_a.arr);
  
  //2、差旅设置信息全局变量
  
  //出差申请是否必输入行程
  window.localStorage.setItem('payTravelApp', payTravelSetarr[0]);  
  //出差是否按自然天数计算住宿费用
  window.localStorage.setItem('payTravelDay', payTravelSetarr[2]); 
  
  //出差住宿是否按人员合并住宿
  if(payTravelSetarr[4]=="Y")
     payTravelSet_a.hotel = payTravelSetarr[7];
  else
  	 payTravelSet_a.hotel = "";  
  window.localStorage.setItem('payTravelHotel', payTravelSet_a.hotel); 
  	 
  //3、事项申请采购设置信息全局变量
  payPurSet_a.purPost = ""; 
  if(payPurSetarr[0]=="Y"){
  	
  	 var j = 0;
    
     for (var i=6;i<payPurSetarr.length;i=i+2 ) 
        payPurSet_a.purPost = "|"+payPurSetarr[i+1];        
  }
  if(payPurSet_a.purPost.trim().length>2)
     payPurSet_a.purPost = payPurSet_a.purPost.substring(1);
     
  window.localStorage.setItem('purSetPost', payPurSet_a.purPost); //采购设置岗
  window.localStorage.setItem('purSetModel', payPurSetarr[4]); //采购方式设置
  	
  //4、报销审批中修改全局变量
  payAppUpdSet_a.updPost = "";
  if(payAppUpdarr[0]=="Y"){
  	
  	 var j = 0;
    
     for (var i=2;i<payAppUpdarr.length;i=i+2 ) 
        payAppUpdSet_a.updPost = "|"+payAppUpdarr[i+1];        
  }
  if(payAppUpdSet_a.updPost.trim().length>2)
     payAppUpdSet_a.updPost = payAppUpdSet_a.updPost.substring(1);
     
  window.localStorage.setItem('expApprSetPost', payAppUpdSet_a.updPost); //报销审批中修改岗
  	 
  
  //三、预算编制设置	
  bmaSet_a.bmaOrderFlag = "";  
  
  var bmaArr = aArr[2].split("|");		 
  if(bmaArr.length>1){
  	
  	 window.localStorage.setItem('bmaOrderId', bmaArr[0]); //预算编制编制任务Id
  	 window.localStorage.setItem('bmaOrderYear', bmaArr[1]); //预算编制编制任务年份
  	 window.localStorage.setItem('bmaOrderFlag', "Y"); //预算编制编制任务标识  	
  }  
  
  //校验密码是否合规
  //checkLoginPwd();
  
  return;
}