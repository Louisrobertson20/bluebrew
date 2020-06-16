AOS.init({
  duration: 1200,
})

function validateForm() {
  const formName = document.forms["contactForm"]["name"].value;
  const formEmail = document.forms["contactForm"]["email"].value;
  const formEnquiry = document.forms["contactForm"]["enquiry"].value;
  if (formName == "") {
    alert("Name is required");
    return false;
  }
  if (formEmail == "") {
    alert("Email address is required");
    return false;
  }
  if (formEnquiry == "") {
    alert("Feedback / Enquiry is required");
    return false;
  }
}
