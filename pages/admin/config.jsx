import React from "react"
import {CardTitle,Card,CardText,TextField,FlatButton,CardActions} from "material-ui"
import request from "superagent"
export default class ConfigPage extends React.Component{
	constructor(props){
		super(props)
		this.state={}
		request.get("/db/config?key=target&value=index").end((err,res)=>{
			if(res.body.data.length==0)return
			this.setState({_id:res.body.data[0]._id})
			var data=res.body.data[0].data
			this.refs.bg.setValue(data.bg||"")
			this.refs.addr.setValue(data.addr||"")
			this.refs.about.setValue(data.about||"")
			this.refs.tel.setValue(data.tel||"")
			this.refs.copyright.setValue(data.copyright||"")
			this.refs.qq.setValue(data.qq||"")
		})
	}
	onFile(e,callback){
		var file = e.target.files[0]
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload =(e)=>{
			callback(e.target.result)
		}
	}
	post(){
		var bg=this.refs.bg.getValue()
		var addr=this.refs.addr.getValue()
		var about=this.refs.about.getValue()
		var tel=this.refs.tel.getValue()
		var copyright=this.refs.copyright.getValue()
		var qq=this.refs.qq.getValue()
		var req=this.state._id?request.put("/db/config/"+this.state._id):request.post("/db/config")
		req.send({target:"index",data:{bg,addr,about,tel,copyright,qq}}).end((err,res)=>{
			(res.body||{}).ok||(res.body||{}).result.ok?alert("保存成功"):alert("保存失败")
		})
	}
	render(){return(
		<Card style={{width:600}}>
			<CardTitle title="网站设置"/>
			<CardText>
				<TextField floatingLabelText="背景图片(网址)" ref="bg" />
				<input type="file" style={{margin:"0 20px"}} onChange={e=>this.onFile(e,data=>this.refs.bg.setValue(data))} ref="bgfile" />
				<TextField fullWidth={true} floatingLabelText="公司地址" ref="addr" />
				<TextField fullWidth={true} floatingLabelText="关于我们" ref="about" />
				<TextField fullWidth={true} floatingLabelText="联系电话" ref="tel" />
				<TextField fullWidth={true} floatingLabelText="版权所有" ref="copyright" />
				<TextField fullWidth={true} floatingLabelText="客服qq号" ref="qq" />
			</CardText>
			<CardActions>
				<FlatButton label="保存" onTouchTap={this.post.bind(this)} />
			</CardActions>
		</Card>
	)}
}