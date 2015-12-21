/* ---------------------------------------------------------------
script.js - 스크립트, 2015 Wonchang Shin 
---------------------------------------------------------------- */
(function($) { 
    $(document).ready(init);
    function init() {
        //addRequiredStar();
        addListenerToMenus();
        addListenerToSignUpButton();
        addListenerToLoginButton();
    };


    function addRequiredStar() {
        var target = $('[required]', '#reg');
        $('<span/>', {
            text: '*',
            css: {
                'color': '#ff4248', 
                'font': 'bold 12px Verdana',
                'vertical-align': 'middle', 
                'margin-left': '5px' 
            }
        }).insertAfter(target);
    };

    function addListenerToMenus() {
        var $menu_login = $('#menu_login');
        var $menu_signup = $('#menu_signup');
        $menu_login.bind('click', function() {
            console.log('Login menu clicked');
            $('#loginModalLabel').html('<i class="fa fa-user"></i>&nbsp; Login to Call Planner');
            $('#login_dialog').removeClass('hidden');
            $('#name').addClass('hidden');
            $('#modal_button_signup').addClass('hidden');
            $('#modal_button_login').removeClass('hidden');
        });
        $menu_signup.bind('click', function() {
            console.log('Sign Up menu clicked');
            $('#loginModalLabel').html('<i class="fa fa-sign-in"></i>&nbsp; Sign up Call Planner');
            $('#login_dialog').removeClass('hidden');
            $('#name').removeClass('hidden');
            $('#modal_button_signup').removeClass('hidden');
            $('#modal_button_login').addClass('hidden');
        });
    };

    function addListenerToSignUpButton() {
        var target = $('input', '#reg');
        var $button = $('#modal_button_signup');
        var $spinner = $('<div id="spinner" align=center><i class="fa fa-spinner fa-spin fa-3x"></i></div>');

        $button.bind('click', function(e) {
            var form = {};
            $(target).each(function() {
                var self = $(this);
                var name = self.attr('id');
                if(self.attr('required') && self.val() == '') {
                    console.log('input required: ', self.attr('id'));	
                    return;
                };
                if(form[name]) {
                    form[name] = form[name] + ',' + self.val();
                }
                else {
                    form[name] = self.val();
                }
            });

            console.log('form data: ', form);	
            $.ajax({
                url: 'http://221.146.204.186:3003/api/Subscribers',
                type: 'post',
                dataType: 'json',
                data: form,
                error: function(xhr, status, error) {
                    console.log('POST failure: ', xhr, status, error);
                },
                success: function(result, status, xhr) {
                    console.log('POST success: ', result, status, xhr);
                },
            });
                    /*
                       $('#login_dialog').addClass('hidden');
                       $spinner.insertAfter($('#login_dialog'));
                       */
        });
    };

    function addListenerToLoginButton() {
        var target = $('input', '#reg');
        var $button = $('#modal_button_login');

        $button.bind('click', function(e) {
            var form = {};
            $(target).each(function() {
                var self = $(this);
                var name = self.attr('id');
                if(self.attr('required') && self.val() == '') {
                    console.log('input required: ', self.attr('id'));	
                    return;
                };
                if(form[name]) {
                    form[name] = form[name] + ',' + self.val();
                }
                else {
                    form[name] = self.val();
                }
            });

            console.log('form data: ', form);	
            $.ajax({
                url: 'http://221.146.204.186:3003/api/Subscribers/login',
                type: 'post',
                dataType: 'json',
                data: form,
                error: function(xhr, status, error) {
                    console.log('POST failure: ', xhr, status, error);
                },
                success: function(result, status, xhr) {
                    console.log('POST success: ', result, status, xhr);
                },
            });
        });
    };
/*
   function setConfiguration(target) {
        var $button = $('#reg_new'),
            input_ready = true,
            input_name, input_sipuri, input_pass, input_wsserver;

        console.log('button: ', $button);
        $button.bind('click', function(e) {
            $(target).each(function() {
                var $this = $(this);
                if($this.attr('required') && $this.val() == '') {
                    console.log('input required: ', $this.attr('name'));	
                    input_ready = false;
                    return;
                };
            });

            if(input_ready) {
                e.preventDefault();
                console.log('input_ready: ', input_ready)

            };
        });	
    };
    */

})(jQuery);
