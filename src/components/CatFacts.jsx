import { useState } from 'react';

const CatFacts = () => {
  const [fact, setFact] = useState('');

  const fetchCatFacts = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const facts = await response.json();

      setFact(facts.fact);
      setCursor(facts.fact);
    } catch (error) {
      console.log(error);
    }
  };

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
  );
};

export default CatFacts;
