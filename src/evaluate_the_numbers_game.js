// This would be stored in the 'src' folder of the GitHub repository
// evaluate_the_numbers_game

window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const GuessTheNumber = ({ assetsUrl }) => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState(0);
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const handleGuess = () => {
      if (guess === randomNumber) {
        setMessage(`Congratulations, you guessed the number in ${timer} seconds!`);
        resetGame();
      } else if (guess < randomNumber) {
        setMessage("Too low, try again!");
      } else {
        setMessage("Too high, try again!");
      }
    };

    const resetGame = () => {
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
      setGuess(0);
      setTimer(0);
      setMessage('');
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
      React.createElement('button', { onClick: resetGame }, "Reset")
    );
  };

  return () => React.createElement(GuessTheNumber, { assetsUrl: assetsUrl });
};

ReactDOM.render(<App />, root);

ReactDOM.render(
  React.createElement(window.initGame(React, '')),
  document.getElementById('root')
);