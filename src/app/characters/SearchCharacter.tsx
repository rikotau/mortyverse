"use client";

import { Button, Input } from "@/components/ui";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onToggleFilter: () => void;
}

export const SearchBar = ({
  value,
  onChange,
  onToggleFilter,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center mb-6">
      <Input
        type="text"
        placeholder="Find Characters.."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />

      <div>
        <Button
          variant="outline"
          className="block md:hidden"
          onClick={onToggleFilter}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};
