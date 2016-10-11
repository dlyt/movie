module.exports = function(grunt){
	

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true 
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				//tasks: ['jshint'],
				options: {
					livereload: true
			},
			css: {
				files: ['public/css/**'],
				options: {
					livereload: true
				}
			}
		}
	},
		nodemon: {
			dev: {
				options: {
					files: 'app.js',
					args: [],
					ignore: ['node_moules/**'],
					watchedExtension: 'js',
					watchedFolders: ['config','app'],
					delay: 1000,
					env: {
						PORT: 3000
					},
					cwd: __dirname
			}
		}
	},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
				logConcurrentOutput: true
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.option('force', true);
	grunt.registerTask('default', ['concurrent'])
}

	
