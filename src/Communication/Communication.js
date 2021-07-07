import React from "react";
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

class Communication extends React.Component {
  constructor() {
    super();
    this.state = {
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
    };

    this.socketRef = React.createRef(null);
    this.socketRef.current = socketio.connect(
      "https://communication.colab.cf/"
    );

    this.state.myPeer.on("open", (id) => {
      console.log("XX: " + id);
      this.setState({
        userId: id,
      });
    });

    this.socketRef.current.on("user-disconnected", (userId) => {
      console.log("dis: " + userId);

      for (
        var i = 0;
        i < this.state.activeUsers[this.state.VoiceActive].length;
        i++
      ) {
        if (
          this.state.activeUsers[this.state.VoiceActive][i].userId == userId
        ) {
          this.state.activeUsers[this.state.VoiceActive].splice(i, 1);
          break;
        }
      }
      this.setState({});
      if (this.state.Videos[userId] && userId != this.state.userId) {
        this.state.Videos[userId].remove();
      }
    });

    this.socketRef.current.on("connection", ({ userId, user, photo }) => {
      console.log(
        "cc: " +
          this.state.VoiceActive +
          " " +
          userId +
          " " +
          user +
          " " +
          photo
      );
      this.state.activeUsers[this.state.VoiceActive].push({
        userId: userId,
        user: user,
        photo: photo,
      });
      this.setState({});
    });

    this.socketRef.current.on("user-connected", ({ userId, user, photo }) => {
      this.state.activeUsers[this.state.VoiceActive].push({
        userId: userId,
        user: user,
        photo: photo,
      });
      this.setState({});
      if (userId != this.state.userId && this.state.VoiceActive != -1) {
        navigator.mediaDevices
          .getUserMedia({
            video: !this.state.VideoMute,
            audio: !this.state.AudioMute,
          })
          .then((stream) => {
            this.connectToNewUser(userId, stream);
          });
      }
    });

    this.state.myPeer.on("call", (call) => {
      if (this.state.VoiceActive != -1) {
        const video = document.createElement("video");
        navigator.mediaDevices
          .getUserMedia({
            video: !this.state.VideoMute,
            audio: !this.state.AudioMute,
          })
          .then((stream) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              this.addVideoStream(video, userVideoStream);
            });
          });
        this.state.Videos[call.peer] = video;
        console.log(call.peer + " " + " stream");
      }
    });

    this.socketRef.current.on("message", ({ name, message, id, photo }) => {
      this.state.modernm[id].push({
        message: message,
        user: name,
        photo: photo,
      });
      this.setState({ x: " " });
    });
  }

  Channels = [
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

  open() {
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
  }

  Send = (e) => {
    if (e.charCode == 13) {
      var ele = document.getElementById("myInput");
      this.socketRef.current.emit("message", {
        message: ele.value,
        name: this.state.user,
        id: this.state.currChannel,
        photo: this.state.photo,
      });
      ele.value = "";
    }
  };

  addVideoStream = (video, stream) => {
    if (this.state.videoActive == 0) {
      var videoGrid = document.getElementById("video-grid");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    }
  };

  connectToNewUser = (userId, stream) => {
    const call = this.state.myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      this.addVideoStream(video, userVideoStream);
    });
    this.state.Videos[userId] = video;
    this.state.Peers[userId] = call;
  };

  AudioMuteButton = (e) => {
    navigator.mediaDevices
      .getUserMedia({
        video: 1 - this.state.VideoMute,
        audio: this.state.AudioMute,
      })
      .then((stream) => {
        this.addVideoStream(this.state.myVideo, stream);
      });

    this.setState({
      AudioMute: 1 - this.state.AudioMute,
    });
  };

  VideoMuteButton = (e) => {
    navigator.mediaDevices
      .getUserMedia({
        video: this.state.VideoMute,
        audio: 1 - this.state.AudioMute,
      })
      .then((stream) => {
        this.addVideoStream(this.state.myVideo, stream);
      });

    this.setState({
      VideoMute: 1 - this.state.VideoMute,
    });
  };

  Disconnect = (e) => {
    var ChannelBox = document.getElementById("channel-box");
    var ConnectionBox = document.getElementById("connection-bar");
    var StatusBox = document.getElementById("status-bar");

    ChannelBox.style.height = "94%";
    ConnectionBox.style.height = "0%";

    for (
      var i = 0;
      i < this.state.activeUsers[this.state.VoiceActive].length;
      i++
    ) {
      console.log(
        i + " " + this.state.activeUsers[this.state.VoiceActive][i].userId
      );
      if (
        this.state.activeUsers[this.state.VoiceActive][i].userId ==
        this.state.userId
      ) {
        this.state.activeUsers[this.state.VoiceActive].splice(i, 1);
        break;
      }
    }

    const myNode = document.getElementById("video-grid");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }

    this.state.activeUsers[this.state.VoiceActive].length = 0;

    this.setState({
      VoiceActive: -1,
    });

    var userId = this.state.userId;
    var roomId = this.state.VoiceActive;
    this.socketRef.current.emit("user-disconnected", roomId, userId);
    this.state.myVideo.remove();
  };
  clickChannel = (e) => {
    console.log(e.target.id);
    const s = this.Channels.find((x) => x.id == e.target.id).type;
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

      this.setState({
        VoiceActive: e.target.id,
        CallingMode: 1,
      });

      if (this.state.activeChannel != null) {
        this.state.activeChannel.classList.remove("active");
      }

      if (this.state.VoiceActive != e.target.id) {
        if (this.state.VoiceActive != -1) {
          for (
            var i = 0;
            i < this.state.activeUsers[this.state.VoiceActive].length;
            i++
          ) {
            console.log(
              i + " " + this.state.activeUsers[this.state.VoiceActive][i].userId
            );
            if (
              this.state.activeUsers[this.state.VoiceActive][i].userId ==
              this.state.userId
            ) {
              this.state.activeUsers[this.state.VoiceActive].splice(i, 1);
              break;
            }
          }
        }

        this.state.activeUsers[e.target.id].push({
          userId: this.state.userId,
          user: this.state.user,
          photo: this.state.photo,
        });

        var ChannelBox = document.getElementById("channel-box");
        var ConnectionBox = document.getElementById("connection-bar");
        var StatusBox = document.getElementById("status-bar");

        ChannelBox.style.height = "88%";
        ConnectionBox.style.height = "6%";

        this.socketRef.current.emit(
          "join-room",
          e.target.id,
          this.state.userId,
          this.state.user,
          this.state.photo
        );

        navigator.mediaDevices
          .getUserMedia({
            video: !this.state.VideoMute,
            audio: 0,
          })
          .then((stream) => {
            this.addVideoStream(this.state.myVideo, stream);
          });
      }
    }

    if (s == 1) {
      if (this.state.activeChannel != null) {
        this.state.activeChannel.classList.remove("active");
      }
      e.target.classList.add("active");
      this.setState({
        CallingMode: 0,
      });

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

    this.setState({
      currChannel: e.target.id,
      activeChannel: e.target,
      videoActive: s,
    });
  };

  render() {
    return (
      <div className="flex">
        <SideBar />
        <div id="main">
          <div id="side-bar">
            <div id="channel-box">
              {this.Channels.map((currentChannel) => (
                <React.Fragment>
                  <div class="channel-container">
                    <div
                      class="channel"
                      id={currentChannel.id}
                      onClick={this.clickChannel}
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
                      {this.state.activeUsers[currentChannel.id].map(
                        (currentUser) => (
                          <React.Fragment>
                            <div class="connected-user">
                              <img
                                src={currentUser.photo}
                                class="connected-avatar"
                              ></img>
                              <div class="connected-name">
                                {" "}
                                {currentUser.user}
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div id="connection-bar">
              {this.state.VoiceActive == -1 ? (
                <div></div>
              ) : (
                <React.Fragment>
                  <div id="connection-left">
                    <CallIcon class="connection-icon"></CallIcon>
                    <div class="connection-name">
                      {
                        this.Channels.find(
                          (x) => x.id == this.state.VoiceActive
                        ).name
                      }
                    </div>
                  </div>
                  <CallEndIcon
                    onClick={this.Disconnect}
                    class="Disconnect-icon"
                  ></CallEndIcon>
                </React.Fragment>
              )}
            </div>
            <div id="status-bar">
              <div id="profile-status-bar">
                <img src={this.state.photo} class="status-avatar"></img>
                <div class="status-name"> {this.state.user}</div>
              </div>
              <div id="buttons-status-bar">
                {this.state.AudioMute == 0 ? (
                  <MicIcon onClick={this.AudioMuteButton} class="status-icon" />
                ) : (
                  <MicOffIcon
                    onClick={this.AudioMuteButton}
                    class="status-icon"
                  />
                )}
                {this.state.VideoMute == 0 ? (
                  <VideocamIcon
                    onClick={this.VideoMuteButton}
                    class="status-icon"
                  ></VideocamIcon>
                ) : (
                  <VideocamOffIcon
                    onClick={this.VideoMuteButton}
                    class="status-icon"
                  ></VideocamOffIcon>
                )}
                <SettingsIcon class="status-icon"></SettingsIcon>
              </div>
            </div>
          </div>

          {this.state.CallingMode == 1 ? (
            <div id="video-grid"></div>
          ) : (
            <div id="content-bar">
              <div id="messages-box">
                {this.state.modernm[this.state.currChannel].map((message) => (
                  <Message
                    user={message.user}
                    message={message.message}
                    photo={message.photo}
                  />
                ))}
              </div>
              <div id="input-box">
                <input
                  onKeyPress={this.Send}
                  id="myInput"
                  class="input"
                ></input>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Communication;
