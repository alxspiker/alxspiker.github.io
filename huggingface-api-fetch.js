// Listen for messages from the parent window
window.addEventListener('message', function(event) {
    if (event.data.type === 'fetchRequest') {
        const apiKey = event.data.apiKey;
        const messages = event.data.messages;

        fetch('https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "Qwen/Qwen2.5-72B-Instruct",
                "messages": messages,
                "max_tokens": 500,
                "stream": false
            })
        })
        .then(response => response.json())
        .then(data => {
            window.opener.postMessage({ type: 'chatResponse', data: data }, '*');
            window.close();
        })
        .catch(error => {
            window.opener.postMessage({ type: 'error', error: error.toString() }, '*');
            window.close();
        });
    }
}, false);
