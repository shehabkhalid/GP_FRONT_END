import logo from './logo.svg';
import './App.css';
import React from 'react'
//import Editor from "./components/Editor";
import Editor, { useMonaco } from "@monaco-editor/react";

import { listen } from 'vscode-ws-jsonrpc';

import
{
  MonacoLanguageClient, CloseAction, ErrorAction,
  MonacoServices, createConnection,
} from 'monaco-languageclient';
import ReconnectingWebSocket from 'reconnecting-websocket';
function App()
{

  const monaco = useMonaco();
  React.useEffect(() =>
  {
    if (monaco)
    {

      monaco.languages.register({
        id: 'python',
        extensions: ['.py'],  
        aliases: ['python'],
        mimetypes: ['application/text']
      },{
        id: 'cpp',
        extensions: ['.cpp'],  
        aliases: ['cpp'],
        mimetypes: ['application/text']
      })
      //monaco.editor.getModel(monaco.Uri.parse("inmemory://dummy.py"))||
     // monaco.editor.createModel('', 'python', monaco.Uri.parse('inmemory://dummy.py'))
     // monaco.editor.createModel('', 'c', monaco.Uri.parse('/src/test.cpp'))
      //const urll = monaco.Uri.parse('file:///demo/ts')

      MonacoServices.install(monaco);
      // MonacoServices.install(require('monaco-editor-core/esm/vs/platform/commands/common/commands').CommandsRegistry);
      const url = 'ws://localhost:3003/python'
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
            documentSelector: ['python','cpp'],
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


      console.log("here is the monaco isntance:", monaco.languages);
    }
  }, [monaco]);


  return (
    <div>

      <h1>GP editor monaco with LSP and React test 56 (python)</h1>

      <Editor
        height="90vh"
        defaultLanguage="python"
        
       // path="file:///GP_C/test.cc"
        theme="vs-dark"
      />

    </div>
  );
}

export default App;
