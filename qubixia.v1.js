// In the parent window
//MAIN
const MainUrl = "https://qubixia.bubbleapps.io/version-test/"

function update_page_content(url){
    document.getElementById("page-content").src = MainUrl+url;
}

function onIncompletePaymentFound(payment) {
  alert('incomplete:'+payment);
};

function user_login_complete(data){
  var message = {
    command: "loginResult", // A command to help you identify the response
    data: data 
  };
  
  // Send the message to the iframe using the contentWindow property
  document.getElementById("page-content").contentWindow.postMessage(message, "https://qubixia.bubbleapps.io/version-test/");
}

function pi_login(){
  //Pi.authenticate(['payments','username'], onIncompletePaymentFound).then(function(auth) {
  Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
    //alert('authenticate:'+auth);
    Pi.LoggedInUser = auth;
    user_login_complete(auth);
    // Load the main page content using fetch and innerHTML
    //update_page_content("home");
  }).catch(function(error) {
    Pi.LoggedInUser = null;
    if (confirm('Failed to authenticate, please refresh the page to try again:'+error)) {
      window.location.reload();
    }
  });
}

// Create a function to be executed when the post message is received
function executeFunction(data) {
  // Get the function name and the arguments
  const functionName = data.function;
  const args = data.args;

  // Check if the function exists in the parent window
  if (typeof window[functionName] === "function") {
    // If so, execute it with the given arguments
    window[functionName].apply(null, args);
  }
}

// Create a post message listener
window.addEventListener("message", function (event) {
  // Check if the message is from the iframe
  if (event.origin == "https://qubixia.bubbleapps.io/version-test/") {
    // Check if the message has a 'command' property
    if (event.data.hasOwnProperty("command")) {
      // Get the command and the data
      const command = event.data.command;
      const data = event.data.data || {};

      // Execute the appropriate function
      switch (command) {
        case "executeFunction":
          executeFunction(data)
          break;
        default:
          // Handle other commands as needed
      }
    }
  }
});

// Initialize the Pi SDK
Pi.init({ version: "2.0", sandbox: false });

// Get the reference to the iframe element
var iframe = document.getElementById("myIframe");

// Wait for the iframe's document to load before sending the message
iframe.contentDocument.addEventListener("DOMContentLoaded", function() {
  // Create a message object with the command and the data
  var message = {
    command: "executeFunction",
    data: {
      // Specify the function name and the arguments
      function: "pi_login",
      args: [
        // Add any arguments you want to pass to the function
      ]
    }
  };

  // Use the post message handler function to send and receive the message
  postMessageHandler(
    window, // The current window object
    iframe.contentWindow, // The target window object
    "https://qubixia.bubbleapps.io/version-test/", // The target origin
    message, // The message object
    function (data) {
      // A callback function to execute after receiving a message
      // Do something with the data
      console.log(data);
    }
  );
});
