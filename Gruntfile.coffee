_ = require('lodash')

module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        typescript:
            options:
                module: 'commonjs'
                target: 'es5'
                sourceMap: false
                declaration: false
                noImplicitAny: true
                comments: false
            all:
                src: ['./index.ts', 'lib/**/*.ts', 'test/**/*.ts']
        
        mochacov:
            options:
                files: ['test/unit/**/*.js', 'test/system/*.js']
            test:
                options:
                    reporter: 'spec'
            
            coveralls:
                options:
                    coveralls:
                        serviceName: 'travis-ci'

        clean:
            dev: [
                './bin', './obj'
                '*.js', 'lib/**/*.js', 'test/**/*.js'
                '*.map', '**/*.map'
                ]
        
        esteWatch:
            options:
                dirs: ['.', 'lib/**', 'test/**']
                livereload:
                    enabled: false
            
            ts: (filepath) ->
                grunt.config ['typescript', 'all', 'src'], [filepath]
                ['typescript']
    
    grunt.registerTask 'default', ['typescript']
    grunt.registerTask 'build', ['clean:dev', 'typescript']
    grunt.registerTask 'watch', ['esteWatch']
    
    testTasks = ['mochacov:test']
    testTasks.push 'mochacov:coveralls' if process.env.TRAVIS
    grunt.registerTask 'test', testTasks
    
    require('load-grunt-tasks')(grunt)