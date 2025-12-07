/* FULL REACT CODE - New Year's Award Game
   Paste this entire file into Replit > src/App.jsx
   Put all assets in public/assets/
*/

import React, { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const ASSETS = {
    bg: "/assets/background.jpg",
    hongbao: "/assets/hongbao.png",
    lion: "/assets/lion.png",
    bgMusic: "/assets/bg-music.mp3",
    open2500: "/assets/open-2500.mp3",
    openNext: "/assets/open-nexttime.mp3",
    openGeneric: "/assets/open-generic.mp3",
  };

  const [bgPlaying, setBgPlaying] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [showLion, setShowLion] = useState(true);
  const [shuffling, setShuffling] = useState(false);

  const bgAudioRef = useRef(null);
  const openAudioRef = useRef(null);

  const envelopes = [0, 1, 2, 3, 4, 5];

  const outcomes = [
    { label: "₦2,500", key: "2500", prob: 5 },
    { label: "₦1,000", key: "1000", prob: 10 },
    { label: "Next time", key: "next", prob: 5 },
    { label: "₦800", key: "800", prob: 35 },
    { label: "₦700", key: "700", prob: 25 },
    { label: "₦500", key: "500", prob: 20 },
  ];

  function pickOutcome() {
    const r = Math.random() * 100;
    let acc = 0;
    for (const o of outcomes) {
      acc += o.prob;
      if (r <= acc) return o;
    }
    return outcomes[outcomes.length - 1];
  }

  function toggleBgMusic() {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (bgPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setBgPlaying(false);
    } else {
      audio.play();
      setBgPlaying(true);
    }
  }

  function openEnvelope(i) {
    if (openedIndex !== null) return;
    setShuffling(true);

    setTimeout(() => {
      const out = pickOutcome();
      setOpenedIndex(i);
      setResult(out);
      setShowLion(false);

      if (out.key === "2500") playSound(ASSETS.open2500);
      else if (out.key === "next") playSound(ASSETS.openNext);
      else playSound(ASSETS.openGeneric);

      setShuffling(false);
    }, 900);
  }

  function playSound(src) {
    if (openAudioRef.current) {
      openAudioRef.current.src = src;
      openAudioRef.current.play();
    }
  }

  function playAgain() {
    setOpenedIndex(null);
    setResult(null);
    setShowLion(true);
  }

  return (
    <div
      className="game-container"
      style={{ backgroundImage: `url(${ASSETS.bg})` }}
    >
      <audio ref={bgAudioRef} src={ASSETS.bgMusic} loop />
      <audio ref={openAudioRef} />

      <h1 className="title">New Year's Award</h1>

      <div className="center-block">
        {showLion && (
          <img src={ASSETS.lion} alt="lion" className="lion" />
        )}

        {!showLion && (
          <div className="result-box">
            <p className="red blink">Thank you for joining our game!</p>
            <p className="black-text">
              Look forward to our next fun trading — enjoy the Happy New Year moments! 🎉
            </p>
            <p className="black-text">Valid game time: 3 AM - 3 PM (NGT)</p>
          </div>
        )}

        <div className="btn-row">
          <button className="btn" onClick={toggleBgMusic}>
            {bgPlaying ? "Stop Music" : "Play Music"}
          </button>
          <button className="btn" onClick={playAgain}>Play Again</button>
        </div>

        <div className="info-box">
          <p className="red big">GAME: DUTY TIME! 🎉🎮</p>
          <p className="black">
            GAME: New Year's Award 🎮🎉 ⏰ Play Hours: 3 AM – 3 PM ⚡ 1 Transaction = 1 Bag !
          </p>
          <p className="black">🔥 Complete 6 Bag to CLAIM your New Year's Award 🎁💥</p>
          <p className="black">💰 Reward: Up to ₦2,500!</p>
          <p className="black">Any gift card or transfer trading counts!</p>
        </div>
      </div>

      <div className="envelope-row">
        {envelopes.map((i) => (
          <div key={i} className="envelope-block">
            <img
              src={ASSETS.hongbao}
              alt="envelope"
              className={
                "envelope " +
                (openedIndex === i ? "opened " : "") +
                (shuffling ? "shake " : "")
              }
              onClick={() => openEnvelope(i)}
            />
            <p className="number">{i + 1}</p>
          </div>
        ))}
      </div>

      {result && result.key !== "next" && (
        <div className="fireworks"></div>
      )}
    </div>
  );
}
