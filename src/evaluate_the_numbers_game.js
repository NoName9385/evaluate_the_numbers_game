// This would be stored in the 'src' folder of the GitHub repository
// evaluate_the_numbers_game
import React, { useState } from 'react';

function GuessNumberGame() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState('');

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setResult('請輸入1到100之間的數字');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === randomNumber) {
      setResult(`恭喜你,你猜對了! 你總共猜了 ${attempts + 1} 次。`);
    } else if (guess < randomNumber) {
      setResult('太小了,再試試看。');
    } else {
      setResult('太大了,再試試看。');
    }
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  return (
    <div>
      <h1>猜數字遊戲</h1>
      <p>請猜一個1到100之間的數字。</p>
      <input type="number" value={userGuess} onChange={handleInputChange} />
      <button onClick={handleGuess}>猜</button>
      <div>{result}</div>
    </div>
  );
}

export default GuessNumberGame;