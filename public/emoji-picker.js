(function () {
  const emojis = [
    '😀',
    '😊',
    '😂',
    '😍',
    '🥺',
    '😢',
    '😭',
    '🤔',
    '😴',
    '🤯',
    '😳',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🌺',
    '🌻',
    '🍁',
    '🐛',
    '🐝',
    '🍔',
    '🍟',
    '🍕',
    '🌮',
    '🍩',
  ];

  const emojiPicker = document.getElementById('emoji-picker');
  const emojiButton = document.getElementById('emoji-button');
  const emojiList = document.getElementById('emoji-list');
  const messageInput = document.getElementById('message-input');

  emojis.forEach((emoji) => {
    const emojiButton = document.createElement('button');
    emojiButton.innerHTML = emoji;
    emojiButton.addEventListener('click', () => {
      messageInput.value += emoji;
    });
    emojiList.appendChild(emojiButton);
  });

  // Show/hide emoji
  emojiButton.addEventListener('click', () => {
    emojiPicker.classList.toggle('emoji-picker-closed');
  });
})();
