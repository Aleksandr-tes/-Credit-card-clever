$(document).ready(function(){
    $(document).on('submit', '#feedback_form form', function(e){
        e.preventDefault();
        feedback_check = 0;
        $("#feedback_form input.form-text").each(function(){
            if ($(this).parent().hasClass('js-required'))
            {
                if (!$(this).val())
                {
                    var name = $(this).parent().attr('data-name');
                    $(this).parent().find('.input-error').text('Заполните поле "'+name+'"');
                    $(this).parent().find('.input-error').show();
                    $(this).addClass('error');
                    feedback_check = 1;
                }
                else
                {
                    $(this).parent().find('.input-error').text(' ');
                    $(this).parent().find('.input-error').hide();
                    $(this).removeClass('error');
                }
            }
        });

        $("#feedback_form .form-textarea").each(function(){
            if ($(this).parent().hasClass('js-required'))
            {
                if (!$(this).val())
                {
                    var name = $(this).parent().attr('data-name');
                    $(this).parent().find('.input-error').text('Заполните пожалуйста поле "'+name+'"');
                    $(this).parent().find('.input-error').show();
                    $(this).addClass('error');
                    feedback_check = 1;
                }
                else
                {
                    $(this).parent().find('.input-error').text(' ');
                    $(this).parent().find('.input-error').hide();
                    $(this).removeClass('error');
                }
            }
        });

        if(!$('#feedback_form .js-confirm').is(':checked'))
        {
            feedback_check = 1;
            $('#feedback_form .check-error').text('Необходимо принять условия обработки').show();;

        }
        else
        {
            $('#feedback_form .check-error').text('').hide();
        }

        if($('#feedback_form .email-check').val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test($('#feedback_form .email-check').val())){
                $('#feedback_form .email-check').parent().find('.input-error').text(' ');
                $('#feedback_form .email-check').parent().find('.input-error').hide();
                $('#feedback_form .email-check').removeClass('error');
            } else {
                feedback_check = 1;
                $('#feedback_form .email-check').parent().find('.input-error').text('Введен не корректный адрес email');
                $('#feedback_form .email-check').parent().find('.input-error').show();
                $('#feedback_form .email-check').addClass('error');
            }
        }

        if (!feedback_check) {
            $.post('/ajax/feedback.php', $(this).serialize(), function (data) {
                data = jQuery.trim(data);
                if (data.indexOf('Спасибо') >= 0) {
                    $('#feedback_form .captcha-error').hide();
                    $('#feedback_form .form_item_error').hide();
                    $('#feedback_form .input-error').text(' ')
                    $("#feedback_form").fadeOut(300, function () {
                        $('#feedback_form input[type=text], #feedback_form textarea').val("");
                        $('.js-refresh').trigger('click');
                        $('#confirm_message').fadeIn(300);
                        setTimeout(function () {
                            $('#confirm_message').fadeOut(300);
                            $('.forms_wrap').hide();
                        }, 4500);
                    });
                }
                else {
                    $('#feedback_form .captcha-error').html(data);
                    $('#feedback_form .captcha-error').show();
                }
                $('.js-refresh').click();
            });
        }
    });

    $(document).on('click', '.js-refresh', function(e){
        e.preventDefault();
        var $form = $(this).parents('form');
        $.ajax({
            url: '/reload-captcha/index.php',
            dataType: 'json',
            success: function(data){
                $('input[name=captcha_sid]', $form).val(data.code);
                $('.image_captcha img', $form).attr('src', '/bitrix/tools/captcha.php?captcha_sid=' + data.code);
            }
        });
    });
});