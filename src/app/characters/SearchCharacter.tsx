"use client";

import { Input } from "@/components/ui";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Input
        type="text"
        placeholder="Find Characters.."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="w-full max-w-md"
      />
    </div>
  );
};
