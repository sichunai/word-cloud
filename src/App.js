import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [wordCloudData, setWordCloud] = useState([]);

  useEffect(() => {
    const fetchWordCloud = async () => {
      const result = await fetch(
        "https://baconipsum.com/api/?type=all-meat&paras=10&start-with-lorem=1"
      );
      const data = await result.json();
      const wordCloudMap = new Map();
      let allWords = [];
      for (let sentence of data) {
        const wordsArray = sentence
          .toLowerCase()
          .replaceAll(/[^a-z]/g, " ")
          .split(" ");
        allWords.push(...wordsArray.filter((word) => word !== ""));
      }
      for (let word of allWords) {
        if (wordCloudMap.get(word)) {
          wordCloudMap.set(word, wordCloudMap.get(word) + 1);
        } else {
          wordCloudMap.set(word, 1);
        }
      }

      const rankedWords = [];
      for (let [key, value] of wordCloudMap.entries()) {
        rankedWords.push([key, value]);
      }
      // rankedWords.sort((a, b) => b[1] - a[1]);
      console.log(rankedWords);
      setWordCloud(rankedWords);
    };
    fetchWordCloud();
  }, []);

  return (
    <div className="App">
      {wordCloudData.map((word) => (
        <span style={{ fontSize: word[1] <= 12 ? 12 * word[1] : 12 * word[1] }}>
          {word[0]}{" "}
        </span>
      ))}
    </div>
  );
}
