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
	ObjectId = require('mongodb').ObjectId,
	routerDB = require('./router/db'),
	routerUser =require('./router/user')
var app = koa()
app.keys=['imtoy']
router
	.use('/user',routerUser.routes(),routerUser.allowedMethods())
	.use('/db',routerDB.routes(),routerDB.allowedMethods())
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