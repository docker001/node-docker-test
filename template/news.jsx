import ReactDOM from "react-dom"
import React from "react"
import {Dialog,TextField} from "material-ui"
import {Pagination} from "./__components/rctui"
import request from "superagent"
import dateFormat from "dateformat"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()
class NewsDlg  extends React.Component{
	render(){return(
		<Dialog title={this.props.item.title} open={this.props.show}
				onRequestClose={this.props.onDlgClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true} >
			<small>{this.props.item.date}</small>
			<p>{this.props.item.content}</p>
		</Dialog>
	)}
}
class List extends React.Component{
	constructor(props){
		super(props)
		this.state={list:[],total:0,index:1,show:false,item:{}}
		this.getNews()
	}
	getNews(i){
		i=i||this.state.index
		request.get("/db/news?skip="+(i-1)*10+"&limit=10&sort=date&sortdir=-1").end((err,res)=>{
			this.setState({list:res.body.data,total:res.body.total})
		})
	}
	open(it){
		this.setState({show:true,item:it})
	}
	render(){return(
		<section>
			<div className="sub">{
				this.state.list.map(it=>
					<div className="list" onClick={()=>this.open.bind(this)(it)} key={it._id}>
						{it.title}
						<span className="date">{dateFormat(it.date,"yyyy-mm-dd HH:MM:ss")}</span>
					</div>
				)
			}</div>
			<NewsDlg show={this.state.show} item={this.state.item} onDlgClose={()=>this.setState({show:false})} />
			<Pagination className="center"  total={this.state.total} size={10} onChange={this.getNews.bind(this)}  />
		</section>
	)}
}
ReactDOM.render(<List />,document.querySelector("#list"))