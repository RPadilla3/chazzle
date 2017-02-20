module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        // all of our task configuration goes in here

        clean: ['build/'],

        jshint: {
            //all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'] ,
            options: {
                jshintrc: '.jshintrc',
                ignores: ['node_modules/**']
            },
            source: {
                files: {
                    src: [ 'src/js/**/*.js' ]
                }
            },
            // test: {
            //     files: {
            //         src: [ 'test/specs/**/*.js' ]
            //     }
            // }
        },

        sass: {
            allStyles: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [ 'chazzle.html' ],
                        dest:  'build/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: [ '*.png' ],
                        dest:  'build/images/'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css/',
                        src: [ 'normalize.css' ],
                        dest:  'build/css/'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: [ 'chazzle.js' ],
                        dest:  'build/js/'
                    }
                ]
            },
            vendorjs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: [ 'jquery.min.js' ],
                        dest: 'build/js/depen/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/pixi.js/dist/',
                        src: [ 'pixi.min.js' ],
                        dest: 'build/js/depen/'
                    }
                ]
            }
        },

        concat: {
            js: {
                src: [ 'src/js/**/*.js' ],
                dest: 'build/js/chazzle.js'
            }
        },

        // connect: {
        //     testing: {
        //         options: {
        //             port: 8888,
        //             base: '.'
        //         }
        //     }
        // },
        //
        // mocha: {
        //     all: {
        //         options: {
        //             urls: [
        //                 'http://localhost:8888/test/thought-data-spec.html'
        //             ]
        //         }
        //     }
        // },

        watch: {
            html: {
                files: ['src/index.html'],
                tasks: ['copy:html']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['test', 'concat', ]
            },
            // sass: {
            //     files: ['src/sass/*.scss'],
            //     tasks: [ 'sass' ]
            // },
            // test: {
            //     files: ['test/specs/**/*.js', 'test/*.html'],
            //     tasks: ['test']
            // }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask( 'test', [ 'jshint' ]);
    grunt.registerTask( 'default', [ 'clean', 'test', 'copy', 'concat' ] );

};
