import React,{Component} from "react"
import {IconButton,SvgIcon,Table,TableRowColumn,TableRow,TableBody,TableHeader,TableFooter,TableHeaderColumn} from "material-ui"
import Pagination from "react-pagination-cn"
import "react-pagination-cn/src/pagination.css"
export default class extends Component{
	constructor(props){
		super(props)
		if(props.onLoaded)props.onLoaded()
	}
	del(){
		if(!this.props.onDel)return
		this.props.onDel((this.selected||[]).map(i=>(this.props.items[i]||[])[0]))
	}
	render(){
		return(
			<Table multiSelectable={true} onRowSelection={it=>this.selected=it=="all"?[0,1,2,3,4,5,6,7,8,9]:it}>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn colSpan={(this.props.keys||[]).length} style={{textAlign:'center',fontSize:30}}>{this.props.title}</TableHeaderColumn>
					</TableRow>
					<TableRow>
						<TableHeaderColumn>
							<IconButton onTouchTap={this.props.onAdd}>
								<SvgIcon>
									<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
								</SvgIcon>
							</IconButton>
							<IconButton onTouchTap={this.del.bind(this)}>
								<SvgIcon>
									<path d="M19 13H5v-2h14v2z"/>
								</SvgIcon>
							</IconButton>
						</TableHeaderColumn>
						<TableHeaderColumn colSpan={(this.props.keys||[]).length-1}></TableHeaderColumn>
					</TableRow>
					<TableRow>{
						(this.props.keys||[]).map((it,i)=>
							<TableHeaderColumn key={i}>{it}</TableHeaderColumn>
						)
					}</TableRow>
				</TableHeader>
				<TableBody>{
					(this.props.items||[]).map((item,ii)=>
						<TableRow key={ii}>{
							(item||[]).map((it,i)=>
								<TableRowColumn key={i}>{it}</TableRowColumn>
							)
						}</TableRow>
					)
				}</TableBody>
				<TableFooter>
					<TableRow>
						<TableRowColumn colSpan="4" style={{textAlign:'center'}}>
							<Pagination totalPage={Math.ceil(this.props.total/10)} selectPage={this.props.onPaging} />
						</TableRowColumn>
					</TableRow>
				</TableFooter>
			</Table>
	)}
}