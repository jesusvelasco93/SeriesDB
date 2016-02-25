$(document).ready(function() { //Cuando la pagina esta cargada por completo 
    function reloadSeries() {
        console.log("Cargando series");
        $.ajax({
            //method: 'get',             //Tipo de peticion
            url: "/api/series/",         //Donde esta guardado
            success: function(data) {
                console.log("Series recuperadas", data);
                var html = "";
                for (var i in data) {
                    var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || "";
                    html += "<li>";
                    html += title;
                    if (url.length > 0) {
                        html += " (" + url + ")";
                    }
                    html +=' <button data-serieid="' + id + '">Eliminar</button>';
                    html += "</li>";
                }
                $("#seriesList").html(html); // innerHTML = html
            }
        });
    }

    //Recarga de serie
    $("#reloadSeriesButton").on("click", reloadSeries);

    reloadSeries();

    //Borrado de serie
    $("#seriesList").on("click", "button", function(){
        console.log("Eliminando series", this);
        var self = this;
        var id = $(self).data("serieid"); //cojo el valor del atributo data-serieid del boton
        $.ajax({
            method: "delete",
            url:"/api/series/" + id,
            success: function(){
                $(self).parent().remove();
                //reloadSeries();
            }
        });
    });


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
        if (plot == "") {
            //alert("El argumento no puede ser vacio");
            //return false;
        }


        //Validacion de la fecha
        var fecha = $.trim($("#date").val());
        if (fecha == "") {
            //alert("La fecha no puede ser vacio");
            //return false;
        }


        //Validacion de las categorias

        var selectedCategories = $('input[name="category"]:checked');
        if (selectedCategories.length == 0) {
            alert("Seleciona almenos una categoria");
            return false;
        }


        //Validacion de clasificación por edad
        var selectedAge_call = $('input[name="age_call"]:checked');
        if (selectedAge_call.length == 0) {
            //alert("Seleciona una edad");
            //return false;
        }



        //Validacion de puntuación
        var range = $.trim($("#range").val());
        if(range < 0){
            alert("Seleciona una edad");
            return false;
        }



        //alert("Enviando formulario");

        $.ajax({
            method: 'post', //Tipo de peticion
            url: "/api/series/", //Donde lo guardamos
            data: JSON.stringify({ //Transformacion a JSON
                title: title, //Parametro que envias y como los representas
                url: url
            }),
            contentType: 'application/json', //Tipo de contenido que envias
            success: function() { //Lo que pasa cuando la petición va bien
                alert("guardado con exito");
                reloadSeries();
            },
            error: function() { //Lo que pasa cuando la petición va mal
                alert("se ha producido un error");
            }
        });

        return false;
    });


});
