import { useState, useEffect } from 'react'
import {
  listingsByColorOrLanguage,
  listingsByCountry,
  listingsWithNullValue,
  listings
} from './middleware/middleware.ts'
import type { Listing } from './middleware/middleware.ts'
import Header from './components/Header.tsx'
import Loader from './components/Loader.tsx'
import Search from './components/Search.tsx'
import GroupToggle from './components/GroupToggle.tsx'
import NullCheck from './components/NullCheck.tsx'
import ListingsTable from './components/ListingsTable.tsx'
import Footer from './components/Footer.tsx'

const App = () => {
  const [search, setSearch] = useState('')
  const [groupedView, setGroupedView] = useState(false);
  const [groupedListings, setGroupedListings] = useState<Record<string, Listing[]>>({});
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([]);
  const [nullField, setNullField] = useState<'color' | 'language' | 'country'>('color');
  const [nullCount, setNullCount] = useState<number | null>(null);
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showOnlyMissing) {
      const missing = listingsWithNullValue(nullField, listings);
      setDisplayedListings(missing);
      if (groupedView) setGroupedListings(listingsByCountry(missing));
      setNullCount(missing.length);
    } else {
      setDisplayedListings(listings);
      if (groupedView) setGroupedListings(listingsByCountry(listings));
      setNullCount(null);
    }
  }, [showOnlyMissing, nullField, groupedView]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedListings(listings);
      setLoading(false);
    });
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = listingsByColorOrLanguage(search.trim());
      setDisplayedListings(filtered);

      if (groupedView) {
        setGroupedListings(listingsByCountry(filtered));
      }
      setLoading(false);
    });
  };

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setSearch('');
      setDisplayedListings(listings);

      if (groupedView) {
        setGroupedListings(listingsByCountry(listings));
      }
      setLoading(false);
    });
  };

  const toggleGroupedView = () => {
    if (!groupedView) {
      const grouped = listingsByCountry(displayedListings);
      setGroupedListings(grouped);
    }
    setGroupedView(!groupedView);
  };

  return (
    <div className="max-w-6xl bg-gray-100 mx-auto p-6">
      <Header />
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      <GroupToggle groupedView={groupedView} toggleGroupedView={toggleGroupedView} />
      <NullCheck
        nullField={nullField}
        setNullField={setNullField}
        showOnlyMissing={showOnlyMissing}
        setShowOnlyMissing={setShowOnlyMissing}
        nullCount={nullCount}
      />
      {loading ? (
        <Loader />
      ) : (
        <ListingsTable
          groupedView={groupedView}
          groupedListings={groupedListings}
          displayedListings={displayedListings}
        />
      )}
      <Footer />
    </div>
  )
};

export default App;
