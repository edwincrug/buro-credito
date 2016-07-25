appServices.factory('notificationFactory', function () {
    return {
        success: function (text) {
            toastr.options = {
                positionClass: "toast-top-right",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.success(text, '¡Éxito!');
        },
        successTopFull: function (text) {
            toastr.options = {
                positionClass: "toast-top-full-width",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.success(text, '¡Éxito!');
        },
        error: function (text) {
            toastr.options = {
                positionClass: "toast-top-right",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.error(text, 'Error');
        },
        info: function (text) {
            toastr.options = {
                positionClass: "toast-top-right",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.info(text, 'Información');
        },
        infoTopFull: function (text) {
            toastr.options = {
                positionClass: "toast-top-full-width",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.info(text, 'Información');
        },
        warning: function (text) {
            toastr.options = {
                positionClass: "toast-top-right",
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                closeButton: true
            }
            toastr.warning(text, 'Atención');
        }
    };
});


