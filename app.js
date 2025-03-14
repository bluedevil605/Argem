let btn = document.querySelector(".btn");
let chatinput = document.querySelector(".chat");
let chatInputElement = document.querySelector(".chat");

let botresponse = 'intializing the response.....';
let chatdisplay = document.querySelector(".chat-display");
function handleclick() {
    let chatInputElement = chatinput.value.trim(); 
    if(btn){
        if (chatInputElement !== ""){
                chatdisplay.innerHTML = chatdisplay.innerHTML + `<br><div><strong>You:</strong> ${chatInputElement}</div><br>`
                async function callapi() {
                    try {
                        setTimeout(() => {
                            chatdisplay.innerHTML = chatdisplay.innerHTML + `<div><strong>Argem:</strong> ${botresponse}</div>`
                        },1);
                        const API_KEY = "AIzaSyDFCbM6trDlSCnnunMDaA1L4sUiVkAdgMg";
                        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
                        
                        const response = await fetch(url, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ contents: [{ parts: [{ text: `${chatInputElement}` }] }] }),
                        });
                        
                        const data = await response.json();
                        chatdisplay.innerHTML += `<br><div><strong>Argem:</strong> ${data.candidates[0].content.parts[0].text}`
                        console.log(data.candidates[0].content.parts[0].text);
                        
                    } catch (error) {
                        console.log(error);
                    }
                     
                }
                callapi();
                chatinput.value = "";
                
            }
    }
} 
chatinput.addEventListener("keydown",function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleclick();
        
    }
})


