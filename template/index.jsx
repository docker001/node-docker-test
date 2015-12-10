import request from "superagent"
var news=document.querySelectorAll(".news")
request.get("/db/news?limit=3&sort=date&sortdir=-1").end((err,res)=>{
	res.body.data.forEach((it,i)=>{
		news[i].querySelector("header").innerText=it.title
		news[i].querySelector(".date").innerText=it.date
		news[i].querySelector("p").innerText=it.summary
	})
})
var index=1
var t
var getUser=window.getUser=function(url){
	clearTimeout(t)
	request.get(url).end((err,res)=>{
		if(!res.body.data.length){
			index=1
			return t=setTimeout(()=>getUser("/db/jiedai?limit=1"),100)
		}
		var it=res.body.data[0]
		var yuqi=Math.round((new Date()-new Date(it.starttime))/(1000 * 60 * 60 * 24))-it.limit||0
		if(yuqi<0){
			return t=setTimeout(()=>getUser("/db/jiedai?skip="+(index++)+"&limit=1"),100)
		}
		var box=document.createElement("div")
		box.innerHTML='<div class="img"><img src="noimg.png"></div>'
		var texts=document.createElement("div")
		texts.className="texts"
		texts.innerHTML='<div class="text">姓名：<span class="name">'+it.name||"未知"+'</span></div>'
		texts.innerHTML+='<div class="text uni">地址：<span class="address">'+it.address||"未知"+'</span></div>'
		texts.innerHTML+='<div class="text uni">性别：<span class="sex">'+it.sex||"未知"+'</span></div>'
		texts.innerHTML+='<div class="text">逾期时长：<span class="yuqi">'+yuqi||"未知"+'天</span></div>'
		texts.innerHTML+='<div class="text noborder uni">身份证号：<span class="idcard">'+it.idcard||"未知"+'</span></div>'
		box.appendChild(texts)
		box.className="users small"
		box.onclick=()=>box.classList.toggle("small")
		box.querySelector("img").src=it.head||"noimg"
		document.querySelector(".carouse").appendChild(box)
		setTimeout(()=>box.className="users small in",30)
		setTimeout(()=>box.className="users small out",10000)
		setTimeout(()=>box.parentNode.removeChild(box),10500)
		t=setTimeout(()=>getUser("/db/jiedai?skip="+(index++)+"&limit=1"),10520)
	})
}
getUser("/db/jiedai?limit=1")
request.get("/db/config?key=target&value=index").end((err,res)=>{
	if(res.body.data.length==0)return
	var data=res.body.data[0].data
	document.body.style.background="url("+data.bg||"bg.jpg"+")"
	document.querySelector("#addr").innerText=data.addr
	document.querySelector("#about").innerText=data.about
	document.querySelector("#tel").innerText=data.tel
	document.querySelector("#copyright").innerText=data.copyright
	document.querySelector("#qq").href="http://wpa.qq.com/msgrd?v=3&uin="+data.qq+"&site=qq&menu=yes"
})