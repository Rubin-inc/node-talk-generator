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
                comments: true
            root:
                src: './*.ts'
            lib:
                src: './lib/**/*.ts'
            test:
                src: './test/*.ts'
        
        clean:
            vs: ['./bin', './obj']
            js: ['*.js', '*/*.js']
            map: ['*.map', '*/*.map']
    
    grunt.registerTask 'default', ['build']
    grunt.registerTask 'build', ['clean', 'typescript']
    
    require('load-grunt-tasks')(grunt)
