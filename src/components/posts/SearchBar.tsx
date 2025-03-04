import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useState, useRef, useEffect } from 'react';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search...' 
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedSearch = useCallback(
    (searchValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearch(searchValue);
      }, 500);
    },
    [onSearch]
  );

  const handleSearch = (searchValue: string) => {
    setValue(searchValue);
    debouncedSearch(searchValue);
  };

  return (
    <div className="w-full">
      <Search
        placeholder={placeholder}
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full sm:w-[300px]"
      />
    </div>
  );
} 