import { useState } from 'react';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <p>{inputValue}</p>
    </div>
  );
};

export default SearchBar;
