import React from 'react';
import type { Listing } from '../middleware/middleware';

type Props = {
  groupedView: boolean;
  groupedListings: Record<string, Listing[]>;
  displayedListings: Listing[];
};

const ListingsTable: React.FC<Props> = ({
  groupedView,
  groupedListings,
  displayedListings,
}) => {
  return (

    <section className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
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
          Object.entries(groupedListings)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([country, group]) => (
              <tbody key={country}>
                <tr className="bg-indigo-400">
                  <td colSpan={6} className="px-4 py-2 font-semibold">{country || 'Unknown Country'}</td>
                </tr>
                {group.map((listing) => (
                  <tr key={listing.id} className="hover:bg-indigo-50 even:bg-gray-50">
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
  )
}

export default ListingsTable
