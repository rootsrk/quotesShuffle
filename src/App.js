import React, { useState, useEffect } from 'react';
import './App.css';
import shuffleIcon from './assets/images/shuffle.svg';
import rightQuoteIcon from './assets/images/right-quote.svg';
import leftQuoteIcon from './assets/images/left-quote.svg';

function App() {
  const [allQuoteData, setAllQuoteData] = useState([]);
  const [quote, setQuote] = useState('');
  const [show, setView] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [allImageUrls, setAllImageUrl] = useState([]);

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        setView(false);
        setQuote(data[0]);
        setAllQuoteData(data);
        setView(true);
      });

    const requestObj = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' +
          '563492ad6f917000010000018d5b2480f3ee47ce90c02f6098dfab71',
      },
    };
    fetch('https://api.pexels.com/v1/search?query=nature', requestObj)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllImageUrl(data.photos);
        setImageUrl(data.photos[0].src.landscape);
      });
  }, []);

  const onShuffleClick = () => {
    setView(false);
    const randomLength = Math.floor(Math.random() * (allQuoteData.length - 1));
    const randomImgLength = Math.floor(
      Math.random() * (allImageUrls.length - 1)
    );
    setImageUrl(allImageUrls[randomImgLength].src.landscape);
    setQuote(allQuoteData[randomLength]);
    setTimeout(() => {
      setView(true);
    }, 100);
  };

  return (
    show && (
      <div
        className="landing-page"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div class="highlight-container">
          <div class="highlight">
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
            <p className="author">
              {quote.author === '' ? 'Anonymous' : quote.author}
            </p>
          </div>
        </div>
        <button onClick={onShuffleClick} className="shuffle-button">
          <img src={shuffleIcon} alt="shuffleIcon" />
          <span>Shuffle</span>
        </button>
      </div>
    )
  );
}

export default App;
