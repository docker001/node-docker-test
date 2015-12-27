import React,{Component} from "react"
import {connect,Provider} from "react-redux"
import {FlatButton,SelectField,RadioButton,Dialog,TextField,DatePicker} from "material-ui"
import {createStore} from 'redux'
import dateFormat from "dateformat"
import request from "superagent"
import MyTable from "./mytable"
import {store,onJiedaiOpen,onJiedaiData,onJiedaiDel,onJiedaiClose,onJiedaiPost,onJiedaiPaging} from "./store"

@connect(state=>({show:state.JiedaiOpen,index:state.JiedaiPaging}),dispatch=>({onData:onJiedaiData(dispatch),onJiedaiClose:onJiedaiClose(dispatch),onPost:onJiedaiPost(dispatch)}))
class JiedaiDlg extends Component{
	post(){
		if(!this.props.onPost)return
		this.props.onPost({
			name:this.refs.name.getValue(),
			address:this.refs.address.getValue(),
			idcard:this.refs.idcard.getValue(),
			head:this.refs.head.getValue(),
			sex:this.refs.sex.getValue(),
			starttime:this.refs.starttime.getDate(),
			daikuanjine:this.refs.daikuanjine.getValue(),
			pingtai:this.refs.pingtai.getValue(),
			limit:this.refs.limit.getValue(),
			tel:this.refs.tel.getValue(),
			yuqijine:this.refs.yuqijine.getValue(),
			xinyu:this.refs.xinyu.getValue(),
			date:new Date()
		},()=>this.props.onData(this.props.index))
	}
	onFile(e){
		var file = e.target.files[0]
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload =(e)=>{
			this.refs.head.setValue(e.target.result)
		}
	}
	render(){return(
		<Dialog title="添加借贷信息"
				actions={[
					<FlatButton label="取消" onTouchTap={this.props.onJiedaiClose}></FlatButton>,
					<FlatButton label="确定" onTouchTap={this.post.bind(this)}></FlatButton>
				]}
				open={this.props.show}
				onRequestClose={this.props.onJiedaiClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true}>	
			<TextField fullWidth={true} floatingLabelText="姓名" ref="name"/>
			<TextField fullWidth={true} floatingLabelText="性别" ref="sex"/>
			<TextField fullWidth={true} floatingLabelText="地址" ref="address"/>
			<TextField fullWidth={true} floatingLabelText="身份证号" ref="idcard"/>
			<TextField fullWidth={true} floatingLabelText="头像" onTouchTap={()=>this.refs.file.click()} ref="head"/>
			<input type="file" style={{display:"none"}} onChange={this.onFile.bind(this)} ref="file" />
			<DatePicker fullWidth={true} autoOk={true} floatingLabelText="借贷时间" ref="starttime"/>
			<TextField fullWidth={true} floatingLabelText="借贷期限" ref="limit"/>
			<TextField fullWidth={true} floatingLabelText="贷款金额" ref="daikuanjine"/>
			<TextField fullWidth={true} floatingLabelText="平台" ref="pingtai"/>
			<TextField fullWidth={true} floatingLabelText="联系电话" ref="tel"/>
			<TextField fullWidth={true} floatingLabelText="逾期金额" ref="yuqijine"/>
			<TextField fullWidth={true} floatingLabelText="信誉情况" ref="xinyu"/>
		</Dialog>
	)}
}

@connect(state=>({items:state.JiedaiData,total:state.JiedaiTotal,index:state.JiedaiPaging}),dispatch=>({onAdd:onJiedaiOpen(dispatch),onData:onJiedaiData(dispatch),onDel:onJiedaiDel(dispatch),onPaging:onJiedaiPaging(dispatch)}))
export default class JiedaiPage extends Component{
	render(){return(
		<article>
			<MyTable title="借贷管理" 
					 keys={["头像","姓名","性别","地址","身份证号","起始时间","借贷期限","逾期天数","贷款金额","平台","联系电话","逾期金额","信誉情况"]} 
					 items={this.props.items} 
					 total={this.props.total}
					 onLoaded={()=>this.props.onData(this.props.index||1)}
					 onAdd={this.props.onAdd}
					 onDel={data=>{this.props.onDel(data,()=>this.props.onData(this.props.index||1))}}
					 onPaging={i=>{this.props.onPaging(i);this.props.onData(i)}} />
			<JiedaiDlg />
		</article>
	)}
}