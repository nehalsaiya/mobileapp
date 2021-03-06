var Controller = function() {
    var controller = {
        self: null,
        initialize: function() {
			 self = this;
            this.bindEvents();
			self.pwsPost(); 
            
        },

        bindEvents: function() {
            $('.tab-button').on('click', this.onTabClick);
			
        },

        onTabClick: function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                return;
            }
            
            var tab = $(this).data('tab');
            if (tab === '#loginpwd') {
                self.pwsPost();
				
            } else {
                self.otpPost();
            }
        },

        otpPost: function() {
            $('.tab-button').removeClass('active');
			$('#login-otp-id').addClass('active');
            var $tab = $('#tab-content');
            $tab.empty();
            $("#tab-content").load("./views/loginviaotp.html", function(data) {
			   $('#tab-content').find('#submit-loginotp').click('submit', self.onLoginOtp);
            }); 
        },
       
        pwsPost: function() {
            $('.tab-button').removeClass('active');
           $('#login-password-id').addClass('active');

            var $tab = $('#tab-content');
            $tab.empty();
			
            var $projectTemplate = null;
            $("#tab-content").load("./views/loginviapwd.html", function(data) {
			    $('#tab-content').find('#submit-loginpwd').click('submit', self.onLoginPwd);
            }); 
        },

		onLoginPwd: function(e) {
			  e.preventDefault();
			$("#container-data").load("./views/dashboard.html", function(data) {
                
                
            }); 
		},
		onLoginOtp: function(e) {
			e.preventDefault();
			$("#container-data").load("./views/dashboard.html", function(data) {
               
                
            }); 
		}

		
    }
    controller.initialize();
    return controller;
}