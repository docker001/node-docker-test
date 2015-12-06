var koa    = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	mongo  = require('koa-mongo'),
	serve  = require('koa-static'),
	gzip  = require('koa-gzip'),
	cache  = require('koa-static-cache'),
	path   = require('path'),
	parse  = require('co-body'),
	session = require('koa-session-store'),
	ObjectId = require('mongodb').ObjectId
var app = koa()
app.keys=['imtoy']
var auth=function*(next){
	if(!this.session.user||this.session.user.group!="admin")return this.body={error:"无权限"}
	yield next
}
router
	.get('/user/getInfo',function*(){
		this.body=this.session.user||{error:"not login"}
	})
	.post('/user/login',function*(){
		var user=yield this.mongo.collection("users").findOne(yield parse.json(this))
		this.session.user=user
		this.body=user||{error:"用户名或密码错误"}
	})
	.get('/user/logout',function*(){
		this.session=null
		this.body={status:"ok"}
	})
	.get('/user/init',function*(){
		if(yield this.mongo.collection("users").findOne({account:"admin"}))return
		var result={}
		result.indexes=yield this.mongo.collection("users").ensureIndex({account:1},{unique: true})
		result.creatAdmin=yield this.mongo.collection("users").insert({account:"admin",password:"admin",group:"admin"})
		result.creatTest=yield this.mongo.collection("users").insert({account:"test",password:"test",group:"user"})
		this.body=result
	})
	.post('/news',auth,function*(){
		this.body=yield this.mongo.collection("news").insert(yield parse.json(this))
	})
	.get('/news',function*(){
		this.body=yield this.mongo.collection("news").find().sort({date:-1}).skip(parseInt(this.query.start)||0).limit(parseInt(this.query.limit)||100).toArray()
	})
	.get('/news/meta',function*(){
		this.body={total:yield this.mongo.collection("news").count(),keys:["ID","标题","简介","日期"]}
	})
	.get('/news/del',auth,function*(){
		this.body=yield this.mongo.collection("news").remove({_id:ObjectId(this.query.id)})
	})
app
	.use(mongo({host:process.env["MONGODB_PORT_27017_TCP_ADDR"]||'localhost',port:process.env["MONGODB_PORT_27017_TCP_PORT"]||27017,user:process.env["MONGODB_USERNAME"]||'',pass:process.env["MONGODB_PASSWORD"]||' ',db:process.env["MONGODB_INSTANCE_NAME"]||'test'}))
	.use(session({store:"cookie"}))
	.use(logger())
	.use(gzip())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(cache("public"))
	.use(serve("public"))
	.listen(80)
console.log("start app success on port 80")