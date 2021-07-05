import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'

function Message( { timestamp, message, user, photo }) {
    return (
        <div class="message">
            <div class="avatar">
            <Avatar 
                src = {photo}
            />
            </div>
            <div class="messageinfo">
                <div class="user">{user}</div>
                <div class="mess">{message}</div>
            </div>
        </div>
    )
}

export default Message

