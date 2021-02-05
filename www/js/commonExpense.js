//添加支付信息
document.getElementById("zhifuxinxi").onclick=function () {
    document.getElementById("fixed-3").style.display = "block";
}

document.getElementById("zhifuxinxi-queren").onclick=function(e){
    var element = document.getElementById("fixed-3").firstElementChild.children;
    var tkValueStr = tkValueFun(element);
    var innerHtml ="<div class=\"item\" data-status='0'><div class=\"content\" tkvalue='"+tkValueStr+"'>" +
        "<div class=\"apply-fifth-div\"><div><span class=\"wd-50\">" +
        element[0].firstElementChild.nextElementSibling.value+
        "("+element[2].firstElementChild.nextElementSibling.textContent+")" +
        "</span><span class=\"wd-50 cl-e0d jt-end\">￥"+
        element[4].firstElementChild.nextElementSibling.value+
        "</span></div><div><span class=\"ta-lt cl-afa\">"+
        element[1].firstElementChild.nextElementSibling.value+
        "</span><span class=\"cl-afa jt-end\">"+
        element[3].firstElementChild.nextElementSibling.value+
        "</span></div></div></div><div class=\"button-group\"><button class=\"del-btn\">删除</button></div></div>";
    tkContainerFun(element,innerHtml,"zhifuxinxi",e);
    this.parentElement.parentElement.parentElement.style.display="none";
}

