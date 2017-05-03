var codes="qwertyuiopasdfghjklzxcvbnm";
var corpse=["c1.png","c2.png","c3.png","c4.png","c5.png","c6.png","c7.png"];
var guihunshuzu=[];
var fenshu=0;
var nandu="18";
var chanshengguihun=1000;
var yisu=100;
var time=60;
//开始游戏
function startGame(){
	var welcomeImgid=document.getElementById("welcomeImg");
	welcomeImgid.style.display="none";
	document.getElementById("playImg").style.display="block";
	//console.debug(mainDiv.style);
	
	//产生倒计时div
	var daojishi=document.createElement("div");
	document.getElementById("playImg").appendChild(daojishi);
	daojishi.className="daojishi";
	daojishi.id="daojishi";
	daojishi.style.display="block";
	time=time-1;
	daojishiID=setInterval(refreshTime,1000);
	//计时器动态产生鬼魂
	chanshenID=setInterval(creatguihun,chanshengguihun);
	yidongID=setInterval(moveguihun,yisu);
	}

//游戏倒计时
function refreshTime(){
		var daojishi=document.getElementById("daojishi");
		daojishi.innerHTML=time--;
		if(time<1){
			document.getElementById("words").innerHTML="";

			guihunshuzu.splice(0,guihunshuzu.length);
	
			clearInterval(chanshenID);
			clearInterval(yidongID);
			clearInterval(daojishiID);
	
			//重置计时器div
			document.getElementById("daojishi").innerHTML=time;

		   alert("时间到！！！"+"\n"+"总计得分="+fenshu);
		   backToMain();
	    } 
	}

//产生鬼魂方法
function creatguihun(){
		var guihunDiv=document.createElement("div");
		guihunDiv.className="guihun";	
		guihunDiv.style.background="url(img/corpse/"+corpse[parseInt(Math.random()*6)]+")";//"url(img/corpse/c11.gif"
		
		//获取屏幕高度
		var clientHeight=document.documentElement.clientHeight;
		//随机产生上边距
		guihunDiv.style.top=10+(Math.random()*(clientHeight-10-160))+"px";
		document.getElementById("words").appendChild(guihunDiv);
		//把产生的鬼魂放入缓存
		guihunshuzu.push(guihunDiv);
		
		//随机产生字母
		/*
		var suijishuzu=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		guihunDiv.innerHTML=suijishuzu[(Math.random()*26+"").split(".",1)].toLocaleUpperCase();
		//guihunDiv.innerHTML=suijishuzu[parseInt(Math.random()*26)].toLocaleUpperCase();
		*/
		var index=parseInt(Math.random()*codes.length);
		guihunDiv.innerHTML=codes.charAt(index).toLocaleUpperCase();
	}
	
//移动鬼魂方法
function moveguihun(){
		//遍历每个鬼魂
		for(i=0;i<guihunshuzu.length;i++){
				var guihun=guihunshuzu[i];
				var right = parseInt(guihun.style.right || 10);	
				//获得屏幕宽度
				var clientWidth = document.documentElement.clientWidth;			
				if(right<clientWidth-300){//没超过屏幕
					//guihun.style.bottom=parseInt(guihun.style.bottom.split("p",1))+10+"px";
					guihun.style.right=right+10+"px";
				}
				else{//鬼魂即将超过屏幕
					//删除页面上的鬼魂
					document.getElementById("words").removeChild(guihun);
					//删除缓存中的鬼魂
					guihunshuzu.splice(i,1);
				}
			}	
	}

//键盘消除鬼魂
function key(e){
		//获取键盘点击的内容
		var keyCode=e.keyCode;
		//把键盘转换成字符串
		var codeStr=String.fromCharCode(keyCode);
		//匹配键盘内容和鬼魂字母
		for(i=0;i<guihunshuzu.length;i++){
			var guihun=guihunshuzu[i];
			var gunhunCode=guihun.innerHTML;
			//判断一样
			if(gunhunCode==codeStr){
				fenshu++;
				//删除鬼魂
				document.getElementById("words").removeChild(guihun);
				guihunshuzu.splice(i,1);
				//跳出循环
				break;
			}
		}
	}
