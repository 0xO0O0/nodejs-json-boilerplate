/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
        globals: { require: false, __dirname: false, console: false, module: false, exports: false }
      }
    },
    simplemocha:{
      options:{
        globals: ['should'],
        reporter: 'spec',
        slow: 200,
        timeout: 1000
      },

      all: {src: 'spec/**/*.js' }
    },
    watch:{
      all:{
        files:['spec/**/*.js'],
        tasks:['test']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha', 'watch:all']);

  grunt.registerTask('supervise', function() {
    this.async();
    require('supervisor').run(['app/app.js']);
  });

  grunt.registerTask('test', 'simplemocha');
};
