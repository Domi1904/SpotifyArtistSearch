import { useState, useEffect, useRef } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchInput = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSearch(inputValue);
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Suche nach Künstlern (z.B. 'metallica', 'taylor swift')..."
        className="search-input"
      />
    </div>
  );
};
