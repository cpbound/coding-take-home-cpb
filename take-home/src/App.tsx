import { useState, useEffect } from 'react'
import {
  listingsByColorOrLanguage,
  listingsByCountry,
  listingsWithNullValue,
  listings
} from './middleware/middleware.ts'
import type { Listing } from './middleware/middleware.ts'

const App = () => {
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Listing[] | null>(null)

  useEffect(() => {
    setAllListings(listings)
  }, [])

  const handleSearch = () => {
    const filtered = listingsByColorOrLanguage(search);
    setSearchResults(filtered);
  };

  const displayedListings = searchResults || allListings;

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
        {searchResults && (
          <button onClick={() => (setSearchResults(null), setSearch(''))}>Reset</button>
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
          <tbody>
            {displayedListings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.last_name}</td>
                <td>{listing.first_name}</td>
                <td>{listing.email}</td>
                <td>{listing.color || 'N/A'}</td>
                <td>{listing.language || 'N/A'}</td>
                <td>{listing.country || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default App;
