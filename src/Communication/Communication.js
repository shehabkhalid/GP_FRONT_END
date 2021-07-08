import React, { useState, useRef } from "react";
import "./Communication.css";
import TextFields from "@material-ui/icons/TextFields";
import Peer from "peerjs";
import socketio from "socket.io-client";
import VolumeIcon from "@material-ui/icons/VolumeUp";
import Message from "../Communication/Message";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";
import SettingsIcon from "@material-ui/icons/Settings";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";
import SideBar from "../newComponents/SideBar";

const role = 0; //prompt("Please enter your role", "");

const Communication = () => {
  const [state, setState] = useState({
    user: role == 0 ? "Zula" : "Baher",
    photo:
      role == 0
        ? "https://i.ibb.co/pdDR6xp/80788212-1283452835189115-4401079097317392384-n-1.jpg"
        : "https://i.ibb.co/jyBx1t5/baher.jpg",
    currChannel: 1,
    modernm: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    activeUsers: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    myVideo: document.createElement("video"),
    myPeer: new Peer(undefined, {
      host: "peerjs-server.herokuapp.com",
      port: 443,
      secure: true,
    }),
    AudioMute: 0,
    VideoMute: 0,
    VoiceActive: -1,
    CallingMode: 0,
    Peers: {},
    Videos: {},
  });

  const socketRef = useRef(null);
  socketRef.current = socketio.connect("https://communication.colab.cf/");

  state.myPeer.on("open", (id) => {
    console.log("XX: " + id);
    setState({ ...state, userId: id });
  });

  socketRef.current.on("user-disconnected", (userId) => {
    console.log("dis: " + userId);
    for (var i = 0; i < state.activeUsers[state.VoiceActive].length; i++) {
      if (state.activeUsers[state.VoiceActive][i].userId == userId) {
        state.activeUsers[state.VoiceActive].splice(i, 1);
        break;
      }
    }
    setState({ ...state });
    if (state.Videos[userId] && userId != state.userId) {
      state.Videos[userId].remove();
    }
  });

  socketRef.current.on("connection", ({ userId, user, photo }) => {
    console.log(
      "cc: " + state.VoiceActive + " " + userId + " " + user + " " + photo
    );
    state.activeUsers[state.VoiceActive].push({
      userId: userId,
      user: user,
      photo: photo,
    });
    setState({ ...state });
  });

  socketRef.current.on("user-connected", ({ userId, user, photo }) => {
    state.activeUsers[state.VoiceActive].push({
      userId: userId,
      user: user,
      photo: photo,
    });
    setState({ ...state });
    if (userId != state.userId && state.VoiceActive != -1) {
      navigator.mediaDevices
        .getUserMedia({
          video: !state.VideoMute,
          audio: !state.AudioMute,
        })
        .then((stream) => {
          connectToNewUser(userId, stream);
        });
    }
  });

  state.myPeer.on("call", (call) => {
    if (state.VoiceActive != -1) {
      const video = document.createElement("video");
      navigator.mediaDevices
        .getUserMedia({
          video: !state.VideoMute,
          audio: !state.AudioMute,
        })
        .then((stream) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
      state.Videos[call.peer] = video;
      console.log(call.peer + " " + " stream");
    }
  });

  socketRef.current.on("message", ({ name, message, id, photo }) => {
    state.modernm[id].push({
      message: message,
      user: name,
      photo: photo,
    });
    setState({ ...state, x: " " });
  });

  let Channels = [
    {
      id: 1,
      name: "Text 1",
      type: 1,
    },
    {
      id: 2,
      name: "Text 2",
      type: 1,
    },
    {
      id: 3,
      name: "Video",
      type: 0,
    },
    {
      id: 4,
      name: "test",
      type: 0,
    },
  ];

  const open = () => {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel != null) {
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        }
      });
    }
  };

  const Send = (e) => {
    if (e.charCode == 13) {
      var ele = document.getElementById("myInput");
      socketRef.current.emit("message", {
        message: ele.value,
        name: state.user,
        id: state.currChannel,
        photo: state.photo,
      });
      ele.value = "";
    }
  };

  const addVideoStream = (video, stream) => {
    if (state.videoActive == 0) {
      var videoGrid = document.getElementById("video-grid");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    }
  };

  const connectToNewUser = (userId, stream) => {
    const call = state.myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    state.Videos[userId] = video;
    state.Peers[userId] = call;
  };

  const AudioMuteButton = (e) => {
    navigator.mediaDevices
      .getUserMedia({
        video: 1 - state.VideoMute,
        audio: state.AudioMute,
      })
      .then((stream) => {
        addVideoStream(state.myVideo, stream);
      });

    setState({ ...state, AudioMute: 1 - state.AudioMute });
  };

  const VideoMuteButton = (e) => {
    navigator.mediaDevices
      .getUserMedia({
        video: state.VideoMute,
        audio: 1 - state.AudioMute,
      })
      .then((stream) => {
        addVideoStream(state.myVideo, stream);
      });

    setState({ ...state, VideoMute: 1 - state.VideoMute });
  };

  const Disconnect = (e) => {
    var ChannelBox = document.getElementById("channel-box");
    var ConnectionBox = document.getElementById("connection-bar");
    var StatusBox = document.getElementById("status-bar");

    ChannelBox.style.height = "94%";
    ConnectionBox.style.height = "0%";

    for (var i = 0; i < state.activeUsers[state.VoiceActive].length; i++) {
      console.log(i + " " + state.activeUsers[state.VoiceActive][i].userId);
      if (state.activeUsers[state.VoiceActive][i].userId == state.userId) {
        state.activeUsers[state.VoiceActive].splice(i, 1);
        break;
      }
    }

    const myNode = document.getElementById("video-grid");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }

    state.activeUsers[state.VoiceActive].length = 0;

    setState({ ...state, VoiceActive: -1 });

    var userId = state.userId;
    var roomId = state.VoiceActive;
    socketRef.current.emit("user-disconnected", roomId, userId);
    state.myVideo.remove();
  };

  const clickChannel = (e) => {
    console.log(e.target.id);
    const s = Channels.find((x) => x.id == e.target.id).type;
    if (s == 0) {
      var elmnt = document.getElementById("video-grid");
      if (elmnt != null) {
        var children = elmnt.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.style.visibility === "hidden") {
            child.style.visibility = "visible";
          } else {
            child.style.visibility = "hidden";
          }
        }
      }

      setState({ ...state, VoiceActive: e.target.id, CallingMode: 1 });

      if (state.activeChannel != null) {
        state.activeChannel.classList.remove("active");
      }

      if (state.VoiceActive != e.target.id) {
        if (state.VoiceActive != -1) {
          for (
            var i = 0;
            i < state.activeUsers[state.VoiceActive].length;
            i++
          ) {
            console.log(
              i + " " + state.activeUsers[state.VoiceActive][i].userId
            );
            if (
              state.activeUsers[state.VoiceActive][i].userId == state.userId
            ) {
              state.activeUsers[state.VoiceActive].splice(i, 1);
              break;
            }
          }
        }

        state.activeUsers[e.target.id].push({
          userId: state.userId,
          user: state.user,
          photo: state.photo,
        });

        var ChannelBox = document.getElementById("channel-box");
        var ConnectionBox = document.getElementById("connection-bar");
        var StatusBox = document.getElementById("status-bar");

        ChannelBox.style.height = "88%";
        ConnectionBox.style.height = "6%";

        socketRef.current.emit(
          "join-room",
          e.target.id,
          state.userId,
          state.user,
          state.photo
        );

        navigator.mediaDevices
          .getUserMedia({
            video: !state.VideoMute,
            audio: 0,
          })
          .then((stream) => {
            addVideoStream(state.myVideo, stream);
          });
      }
    }

    if (s == 1) {
      if (state.activeChannel != null) {
        state.activeChannel.classList.remove("active");
      }
      e.target.classList.add("active");
      setState({ ...state, CallingMode: 0 });

      var elmnt = document.getElementById("video-grid");
      if (elmnt != null) {
        var children = elmnt.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.style.visibility === "hidden") {
            child.style.visibility = "visible";
          } else {
            child.style.visibility = "hidden";
          }
        }
      }
    }

    setState({
      ...state,
      currChannel: e.target.id,
      activeChannel: e.target,
      videoActive: s,
    });
  };

  return (
    <div className="flex">
      <SideBar />
      <div id="main">
        <div id="side-bar">
          <div id="channel-box">
            {Channels.map((currentChannel) => (
              <React.Fragment>
                <div class="channel-container">
                  <div
                    class="channel"
                    id={currentChannel.id}
                    onClick={clickChannel}
                  >
                    {currentChannel.type == 1 ? (
                      <TextFields class="channel-icon"></TextFields>
                    ) : (
                      <VolumeIcon
                        color="light"
                        class="channel-icon"
                      ></VolumeIcon>
                    )}
                    <div class="channel-name">{currentChannel.name}</div>
                  </div>
                  <div class="connected-users">
                    {state.activeUsers[currentChannel.id].map((currentUser) => (
                      <React.Fragment>
                        <div class="connected-user">
                          <img
                            src={currentUser.photo}
                            class="connected-avatar"
                          ></img>
                          <div class="connected-name"> {currentUser.user}</div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div id="connection-bar">
            {state.VoiceActive == -1 ? (
              <div></div>
            ) : (
              <React.Fragment>
                <div id="connection-left">
                  <CallIcon class="connection-icon"></CallIcon>
                  <div class="connection-name">
                    {Channels.find((x) => x.id == state.VoiceActive).name}
                  </div>
                </div>
                <CallEndIcon
                  onClick={Disconnect}
                  class="Disconnect-icon"
                ></CallEndIcon>
              </React.Fragment>
            )}
          </div>
          <div id="status-bar">
            <div id="profile-status-bar">
              <img src={state.photo} class="status-avatar"></img>
              <div class="status-name"> {state.user}</div>
            </div>
            <div id="buttons-status-bar">
              {state.AudioMute == 0 ? (
                <MicIcon onClick={AudioMuteButton} class="status-icon" />
              ) : (
                <MicOffIcon onClick={AudioMuteButton} class="status-icon" />
              )}
              {state.VideoMute == 0 ? (
                <VideocamIcon
                  onClick={VideoMuteButton}
                  class="status-icon"
                ></VideocamIcon>
              ) : (
                <VideocamOffIcon
                  onClick={VideoMuteButton}
                  class="status-icon"
                ></VideocamOffIcon>
              )}
              <SettingsIcon class="status-icon"></SettingsIcon>
            </div>
          </div>
        </div>

        {state.CallingMode == 1 ? (
          <div id="video-grid"></div>
        ) : (
          <div id="content-bar">
            <div id="messages-box">
              {state.modernm[state.currChannel].map((message) => (
                <Message
                  user={message.user}
                  message={message.message}
                  photo={message.photo}
                />
              ))}
            </div>
            <div id="input-box">
              <input onKeyPress={Send} id="myInput" class="input"></input>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication;
