var commonDetailWindow_a = null;
var commonDetailWindowAdd_a = null;


// var quxiaoClass = document.querySelectorAll(".quxiao");//点击取消
// quxiaoClass.forEach(element => {
//     element.addEventListener('click', function (e) {
//         e.cancelBubble = true;
//         e.stopPropagation();
//         element.parentElement.style.display="none";
//         element.parentElement.parentElement.style.display="none";
//     })
// })

var abClass = document.querySelectorAll(".ab");//点击阴影
abClass.forEach(element => {
    element.addEventListener('click', function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        element.style.display="none";
        element.firstElementChild.style.display="none";
    })
})

var hcClass = document.querySelectorAll(".hc"); //点击阴影部分
hcClass.forEach(element => {
    element.addEventListener('click', function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        element.style.display="none";
        element.firstElementChild.style.display="none";
    })
})


// /**
//  *  确认时追加元素内容
//  * @param element      清单父级元素
//  * @param innerHtml      生成元素html
//  * @param id      追加元素的参考位置
//  */
// function tkContainerFun(element,innerHtml,idName){
//
//     var newContainer = document.createElement("div");
//     newContainer.classList.add('container');
//     newContainer.innerHTML = innerHtml;
//
//     var parent = document.getElementById(idName);
//     parent.parentNode.insertBefore(newContainer,parent)
//
//     addSlideDelete(newContainer.getElementsByClassName("item")[0]);
//     itemOnclick(newContainer.getElementsByClassName("item")[0].firstElementChild);
//     itemDelete(newContainer.getElementsByClassName("del-btn")[0]);
// }
//
// function closeModelWindows(obj){
//     alert("123")
//     obj.cancelBubble = true;
//     obj.stopPropagation();
//     obj.style.display="none";
//     obj.firstElementChild.style.display="none";
// }

/**
 * 打开下拉列表弹窗
 * @param obj
 */
function openSelectWindows(obj){
    obj.lastElementChild.previousElementSibling.style.display="block";
    obj.lastElementChild.previousElementSibling.firstElementChild.style.display="block";
}

/**
 * 打开模块隐藏div
 * @param obj
 */
function openWindowData(obj){

    commonDetailWindowAdd_a = obj.parentNode.parentNode;

    var windowObj = obj.nextElementSibling.firstElementChild;
    windowObj.style.display = "block";

    var spanEle = windowObj.firstElementChild.lastElementChild.firstElementChild.nextElementSibling;
    if(spanEle.hasAttribute("onclick")){
        spanEle.style.display = "block";
        spanEle.nextElementSibling.style.borderRadius = "0rem .7rem .7rem 0rem";
    }

}


/**
 * 拼接字符
 * @param obj
 * @param objParents
 * @returns {number}
 */
function flyvaluePrefix(obj,objParents) {
    // obj.parentElement.parentElement.parentElement.parentElement.style.display="none";
    var contentEle = objParents.querySelectorAll(".content");
    if(contentEle.length>0 && contentEle[0].getAttribute("flyvalue").length==0){
        return 1;
    }else if(contentEle.length>0){
        return parseInt(contentEle.length)+1;
    }
}


/**
 * 添加信息展示
 * @param obj
 * @param flag
 * @param addFlag
 */
