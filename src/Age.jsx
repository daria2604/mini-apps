import { useState, useEffect } from 'react';

function Age() {
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [prevQuery, setPrevQuery] = useState('');

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    const timer = setTimeout(fetchData, 3000);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [id, prevQuery]);

  const fetchData = async () => {
    if (id && prevQuery !== id) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { signal }
        );
        const data = await response.json();
        setAge(data.name);
        setPrevQuery(id);
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
    setId(evt.target.value);
    setError('');
    abortController.abort();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    fetchData();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Введите ваше имя'
          onChange={handleChange}
        />
        <button type='submit'>Получить возраст</button>
      </form>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <p>Ваш возраст: {age}</p>
    </>
  );
}

export default Age;
