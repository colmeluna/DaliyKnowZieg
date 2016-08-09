 var host = 'http://zhsq.isolomo.com.cn';
    //var host = 'http://192.168.0.187:8080';
   // var host = 'http://123.57.61.216:8080';
    //var host = 'http://localhost:8080';
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
    console.log("userid:"+userid);
    console.log("comid:"+comid);
	
    
    
    $(function () {
    	//关闭按钮动作绑定
		$("#close1").click(function(){
			$("#cover").hide();
			$("#weichouzhong_div").fadeOut(400);
		});
		$("#close2").click(function(){
			$("#cover").hide();
			$("#chouzhong_div").fadeOut(400);
		});
		$("#close3").click(function(){
			$("#cover").hide();
			$("#putongtishi_div").fadeOut(400);
		});
		$("#close4").click(function(){
			$("#cover").hide();
			$("#wodejilu_div").fadeOut(400);
		});
		//我的中奖纪录 点击事件 
		$(".wodejilu_btn").click(function () {
			if(userid==undefined){
				$("#cover").show();
				$("#putongtishi_div").fadeIn(400);
            	$("#tishitext").html("<a href='http://182.92.169.167:802/downts.html'>请点击 下载app</a>");
				return;
			}
			if(userid==null||userid==''){
				$("#cover").show();
				$("#putongtishi_div").fadeIn(400);
            	$("#tishitext").html("抱歉请先登录app");
				return;
			}
			
			//获取我的中奖信息 wodebingotext
			$.ajax({
                type: "GET",
                async : false,
                contentType: "application/json",
                url: host+'/miwc2/luckTurnHHFront/mybingo?request={"userid":"'+userid+'"}',
                success: function (data) {
                    var json = eval("(" + data + ")");
                    if (json.data.bingoname != ''&&json.data.bingoname!=null) 
					{
                    	if(json.data.bingoname!='谢谢参与'){
                    		var bingoname = json.data.bingoname;
    						$("#wodebingotext").html(bingoname);
                    	}
                    	else{
                    		$("#wodebingotext").html("您未抽中奖品");
                    	}
					}
                    else{
                    	$("#wodebingotext").html("您还没有抽奖记录");
                    }
                }

            });
			$("#cover").show();
			$("#wodejilu_div").fadeIn(400);
        });
		
		//开始加载  获奖数据
		$.ajax({
            type: "GET",
            async : false,
            contentType: "application/json",
            url: host+'/miwc2/luckTurnHHFront/returnBingoList',
            success: function (data) {
                var json = eval("(" + data + ")");
                if (json.data != "") 
				{
					for ( var i = 0; i < json.data.length; i++) {
						var phone = json.data[i].phone; 
						var mphone =phone.substr(3,4);
			            var lphone = phone.replace(mphone,"****");
						var name  = json.data[i].bingoname;
						var time  = json.data[i].bingotime;
						//alert(" phone:"+phone+" name:"+name+" time:"+time);
						$("#jilu_list").append(
								 " <li><div class='telephone'>"+lphone+"</div>"
                   					 +"<div class='jiangpin'>"+name+"</div>"
                  					  +"<div class='zhongjiang_time'>"+time+"</div></li>"
								);
					}
				}
            }

        });
		
		
        var rotateTimeOut = function () {
            $('#rotate').rotate({
                angle: 0,
                animateTo: 2160,
                duration: 8000, //旋转时间 
                callback: function () {
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        };
        var bRotate = false;

        var rotateFn = function (item, angles, txt) {
            bRotate = !bRotate;
            $('#rotate').stopRotate();
            $('#rotate').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 1400,//旋转时间 
                callback: function () {
                    bRotate = !bRotate;
                    if (item != 6 ) { //中了
                    	$("#cover").show();
                        $("#chouzhong_div").fadeIn(400);
                        $("#bingoBox").text('【 ' + txt + ' 】'); //给弹出窗内 bingoBox赋值 显示中了什么
                    }
                    else {//Meizhong
                    	$("#cover").show();
                        $("#weichouzhong_div").fadeIn(400);
                    }
                }
            })
        };

        $('.pointer').click(function () {
			if(userid==undefined){
				$("#cover").show();
				$("#putongtishi_div").fadeIn(400);
            	$("#tishitext").html("<a href='http://182.92.169.167:802/downts.html'>请点击 下载app</a>");
				return;
			}
			if(userid==null||userid==''){
				$("#cover").show();
				$("#putongtishi_div").fadeIn(400);
            	$("#tishitext").html("抱歉请先登录app");
				return;
			}	
            if (bRotate) return; //没有转完 禁止点击 

            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: host+'/miwc2/luckTurnHHFront/luck20160606?request={"userid":"'+userid+'","comid":"'+comid+'"}',
                success: function (data) {
                    var json = eval("(" + data + ")");
                    var flag = json.code; //0可以 1已经抽过了
                    var item;//中奖编号 
                    //flag = '0';//测试用 
                    if(flag=='0'){ //开始转盘 
                    	item = json.data.luckid;
                    	//alert(item);
                    	//临时
                    	/* if (json.luckid <= 4 && json.luckid >= 1) {
                            item = json.luckid;
                        }
                        else {
                            item = rnd(5, 8)
                        } */
                   // item = 6;//测试用 
                    //alert(item);
                        switch (item) {
                            case 1:
                                rotateFn(item, 20, '幻影星空体验票');
                                break;
                            case 2:
                                rotateFn(item, 150, '辣街养生汗蒸门票 ');
                                break;
                            case 3:
                                rotateFn(item, 250, '西山蝴蝶园儿童票');
                                break;
                            case 4:
                                rotateFn(item, 70, '创意科学预定课程');
                                break;
                            case 5:
                                rotateFn(item, 190, '儿童创意绘画预定课');
                                break;
                            case 6:
                                rotateFn(item, 310, '谢谢参与');
                                break;
                        }
                    }
                    else{//已经抽过 
                    	$("#cover").show();
                    	$("#putongtishi_div").fadeIn(400);
                    	$("#tishitext").html("抱歉您已经抽过了");
                    }
                }

            });
        });
    });
    function rnd(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n)
    }
	</script>
    <!--列表单双行背景颜色差异特效-->
    <script type="text/javascript">
        window.onload = function color() {//窗口加载时调用  
            var table = document.getElementById("jilu_list");//根据table的 id 属性值获得对象  
            var rows = table.getElementsByTagName("li");//获取table类型的tr元素的列表  
            for (var i = 0; i < rows.length; i++) {
                if (i % 2 == 0) {
                    rows[i].style.backgroundColor = "#fdaf27";
                }
                else {
                    rows[i].style.backgroundColor = "#e6810a";
                }
            }
        }
    </script>
    <!--记录超过10行滚动显示-->
    <script type="text/javascript">
        (function ($) {

            $.fn.myScroll = function (options) {
                //默认配置
                var defaults = {
                    speed: 40,  //滚动速度,值越大速度越慢
                    rowHeight: 37 //每行的高度
                };

                var opts = $.extend({}, defaults, options), intId = [];

                function marquee(obj, step) {

                    obj.find("ul").animate({
                        marginTop: '-=1'
                    }, 0, function () {
                        var s = Math.abs(parseInt($(this).css("margin-top")));
                        if (s >= step) {
                            $(this).find("li").slice(0, 1).appendTo($(this));
                            $(this).css("margin-top", 0);
                        }
                    });
                }

                this.each(function (i) {
                    var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
                    intId[i] = setInterval(function () {
                        if (_this.find("ul").height() <= _this.height()) {
                            clearInterval(intId[i]);
                        } else {
                            marquee(_this, sh);
                        }
                    }, speed);

                    _this.hover(function () {
                        clearInterval(intId[i]);
                    }, function () {
                        intId[i] = setInterval(function () {
                            if (_this.find("ul").height() <= _this.height()) {
                                clearInterval(intId[i]);
                            } else {
                                marquee(_this, sh);
                            }
                        }, speed);
                    });

                });

            }

        })(jQuery);

        $(function () {

            $("div.julu_content").myScroll({
                speed: 40,
                rowHeight: 37
            });
        });