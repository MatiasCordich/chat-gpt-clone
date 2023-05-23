import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [ message, setMessage ] = useState(null)
  const [ value, setValue ] = useState('')

  const getMessages = async () => {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({
        message: value,
      }),
    };

    try {
      const res = await fetch('http://localhost:8800/completions', options)
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <section className="side-bar">
        <button className="button-add">
          <img
            src="https://img.icons8.com/ios-filled/15/DFDFDE/plus-math.png"
            alt="plus-math"
          />
          <p>New chat</p>
        </button>
        <ul className="history">
          <li>BLUGH</li>
        </ul>
        <nav className="navbar">
          <p>Matias</p>
        </nav>
      </section>
      <section className="main">
        <h1 className="title-app">MatiGPT</h1>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <img
              onClick={getMessages}
              className="btn-send"
              src="https://img.icons8.com/external-febrian-hidayat-basic-outline-febrian-hidayat/15/fafafa/external-send-user-interface-febrian-hidayat-basic-outline-febrian-hidayat.png"
              alt="external-send-user-interface-febrian-hidayat-basic-outline-febrian-hidayat"
            />
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.{" "}
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="__blank"
            >
              ChatGPT May 12 Version
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
