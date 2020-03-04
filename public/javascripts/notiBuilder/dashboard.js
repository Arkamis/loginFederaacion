
(function(){

    var reader = new FileReader();

    reader.onload = function(e) {
        $('#imgNoti').attr('src', e.target.result);
    }

    function readUrl(i){
        if(i.files && i.files[0]){
            if($('.epigrafe').hasClass("active") == false){
                $('.epigrafe').toggleClass('active');
            }
            $('#imgName').html(i.files[0].name);
            reader.readAsDataURL(i.files[0]);
        }
    }
    //llamo cuando el input:file tiene un cambio
    $('#imgInput').change(function(){
        readUrl(this);
    });
    $(document).ready(function () {
        //Lo utilizo para esconder el input file y darle estilo personalizado con <label> y boton
        $('#imgButton').click(function(e){
            $('#imgInput').click();
            e.preventDefault();
        });
        $('#createNew').click(function(e){
            $(this).attr('aria-disabled', true);
            $(this).toggleClass('disabled');
            e.preventDefault();
        });
        $('#cancelNew').click(function(e){
            $('#createNew').removeAttr('aria-disabled');
            $('#createNew').toggleClass('disabled');
            e.preventDefault();
        })

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#content').toggleClass('active');
        });
        function showElement(){
            $('$#deudas'.toggleClass('active'));
            $('$#pagos'.toggleClass('active'));
        }
        var modules = document.getElementsByClassName('noti-info');
        if(modules.length > 0){
            for(let module in modules){
                $clamp(module, {clamp: 3});
            }
        }
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });
        
        $('.clampThis').each(function(index, element) {
            $clamp(element, { clamp: 3, useNativeClamp: true });
        });
    });
})();
