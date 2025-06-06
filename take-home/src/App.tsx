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
  const [nullField, setNullField] = useState<'color' | 'language'>('color');
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
    <div>
      <h1>ACTUAL</h1>

      <div className='search'>
        <h2>Search by Colour or Language</h2>
        <input
          type="text"
          placeholder="e.g. English or Blue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {search && <button onClick={handleReset}>Reset</button>}
      </div>

      <button onClick={toggleGroupedView}>
        {groupedView ? "Show All" : "Group by Country"}
      </button>

      <div className="null-check">
        <h2>Check for Missing Values</h2>
        <label>
          Field:
          <select
            value={nullField}
            onChange={(e) => setNullField(e.target.value as 'color' | 'language')}
          >
            <option value="color">Color</option>
            <option value="language">Language</option>
          </select>
        </label>
        <button
          onClick={() => {
            const missing = listingsWithNullValue(nullField, displayedListings);
            console.log(missing);
            setNullCount(missing.length);
          }}
        >
          Count Missing {nullField}
        </button>

        {nullCount !== null && (
          <p>{nullCount} listing(s) are missing a value for <strong>{nullField}</strong>.</p>
        )}
      </div>


      <div className="listings">
        <h2>All Listings</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Color</th>
              <th>Language</th>
              <th>Country</th>
            </tr>
          </thead>
          {groupedView ? (
            Object.entries(groupedListings).map(([country, group]) => (
              <tbody key={country}>
                <tr>
                  <td colSpan={6}><strong>{country}</strong></td>
                </tr>
                {group.map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.first_name}</td>
                    <td>{listing.last_name}</td>
                    <td>{listing.email}</td>
                    <td>{listing.color || 'N/A'}</td>
                    <td>{listing.language || 'N/A'}</td>
                    <td>{listing.country || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            ))
          ) : (
            <tbody>
              {displayedListings.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.first_name}</td>
                  <td>{listing.last_name}</td>
                  <td>{listing.email}</td>
                  <td>{listing.color || 'N/A'}</td>
                  <td>{listing.language || 'N/A'}</td>
                  <td>{listing.country || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
};

export default App;
