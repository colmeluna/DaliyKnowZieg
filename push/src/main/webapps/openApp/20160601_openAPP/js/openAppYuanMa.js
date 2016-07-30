var app = '';
var u = '';
var pmcomid = '';
var mpid = $(".mpid").html();
var tag = $(".tag").html();
var urlName = $(".urlName").html();
var IOSAppDownLoad = '';
var AZAppDownLoad = '';
window.onload = function(){
	var title = $(".title").html();
	var url = $(".url").html();
	var picture = $(".picture").html();
	var content = $(".whole").html();
	u = navigator.userAgent;
	var appType = getUrlParam('appType');
	if ($(".urlName").length > 0) {
		pmcomid = $(".urlName").html();
	}
	if(appType == 'tianshan'){//天山海慧APP
		judge(appType);//appType非空，手机和电脑浏览器
		$("#imgg").attr("src","../static/20160601_openAPP/img/tianshan.png");
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
			app = "haihui://"+urlName+"?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		} else if (u.indexOf('iPhone') > -1) {
			app = "TianShanHaiHui://webview?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		}
		AZAppDownLoad = 'http://182.92.169.167:802/downts.html';
		IOSAppDownLoad = "https://itunes.apple.com/cn/app/tian-shan-hai-hui/id1025669863?mt=8";
	}else if(appType == 'mc'){//秒控生活APP
		judge(appType);
		$("#imgg").attr("src","../static/20160601_openAPP/img/miaokong.png");
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
			app = "miaokong://"+urlName+"?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		} else if (u.indexOf('iPhone') > -1) {
			app = "MiaoKongShengHuo://webview?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		}
		AZAppDownLoad = "http://crm.isolomo.com.cn/xs/down.html";
		IOSAppDownLoad = "https://itunes.apple.com/cn/app/miao-kong-sheng-huo/id981787586?mt=8";
	}else if(appType == 'henghui'){//恒辉物业宝APP
		judge(appType);
		$("#imgg").attr("src","../static/20160601_openAPP/img/henghui.png");
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
			app = "henghui://"+urlName+"?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		} else if (u.indexOf('iPhone') > -1) {
			app = "HengHuiWuYeBao://webview?data={\"tag\":\""+tag+"\",\"id\":\""+mpid+"\"}";
		}
		AZAppDownLoad = "http://182.92.169.167:802/downhh.html";
		IOSAppDownLoad = "https://itunes.apple.com/cn/app/heng-hui-wu-ye-bao/id1065389697?mt=8";
	}
}
//判断打开的机器，手机微信和QQ打开显示遮罩层提示用户用手机浏览器打开，手机浏览器打开显示底部唤起按钮
function judge(appType){
	u = navigator.userAgent;
	if(appType != null || appType != ''){//手机浏览器，电脑
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('iPhone') > -1){//手机浏览器
			bottomShow();
		}else {//电脑
			
		}
	}else {//app
		
	}
}
//取传入参数判断app
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
 //微信提示用浏览器打开遮罩层
function bottomShow(){
	 $("#bottom").show();
 }
function bottomHide(){
	 $("#bottom").hide();
 }
  function hide(){
	 $("#zhezhao").hide();
 }
  //遮罩层显示，滚动条取消
  function show(){
	 $("#zhezhao").show();
	 $("body").css("overflow-y","hidden");
	 $('body').bind("touchmove",function(e){ e.preventDefault(); }); 
 }
 //判断浏览器，执行相应操作
function opApp() {
 u = navigator.userAgent;
 if(u.indexOf('MicroMessenger') > -1 || u.indexOf('QQ/') > -1) { //是否微信打开
	 show();
 }else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
	var timeout, t = 1000, hasApp = true;
	setTimeout(function () {
	    if (hasApp) {
	        $('#dl_app').hide();
	    } else {
	        $('#dl_app').show();
	        window.location = AZAppDownLoad; 
	    }
	}, 2000)
	function openApp() {
	    var t1 = Date.now();
	    var ifr = $('<iframe id="ifr" ></iframe>');
	    ifr.attr('src', app);
	    ifr.hide();
	    $('body').append(ifr);
	    timeout = setTimeout(function () {
	    	try_to_open_app(t1);
	    }, t);
	}
	function try_to_open_app(t1) {
	    var t2 = Date.now();
	    if (!t1 || t2 - t1 < t + 200) {
	        hasApp = false;
	    }
	}
	openApp();
 } else if (u.indexOf('iPhone') > -1) {//IOS
	 function applink(){   
	    window.location = app;
	        var clickedAt = +new Date;  
	         setTimeout(function(){
	             !window.document.webkitHidden && setTimeout(function(){ 
	                   if (+new Date - clickedAt < 2000){  
	                       window.location.href = IOSAppDownLoad;  
	                   }  
	             }, 500);
	         }, 1000)
		}
		applink();
 	}
 }