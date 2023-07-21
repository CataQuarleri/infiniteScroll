import React, {useState, useRef, useCallback} from 'react'
import useBookSearch from './useBookSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const {books, hasMore, loading, error} = useBookSearch(query, pageNumber)

  const observer = useRef();
  const lasBookElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore])

  function handleSearch(e){
    setQuery(e.target.value);
    setPageNumber(1)
  }
  
  return (
    <>
    <input type='text' value={query} onChange={(e)=>handleSearch(e)}></input>
    {books.map((book, index) => {
      if(books.length === index + 1){
        return <div ref={lasBookElementRef} key={index}>{book}</div>
      }else {
        return <div key={index}>{book}</div>
      }
    })}
    <div>{loading && 'Loading...'}</div>
    <div>{error && 'Error'}</div>
    </>
  );
}

export default App;
