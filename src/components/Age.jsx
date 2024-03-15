import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  Input,
  Text,
} from '@vkontakte/vkui';
import { useState, useEffect } from 'react';

function Age() {
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [prevQuery, setPrevQuery] = useState('');

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    const timer = setTimeout(fetchData, 3000);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [name, prevQuery]);

  const fetchData = async () => {
    if (name && prevQuery !== name) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.agify.io?name=${name}`, {
          signal,
        });
        const data = await response.json();
        setAge(data.age);
        setPrevQuery(name);
        setError('');
      } catch (error) {
        console.error(error);
        setError('Что-то пошло не так. Попробуйте еще раз.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  function handleChange(evt) {
    setName(evt.target.value);
    setError('');
    abortController.abort();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    fetchData();

    if (prevQuery === name) {
      setError('Введите другое имя');
    }
  }

  return (
    <>
      <FormLayoutGroup mode='vertical'>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <FormItem htmlFor='name'>
            <Input
              id='name'
              type='text'
              placeholder='Введите имя на английском языке'
              onChange={handleChange}
            />
          </FormItem>

          {(error || isLoading || age) && (
            <Div style={{ textAlign: 'center' }}>
              {error && <Text>{error}</Text>}
              {(!age && isLoading) && <Text>Загрузка...</Text>}
              {age && (
                <Text>Ваш возраст: {isLoading ? 'Загрузка...' : age}</Text>
              )}
            </Div>
          )}

          <Button size='l' type='submit'>
            Узнать возраст
          </Button>
        </form>
      </FormLayoutGroup>
    </>
  );
}

export default Age;
