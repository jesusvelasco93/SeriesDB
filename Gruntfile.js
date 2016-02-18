module.exports = function (grunt) {

    //configuración de Grunt
    var settings = {
        less:{
            style: {
                files:{ //Archivos a compilar
                    "style.css":"less/style.less" //destino:origen
                },
            }
        },
        watch: {
            styles: {
                files: ["less/*.less"], //observa cualquier cambio en los archivos LESS
                tasks: ["less"], //ejecuta la compilación LESS
                options: {
                    spawn: false // para que no se quede tostado (creo)
                }
            }
        }
    };

    //Cargamos configuaración de Grunt
    grunt.initConfig(settings);

    //Cargamos plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Definimos tareas disponibles para grunt-client
    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('production' ['less']);
};