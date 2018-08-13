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
                var name = $('tab-content').find('#input-name');
                var password = $('tab-content').find('#input-password');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/loginByPassword.json",
                    contentType: "application/x-www-form-urlencoded",
                    data: {"name":name,"password":password},

                    success: function(response) {
    
                    //entered in the success block means our service call is succeeded properly
    
                        var resp = JSON.stringify(response.text); // we are accessing the text from the json object(response) and then converting it in to the string format 
                        console.log(JSON.stringify(response)); // print the response in console
                        alert(resp); // alert the response
    
                    },
                    error: function(request, status, error) {
                    console.log("Error status " + status);
                    console.log("Error request status text: " + request.statusText);
                    console.log("Error request status: " + request.status);
                    console.log("Error request response text: " + request.responseText);
                    console.log("Error response header: " + request.getAllResponseHeaders());
                    }
            }); 
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