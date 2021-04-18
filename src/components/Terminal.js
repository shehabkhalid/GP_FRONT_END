import React, { useEffect, useRef, useState } from 'react'
import { XTerm } from 'xterm-for-react'
import { io } from 'socket.io-client'


const Terminal = () =>
{
    const xtermRef = useRef(null)
   
    let socket;
    let command = ''
    useEffect(() =>
    {
        try
        {

            socket = io("http://localhost:8080");
            socket.on("connect", () =>
            {
                console.log('connected')
                xtermRef.current.terminal.writeln("works")
            })
            socket.on("disconnect", function ()
            {
                xtermRef.current.terminal.writeln("\r\n*** Disconnected from backend***\r\n");
            });
            socket.on("data", function(data) {
                
                xtermRef.current.terminal.write(data);
              });
            
            xtermRef.current.terminal.onData((data) =>
            {
                socket.emit("data", data);
            })

            // xtermRef.current.terminal.onKey((e) =>
            // {

            //     if (e.domEvent.key === "Enter")
            //     {
                    
            //         console.log(command)
            //         command=''

            //     }
            // })



        } catch (error)
        {
            console.log(error)
        }
    }, [])
    return (
        <XTerm
            ref={xtermRef}

        // onData = {(char)=>{

        //     setCommand(char);
        //     xtermRef.current.terminal.write(char)
        // }}

        />
    )
}

export default Terminal