function addDataCommonFun(obj,flag,addFlag){

    var changeAmt = 0;
    var flyvalue="";
    var flytype = '';
    var oldAmt = 0;
    var areaObj = '';

    var ele = obj.parentElement.parentElement.querySelectorAll("input");

    ele.forEach(e =>{

        if(e.hasAttribute("flyvalue")){

            flyvalue += "^" + e.getAttribute("flyvalue") + "~" + e.value;

        }else{

            flytype = e.getAttributeNode("onkeyup");//解决数字数据库插入时不能为空，置为0

            if(flytype && flytype.nodeValue.indexOf("flyCheckDigitInput") > -1 && e.value.trim().length<1)
                flyvalue += "^" + "0";
            else
                flyvalue += "^" + e.value;
        }
    })
    var objParents = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    if(flag == "addNumInfo" && commonDetailWindow_a == null){

        flyvalue = "^"+ flyvaluePrefix(obj,objParents) +flyvalue;

    }else if(flag == "addNumInfoS" && commonDetailWindow_a == null){

        flyvalue = "^-1~"+ flyvaluePrefix(obj,objParents) +flyvalue;

    }else if((flag == "addNumInfo" && commonDetailWindow_a != null) || (flag == "addNumInfoS" && commonDetailWindow_a != null)){

        var updFlyValue = commonDetailWindow_a.firstElementChild.firstElementChild.getAttribute("flyvalue").split("^");
        flyvalue = "^" + updFlyValue[0] + flyvalue;

    }
    //取得修改前的合计金额
    if(commonDetailWindow_a && commonDetailWindow_a.className == "container")
         oldAmt = commonDetailWindow_a.querySelectorAll("span[flyshow='0']")[1].innerHTML;

    flyvalue = flyvalue.substring(1);

    if(commonDetailWindow_a == null ){

        flyFormDataPageShowAppData(objParents,flyvalue,'E','^','~');

    }else{
        flyFormDataPageShowAppData(objParents,flyvalue,'U','^','~',commonDetailWindow_a);
    }

    if(addFlag == "C"){ //关闭弹窗
        // obj.parentElement.parentElement.parentElement.parentElement.style.display="none";
        obj.parentNode.parentNode.parentNode.style.display="none";
    }



    if(commonDetailWindow_a && commonDetailWindow_a.className == "container")
        areaObj =  commonDetailWindow_a.parentNode;
    else
        areaObj = commonDetailWindowAdd_a;

    var flyIndex = areaObj.getAttribute("flyindex");


    if(!flyIndex || flyIndex != "N"){
        changeAmt = parseFloat(ele[5].value) - parseFloat(oldAmt);
        flyEditPageSetIndexUse(changeAmt);
    }




    return ele;
}


/**
 * 继续和确认继续 及修改
 * @param obj
 * @param flag
 * @param addFlag
 */
function infoConfirm(obj,flag,addFlag){

    var ele = addDataCommonFun(obj,flag,addFlag);

    payMoneySumFun(0,ele,0);
    commonDetailWindow_a = null;
    commonDetailWindowAdd_a = null;
    infoClear(ele);
}

/**
 * 旅程确认
 * @param obj
 * @param flag
 * @param addFlag
 */
function travelConfirmFun(obj,flag,addFlag){
    var ele = addDataCommonFun(obj,flag,addFlag);
    if(commonDetailWindowAdd_a == null){ //新增
        //取得地点代码、结束日期-开始日期
        travelDataShowChange(document.getElementById("appBillSelId").getAttribute("flyvalue"));
    }else{ //修改

    }

}


/**
 * 弹窗内信息展示
 * @param obj
 * @param index
 */
function windowShowDataInfo(obj,index){

    commonDetailWindow_a  = obj.parentElement.parentElement;

    var flySplit;
    var inputFlyValue = '';
    var flyValue = obj.getAttribute("flyvalue");
    var flyValues = flyValue.split("^");


    var windowObj = obj.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.nextElementSibling.firstElementChild;

    windowObj.style.display = "block";

    var spanEle = windowObj.firstElementChild.lastElementChild.firstElementChild.nextElementSibling;
    if(spanEle.hasAttribute("onclick")){
        spanEle.style.display = "none";
        spanEle.nextElementSibling.style.borderRadius = ".7rem";
    }

    var inputObjs = windowObj.querySelectorAll("input");

    inputObjs.forEach(ele => {
        if(ele.hasAttribute("flyvalue")){

            inputFlyValue = '';

            flySplit = flyValues[index].split("~");

            for(var j=0;j<flySplit.length-1;j++){
                inputFlyValue += "~" + flySplit[j];
            }

            ele.setAttribute("flyvalue",inputFlyValue.substring(1));

            ele.value = flySplit[flySplit.length-1];
        }else{

            ele.value = flyValues[index];

        }

        index++;
    })
}


