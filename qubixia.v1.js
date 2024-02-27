const MainUrl = "https://qubixia.bubbleapps.io/version-test/"

function update_page_content(url, full_url=false){
    if(!full_url){
        url = MainUrl+url
    }
    document.getElementById("page-content").src = url;
}

function onIncompletePaymentFound(payment) {
    alert('incomplete:'+payment);
};

function pi_login(event){
    // Get the data from the message
    var data = event.data;

    Pi.authenticate(['username','payments','wallets'], onIncompletePaymentFound).then(function(auth) {
    //Pi.authenticate(['payments','username'], onIncompletePaymentFound).then(function(auth) {
        //Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
        Pi.LoggedInUser = auth;
        // Send a message back to the iframe
        update_page_content("authenticate?data="+JSON.stringify(auth), false);
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