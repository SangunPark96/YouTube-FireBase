import './Home.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVideos } from '../../api/fetch';
import {v1 as generateUniqueID} from "uuid";
import VideoIndex from "../VideoIndex";
import testApi from "../../api/testApi.json";
import { AiOutlineSearch } from "react-icons/ai";



export default function Home({ videos, setVideos }) {
  // const [error, setError ] = useState(false)
  // const [videos, setVideos ] = useState([])
  const navigate = useNavigate();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [videoQuantity, setVideoQuantity] = useState(10);

  function handleTextInput(event) {
    event.preventDefault();
    setUserSearchInput(event.target.value);
  }

  function handleSearch(event){
    event.preventDefault();
    if (userSearchInput) {
      const duplicateSearch = searchHistory.find(input => (input.search).toLowerCase() === userSearchInput.toLowerCase())
      if (!duplicateSearch) {
        setSearchHistory([...searchHistory, {search: userSearchInput, id: generateUniqueID()}]);
      } 

      //Reset the state
      setUserSearchInput("")
    
      //Make fetch call
      getVideos(userSearchInput, videoQuantity) //Use testApi when trying to limit the number of calls to the api, otherwise use useSearchInput
      .then(response => {
        setVideos(response.items);
        navigate(`/videos`)

        }).catch(error => {
          console.log(error)
        })
    }

    
  };


  
  
  return (
    <>
      <main>
        <form onSubmit={handleSearch} className="search-bar">
          <input onChange={handleTextInput} value={userSearchInput} type="text" id="searchInput" placeholder='Search' />
          <button type='submit'><AiOutlineSearch className='searchIcon' size={25} /></button>
        </form>
      </main>
    </>
  );
}
