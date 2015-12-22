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

}());