$(function () {
    // Get the button for uploading CV.
    var uploadButton = $(".border-btn4");

    // Add event listener for button click.
    $(uploadButton).click(function (e) {
        e.preventDefault();

        // Prompt the user to be aware of attaching their CV.
        var confirmation = confirm("Before sending the email, please remember to attach your CV. Click OK to proceed.");

        if (confirmation) {
            // Construct the email content with a reminder message.
            var emailContent = "Please find attached my CV.\n\nPlease ensure that the CV is attached before sending this email.";

            // Adjust the recipient email address.
            var recipient = "Lwando@smileyjobs.co";

            // Construct the email subject.
            var subject = "New CV Submission";

            // Send the email with the reminder message.
            var emailUrl = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(emailContent);

            // Open user's email client with pre-filled email.
            window.location.href = emailUrl;
        }
    });
});
