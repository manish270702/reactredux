import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../store/reducers/QueryReducer';

function SearchBar() {
    const [q, setq] = useState(null);
    const dispatch = useDispatch();
    console.log(useSelector((state) => state.Query.value));
  return (
    <div className="flex items-center justify-center mt-5 gap-5">

      {/* search component that stores value first then set it to redux store on button click */}
            <input
              type="text"
              className="w-1/2 p-2 outline-0 border rounded"
              placeholder="enter query"
              onChange={(e) => setq(e.target.value)}
            />
    
            <button
              onClick={() => dispatch(setQuery(q))}
              className="px-4 py-2 rounded bg-blue-300"
            >
              search
            </button>
          </div>
  )
}

export default SearchBar