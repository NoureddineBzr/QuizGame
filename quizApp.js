const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: 1
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: 1
    },
    
  ];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 10;
  let timerInterval;
  
  const startBtn = document.getElementById('start-btn');
  const submitBtn = document.getElementById('submit-btn');
  const replayBtn = document.getElementById('replay-btn');
  
  function startQuiz() {
    startBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
    displayQuestion();
    countdown();
  }
  
  startBtn.addEventListener('click', startQuiz);
  
  function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuestion = questions[currentQuestionIndex];
  
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
  
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.addEventListener('click', () => checkAnswer(index));
      optionsElement.appendChild(li);
    });
  }
  
  function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
      score++;
      document.getElementById('score-value').textContent = score;
    }
    nextQuestion();
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }
  
  function endGame() {
    clearInterval(timerInterval);
    document.getElementById('question').textContent = 'Quiz Finished!';
    document.getElementById('options').innerHTML = '';
    document.getElementById('timer').textContent = '';
    submitBtn.style.display = 'none';
    replayBtn.style.display = 'inline-block';
  }
  
  function countdown() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
      timer--;
      timerElement.textContent = `Time left: ${timer}s`;
      if (timer === 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }
  
  submitBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
      nextQuestion();
    } else {
      endGame();
    }
  });
  
  replayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    timer = 10;
    startBtn.style.display = 'inline-block';
    replayBtn.style.display = 'none';
    document.getElementById('score-value').textContent = score;
    displayQuestion();
    countdown();
  });
  