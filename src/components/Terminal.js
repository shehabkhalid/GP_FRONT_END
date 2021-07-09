import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { XTerm } from 'xterm-for-react'
import { io } from 'socket.io-client'



const Terminal = ({ code, runner, reset }) =>
{
    const xtermRef = useRef(null)


    var socket = null;
    let command = ''
    const [firstTime, setFirstTime] = useState(true)
    const makeConnection = () =>
    {
      

        try
        {
            socket = io("https://terminal.colab.cf",{
                jsonp: true,
                transports: ['websocket']
            })

            socket.on("connect", () =>
            {
            
               
                xtermRef.current.terminal.writeln("\r\n*** Connected from backend***\r\n");
              
            })
            socket.on("disconnect", function ()
            {
                xtermRef.current.terminal.writeln("\r\n*** Disconnected from backend***\r\n");
            });
            socket.on("data", function (data)
            {

                xtermRef.current.terminal.write(data);
            });

            xtermRef.current.terminal.onData((data) =>
            {
               
                socket.emit("data", data);
            })

           
        } catch (error)
        {
            setFirstTime(true)

            console.log('error',error)
        }



    }
    useEffect(() =>
    {
        try
        {
            
           
            // if (runner)
            // {
            //     run()
            // }
            if (firstTime)
            {
             
                makeConnection()
                setFirstTime(false)
            }


        } catch (error)
        {
            console.log(error)
        }
    }, [runner,firstTime])


    const run = () =>
    {
      
            xtermRef.current.terminal.clear();
     
        reset()
    }
    return (

        <XTerm
            ref={xtermRef}


        />


    )
}

export default (Terminal)
