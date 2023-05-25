import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

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
      const res = await fetch("https://chatgpt-service-xysm.onrender.com/completions", options);
      const data = await res.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = () => {
    setMessage(null)
    setValue('')
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue('')
  }

  useEffect(() => {
    
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => [
        ...prevChats,
        { title: currentTitle, role: "user", content: value },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  return (
    <div className="wrapper">
      <section className="side-bar">
        <button
          onClick={createNewChat}
         className="button-add">
          <img
            src="https://img.icons8.com/ios-filled/15/DFDFDE/plus-math.png"
            alt="plus-math"
          />
          <p>New chat</p>
        </button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav className="navbar">
          <p>Matias</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1 className="title-app">MatiGPT</h1>}

        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li className="box" key={index}>
            <p className="role">{chatMessage.role}</p>
            <p className="content">{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
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