//键盘事件启动
document.onkeydown=key;
	
//返回主界面
function backToMain(){
	document.getElementById("welcomeImg").style.display="block";
	document.getElementById("playImg").style.display="none";
	//清楚已经产生的所有鬼魂
	document.getElementById("words").innerHTML="";
	guihunshuzu.splice(0,guihunshuzu.length);
	
	clearInterval(chanshenID);
	clearInterval(yidongID);
	clearInterval(daojishiID);
	
	//重置计时器div
	document.getElementById("daojishi").innerHTML="60";
	time=60;
	}
	
//暂停菜单
function suspend(){
	//创建暂停菜单
	var zanting=document.createElement("div");
	zanting.id="zanting";
	zanting.className="zanting";
	zanting.style.zIndex=9024;
	
	//模糊
	var mohu=document.createElement("div");
	mohu.id="mohu";
	mohu.style.opacity=0.40;//透明化
	//console.debug(mohu);
	
	document.getElementById("words").appendChild(mohu);
	document.getElementById("words").appendChild(zanting);
	document.onkeydown="";
	
	//继续游戏按钮
	var jixu=document.createElement("img");
	jixu.id="jixu";
	jixu.src="img/37.png";
	//为继续游戏按钮添加功能
	jixu.onmousedown=function(){jixu.src="img/36.png"}
	jixu.onmouseup=function(){jixu.src="img/37.png"}
	jixu.onclick=function(){
		//键盘消除鬼魂
		document.onkeydown=key;
		
		daojishiID=setInterval(refreshTime,1000);
		//计时器动态产生鬼魂
		chanshenID=setInterval(creatguihun,chanshengguihun);
		yidongID=setInterval(moveguihun,yisu);
		//删除暂停菜单div
		document.getElementById("words").removeChild(zanting);
		document.getElementById("words").removeChild(mohu);
	}
		
	//停止游戏按钮
	var tingzhi=document.createElement("img");
	tingzhi.id="tingzhi";
	tingzhi.src="img/39.png";
	//为停止按钮添加功能
	tingzhi.onmousedown=function(){tingzhi.src="img/38.png"}
	tingzhi.onmouseup=function(){tingzhi.src="img/39.png"}
	tingzhi.onclick=function(){
		//键盘消除鬼魂
		document.onkeydown=key;
		
		document.getElementById("welcomeImg").style.display="block";
		document.getElementById("playImg").style.display="none";
		document.getElementById("words").removeChild(zanting);
		document.getElementById("words").removeChild(mohu);
		
		//清除已经产生的所有鬼魂
		document.getElementById("words").innerHTML="";
		guihunshuzu.splice(0,guihunshuzu.length);
	
		//重置计时器div
		time=60;
		document.getElementById("daojishi").innerHTML=time;
		
		//console.debug("清除计时器");
		//清除计时器
		clearInterval(chanshenID);
		clearInterval(yidongID);
		clearInterval(daojishiID);
		
	}
		
	//将继续游戏和停止按钮加到暂停菜单上
	document.getElementById("zanting").appendChild(jixu);
	document.getElementById("zanting").appendChild(tingzhi);
		
	//清除计时器
	clearInterval(chanshenID);
	clearInterval(yidongID);
	clearInterval(daojishiID);
}

