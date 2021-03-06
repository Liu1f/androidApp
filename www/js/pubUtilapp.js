﻿
//获取json对象长度
function getJsonLength(jsonObj) {
	
   var len = 0;
   
   for(var p in jsonObj) 
    len++;
   
   return len;
}
//显示两位小数
function pubUtilTwoDecimal(floatData) {	
	
	// return floatData.toFixed(2); 
   return Math.round(floatData*100)/100;   
}
//如果数字是小数，保留2位小数返回，如果是整数，则返回原整数。
function pubUtilIsDecimalTwo(n) {	
	
	if(parseInt(n) < parseFloat(n))
	    return pubUtilTwoDecimal(n);
	else
		  return n;	
}

//判断一个字符串是否为json对象 
function isJSON(str) {
	
    if (typeof str == 'string') {
    	
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            //console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    return false;
    //console.log('It is not a string!')
}
//判断一个对象是否为Array数组对象 
function pubUtilIsArray(obj){

  return Object.prototype.toString.call(obj)== '[object Array]';

}

/**
   * 将字符串解析为json
   * @param str   字符串
   * @param idArr json id 数组
   * @return json 
   */
function flyParseStrToJson(str,idArr){	
	
	 if (!str || (str.trim().length<1) || !idArr || idArr.length<1)     
     return null;   	
	
	var n = idArr.length;
	var jsonArr = new Array();
  var json = {};
	
	var arr = str.split("|");
	
	for(var i=0;i<arr.length;i=i+n){ 
		
		json = {};
		for(var j=0;j<idArr.length;j++)			
			eval("json."+idArr[j]+"='"+arr[i+j]+"'");	
			
		jsonArr.push(json);    
	}
	
	return jsonArr;
}
//对数字数组进行排序，按从小到大
function pubUtilDigitalArrSort(arr) {
	
   var compare = function (x, y) {//比较函数
      if (x < y) {
         return -1;
      } else if (x > y) {
        return 1;
      } else {
        return 0;
      }
   }
  
   return arr.sort(compare);
}
/*
   * 弹出页面，根据传递参数.参数为小数，即为整个距离的比例小数。按标准页面的相对数确定。
   * @ url      弹出页面路径。
   * @ pageLeft 左边距。    左边距的比例小数
   * @ pageTop  上边距。    上边距的比例小数
   * @ pageWid  页面宽度。  页面宽度占全屏页面宽度比例小数
   * @ pageHei  页面高度。  页面高度占全屏页面宽度比例小数
   * @return 
   */
function openPopPage(url,pageLeft,pageTop,pageWid,pageHei,winName){			
	 	
	 /*
	 var leftth=Math.round((window.screen.width-400)/6);
   var topth=Math.round((window.screen.height-300)/7);
   
   var widlen = Math.round((window.screen.width)*3/4);
   var heilen = Math.round((window.screen.height)*3/4)   
   */
   
   var newWinName = "newPopPage";
   
   var leftth=Math.round((window.screen.width)*pageLeft);
   var topth=Math.round((window.screen.height)*pageTop);
   
   var widlen = Math.round((window.screen.width)*pageWid);
   var heilen = Math.round((window.screen.height)*pageHei);   
   
   if(winName && winName.trim().length>0)
      newWinName = winName;
  
	 var wh= window.open(url, "newPopPage","toolbar=no location=no scrollbars=yes menubar=no status=no resizable=1 depended=yes z-look=yes  width="+widlen+" height="+heilen+" left="+leftth+" top="+topth);
	 
	 wh.focus();
	 
	 return wh;	
}
/**
   * 弹出页面，根据传递参数.参数为小数，即为整个距离的比例小数。按标准页面的相对数确定。
   * @ url      弹出页面路径。
   * @ pageLeft 左边距。    左边距的比例小数
   * @ pageTop  上边距。    上边距的比例小数
   * @ pageWid  页面宽度。  页面宽度占全屏页面宽度比例小数
   * @ pageHei  页面高度。  页面高度占全屏页面宽度比例小数
   * @return 
   */
function openPopModalPage(url,pageLeft,pageTop,pageWid,pageHei){	
	 
   var leftth=Math.round((window.screen.width)*pageLeft);
   var topth=Math.round((window.screen.height)*pageTop);
   
   var widlen = Math.round((window.screen.width)*pageWid);
   var heilen = Math.round((window.screen.height)*pageHei);   
   
   var wh= window.showModalDialog(url ,"newPopPage" ,"dialogHeight="+heilen+"px;dialogWidth="+widlen+"px;dialogLeft="+leftth+"px;dialogTop="+topth+"px;center=no;location=no;toolbar=no;menubar=no;status=no;resizable=no") ;
	 wh.focus();
	 
	 //var passPage= window.showModalDialog(url , "password" ,"dialogHeight="+heilen+"px;dialogWidth="+widlen+"px;dialogLeft=800px;dialogTop=200px;center=no;scroll=no;location=no;toolbar=no;menubar=no;status=no") ;
	     
	//passPage.focus();
  
	 //var wh= window.open(url, "newPopPage","toolbar=no location=no scrollbars=yes menubar=no status=no resizable=1 depended=yes z-look=yes  width="+widlen+" height="+heilen+" left="+leftth+" top="+topth);
	// wh.focus();
	 return;	
}
//获取整个窗口滚动的高度
function getScrollTop(){  
    var scrollTop=0;  
    if(document.documentElement && document.documentElement.scrollTop){  
        scrollTop=document.documentElement.scrollTop;  
    }else if(document.body){  
        scrollTop=document.body.scrollTop;  
    }  
    return scrollTop;  
}
//鼠标点击页面,获取点击元素
function getEventObj(event){
	
	var isIE=document.all ? true : false;  
  var obj = null;  
  if(isIE==true){  
       obj = document.elementFromPoint(event.clientX,event.clientY);  
  }else{  
       e = arguments.callee.caller.arguments[0] || window.event;   
       obj = document.elementFromPoint(e.clientX,e.clientY);  
  }  
  return obj;
}
/*
对于样式写在<style type="text/css"></style>或者.css文件里，是无效的.
currentSytle、defaultView就产生了，currentStyle 是IE提供的，defaultView 则于标准浏览器提供的
*/
function getObjStyle(obj,attr){  
 if(obj.currentStyle)
 { 	
  return obj.currentStyle[attr];
 }
 else
 {
  return document.defaultView.getComputedStyle(obj,false)[attr];
 }
}
/**
   * 数字数组求和
   * @para arr 数字数组
   * @return 和
   */
function digitArrSum(arr) {

    var s = 0;

    for (var  i=arr.length-1; i>=0; i--) {

        s += arr[i];

    }
    return s;
}
/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 * @return 存在返回顺序号，不存在返回null
 */
function isInArray(arr,value){
	
    for(var i = 0; i < arr.length; i++){
        if(value == arr[i]){
            return i;
        }
    }
    return null;
}
/**
   * 将数字保留2位小数显示。
   * @para val   数字值
   * @return 
   */
function pubUtilTo2Decimal(val) {
	
	return Math.round((val)*100/100);	
}
/**
   * 判断是否为非负整数（非负整数（正整数 + 0） ）,含正数或零，整数返回true，否则返回false
   * @para val 判断值
   * @return boolean
   */
function isPosInteger(val) {
	
	var patrn = /^[0-9]*$/;   
	
  return patrn.test(val);	
}
/**
   * 判断是否为整数,含正数或负数，
   * @para val 判断值
   * @return boolean 整数返回true，否则返回false
   */
function isInteger(val) {
	//alert(val);
	//var patrn = /^-?\d+$/;
	//var patrn = /^\\d+$/;
	//var temp=/^\d+(\.\d+)?$/; // /^-?\d+$/
	
	//var patrn = /^((-\\d+)|(0+))$/;
	
	var n = parseInt(val);
	
	var patrn = /^\d+$/;
  return patrn.test(n);	
}
//验证整数，直接传数字字符串，不可以输入小数和负数
function plusInteger(val)
{
	val = val.trim();
	var ch = '';
  for (var i=0; i < val.length; i++)
  {
        ch=val.charAt(i);
        
        if (ch <'0' || ch>'9')      
          return false;
      
  }
  return true;
}
//验证整数，直接传数字字符串，不可以输入小数和负数
function plusDecimal(val)
{
	val = val.trim();
	var ch = '';
  for (var i=0; i < val.length; i++)
  {
        ch=val.charAt(i);
        
        if (ch!='.' && (ch <'0' || ch>'9'))      
          return false;
      
  }
  return true;
}
/**
   * 判断是否为正整数,正整数返回true，否则返回false
   * @para val 判断值
   * @return boolean
   */
function isPInteger(val) {
	var patrn = /^[0-9]*[1-9][0-9]*$/;
	//var temp=/^\d+(\.\d+)?$/; // /^-?\d+$/
  return patrn.exec(val);	
}
/**
   * 判断是否为小数(浮点数),含正数或负数，小数返回true，否则返回false
   * @para val 判断值
   * @return boolean
   */
function isDecimal(val) {
	
	var patrn =  /^(-?\d+)(\.\d+)?$/;
	  
  return patrn.exec(val);
}
/**
   * 判断日期格式是否正确，正确返回true，否则返回false。日期格式为：2018-08-18
   * @para val 判断值
   * @return boolean
   */
function isDate(val) {
	//1、总长度；2、-拆串数组长度；3、数组中每个数字长度
	val = val.trim();
	
	if(val.length!=10)
	  return false;
	  
	var arr = val.split("-");
	if(arr.length!=3)
	  return false;
	  
	if(arr[0].length!=4 || !plusInteger(arr[0]))
	  return false;
	
	if(arr[1].length!=2 || !plusInteger(arr[1]) || arr[2].length!=2 || !plusInteger(arr[2]))
	  return false;  
	  
	return true;  
}
/**
   * 判断时间格式是否正确，正确返回true，否则返回false。日期格式为：09:18:08
   * @para val 判断值
   * @return boolean
   */
function isTime(val) {
	
	//1、总长度；2、-拆串数组长度；3、数组中每个数字长度
	val = val.trim();
	
	if(val.length!=8)
	  return false;
	  
	var arr = val.split(":");
	if(arr.length!=3)
	  return false;	  
	
	if(arr[0].length!=2 || !plusInteger(arr[0]) || arr[1].length!=2 || !plusInteger(arr[1])  || arr[2].length!=2 || !plusInteger(arr[2]))
	  return false;  
	  
	return true;  
}
/**
   * 判断日期+时间格式是否正确，正确返回true，否则返回false。日期格式为：2018-08-18 09:18:08，日期和时间之间一个英文空格 
   * @para val 判断值
   * @return boolean
   */
function isDateTime(val) {
	
	//1、总长度；2、-拆串数组长度；3、数组中每个数字长度
	val = val.trim();
	
	if(val.length!=19)
	  return false;
	  
	var arr = val.split(" ");
	if(arr.length!=2)
	  return false;	 
	  
	if(!isDate(arr[0]))
	  return false;	
	  
	if(!isTime(arr[1]))
	  return false;		
	  
	return true; 
}
/**
   * 判断邮箱格式是否正确，正确返回true，否则返回false。
   * @para val 判断值
   * @return boolean
   */
function isEmail(val) {
	
	if((val.indexOf("@")>-1) && (val.indexOf(".")>-1))
	    return true;
	  
  return false;	
}
/**
   * 判断电话号码格式是否正确，正确返回true，否则返回false。
   * @para val 判断值
   * @return boolean
   */
function isTel(val) {
	
	var patrn =  /^(-?\d+)(\.\d+)?$/;
	  
  return patrn.exec(val);
}
/**
   * 判断手机号码格式是否正确，正确返回true，否则返回false。
   * @para val 判断值
   * @return boolean
   */
function isMobel(val) {
	
	var patrn =  /^(-?\d+)(\.\d+)?$/;
	  
  return patrn.exec(val);
}

/**
   * 只可输入整数，通过<input type='text' onkeyup='onlyInteger(this);' onafterpaste='onlyInteger(this);' value='' >
   * @para obj input对象
   * @return 
   */
function onlyInteger(obj) {
	var reg =  /[0-9]+/;
	obj.value=reg.exec(obj.value);
	//obj.value=obj.value.replace(/\D/g,'');
}
/**
   * 只可输入小数，通过<input type='text' onkeyup='onlyDecimal(this);' onafterpaste='onlyDecimal(this);' value='' >
   * @para obj input对象
   * @return 
   */
function onlyDecimal(obj) {
	
	var reg =  /[\-\.0-9]+/;
	//obj.value=reg.exec(obj.value);
	
	setTimeout(function(){ obj.value=reg.exec(obj.value);}, 50);
}
/**
   * 只可输入小于maxDec的整数，如果大于该整数，则返回maxDec
   * 示例<input type='text' onkeyup="checkMaxInt(this,10);" onafterpaste='checkMaxInt(this);' value='' >
   * @para obj input对象
   * @return 
   */
function checkMaxInt(obj,maxDec){	
	  
	  var reg =  /[0-9]+/;
	  obj.value=reg.exec(obj.value);
	  
	  var n = parseInt(obj.value);
	  var max = parseInt(maxDec);	 
	  
	  if(n>max) 
       obj.value=10;   
    
    return;    
}
/**
   * 替换字符串中的特殊字符
   * 示例<input type='text' onkeyup="checkMaxInt(this,10);" onafterpaste='checkMaxInt(this);' value='' >
   * @para obj input对象
   * @return 
   
   str = str.replace(new RegExp(c[i],'g'),"");
   */
function replaceChar(str){		
	
	if(!str || str.trim().length<1)
	   return "";
	   
	str = str.replace(/\^/g, '');
	str = str.replace(/~/g, '');
	str = str.replace(/§/g, '');
	str = str.replace(/\|/g, '');
	
	return str;	
}
/**
   * 判断非法字符输入，和输入的字符是否超长。非法字符或超长后不可输入。
   * @obj:需要判断字符长度，类型为text或textarea的组件  
   * 使用举例:<input type="text"  maxlength="8" onkeyup="flyCheckStrInput(this)" >
   * 说明:input 组件的maxlength必须要设置，否则程序执行不正确
   */
function flyCheckStrInput(obj)
{     
	
	var str = replaceChar(obj.value);
	var olen = str.length; //原长
  var len = absLength(str);//绝对长
  var mlen = obj.maxLength; //最大长度  
	
  if(len>mlen){
    if(len>olen) //有中文
       obj.value = str.substring(0,mlen-(len-olen));
    else 
       obj.value = str.substring(0,mlen);
  }else {
  	
  	if(obj.value != str)
  	  obj.value = str;  	
  }
  return;
}
/**
   * 判断非法字符输入，和输入的字符是否超长。非法字符或超长后不可输入。
   * @obj:需要判断字符长度，类型为text或textarea的组件  
   * 使用举例:<input type="text"  maxlength="8" onkeyup="flyCheckStrInput(this)" >
   * 说明:input 组件的maxlength必须要设置，否则程序执行不正确
   */
function flyCheckStrInput1(obj)
{      	
	
	var e = window.event;
	var keynum = e ? e.keyCode : e.which;
	
	var str = obj.value;
	var olen = str.length; //原长
  var len = absLength(str);//绝对长
  var mlen = obj.maxLength; //最大长度
  
	//onkeyup 必须延迟一下，否则执行不正确;
	if(keynum=="192" || keynum=="54" || keynum=="220")		
		setTimeout(function(){ obj.value = str.substring(0,str.length-1);}, 50);		 
  
  if(len>mlen){
    if(len>olen) //有中文
       obj.value = str.substring(0,mlen-(len-olen));
    else 
       obj.value = str.substring(0,mlen);
  }   
  return;
}
/**
   * 判断数字输入，非数字不可输入。
   * @param obj   需要判断输入对象，类型为text或textarea的组件  
   * @param flag  判断标识：整数I;正整数+I；负整数-I；小数D；正小数+D；负小数-D；
   * 使用举例:<input type="text"  maxlength="8" onkeyup="flyCheckDigitInput(this,'I')" >
   * 说明:input 组件的maxlength必须要设置，否则程序执行不正确
   */
function flyCheckDigitInput(obj,flag){   
	
	var reg = "";
	
	if(flag=="I")	       //数字：^[0-9]*$ 
	  reg =  /[0-9]+/;
	else if(flag=="D")	  //浮点数 ^(-?\d+)(\.\d+)?$
		reg =  /[\-\.0-9]+/;
	else if(flag=="+I")	          // 非负整数：（正整数 + 0） ^((-\d+)|(0+))$ 
		reg = /^((-\d+)|(0+))$/;
	else if(flag=="+D")		       // 非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$ 
		reg = /^\d+(\.\d+)?$/
	else if(flag=="-I")	      // 非正整数（负整数 + 0） ^((-\d+)|(0+))$ 
		reg = /^((-\d+)|(0+))$/
	else if(flag=="-D")	       // 非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 
		reg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;	   
	   
	//alert(reg);
	setTimeout(function(){ obj.value=reg.exec(obj.value);}, 50);
	
	return;
}
/**
   * 获得字符串的绝对长度。本函数将汉字作为两个字符，其返回的值可用于匹配数据库的字段长度
   * @para str 要判断的字符串
   * @return 返回字符串的绝对长度
   */
function absLength(str) {

      var len=str.length;
      var reg =  /[^\u4E00-\u9FA5\uF900-\uFA2D\uFF00-\uFFEF\u3000-\u303F]/gi; //匹配非中文和中文字符
      var rel = str.replace(reg,''); //提取出中文和中文字符
      
      len+= rel.length; //将中文和中文字符按两个字符长度计算。
      return len;
  }   
/**
   * 判断输入的字符是否超长,超长后不可输入。
   * @obj:需要判断字符长度，类型为text的组件  
   * 使用举例:<input type="text"  maxlength="8" onkeyup="checkLength(this)" >
   * 说明:input 组件的maxlength必须要设置，否则程序执行不正确
   */
function checkLength(obj)
{      
	  var str = obj.value;
	  var olen = str.length; //原长
    var len = absLength(str);//绝对长
    var mlen = obj.maxLength; 
    
    if(len>mlen){
    	 if(len>olen) //有中文
         obj.value = str.substring(0,mlen-(len-olen));
       else 
       	 obj.value = str.substring(0,mlen);
    }   
    return;
}

 /**
   * 及时判断必输项是否输入。验证input必输项是否输入。每次输入结束，光标移开时进行判断
   * @obj:input对象。
   * 使用举例:
  
      <input type="text" name="test"  necessary="1" onblur="neceCheck(this)" maxlength="8" title="" onblur="checkLength(this,'en')" >
      <input type="text" name="test"  necessary="1" onblur="neceCheck(this)" maxlength="8" title="" onblur="checkLength(this,'en')" >
      <input type="text" name="test" maxlength="8" title="" onblur="checkLength(this,'en')" >
  
   * 说明:必输的input内必须加入 necessary="1" onblur="neceCheck(this)"，非必输不加入
   */
function neceCheck(obj){
	
	//校验必输内容	
	var b = true;	
		
  var nece = obj.getAttribute("necessary");		
	if(nece && nece=="1") {
			
		if(obj.value.trim().length<1) {
				
				  obj.style.borderLeftColor = "red";
				  b = false;
				  
		}else {
			
			    obj.style.borderLeftColor = "#ddd";
		}
			
	}	  
  
	return b;	
}
 
 /**
   * 统一判断必输项是否输入。验证input必输项是否输入。
   * @obj:包含input的标签，对象。如：var editObj = document.getElementById("inputOp");  
   * 使用举例:
   <div id="inputOp">
      <input type="text" name="test"  necessary="1"  maxlength="8" title="" onblur="checkLength(this,'en')" >
      <input type="text" name="test"  necessary="1"  maxlength="8" title="" onblur="checkLength(this,'en')" >
      <input type="text" name="test" maxlength="8" title="" onblur="checkLength(this,'en')" >
   </div>
   var editObj = document.getElementById("inputOp");  
   neceInput(editObj);
   * 说明:必输的input内必须加入 necessary="1" 非必输不加入
   */
function neceInput(obj){
	
	//校验必输内容
	
	var b = true;
	
	var editObj = obj.getElementsByTagName("input");
	for(var i=0;i<editObj.length;i++) {
		
		var nece = editObj[i].getAttribute("necessary");		
		if(nece && nece=="1") {
			
			if(editObj[i].value.trim().length<1) {
				
				  editObj[i].style.borderLeftColor = "red";
				  b = false;
			}
			
		}	
  }
  
	return b;	
}
 /**
   * 统一判断必输项是否输入。包括输入表单，如text，附件，其他多选内容等。
   * 通过在必输表单，加入属性necessary="1"；必输标签，加入属性necessary="2"，必输标签内容为label
   * @obj:包含校验的标签对象名称，一般为form的id代码。如：var editObj = document.getElementById("inputOp");  
  
   * 说明:必输的input内必须加入 necessary="1" 非必输不加入
   */
function neceAllInput(formId){
	
	var formObj = document.getElementById(formId);
	
	if(!formObj)
	   return;
	   
	var b = true;	
	var nece = "";
	   
	var obj = formObj.getElementsByTagName("*");//取得所有标签
	
	for (var i=0;i<obj.length;i++ ){
		
		nece = obj[i].getAttribute("necessary"); 
 	   	   
 	  if(!nece || nece.trim().length<1)
 	      continue;
 	    
 	   if(nece=="1" && obj[i].value.trim().length<1)  {
				
				  obj[i].style.borderLeftColor = "red";
				  b = false;
		 }else if(nece=="2"  && obj[i].getElementsByTagName("label").length<1) {
		 	    obj[i].style.borderLeftColor = "red";
		 	    b = false;
		 }
	}
	return b;	
}
 
  /**
   * 将一个form内输入表单，点击回车，光标移到下一个表单。
   * 1、在页面初始化时，加入到onload中。
   * 2、必须有form标签
   * @formId: form的ID值;  
   * 说明:将form的ID值作为参数，调用该函数，即可实现回车移到光标 
   */
function inputEnterTab(formId) {
	
	var formObj = document.getElementById(formId);
	
	if(!formObj)
	   return;
	   
	var len = formObj.elements.length; 	
	
	var obj = "";
		
	 for(var i=0;i<len;i++){  	 	 
	 	  
	 	  obj = formObj.elements[i];	 	  
	 	  
	 	  //if(obj.type=="text" || obj.type=="textarea" || obj.type=="button" || obj.type=="password" || obj.type=="select-one") {
	 	  		 
		      obj.onkeydown = function (event)	{
		      	
		      	//Internet Explorer/Chrome 浏览器使用 event.keyCode 取回被按下的字符，而 Netscape/Firefox/Opera 等浏览器使用 event.which。
		      	 var keynum = window.event ? event.keyCode : event.which;
		      	
		 	       //if (event.keyCode == "13") {//keyCode=13是回车键；数字不同代表监听的按键不同
		 	       if (keynum == "13") {//keyCode=13是回车键；数字不同代表监听的按键不同
                 
                var nextFormObj = document.getElementById(formId);
	              var len1 = formObj.elements.length;	              
               
                var fObj = "";
                var flag = 0;	
                
                for(var j=0;j<len1;j++){
                	
                	 fObj = nextFormObj.elements[j];                	 
                	 
            	     if(fObj==this) {
            	     	    
            	  	      flag = 1;
            	  	      continue;
            	  	 }  
            	  	 
            	  	 if(flag == 1) {    
            	        fObj.focus(); 
            	        
            	        return;
            	     } 
                }          
             }
          }
		  //}
	 }	 
}
  /**
   * Input输入表单，点击回车，执行查询。
  
   * @formId: form的ID值;  
   * 说明:将form的ID值作为参数，调用该函数，即可实现回车移到光标 
   */
function pubUtilInputEnterQuery(inputId,backFun) {
	
	var inputObj = "";
	
	if (typeof(inputId) == "string") {
	   inputObj = document.getElementById(inputId);  
	}else
		 inputObj = sId;
	
	inputObj.onkeydown = function (event)	{
		      	
		      	//Internet Explorer/Chrome 浏览器使用 event.keyCode 取回被按下的字符，而 Netscape/Firefox/Opera 等浏览器使用 event.which。
		   var keynum = window.event ? event.keyCode : event.which;
		      	
		 	       //if (event.keyCode == "13") {//keyCode=13是回车键；数字不同代表监听的按键不同
		 	 if (keynum == "13") {//keyCode=13是回车键；数字不同代表监听的按键不同
                 
           if(backFun && backFun!="") {	  	
	  	 
               eval( "var _function = " + backFun );
               _function(inputId);
	  	
	            return;
	         }               
       }
  }	
}
 
  /**
   * 将一个form内输入表单，1、点击上下箭头、左右箭头，实现数字加减1；2、点击回车，光标移到下一个表单.
   * @formId: form的ID值;
   * @fun:    增加或减少触发的函数。为空则不触发。  
   * 说明:将form的ID值作为参数，调用该函数，即可实现该功能.
   * Page Up 33 ;Page Down 34 ;Left Arrow 37 ;Right Arrow 39 ;Up Arrow 38 ;Dw Arrow 40 .
   */
function inputEnterArrowTab(formId,fun) {
	
	var formObj = document.getElementById(formId);
	var len = formObj.elements.length; 	
	
	var obj = "";
		
	 for(var i=0;i<len;i++){  	 	 
	 	  
	 	  obj = formObj.elements[i];
	 	  
	 	  if(obj.type=="text" || obj.type=="textarea") {
	 	  		 
		      obj.onkeydown = function (event)	{
		      	
		      	 if(this.readOnly==true)
		      	    return;		      	 
		      	 else if (event.keyCode == "13") {//keyCode=13是回车键；数字不同代表监听的按键不同
                 
                var nextFormObj = document.getElementById(formId);
	              var len1 = formObj.elements.length;	              
               
                var fObj = "";
                var flag = 0;	
                
                for(var j=0;j<len1;j++){
                	
                	 fObj = nextFormObj.elements[j];
                	 
            	     if(fObj==this) {
            	  	      flag = 1;
            	  	      continue;
            	  	 }  
            	  	 
            	  	 if(flag == 1 && (fObj.type=="text" || fObj.type=="textarea"  || obj.type=="button" || obj.type=="password")) {    
            	        fObj.focus(); 
            	        return;
            	     } 
                }          
             }else if (event.keyCode == "38" || event.keyCode == "39") {//向上、向右键 ；数字不同代表监听的按键不同
                 
                if(this.value.trim().length<1){//空值置0返回
                   this.value = 0;
                   return;                   
		      	    }
		      	    
                var oNum = parseInt(this.value)+1;
	              if(oNum>10)  
	                 this.value = 10;
	              else       
	              	 this.value = oNum;           
	              	 
	              
	              if(fun && fun.trim().length>1 && oNum>0) {	  	
	  	 
	  	            //alert(fun);
                  eval( "var _function = " + fun );
                  _function(this);	  	 
	        
	              }    
               
             }else if (event.keyCode == "40" || event.keyCode == "37") {//向下、向左键 ；数字不同代表监听的按键不同
             	             	  
                if(this.value.trim().length<1){ //空值置0返回
                   this.value = 0;
                   return;                   
		      	    }
		      	    
             	  var oNum = parseInt(this.value)-1;
	              if(oNum<0)  
	                 this.value = 0;
	              else       
	              	 this.value = oNum;       
	              	 
	              if(fun && fun.trim().length>1 && oNum>0) {	  	
	  	 
                  eval( "var _function = " + fun );
                  _function(this);	  	 
	        
	              }            
             	
             }
          }
		  }
	 }	 
}

/**
   * 动态加载css脚本
   * @cssText:css样式脚本。如var cssText = "body{color:blue;}"
   * @return 
   */
function loadStyleString(cssText) {
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        // firefox、safari、chrome和Opera
        (document.createTextNode(cssText));
    }catch(ex) {
        // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
        style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}
/**
 * 判断终端是什么，ios、andriod等
 * @return  终端标识
 */
function isTerminals() {
	
	  var u = navigator.userAgent;
    alert("当前终端：navigator.userAgent ＝ "+u);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                          
    if(isiOS)
        return "ios";
    else if(isAndroid)
        return "android";
    else return "";
	
}
//验证输入数字，只可输入整数 onKeyPress='return onlyInteger(this);'
function onlyInteger1(obj) 
{
  var tmpChar = window.event.keyCode;
 
  if (tmpChar>47 && tmpChar<58) 
  {  
     return true;
  }  
    return false; 
  
}  
//验证输入数字，可输入小数和整数 onKeyPress='return onlyDecimal(this);'
function onlyDecimal1(obj) 
{
  var tmpChar = window.event.keyCode;
  
  if ((tmpChar>47 && tmpChar<58) ||tmpChar==46) 
  {  
     return true;
  }  
    return false; 
  
}  
//验证整数，不可以输入小数和负数
function plusIntegerTest(thisArg)
{
  var strArg = thisArg.value;
 
  if(event.keyCode==9)
  {
    //obj.select()
    return strArg
  }
  for (var i=0; i < strArg.length; i++)
  {
        var ch=strArg.charAt(i);
        if (ch <'0' || ch>'9')
      {
          return ""
      }
  }
   return strArg
}
//验证数字，不可以输入小数，可输入负数
function negativeInteger(strArg)
{
  if(event.keyCode==9)
  {
    return strArg;
  }
  for (var i=0; i < strArg.length; i++)
  {
        var ch=strArg.charAt(i);
        if ((ch <'0' || ch>'9')&&ch!='-')
      {
          return "";
      }
  }
  
  return strArg;
}
//验证数字，并且可以输入小数和负数
function negativeDecimal(strArg,len)
{
  
  if(event.keyCode==9)
  {
    return strArg
  }
  var count=0
  var pointLocat=strArg.indexOf(".")//判断小数点后的位数长度
  if(pointLocat!=-1)
  {
    if(len!=0)
    {
      if((strArg.length-1-strArg.indexOf("."))>len)
      {
        //if((strArg.length-strArg.indexOf("."))>len
        //return strArg.substring(0,strArg.length-1)
        return strArg.substring(0,strArg.indexOf(".")+len+1)
      }
    }
  }

  for (var i=0; i < strArg.length; i++)
  {
        var ch=strArg.charAt(i);
       if(i==0)
      {
        if ((ch <'0' || ch>'9')&&ch!='-')
        {
            return ""
        }
      }
      else
      {
        if(ch=='.')
          count++
        if(count>1)
          return ""
        if ((ch <'0' || ch>'9')&&(ch!='.'&&ch!='-'))
        {
            return ""
        }
      }
  }
  return strArg
}
function plusDecimalTest(strArg,len)//验证数字，并且可以输入小数
{
 //alert(event.keyCode)
  if(event.keyCode==9)
  {
    return strArg
  }
  var count=0
  var pointLocat=strArg.indexOf(".")//判断小数点后的位数长度
  if(pointLocat!=-1)
  {
    if(len!=0)
    {
      if((strArg.length-1-strArg.indexOf("."))>len)
      {
        //return strArg.substring(0,strArg.length-1)
        return strArg.substring(0,strArg.indexOf(".")+len+1)
      }
    }
  }
  for (var i=0; i < strArg.length; i++)
  {
        var ch=strArg.charAt(i);
        if(i==0)
      {
        if (ch <'0' || ch>'9')
        {
            return ""
        }
      }
      else
      {
        if(ch=='.')
          count++
        if(count>1)
          return ""
        if ((ch <'0' || ch>'9')&&ch!='.')
        {
            return ""
        }
      }
  }
 return strArg
}
/**
   * 取得form内的表单数据。  
   * @param formName     form名称 
   * @param mark         拼串字符标识,长度为1
   * @return 表单值以|拼串。
   */
 function pubUtilGetFormData(formName,mark) {   	
 	
 	   var str = "";
 	   var flytype = "";
 	   var temObj = "";
 	  
 	   var obj = eval("document."+formName);
 	  
 	   var len = obj.length; 	   
 	     
 	   for (var i=0;i<len;i++ ){
 	   	
 	     temObj = obj.elements[i]; 	
 	     
 	     if(temObj.type=="select-one"){ //select保存和修改时，取值value和name,传递到后台
 	   	  	
 	   	  	if(!temObj.options[temObj.selectedIndex] || temObj.options[temObj.selectedIndex].value.trim().length<1)
 	   	  	  str+= mark+" ^ "
 	   	  	else
 	   	      str+= mark+temObj.options[temObj.selectedIndex].value+"^"+temObj.options[temObj.selectedIndex].text;
 	       	      
 	      }else if(temObj.type=="text") { 
 	      	
 	      	 flytype = temObj.getAttributeNode("onkeyup");//解决数字数据库插入时不能为空，置为0
 	      	 
 	      	 if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1 && temObj.value.trim().length<1)
 	      	    str+= mark+"0";
 	      	 else
 	      	    str+= mark+temObj.value;
 	      	
 	      }else if(temObj.type=="radio") {//radio必须有一个默认值。整个单选组，只取一个选中的value值。
 	      	
 	      	 if(temObj.checked==true)
 	      	    str+= mark+temObj.value;
 	      	
 	      } else if(temObj.type=="checkbox") {//每个checkbox取值，没有选中值为空，选中取value值。
 	      	
 	      	 if(temObj.checked==true)
 	      	    str+= mark+temObj.value;
 	      	 else str+= mark+" "; 	      	
 	      }  	
     }
     
     str = str.substring(1);  
     return str;
 } 
