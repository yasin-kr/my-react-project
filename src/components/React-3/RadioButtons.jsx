import { useState } from 'react';

export default function RadioButtons() {
  const [coffeeSize, setCoffeeSize] = useState('lg');
  const handleSizeChange = (evt) => {
    setCoffeeSize(evt.target.value);
  };
  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === 'sm'}
          onChange={handleSizeChange}
        />
        Small
      </label>
      {''}
      <br />
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === 'md'}
          onChange={handleSizeChange}
        />
        Medium
      </label>
      {'-'}
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === 'lg'}
          onChange={handleSizeChange}
        />
        Large
      </label>{' '}
    </>
  );
}