/**
 * 展示窗口关闭
 * @param obj
 */
function windowClose(obj){
    obj.parentElement.parentElement.parentElement.style.display="none";
    commonDetailWindow_a = null;
    commonDetailWindowAdd_a = null;
    var ele = obj.parentElement.parentElement.querySelectorAll("input");
    infoClear(ele);
}

//
// /*  页面关闭    */
// var pageClose = document.querySelectorAll('.page-guanbi')
// pageClose.forEach(element => {
//     // 删除按钮点击事件
//     element.addEventListener('click', function (e) {
//         e.cancelBubble = true;
//         e.stopPropagation();
//         element.parentElement.parentElement.parentElement.style.display="none";
//     })
// })


/**
 * 清空弹框内的信息
 * @param ele
 */
function infoClear(ele) {
    ele.forEach(e =>{
        e.value = "";
        if(e.hasAttribute("flyvalue")){
            e.setAttribute('flyvalue','');
        }
    })
}

/**
 * 计算合计
 * @param index
 */
function payMoneySumFun(index,obj,num){

    var moneySum = 0;
    var payTableFlyValue = "";
    var elements = document.getElementById("detailTable").querySelectorAll(".content");
    elements.forEach(ele =>{
        var flyValues = ele.getAttribute("flyvalue").split("^");
        moneySum += parseFloat(flyValues[6+index])
    })

    if(!(moneySum >0) ){
        moneySum = 0;
    }

    document.getElementById("finalMoneyData").textContent = moneySum;
    document.getElementById("planAmt").value = moneySum;

    //修改支付信息
    var payTable = document.querySelectorAll("#payTableId");

    if(payTable.length > 0){
        //为总金额重新赋值
        var containerEle = document.getElementById("payTableId").querySelectorAll(".content");
        containerEle.forEach( ele =>{
            var flyValueSplit = ele.getAttribute("flyvalue").split("^");
            flyValueSplit[3] = moneySum;
            for(var i =0;i<flyValueSplit.length;i++){
                payTableFlyValue += "^" + flyValueSplit[i];
            }
        })
        //移除已存在的数据
        var payContainer = payTable[0].querySelectorAll(".container");

        for(var i = payContainer.length-1; i > 0 ; i--){
            payContainer[i].remove();
        }
        payContainer[0].style.display = "none";

        //设置数据
        payTableFlyValue = payTableFlyValue.substring(1);
        flyFormDataPageShowAppData(payTable[0],payTableFlyValue,"S","^","~") //方法显示

        //隐藏总计行
        containerEle = payTable[0].querySelectorAll(".container");
        containerEle[containerEle.length-1].style.display = "none";

    }


}

/**
 * 计算支出事项合计
 * @param obj 对象
 * @param index1 列数
 * @param index2 列数
 * @param index3 合计列数
 * @param symbol 符号
 */
function payMoneyCalcuFun(obj,index1,index2,index3,symbol) {
    var finalMoneyData = 0;
    var parentNode = obj.parentElement.parentElement;
    var inputTags = parentNode.querySelectorAll("input");

    //判断是否存在控字符串
    if(inputTags[index1].value == null || inputTags[index2].value == null || inputTags[index1].value == "" || inputTags[index2].value == ""){
        return;
    }

    if(symbol == "*"){ //乘号
        finalMoneyData = parseFloat(inputTags[index1].value) * parseFloat(inputTags[index2].value);
    }

    inputTags[index3].value = finalMoneyData; //设置合计金额

    var finalMoneyTags = document.querySelectorAll(".finalMoneyData"); //根据finalMoneyData类改变值

}

