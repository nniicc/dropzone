(function() {
    //form
    $('.btn-file :file').on('change', function(event) {
        numFiles = event.target.files.length;
        label = event.target.files[0].name;

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    });
    //form
    $(".file-text").click(function(event) {
        event.preventDefault();
        $('.btn-file :file').trigger('click');
    });

    $(".dropzone").dropzone({
        url: 'upload.php',
        margin: 20
    });

}());