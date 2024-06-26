document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.textContent = message;
            chatWindow.appendChild(messageElement);
            messageInput.value = "";
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
