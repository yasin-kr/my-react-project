import { useState } from 'react';

const ClickCounter = () => {
  const [tut, setTut] = useState([]);

  const ekleArr = () => {
    tut.push(setTut('Selam'));
  };
  return (
    <>
      <button onClick={ekleArr}>Arttır</button>
      <div>{tut}</div>
    </>
  );
};

export default ClickCounter;
