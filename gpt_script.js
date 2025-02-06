const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const msgContainer = document.querySelector(".msg");

// groq api key : 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

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});



async function sendMessage() {
    const userMessage = userInput.value.trim();

    if (userMessage === "") return; 

    displayMessage(userMessage, "user");
    userInput.value = "";

    try {
        const botResponse = await getBotResponse(userMessage);
        displayMessage(botResponse, "bot");
    } catch (error) {
        displayMessage("Oops! Something went wrong.", "bot");
        console.error(error);
    }

    // second parameter user and bot are just the name of the class
}



function displayMessage(text, sender) {

    const messageDiv = document.createElement("div");
    
    if (sender === "bot") {
        const sidecon = document.createElement("div");
        sidecon.classList.add("ri-robot-3-fill")
        msgContainer.appendChild(sidecon)
    }
    else {
        const widecon = document.createElement("div");
        widecon.classList.add("ri-user-star-fill");
        msgContainer.appendChild(widecon);
    }

    messageDiv.classList.add("message", sender); // adding class to the div
    messageDiv.textContent = text;


    msgContainer.appendChild(messageDiv);

    // **Scroll to the bottom**
    msgContainer.scrollTop = msgContainer.scrollHeight;
}




async function getBotResponse(userMessage) {
    const apiKey = "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"; // Replace with your actual API key
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

    const requestBody = {
        model: "mixtral-8x7b-32768", // Change this to the correct model name you want to use
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 100,
        temperature: 0.7
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
            // conv erts array into string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // It converts the response from the API into a JavaScript object.
        
        return data.choices[0].message.content; 
        // Extract the chatbot's response
        // return is the final output of this function REMEMEBER
    
    } catch (error) {
        console.error("Error fetching Groq API:", error);
        return "Oops! Something went wrong.";
    }
}


// AWAIT :-
// await is used to pause the execution of an async function until 
// the promise resolves. This helps handle asynchronous tasks (like API 
// requests) without blocking the rest of the code.
// await can only be used inside an async function.

// ASYNC :- 
// async allows waiting for something to finish before moving forward.
// await tells JavaScript: "Pause here until we get the result."
// Without async, JavaScript won’t wait and might try to eat a pizza that hasn’t arrived yet! 🍕🚀


// data.choices[0].message.content :-
// It extracts the chatbot's actual text response.
// data.choices → This is an array containing chatbot responses.
// data.choices[0] → This gets the first response from the chatbot.
// data.choices[0].message → This is an object containing the chatbot’s message.
// data.choices[0].message.content → This is the actual text the chatbot sends back!
    
// USER used ?
// look at this response from model :
// Of course, User! I'll do my best to provide a helpful and respectful 
// response. What can I assist you with today?