/**
   * 显示表单数据。   
   * @param sData       显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param formName    form名称 
   * @param mark1        一级拼串字符标识,长度为1
   * @param mark2        二级拼串字符标识,长度为1。一般为select标签value与内容name的拼接
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @return 
   */
function pubUtilshowFormData(sData,formName,mark1,mark2,sFlag){	
	
	if(!sData || sData.indexOf(mark1)<0)
	   return; 
 	
 	var arr = sData.split(mark1);	
 	
	var obj = eval("document."+formName); 	
 	var len = obj.length; 	  
 	 
 	var arr1 = new Array();
 	var temObj = "";
 	var j = 0;
 	     
 	for (var i=0;i<len;i++ ){
 	   	
 	   temObj = obj.elements[i]; 	  
 	     
 	   if(temObj.type=="select-one"){ //select保存和修改时，value和name拼串（或只一个value）,拆串第一个为value
 	   	
 	   	  arr1 = arr[j].split(mark2);	
 	   	  temObj.value = arr1[0];
 	   	  
 	   	  j++;
 	       	      
 	   }else if(temObj.type=="text") { 
 	      	
 	      temObj.value =  arr[j];
 	      	
 	      j++;
 	      	
 	   }else if(temObj.type=="radio") {//radio必须有一个默认值。整个单选组，只取一个选中的value值。
 	      	
 	      if(temObj.value==arr[j]) {
 	         temObj.checked = true;
 	          j++;
 	      }
 	      	
 	   } else if(temObj.type=="checkbox") {//每个checkbox取值，没有选中值为空，选中为value值。
 	      	
 	      if(temObj.value==arr[j]) 
 	        temObj.checked = true;
 	        
 	      j++;      	
 	   }  	
  }
}   
/**
   * 显示一个动态列表数据，即动态增加行的列表数据。要根据数据判断行数，动态增加行、显示数据
   * @param tableObj    页面list列表区对象 
   * @param sData       显示数据。拼串字符： |，一级；^，二级；~，三级；§，四级  
   * @param formName    form名称 
   * @param mark1        一级拼串字符标识,长度为1
   * @param mark2        二级拼串字符标识,长度为1。一般为select标签value与内容name的拼接
   * @param sFlag       显示样式状态：E，编辑状态；S，显示状态。
   * @return 
   */
