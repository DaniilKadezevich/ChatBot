'use strict';
let sendMessage = (name, answer, input) => {
    let parent = $('#chat-block').find('.container');
    let [messageRow, messageCol, messageBlock, imgBlock, textBlock, userText, userName, messageText] = [
        $('<div>', {class: 'row'}),
        $('<div>', {class: 'col-12'}),
        $('<div>', {class: 'message d-flex align-items-start'}),
        $('<div>', {class: 'img-block'}),
        $('<div>', {class: 'text-block'}),
        $('<div>', {class: 'user-text'}),
        $('<div>', {class: 'user-name', text: name}),
        $('<div>', {class: 'user-message-text', text: answer})
    ];
    if (input) {
        input.val('');
    }
    imgBlock.css('background-image', `url(img/${name}.jpg)`);

    userName.appendTo(userText);
    messageText.appendTo(userText);
    userText.appendTo(textBlock);
    imgBlock.appendTo(messageBlock);
    textBlock.appendTo(messageBlock);
    messageBlock.appendTo(messageCol);
    messageCol.appendTo(messageRow);
    messageRow.appendTo(parent);

    scrollToBottom();
};
let keepGoing = (bot, message, input) => {
    sendMessage('Someone', message, input);
    if (bot.state === 'in progress') {
        bot.answer();
    }
};
let finishDialog = (bot, message, input) => {
    sendMessage('Someone', message, input);
    if (bot.state === 'in progress') {
        bot.goodbye();
    }
};
let generateDialog = (bot, message, secretMessage, input) => {
    if (message !== secretMessage) {
        keepGoing(bot, message, input);
    } else {
        finishDialog(bot, message, input);
    }
};

let scrollToBottom = () => {
    window.scrollTo(0,document.body.scrollHeight);
};
