var gulp = require('gulp')
var path = require('path')
var fs = require('fs')
var chokidar = require('chokidar')
var plumber = require('gulp-plumber')
var clean=require('gulp-clean')
var minifyHTML = require('gulp-minify-html')
var minifyCss = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var uglifyCore = require("uglify-js")
var babel = require('gulp-babel')
var babelcore=require('babel-core')
var stylus = require('gulp-stylus')
var livereload = require('gulp-livereload')
var minifyInline = require('gulp-minify-inline')
var browserify = require('gulp-browserify')
var rename = require("gulp-rename")
var jadeCore=require('jade')
var jade = require('gulp-jade')
var stylusCore=require('stylus')
var imagemin=require('gulp-imagemin')
var vulcanize = require('gulp-vulcanize')
var browserSync = require('browser-sync')
var CleanCSS = require('clean-css')
var autoprefixerStyl = require('autoprefixer-stylus')
var pngquant = require('imagemin-pngquant')
var inline = require('gulp-inline')
var reactify  = require('gulp-reactify')
var base64 = require('gulp-base64')
var webpack = require('webpack-stream')
var babelify=require('babelify')
var paths={
	src:"template",
	dest:"dest"
}
jadeCore.filters.stylus=function(src){
	var data
	stylusCore(src).use(autoprefixerStyl()).render(function(err,css){
		data=new CleanCSS().minify(css).styles
	})
	return data
}
jadeCore.filters.es6=function(src){
	var data=babelcore.transform(src).code
	return uglifyCore.minify(data,{fromString: true}).code
}
gulp.task('default',function(){
	livereload.listen()
	var watcher=chokidar.watch(paths.src,{ignorePermissionErrors:true})
	watcher.on('all',(event,filepath)=>console.log("change: "+filepath+" was "+event))
	watcher.on('add',buildfile)
	watcher.on('change',buildfile)
	watcher.on('unlink',delfile)
	watcher.on('unlinkDir',delfile)
})
gulp.task('web',function(){
	return browserSync({files:paths.src,server:{baseDir:paths.dest},port:80})
})
function buildfile(filepath){
	if(filepath.indexOf("__")>-1)return
	if(!fs.existsSync(filepath))return
	var ext=path.extname(filepath)
	var stream=gulp.src(filepath,{base:paths.src}).pipe(plumber())
	switch(ext){
		case ".es6":
			stream=stream.pipe(babel()).pipe(uglify()).pipe(rename({extname:".js"}))
			break
		case ".jsx":
			stream=stream.pipe(webpack({
				output:{filename:path.basename(filepath)},
				resolve: {
					extensions: ['', '.js', '.jsx']
				},
				module:{
					entry:{index:filepath},
					loaders:[
						{test:/\.jsx?$/,loader:"babel",exclude:/(node_modules|bower_components)/}
					]
				}
			})).pipe(uglify()).pipe(rename({extname:".js"})).pipe(gulp.dest(path.join(paths.dest,path.dirname(path.relative(paths.src,filepath))))).pipe(livereload())
			return
		case ".styl":
			stream=stream.pipe(stylus()).pipe(autoprefixer()).pipe(minifyCss())
			break
		case ".jade":
			stream=stream.pipe(jade({jade:jadeCore})).pipe(minifyInline())
			break
		case ".html":
			stream=stream.pipe(minifyInline()).pipe(minifyHTML())
			break
		case ".css":
			stream=stream.pipe(autoprefixer()).pipe(minifyCss())
			break
		case ".js":
			stream=stream.pipe(uglify())
			break
		case ".svg":
		case ".gif":
		case ".jpg":
		case ".png":
			stream=stream.pipe(imagemin({progressive:true,use:[pngquant()]}))
			break
	}
	stream.pipe(gulp.dest(paths.dest)).pipe(livereload())
	var suffix=path.basename(filepath,path.extname(filepath)).split("-")[1]
	if(!suffix)return
	switch(suffix){
		case "poly":
			stream=stream.pipe(vulcanize()).pipe(inline({disabledTypes: ['svg','img']})).pipe(minifyHTML()).pipe(minifyInline()).pipe(gulp.dest(paths.dest)).pipe(livereload())
			break
		case "brow":
			stream=stream.pipe(browserify()).pipe(uglify()).pipe(gulp.dest(paths.dest)).pipe(livereload())
			break
	}
}
function delfile(filepath){
	filepath=path.join(paths.dest,path.relative(paths.src,filepath))
	if(!fs.existsSync(filepath))return
	gulp.src(filepath).pipe(plumber()).pipe(clean())
}
