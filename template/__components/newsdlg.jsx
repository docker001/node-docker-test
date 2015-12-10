import React from "react"
import {Dialog,TextField} from "material-ui"
import {connect} from "react-redux"
export default class NewsDlg  extends React.Component{
	post(){
		if(!this.props.onPost)return
		this.props.onPost({
			title:this.refs.title.getValue(),
			summary:this.refs.summary.getValue(),
			content:this.refs.content.getValue(),
			date:new Date()
		})
	}
	render(){return(
		<Dialog title="添加新闻"
				actions={[{text:"取消"},{text:"确定",onTouchTap:this.post.bind(this),ref:"submit"}]}
				actionFocus="submit" open={this.props.show}
				onRequestClose={this.props.onDlgClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true} >
			<TextField fullWidth={true} floatingLabelText="标题" ref="title"/>
			<TextField fullWidth={true} multiLine={true} floatingLabelText="简介" ref="summary"/>
			<TextField fullWidth={true} multiLine={true} floatingLabelText="内容" ref="content"/>
		</Dialog>
	)}
}