function pubUtilshowTableListData(tableObj,sData,formName,mark1,mark2,sFlag){	
	
	if(!tableObj || !sData || sData.trim().length<1)
	   return; 
  
	var arr = sData.split(mark1);	
	
	var n = tableObj.rows[1].cells.length - 1;	//取得列数，并减去操作列
	var r = arr.length/n; //取得行数
	
	//动态生成行，行数要比数据的少一个，因为原来有一个默认首的行。
	for (var m=1;m<r;m++ ){ 	
		
		var newTr = tableObj.rows[1].cloneNode(true);
		tableObj.appendChild(newTr); 
	} 	
	
	pubUtilshowFormData(sData,formName,mark1,mark2,sFlag);
}
 //取得新增输入信息。
 function getAddInput() {   	
 	
 	   var str = "";
 	   var tmepv = ""; 
 	   var tempn = "";
 	  
 	   var len = document.addForm.length; 	   
 	     
 	   for (var i=0;i<len;i++ ){
 	   	
 	     //tempt = document.addForm.elements[i].type; 	    	   	
 	     tempn = document.addForm.elements[i].name; 	 	     
 	     if(tempn.charAt(0)!="v")
 	   	    continue;
 	   
 	     tmepv = document.addForm.elements[i].value; 
 	     if (tmepv.trim().length<1)
         tmepv = "nbsp"; 	 
        
       str+= "|"+tmepv;  
     }
     if(toBackstage!="null")       
       str+= "|"+toBackstage;
       
     str = str.substring(1);          
     return str;
 }    
 //取得修改输入信息。修改时，先与原值对比，修改过的值才获取，没有修改过的设为nbsp，后台不处理。
 function getUpdInput() {   	
 	
 	   var str = "";
 	   var tmepv = ""; 
 	   var tempn = "";
 	   var j = 0;
 	   var ch = "";
 	   var b = false;
 	  
 	   var len = document.addForm.length; 	   
 	   
 	   for (var i=0;i<len;i++ ){
 	   	
 	   //tempt = document.addForm.elements[i].type; 	    	   	
 	     tempn = document.addForm.elements[i].name ; 	  
 	     ch = tempn.charAt(0);
 	     if(ch!="v" && ch!="n")
 	   	    continue;
 	   	    
 	   	 //显示值，不处理。  
 	   	 if(ch=="n") {
 	   	 	  j++
 	   	    continue;
 	     }
 	     
 	     tmepv = document.addForm.elements[i].value.trim();  	   
 	     if (tmepv==originalValue[j])
         tmepv = "nbsp";
       else {
       	 b = true;
       	 if (tmepv.trim().length<1)
            tmepv = "nbspn"; 	
       }
       j++; 	  	
 	      
       str+= "|"+tmepv;  
     }    
     //如果没有修改，则返回|，不进行处理。 
     if(!b)
       return "|";
       
     if(toBackstage!="null")       
       str+= "|"+toBackstage;
         
     str = str.substring(1);    
    
     return str;
 }
