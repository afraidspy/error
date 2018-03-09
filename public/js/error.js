$(function () {

    $('#report-error').click(function() {
        alert("Open............");
        ERROR_EVENTS.open_dialog();    
    });
});

var ERROR_EVENTS = ERROR_EVENTS || {

    open_dialog: function (card) {
        alert("Dialog...");

        //Configuración de la ventana modal del reporte de errores.
        $('#bug-message').dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            width: 400,
            buttons: {
                'Enviar': function () {
                    $('#bug-message').waitMe({
                        effect: 'pulse',
                        text: 'Cargando.',
                        color: '#25414f'
                    });
                    $(".ui-dialog-buttonpane button:contains('Enviar')").button("disable");
                    $(".ui-dialog-buttonpane button:contains('Cancelar')").button("disable");
                    $('.ui-dialog-titlebar button').button('disable');

                    var type = $('#type').val(),
                        error = $.trim($('#error-text').val()),
                        mail = $.trim($("#mail").val()).replace(/\s+/ig, ''),
                        url = $(location).attr('href'),
                        data = {};

                    if (type == '' || error == '') {
                        $('#bug-message').waitMe("hide");
                        alert('Seleccione o llene los campos requeridos.');
                        $(".ui-dialog-buttonpane button:contains('Enviar')").button("enable");
                        $(".ui-dialog-buttonpane button:contains('Cancelar')").button("enable");
                        $('.ui-dialog-titlebar button').button('enable');
                        return;
                    }

                    if (mail != '') {
                        if (!/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/.test(mail)) {
                            $('#bug-message').waitMe("hide");
                            alert('El correo electrónico introducido no es correcto.');
                            $(".ui-dialog-buttonpane button:contains('Enviar')").button("enable");
                            $(".ui-dialog-buttonpane button:contains('Cancelar')").button("enable");
                            $('.ui-dialog-titlebar button').button('enable');
                            return;
                        }

                        data.mail = mail;
                    }

                    data.type = type;
                    data.error = error;
                    data.url = url;
                    data.screen = screenPrint;
                    data.context = 'INFO--' + navigator.userAgent + ' STATE--' + JSON.stringify(state) + ' NAV--' + JSON.stringify(nav);

                    $.ajax({
                        url: '/soporte',
                        type: 'POST',
                        async: true,
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        data: {
                            'json': JSON.stringify(data)
                        },
                        success: function (answer) {
                            if (answer == 0) {
                                $('#bug-message').waitMe("hide");
                                $('#bug-message').dialog('close');
                                $('.bug-val').val('');
                            }
                            else {
                                $('#bug-message').waitMe("hide");
                                alert('Error inesperado, inténtelo de nuevo.');
                            }

                            $(".ui-dialog-buttonpane button:contains('Enviar')").button("enable");
                            $(".ui-dialog-buttonpane button:contains('Cancelar')").button("enable");
                            $('.ui-dialog-titlebar button').button('enable');
                        },
                        error: function () {
                            $('#bug-message').waitMe("hide");
                            alert('Error inesperado, inténtelo de nuevo.');
                            $(".ui-dialog-buttonpane button:contains('Enviar')").button("enable");
                            $(".ui-dialog-buttonpane button:contains('Cancelar')").button("enable");
                            $('.ui-dialog-titlebar button').button('enable');
                        }
                    });
                },
                'Cancelar': function () {
                    $('#bug-message').dialog('close');
                    $('.bug-val').val('');
                }
            }
        });
     
    }

};