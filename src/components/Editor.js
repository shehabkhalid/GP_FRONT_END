import React from 'react'
import * as monaco from 'monaco-editor'
import { listen} from '@codingame/monaco-jsonrpc';
const {
    MonacoLanguageClient, CloseAction, ErrorAction,
    MonacoServices, createConnection
} = require('monaco-languageclient/lib');
import ReconnectingWebSocket from 'reconnecting-websocket';
const Editor = () => {

    let divNode;
    const assignRef = React.useCallback((node) => {
        // On mount get the ref of the div and assign it the divNode
        divNode = node;
    }, []);

    
    React.useEffect(() => {
        if (divNode) {
            




            monaco.languages.register({
                id: 'typescript',
                extensions: ['.ts'],
                aliases: ['TypeScript','ts','TS','Typescript','typescript']
            })

            const editor = monaco.editor.create(divNode, {
                language: 'javascript',
                minimap: { enabled: true },
                autoIndent: true,
                theme:"vs-dark"
            });


            // const url = 'ws://localhost:3000/ts'
            // const webSocket = createWebSocket(url);

            // listen({
            //     webSocket,
            //     onConnection: connection => {
            //         // create and start the language client
            //         const languageClient = createLanguageClient(connection);
            //         const disposable = languageClient.start();
            //         connection.onClose(() => disposable.dispose());
            //     }
            // });



            // function createLanguageClient(connection) {
            //     return new MonacoLanguageClient({
            //         name: "Sample Language Client",
            //         clientOptions: {
            //             // use a language id as a document selector
            //             documentSelector: ['typescript'],
            //             // disable the default error handler
            //             errorHandler: {
            //                 error: () => ErrorAction.Continue,
            //                 closed: () => CloseAction.DoNotRestart
            //             }
            //         },
            //         // create a language client connection from the JSON RPC connection on demand
            //         connectionProvider: {
            //             get: (errorHandler, closeHandler) => {
            //                 return Promise.resolve(createConnection(connection, errorHandler, closeHandler))
            //             }
            //         }
            //     });
            // }


            // function createWebSocket(url) {
            //     const socketOptions = {
            //         maxReconnectionDelay: 10000,
            //         minReconnectionDelay: 1000,
            //         reconnectionDelayGrowFactor: 1.3,
            //         connectionTimeout: 10000,
            //         maxRetries: Infinity,
            //         debug: false
            //     };
            //     return new ReconnectingWebSocket(url, [], socketOptions);
            // }

        }
    }, [assignRef])

    return <div ref={assignRef} style={{ height: '90vh' }}></div>;
}

export default Editor
