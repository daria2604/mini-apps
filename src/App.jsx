import { useState } from 'react';
import './App.css';

function App() {
  const [fact, setFact] = useState('');

  function fetchCatFacts() {
    fetch('https://catfact.ninja/fact')
      .then((res) => res.json())
      .then((data) => {
        setFact(data.fact);
        setCursor(data.fact);
      });
  }

  function setCursor(sentence) {
    const words = sentence.split(' ');
    const firstWord = words[0];
    const restOfSentence = sentence.substring(firstWord.length + 1);

    let inputElement = document.getElementById('catFact');
    inputElement.focus();
    inputElement.value = firstWord + ' ' + restOfSentence;
    inputElement.setSelectionRange(firstWord.length, firstWord.length);
  }

  return (
    <>
      <div>
        <button onClick={fetchCatFacts}>get a fact</button>
        <textarea
          name='catfact'
          id='catFact'
          cols='30'
          rows='10'
          defaultValue={fact}
        ></textarea>
      </div>
    </>
  );
}

export default App;
