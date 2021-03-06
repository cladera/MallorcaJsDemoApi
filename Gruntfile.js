'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      all: [
        'app/**/*.js',
        'config/**/*.js'
      ],
      test: [
        'test/**/*.js'
      ]

    },
    jscs: {
      options: {
        config: '.jscsrc',
        fix: true
      },
      all: [
        'app/**/*.js',
        'config/**/*.js'
      ],
      test: [
        'test/**/*.js'
      ]
    },
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },
    express: {
      test: {
        options: {
          node_env: 'test',
          script: 'app.js'
        }
      }
    },
    apidoc: {
      public: {
        src: "app/",
        dest: "docs/dist/public",
        options: {
          parsers: {
            visibility: __dirname+"/docs/lib/parsers/visibility-parser.js"
          },
          filters: [__dirname+"/docs/lib/filters/public-filter.js"]
        }
      },
      private: {
        src: "app/",
        dest: "docs/dist/private",
        options: {
          parsers: {
            visibility: __dirname+"/docs/lib/parsers/visibility-parser.js"
          },
          filters: []
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded)
          grunt.log.ok('Delayed live reload successful.');
        else
          grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);

  grunt.registerTask('docs', 'Generates api documentation', function (target) {
    if (!target){
      grunt.task.run('apidoc:private', 'apidoc:public');
    }else if(target === 'public' || target === 'private'){
      grunt.task.run('apidoc:'+target);
    }else{
      return false;
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'express',
    'mochaTest'
  ])
};
