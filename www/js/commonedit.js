/**     报销明细        */
document.getElementById("trainInfo").onclick=function () {
    document.getElementById("fixed-1").style.display = "block";
}

//添加指标
document.getElementById("indicationInfo").onclick=function () {
    document.getElementById("fixed-4").style.display = "block";
}

//
// document.getElementById("baoxiaodetail-queren").onclick=function(e){
//     var element = document.getElementById("fixed-1").firstElementChild.children;
//     var tkValueStr = tkValueFun(element);
//     var tkValueArray = tkValueStr.split("|"); //拆分值
//     var innerHtml="<div class=\"item\" data-status='0'><div class=\"content\" tkvalue='"+tkValueStr+"'>" +
//         "<div class=\"apply-third-div\"><span class=\"wd-60\">"+
//         tkValueArray[0]+
//         "</span><span class=\"cl-e0d\">￥"+
//         tkValueArray[3]*tkValueArray[4]+
//         "</span></div><div class=\"apply-third-div\"><span class=\"ta-lt cl-0089D0\">"+
//         tkValueArray[2]+
//         "<span class=\"cl-afa-span\">(标准金额)</span></span>" +
//         "<span class=\"cl-0089D0\">"+
//         tkValueArray[3]+
//         "<span class=\"cl-afa-span\">(单价)</span></span><span class=\"cl-0089D0 ta-rt\">" +
//         tkValueArray[4]+
//         "<span class=\"cl-afa-span\">(数量)</span></span>" +
//         "</div></div><div class=\"button-group\"><button class=\"del-btn\">删除</button></div></div>";
//
//     tkContainerFun(element,innerHtml,"baoxiaodetail",e);
//     this.parentElement.parentElement.parentElement.style.display="none";
// }

// /**     报销说明        **/
// document.getElementById("baoxiaoinfo").onclick=function () {
//     document.getElementById("fixed-2").style.display = "block";
// }
// document.getElementById("baoxiaoinfo-queren").onclick=function(e) {
//     var element = document.getElementById("fixed-2").firstElementChild.children;
//     var tkValueStr = tkValueFun(element);
//
//     var parent = document.getElementById("baoxiaoinfo");
//     var containers = parent.parentElement.getElementsByClassName("container");
//     for (var i = 0; i < containers.length; i++) {
//         containers[i].remove();
//     }
//
//     var innerHtml = "<div class=\"item\" data-status='0' tkvalue='" + tkValueStr + "'><div class=\"content\">" +
//         "<div class=\"apply-sixth-div1\">报销说明</div><div class=\"apply-sixth-div2\">" +
//         element[0].firstElementChild.nextElementSibling.value +
//         "</div></div><div class=\"button-group\"><button class=\"del-btn\">删除</button></div></div>";
//
//     tkContainerFun(element, innerHtml, "baoxiaoinfo", e);
//     this.parentElement.parentElement.parentElement.style.display = "none";
// }

//
// document.getElementById("zhibiao-queren").onclick=function(e){
//     var element = document.getElementById("fixed-4").firstElementChild.children;
//     var tkValueStr = tkValueFun(element);
//
//     var innerHtml = "<div class=\"item\" data-status='0'><div class=\"content\" tkvalue='"+tkValueStr+"'>" +
//         "<div class=\"apply-fourth-div\"><div><span class=\"wd-50\">" +
//         element[0].firstElementChild.nextElementSibling.textContent+"(" +
//         element[1].firstElementChild.nextElementSibling.value+")" +
//         "</span><span class=\"wd-20 jt-end cl-e0d\">￥" +
//         element[5].firstElementChild.nextElementSibling.value+
//         "</span></div><div><span class=\"wd-30 ta-lt cl-0089D0\">" +
//         element[2].firstElementChild.nextElementSibling.value+
//         "<span class=\"cl-afa-span\">(年)</span></span><span class=\"wd-30 cl-0089D0\">" +
//         element[3].firstElementChild.nextElementSibling.value+
//         "<span class=\"cl-afa-span\">(总额)</span></span><span class=\"wd-40 cl-0089D0\">" +
//         element[4].firstElementChild.nextElementSibling.value+
//         "<span class=\"cl-afa-span\">(预算余额)</span></span></div></div></div>" +
//         "<div class=\"button-group\"><button class=\"del-btn\">删除</button></div>"
//         + "</div>";
//
//     tkContainerFun(element,innerHtml,"zhibiao",e);
//
//     this.parentElement.parentElement.parentElement.style.display="none";
// }
//
