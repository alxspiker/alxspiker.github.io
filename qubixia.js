const MainUrl = "https://qubixia.bubbleapps.io/version-test/"

function update_page_content(url){
    document.getElementById("page-content").src = MainUrl+url;
}

function onIncompletePaymentFound(payment) {
  alert('incomplete:'+payment);
};

function pi_login(){
  Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
    alert('authenticate:'+auth);
    Pi.LoggedInUser = auth;
    // Load the main page content using fetch and innerHTML
    update_page_content("home")
  }).catch(function(error) {
    alert('Failed to authenticate, please refresh the page to try again:'+error);
    Pi.LoggedInUser = null;
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
});

// Initialize the Pi SDK
Pi.init({ version: "2.0", sandbox: false });

// Check if the user is already logged in
if (Pi.LoggedInUser) {
  // If so, load the main page content
  pi_login();
} else {
  // If not, show the Pi login button
  Pi.renderButton(document.getElementById("page-content"), pi_login);
}