appServices.factory('messenger', function () {
    return {

        showErrorMessage: function (msg) {
            Messenger({
                extraClasses: 'messenger-fixed messenger-on-right messenger-on-top',
                theme: 'flat'
            }).post({
                message: msg,
                type: 'error',
                showCloseButton: true
            });
        }
    };
});
