import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [wordCloud, setWordCloud] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://baconipsum.com/api/?type=all-meat&paras=10&start-with-lorem=1"
      );
      let result = await response.json();
      //process data to remove punctuations
      result = result
        .join("")
        .toLowerCase()
        .replaceAll(/[^a-z-\s]/g, " ")
        .split(" ");

      // loop through array of words to find count of each word
      const wordCloudMap = new Map();
      for (let item of result) {
        if (item === "") continue;
        if (wordCloudMap.has(item)) {
          wordCloudMap.set(item, wordCloudMap.get(item) + 1);
        } else {
          wordCloudMap.set(item, 1);
        }
      }

      // turn map into a 2d array of item, and item count
      setWordCloud([...wordCloudMap.entries()]);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {wordCloud.map((word) => (
        <span style={{ fontSize: word[1] * 12 }}>{word[0]} </span>
      ))}
    </div>
  );
}
