import ReactDOM from "react-dom"
import React,{Component} from "react"
import {Header,Footer} from "../index/component"
import injectTapEventPlugin from "react-tap-event-plugin"
import {ActionLabelOutline} from "material-ui/lib/svg-icons"
import {Card,List,ListItem,Divider,Dialog} from "material-ui"
import request from "superagent"
import Pagination from "react-pagination-cn"
import "react-pagination-cn/src/pagination.css"
injectTapEventPlugin()
class Dlg extends Component{
	render(){return(
		<Dialog title={this.props.data.title}
				open={this.props.isOpen}
				onRequestClose={this.props.onClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true} >
				{this.props.data.content}
		</Dialog>
	)}
}
class News extends Component{
	constructor(props){
		super(props)
		this.state={data:[],totalPage:1,perPage:6,news:{},isOpen:false}
		this.getData()
	}
	getData(i=1){
		request
			.get("/db/news?sort=date&sortdir=-1&limit="+this.state.perPage+"&skip="+(i-1)*this.state.perPage)
			.end((err,res)=>{
				this.setState({data:res.body.data,totalPage:Math.ceil(res.body.total/this.state.perPage)})
			})
	}
	render(){return(
		<Card style={{minHeight:550,margin:"100px 200px"}}>
			<List>
				{this.state.data.map(it=>(
					<div key={it._id}>
						<ListItem primaryText={it.title} secondaryText={it.summary} leftIcon={<ActionLabelOutline/>} onTouchTap={()=>this.setState({isOpen:true,news:it})} />
						<Divider inset={true} />
					</div>
				))}
			</List>
			<Dlg isOpen={this.state.isOpen} data={this.state.news} onClose={()=>this.setState({isOpen:false})} />
			<Pagination totalPage={this.state.totalPage} selectPage={this.getData.bind(this)}/>
		</Card>
	)}
}
ReactDOM.render(
	<div style={{fontFamily:"microsoft yahei,simhei"}}>
		<Header/>
		<News />
		<Footer/>
	</div>
,document.querySelector("#app"))