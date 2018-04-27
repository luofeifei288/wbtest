$(document).ready(function(){			
	// 用 ruler 模拟且计算 myanswer-wrap 的宽度
	String.prototype.visualLength = function(){ 
		var ruler = $("#ruler"); 
		ruler.text(this); 
		return ruler[0].offsetWidth; 
	} 
	function scrollToEnd(){//滚动到底部
        $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 300); 
	}
	function shrink(index, subH, subW, theValue, fn, mark){
		var sub = ".subject[data-index="+index+"]";
		var text = $(sub + " .res .active").text();
		if($(sub).attr('tag')=='more'){
			text = floorPage.config.duoxuan[mark].toString();
			if(floorPage.config.duoxuan[mark].toString() == ""){
				text = "不知道";
			}
		}
		var len = text.visualLength();
		subW = subW - len - theValue * 2;
		var isclose = $(sub).data('state');
		var mgr = 2;
		if(subW <= 0){
			subW = 0;
			mgr = 0;
		}
		if(isclose){
			$(sub).animate({		
			    'margin-left': subW + 'px',
			    'margin-right': mgr + 'em',
			    'height': '2em'
			}, "slow", function(){
				$(sub).height("auto");
				$(sub).addClass("answer-complete-wrap");
				$(sub + " .res").hide();
				$(sub + " .myanswer-wrap").show();
				$(sub + " .myanswer-wrap").text($(sub + " .res .active").text());
				if($(sub).attr('tag')=='more'){
					$(sub +" .myanswer-wrap").text(floorPage.config.duoxuan[mark].toString());
					$(sub + " .subject-title").hide();
					$(sub + " .moresel").hide();
					if(floorPage.config.check.toString() == ""){
						$(sub + " .myanswer-wrap").text("不知道");
					}
				}
				fn();
			});
			$(sub + " .res").animate({
				opacity: 0
			})
			$(sub).data('state', false);
			
		}else{
			$(sub).animate({			
			    'margin-left':'0',
			    'margin-right':'0',
			    'height': subH + 'px'
			}, "slow", function(){
				$(sub).height("auto");
				$(sub).removeClass("answer-complete-wrap");
				$(sub + " .res").show();
				$(sub + " .moresel").show();
				$(sub + " .myanswer-wrap").hide();
				$(sub + " .myanswer-wrap").text('');
				if($(sub).attr('tag')=='more'){
					$(sub + " .subject-title").show();
				}
			});
			$(sub + " .res").animate({
				opacity: 1
			})
			$(sub).data('state', true);
		}
	}	
	
	function initData(index){
//		var subH = $(".subject[data-index="+index+"]").innerHeight();
		var subW = $(".subject[data-index="+index+"]").innerWidth();
		var fz = $(".subject[data-index="+index+"]").css("font-size");
		var reg = new RegExp("px","g");
	    var theValue = fz.replace(reg, "");
		$.fn.obj = {
//			'subH': subH,
			'subW': subW,
			'theValue': theValue
		}
	}
	
	function ArrayQueue(){
		var arr = [];
		//入队操作  
		this.push = function(element){  
	        arr.push(element);  
	        return true;  
	    }
		//出队操作  
		this.pop = function(){  
	        return arr.shift();  
	    }  
	}
	
	function getHeight(select){
		if($(select + ' .subject').attr('onechance') == "true"){
   			$(select + ' .subject').attr('onechance', false);
   			$(select + ' .subject').attr('data-height', $(select + ' .subject').innerHeight());
   		}
	}
	
	var que = new ArrayQueue();

	var floorPage={
		config:{
			'radio':{},
			'check':[],
			'duoxuan':{}
		},
		//选项单击事件
		evt:function(){
			//单击事件
			$.getJSON("../public/js/question.json",function(data){
				$.each(data,function(i){
					var name=i.split(',')
					var nub=parseInt(name[3])
					var mark=name[1]
					if(name[2]=='ox'){  //单选
						(function(nub){
							$(document).on('click','#qqq'+nub+' .res label, #qqq'+nub+' .myanswer-wrap',function(e){
								floorPage.config.radio[mark]=$(this).text()
								//console.log(floorPage.config.radio)
								localStorage[mark]=$(this).text()
								var nid=$(this).parents('#qqq'+nub+'')   //获取当前问题ID
								$(this).addClass("active").siblings().removeClass("active");
								if($('#qqq'+nub+' .subject').attr('onechance') == "true") {
									$('#qqq'+nub+' .subject').attr('onechance', false);
									$('#qqq'+nub+' .subject').attr('data-height', $('#qqq'+nub+' .subject').innerHeight());
								}
								$('#qqq'+nub+' .myanswer-wrap').removeClass('active');
								initData(nub);
								$(nid).next().css('display','block !important')  //显示下一个问题
								if($('#qqq'+(nub+1)+' .subject').attr('onechance') == "true") {
									$('#qqq'+(nub+1)+'').css('visibility','hidden');
								}
								shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
									setTimeout(function(){
										$('#qqq'+(nub+1)+'').css('visibility','visible');
										getHeight('#qqq'+(nub+1)+'');
										scrollToEnd();
									},700);
								});					
							})
						})(nub);							
					}
					if(name[2]=='mx'){   //多选
						(function(nub){
							$(document).on('click','#qqq'+nub+' .check-btn, #qqq'+nub+' .myanswer-wrap',function(e){
								var arr=[]
								
							    $('#qqq'+nub+' input[name="vehicle"]:checked').each(function(){			
							    	arr.push($(this).next().text())								
							    });
							    floorPage.config.duoxuan[mark]=arr
							    localStorage[mark]=arr
							    //console.log(floorPage.config.duoxuan)
								var nid=$(this).parents('#qqq'+nub+'')   //获取当前问题ID
								if($('#qqq'+nub+' .subject').attr('onechance') == "true") {
									$('#qqq'+nub+' .subject').attr('onechance', false);
									$('#qqq'+nub+' .subject').attr('data-height', $('#qqq'+nub+' .subject').innerHeight());
								}
								$('#qqq'+nub+' .myanswer-wrap').removeClass('active');
								initData(nub);
								$(nid).next().css('display','block !important')  //显示下一个问题
								if($('#qqq'+(nub+1)+' .subject').attr('onechance') == "true") {
									$('#qqq'+(nub+1)+'').css('visibility','hidden');
								}

								shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
									setTimeout(function(){
										$('#qqq'+(nub+1)+'').css('visibility','visible');
										getHeight('#qqq'+(nub+1)+'');
										scrollToEnd();
									},700);
								}, mark);					
							})
						})(nub);							
					}						
				})		
			})			
			$(document).on('click','.check-btn:last',function(){
				setTimeout(function(){
					$('.finish').removeClass('hide')
				},1000)
			})
			$(document).on('click','.finish button',function(){
				window.location.href="result.html"
			})				
		},
		selques:function(fn){
			$.getJSON("../public/js/question.json",function(data){
				selquestion(data)  //获取问题				
				fn();
			})
		},
		check:function(){
			$(document).on('click','.checkbox input',function(){				
				floorPage.config.check=[]
			    $('input[name="vehicle"]:checked').each(function(){
			    	floorPage.config.check.push($(this).next().text());
			    });	
				if($('.checkbox input').is(':checked')){
					$('.check-btn button').text("选好了")
				}else{
					$('.check-btn button').text("没有或不知道")
				}
			})
		}
	}
	floorPage.check()
	que.push(floorPage.selques);
	que.push(initData);
	que.push(floorPage.evt);
	var selques = que.pop();
	selques(function(){
		var initData = que.pop();
		initData(1);
		var evt = que.pop();
		evt();
	});	
})
