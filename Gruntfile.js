/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['gruntFile.js', 'app/**/*.js', 'lib/*.js', 'test/**/*.js', 'config/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: { require: false, __dirname: false, console: false, module: false, exports: false, myapp: false }
      }
    },
    simplemocha:{
      options:{
        globals: ['should'],
        reporter: 'spec',
        slow: 200,
        timeout: 1000
      },

      all: {src: ['spec/**/*.js'] }
    },
    watch:{
      all:{
        files:['spec/**/*.js', 'app/**/*.js', 'lib/**/*.js'],
        tasks:['simplemocha']
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'app/app.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha', 'watch:all']);

  grunt.registerTask('server', 'nodemon');

  grunt.registerTask('test', 'simplemocha');
};
