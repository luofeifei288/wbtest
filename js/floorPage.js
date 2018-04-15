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
	function shrink(index, subH, subW, theValue, fn){
		var sub = ".subject[data-index="+index+"]";
		var text = $(sub + " .res .active").text();
		if($(sub).attr('tag')=='more'){
			text = floorPage.config.check.toString();
			if(floorPage.config.check.toString() == ""){
				text = "不知道";
			}
		}
		var len = text.visualLength();
		subW = subW - len - theValue * 2;
		var isclose = $(sub).data('state');
		// console.log(ev.currentTarget.data-index)
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
					$(sub + " .myanswer-wrap").text(floorPage.config.check.toString());
					$(sub + " .subject-title").hide();
					if(floorPage.config.check.toString() == ""){
						$(sub + " .myanswer-wrap").text("不知道");
					}
				}
				fn();
//				alert($('.a').offset().top)
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
	    
//		$(document).on('click', '.subject label', function(ev){
//			shrink($(this).data('index'), subH, subW, theValue);
//		});
//		shrink(index, subH, subW, theValue);
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
	
//	floorPage.selques()
	var floorPage={
		config:{
			'value1':null,    //question1
			'value2':null,
			'value3':null,
			'check':[]
		},
		evt:function(){
			$(document).on('click','.qqq1 .res label, .qqq1 .myanswer-wrap',function(e){
				
				floorPage.config.value1=$(this).text()   //选择
				$(this).addClass("active").siblings().removeClass("active");	
				if($('.qqq1 .subject').attr('onechance') == "true") {
					$('.qqq1 .subject').attr('onechance', false);
					$('.qqq1 .subject').attr('data-height', $('.qqq1 .subject').innerHeight());
				}
	//	   		
				$('.qqq1 .myanswer-wrap').removeClass('active');
				initData(1);
				$('.qqq2').css('display', 'block');
				if($('.qqq2 .subject').attr('onechance') == "true") {
					$('.qqq2').css('visibility','hidden');
				}
				
				shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
					setTimeout(function(){
						$('.qqq2').css('visibility','visible');
						getHeight('.qqq2');
						scrollToEnd();
					},700);
				});
			})
			$(document).on('click','.qqq2 .res label, .qqq2 .myanswer-wrap',function(e){
				
				floorPage.config.value2=$(this).text() 
				$(this).addClass("active").siblings().removeClass("active");
		   		
	//	   		$('html,body').animate({scrollTop:$('.a').offset().top}, 'slow');
				$('.qqq2 .myanswer-wrap').removeClass('active');
				initData(2);
				$('.qqq3').css('display','block')
				if($('.qqq3 .subject').attr('onechance') == 'true'){
					$('.qqq3').css('visibility','hidden');
				}
				shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
					setTimeout(function() {
						$('.qqq3').css('visibility','visible');
			   			getHeight('.qqq3');
			   			scrollToEnd();
					}, 700);
				});
			})
			$(document).on('click','.qqq3 .res label, .qqq3 .myanswer-wrap',function(e){
				floorPage.config.value3=$(this).text() 
				$(this).addClass("active").siblings().removeClass("active");
	//	   		$('html,body').animate({scrollTop:$('.a').offset().top}, 'slow');
				$('.qqq3 .myanswer-wrap').removeClass('active');
				initData(3);
				$('.qqq4').css('display','block')
				if($('.qqq4 .subject').attr('onechance') == 'true'){
					$('.qqq4').css('visibility','hidden');
				}
				shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
					setTimeout(function() {
						$('.qqq4').css('visibility','visible');
			   			getHeight('.qqq4');
			   			scrollToEnd();
		   			}, 700);
				});
			})
			$(document).on('click','.check-btn, .qqq4 .myanswer-wrap',function(e){
		   		initData(4);
		   		$('#addHeight').height($('.qqq4 .subject').data('height'));
		   		
		   		shrink($(e.target).parents('.subject').data('index'), $(e.target).parents('.subject').data('height'), $.fn.obj.subW, $.fn.obj.theValue, function(){
		   			setTimeout(function() {
//		   				$('#addHeight').hide();
						$('#addHeight').animate({'height':0});
		   				$('.finish').css('display','flex');
		   			}, 700);
		   		});
	//	   		$('html,body').animate({scrollTop:$('.a').offset().top}, 'slow');
//				console.log(floorPage.config.check.toString()+'1123123123')
//				$(".qqq4 .myanswer-wrap").text(floorPage.config.check.toString());
			})		
			$(document).on('click','.finish button',function(){
				window.location.href="result.html"
			})				
		},
		selques:function(fn){
			$.getJSON("../public/js/question.json",function(data){
				for(var v in data){						
					var name=v.split(',')
					var html=""
					if(name[1]=='sex'){
						$('.qqq1 .ques-sel-key').text(name[0]);
						for(var i=0,l=data[v].length;i<l;i++){
							html+='<label>'+data[v][i]+'</label>'
							$('.qqq1 .res').html(html)
						}
					}
					if(name[1]=='age'){
						$('.qqq2 .ques-sel-key').text(name[0]);
						for(var i=0,l=data[v].length;i<l;i++){
							$('.qqq2 .res').append('<label>'+data[v][i]+'</label>')
						}
					}
					if(name[1]=='wa'){
						$('.qqq3 .ques-sel-key').text(name[0]);
						for(var i=0,l=data[v].length;i<l;i++){
							$('.qqq3 .res').append('<label>'+data[v][i]+'</label>')
						}
					}
					if(name[1]=='fan'){
						$('.qqq4 .ques-sel-key').text(name[0]);
						for(var i=0,l=data[v].length;i<l;i++){
							html+='<label>'+
									'<input type="checkbox" name="vehicle" value="Bike" />'+
									'<span>'+data[v][i]+'</span>'+
								   '</label>'
							$('.qqq4 .res .checkbox-list').html(html)
						}
					}
				}
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
