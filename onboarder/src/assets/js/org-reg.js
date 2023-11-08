$(document).ready(function(){

    var current_fs, next_fs, previous_fs; //fieldsets
    
    
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    
    setProgressBar(current);
    

    $(".next").click(function() {
        var formData = getFormData();
        current_fs = $(this).parent();
        next_fs = $("fieldset").eq(current);
        
        // Perform validation based on the current step before proceeding to the next step
        if (current === 2 && !validateStep1(formData)) {
            return false;
        } else if (current === 3 && !validateStep2(formData)) {
            return false;
        } else if (current === 4 && !validateStep3()) {
            return false;
        }
        else if (current === 5 && !validateStep4(formData)) {
            return false;
        }

        // Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        // Show the next fieldset
        next_fs.show();


        current_fs.animate({opacity: 0}, {
        step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;
        
        current_fs.css({
        'display': 'none',
        'position': 'relative'
        });
        next_fs.css({'opacity': opacity});
        },
        duration: 500
        });
        setProgressBar(++current);
        });

        $(".success").click(function(){
            
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            
            //show the next fieldset
            document.addEventListener('postRequestSuccess', function ()
            {
            next_fs.show();

            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
            step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;
            
            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
            },
            duration: 500
            });
            setProgressBar(++current);
            }); });
    
    
    $(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    previous_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(--current);
    });
    
    function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
    .css("width",percent+"%")
    }
    
    $(".submit").click(function(){
    return false;
    });

  
   function validateStep1(formData) {
   
    const organization = getFormData(formData);

    if (organization.orgName.trim() === '' || 
        organization.orgType.trim() === '' || 
        organization.about.trim() === '' || 
        organization.orgHistory.trim() === ''
        ) {
        Swal.fire('Error', 'Please fill out all fields.', 'error');
        return false;
    }

    return true; // Step 1 is valid
}



function validateStep2(formData) {
    const organization = getFormData(formData);
    if (organization.mission.trim() === '' || 
    organization.vision.trim() === '' || 
    organization.coreValues.trim() === '') {
        Swal.fire('Error', 'Please fill out all fields', 'error');
        return false;
    }


    return true; // Step 2 is valid
}

function validateStep3(){
    return true;
}

function validateStep4(formData) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const organization = getFormData(formData);
    if (organization.orgEmail.trim() === '' || 
        organization.password.trim() === '') {
        Swal.fire('Error', 'Please fill out all fields in Step 3.', 'error');
        return false;
    }

    if (!organization.orgEmail.match(emailRegex)) {
        Swal.fire('Error', 'Please enter a valid email address.', 'error');
        return false;
    }

    return true; // Step 3 is valid
}




function getFormData() {
    var formData = {
        orgName: $("#orgName").val(),
        orgType: $("#orgType").val(),
        orgEmail: $("#orgEmail").val(),
        password: $("#password").val(),
        about: $("#about").val(),
        orgHistory: $("#orgHistory").val(),
        mission: $("#mission").val(),
        vision: $("#vision").val(),
        coreValues: $("#coreValues").val()
    };
    return formData;
}

    
    }); 