/**
 * 预算指标区域，用户输入本次使用金额，判断是否超出可用金额。如果超出，提示并恢复为原来金额。
 * @param obj  选择表单对象
 * @return
 */
function inputIndexAmtCheck(obj){

    //取得可用指标金额
    var e = obj.parentElement.previousElementSibling.getElementsByTagName("input")[0].value;
    //支出金额
    var v = (obj.value.trim().length<1) ? 0 : parseFloat(obj.value);

    if(v>e){

        alert("使用金额大于可用金额，请重新输入。");
        obj.value = obj.defaultValue;

        return;
    }
}

/**
 *  item元素滑动
 * @param divObj      滑动div对象
 */
function addSlideDelete(divObj){

    let touchStart, touchEnd;

    // 滑动开始, 记录开始位置
    divObj.addEventListener('touchstart', function (e) {
        touchStart = e.touches[0].clientX;
    })

    // 滑动结束
    divObj.addEventListener('touchend', function (e) {

        let currentEle = e.currentTarget

        touchEnd = e.changedTouches[0].clientX

        // 向左滑, 显示删除按钮
        if (currentEle.dataset.status === '0' && touchEnd - touchStart < -30) {
            currentEle.dataset.status = 1
            currentEle.classList.add('active')
            document.body.onclick=function(e){
                console.log(e)
                e.stopPropagation()
                if (e.target.className == "del-btn") {

                } else {
                    currentEle.dataset.status = 0
                    currentEle.classList.remove('active')
                }
            }
        }

        // 向右滑, 隐藏删除按钮
        if (currentEle.dataset.status === '1' && touchEnd - touchStart > 30) {
            currentEle.dataset.status = 0
            currentEle.classList.remove('active')
        }
    })

}

/**
 *  item元素单机修改
 * @param itemClick     item删除事件
 */
function itemDelete(itemClick) {

    itemClick.addEventListener('click', function (e) {
        var divEle = itemClick.parentElement.parentElement.parentElement.parentElement;

        if(divEle.getAttribute("id") == "detailTable"){
            var flyvalue = itemClick.parentElement.previousElementSibling.getAttribute("flyvalue");
            var changeAmt = flyvalue.split("^")[6];
            changeAmt = -parseFloat(changeAmt);
            itemClick.parentElement.parentElement.parentElement.remove();
            payMoneySumFun(0,'',changeAmt);
            flyEditPageSetIndexUse(changeAmt)
        }else{
            itemClick.parentElement.parentElement.parentElement.remove();

        }

    })

}

/**
 * 差旅报销页面
 */
