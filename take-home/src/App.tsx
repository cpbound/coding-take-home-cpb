import { useState } from 'react'
import {
  listingsByColorOrLanguage,
  listingsByCountry,
  listingsWithNullValue,
  listings
} from './middleware/middleware.ts'

const App = () => {

  return (
    <div>
      <h1>ACTUAL</h1>
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
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.last_name}</td>
                <td>{listing.first_name}</td>
                <td>{listing.email}</td>
                <td>{listing.color ?? 'N/A'}</td>
                <td>{listing.language ?? 'N/A'}</td>
                <td>{listing.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default App;
