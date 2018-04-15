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






