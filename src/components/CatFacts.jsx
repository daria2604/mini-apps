import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  Textarea,
} from '@vkontakte/vkui';
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
    <FormLayoutGroup mode='vertical'>
      <Div style={{ textAlign: 'center' }}>
        <FormItem htmlFor='fact'>
          <Textarea
            name='catfact'
            id='catFact'
            placeholder='Здесь будет факт о кошках.'
            defaultValue={fact}
          />
        </FormItem>
        <Button size='l' onClick={fetchCatFacts}>
          Узнать факт
        </Button>
      </Div>
    </FormLayoutGroup>
  );
};

export default CatFacts;
