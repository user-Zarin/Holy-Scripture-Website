import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SearchBar from "./SearchBar";
import FirstScreen from "./FirstScreen";
const Home = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]); // To store search results
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://api.alquran.cloud/v1/quran/en.asad";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSurahs(data.data.surahs);
        setFilteredSurahs(data.data.surahs); // Initialize with full data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery === "") {
      // Reset to full surah list when query is empty
      setFilteredSurahs(surahs);
    } else {
      const results = surahs.filter(
        (item) =>
          item.englishName.toLowerCase().includes(searchQuery) ||
          (item.englishNameTranslation &&
            item.englishNameTranslation.toLowerCase().includes(searchQuery)) ||
          item.number.toString().includes(searchQuery)
      );
      setFilteredSurahs(results);
    }
  };

  if (surahs.length === 0) return <div>Loading...</div>;

  return (
    <div className="bg-home">
      <div className="flex">
        <div className="flex w-[100%] item-center justify-between bg-transparent px-5 py-3">
        <h1 className="text-gray-600 text-xl font-[cursive] font-extrabold tracking-widest content-center">
          Understand Quran
        </h1>
        <SearchBar query={query} onSearch={handleSearch} />
      </div>
      </div>
      <FirstScreen/>
      <marquee direction="down" loop="" ><h1 className="text-slate-800 text-center p-10 text-3xl font-serif hover:text-white hover:text-4xl">QURAN - The Holy Scripture</h1></marquee>
      {/* Surah Cards */}
      <div className="card-container flex flex-wrap justify-around">
        {filteredSurahs.map((sura, index) => (
          <div className="cards" key={index}>
            <div className="card-body mx-[5vw] bg-cards m-3 rounded-md p-5 w-[22vw] h-fit transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300">
              <h5 className="card-title float-right text-2xl font-serif font-semibold">
                {sura.name}
              </h5>
              <h5 className="card-title text-xl font-serif">
                {sura.number}. {sura.englishName}
              </h5>
              <h5 className="card-title mx-[1rem] font-serif text-lg py-2">
                {sura.englishNameTranslation}
              </h5>
              <button
                onClick={() =>
                  navigate(`/Surah/sura-no-${sura.number}`, {
                    state: { no: sura.number },
                  })
                }
                className="rounded-lg w-fit bg-gray-200 px-2 py-1 mt-2 mx-2 border hover:bg-slate-600 hover:text-slate-400 hover:border-white"
              >
                Read Translation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
