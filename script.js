document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Your message can not be sent. You can connect through email or linkedin.Thank you!");
  this.reset();
});

