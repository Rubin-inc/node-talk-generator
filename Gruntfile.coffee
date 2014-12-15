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
            prod:
                src: ['./index.ts', 'lib/**/*.ts']
                dest: './dist/'
            dev:
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
                '*.js', 'lib/**/*.js', 'test/**/*.js', 'dist',
                '*.map', '*/*.map'
                ]
        
        esteWatch:
            options:
                dirs: ['.', 'lib/**', 'test/**']
                livereload:
                    enabled: false
            
            ts: (filepath) ->
                grunt.config ['typescript', 'dev', 'src'], [filepath]
                ['typescript:dev']
    
    grunt.registerTask 'default', ['typescript:dev']
    grunt.registerTask 'build', ['clean:dev', 'typescript:dev', 'typescript:prod']
    grunt.registerTask 'watch', ['esteWatch']
    
    testTasks = ['mochacov:test']
    testTasks.push 'mochacov:coveralls' if process.env.TRAVIS
    grunt.registerTask 'test', testTasks
    
    require('load-grunt-tasks')(grunt)