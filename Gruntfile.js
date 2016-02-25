// Need another plugin? https://www.npmjs.com/ here's an example installation of JSHint
// npm install grunt-contrib-jshint --save-dev

module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    // mozjpeg must be required here
    var mozjpeg = require('imagemin-mozjpeg');

    // Configure tasks`
    grunt.initConfig({
        // read package.json for dependencies
        pkg: grunt.file.readJSON('package.json'),

        // concat Bower libraries
        bower_concat: {
            all: {
                dest: 'src/js/_bower.js',    // destination for bower JS
                cssDest: 'src/scss/_bower.scss',    // destination for bower CSS

                // if Bower cannot identify the main file for a package, you need to specify it here
                mainFiles: {
                    bootstrap: [
                        'dist/css/bootstrap.css',
                        'dist/js/bootstrap.js',
                     ],    // for 3.3.6
                },

                exclude: [],    // exclude components
                // EX: exclude: [ 'owlcarousel' ],

                include: [],    // include components not automatically included
                // EX: include: [ 'backbone' ],

                dependencies: {},    // if dependencies aren't managed, you can manually configure them here
                // EX: dependencies: { 'underscore': 'jquery' }

                bowerOptions: {
                    relative: false
                },
            },
        },

        // compile Sass/SCSS to CSS
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded',    // don't compress
                    sourceMap: true,    // generate sourceMap
                    outFile: 'css/style.css.map'    // sourceMap file
                },
                files: { 'css/style.css' : 'src/scss/style.scss' },    // 'css/production-file' : 'src/scss/source-file'
            },
        },

        // concat and minify JS
        uglify: {
            dev: {
                options: {
                    beautify: true,    // make the code pretty
                    mangle: false,    // don't change variables
                    compress: false,    // don't minify the JS
                    preserveComments: 'all'    // keep all comments
                },
                files: [{
                    src: [
                        'src/js/*.js',    // JS libraries and jQuery plugins
                        'src/js/config/*.js'    // your JS
                    ],
                    dest: 'js/script.js'    // dev concatenated scripts
                }]
            },
            build: {
                files: [{
                    src: [
                        'src/js/*.js',
                        'src/js/config/*.js'
                    ],
                    dest: 'js/script.min.js'    // production concatenated scripts
                }]
            },
        },

        // build the site using grunt-includes
        includes: {
            build: {
                cwd: 'src/html/',    // html file directory
                src: ['*.html'],    // source files
                dest: '.',    // publish to root directory
                options: {
                    flatten: true,    // removes source paths from publish directory
                    includePath: 'src/html/include',    // include directory
                },
            },
        },

        // make html pretty
        prettify: {
            options: {
                "condense": false,    // don't automatically strip lines
                "indent": 4,    // spaces to indent
                "indent_inner_html": false,    // <head> and <body>
                "brace_style": "collapse",    // braces on { same_line }
                "preserve_newlines": true,    // keep line breaks
                "max_preserve_newlines": 1,    // number of line breaks to keep
            },
            all: {
                expand: true,
                cwd: '.',
                ext: '.html',
                src: ['*.html'],
                dest: '.'
            },
        },

        // minify CSS
        cssmin: {
            full: {
                files: [{
                    src: 'css/style.css',    // CSS
                    dest: 'css/style.min.css'    // minified CSS
                }]
            },
        },

        // minify images - mozjpeg for jpg
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3,    // adjust the amount of compression for png files from 0 (none) to 7 (very compressed)
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]    // use mozjpeg for jpeg compression
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',    // source image directory
                    src: ['large/*.{png,jpg}'],    // subfolders to search for png and jpeg files
                    dest: 'img/'    // destination - will create directories that match subfolders
                }]
            },
        },

        // copy files
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',    // source directory
                     // subfolders to search for files
                    src: [
                        'pages/*.{png,jpg}',
                        'texture/*.{png,jpg}',
                        'code_logos/*.{png,jpg}'
                    ],
                    dest: 'img/'    // destination - will create directories that match subfolders
                }],
            },
        },

        // Grunt watch
        watch: {
            js: {
                files: [	// files to watch for changes
                    'src/js/*.js',
                    'src/js/config/*.js',
                ],
                tasks: [	// task to run when a change is detected
                    'uglify:dev',
                ],
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev'],
            },
        },

    });

    // Register tasks
    // prepending newer: runs tasks only on new or modified files
    grunt.registerTask('default', [
        'sass:dev',
        'includes:build',
        'prettify',
    ]);
    grunt.registerTask('build', [
        'bower_concat:all',
        'sass:dev',
        'uglify:dev',
        'uglify:build',
        'includes:build',
        'prettify',
        'cssmin:full',
        'newer:imagemin:dynamic',
        'newer:copy:img',
    ]);
}    // end exports
