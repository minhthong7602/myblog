toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function displaySuccess(message) {
    toastr.success(message);
}

function displayError(message) {
    toastr.error(message);
}

function displayWarning(message) {
    toastr.warning(message);
}

function displayInfo(message) {
    toastr.info(message);
}