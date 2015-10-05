'use strict';

module.exports = function(grunt) {

	// User-configurable browser to launch with (use like grunt --browser="Firefox")
	var browser = grunt.option('browser') || 'Google Chrome';

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),


		// REMOVE the built directory
		clean: {
			build: ['build/*.html']
		},

		connect: {
			server: {
				options: {
					hostname: '0.0.0.0',
					logger: 'dev',
					livereload: true,
					port: 9001,
					base: 'build',
				}
			}
		},


		open: {
			server: {
				path: 'http://localhost:9002/',
				app: browser
			}
		},

		sass: {
			development: {            
			    options: {
                	style: 'compressed'
            	},
				files: [{
					cwd: 'source/sass',
					src: '*.scss',
					dest: 'build/css',
					expand: true,
					ext: '.css'
				}]
			},

		},

		uglify: {
			dist: {
				options: {
					compress: {
						drop_console: true
					},
					sourceMap: true
				},
				files: [
					{
						expand: true,
						cwd: 'source/js',
						src: '**/*.js',
						dest: 'build/js',
						ext: '.min.js'
					},
				]
			}
		},

		jshint: {
			options:{
				sub: true,
				loopfunc: true,
				validthis: true,
				newcap: false
			},
			all: [
				'source/js/**/*.js',
				]
		},

		includes: {
			build: {
				cwd: 'source',
				src: ['press/*.html', '*.html'],
				dest: 'build',
				options: {
					flatten: true,
					includePath: 'source/includes'
				}
			}
		},

		watch: {

			options: {
				livereload: true
			},

			grunt: {
				files: ['Gruntfile.js']
			},

			sassProd: {
				options: {
					livereload: false
				},

				files: ['source/sass/**/*.scss'],
				tasks: ['sass']
			},

			css: {
				files: ['build/css/**/*.css']
			},

			js: {
				files: ['source/**/*.js'],
				tasks: ['newer:uglify']
			},

			includes: {
				files: ['source/**/*.html','source/includes/**/*.html'],
				tasks: ['rebuild']
			}

		}



	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('rebuild',['clean','includes']);

	// Default task(s).
	grunt.registerTask('default',['rebuild','sass','uglify','connect','open','watch']);

};
