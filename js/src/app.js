$(document).ready(function() { //Cuando la pagina esta cargada por completo 

    //Ponemos el foco en el primer Input
    $(".auto-focus").focus();

    $("form").on("submit", function() { //Cuando se intenta enviar el formulario

        //Validación de titulo
        var title = $.trim($("#title").val());


        if (title == "") {
            alert("El titulo no puede ser vacio");
            return false;
        }

        //Validacion de la URL
        var url = $.trim($("#cover_url").val());
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
        if (url != "" && false == pattern.test(url)) {
            alert("La URL de la carátula no es válida");
            return false;
        }

        //Validacion del argumento
        var plot = $.trim($("#plot").val());
        if( plot == ""){
            alert("El argumento no puede ser vacio");
            return false;
        }


        //Validacion de la fecha
        var fecha = $.trim($("#fecha").val());
        if (fecha == ""){

        }


        //Validacion de las categorias

        var selectedCategories = $('input[name="category"]:checked');
        if(selectedCategories.length == 0){
            alert("Seleciona almenos una categoria");
            return false;
        }


        //Validacion de clasificación por edad




        //Validacion de puntuación




        //alert("Enviando formulario");

        
        return false;
    });

});
