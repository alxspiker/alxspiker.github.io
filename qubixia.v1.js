const MainUrl = "https://qubixia.bubbleapps.io/version-test/"

function update_page_content(url){
    document.getElementById("page-content").src = MainUrl+url;
}

function pi_login(event){
    // Get the data from the message
    var data = event.data;

    Pi.authenticate(['payments','username'], onIncompletePaymentFound).then(function(auth) {
        //Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
        Pi.LoggedInUser = auth;
        // Send a message back to the iframe
        event.source.postMessage(auth, event.origin);
        //user_login_complete(auth);
    }).catch(function(error) {
        Pi.LoggedInUser = null;
        if (confirm('Failed to authenticate, please refresh the page to try again:'+error)) {
            window.location.reload();
        }
    });
  }

window.addEventListener("message", function (event) {
    // Check if the message is from the iframe
    if (event.origin == "https://qubixia.bubbleapps.io") {
        pi_login(event);
    }
});

// Initialize the Pi SDK
Pi.init({ version: "2.0", sandbox: false });