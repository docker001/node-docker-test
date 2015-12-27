import ReactDOM from "react-dom"
import React,{Component} from "react"
import {MenuItem,IconMenu,SvgIcon,AppBar,IconButton,FlatButton,List,ListItem,Dialog,TextField,Card} from "material-ui"
import {ActionBuild,ActionFace,ActionAccessibility,ActionVerifiedUser,SocialGroup,SocialLocationCity,ImageTagFaces,CommunicationCall,ActionCopyright} from "material-ui/lib/svg-icons"
import {Provider} from "react-redux"
import {connect} from "react-redux"
import injectTapEventPlugin from "react-tap-event-plugin"
import {store,onLoaded} from "./store"
injectTapEventPlugin()
@connect(state=>({...state.Config}))
class Section1 extends Component{
	render(){return(
		<section style={{background:"rgba(0,0,0,0.4)",textAlign:"center",height:700,position:"relative",padding:"200px 0 50px 0",color:"#fff"}}>
			<img src={require("./title.png")} />
			<h4>借贷宝贷款，贷出信服人生，理出金银财宝</h4>
			<div>
				<input style={{padding:"0 10px",outline:"none",width:298,height:38,border:"1px solid rgb(30,158,107)",verticalAlign:"middle"}} placeholder="请输入身份证号查询" />
				<div style={{background:"rgb(30,158,107)",cursor:"pointer",color:"#fff",width:150,display:"inline-block",lineHeight:"40px",verticalAlign:"middle"}}>信誉查询</div>
			</div>
			<div style={{height:150}}>
			</div>
			<a style={{textDecoration:"none",background:"#3ab0e2",cursor:"pointer",color:"#fff",width:470,display:"inline-block",lineHeight:"40px",verticalAlign:"middle"}} target="_blank" href={"http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin="+this.props.qq}>联系我们</a>
			<div><img style={{float:"right"}} src={require("./QRcode.png")} /></div>
		</section>
	)}
}
class Section2 extends Component{
	render(){return(
		<section style={{background:"url("+require('./bj.png')+")",padding:"100px 0",textAlign:"center"}}>
			<div style={{fontSize:40}}>借贷宝贷款简介</div>
			<div style={{padding:30,color:"#aaa"}}>借贷宝贷款是依托借贷宝平台进行技术支持的金融服务平台，公司将提供贷款、理财服务、逾期查询与曝光、咨询和风控服务，全力保障投资人资金安全，公司主要致力于大学生借贷和白领借贷服务为主，本服务与借贷宝APP公司无关。</div>
			{[
				{title:"熟人借贷,快速简单",icon:ActionFace,color:"#e96656",list:["熟人借贷,所有交易发生在朋友间","借款  人实名,出借人匿名,避免当面开口,朋友谈钱不尴尬","无需审核,一键操作,钱来的速度只和你的人脉有关","利率自由,你想要的高收益这里全都有"]},
				{title:"随心赚钱,人脉变钱脉",icon:SocialGroup,color:"#34d293",list:["全新的生活方式,更是全新投资理财方式","你的钱只投给信任的人，有钱能使钱生钱","独家赚利差功能，人脉让你没钱也能赚到钱","在这里，不只是借贷"]},
				{title:"立体催收,化解风险",icon:ActionVerifiedUser,color:"#3ab0e2",list:["专业地面催收团队遍布全国，及时回款助你一臂之力","违约信息推送好友，让逾期“损友”信用破产","顶尖法律顾问团全程提供专业法律支持","个人征信大数据云端实时采集，更全面，更放心"]},
				{title:"多重护卫,极致安全",icon:ActionAccessibility,color:"#f7d861",list:["多重个人银行信息安全验证，更多验证，更全保障","银联校验个人身份信息，杜绝隐私泄露风险","账户安全由中国人民财产保险股份有限公司（PICC）承保","全程护航，随心使用无后顾之忧"]}
			].map(it=>(
				<div key={Math.random()} style={{width:"20%",height:400,display:"inline-block",margin:"1%",padding:"1%",background:"#fff",verticalAlign:"top",overflow:"hidden"}}>		
					<it.icon style={{width:50,height:50,fill:it.color,borderRadius:100,padding:25,marginBottom:20,border:"solid 10px",borderColor:it.color}}/>
					<div style={{fontWeight:"bold",lineHeight:"50px"}}>{it.title}</div>
					{it.list.map(i=>(
						<li key={Math.random()} style={{textAlign:"left",lineHeight:"30px"}}>{i}</li>
					))}
				</div>
			))}
		</section>
	)}
}
@connect(state=>({data:state.News}))
class Section3 extends Component{
	render(){return(
		<section style={{background:"#105153",color:"#fff",padding:"100px 0",textAlign:"center"}}>
			<div style={{fontSize:40}}>近期新闻</div>
			{(this.props.data||[]).map(it=>(
				<div key={Math.random()} style={{display:"inline-block",padding:"1.5%",width:"25%",verticalAlign:"top"}}>
					<div style={{borderBottom:"1px solid",lineHeight:"40px"}}>{it.title}</div>
					<div style={{textAlign:"right",color:"#AAA",margin:10}}>{it.date}</div>
					<p style={{minHeight:300}}>{it.content}</p>
				</div>
			))}
			<p><a href="news.html" style={{textDecoration:"none",color:"#fff"}}>----- 获取更多 -----</a></p>
		</section>
	)}
}
@connect(state=>({...state.Config}),dispatch=>({onLoaded:onLoaded(dispatch)}))
class Footer extends Component{
	constructor(props){
		super(props)
		if(this.props.onLoaded)this.props.onLoaded()
	}
	render(){return(
		<section style={{background:"#272727",color:"#fff",textAlign:"center"}}>
			{[
				{k:"公司地址",v:this.props.addr,icon:SocialLocationCity,color:"#34d293"},
				{k:"关于我们",v:this.props.about,icon:ImageTagFaces,color:"#f7d861"},
				{k:"联系电话",v:this.props.tel,icon:CommunicationCall,color:"#e96656"},
				{k:"版权所有",v:this.props.copyright,icon:ActionCopyright,color:"#3ab0e2"}
			].map(it=>(
				<div key={Math.random()} style={{display:"inline-block",padding:50}}>
					<it.icon style={{width:60,height:60,fill:it.color}} />
					<p>{it.k}</p>
					<small>{it.v}</small>
				</div>
			))}
		</section>
	)}
}
class App extends Component{
	render(){return(
		<Provider store={store}>
			<div style={{background:"url("+require("./bg.jpg")+")",backgroundAttachment:"fixed",fontFamily:"microsoft yahei,simhei"}}>
				<AppBar iconElementRight={
					<IconButton iconStyle={{width:30,height:30}} onTouchTap={()=>window.location="/admin.html"}>
						<ActionBuild/>
					</IconButton>
				} style={{background:"#000",padding:"0 100px",position:"fixed",top:0,width:"100%"}} iconElementLeft={<img src={require("./logo.png")}/>} />
				<Section1/>
				<Section2/>
				<Section3/>
				<Footer/>
			</div>
		</Provider>
	)}
}
ReactDOM.render(<App />,document.querySelector("#app"))