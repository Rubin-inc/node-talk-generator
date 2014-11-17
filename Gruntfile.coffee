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
            dev: [
                './bin', './obj'
                '*.js', '*/*.js'
                '*.map', '*/*.map'
                ]
    
    grunt.registerTask 'default', ['build']
    grunt.registerTask 'build', ['clean:dev', 'typescript']
    grunt.registerTask 'install', ['typescript']
    
    require('load-grunt-tasks')(grunt)