/**
   * 取得input type=‘file’选择文件的ObjectURL，blob编码格式。
   * @ param file 
   * @ return  
   */
function getObjectURL(file) {
   
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
   if (window.createObjectURL != undefined) { // basic
     url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
     url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
} 
//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {

    var date = new Date();

    var seperator1 = "-";

    var seperator2 = ":";

    var month = date.getMonth() + 1;

    var strDate = date.getDate();

    if (month >= 1 && month <= 9) {

        month = "0" + month;

    }

    if (strDate >= 0 && strDate <= 9) {

        strDate = "0" + strDate;

    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate

            + " " + date.getHours() + seperator2 + date.getMinutes()

            + seperator2 + date.getSeconds();

    return currentdate;
}
/**
   * 取得当前年，4位，如2020。
   * @ param selectId      下拉列表id
   * @ param defaultYear   默认年份：Y，默认为当前年；空值，默认为空；年份，默认为defaultYear值
   
   * @ return  
   */
function pubUtilGetPresentYear() {
	
	 var myDate= new Date(); 
	 
	 return myDate.getFullYear();
}
/**
   * 生成年份下拉列表。
   * @ param selectId      下拉列表id
   * @ param defaultYear   默认年份：Y，默认为当前年；空值，默认为空；年份，默认为defaultYear值
   
   * @ return  
   */
function pubUtilGetCreateYearSel(selectId,defaultYear) {
	
	//设置年份的选择 
  var myDate= new Date(); 
  
  var de = false;
  var n = 7;    
 
  //默认值处理
  if(defaultYear){
  	
     if(defaultYear.trim().length<1)//默认为空      
        n = 8;
     else if(defaultYear=="Y")
     	  n = 7;
     else if(defaultYear.trim().length>1)
     	  n = 0;
  }
  
  var curYear = myDate.getFullYear();
  var startYear=curYear-5;//起始年份 
  var endYear=curYear+5;//结束年份 
  
  var obj=document.getElementById(selectId);
  
  obj.options.add(new Option("-","-")); 
 
  for (var i=startYear;i<=endYear;i++) 
  { 
  	
  	if(n == 8 && i==curYear)
  	   obj.options.add(new Option("选择年度","")); 
  	   
    obj.options.add(new Option(i+"年度",i)); 
  } 
  obj.options.add(new Option("+","+")); 
  
  //设置默认值
  if(n == 0)
     obj.value = defaultYear;
  else
     obj.options[obj.options.length-n].selected=1; 
  
  //添加展开事件
  obj.onchange = function (event)	{	
		  	
		  	  if(obj.value=="-"){
		  	  	
		  	     var minYear = parseInt(obj.options[obj.selectedIndex+1].value);
		  	     var str = "<option value='"+(minYear-5)+"'>"+(minYear-5)+"年度</option><option value='"+(minYear-4)+"'>"+(minYear-4)+"年度</option><option value='"+(minYear-3)+"'>"+(minYear-3)+"年度</option><option value='"+(minYear-2)+"'>"+(minYear-2)+"年度</option><option value='"+(minYear-1)+"'>"+(minYear-1)+"年度</option>";
		  	     
		  	     obj.innerHTML = "<option value='-'>-</option>"+str+obj.innerHTML.substring(obj.innerHTML.indexOf("</option>")+9);
		  	     
		  	     obj.value = minYear;
		  	     
		  	  }else if(obj.value=="+") {
		  	  	
		  	     var maxYear = parseInt(obj.options[obj.selectedIndex-1].value);
		  	     var str = "<option value='"+(maxYear+1)+"'>"+(maxYear+1)+"年度</option><option value='"+(maxYear+2)+"'>"+(maxYear+2)+"年度</option><option value='"+(maxYear+3)+"'>"+(maxYear+3)+"年度</option><option value='"+(maxYear+4)+"'>"+(maxYear+4)+"年度</option><option value='"+(maxYear+5)+"'>"+(maxYear+5)+"年度</option>";
		  	     
		  	     obj.innerHTML = obj.innerHTML.substring(0,obj.innerHTML.lastIndexOf("<option"))+str+"<option value='+'>+</option>";		  	     
		  	  
		  	     obj.value = maxYear;
		  	  } 		  	
  }
  
  obj.style.cssText = "text-align-last: center";
	
	return;
}
/**
   * 生成年份下拉列表，并选中设定月份。
   * @ param year           下拉列表年份,k空为当前年
   * @ param defaultMonth   默认月份：Y，默认为当前月；其他数字为传递数字的月份；空值，默认为空；
   
   * @ return  
   */
function pubUtilGetCreateYearMonthSel(year,defaultMonth) {
	
	var option = "";
	var month = "";
	var seled = "";
	var myDate= new Date(); 
	
	if(!year || year.trim().length<1)
	    year = myDate.getFullYear();
	   
  if(!defaultMonth || defaultMonth.trim().length<1)
      option = "<option value=''>选择</option>";
  else {  
  	
  	  if(defaultMonth=="Y")
  	     defaultMonth = ""+(myDate.getMonth()+1);
  	     
  	  defaultMonth = (defaultMonth.trim().length<2) ? year+"0"+defaultMonth : ""+year+defaultMonth;  	  
   
  }
  	  
	for (var i=1;i<13;i++ ){ 			
		 
		 month = (i<10) ? year+"0"+i : ""+year+i;
		 
		 seled = (defaultMonth && defaultMonth.length==6 && defaultMonth==month) ? "selected" : "";
		
		 option+= "<option value='"+month+"' "+seled+">"+month+"</option>";		 
  }
	
	return option;
}
/**
   * 取得两个日期间隔天数。
   * @ param startDate 开始日期 格式：2016-05-12
   * @ param endDate   结束日期 格式：2016-05-12
   * @ param roundFlag 取整标识 U向上取整，有小数就整数部分加1；D向下取整,丢弃小数部分；M四舍五入
   * @ return  返回向下取整的整数天
   */
function pubUtilGetDateInterDays(startDate,endDate,roundFlag) {
	
	  var s1 = new Date(startDate.replace(/-/g, "/"));
		var s2 = new Date(endDate.replace(/-/g, "/"));
		
		var times = s2.getTime() - s1.getTime();
		var days = parseInt(times / (1000 * 60 * 60 * 24));
		
		if(roundFlag=="U")
		   return Math.ceil(days);
		else if(roundFlag=="D")
		   return Math.floor(days);
		else if(roundFlag=="M")
		   return Math.round(days);
		else
			 return Math.round(days);
} 
/**
   * 取得下拉列表选中值的，value与text，返回数组
   * @param selName select的Id。   
   */
function pubUtilGetSeledValueText(selName) {  
	
	var obj = document.getElementById(selName); //定位
  var index = obj.selectedIndex; //获取选中下标
  var text = obj.options[index].text; // 选中文本
  
  return [obj.value,text];
}
/**
   * 提交表单时，首先判断表单是否修改过，如果修改过后提交，没有修改的不提交。提高程序运行效率。 
   * @param fromName 要提交form的名称。   
   */
function IsFormChanged(fromName) {  
    var isChanged="";  
    var form = document.getElementById(fromName);  
    for (var i = 0; i < form.elements.length; i++) {  
        var element = form.elements[i];  
        var type = element.type;  
        if (type == "text" || type == "hidden" || type == "textarea" || type == "button") {  
            if (element.value != element.defaultValue) {  
                isChanged += element.name+"="+element.value+"&";  
            }  
        } else if (type == "radio" || type == "checkbox") {  
            if (element.checked != element.defaultChecked) {  
                isChanged += element.name+"="+element.value+"&";  
            }  
        } else if (type == "select-one"|| type == "select-multiple") {  
            for (var j = 0; j < element.options.length; j++) {  
                if (element.options[j].selected != element.options[j].defaultSelected) {  
                    isChanged += element.name+"="+element.value+"&";  
                }  
            }  
        }       
    }      
    alert(isChanged);  
} 

function IsFormChanged(el,radios) {  
    var isChanged="";  
    var form = document.getElementById(el);  
    for (var i = 0; i < form.elements.length; i++) {  
        var element = form.elements[i];  
        var type = element.type; 
        switch(type){
            case "text":
            case "hidden":
            case "textarea":
            case "button":
                isChanged += (element.value != element.defaultValue)?isChanged.length==0?element.name+"="+element.value:"&"+element.name+"="+element.value:"";
                break;
            case "checkbox":
                isChanged += (element.checked != element.defaultChecked)?isChanged.length==0?element.name+"="+element.value:"&"+element.name+"="+element.value:"";
                break;
            case "select-one":
            case "select-multiple": 
                for (var j = 0; j < element.options.length; j++) {
                    isChanged += (element.options[j].selected != element.options[j].defaultSelected)?isChanged.length==0?element.name+"="+element.value:"&"+element.name+"="+element.value:"";  
                }
                break;  
        } 
    }   
    var radiolist=radios.split(',');
    for(var j=0;j<radiolist.length;j++){
        var myRadio=document.getElementsByName(radiolist[j]);
        for(var k=0;k<myRadio.length;k++){
            isChanged += (myRadio[k].checked && !myRadio[k].defaultChecked)?isChanged.length==0?myRadio[k].name+"="+myRadio[k].value:"&"+myRadio[k].name+"="+myRadio[k].value:"";
        }
    }
    alert(isChanged);  
} 
/*
<form id="chageform">
    <input type="checkbox" name="myBox" value="1"/>
    <input type="checkbox" name="myBox" value="2"/>
    <input type="checkbox" name="myBox" value="3"/><br />
    <input type="radio" name="myRadio" checked="checked" value="1"/>
    <input type="radio" name="myRadio" value="2"/><br />
    <input type="radio" name="myRadio2" value="1"/>
    <input type="radio" name="myRadio2" checked="checked" value="2"/>
<input type="button" value="检测" onclick="IsFormChanged('chageform','myRadio,myRadio2')" />
</form>
可以循环获得表单的所有元素, 然后给它们统一注册onchange事件
<form id="testForm" action="#"> 
<input type="text" id="testTxt"/> 
<input type="password" id="testPassword" />
<form>
<script> var edit = false; // 记录是否有修改 
var testForm = document.getElementById('testForm'); 
var elements = testForm.elements; 
var formChange = function() 
{ // 统一处理修改的触发事件  edit = true; } 
	for (var i =0; i < elements.length; i ++) {  elements[i].onchange = formChange; // 为所有的表单元素注册修改事件.
 }
 //搜索但是需要注意的是, checkbox 和radio 可能注册不上这种事件, 需要单独处理
*/
