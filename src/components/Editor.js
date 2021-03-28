import React from 'react'
import * as monaco from 'monaco-editor-core'
import { listen } from 'vscode-ws-jsonrpc';
import
    {
        MonacoLanguageClient, CloseAction, ErrorAction,
        MonacoServices, createConnection
    } from 'monaco-languageclient';
import ReconnectingWebSocket from 'reconnecting-websocket';
const Editor = () =>
{

    let divNode;
    const assignRef = React.useCallback((node) =>
    {
        // On mount get the ref of the div and assign it the divNode
        divNode = node;
    }, []);


    React.useEffect(() =>
    {
      //  MonacoServices.install(require('monaco-editor-core/esm/vs/platform/commands/common/commands').CommandsRegistry);

        if (divNode)
        {



            const value = `{
                "$schema": "http://json.schemastore.org/coffeelint",
                "line_endings": "unix"
            }`;
            monaco.languages.register({
                id: 'json',
                extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
                aliases: ['JSON', 'json'],
                mimetypes: ['application/json'],
            });

            const editor = monaco.editor.create(divNode, {
                model: monaco.editor.createModel(value, 'json', monaco.Uri.parse('inmemory://model.json')),

                language: 'typescript',
                minimap: { enabled: true },
                autoIndent: true,
                theme: "vs-dark"
            });


         
         
            MonacoServices.install(require('monaco-editor/esm/vs/platform/commands/common/commands').CommandsRegistry);
            // MonacoServices.install(editor,{rootUri: "file:///D:/small projects/GP-stuff/demo/ts"});
            const url = 'ws://localhost:3001/json'
            const webSocket = createWebSocket(url);

            listen({
                webSocket,
                onConnection: connection =>
                {
                    // create and start the language client
                    const languageClient = createLanguageClient(connection);
                    const disposable = languageClient.start();
                    connection.onClose(() => disposable.dispose());
                }
            });


            function createLanguageClient(connection)
            {
                return new MonacoLanguageClient({
                    name: "Sample Language Client",
                    clientOptions: {
                        // use a language id as a document selector
                        documentSelector: ['typescript'],
                        // disable the default error handler
                        errorHandler: {
                            error: () => ErrorAction.Continue,
                            closed: () => CloseAction.DoNotRestart
                        }
                    },
                    // create a language client connection from the JSON RPC connection on demand
                    connectionProvider: {
                        get: (errorHandler, closeHandler) =>
                        {
                            return Promise.resolve(createConnection(connection, errorHandler, closeHandler))
                        }
                    }
                });
            }


            function createWebSocket(url)
            {
                const socketOptions = {
                    maxReconnectionDelay: 10000,
                    minReconnectionDelay: 1000,
                    reconnectionDelayGrowFactor: 1.3,
                    connectionTimeout: 10000,
                    maxRetries: Infinity,
                    debug: false
                };
                return new ReconnectingWebSocket(url, [], socketOptions);
            }

        }
    }, [assignRef])

    return <div ref={assignRef} style={{ height: '90vh' }}></div>;
}

export default Editor
