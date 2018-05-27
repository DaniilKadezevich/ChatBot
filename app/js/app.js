'use strict';
$(document).ready( async () => {
    let newBot = new Bot();
    await newBot.getAnswers();


    console.log(newBot.answers);


    let secretMessage = 'Bye';

    let [$sendBtn, $messageInput, $body] = [$('#send-btn'), $('#message'), $('body')];

    $sendBtn.hide();

    $body.keydown((e) => {
        if (e.keyCode === 13) {
            let message = $messageInput.val().trim();
            if (message){
                if (newBot.state === 'waiting') {
                    newBot.startDialog();
                    console.log('e');
                }
                generateDialog(newBot, message, secretMessage, $messageInput);
                $sendBtn.hide();
            }
        }
    });
    $messageInput.on('input', () => {
        if($messageInput.val()){
            $sendBtn.show();
        } else {
            $sendBtn.hide();
        }
    });
    $sendBtn.on('click', () => {
        let message = $messageInput.val().trim();
        if (message) {
            if (newBot.state === 'waiting') {
                newBot.startDialog();
            }
            generateDialog(newBot, message, secretMessage, $messageInput);
            $sendBtn.hide();
        }
    });
});

