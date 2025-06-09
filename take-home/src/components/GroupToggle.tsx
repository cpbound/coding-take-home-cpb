import React from 'react';

type Props = {
  groupedView: boolean;
  toggleGroupedView: () => void;
};

const GroupToggle: React.FC<Props> = ({ groupedView, toggleGroupedView }) => (
     <div className="mb-8 text-center">
        <button
          onClick={toggleGroupedView}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          {groupedView ? "Order by ID" : "Order by Country"}
        </button>
      </div>
);

export default GroupToggle;
