const log = console.log;
const quizLink = `https://play.howstuffworks.com/quiz/family-guy-quiz`;

$(document).ready(function () {
    const questions_n_answers = {
        1: {
            question: `As of 2015, how many seasons of "Family Guy" have aired?`,
            options: [20, 10, 15],
            answer: 15,
            questionStatus: undefined
        },
        2: {
            question: 'How old is Quagmire?',
            options: [55, 61, 42],
            answer: 61,
            questionStatus: undefined
        },
        3: {
            question: `What is Peter's all-time favorite song?`,
            options: [`Surfin' Bird`, `The Word`, `Surfin' USA`],
            answer: `Surfin' Bird`,
            questionStatus: undefined
        },
        4: {
            question: `"Family Guy" was the first animated show to be nominated for an Emmy since:`,
            options: [`The Simpsons`, `The Flintstones`, `The Jetsons`],
            answer: `The Flintstones`,
            questionStatus: undefined
        },
        5: {
            question: `Stewie starts working out at the gym after he gets beat up by:`,
            options: [`Brian`, `Meg`, `Joe's baby daughter`],
            answer: `Joe's baby daughter`,
            questionStatus: undefined
        }
    }

    $('#game_alert_message').hide();
    $('#score_board').hide();
    let questionNumber = 1;
    let currentQuestion = '';
    let currentGuess = '';
    let correctGuesses = 0;
    let incorrectGuesses = 0;
    let timer = 25;
    $('.timer').text(`Time: ${timer}`);

    let intervalTimer = setInterval(decreaseTimer, 1000);
    displayQuesions();

    // decreases the timer
    function decreaseTimer() {
        // Display timer
        timer--;
        $('.timer').text(`Time: ${timer}`);
        if (timer <= 0 && currentGuess === '') {
            incorrectGuesses++;
            $('.option').addClass('disabled');
            $('#game_alert_message').removeClass('alert-success');
            $('#game_alert_message').addClass('alert-danger');
            $('#game_alert_message').text(`You did not answer in time ⌛️`);
            $('#game_alert_message').show();

            clearInterval(intervalTimer);
            setTimeout(newQuestion, 3500);
        }
    }


    // displays the questions
    function displayQuesions() {
        currentQuestion = questions_n_answers[questionNumber].question;
        $('.question').text(currentQuestion);

        let orderList = $(`<ol class='list-group' id='ordered_list'>`);
        let options = questions_n_answers[questionNumber].options;

        options.forEach((option) => {
            log(`option: ${option}`);
            let list = $(`<li>`);
            list.attr('value', option);
            list.addClass('list-group-item');
            list.addClass('option');
            list.addClass('option');
            orderList.append(list.text(option));
        });

        $('.options').append(orderList);
    }

    // Checks if hovering over the options for styling effect
    $('.option').hover(function (event) {
        let isHovering = $(this).is(':hover');
        if (isHovering) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    $(document).on('click', '.option', (event) => {
        let { value, innerHTML } = event.target;

        if (questionNumber <= 2) {
            checkAnswer(value);
        } else {
            checkAnswer(innerHTML);
        }
    });

    function checkAnswer(clickedValue) {
        let correctAnswer = questions_n_answers[questionNumber].answer;
        currentGuess = clickedValue;
        // if the value the user clicked on is the same as the correct answer then update the correctGuesses variable

        if (clickedValue === correctAnswer) {
            correctGuesses++
            $('.option').addClass('disabled');
            $('#game_alert_message').removeClass('alert-danger');
            $('#game_alert_message').addClass('alert-success');
            $('#game_alert_message').show();
            $('#game_alert_message').text(`Correct 🎉`);

            clearInterval(intervalTimer);
            setTimeout(newQuestion, 3500);
        } else {
            // else, if the user's answer is incorrect then update the incorrectGuess counter
            incorrectGuesses++

            $('.option').addClass('disabled');
            $('#game_alert_message').removeClass('alert-success');
            $('#game_alert_message').addClass('alert-danger');
            $('#game_alert_message').show();
            $('#game_alert_message').text(`Incorrect ❌ Correct Answer: ${correctAnswer}`);

            clearInterval(intervalTimer);
            setTimeout(newQuestion, 3500);
        }
    }


    function newQuestion() {
        // Goes to next question
        questionNumber++;
        if (questionNumber <= 5) {
            // Hides game alert
            $('#game_alert_message').hide();

            // no current guess 
            currentGuess = '';

            $('.option').removeClass('disabled');
            timer = 25;
            $('.timer').text(`Time: ${timer}`);

            intervalTimer = setInterval(decreaseTimer, 1000);

            displayQuesions();
            $('#ordered_list').remove();

            $('.option').hover(function (event) {
                let isHovering = $(this).is(':hover');
                if (isHovering) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });

        } else {
            // Remove Quiz items from the screen
            $('.timer').hide();
            $('.question').hide();
            $('#ordered_list').hide();
            $('#game_alert_message').hide();

            $('.correct').text(`Correct: ${correctGuesses}`);
            $('.incorrect').text(`Incorrect: ${incorrectGuesses}`)
            $('#score_board').show();
        }
    }

    $('#play_again_btn').on('click', function () {
        // location.reload();

        currentGuess = '';
        incorrectGuesses = 0;
        correctGuesses = 0;
        questionNumber = 1;
        timer = 25;
        $('#ordered_list').remove();
        $('.timer').text(`Time: ${timer}`);
        intervalTimer = setInterval(decreaseTimer, 1000);

        $('.timer').show();
        $('.question').show();
        $('#ordered_list').show();
        $('#game_alert_message').hide();
        $('#score_board').hide();
        displayQuesions();

        $('.option').hover(function (event) {
            let isHovering = $(this).is(':hover');
            if (isHovering) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });


    })
});