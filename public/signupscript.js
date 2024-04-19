document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up successfully
        var user = userCredential.user;
        console.log("User signed up:", user);
        document.getElementById("message").innerHTML = "Sign up successful!";
      })
      .catch((error) => {
        // Handle errors here
        var errorMessage = error.message;
        console.error("Error:", errorMessage);
        document.getElementById("message").innerHTML = errorMessage;
      });
  });
  