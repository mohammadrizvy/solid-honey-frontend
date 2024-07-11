
import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        value={searchValue}
        placeholder="অনুসন্ধান করুন..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
};

export default SearchBox;