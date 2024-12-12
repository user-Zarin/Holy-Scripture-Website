import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { PiSpeakerSimpleSlashFill, PiSpeakerHighFill } from "react-icons/pi";
import "../App.css";

const Sura = () => {
  const { id } = useParams();
  const location = useLocation();
  const no = location.state?.no || 1;
  const [surahs, setSurahs] = useState(null); // English text
  const [arabic, setArabic] = useState(null); // Arabic text
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [englishResponse, arabicResponse] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/quran/en.asad`),
          fetch(`https://api.alquran.cloud/v1/quran/ar.alafasy`),
        ]);

        const englishData = await englishResponse.json();
        const arabicData = await arabicResponse.json();
        setSurahs(englishData.data.surahs);
        setArabic(arabicData.data.surahs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!surahs || !arabic) {
    return <div>Loading...</div>;
  }

  const englishAyahs = surahs[no - 1]?.ayahs || [];
  const arabicAyahs = arabic[no - 1]?.ayahs || [];
  const name = surahs[no - 1]?.name || "";
  const suraNo = surahs[no - 1]?.number || 1;
  const englishName = surahs[no - 1]?.englishName || "";

  // Function to speak a given text
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Set speaking state when speech starts and ends
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      // Cancel ongoing speech before starting a new one
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech functionality.");
    }
  };

  // Function to stop the speech
  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakEntireSurah = () => {
    const allText = englishAyahs.map((ayah) => ayah.text).join(" ");
    speak(allText);
  };

  return (
    <div className="color-bg min-h-[100vh]">
      <div className="flex p-4 justify-around text-slate-600 color-bg align-top">
        <h1 className="text-3xl font-serif text-white tracking-wider">
          {suraNo}. {name} - {englishName}
        </h1>
        {/* Button to speak the entire Surah */}
        <button
          onClick={speakEntireSurah}
          onDoubleClick={stopSpeech}
          disabled={isSpeaking}
          className="text-4xl"
          aria-label={isSpeaking ? "Stop speaking" : "Play Surah"}
        >
          {isSpeaking ? <PiSpeakerSimpleSlashFill /> : <PiSpeakerHighFill />}
        </button>
      </div>
      <div>
        {englishAyahs.map((ayah, index) => (
          <div
            key={index}
            className="p-5 m-2 color-comp text-white rounded-lg font-[cursive] text-lg flex justify-between"
          >
            <div>
              <h2 className="text-2xl pb-2 tracking-wide">
                {index + 1}.{" "}
                {arabicAyahs[index]?.text || <em>(Arabic text not available)</em>}
              </h2>
              <h3 className="pt-2">{ayah.text}</h3>
            </div>
            <button
              className="text-3xl mx-4"
              onClick={() => speak(ayah.text)}
              onDoubleClick={stopSpeech}
              disabled={isSpeaking}
              aria-label={isSpeaking ? "Stop speaking" : "Play Ayah"}
            >
              {isSpeaking ? <HiSpeakerXMark /> : <HiSpeakerWave />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sura;
