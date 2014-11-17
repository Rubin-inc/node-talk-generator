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
        
        clean:
            dev: [
                './bin', './obj'
                '*.js', '*/*.js'
                '*.map', '*/*.map'
                ]
    
    grunt.registerTask 'default', ['typescript:dev']
    grunt.registerTask 'build', ['clean:dev', 'typescript']
    
    require('load-grunt-tasks')(grunt)
