import { useState, useEffect } from 'react'
import {
  listingsByColorOrLanguage,
  listingsByCountry,
  listingsWithNullValue,
  listings
} from './middleware/middleware.ts'
import type { Listing } from './middleware/middleware.ts'

const App = () => {
  const [search, setSearch] = useState('')
  const [groupedView, setGroupedView] = useState(false);
  const [groupedListings, setGroupedListings] = useState<Record<string, Listing[]>>({});
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([]);
  const [nullField, setNullField] = useState<'color' | 'language' | 'country'>('color');
  const [nullCount, setNullCount] = useState<number | null>(null);

  useEffect(() => {
    setDisplayedListings(listings)
  }, [])

  const handleSearch = () => {
    const filtered = listingsByColorOrLanguage(search.trim());
    setDisplayedListings(filtered);

    if (groupedView) {
      setGroupedListings(listingsByCountry(filtered));
    }
  };

  const handleReset = () => {
    setSearch('');
    setDisplayedListings(listings);

    if (groupedView) {
      setGroupedListings(listingsByCountry(listings));
    }
  };

  const toggleGroupedView = () => {
    if (!groupedView) {
      const grouped = listingsByCountry(displayedListings);
      setGroupedListings(grouped);
    }
    setGroupedView(!groupedView);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">ACTUAL</h1>

      {/* Search Section */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search by Colour or Language</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="e.g. English or Blue"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
          >
            Search
          </button>
          {
            <button
              onClick={handleReset}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Reset
            </button>
          }
        </div>
      </section>

      {/* Group Toggle Button */}
      <div className="mb-8 text-center">
        <button
          onClick={toggleGroupedView}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          {groupedView ? "Show All" : "Group by Country"}
        </button>
      </div>

      {/* Null Check Section */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Check for Missing Values</h2>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <span className="font-medium">Field:</span>
            <select
              value={nullField}
              onChange={(e) => setNullField(e.target.value as 'color' | 'language' | 'country')}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="color">Colour</option>
              <option value="language">Language</option>
              <option value="country">Country</option>
            </select>
          </label>
          <button
            onClick={() => {
              const missing = listingsWithNullValue(nullField, listings);
              setDisplayedListings(missing);
              setGroupedListings(groupedView ? listingsByCountry(missing) : {});
              setNullCount(missing.length);
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
          >
            Count Missing
          </button>
        </div>
        {nullCount !== null && (
          <p className="text-gray-700">
            {nullCount} listing(s) are missing a value for{' '}
            <strong className="text-indigo-600">{nullField}</strong>.
          </p>
        )}
      </section>

      {/* Listings Table */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">All Listings</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Color</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
            </tr>
          </thead>
          {groupedView ? (
            Object.entries(groupedListings).map(([country, group]) => (
              <tbody key={country}>
                <tr className="bg-indigo-200">
                  <td colSpan={6} className="px-4 py-2 font-semibold">{country}</td>
                </tr>
                {group.map((listing) => (
                  <tr
                    key={listing.id}
                    className="hover:bg-indigo-50 even:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2">{listing.first_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{listing.last_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{listing.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{listing.color || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{listing.language || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{listing.country || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            ))
          ) : (
            <tbody>
              {displayedListings.map((listing) => (
                <tr
                  key={listing.id}
                  className="hover:bg-indigo-50 even:bg-gray-50"
                >
                  <td className="border border-gray-300 px-4 py-2">{listing.first_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{listing.last_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{listing.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{listing.color || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{listing.language || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{listing.country || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </section>
    </div>
  )
};

export default App;
