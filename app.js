var koa    = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	cache  = require('koa-static-cache'),
	serve  = require('koa-static'),
	mongo  = require('koa-mongo'),
	path   = require('path')
var app = koa()
router
	.get('/get',function*(next){
		this.body=yield this.mongo.collection('users').findOne()
	})
	.get('/post',function*(next){
		this.body=yield this.mongo.collection('users').insert({a:2})
	})
app
	.use(mongo({host:process.env["MONGODB_PORT_27017_TCP_ADDR"]||'localhost',port:process.env["MONGODB_PORT_27017_TCP_PORT"]||27017,user:process.env["MONGODB_USERNAME"]||'',pass:process.env["MONGODB_PASSWORD"]||' ',db:process.env["MONGODB_INSTANCE_NAME"]||'test'}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(cache('public'))
	.use(serve('public'))
	.listen(80)
console.log("start app success on port 80")