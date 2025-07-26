import { Input } from '../../../shared/ui/Input/Input';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}
const SearchInput = ({ search, setSearch }: Props) => {
  return (
    <div className="flex-1 flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-[120px] sm:max-w-xs flex items-center">
        <Input
          placeholder="Поск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="header-search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
