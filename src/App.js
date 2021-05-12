import "./App.css";
import { useState } from "react";
import Jitsi from "react-jitsi";
import jwt from "jwt-simple";
// import EncryptJWT from "../node_modules/jose/dist/browser/encrypt";

function App() {
  const [displayName, setDisplayName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isModerator, setIsModerator] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const generateJwtToken = () => {
    console.log("Generate Called");
    var payload = {
      context: {
        user: {
          avatar: "https:/gravatar.com/avatar/abc123",
          name: displayName,
          email: "jdoe@example.com",
          id: "abcd:a1b2c3-d4e5f6-0abc1-23de-abcdef01fedcba",
        },
      },
      aud: "jitsi",
      iss: "realtut",
      sub: "meet.realtut.com",
      room: roomName,
      moderator: isModerator,
    };

    var _token = jwt.encode(payload, "qwerty");
    setJwtToken(_token);
    setCallStarted(true);
  };

  return !callStarted ? (
    <div>
      <h1> Crate a Meeting </h1>
      <input
        type="text"
        placeholder="Room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input type="checkbox" onChange={(e) => setIsModerator(!isModerator)} />
      <button onClick={() => generateJwtToken()}> Let &apos;s start</button>
    </div>
  ) : (
    <Jitsi
      roomName={roomName}
      displayName={displayName}
      jwt={jwtToken}
      domain="meet.realtut.com"
    />
  );
}

export default App;
