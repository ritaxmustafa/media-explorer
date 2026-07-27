import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      className="border rounded p-2 py-4 w-[150px] rounded-none"
      placeholder="Search videos..."
      aria-label="Search videos by artist or title"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
