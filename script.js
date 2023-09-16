const socket = io(); // Assumes Socket.io is set up on the backend

// DOM elements
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');

// Event listener for sending messages
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press in the message input
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Emit the message to the server
        socket.emit('chatMessage', message);

        // Clear the message input
        messageInput.value = '';
    }
}

// Function to append a received message to the chat
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Listen for incoming messages from the server
socket.on('message', (message) => {
    appendMessage(message);
});
