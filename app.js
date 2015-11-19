var koa = require('koa')
var router = require('koa-router')()
var logger = require('koa-logger')
var serve = require('koa-static')
var app = koa()
router
	.get('/get',function*(next){
		this.body="get"
	})
	.post('/post',function*(next){
		this.body="post"
	})
app
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(serve('public'))
	.listen(80)
console.log("start app success on port 80")