/**
 *  shouye01源文件 
 */
function GetRequest(){var url=location.search;var theRequest=new Object();if(url.indexOf("?")!=-1){var str=url.substr(1);strs=str.split("&");for(var i=0;i<strs.length;i++){theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1])}}return theRequest}var Request=new Object();Request=GetRequest();var comid=Request["comid"];var userid=Request["userid"];$(function(){if(userid!=undefined){if($.cookie("userid")!=null){}else{$.cookie("userid",userid,{path:"/"})}}else{if($.cookie("userid")==null||$.cookie("userid")==undefined){$("#footer2").show();$("#footer1").hide()}}var url=host+'/miwc2/photoContest/PhotoContestFront/getPhotoContest?request={"userid":"'+userid+'","searchword":""}';ajaxData();ajaxCountData();ajaxViste();$("#gosearch").click(function(){var searchword=encodeURI(encodeURI($("#searchwords").val()));$("#photoList").empty();var url2=host+'/miwc2/photoContest/PhotoContestFront/getPhotoContest?request={"userid":"'+userid+'","searchword":"'+searchword+'"}';$.ajax({type:"GET",contentType:"application/json",url:url2,success:function(data){$("#searchwords").empty();var json=eval("("+data+")");if(json.data!=""){for(var i=0;i<json.data.length;i++){var id=json.data[i].id;var name=json.data[i].name;var photo=json.data[i].picurl;var votenum=json.data[i].votenum;$("#photoList").append("<li><div class='toupiao_div'><a href='xiangqing.html?id="+id+"'><img class='zuopin_img' src='"+photo+"'/></a>"+"<div class='toupiao_qingkuang'>"+"<span class='cansairen' id='cansairen_"+id+"'>"+name+"</span>"+"<span class='piaoshu'><span>"+votenum+"</span>票</span>"+"</div>"+"<div class='toupiao_btn' id='toupiao_"+id+"'>投票</div>"+"<div class='zuopinhao_beijing'><img src='images/hao_beijing.png'/>"+"<div class='zuopinhao'>"+"<p><span>"+id+"</span>号</p></div></div></div></li>")}}afterLoad()}})});function ajaxData(){$.ajax({type:"GET",contentType:"application/json",url:url,success:function(data){var json=eval("("+data+")");if(json.data!=""){for(var i=0;i<json.data.length;i++){var id=json.data[i].id;var name=json.data[i].name;var photo=json.data[i].picurl;var votenum=json.data[i].votenum;$("#photoList").append("<li><div class='toupiao_div'><a href='xiangqing.html?id="+id+"'><img class='zuopin_img' src='"+photo+"'/></a>"+"<div class='toupiao_qingkuang'>"+"  <span class='cansairen' id='cansairen_"+id+"'>"+name+"</span>"+"  <span class='piaoshu'><span>"+votenum+"</span>票</span>"+"     </div>"+"      <div class='toupiao_btn' id='toupiao_"+id+"'>投票</div>"+"    <div class='zuopinhao_beijing'><img src='images/hao_beijing.png' />"+"     <div class='zuopinhao'>"+"              <p><span>"+id+"</span>号</p> </div>  </div> </div>  </li>")}}afterLoad()}})}function afterLoad(){$(".toupiao_btn").each(function(){$(this).click(function(){var id=$(this).attr("id");var voteid=id.replace("toupiao_","");var cansairenName=$("#cansairen_"+voteid).text();console.log("cansairenName:"+cansairenName);if(userid!=undefined){ajaxVote(userid,voteid)}else{console.log("go download");$("#votecansairen").html(" 【"+cansairenName+"】 ");$("#cover").show();$("#doneall2").show()}})})}function ajaxVote(loginuser,voteid){$.ajax({type:"GET",contentType:"application/json",url:host+'/miwc2/photoContest/PhotoContestFront/submitVote?request={"id":"'+voteid+'","voteUserid":"'+loginuser+'"}',success:function(data){var json=eval("("+data+")");var code=json.code;if(code=="00"){$(".tishi_wenzi").empty().html("投票成功 ！");$("#cover").show();$("#doneall").show()}else{if(code="01"){$(".tishi_wenzi").empty().html("您今日已经投过了 ");$("#cover").show();$("#doneall").show()}else{$(".tishi_wenzi").empty().html("网络超时");$("#cover").show();$("#doneall").show()}}}})}function ajaxCountData(){$.ajax({type:"GET",contentType:"application/json",url:host+"/miwc2/photoContest/PhotoContestFront/getHomeDataCount",success:function(data){var json=eval("("+data+")");if(json.data!=""){var countuser=json.data.countuser;var countvote=json.data.countvote;var visitnumber=json.data.visitnumber;$("#baomingnum").html(countuser);$("#votednum").html(countvote);$("#vistednum").html(visitnumber)}}})}function ajaxViste(){$.ajax({type:"GET",contentType:"application/json",url:host+"/miwc2/photoContest/PhotoContestFront/updateVisitNumber",success:function(data){}})}$(".close").click(function(){$("#cover").hide();$("#doneall").hide();$("#doneall2").hide()})});$(function(){var divTop=$(".page-footer").css("bottom");var divHeight=$(".page-footer").outerHeight(true);$(".content").ready(function(){$(".content").css("bottom",divTop);$(".content").css("margin-bottom",divHeight);$(".content").css("display","block")})});$(function(){var $divWidth1=$(".zuopin_img").width();$(".zuopin_img").css("height",$divWidth1*380/560)}); 
function GetRequest() {
	var url = location.search; 
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}    
var Request = new Object();
Request = GetRequest();
var comid = Request['comid'];
var userid=Request['userid'];
$(function(){
	if(userid!=undefined){ //手机app内部打开  则设定 cookie 
		if($.cookie('userid')!=null){
    		 //alert($.cookie('userid'));
    	}
    	else{
    		$.cookie('userid',userid,{path:"/"});
    		// alert("ok set :"+$.cookie('userid'));
    	}
	}
	else{ //分享出去的 页面 则 点击投票  直接 打开下载页面 
		if($.cookie('userid')==null||$.cookie('userid')==undefined){
			$("#footer2").show();
    		$("#footer1").hide();
		}
		
	}
	//初始加载
	var url = host+'/miwc2/photoContest/PhotoContestFront/getPhotoContest?request={"userid":"'+userid+'","searchword":""}';
	ajaxData();
	ajaxCountData();
	
	ajaxViste();
	//搜索框搜索 
	$("#gosearch").click(function(){ 
		var searchword = encodeURI(encodeURI($("#searchwords").val()));
    	$("#photoList").empty();
    	var url2 = host+'/miwc2/photoContest/PhotoContestFront/getPhotoContest?request={"userid":"'+userid+'","searchword":"'+searchword+'"}';
    	$.ajax({
			type : "GET",
			contentType : "application/json",
			url : url2,
			success : function(data) {
					$("#searchwords").empty();
					var json = eval("(" + data + ")");
					if (json.data != "") 
					{
						for ( var i = 0; i < json.data.length; i++) {
							var id = json.data[i].id;
							var name = json.data[i].name; 
							var photo = json.data[i].picurl;
							var votenum = json.data[i].votenum;
							$("#photoList").append(
									 "<li><div class='toupiao_div'><a href='xiangqing.html?id="+id+"'><img class='zuopin_img' src='"+photo+"'/></a>"
				                      +"<div class='toupiao_qingkuang'>"
				                      +"<span class='cansairen' id='cansairen_"+id+"'>"+name+"</span>"
				                      +"<span class='piaoshu'><span>"+votenum+"</span>票</span>"
				                      +"</div>"
				                      +"<div class='toupiao_btn' id='toupiao_"+id+"'>投票</div>"
				                      +"<div class='zuopinhao_beijing'><img src='images/hao_beijing.png'/>"
				                      +"<div class='zuopinhao'>"
				                      +"<p><span>"+id+"</span>号</p></div></div></div></li>"
									);
						}
					}
					afterLoad();
				}
			});
	});
	
	//获取 首页作品列表 
	function ajaxData(){
    	$.ajax({
			type : "GET",
			contentType : "application/json",
			url : url,
			success : function(data) {
						var json = eval("(" + data + ")");
						if (json.data != "") 
						{
							for ( var i = 0; i < json.data.length; i++) {
								var id = json.data[i].id;
								var name = json.data[i].name; 
								var photo = json.data[i].picurl;
								var votenum = json.data[i].votenum;
								$("#photoList").append(
										 "<li><div class='toupiao_div'><a href='xiangqing.html?id="+id+"'><img class='zuopin_img' src='"+photo+"'/></a>"
					                      +"<div class='toupiao_qingkuang'>"
					                      +"  <span class='cansairen' id='cansairen_"+id+"'>"+name+"</span>"
					                      +"  <span class='piaoshu'><span>"+votenum+"</span>票</span>"
					                      +"     </div>"
					                      +"      <div class='toupiao_btn' id='toupiao_"+id+"'>投票</div>"
					                      +"    <div class='zuopinhao_beijing'><img src='images/hao_beijing.png' />"
					                      +"     <div class='zuopinhao'>"
					                      +"              <p><span>"+id+"</span>号</p> </div>  </div> </div>  </li>"
										
										);
							}
						}
		        		afterLoad();
					}
    	 
   		 		});
	}
	//ajax加载结束 绑定div click事件 进行投票
  	function afterLoad()  
  	{  
  	    	$(".toupiao_btn").each(function(){ 
    			$(this).click(function(){
    				var id = $(this).attr('id');
    				//alert("当前投票用户为："+userid+" 被投票的作品id为 ："+id);
    				var voteid = id.replace("toupiao_","");
    				var cansairenName = $("#cansairen_"+voteid).text();
    				
    				console.log("cansairenName:"+cansairenName);	
        				if(userid!=undefined){ //后缀有userid 则去ajax提交 
        					ajaxVote(userid,voteid);
        				}
        				else{ //否则  直接打开 app下载页面 
							console.log("go download");	
						    $("#votecansairen").html(" 【"+cansairenName+"】 "); 
							$("#cover").show();
							$("#doneall2").show();
        				}
    				}); 
    			});
  	}  
	function ajaxVote(loginuser,voteid){
		$.ajax({
			type : "GET",
			contentType : "application/json",
			url : host+'/miwc2/photoContest/PhotoContestFront/submitVote?request={"id":"'+voteid+'","voteUserid":"'+loginuser+'"}',
			success : function(data) {
					//alert("voted good");
						var json = eval("(" + data + ")");
						var code = json.code;
						if(code=='00'){//投票成功
							$(".tishi_wenzi").empty().html("投票成功 ！");
							$("#cover").show();
							$("#doneall").show();
						}
						else if(code = '01'){//已经投过了
							$(".tishi_wenzi").empty().html("您今日已经投过了 ");
							$("#cover").show();
							$("#doneall").show();
						}
						else{//服务器异常稍候再试 
							$(".tishi_wenzi").empty().html("网络超时");
							$("#cover").show();
							$("#doneall").show();
						}
				}
			});
	}
	//获取首页 参数 
	function ajaxCountData(){
		$.ajax({
			type : "GET",
			contentType : "application/json",
			url : host+'/miwc2/photoContest/PhotoContestFront/getHomeDataCount',
			success : function(data) {
					var json = eval("(" + data + ")");
					if (json.data != "") 
					{
						var countuser = json.data.countuser;
						var countvote = json.data.countvote;
						var visitnumber = json.data.visitnumber;
						$("#baomingnum").html(countuser);
						$("#votednum").html(countvote);
						$("#vistednum").html(visitnumber);
					}
				}
			});
	}
	//修改 访问次数 
	function ajaxViste(){
		$.ajax({
			type : "GET",
			contentType : "application/json",
			url : host+'/miwc2/photoContest/PhotoContestFront/updateVisitNumber',
			success : function(data) {
					
				}
			});
	}
	
	 //关闭按钮
    $(".close").click(function () {
            $("#cover").hide();
            $("#doneall").hide();
            $("#doneall2").hide();
    });
});        	
$(function () {
    var divTop = $(".page-footer").css("bottom");
    var divHeight = $(".page-footer").outerHeight(true);
    $(".content").ready(function () {
        $(".content").css("bottom", divTop);
        $(".content").css("margin-bottom", divHeight);
        $(".content").css("display", "block");
    })
});
$(function () {
    var $divWidth1 = $('.zuopin_img').width();
    $(".zuopin_img").css('height', $divWidth1 * 380 / 560);
});
        
        
        /**
         * paihang02源文件
         */
     // var host = 'http://zhsq.isolomo.com.cn';
        //var host = 'http://192.168.0.187:8080';
         var host = 'http://123.57.61.216:8080';    
      	//  var host = 'http://localhost:8080';
         
         $(document).ready(function(){if($.cookie("userid")!=null){$("#footer2").hide();$("#footer1").show()}else{$("#footer2").show();$("#footer1").hide()}var url=host+"/miwc2/photoContest/PhotoContestFront/getRankInfo";$(function(){$.ajax({type:"GET",contentType:"application/json",url:url,success:function(data){var json=eval("("+data+")");$.each(json.infodata,function(index,json){document.getElementById("name"+index).innerText=json.name;document.getElementById("pid"+index).innerText=json.pid;document.getElementById("votenumber"+index).innerText=json.votenumber;if(index>2){document.getElementById("paiming_li"+index).style.display=""}})}})})});$(function(){var divTop=$(".page-footer").css("bottom");var divHeight=$(".page-footer").outerHeight(true);$(".content").ready(function(){$(".content").css("bottom",divTop);$(".content").css("margin-bottom",divHeight);$(".content").css("display","block")})});$(function(){var $divWidth1=$(".box1 img").width();$(".box1 img").css("height",$divWidth1);var $divWidth2=$(".box2 img").width();$(".box2 img").css("height",$divWidth2);var $divWidth3=$(".box3 img").width();$(".box3 img").css("height",$divWidth3)});
         $(document).ready(function(){
 			if($.cookie('userid')!=null){
 				$("#footer2").hide();
 	    		$("#footer1").show();
 			}
 			else{
 				$("#footer2").show();
 	    		$("#footer1").hide();
 			}
         	var url = host+'/miwc2/photoContest/PhotoContestFront/getRankInfo';
 	      	$(function(){
 	      		$.ajax({
 					type : "GET",
 					contentType : "application/json",
 					url : url,
 					success : function(data) {
 	      				var json = eval("(" + data + ")");
 		      			//alert(json.code);
 						
 						$.each(json.infodata, function(index, json) { 
 						//alert(index+json.name);
 							document.getElementById("name"+index).innerText = json.name;
 							document.getElementById("pid"+index).innerText = json.pid;
 							document.getElementById("votenumber"+index).innerText = json.votenumber;
 							if(index>2){
 								document.getElementById("paiming_li"+index).style.display="";
 							}
 						});
 					}
 				}); 
 	      	});
         });
     
         $(function () {
             var divTop = $(".page-footer").css("bottom");
             var divHeight = $(".page-footer").outerHeight(true);
             $(".content").ready(function () {
                 $(".content").css("bottom", divTop);
                 $(".content").css("margin-bottom", divHeight);
                 $(".content").css("display", "block");
             })
         });
         $(function () {
             //图片比例限制
             var $divWidth1 = $('.box1 img').width();
             $(".box1 img").css('height', $divWidth1);
             var $divWidth2 = $('.box2 img').width();
             $(".box2 img").css('height', $divWidth2);
             var $divWidth3 = $('.box3 img').width();
             $(".box3 img").css('height', $divWidth3);
         });
            
            /**
             * baoming03源文件
             */
         $(function(){var userid=$.cookie("userid");if(userid!=null){$("#userid").val(userid)}else{$("#tijiaobtn").hide()}$("#tijiaobtn").click(function(){var name=$("#name").val();var tel=$("#phone").val();var file=$("#fileToUpload").val();if(!name){$(".tishi_wenzi").empty().html("姓名不能为空");$("#cover").show();$("#doneall").show();return false}if(!tel.match(/^1\d{10}$/g)){$(".tishi_wenzi").empty().html("手机号码格式不正确");$("#cover").show();$("#doneall").show();return false}if(!file){$(".tishi_wenzi").empty().html("请选择作品图片");$("#cover").show();$("#doneall").show()}else{$("#inputForm").submit()}});(function($){$.getUrlParam=function(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(reg);if(r!=null){return unescape(r[2])}return null}})(jQuery);var repage=$.getUrlParam("repage");if(repage!=null){$("#cover").show();$("#doneall").show()}$("#close").click(function(){$("#cover").hide();$("#doneall").hide()});var $divWidth1=$(".square img").width();$(".square img").css("height",$divWidth1);var $divWidth2=$(".square").width();$(".square").css("height",$divWidth2);var divTop=$(".page-footer").css("bottom");var divHeight=$(".page-footer").outerHeight(true);$(".content").ready(function(){$(".content").css("bottom",divTop);$(".content").css("margin-bottom",divHeight);$(".content").css("display","block")})});function preview2(file){var reader=new FileReader();reader.onload=function(e){var img=$("<img>").attr("src",e.target.result);$("#preview").empty().append(img)};reader.readAsDataURL(file)}$(function(){$("[type=file]").change(function(e){var file=e.target.files[0];preview2(file)})});
         $(function () {
         	/* var imgArray ;
         	$('#fileToUpload').localResizeIMG({
         	      width: 400,
         	      quality: 1,
         	      success: function (result) { 
         	    	$("#basepic").val(result.clearBase64);
         	    	var oo = $("#basepic").val();
         	    	//alert(oo);
         	    	  //alert(result.clearBase64);
         			  /* var submitData={
         					base64_string:result.clearBase64, 
         				};   
         	      }
         	  }); 
         	 */	
         	 var userid = $.cookie('userid');
         	// alert(userid);
         	 if(userid!=null&&userid!=undefined){
         		 $("#userid").val(userid);
         	 }
         	 else{
         		 $("#tijiaobtn").hide();
         	 }
         	 
             	$("#tijiaobtn").click(function(){
             		var name = $("#name").val();
             		var tel = $("#phone").val();
             		var file = $("#fileToUpload").val();
             		 if(!name){
             			 $(".tishi_wenzi").empty().html("姓名不能为空");
     					 $("#cover").show();
     					 $("#doneall").show();
                        // alert("姓名不能为空");
                          return false;
                      }
                      if (!tel.match(/^1\d{10}$/g)) {
                     	 $(".tishi_wenzi").empty().html("手机号码格式不正确");
     					 $("#cover").show();
     					 $("#doneall").show();
                     	// alert("手机号码格式不正确");
                        //  $('[name=tel]').focus();
                          return false;
                      }
                      if(!file){
                     	// alert("请选择作品图片");
                     	 $(".tishi_wenzi").empty().html("请选择作品图片");
     					 $("#cover").show();
     					 $("#doneall").show();
                      }
                      else{
                     	 $("#inputForm").submit();
                      }
             	});
             	
             	(function ($) {
                     $.getUrlParam = function (name) {
                         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                         var r = window.location.search.substr(1).match(reg);
                         if (r != null) return unescape(r[2]); return null;
                     }
                 })(jQuery);
             	
             	//方法二：
                 var repage = $.getUrlParam('repage');
     			if(repage!=null){
     				//alert("恭喜你 参与成功 ");
     				//开启遮罩层  + 成功提示 
     				$("#cover").show();
     				$("#doneall").show();
     			} 
     			
     			$("#close").click(function () {
                     $("#cover").hide();
                     $("#doneall").hide();
                  });
     			
     			//样式js 固定 
     			var $divWidth1 = $('.square img').width();
            		$(".square img").css('height', $divWidth1);
           		var $divWidth2 = $('.square').width();
           		$(".square").css('height', $divWidth2);
     			
                 var divTop = $(".page-footer").css("bottom");
                 var divHeight = $(".page-footer").outerHeight(true);
                 $(".content").ready(function () {
                     $(".content").css("bottom", divTop);
                     $(".content").css("margin-bottom", divHeight);
                     $(".content").css("display", "block");
                 })
             });
         
         
         function preview2(file) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 var img = $('<img>').attr("src", e.target.result);//width="50" height="50"
                /*  img.attr("width",50);
                 img.attr("height",50); */
                 $('#preview').empty().append(img);
             }
             reader.readAsDataURL(file);
         }
         $(function() {
             $('[type=file]').change(function(e) {
                 var file = e.target.files[0];
                 preview2(file);
                 
             })
         });