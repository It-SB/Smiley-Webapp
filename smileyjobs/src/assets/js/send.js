$(function () {
    // Get the form.
    var form = $("#contactForm");

    // Get the messages div.
    var formMessages = $("#form-messages");

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Get the form data.
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        // Construct the email content.
        var emailContent = "Name: " + name + "\n";
        emailContent += "Email: " + email + "\n";
        emailContent += "Subject: " + subject + "\n";
        emailContent += "Message:\n" + message + "\n";
        
        // Adjust the recipient email address.
        var recipient = "Lwando@smileyjobs.co";

        // Construct the email subject.
        var subject = "SmileyJobs General Enquiry Form";

        // Send the email.
        var emailUrl = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(emailContent);
        window.location.href = emailUrl;

        // Clear the form.
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");

        // Display success message.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");
        $(formMessages).text("Message sent successfully!");
    });
});
