import React from 'react';

type Props = {
  nullField: 'color' | 'language' | 'country';
  setNullField: (value: 'color' | 'language' | 'country') => void;
  showOnlyMissing: boolean;
  setShowOnlyMissing: React.Dispatch<React.SetStateAction<boolean>>;
  nullCount: number | null;
}

const NullCheck: React.FC<Props> = ({ nullField, setNullField, showOnlyMissing, setShowOnlyMissing, nullCount }) => (
  <section className="w-full md:w-auto mb-8 p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Check for Missing Values</h2>
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <label className="flex items-center gap-2">
        <span className="font-medium">Field:</span>
        <select
          value={nullField}
          onChange={(e) => setNullField(e.target.value as 'color' | 'language' | 'country')}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="color">Color</option>
          <option value="language">Language</option>
          <option value="country">Country</option>
        </select>
      </label>
      <button
        onClick={() => setShowOnlyMissing(prev => !prev)}
        className={`px-5 py-2 rounded-full transition-colors text-white ${showOnlyMissing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
      >
        {showOnlyMissing ? 'Show All Listings' : 'Show Listings with Missing Values'}
      </button>
      {nullCount !== null && (
        <p className="text-gray-700">
          {nullCount} listing(s) are missing a value for{' '}
          <strong className="text-indigo-600">{nullField}</strong>.
        </p>
      )}
    </div>
  </section>
);

export default NullCheck;
