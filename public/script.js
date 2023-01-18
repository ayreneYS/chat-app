(() => {
  const app = document.querySelector('.app');
  const socket = io();
  const joinUserButton = app.querySelector('.login-page #join-user');
  const sendMessageButton = app.querySelector('.chat-page #send-message');
  const exitChatButton = app.querySelector('.chat-page #exit-chat');
  const usernameInput = app.querySelector('.login-page #username');
  const messageInput = app.querySelector('.chat-page #message-input');
  const messageContainer = app.querySelector('.chat-page .messages');
  let inputName;

  joinUserButton.addEventListener('click', handleJoinUserClick);
  sendMessageButton.addEventListener('click', handleSendMessageClick);
  exitChatButton.addEventListener('click', handleExitChatClick);

  socket.on('update', renderUpdate);
  socket.on('chat', renderChat);

  function handleJoinUserClick(e) {
    e.preventDefault();
    const username = usernameInput.value;
    if (username.length === 0) return;
    socket.emit('newuser', username);
    inputName = username;
    app.querySelector('.login-page').classList.remove('active');
    app.querySelector('.chat-page').classList.add('active');
  }

  function handleSendMessageClick() {
    const message = messageInput.value;
    if (message.length === 0) return;
    renderMessage('my', {
      username: inputName,
      text: message,
    });
    socket.emit('chat', {
      username: inputName,
      text: message,
    });
    messageInput.value = '';
  }

  function handleExitChatClick() {
    socket.emit('exituser', inputName);
    window.location.href = window.location.href;
  }

  function renderUpdate(update) {
    renderMessage('update', update);
  }

  function renderChat(message) {
    renderMessage('other', message);
  }

  function renderMessage(type, message) {
    if (type === 'my') {
      const el = document.createElement('div');
      el.setAttribute('class', 'message my-message');
      el.innerHTML = `
        <div>
            <div class='name'>You</div>
            <div class='text'>${message.text}</div>
            </div>`;
      messageContainer.appendChild(el);
    } else if (type === 'other') {
      const el = document.createElement('div');
      el.setAttribute('class', 'message other-message');
      el.innerHTML = `<div>
            <div class='name'>${message.username}</div>
            <div class='text'>${message.text}</div>
            </div>
            `;
      messageContainer.appendChild(el);
    } else if (type === 'update') {
      const el = document.createElement('div');
      el.setAttribute('class', 'update');
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    // scroll chat
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();
