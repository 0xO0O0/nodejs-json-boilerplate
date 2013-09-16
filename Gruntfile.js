/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

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
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint','karma']);

  grunt.registerTask('supervise', function() {
    this.async();
    require('supervisor').run(['app/app.js']);
  });

  grunt.registerTask('test',  ['karma']);
};
