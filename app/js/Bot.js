'use strict';

class Bot {
    constructor() {
        // this.getAnswers();
        this.setDialogDuration();
        this.state = 'waiting';
    }
    answer() {
        let delay = Math.random() * 10;
        let answer = this.answers[Math.floor(Math.random() * this.answers.length)];
        setTimeout(() => {
            if (this.state === 'in progress') {
                sendMessage('Bot', answer);
            }
        }, delay * 1000)
    }
    goodbye() {
        this.state = 'finished';
        let delay = Math.random() * 10;
        setTimeout(() => {
            sendMessage('Bot', 'Bye, have a beautiful time!');
        }, delay * 1000)
    }
   async getAnswers() {
        let response = await $.getJSON('data.json');
        this.answers = response.answers;
    }
    setDialogDuration() {
        this.duration = (Math.random() * 30) + 30;
    }
    startDialog() {
        this.state = 'in progress';
         setTimeout(() => {
             if (this.state === 'in progress') {
                 this.state = 'finished';
                 sendMessage('Bot', 'This is the end');
             }
        }, this.duration * 1000)
    }
}