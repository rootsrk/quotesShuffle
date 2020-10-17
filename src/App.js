import React, { useState, useEffect } from 'react';
import './App.css';
import shuffleIcon from './assets/images/shuffle.svg';
import rightQuoteIcon from './assets/images/right-quote.svg';
import leftQuoteIcon from './assets/images/left-quote.svg';

function App() {
  const [allQuoteData, setAllQuoteData] = useState([]);
  const [quote, setQuote] = useState('');
  const [show, setView] = useState(false);

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        setView(false);
        setQuote(data[0]);
        setAllQuoteData(data);
        setView(true);
      });
  }, []);

  const onShuffleClick = () => {
    setView(false);
    const randomLength = Math.floor(Math.random() * (allQuoteData.length - 1));
    setQuote(allQuoteData[randomLength]);
    setTimeout(() => {
      setView(true);
    }, 100);
  };

  return (
    show && (
      <div className="landing-page">
        <div className="quote">
          <h1>
            <img
              className="quote-sign"
              src={leftQuoteIcon}
              alt="leftQuoteIcon"
            />
            {quote.text}
            <img
              className="quote-sign"
              src={rightQuoteIcon}
              alt="rightQuoteIcon"
            />
          </h1>
        </div>
        <h2 className="author">
          {quote.author === '' ? 'Anonymous' : quote.author}
        </h2>
        <button onClick={onShuffleClick} className="shuffle-button">
          <img src={shuffleIcon} alt="shuffleIcon" />
          <span>Shuffle</span>
        </button>
      </div>
    )
  );
}

export default App;
