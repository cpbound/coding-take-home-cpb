import React from 'react';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
};

const Search: React.FC<Props> = ({
  search,
  setSearch,
  handleSearch,
  handleReset,
}) => {

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="mb-8 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Search by Color or Language</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="e.g. English or Blue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Search
        </button>
        {
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Reset
          </button>
        }
      </div>
    </section>
  );
};

export default Search;
