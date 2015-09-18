// Install the plugins required as dependencies in package.json with npm install

module.exports = function(grunt) {

    // require mozjpeg
    var mozjpeg = require('imagemin-mozjpeg');

    // Configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compile Sass/SCSS to CSS
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded',    // preserves readability
                    sourceMap: true,    // generate sourceMap
                    outFile: 'css/style.css.map'    // sourceMap file
                },
                files: {'css/style.css' : 'src/scss/style.scss'},    // 'production_file' : 'Sass/SCSS'
            },
        },

        // concat and minify JS
        uglify: {
            // use this by registering 'uglify:dev'
            dev: {
                options: {
                    beautify: true,    // make the code beautiful
                    mangle: false,    // don't change any variables
                    compress: false,    // don't minify the JS
                    preserveComments: 'all'    // keep all comments
                },
                files: [{
                    src: [
                        'src/javascript/prereq/*.js',    // jQuery and Bootstrap
                        'src/javascript/js/*.js',    // JS libraries and jQuery plugins
                        'src/javascript/config/*.js'    // your JS
                    ],
                    dest: 'js/script.js'    // development version of your concatenated scripts
                }]
            },
            build: {
                files: [{
                    src: [
                        'src/javascript/prereq/*.js',
                        'src/javascript/js/*.js',
                        'src/javascript/config/*.js'
                    ],
                    dest: 'js/script.min.js'    // production
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

        // minify CSS
        cssmin: {
            full: {
                files: [{
                    src: 'css/style.css',    // processed CSS
                    dest: 'css/style.min.css'    // minified file
                }]
            },
        },

        // minify images -- jpeg using mozjpeg
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3,    // adjust the amount of compression from 0 to 12 **
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]    // use mozjpeg for jpeg compression
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',    // source image directory
                    src: ['large/*.{png,jpg}'],    // subfolders to search for png and jpeg files
                    dest: 'img/'    // destination -- will create directories that match subfolders
                }]
            },
        },

        // copy files
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',    // source directory
                    src: [    // subfolders to search for files
                        'pages/*.{png,jpg}',
                        'texture/*.{png,jpg}',
                        'code_logos/*.{png,jpg}'
                    ],
                    dest: 'img/'    // destination -- will create directories that match subfolders
                }],
            },
        },

        // Grunt watch
        watch: {
            js: {
                files: [    // files to watch for changes
                    'src/javascript/prereq/*.js',
                    'src/javascript/js/*.js',
                    'src/javascript/config/*.js'
                ],
                tasks: ['uglify:dev']    // task to run when a change is detected
            },
            css: {
                files: ['src/scss/**/*.scss'],    // files to watch for changes
                tasks: ['sass:dev']    // task to run when a change is detected
            },
        },

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');

    //Register tasks -- Grunt watch doens't need to be registered. newer runs the task only with new files
    grunt.registerTask('default', [
        'sass:dev',
        'newer:uglify:build',
        'includes:build',
        'cssmin:full',
        'newer:imagemin:dynamic',
        'newer:copy:img']);
}    // end exports
