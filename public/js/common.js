remFn(10);
function remFn(num) {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / num + 'px';
}
window.onresize = function() {
    remFn(10);
}
//关闭页面
function swClosePage(val){
	var param=spValue('MclosePage');
	if(param){
		var lPage=param.split(',');
		if(lPage.length){
			for(var i=0,l=lPage.length;i<l;i++){
				closePage({
					id:lPage[i],
					d:10,
					slide:'none'
				});
			}
		}
	} 
}
//获取JSON数据长度
function getJsonLength(jsonData){
   var jsonLength = 0;
   for(var item in jsonData){
      jsonLength++;
   }
   return jsonLength;
}
function selquestion(data){
	var html=""
	var str=""
	for(var key in data){
		var name=key.split(',')
		if(name[2]=='ox'){
			html='<div id="qqq'+name[3]+'" class="question-area" style="height: auto;display: none;">'+		
							'<div class="question mt-10">'+
								'<div class="ques-sel ml-50 fx">'+
									'<div class="ques-sel-tit">'+
										'<img src="../img/tit.jpg"/>'+
									'</div>'+
									'<div class="ml-30 fx">'+
										'<div class="arrow-left">'+
										'</div>'+						
										'<div class="ques-sel-key">'+
		
										'</div>'+						
									'</div>'+
								'</div>'+
								'<div class="subject" data-index="'+name[3]+'" data-state=true onechance=true>'+
									'<div class="res fx" style="display: block;">'+
		
									'</div>'+
									'<div class="myanswer-wrap" style="display: none;">'+
										'<span class="user-text"></span>'+
									'</div>'+
								'</div>'+						
							'</div>'+
						'</div>'
			$('.questionitem').append(html)
			$('#qqq'+name[3]+' .ques-sel-key').text(name[0]);
			for(var i=0,l=data[key].length;i<l;i++){
				$('#qqq'+name[3]+' .res').append('<label>'+data[key][i]+'</label>')
			}		
		}
		if(name[2]=='mx'){
			str='<div id="qqq'+name[3]+'" class="mt-40 question-area" style="margin-bottom: 0.4rem;display: none;">'+
							'<div class="question">'+
								'<div class="ques-sel ml-50 fx">'+
									'<div class="ques-sel-tit">'+
										'<img src="../img/tit.jpg"/>'+
									'</div>'+
									'<div class="ml-30 fx">'+
										'<div class="arrow-left">'+
										'</div>'		+			
										'<div class="ques-sel-key">'+
											
										'</div>'+							
									'</div>'+
								'</div>'+
								'<div class="subject" data-index="'+name[3]+'" data-state=true tag="more" onechance=true>'+
									'<div class="subject-title">'+
										'<span>多项选择</span>'+
									'</div>'+
									'<div class="moresel checkbox" style="display: block;">'+
										'<div class="checkbox-list">'+
																		
										'</div>'+
										'<div class="check-btn">'+
											'<button data-name="btn">没有或不知道</button>'+
										'</div>'+									
									'</div>'+
									'<div class="myanswer-wrap" style="display: none;">'+
										'<span class="user-text"></span>'+
									'</div>'+							
								'</div>'+
							'</div>'+
						'</div>'
			$('.questionitem').append(str)
			$('#qqq'+name[3]+' .ques-sel-key').text(name[0]);
			for(var i=0,l=data[key].length;i<l;i++){
				$('#qqq'+name[3]+' .moresel .checkbox-list').append(
					'<label>'+
						'<input type="checkbox" name="vehicle" value="Bike" />'+
						'<span>'+data[key][i]+'</span>'+
					'</label>')
			}				
		}		
	}	
}