//设置菜单
function install(){
	//创建设置菜单
	var shezhi=document.createElement("div");
	shezhi.id="shezhi";
	shezhi.className="shezhi";
	shezhi.style.zIndex=9024;
	
	//模糊
	var mohu=document.createElement("div");
	mohu.id="mohu";
	mohu.style.opacity=0.40;//透明化
	
	document.getElementById("words").appendChild(mohu);
	document.getElementById("words").appendChild(shezhi);
	document.onkeydown="";
	
	//级别
	var jibie=document.createElement("img");
	jibie.id="jibie";
	jibie.src="img/33.png";
	
	//左按钮
	var left=document.createElement("img");
	left.id="leftBtn";
	left.src="img/15.png";
	//为左按钮添加功能
	left.onmousedown=function(){left.src="img/14.png"}
	left.onmouseup=function(){left.src="img/15.png"}
	left.onclick=function(){
		if(parseInt(nandu)>18){
			nandu--;
			dengji.src="img/"+nandu+".png";		
		}
	}
		
	//等级按钮
	var dengji=document.createElement("img");
	dengji.id="dengji";
	dengji.src="img/"+nandu+".png";
	
	//右按钮
	var right=document.createElement("img");
	right.id="rightBtn";
	right.src="img/17.png";
	//为右按钮添加功能
	right.onmousedown=function(){right.src="img/16.png"}
	right.onmouseup=function(){right.src="img/17.png"}
	right.onclick=function(){
		if(parseInt(nandu)<20){
			nandu++;
			dengji.src="img/"+nandu+".png";	
		}
	}
	
	//游戏时间按钮
	var youxitime=document.createElement("img");
	youxitime.id="youxitime";
	youxitime.src="img/34.png";
	
	//游戏时间文本框
	var txt=document.createElement("input");
	txt.id="txt";
	txt.setAttribute("type", "text"); 
	
	//设置按钮
	var shezhiBtn=document.createElement("img");
	shezhiBtn.id="shezhiBtn";
	shezhiBtn.src="img/41.png";
	//为设置按钮添加功能
	shezhiBtn.onmousedown=function(){shezhiBtn.src="img/40.png"}
	shezhiBtn.onmouseup=function(){shezhiBtn.src="img/41.png"}
	shezhiBtn.onclick=function(){		
		//键盘消除鬼魂
		document.onkeydown=key;
				
		//点击设置后清空计时器div
		document.getElementById("daojishi").innerHTML="";
		//设置游戏难度等级
		//console.debug("当前难度:"+nandu);
		switch(nandu){
				case 18:
					chanshengguihun=1000;
					yisu=100;
					break;
				case 19:
					chanshengguihun=500;
					yisu=100;
					break;
				case 20:
					chanshengguihun=500;
					yisu=80;
					break;
			}
		//设置游戏时间长短
		//console.debug(document.getElementById("txt").value);
		if(document.getElementById("txt").value!=0){
			time=document.getElementById("txt").value-1;
		}else{
			time=59;
			}
		document.getElementById("words").innerHTML="";
		guihunshuzu.splice(0,guihunshuzu.length);
		
		//console.debug("鬼魂产生速度:"+chanshengguihun);

		daojishiID=setInterval(refreshTime,1000);
		chanshenID=setInterval(creatguihun,chanshengguihun);
		yidongID=setInterval(moveguihun,yisu);
	}
	
	//取消按钮
	var quxiaoBtn=document.createElement("img");
	quxiaoBtn.id="quxiaoBtn";
	quxiaoBtn.src="img/43.png";
	//为取消按钮添加功能
	quxiaoBtn.onmousedown=function(){quxiaoBtn.src="img/42.png"}
	quxiaoBtn.onmouseup=function(){quxiaoBtn.src="img/43.png"}
	quxiaoBtn.onclick=function(){
		daojishiID=setInterval(refreshTime,1000);
		//计时器动态产生鬼魂
		chanshenID=setInterval(creatguihun,chanshengguihun);
		yidongID=setInterval(moveguihun,yisu);
		//删除设置菜单div
		document.getElementById("words").removeChild(shezhi);
		document.getElementById("words").removeChild(mohu);
	}
	
	document.getElementById("shezhi").appendChild(jibie);
	document.getElementById("shezhi").appendChild(left);
	document.getElementById("shezhi").appendChild(dengji);
	document.getElementById("shezhi").appendChild(right);
	document.getElementById("shezhi").appendChild(youxitime);
	document.getElementById("shezhi").appendChild(txt);
	document.getElementById("shezhi").appendChild(shezhiBtn);
	document.getElementById("shezhi").appendChild(quxiaoBtn);
		
	//清除计时器
	clearInterval(chanshenID);
	clearInterval(yidongID);
	clearInterval(daojishiID);
}
	
	
	