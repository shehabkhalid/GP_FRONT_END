import React, { useState, useRef, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import "./Communication.css";
import TextFields from '@material-ui/icons/TextFields'
import Peer from 'peerjs'
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import VolumeIcon from '@material-ui/icons/VolumeUp'
import Message from '../Communication/Message'
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import SettingsIcon from '@material-ui/icons/Settings';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';

const role = prompt("Please enter your role", "");

class Communication extends React.Component {
    constructor() {
        super();
        this.state = {
            user: role == 0 ? 'Zula' : 'Baher',
            photo: role == 0 ? 'https://i.ibb.co/pdDR6xp/80788212-1283452835189115-4401079097317392384-n-1.jpg' : 'https://i.ibb.co/jyBx1t5/baher.jpg',
            currChannel: 1,
            modernm: {
                1: [

                ],
                2: [

                ],
                3: [

                ],
                4: [

                ]
            },
            activeUsers: {
                1: [

                ],
                2: [

                ],
                3: [

                ],
                4: [
                ]
            },
            myVideo: document.createElement('video'),
            myPeer: new Peer(undefined, {
                host: '/',
                port: '9000'
            }),
            AudioMute: 0,
            VideoMute: 0,
            VoiceActive: -1,
            CallingMode: 0,
            Peers: {},
            Videos: {}
        };



        /* navigator.mediaDevices.getUserMedia({
             video: (!this.state.VideoMute),
             audio: (!this.state.AudioMute)
         }).then(stream => {
             if (this.state.VoiceActive != -1) {
             //this.addVideoStream(this.state.myVideo, stream)
             
            
         }
         this.state.myPeer.on('call', call => {
             call.answer(stream)
             const video = document.createElement('video')
             call.on('stream', userVideoStream => {
                 this.addVideoStream(video, userVideoStream)
             })
         })
             this.socketRef.current.on('user-connected', userId => {
                 this.connectToNewUser(userId, stream)
                 console.log("User ID: " + userId);
             })
         })*/



        this.socketRef = React.createRef(null);
        this.socketRef.current = socketio.connect("http://localhost:4000");

        this.state.myPeer.on('open', id => {
            this.setState({
                userId: id
            })
        })

        this.socketRef.current.on('user-disconnected', userId => {
            console.log("dis: " + userId);
            if (this.state.Videos[userId] && userId != this.state.userId) {
            this.state.Videos[userId].remove();
            }
          })

        this.socketRef.current.on('user-connected', userId => {
            if (userId != this.state.userId && this.state.VoiceActive != -1) {
                navigator.mediaDevices.getUserMedia({
                    video: (!this.state.VideoMute),
                    audio: (!this.state.AudioMute)
                }).then(stream => {
                    this.connectToNewUser(userId, stream)
                })
            }
        })

        this.state.myPeer.on('call', call => {
            if (this.state.VoiceActive != -1) {
                const video = document.createElement('video')
                navigator.mediaDevices.getUserMedia({
                    video: (!this.state.VideoMute),
                    audio: (!this.state.AudioMute)
                }).then(stream => {
                    call.answer(stream)
                    call.on('stream', userVideoStream => {
                        this.addVideoStream(video, userVideoStream)
                    })
                })
                this.state.Videos[call.peer] = video;
            }
        })



        this.socketRef.current.on("message", ({ name, message, id, photo }) => {
            this.state.modernm[id].push(
                {
                    message: message,
                    user: name,
                    photo: photo
                },
            );
            this.setState({ x: ' ' });
        })

    }

    Channels = [
        {
            id: 1,
            name: 'Text 1',
            type: 1
        },
        {
            id: 2,
            name: 'Text 2',
            type: 1
        },
        {
            id: 3,
            name: 'Video',
            type: 0
        },
        {
            id: 4,
            name: 'test',
            type: 0
        }
    ]




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
            this.socketRef.current.emit('message', { message: ele.value, name: this.state.user, id: this.state.currChannel, photo: this.state.photo });
            ele.value = '';
        }
    }


    addVideoStream = (video, stream) => {
        if (this.state.videoActive == 0) {
            var videoGrid = document.getElementById("video-grid")
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            videoGrid.append(video)
        }
    }

    connectToNewUser = (userId, stream) => {
        const call = this.state.myPeer.call(userId, stream)
        var img = document.createElement("img");
        img.src = this.state.photo;
        const video = document.createElement('video')
        video.appendChild(img);
        call.on('stream', userVideoStream => {
            this.addVideoStream(video, userVideoStream)
        })
        this.state.Videos[userId] = video;
        this.state.Peers[userId] = call;
    }

    AudioMuteButton = (e) => {
        navigator.mediaDevices.getUserMedia({
            video: 1 - this.state.VideoMute,
            audio: this.state.AudioMute
        }).then(stream => {
            this.addVideoStream(this.state.myVideo, stream)
        })

        this.setState({
            AudioMute: (1 - this.state.AudioMute)
        })

    }

    VideoMuteButton = (e) => {
        navigator.mediaDevices.getUserMedia({
            video: this.state.VideoMute,
            audio: 1 - this.state.AudioMute
        }).then(stream => {
            this.addVideoStream(this.state.myVideo, stream)
        })


        this.setState({
            VideoMute: (1 - this.state.VideoMute)
        })

    }

    Disconnect = (e) => {
        var ChannelBox = document.getElementById("channel-box");
        var ConnectionBox = document.getElementById("connection-bar");
        var StatusBox = document.getElementById("status-bar");

        ChannelBox.style.height = "94%";
        ConnectionBox.style.height = "0%";

        this.state.activeUsers[this.state.VoiceActive].splice(this.state.activeUsers[this.state.VoiceActive].indexOf(x => x.name == this.state.name));


        this.setState({
            VoiceActive: -1
        })

        var userId = this.state.userId;
        var roomId = this.state.VoiceActive;
        this.socketRef.current.emit('user-disconnected', roomId, userId);
        this.state.myVideo.remove();
    }
    clickChannel = (e) => {
        console.log(e.target.id);
        const s = this.Channels.find(x => x.id == e.target.id).type;
        if (s == 0) {
            if (this.state.activeChannel != null) {
                this.state.activeChannel.classList.remove('active');
            }

            if (this.state.VoiceActive != e.target.id) {

                if (this.state.VoiceActive != -1) {
                    this.state.activeUsers[this.state.VoiceActive].splice(this.state.activeUsers[this.state.VoiceActive].indexOf(x => x.name == this.state.name));
                }

                this.state.activeUsers[e.target.id].push({
                    user: this.state.user,
                    photo: this.state.photo
                });

                var ChannelBox = document.getElementById("channel-box");
                var ConnectionBox = document.getElementById("connection-bar");
                var StatusBox = document.getElementById("status-bar");

                ChannelBox.style.height = "88%";
                ConnectionBox.style.height = "6%";

                this.setState({
                    VoiceActive: e.target.id,
                    CallingMode: 1
                })

                this.socketRef.current.emit('join-room', e.target.id, this.state.userId)

               
                navigator.mediaDevices.getUserMedia({
                    video: (!this.state.VideoMute),
                    audio: (!this.state.AudioMute)
                }).then(stream => {
                    this.addVideoStream(this.state.myVideo, stream);
                })
            }
        }

        if (s == 1) {
            if (this.state.activeChannel != null) {
                this.state.activeChannel.classList.remove('active');
            }
            e.target.classList.add('active');
            this.setState({
                CallingMode: 0
            })


        }

        this.setState({
            currChannel: e.target.id,
            activeChannel: e.target,
            videoActive: s
        });
    }



    render() {
        return (
            <div className="flex">

                <div class="btn-group-vertical justify-content-start bg-secondary" role="group" aria-label="Basic example" style={{ padding: '2px' }}>

                    <button data-tip data-for="fileSystem" type="button" className="btn btn-secondary mb-1" style={{ maxHeight: '40px', width: '40px', borderRadius: '5px' /*, boxShadow : '0px 0px 3px 3px gray'*/ }}><i class="fas fa-copy"></i></button>
                    <ReactTooltip id="fileSystem" place="top" effect="solid" backgroundColor="white" textColor="black">File System</ReactTooltip>

                    <Link to="/default/communication">
                        <button data-tip data-for="communication" type="button" className="btn btn-secondary mb-1 " style={{ maxHeight: '40px', width: '40px', borderRadius: '5px' }}><i class="fas fa-comments"></i></button>
                        <ReactTooltip id="communication" place="right" effect="solid" backgroundColor="white" textColor="black">Communication</ReactTooltip>
                    </Link>


                    <button data-tip data-for="liveShare" type="button" className="btn btn-secondary mb-1 " style={{ maxHeight: '40px', width: '40px', borderRadius: '5px' }}><i class="fas fa-share-square"></i></button>
                    <ReactTooltip id="liveShare" place="right" effect="solid" backgroundColor="white" textColor="black">Live Share</ReactTooltip>

                    <Link to="/default/code-review">
                        <button data-tip data-for="review" type="button" className="btn btn-secondary mb-1 " style={{ maxHeight: '40px', width: '40px', borderRadius: '5px' }}><i class="fas fa-pen"></i></button>
                        <ReactTooltip id="review" place="right" effect="solid" backgroundColor="white" textColor="black">Review</ReactTooltip>
                    </Link>

                    <Link to="/default/tasks">
                        <button data-tip data-for="tasks" type="button" className="btn btn-secondary mb-1 " style={{ maxHeight: '40px', width: '40px', borderRadius: '5px' }}><i class="fas fa-tasks"></i></button>
                        <ReactTooltip id="tasks" place="right" effect="solid" backgroundColor="white" textColor="black">Tasks</ReactTooltip>
                    </Link>
                </div>

                <div id="main">
                    <div id="side-bar">
                        <div id="channel-box">
                            {this.Channels.map((currentChannel) => (
                                <React.Fragment>
                                    <div class="channel-container">
                                        <div class="channel" id={currentChannel.id} onClick={this.clickChannel}>
                                            {currentChannel.type == 1 ? <TextFields class="channel-icon"></TextFields> : <VolumeIcon color="light" class="channel-icon"></VolumeIcon>}
                                            <div class="channel-name" >{currentChannel.name}</div>
                                        </div>
                                        <div class="connected-users">
                                            {
                                                this.state.activeUsers[currentChannel.id].map((currentUser) => (
                                                    <React.Fragment>
                                                        <div class="connected-user">
                                                            <img src={currentUser.photo} class="connected-avatar"></img>
                                                            <div class="connected-name"> {currentUser.user}</div>
                                                        </div>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div id="connection-bar">
                            {this.state.VoiceActive == -1 ? <div></div> :
                                <React.Fragment>
                                    <div id="connection-left">
                                        <CallIcon class="connection-icon"></CallIcon>
                                        <div class="connection-name">{this.Channels.find(x => x.id == this.state.VoiceActive).name}</div>
                                    </div>
                                    <CallEndIcon onClick={this.Disconnect} class="Disconnect-icon"></CallEndIcon>
                                </React.Fragment>
                            }

                        </div>
                        <div id="status-bar">
                            <div id="profile-status-bar">
                                <img src={this.state.photo} class="status-avatar"></img>
                                <div class="status-name"> {this.state.user}</div>
                            </div>
                            <div id="buttons-status-bar">
                                {
                                    this.state.AudioMute == 0 ?
                                        <MicIcon onClick={this.AudioMuteButton} class="status-icon" />
                                        :
                                        <MicOffIcon onClick={this.AudioMuteButton} class="status-icon" />
                                }
                                {
                                    this.state.VideoMute == 0 ?
                                        <VideocamIcon onClick={this.VideoMuteButton} class="status-icon"></VideocamIcon>
                                        :
                                        <VideocamOffIcon onClick={this.VideoMuteButton} class="status-icon"></VideocamOffIcon>
                                }
                                <SettingsIcon class="status-icon"></SettingsIcon>
                            </div>
                        </div>
                    </div>

                    {this.state.CallingMode == 1 ? <div id="video-grid"></div> :

                        <div id="content-bar">
                            <div id="messages-box">
                                {this.state.modernm[this.state.currChannel].map((message) => (
                                    <Message
                                        user={message.user}
                                        message={message.message}
                                        photo={message.photo}
                                    />
                                )
                                )}
                            </div>
                            <div id="input-box">
                                <input onKeyPress={this.Send} id="myInput" class="input"></input>
                            </div>
                        </div>
                    }

                </div>



            </div>
        )
    }
}

export default Communication;