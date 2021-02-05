// var abClass = document.querySelectorAll(".ab");//点击阴影
// abClass.forEach(element => {
//     element.addEventListener('click', function (e) {
//         e.cancelBubble = true;
//         e.stopPropagation();
//         element.style.display="none";
//         element.firstElementChild.style.display="none";
//     })
// })
//
// var hcClass = document.querySelectorAll(".hc"); //点击阴影部分
// hcClass.forEach(element => {
//     element.addEventListener('click', function (e) {
//         e.cancelBubble = true;
//         e.stopPropagation();
//         element.style.display="none";
//         element.firstElementChild.style.display="none";
//     })
// })
//
//
// /**
//  *  item元素删除
//  * @param itemClick     item单机事件
//  */
// function itemOnclick(itemClick) {
//     itemClick.addEventListener('click', function (e) {
//         var tkValueStr = itemClick.getAttribute("tkvalue"); //获取值
//         var tkValue = tkValueStr.split("|"); //拆分值
//
//         var parentElement = itemClick.parentElement.parentElement.lastElementChild.firstElementChild.nextElementSibling;
//         parentElement.style.display="block";
//         parentElement.firstElementChild.style.display="block";
//
//         var divList = parentElement.firstElementChild.firstElementChild.children;
//         for(var i = 0;i < divList.length-1 ; i++){
//             var textElement = divList[i].firstElementChild.nextElementSibling;
//             var tagNameLower =textElement.tagName.toLowerCase();
//             if(tagNameLower == "input"){
//                 textElement.value = tkValue[i];
//             }else if(tagNameLower == "span"){
//                 textElement.textContent = tkValue[i];
//             }
//         }
//
//     })
// }


/**
 *  展示页面js
 *
 */

/* 审批状态弹框 */
document.getElementById('zhuangtai').onclick = function () {
    document.getElementById('hei').style.display="block";
    document.getElementById('examine').style.display="block";
}
document.getElementById('zhuangtaiguanbi').onclick = function () {
    document.getElementById('hei').style.display="none";
    document.getElementById('examine').style.display="none";
}