function travelDataShowChange(appId){
    //取得人员代码、结束日期-开始日期、地点代码、城市间交通费
    var tem = new Array();
    var tem1 = new Array();
    var str = "";
    var travelArr = new Array();//行程数组，用以拼接后台返回的人员、级别信息，然后显示每个人的城市间交通
    var nNays = "";//自然天数
    var days = "";//住宿天数
    var amt = "";
    var n = 0;
    var tableObj = "";

    //取得出差人员
    var perIds = getExpPerson();

    //取得地点代码、结束日期-开始日期
    var pInfo = flyFormDataPageGetData("travelTableId","^","~");

    pInfo = pInfo.replaceAll("|","^");

    var arr = pInfo.split("^");
    //没有输入行程，或只填写一行，不计算人员费用。
    if(arr[0].trim().length<1 || arr[1].trim().length<1 || arr[2].trim().length<8 || arr[3].trim().length<8 || arr.length<20)
        return;

    // //取得住宿费计算方式
    // var hotelWay = pageObj_a.payTravelSet_a.hotel;
    var hotelWay=getGloblePayTravelHotel();
    // //取得是否按自然天计算住宿费标识
    // var hotelDays = pageObj_a.payTravelSet_a.days;
    var hotelDays=getGloblePayTravelDay() ;

    for(var i=0;i<arr.length-10;i=i+10){ //最后一行为返回行程地点，不计入差旅费用,减去最后一行。

        //行程数组，用以拼接后台返回的人员、级别信息，然后显示每个人的城市间交通
        travelArr.push(arr[i+1]+"^"+arr[i+2]+"^"+arr[i+3]+"^"+arr[i+4]+"^"+arr[i+5]+"^"+arr[i+6]+"^"+arr[i+7]+"^"+arr[i+8]);

        //计算交通费
        arr[i+6] = (arr[i+6].trim().length<1) ? "0" : arr[i+6];

        amt = arr[i+6];

        //住宿天数
        //days = pubUtilGetDateInterDays(arr[i+2],arr[i+11]);

        //出差地点自然天数。离开这个地点日期减去出发到(不一定到，有的第一天出发，第二天到)这个地点日期。
        nDays = pubUtilGetDateInterDays(arr[i+1],arr[i+11]);

        if(i==arr.length-20){//循环最后一行.交通费加上返回行程交通费。

            arr[i+16] = (arr[i+16].trim().length<1) ? "0" : arr[i+16];
            amt = ""+(parseFloat(arr[i+6])+parseFloat(arr[i+16]));
            nDays = pubUtilGetDateInterDays(arr[i+1],arr[i+12]);//返回当天计一天出差

            travelArr.push(arr[i+11]+"^"+arr[i+12]+"^"+arr[i+13]+"^"+arr[i+14]+"^"+arr[i+15]+"^"+arr[i+16]+"^"+arr[i+17]+"^"+arr[i+18]);
        }

        //出差地点住宿天数。离开这个地点日期减去到达这个地点日期。
        //如果出差住宿天数按自然天计算，则赋值自然天数。第一天不增加，因为后台第一天增加1天。
        days = (hotelDays=="Y") ? nDays : pubUtilGetDateInterDays(arr[i+2],arr[i+11]);

        //自然天数，出差第一天也计算一天
        if(i==0)
            nDays++;

        tem = arr[i+4].split("~");//地点
        tem1 = arr[i+5].split("~");//交通方式


        //            天数  地点代码    金额     交通方式    自然天数
        perIds+= "|"+days+"^"+tem[0]+"^"+amt+"^"+tem1[0]+"^"+nDays;
        //perIds+= "|"+arr[i+2]+"^"+arr[i+11]+"^"+days+"^"+tem[0]+"^"+amt;


    }

    perIds = hotelWay+"^"+appId+"^"+hotelDays+"|"+perIds;


    var perAmt = toServerOp("ExpCount",perIds);

    //取得出发日期、返回日期，显示到主信息
    document.getElementById('startDate').value = arr[1];
    document.getElementById('endDate').value = arr[arr.length-8];


    arr = perAmt.split("|");

    //显示前设置序号flyflag为3自动生成；显示完成，设置flyflag为0
    //document.getElementById('subsidyNo').setAttribute("flyflag","3");
    //document.getElementById('stayNo').setAttribute("flyflag","3");

    //显示城市间交通费

    tem = arr[1].split("^");

    for (var i=0;i<tem.length;i=i+14){//增加字段改变

        for (var j=0;j<travelArr.length;j++)
            str+= "^"+tem[i]+"^"+tem[i+1]+"^"+tem[i+2]+"^"+travelArr[j];
    }
    flyFormDataPageShowAppData(document.getElementById("cityId"),str.substring(1),'S','^','~');
    flyFormDataPageShowAppData(document.getElementById("stayId"),arr[0],'S','^','~');

    var subsidyIdFlyArr = arr[1].split("^");

    //设置人员其他费用
    tem = arr[2].split("^");

    // var tableObj = document.getElementById("sumTableId");
    var amtObj = 0;
    var oAmt = 0;
    var pAmt = 0;

    for (var i=0;i<tem.length;i=i+2 ){

        for (var j=0;j<subsidyIdFlyArr.length ;j += 14 ){

            //合计行人员代码
            var perSplit = subsidyIdFlyArr[j+1].split("~");

            per = perSplit[0]+"~"+perSplit[1]+"~"+perSplit[2];

            if(tem[i]==per){
                subsidyIdFlyArr[j+9] = tem[i+1];

                amtObj = subsidyIdFlyArr[j+13];

                oAmt = (subsidyIdFlyArr[j+13].trim().length<1) ? 0 : parseFloat(subsidyIdFlyArr[j+13]);
                pAmt = (tem[i+1].trim().length<1) ? 0 : parseFloat(tem[i+1]);

                subsidyIdFlyArr[j+13] = Math.round((oAmt + pAmt)*100)/100;
            }
        }
    }

    for (var j=0;j<subsidyIdFlyArr.length ;j += 14 ){
        if(subsidyIdFlyArr[j+9].trim().length ==0){
            subsidyIdFlyArr[j+9] = 0;
            subsidyIdFlyArr[j+13] = 0;
        }
    }
    arr[1] = '';
    for(var i=0;i<subsidyIdFlyArr.length;i++){
        arr[1] += "^" + subsidyIdFlyArr[i];
    }

    flyFormDataPageShowAppData(document.getElementById("subsidyId"),arr[1].substring(1),'S','^','~');

}

