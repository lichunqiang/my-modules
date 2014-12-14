var gulp = require('gulp');
var shell = require('shelljs/global');
var fs = require('fs');



/***************执行计划，打包spm包************************/
var target_dir = 'js',
	idleading = 'gallery/{{name}}/{{version}}';

var spm_modules = [
	'form/1.0.0',
	'jquery-cookie/1.4.1',
	'jquery/2.1.1',
	'jquery/1.8.3',
];

var my_modules =  [
	'jquery-validation/1.13.1',
	'icheck/1.0.1'
];

gulp.task('build-gallery', function(cb){
	spm_modules.forEach(function(_module){
		//检查文件是否已经生成，如果存在略过
		fs.exists(target_dir + '/gallery/' + _module, function(exists){
			if(!exists) {
				exec('spm build --output-directory ' + target_dir + ' --input-directory spm_modules/' + _module + ' --idleading ' + idleading);
			}
		});
	});
	my_modules.forEach(function(_module){
		fs.exists(target_dir + '/gallery/' + _module, function(exists){
			if(!exists) {
				exec('spm build --output-directory ' + target_dir + ' --input-directory my_modules/' + _module + ' --idleading ' + idleading);
			}
		});
	});
});