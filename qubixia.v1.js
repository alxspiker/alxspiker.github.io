const MainUrl = "https://qubixia.bubbleapps.io/version-test/"

function update_page_content(url){
    document.getElementById("page-content").src = MainUrl+url;
}

window.addEventListener("message", function (event) {
    // Check if the message is from the iframe
    if (event.origin == "https://qubixia.bubbleapps.io") {
        // Get the data from the message
        var data = event.data;
        // Do something with the data
        console.log("Parent:"+data);
        // Send a message back to the iframe
        event.source.postMessage("Got it!", "*");
    }
});