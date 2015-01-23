/**
 * litebox
 * @author Anthony Su
 */
module.exports = function (grunt) {

    "use strict";
    require("load-grunt-tasks")(grunt);

    var assetsDir = "assets/",
        sassDir = assetsDir + "scss/",
        cssDir = assetsDir + "css/",
        jsDir = assetsDir + "js/";

    grunt.initConfig({
        sass: {
            build: {
                options: {
                    style: "expanded",
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: sassDir,
                    src: ["*.scss"],
                    dest: cssDir,
                    ext: ".css",
                }]
            }
        },
        watch: {
            css: {
                files: [sassDir + "*.scss", sassDir + "**/" + "*.scss"],
                tasks: ["sass"]
            },
            scripts: {
                files: ["Gruntfile.js", jsDir + "src/*.js", jsDir + "src/**/*.js", "test/unit/*.js"],
                tasks: ["jshint", "build"]
            }
        },
        build: {
            // data
            all: {
                dest: jsDir + "litebox-app.js",
            }
        },
        mocha: {
          test: {
            src: ['test/**/*.html'],
            options: {
              reporter: 'Nyan',
              run: false,
              log: true
            }
          },
        },
        jshint: {
            options: {
                "browser": true,
                "jquery": true,
                "strict": false,
                "newcap": true,
                "undef": true,
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "noarg": true,
                "sub": true,
                "boss": true,
                "eqnull": true,
                "laxcomma": true,
                "laxbreak": true,
                "indent": 4,
                "globals": {
                    // Node Constants
                    "module": false,
                    "require": false,
                    "define": false,
                    //browser constants
                    "console": false,

                }
            },
            all: {
                src: [
                    "Gruntfile.js", jsDir + "src/litebox-app.js",
                    jsDir + "src/**.js"
                ]
            }
        }
    });

    grunt.loadTasks(jsDir + "build/tasks");

    grunt.registerTask("default",["jshint", "build"]);


};