/**
 * 将出差人员报销金额显示到支付信息
 * @return
 */
function setPayInfo(){

    //设置人员支付银行账户信息
    var perBankInfoFlyvalues = setTogetherPerBankInfo();
    var perBankInfoSplit = perBankInfoFlyvalues.split("^");

    //设置人员支付账户金额
    var tableObj = document.getElementById("subsidyId").querySelectorAll(".content");
    var payTableObj = document.getElementById("payTableId");

    var arr = new Array();
    var arr1 = new Array();
    var pers = "";
    var tem = "";

    var oAmt = 0;//个人合计
    var pAmt = 0;//公务卡合计
    var s = "";//个人合计
    var p = "";//公务卡合计
    var tabFlyValue=  new Array();

    var payTableRows =  perBankInfoFlyvalues.split("^").length/5;

    tableObj.forEach(element =>{
        var tableFlyValue = element.getAttribute("flyvalue").split("^");

        pers = tableFlyValue[1].split("~");
        arr = new Array();
        arr.push(pers[0])
        arr.push(pers[1])
        arr.push(pers[2])

        for (var i=0;i<payTableRows; i++ ){
            tem = perBankInfoSplit[i*5];
            arr1 = tem.split("~");//P~perId

            if(arr[2].trim()==arr1[1].trim()){

                s = tableFlyValue[12];
                p = tableFlyValue[11];

                perBankInfoSplit[i*5+3] = s;
                perBankInfoSplit[(i+1)*5+3] = p;

                i = payTableRows;
            }
        }
    })
    var flyvalueFinal = "";
    for(var i=0;i<perBankInfoSplit.length;i++){
        flyvalueFinal += "^" + perBankInfoSplit[i];
    }

    var finalMoneyValue = 0;
    for(var i=0;i<perBankInfoSplit.length;i+=5){
        console.log(parseFloat(perBankInfoSplit[i*5+3]))
        finalMoneyValue +=  parseFloat(perBankInfoSplit[i+3]);
    }
    flyvalueFinal += "^~~总计^~^^"+finalMoneyValue+"^~";
    document.getElementById("finalMoneyData").textContent = finalMoneyValue;

    flyvalueFinal = flyvalueFinal.substring(1);
    flyFormDataPageShowAppData(payTableObj,flyvalueFinal,"S","^","~") //方法显示

    var containerEle = payTableObj.querySelectorAll(".container");
    containerEle[containerEle.length-1].style.display = "none";

    return;
}
