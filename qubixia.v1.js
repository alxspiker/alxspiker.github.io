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

window.addEventListener("message", function (event) {
    // Check if the message is from the iframe
    if (event.origin == "https://qubixia.bubbleapps.io") {
        if (event.data.hasOwnProperty("command")) {
            // Get the command and the data
            const command = event.data.command;
            const data = event.data.data || {};
        
            // Execute the appropriate function
            switch (command) {
                case "pinet_authenticate":
                    function pi_login(event){
                        // Get the data from the message
                        var data = event.data;
                    
                        Pi.authenticate(['username','payments','wallet_address'], onIncompletePaymentFound).then(function(auth) {
                        //Pi.authenticate(['payments','username'], onIncompletePaymentFound).then(function(auth) {
                            //Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
                            Pi.LoggedInUser = auth;
                            // Send a message back to the iframe
                            update_page_content("pinet-authenticate?data="+JSON.stringify(auth), false);
                            //user_login_complete(auth);
                        }).catch(function(error) {
                            Pi.LoggedInUser = null;
                            if (confirm('Failed to authenticate, please refresh the page to try again:'+error)) {
                                window.location.reload();
                            }
                        });
                    }
                    pi_login(event);
                    break;
                case "pinet_deposit":
                    function pi_deposit(event) {
                        var data = event.data;
                        alert(toString(data));
                    }
                    pi_deposit(event);
                    break;
                default:
                    break;
            }
        }
    }
});

// Initialize the Pi SDK
Pi.init({ version: "2.0", sandbox: false });