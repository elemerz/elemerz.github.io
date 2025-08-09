window.ezQuiz = {
    async init() {
        const quizId = window.location.hash.slice(1).toLowerCase();
        //const quizId = '01';
        // 2. Handle the case where no hash is provided in the URL
        if (!quizId) {
            $('#slickQuiz').html('<h2>Please select a quiz.</h2><p>You can start a quiz by adding its ID to the URL. For example: <code>index.html#quiz-a</code></p>');
            // Stop the function from running further
            return;
        }
        //const quizJsonPath = 'quiz/quiz-A.json';
        const quizJsonPath = `quiz/${quizId}.json`;
        try {
            // Use fetch to get the JSON file
            const response = await fetch(quizJsonPath);

            // Check if the request was successful (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON data from the response
            const quizData = await response.json();

            // Now that you have the data, initialize the slickQuiz plugin
            $('#slickQuiz').slickQuiz({
                json: quizData,
                skipStartButton: true,
                perQuestionResponseMessaging: true,
                perQuestionResponseAnswers: false,
                checkAnswerText: 'Na, nézzük',
                nextQuestionText: 'Következő',
                completeQuizText: 'Vége',
                backButtonText: 'Vissza',
                preventUnanswered: true,
                questionCountText: '%current az %total -ből',
                preventUnansweredText: 'Válassz egy opciót',
                completionResponseMessaging: false
            });

        } catch (error) {
            // If anything goes wrong (network error, file not found, invalid JSON)
            // log the error to the console and display a message to the user.
            console.error('Could not load quiz data:', error);
            $('#slickQuiz').html('<h2>Sorry, the quiz could not be loaded at this time.</h2>');
        }
    }
};

window.addEventListener('load', ezQuiz.init.bind(ezQuiz));