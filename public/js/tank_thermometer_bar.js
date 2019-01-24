//缺少屏幕自适应代码

		//socket模块和epics变量模块定义
		var serverIP="10.10.33.102";
		var socket = io.connect(serverIP+':80');
		var pvs = {
			tankBars:[
				{ pvname: "may:calcTo100"}, { pvname: "may:calcTo100P"}, { pvname: "may:calcTo1000" }]
		}

		/* start - angularJS script */
		var app = angular.module('myApp', []);
		app.controller('myCtrl', function ($scope, $http) {
			var myUrl = "http://47.100.41.42/epics_manual/manual?callback=JSON_CALLBACK";
			$http.jsonp(myUrl).success(function (response) {
				$scope.manual = response;
			});
		});

		/* start - 自定义服务Service => 计算以10为底x的对数:MathCalc.log(x) */
		app.service('MathCalc', function(){
			this.log = function(a){
				return Math.log(a)/Math.log(10);
			};
		});
		/* end - 自定义服务Service => 计算以10为底x的对数:MathCalc.log(x) */

		/* start - 自定义函数factory =>  修改指定id的svg元素的指定属性attr值val*/
		app.factory('SvgAttr', function(){
			var factory = {};
			factory.attr = function(id,attr,val){
				document.getElementById(id).setAttribute(attr,val);//rgb(246,136,46)
				return 0;
			};
			factory.textCont = function(id,text){
				document.getElementById(id).textContent=text;//rgb(246,136,46)
				return 0;
			};
			return factory;
		});
		/* end - 自定义函数factory =>  修改指定id的svg元素的指定属性attr值val*/

		/* start - factory - AddCtrl      <Vertical Bar> */
		app.factory('AddCtrl', function(){
			var factory = {};
			/* start - creatSVG */
			//size修改整个控件.取值要求：大于0（小于0时反转变化）
			//backColor修改控件背景色；color修改控件填充色
			//背景色/填充色输入要求为表示颜色的字符串，有四种表示方式：1. 三位十六进制数#f00; 2. 六位十六进制数#ff0000; 3. rgb(255,0,0)，括号是英文; 4. 表示颜色的单词,red.
			//表示颜色的单词:参考<HTML颜色名> http://www.runoob.com/tags/html-colorname.html
			//hihi,lolo,hi,lo: 取值范围：0-1。其中0表示0%，1表示100%.
			factory.addBarCtrl = function( maxVal, minVal, size, backColor, color, hihi, lolo, hi, lo ){
				var divDragBV=document.getElementById("svgDragBV");
				var barCtrl=document.createElementNS("http://www.w3.org/2000/svg","g");
				barCtrl.setAttribute("id","barCtrl");
				barCtrl.setAttribute("transform","matrix("+size+",0,0,"+size+",0,0)");
				svgDragBV.appendChild(barCtrl);

				var barCtrlRect1=document.createElementNS("http://www.w3.org/2000/svg","rect");
				barCtrlRect1.setAttribute("id","barCtrlRect1");
				barCtrlRect1.setAttribute("x","65");
				barCtrlRect1.setAttribute("y","17");
				barCtrlRect1.setAttribute("width","51");
				barCtrlRect1.setAttribute("height","201");
				barCtrlRect1.setAttribute("fill",backColor);
				barCtrlRect1.setAttribute("stroke","black");
				barCtrlRect1.setAttribute("stroke-width","0.75");
				barCtrl.appendChild(barCtrlRect1);

				var barCtrlRect2=document.createElementNS("http://www.w3.org/2000/svg","rect");
				barCtrlRect2.setAttribute("transform","matrix(1,0,0,-1,0,217.5)");
				barCtrlRect2.setAttribute("id","barCtrlRect2");
				barCtrlRect2.setAttribute("x","65.5");
				barCtrlRect2.setAttribute("y","0");
				barCtrlRect2.setAttribute("width","50");
				barCtrlRect2.setAttribute("height","87");
				barCtrlRect2.setAttribute("fill",color);
				barCtrl.appendChild(barCtrlRect2);

				var barCtrlRect3=document.createElementNS("http://www.w3.org/2000/svg","rect");
				barCtrlRect3.setAttribute("id","barCtrlRect3");
				barCtrlRect3.setAttribute("x","10");
				barCtrlRect3.setAttribute("y","5");
				barCtrlRect3.setAttribute("width","157");
				barCtrlRect3.setAttribute("height","220");
				barCtrlRect3.setAttribute("fill","none");
				// barCtrlRect3.setAttribute("stroke","rgb(246,136,46)");
				barCtrlRect3.setAttribute("stroke-width","3");
				barCtrl.appendChild(barCtrlRect3);

				var barCtrlPath1=document.createElementNS("http://www.w3.org/2000/svg","path");
				barCtrlPath1.setAttribute("id","barCtrlPath1");
				barCtrlPath1.setAttribute("transform","matrix(1,0,0,-1,65,217.5)");
				barCtrlPath1.setAttribute("fill","none");
				barCtrlPath1.setAttribute("stroke","black");
				barCtrlPath1.setAttribute("stroke-width","0.75");
				barCtrlPath1.setAttribute("d","M0 0h-6 m6 40h-6 m6 40h-6 m6 40h-6 m6 40h-6 m6 40h-6 M0 8h-3 m3 8h-3 m3 8h-3 m3 8h-3 M0 48h-3 m3 8h-3 m3 8h-3 m3 8h-3 M0 88h-3 m3 8h-3 m3 8h-3 m3 8h-3 M0 128h-3 m3 8h-3 m3 8h-3 m3 8h-3 M0 168h-3 m3 8h-3 m3 8h-3 m3 8h-3");
				barCtrl.appendChild(barCtrlPath1);

				var barText1=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText1.setAttribute("id","barText1");
				barText1.setAttribute("x","56");
				barText1.setAttribute("y","220");
				barText1.setAttribute("font-size","12");
				barText1.setAttribute("font-family","Microsoft YaHei UI");
				barText1.setAttribute("fill","#333333");
				barText1.setAttribute("stroke","#333333");
				barText1.setAttribute("stroke-width","0.25");
				barText1.setAttribute("text-anchor","end");
				barText1.textContent=minVal;
				barCtrl.appendChild(barText1);
				var barText2=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText2.setAttribute("id","barText2");
				barText2.setAttribute("x","56");
				barText2.setAttribute("y","180");
				barText2.setAttribute("font-size","12");
				barText2.setAttribute("font-family","Microsoft YaHei UI");
				barText2.setAttribute("fill","#333333");
				barText2.setAttribute("stroke","#333333");
				barText2.setAttribute("stroke-width","0.25");
				barText2.setAttribute("text-anchor","end");
				barText2.textContent=((maxVal-minVal)/5.0).toString();
				barCtrl.appendChild(barText2);
				var barText3=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText3.setAttribute("id","barText3");
				barText3.setAttribute("x","56");
				barText3.setAttribute("y","140");
				barText3.setAttribute("font-size","12");
				barText3.setAttribute("font-family","Microsoft YaHei UI");
				barText3.setAttribute("fill","#333333");
				barText3.setAttribute("stroke","#333333");
				barText3.setAttribute("stroke-width","0.25");
				barText3.setAttribute("text-anchor","end");
				barText3.textContent=((maxVal-minVal)/5.0*2).toString();
				barCtrl.appendChild(barText3);
				var barText4=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText4.setAttribute("id","barText4");
				barText4.setAttribute("x","56");
				barText4.setAttribute("y","100");
				barText4.setAttribute("font-size","12");
				barText4.setAttribute("font-family","Microsoft YaHei UI");
				barText4.setAttribute("fill","#333333");
				barText4.setAttribute("stroke","#333333");
				barText4.setAttribute("stroke-width","0.25");
				barText4.setAttribute("text-anchor","end");
				barText4.textContent=((maxVal-minVal)/5.0*3).toString();
				barCtrl.appendChild(barText4);
				var barText5=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText5.setAttribute("id","barText5");
				barText5.setAttribute("x","56");
				barText5.setAttribute("y","60");
				barText5.setAttribute("font-size","12");
				barText5.setAttribute("font-family","Microsoft YaHei UI");
				barText5.setAttribute("fill","#333333");
				barText5.setAttribute("stroke","#333333");
				barText5.setAttribute("stroke-width","0.25");
				barText5.setAttribute("text-anchor","end");
				barText5.textContent=((maxVal-minVal)/5.0*4).toString();
				barCtrl.appendChild(barText5);
				var barText6=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText6.setAttribute("id","barText6");
				barText6.setAttribute("x","56");
				barText6.setAttribute("y","20");
				barText6.setAttribute("font-size","12");
				barText6.setAttribute("font-family","Microsoft YaHei UI");
				barText6.setAttribute("fill","#333333");
				barText6.setAttribute("stroke","#333333");
				barText6.setAttribute("stroke-width","0.25");
				barText6.setAttribute("text-anchor","end");
				barText6.textContent=maxVal;
				barCtrl.appendChild(barText6);

				var lolotextY=222-lolo*2;
				var hihitextY=222-hihi*2;
				var lotextY=222-lo*2;
				var hitextY=222-hi*2;
				var barCtrlPath2=document.createElementNS("http://www.w3.org/2000/svg","path");
				barCtrlPath2.setAttribute("id","barCtrlPath2");
				barCtrlPath2.setAttribute("transform","matrix(1,0,0,-1,65,217.5)");
				barCtrlPath2.setAttribute("fill","none");
				barCtrlPath2.setAttribute("stroke","rgb(255,0,0)");
				barCtrlPath2.setAttribute("stroke-width","2");
				barCtrlPath2.setAttribute("d","M50.5 "+lolo*2+"h10 M50.5 "+hihi*2+"h10");
				barCtrl.appendChild(barCtrlPath2);
				var barText7=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText7.setAttribute("id","barText7");
				barText7.setAttribute("x","128");
				barText7.setAttribute("y",lolotextY);
				barText7.setAttribute("font-size","12");
				barText7.setAttribute("font-family","Microsoft YaHei UI");
				barText7.setAttribute("fill","rgb(255,0,0)");
				barText7.setAttribute("stroke","rgb(255,0,0)");
				barText7.setAttribute("stroke-width","0.25");
				barText7.textContent="LOLO"
				barCtrl.appendChild(barText7);
				var barText8=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText8.setAttribute("id","barText8");
				barText8.setAttribute("x","128");
				barText8.setAttribute("y",hihitextY);
				barText8.setAttribute("font-size","12");
				barText8.setAttribute("font-family","Microsoft YaHei UI");
				barText8.setAttribute("fill","rgb(255,0,0)");
				barText8.setAttribute("stroke","rgb(255,0,0)");
				barText8.setAttribute("stroke-width","0.25");
				barText8.textContent="HIHI"
				barCtrl.appendChild(barText8);

				var barCtrlPath3=document.createElementNS("http://www.w3.org/2000/svg","path");
				barCtrlPath3.setAttribute("id","barCtrlPath3");
				barCtrlPath3.setAttribute("transform","matrix(1,0,0,-1,65,217.5)");
				barCtrlPath3.setAttribute("fill","none");
				barCtrlPath3.setAttribute("stroke","rgb(246,136,46)");
				barCtrlPath3.setAttribute("stroke-width","2");
				barCtrlPath3.setAttribute("d","M50.5 "+lo*2+"h10 M50.5 "+hi*2+"h10");
				barCtrl.appendChild(barCtrlPath3);
				var barText9=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText9.setAttribute("id","barText9");
				barText9.setAttribute("x","128");
				barText9.setAttribute("y",lotextY);
				barText9.setAttribute("font-size","12");
				barText9.setAttribute("font-family","Microsoft YaHei UI");
				barText9.setAttribute("fill","rgb(246,136,46)");
				barText9.setAttribute("stroke","rgb(246,136,46)");
				barText9.setAttribute("stroke-width","0.25");
				barText9.textContent="LO"
				barCtrl.appendChild(barText9);
				var barText10=document.createElementNS("http://www.w3.org/2000/svg","text");
				barText10.setAttribute("id","barText10");
				barText10.setAttribute("x","128");
				barText10.setAttribute("y",hitextY);
				barText10.setAttribute("font-size","12");
				barText10.setAttribute("font-family","Microsoft YaHei UI");
				barText10.setAttribute("fill","rgb(246,136,46)");
				barText10.setAttribute("stroke","rgb(246,136,46)");
				barText10.setAttribute("stroke-width","0.25");
				barText10.textContent="HI"
				barCtrl.appendChild(barText10);
				
				return "create a bar control successfully"
			};

			factory.addBarHCtl = function(Xpos){//BarH-此处的控件本该动态创建并可修改的=====
				var svgDragBH=document.getElementById("svgDragBH");
				var BarHCtl=document.createElementNS("http://www.w3.org/2000/svg","g");
				BarHCtl.setAttribute("id","BarHCtl");
				svgDragBH.appendChild(BarHCtl);
				
				var BarHCtlRect1=document.createElementNS("http://www.w3.org/2000/svg","rect");
				BarHCtlRect1.setAttribute("id","BarHCtlRect1");
				BarHCtlRect1.setAttribute("x","9.5");
				BarHCtlRect1.setAttribute("y","9.5");
				BarHCtlRect1.setAttribute("width","401");
				BarHCtlRect1.setAttribute("height","26");
				BarHCtlRect1.setAttribute("fill","rgb(200,245,242)");
				BarHCtlRect1.setAttribute("stroke","black");
				BarHCtlRect1.setAttribute("stroke-width","0.75");
				BarHCtl.appendChild(BarHCtlRect1);

				var BarHCtlPath1=document.createElementNS("http://www.w3.org/2000/svg","path");
				BarHCtlPath1.setAttribute("id","BarHCtlPath1");
				BarHCtlPath1.setAttribute("fill","none");
				BarHCtlPath1.setAttribute("stroke","black");
				BarHCtlPath1.setAttribute("stroke-width","0.75");
				BarHCtlPath1.setAttribute("d","M10 36v6 m80 -6v6 m80 -6v6 m80 -6v6 m80 -6v6 m80 -6v6 M26 36v3 m16 -3v3 m16 -3v3 m16 -3v3 M106 36v3 m16 -3v3 m16 -3v3 m16 -3v3 M186 36v3 m16 -3v3 m16 -3v3 m16 -3v3 M266 36v3 m16 -3v3 m16 -3v3 m16 -3v3 M346 36v3 m16 -3v3 m16 -3v3 m16.5 -3v3");
				BarHCtl.appendChild(BarHCtlPath1);

				var BarHCtlText1=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText1.setAttribute("id","BarHCtlText1");
				BarHCtlText1.setAttribute("x","6");
				BarHCtlText1.setAttribute("y","54");
				BarHCtlText1.setAttribute("font-size","12");
				BarHCtlText1.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText1.setAttribute("fill","#333333");
				BarHCtlText1.setAttribute("stroke","#333333");
				BarHCtlText1.setAttribute("stroke-width","0.25");
				BarHCtlText1.textContent="0";
				BarHCtl.appendChild(BarHCtlText1);

				var BarHCtlText2=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText2.setAttribute("id","BarHCtlText2");
				BarHCtlText2.setAttribute("x","82");
				BarHCtlText2.setAttribute("y","54");
				BarHCtlText2.setAttribute("font-size","12");
				BarHCtlText2.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText2.setAttribute("fill","#333333");
				BarHCtlText2.setAttribute("stroke","#333333");
				BarHCtlText2.setAttribute("stroke-width","0.25");
				BarHCtlText2.textContent="20";
				BarHCtl.appendChild(BarHCtlText2);

				var BarHCtlText3=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText3.setAttribute("id","BarHCtlText3");
				BarHCtlText3.setAttribute("x","162");
				BarHCtlText3.setAttribute("y","54");
				BarHCtlText3.setAttribute("font-size","12");
				BarHCtlText3.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText3.setAttribute("fill","#333333");
				BarHCtlText3.setAttribute("stroke","#333333");
				BarHCtlText3.setAttribute("stroke-width","0.25");
				BarHCtlText3.textContent="40";
				BarHCtl.appendChild(BarHCtlText3);

				var BarHCtlText4=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText4.setAttribute("id","BarHCtlText4");
				BarHCtlText4.setAttribute("x","242");
				BarHCtlText4.setAttribute("y","54");
				BarHCtlText4.setAttribute("font-size","12");
				BarHCtlText4.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText4.setAttribute("fill","#333333");
				BarHCtlText4.setAttribute("stroke","#333333");
				BarHCtlText4.setAttribute("stroke-width","0.25");
				BarHCtlText4.textContent="60";
				BarHCtl.appendChild(BarHCtlText4);

				var BarHCtlText5=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText5.setAttribute("id","BarHCtlText5");
				BarHCtlText5.setAttribute("x","322");
				BarHCtlText5.setAttribute("y","54");
				BarHCtlText5.setAttribute("font-size","12");
				BarHCtlText5.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText5.setAttribute("fill","#333333");
				BarHCtlText5.setAttribute("stroke","#333333");
				BarHCtlText5.setAttribute("stroke-width","0.25");
				BarHCtlText5.textContent="80";
				BarHCtl.appendChild(BarHCtlText5);

				var BarHCtlText6=document.createElementNS("http://www.w3.org/2000/svg","text");
				BarHCtlText6.setAttribute("id","BarHCtlText6");
				BarHCtlText6.setAttribute("x","398");
				BarHCtlText6.setAttribute("y","54");
				BarHCtlText6.setAttribute("font-size","12");
				BarHCtlText6.setAttribute("font-family","Microsoft YaHei UI");
				BarHCtlText6.setAttribute("fill","#333333");
				BarHCtlText6.setAttribute("stroke","#333333");
				BarHCtlText6.setAttribute("stroke-width","0.25");
				BarHCtlText6.textContent="100";
				BarHCtl.appendChild(BarHCtlText6);

				var BarHCtlPoly1=document.createElementNS("http://www.w3.org/2000/svg","polyline");
				BarHCtlPoly1.setAttribute("id","BarHCtlPoly1");
				BarHCtlPoly1.setAttribute("transform","matrix(1,0,0,1,"+Xpos+",0)");
				BarHCtlPoly1.setAttribute("stroke","#666666");
				BarHCtlPoly1.setAttribute("stroke-width","0.5");
				BarHCtlPoly1.setAttribute("fill","rgb(197,125,204)");
				BarHCtlPoly1.setAttribute("points","10 10, 16 22.5, 10 35, 4 22.5");
				BarHCtl.appendChild(BarHCtlPoly1);

				return 0;
			};

			factory.addThermometerCtl = function(hei,temp){//BarH-此处的控件本该动态创建并可修改的=====
				var svgDragTh=document.getElementById("svgDragTh");
				var thermometerCtl=document.createElementNS("http://www.w3.org/2000/svg","g");
				thermometerCtl.setAttribute("id","thermometerCtl");
				svgDragTh.appendChild(thermometerCtl);
				
				var thermometerCircle1=document.createElementNS("http://www.w3.org/2000/svg","circle");
				thermometerCircle1.setAttribute("id","thermometerCircle1");
				thermometerCircle1.setAttribute("cx","43.5");
				thermometerCircle1.setAttribute("cy","209.4165");
				thermometerCircle1.setAttribute("r","21");
				thermometerCircle1.setAttribute("fill","rgb(255,30,32)");
				thermometerCircle1.setAttribute("stroke","black");
				thermometerCircle1.setAttribute("stroke-width","1");
				thermometerCtl.appendChild(thermometerCircle1);

				var thermometerCtlRect1=document.createElementNS("http://www.w3.org/2000/svg","rect");
				thermometerCtlRect1.setAttribute("id","thermometerCtlRect1");
				thermometerCtlRect1.setAttribute("x","35.5");
				thermometerCtlRect1.setAttribute("y","40");
				thermometerCtlRect1.setAttribute("width","16");
				thermometerCtlRect1.setAttribute("height","150");
				thermometerCtlRect1.setAttribute("rx","4");
				thermometerCtlRect1.setAttribute("ry","4");
				thermometerCtlRect1.setAttribute("fill","rgb(100,241,236)");
				thermometerCtlRect1.setAttribute("stroke","black");
				thermometerCtlRect1.setAttribute("stroke-width","1");
				thermometerCtl.appendChild(thermometerCtlRect1);

				var thermometerCtlRect2=document.createElementNS("http://www.w3.org/2000/svg","rect");
				thermometerCtlRect2.setAttribute("id","thermometerCtlRect2");
				thermometerCtlRect2.setAttribute("x","35.5");
				thermometerCtlRect2.setAttribute("y","187.5");
				thermometerCtlRect2.setAttribute("width","16");
				thermometerCtlRect2.setAttribute("height","2.5");
				thermometerCtlRect2.setAttribute("fill","rgb(84,230,226)");
				thermometerCtlRect2.setAttribute("stroke","black");
				thermometerCtlRect2.setAttribute("stroke-width","1");
				thermometerCtl.appendChild(thermometerCtlRect2);

				var thermometerCtlRect3=document.createElementNS("http://www.w3.org/2000/svg","rect");
				thermometerCtlRect3.setAttribute("id","thermometerCtlRect3");
				thermometerCtlRect3.setAttribute("x","36");
				thermometerCtlRect3.setAttribute("y","187");
				thermometerCtlRect3.setAttribute("width","15");
				thermometerCtlRect3.setAttribute("height","4");
				thermometerCtlRect3.setAttribute("fill","rgb(255,30,32)");
				thermometerCtlRect3.setAttribute("stroke","none");
				thermometerCtl.appendChild(thermometerCtlRect3);

				var thermometerCtlRect4=document.createElementNS("http://www.w3.org/2000/svg","rect");
				thermometerCtlRect4.setAttribute("id","thermometerCtlRect4");
				thermometerCtlRect4.setAttribute("transform","matrix(1,0,0,-1,0,190)")
				thermometerCtlRect4.setAttribute("x","36");
				thermometerCtlRect4.setAttribute("y","0");
				thermometerCtlRect4.setAttribute("width","15");
				thermometerCtlRect4.setAttribute("height",hei*1.4);//显示值的红色矩柱100=>140
				thermometerCtlRect4.setAttribute("fill","rgb(255,30,32)");
				thermometerCtlRect4.setAttribute("stroke","none");
				thermometerCtl.appendChild(thermometerCtlRect4);

				var thermometerCtlPath1=document.createElementNS("http://www.w3.org/2000/svg","path");
				thermometerCtlPath1.setAttribute("id","thermometerCtlPath1");
				thermometerCtlPath1.setAttribute("fill","none");
				thermometerCtlPath1.setAttribute("stroke","#333333");
				thermometerCtlPath1.setAttribute("stroke-width","0.75");
				thermometerCtlPath1.setAttribute("transform","matrix(1,0,0,-1,36,190)");
				thermometerCtlPath1.setAttribute("d","M0 1h-7 m7 69h-7 m7 70h-7 M0 14h-4 m4 14h-4 m4 14h-4 m4 14h-4 M0 84h-4 m4 14h-4 m4 14h-4 m4 14h-4");
				thermometerCtl.appendChild(thermometerCtlPath1);

				var thermometerCtlText1=document.createElementNS("http://www.w3.org/2000/svg","text");
				thermometerCtlText1.setAttribute("id","thermometerCtlText1");
				thermometerCtlText1.setAttribute("x","25");
				thermometerCtlText1.setAttribute("y","195");
				thermometerCtlText1.setAttribute("font-size","12");
				thermometerCtlText1.setAttribute("font-family","Microsoft YaHei UI");
				thermometerCtlText1.setAttribute("fill","#333333");
				thermometerCtlText1.setAttribute("stroke","#333333");
				thermometerCtlText1.setAttribute("stroke-width","0.25");
				thermometerCtlText1.setAttribute("text-anchor","end");
				thermometerCtlText1.textContent="0";
				thermometerCtl.appendChild(thermometerCtlText1);

				var thermometerCtlText2=document.createElementNS("http://www.w3.org/2000/svg","text");
				thermometerCtlText2.setAttribute("id","thermometerCtlText2");
				thermometerCtlText2.setAttribute("x","25");
				thermometerCtlText2.setAttribute("y","125");
				thermometerCtlText2.setAttribute("font-size","12");
				thermometerCtlText2.setAttribute("font-family","Microsoft YaHei UI");
				thermometerCtlText2.setAttribute("fill","#333333");
				thermometerCtlText2.setAttribute("stroke","#333333");
				thermometerCtlText2.setAttribute("stroke-width","0.25");
				thermometerCtlText2.setAttribute("text-anchor","end");
				thermometerCtlText2.textContent="50";
				thermometerCtl.appendChild(thermometerCtlText2);

				var thermometerCtlText3=document.createElementNS("http://www.w3.org/2000/svg","text");
				thermometerCtlText3.setAttribute("id","thermometerCtlText3");
				thermometerCtlText3.setAttribute("x","25");
				thermometerCtlText3.setAttribute("y","55");
				thermometerCtlText3.setAttribute("font-size","12");
				thermometerCtlText3.setAttribute("font-family","Microsoft YaHei UI");
				thermometerCtlText3.setAttribute("fill","#333333");
				thermometerCtlText3.setAttribute("stroke","#333333");
				thermometerCtlText3.setAttribute("stroke-width","0.25");
				thermometerCtlText3.setAttribute("text-anchor","end");
				thermometerCtlText3.textContent="100";
				thermometerCtl.appendChild(thermometerCtlText3);

				var thermometerCtlText4=document.createElementNS("http://www.w3.org/2000/svg","text");
				thermometerCtlText4.setAttribute("id","thermometerCtlText4");
				thermometerCtlText4.setAttribute("x","43.5");
				thermometerCtlText4.setAttribute("y","213");
				thermometerCtlText4.setAttribute("font-size","13");
				thermometerCtlText4.setAttribute("font-family","Microsoft YaHei UI");
				thermometerCtlText4.setAttribute("fill","#ffffff");
				thermometerCtlText4.setAttribute("stroke","#ffffff");
				thermometerCtlText4.setAttribute("stroke-width","0.25");
				thermometerCtlText4.setAttribute("text-anchor","middle");
				thermometerCtlText4.textContent=temp;
				thermometerCtl.appendChild(thermometerCtlText4);

				return 0;
			};
			/* end - creatSVG */
			return factory;
		});
		/* end - factory - AddCtrl      <Vertical Bar> */

		/* start - 自定义服务Service =>  创建和修改svg元素*/
		app.service('CtrlService',function(AddCtrl,SvgAttr){
			this.addBarCtrl=function( maxVal, minVal, size, backColor, color, hihi, lolo, hi, lo ){
				return AddCtrl.addBarCtrl( maxVal, minVal, size, backColor, color, hihi, lolo, hi, lo );
			};
			this.addBarHCtl=function(Xpos){
				return AddCtrl.addBarHCtl(Xpos);
			};
			this.addThermometerCtl=function(hei,temp){
				return AddCtrl.addThermometerCtl(hei,temp);
			};
			this.changeAttr=function(id,attr,val){
				return SvgAttr.attr(id,attr,val);
			};		
		});
		/* end - 自定义服务Service =>  创建和修改svg元素*/
		
		/* start - tankBarsCtrl */
		app.controller('tankBarsCtrl', function ($scope, MathCalc, SvgAttr, CtrlService) {
			$scope.calcTo100=100;
			$scope.calcTo100P=51.2;
			$scope.calcTo1000=1000;
			$scope.calcTo100LOG=1;
			$scope.calcTo1000LOG=1;
			$scope.log=MathCalc.log(100);
			$scope.attrName="size";
			$scope.attrVal="1";
			$scope.ctrlName="Thermometer";
			$scope.ctrls=["Vertical Bar", "Horizontal Bar", "Thermometer", "Tank"];
			$scope.attrs=["maxVal", "minVal", "size", "backColor", "color", "HIHI", "LOLO", "HI", "LO"];
			$scope.maxVal=100;
			$scope.minVal=0;
			$scope.size=1;
			$scope.backColor="rgb(250,250,230)";
			$scope.color="rgb(255,56,56)";
			$scope.hihi=90;
			$scope.lolo=10;
			$scope.hi=80;
			$scope.lo=30;

			//表示控件是否被创建的标志位
			$scope.bCtrlFlag=false;
			$scope.HbCtrlFlag=false;
			$scope.ThCtrlFlag=false;

			// CtrlService.addBarCtrl($scope.maxVal, $scope.minVal, $scope.size, $scope.backColor, $scope.color, $scope.hihi, $scope.lolo, $scope.hi, $scope.lo);
			async.map(pvs.tankBars, function (item, callback) {
				socket.on(item.pvname, function (data) {
					$scope.$applyAsync(function () {	//手动出发脏检查。必须有这步才能自动通知angular的module和controller，$scope.bang发生变化了。详见腾讯课堂教程《$scope》节
						switch (item.pvname) {
							case "may:calcTo100":
								$scope.calcTo100=data;
								break;
							case "may:calcTo100P":
								$scope.calcTo100P=data;
								$scope.calcTo100LOG = (data>0 ? MathCalc.log(data) : 0);
								break;
							case "may:calcTo1000":
								$scope.calcTo1000=data;
								$scope.calcTo1000LOG = (data>0 ? MathCalc.log(data) : 0);
								break;
							default:
								break;
						}

						if($scope.calcTo100<=8 ||$scope.calcTo100>=92){
							SvgAttr.attr("barbox5","stroke","rgb(255,0,0)");
							SvgAttr.attr("tankbox1","stroke","rgb(255,0,0)");
						} else if($scope.calcTo100<=20 ||$scope.calcTo100>=80){
							SvgAttr.attr("barbox5","stroke","rgb(246,136,46)");
							SvgAttr.attr("tankbox1","stroke","rgb(246,136,46)");
						} else{
							SvgAttr.attr("barbox5","stroke","none");
							SvgAttr.attr("tankbox1","stroke","none");
						}//------------
						if($scope.calcTo100<=8.6311 ||$scope.calcTo100>=91.4882){
							SvgAttr.attr("thermometerbox1","stroke","rgb(255,0,0)");
						} else if($scope.calcTo100<=15.0596 ||$scope.calcTo100>=85.0596){
							SvgAttr.attr("thermometerbox1","stroke","rgb(246,136,46)");
						} else{
							SvgAttr.attr("thermometerbox1","stroke","none");
						}//------------
						if($scope.calcTo100<=7.5 ||$scope.calcTo100>=92.5){
							SvgAttr.attr("barbox2","stroke","rgb(255,0,0)");
						} else if($scope.calcTo100<=20 ||$scope.calcTo100>=70){
							SvgAttr.attr("barbox2","stroke","rgb(246,136,46)");
						} else{
							SvgAttr.attr("barbox2","stroke","none");
						}

					//判断pv数值以改变编辑区的控件的报警框颜色
					if($scope.bCtrlFlag){
						if($scope.calcTo100<=parseInt($scope.lolo) || $scope.calcTo100>=parseInt($scope.hihi)){
							CtrlService.changeAttr("barCtrlRect3","stroke","rgb(255,0,0)");
						} else if($scope.calcTo100<=parseInt($scope.lo) || $scope.calcTo100>=parseInt($scope.hi)){
							CtrlService.changeAttr("barCtrlRect3","stroke","rgb(246,136,46)");
						} else {
							CtrlService.changeAttr("barCtrlRect3","stroke","none");
						}
						//编辑区柱体填充更新
						CtrlService.changeAttr("barCtrlRect2","height",(parseInt($scope.calcTo100)-parseInt($scope.minVal))*200/(parseInt($scope.maxVal)-parseInt($scope.minVal)));
					}
					if($scope.HbCtrlFlag){
						SvgAttr.attr("BarHCtlPoly1","transform","matrix(1,0,0,1,"+$scope.calcTo100*4+",0)");
					}
					if($scope.ThCtrlFlag){
						SvgAttr.attr("thermometerCtlRect4","height",$scope.calcTo100*1.4);
						SvgAttr.textCont("thermometerCtlText4",$scope.calcTo100);
					}
				})
				//***end of $scope.$apply***//

					$scope.createCtl=function(){
						switch($scope.ctrlName){//不同控件创建时变量以数组表示控件名，同一控件创建了多个时也是用数组表示rect、text等元素名。此工作待完成。=====
							case "Tank" :
								;
								break;
							case "Vertical Bar" :
								CtrlService.addBarCtrl($scope.maxVal, $scope.minVal, $scope.size, $scope.backColor, $scope.color, $scope.hihi, $scope.lolo, $scope.hi, $scope.lo);
								$scope.bCtrlFlag=true;
								break;
							case "Horizontal Bar" :
								CtrlService.addBarHCtl($scope.calcTo100);
								$scope.HbCtrlFlag=true;
								break;
							case "Thermometer" :
								CtrlService.addThermometerCtl($scope.calcTo100,$scope.calcTo100);
								$scope.ThCtrlFlag=true;
								break;
							default :
								break;
						}
					}

					$scope.updateEdit=function(){
						switch($scope.attrName){
							case "maxVal" :
								$scope.maxVal=$scope.attrVal;
								SvgAttr.textCont("barText2",(($scope.maxVal-$scope.minVal)/5.0).toFixed(1));
								SvgAttr.textCont("barText3",(($scope.maxVal-$scope.minVal)/5.0*2).toFixed(1));
								SvgAttr.textCont("barText4",(($scope.maxVal-$scope.minVal)/5.0*3).toFixed(1));
								SvgAttr.textCont("barText5",(($scope.maxVal-$scope.minVal)/5.0*4).toFixed(1));
								SvgAttr.textCont("barText6",($scope.maxVal-0).toFixed(1));   //不写上【减0（即-0）】会出错
								CtrlService.changeAttr("barCtrlPath2","d","M50.5 "+($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barCtrlPath3","d","M50.5 "+($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText8","y",222-($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText7","y",222-($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText10","y",222-($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText9","y",222-($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							case "minVal" :
								$scope.minVal=$scope.attrVal;
								SvgAttr.textCont("barText2",(($scope.maxVal-$scope.minVal)/5.0).toFixed(1));
								SvgAttr.textCont("barText3",(($scope.maxVal-$scope.minVal)/5.0*2).toFixed(1));
								SvgAttr.textCont("barText4",(($scope.maxVal-$scope.minVal)/5.0*3).toFixed(1));
								SvgAttr.textCont("barText5",(($scope.maxVal-$scope.minVal)/5.0*4).toFixed(1));
								SvgAttr.textCont("barText1",($scope.minVal-0).toFixed(1));   //不写上【减0（即-0）】会出错
								CtrlService.changeAttr("barCtrlPath2","d","M50.5 "+($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barCtrlPath3","d","M50.5 "+($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText8","y",222-($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText7","y",222-($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText10","y",222-($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								CtrlService.changeAttr("barText9","y",222-($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							case "size" :
								$scope.size=$scope.attrVal;
								SvgAttr.attr("svgDragBV","width",170*$scope.size);
								SvgAttr.attr("svgDragBV","height",230*$scope.size);
								CtrlService.changeAttr("barCtrl","transform","matrix("+$scope.size+",0,0,"+$scope.size+",0,0)");
								break;
							case "backColor" :
								$scope.backColor=$scope.attrVal;
								CtrlService.changeAttr("barCtrlRect1","fill",$scope.backColor);
								break;
							case "color" :
								$scope.color=$scope.attrVal;
								CtrlService.changeAttr("barCtrlRect2","fill",$scope.color);
								break;
							case "HIHI" :
								$scope.hihi=$scope.attrVal;
								CtrlService.changeAttr("barCtrlPath2","d","M50.5 "+($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText8","y",222-($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							case "LOLO" :
								$scope.lolo=$scope.attrVal;
								CtrlService.changeAttr("barCtrlPath2","d","M50.5 "+($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hihi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText7","y",222-($scope.lolo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							case "HI" :
								$scope.hi=$scope.attrVal;
								CtrlService.changeAttr("barCtrlPath3","d","M50.5 "+($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText10","y",222-($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							case "LO" :
								$scope.lo=$scope.attrVal;
								CtrlService.changeAttr("barCtrlPath3","d","M50.5 "+($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10 M50.5 "+($scope.hi-$scope.minVal)*200/($scope.maxVal-$scope.minVal)+"h10");
								CtrlService.changeAttr("barText9","y",222-($scope.lo-$scope.minVal)*200/($scope.maxVal-$scope.minVal));
								break;
							default :
								break;
						}
					}
				});
				//***end of socket.on***//
			});
			//***end of async.map***//
			//需要绑定$scope但不需要脏检查的程序写在这里

			}, function (err, results) {
				callback(err, results);
			});
		/* end - tankBarsCtrl */

	/* end - angularJS script */
