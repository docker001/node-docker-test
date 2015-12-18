import React from "react"
import {SelectField,RadioButton,Dialog,TextField,DatePicker} from "material-ui"
import {connect} from "react-redux"
import request from "superagent"
import dateFormat from "dateformat"
export default class NewsDlg  extends React.Component{
	post(){
		if(!this.props.onPost)return
		this.props.onPost({
			name:this.refs.name.getValue(),
			address:this.refs.address.getValue(),
			idcard:this.refs.idcard.getValue(),
			head:this.refs.head.getValue(),
			sex:this.refs.sex.getValue(),
			starttime:this.refs.starttime.getDate(),
			limit:parseInt(this.refs.limit.getValue()),
			date:new Date()
		})
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
				actions={[{text:"取消"},{text:"确定",onTouchTap:this.post.bind(this),ref:"submit"}]}
				actionFocus="submit" open={this.props.show}
				onRequestClose={this.props.onDlgClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true}>	
			<TextField fullWidth={true} floatingLabelText="姓名" ref="name"/>
			<TextField fullWidth={true} floatingLabelText="性别" ref="sex"/>
			<TextField fullWidth={true} floatingLabelText="地址" ref="address"/>
			<TextField fullWidth={true} floatingLabelText="身份证号" ref="idcard"/>
			<TextField fullWidth={true} floatingLabelText="头像" onTouchTap={()=>this.refs.file.click()} ref="head"/>
			<input type="file" style={{display:"none"}} onChange={this.onFile.bind(this)} ref="file" />
			<DatePicker fullWidth={true} autoOk={true} floatingLabelText="借贷时间" ref="starttime"/>
			<TextField fullWidth={true} floatingLabelText="借贷期限(天)" ref="limit"/>
		</Dialog>
	)}
}