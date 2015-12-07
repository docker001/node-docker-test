var router = require('koa-router')()
var ObjectId = require('mongodb').ObjectId
var parse  = require('co-body')
function auth(except){
	return function *(next){
		if((except||[]).indexOf(this.params.coll)==-1){
			if(!this.session.user||this.session.user.group!="admin"){
				return this.body={error:"无权限"}
			}
		}
		yield next
	}
}
router
	.get('/:coll',auth(["news","jiedai"]),function*(){
		var res=this.mongo.collection(this.params.coll)
		var total=yield res.count()
		var search={}
		if(this.query.key&&this.query.value){
			search[this.query.key]=this.query.value
		}
		res=res.find(search)
		if(this.query.sort){
			var sort={}
			sort[this.query.sort]=parseInt(this.query.sortdir||1)
			res=res.sort(sort)
		}
		if(this.query.skip)res=res.skip(parseInt(this.query.skip))
		if(this.query.limit)res=res.limit(parseInt(this.query.limit))
		res=yield res.toArray()
		this.body={data:res,total:total}
	})
	.get('/:coll/:id',auth(["news","jiedai"]),function*(){
		this.body=yield this.mongo.collection(this.params.coll).findOne({_id:ObjectId(this.params.id)})
	})
	.post('/:coll',auth(),function*(){
		this.body=yield this.mongo.collection(this.params.coll).insert(yield parse.json(this))
	})
	.del('/:coll/:id',auth(),function*(){
		this.body=yield this.mongo.collection(this.params.coll).remove({_id:ObjectId(this.params.id)})
	})
	.put('/:coll/:id',auth(),function*(){
		this.body=yield this.mongo.collection(this.params.coll).update({_id:ObjectId(this.params.id)},{$set:yield parse.json(this)})
	})
module.exports=router