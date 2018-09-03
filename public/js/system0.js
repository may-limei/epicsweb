var dt;//存储svg的title文本
function displayText(textStr){
	dt=textStr;
	return textStr;
}
var pourDrain=document.getElementById("pourDrain");
pourDrain.addEventListener("mouseover",displayText("test"));
pourDrain.addEventListener("mouseout",displayText("综合实验平台的模拟堆体"));