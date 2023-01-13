(function () {
  const app = document.querySelector('.app');
  const socket = io();

  let inputName;

  app
    .querySelector('.login-page #join-user')
    .addEventListener('click', function (e) {
      e.preventDefault();
      let username = app.querySelector('.login-page #username').value;
      if (username.length == 0) {
        return;
      }
      socket.emit('newuser', username);
      inputName = username;
      app.querySelector('.login-page').classList.remove('active');
      app.querySelector('.chat-page').classList.add('active');
    });

  app
    .querySelector('.chat-page #send-message')
    .addEventListener('click', function () {
      let message = app.querySelector('.chat-page #message-input').value;
      if (message.length == 0) {
        return;
      }
      renderMessage('my', {
        username: inputName,
        text: message,
      });
      socket.emit('chat', {
        username: inputName,
        text: message,
      });
      app.querySelector('.chat-page #message-input').value = '';
    });

  app
    .querySelector('.chat-page #exit-chat')
    .addEventListener('click', function () {
      socket.emit('exituser', inputName);
      window.location.href = window.location.href;
    });

  socket.on('update', function (update) {
    renderMessage('update', update);
  });

  socket.on('chat', function (message) {
    renderMessage('other', message);
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector('.chat-page .messages');
    if (type == 'my') {
      let el = document.createElement('div');
      el.setAttribute('class', 'message my-message');
      el.innerHTML = `
              <div>
                  <div class='name'>You</div>
                  <div class='text'>${message.text}</div>
              </div>
              `;
      messageContainer.appendChild(el);
    } else if (type == 'other') {
      let el = document.createElement('div');
      el.setAttribute('class', 'message other-message');
      el.innerHTML = `
              <div>
                  <div class='name'>${message.username}</div>
                  <div class='text'>${message.text}</div>
              </div>
              `;
      messageContainer.appendChild(el);
    } else if (type == 'update') {
      let el = document.createElement('div');
      el.setAttribute('class', 'update');
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    // scroll chat
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();
