document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const usernameInput = document.getElementById('usernameInput');

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messagesContainer.innerHTML = messages.map((msg, index) => `
            <div class="p-2 mb-2 bg-gray-200 rounded">
                <strong>${msg.username}:</strong> ${msg.text} <small class="text-gray-500">(${msg.timestamp})</small>
                <button class="delete-button text-red-500 ml-2" data-index="${index}">Delete</button>
            </div>
        `).join('');
    };

    const saveMessage = (message) => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    };

    const deleteMessage = (index) => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
    };

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        const username = usernameInput.value.trim() || 'Anonymous';
        if (messageText) {
            const message = {
                text: messageText,
                username: username,
                timestamp: new Date().toLocaleTimeString()
            };
            saveMessage(message);
            loadMessages();
            messageInput.value = '';
        }
    });

    messagesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.getAttribute('data-index');
            deleteMessage(index);
        }
    });

    loadMessages();
});