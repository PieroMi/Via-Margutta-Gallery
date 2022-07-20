const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault() // not let the submit button to refresh page

    const { name, email, message } = event.target;  // Creating a constant for each of the inputs submitted

    const endpoint = // This is the API endpoint url to call from the browser
        "https://hwktxokt9e.execute-api.us-east-1.amazonaws.com/default/sendContactEmail"
        
        // Used JSON.stringify so the data can be sent as a string via HTTP to the API
        const body = JSON.stringify({
            senderName: name.value,
            senderEmail: email.value,
            message: message.value
        });

        const requestOptions = {
            method: "POST",
            body
        };

        fetch(endpoint, requestOptions)
            .then((response) => {
                if(!response.ok) throw new Error("Error in fetch");
                return response.json();
            })
            .then((response) => {
                document.getElementById("result-text").innerText = "Email sent successfully!";
            })
            .catch((error) => {
                document.getElementById("result-text").innerText = "An unknown error occurred.";
            });
});

