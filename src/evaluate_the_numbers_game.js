// This would be stored in the 'src' folder of the GitHub repository
// evaluate_the_numbers_game

window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const GuessTheNumber = ({ assetsUrl }) => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState(0);
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(0);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [bestTime, setBestTime] = useState(Infinity);
    const [score, setScore] = useState(100);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const handleGuess = () => {
      if (guess === randomNumber) {
        const newTime = timer;
        setMessage(`Congratulations, you guessed the number in ${newTime} seconds!`);
        setCorrectGuesses(correctGuesses => correctGuesses + 1);
        setScore(score => score + 100);
        if (newTime < bestTime) {
          setBestTime(newTime);
        }
        resetGame();
      } else if (guess < randomNumber) {
        setMessage("Too low, try again!");
        setIncorrectGuesses(incorrectGuesses => incorrectGuesses + 1);
        setScore(score => score - 10);
      } else {
        setMessage("Too high, try again!");
        setIncorrectGuesses(incorrectGuesses => incorrectGuesses + 1);
        setScore(score => score - 10);
      }
    };

    const resetGame = () => {
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
      setGuess(0);
      setTimer(0);
      setMessage('');
      setScore(100);
    };

    return React.createElement(
      'div',
      { className: "guess-the-number" },
      React.createElement('h2', null, "Guess the Number"),
      React.createElement('p', null, "Please enter a number between 1 and 100:"),
      React.createElement(
        'input',
        {
          type: 'number',
          min: 1,
          max: 100,
          value: guess,
          onChange: (e) => setGuess(parseInt(e.target.value))
        }
      ),
      React.createElement('button', { onClick: handleGuess }, "Guess"),
      React.createElement('p', null, message),
      React.createElement('p', null, `Time elapsed: ${timer} seconds`),
      React.createElement('button', { onClick: resetGame }, "Reset"),
      React.createElement('p', null, `Correct guesses: ${correctGuesses}`),
      React.createElement('p', null, `Incorrect guesses: ${incorrectGuesses}`),
      React.createElement('p', null, `Best time: ${bestTime === Infinity ? 'N/A' : bestTime} seconds`),
      React.createElement('p', null, `Score: ${score}`)
    );
  };

  return () => React.createElement(GuessTheNumber, { assetsUrl: assetsUrl });
};



