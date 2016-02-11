(function() {

    $(".dropzone").dropzone({
        url: 'upload.php',
        margin: 20,
        params:{
            'action': 'save'
        },
        success: function(res, index){
            console.log(res, index);
        }
    });

    $(".dropzone2").dropzone({
        url: 'upload.php',
        margin: 20,
        allowedFileTypes: 'image.*, pdf',
        params:{
            'action': 'save'
        },
        preview: true,
        success: function(res, index){
            console.log(res, index);
        }
    });
}());
