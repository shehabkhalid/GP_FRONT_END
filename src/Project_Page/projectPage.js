import React, { useState, useContext, useEffect, useRef } from "react";
import { useMonaco } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import Terminal from "../components/Terminal";
import { Drawer } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Collapse } from "reactstrap";
import SideBar from "../newComponents/SideBar";
import "./projectPage.css";
import UserContext from "../Contexts/UserContext/UserContext";
import projectAPI from "../API/project";
import fileAPI from "../API/file";
import { listen } from "vscode-ws-jsonrpc";
import ReactTooltip from "react-tooltip";

/////////////////////////////////fetched but not yet added to the ide
/////////////////////////////////fetched but not yet added to the ide
/////////////////////////////////fetched but not yet added to the ide
/////////////////////////////////fetched but not yet added to the ide

import
{
  MonacoLanguageClient,
  MessageConnection,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection,
} from "monaco-languageclient";

import ReconnectingWebSocket from "reconnecting-websocket";
import socketio from "socket.io-client";
var socketRef = socketio.connect("https://communication.colab.cf/");


const MonacoCollabExt = require("@convergencelabs/monaco-collab-ext");
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: "absolute",
    left: "42.8px",
    top: "60px",
    overflow: "hidden",
    height: "101%",
  },
}));

const Ide = (props) =>
{
  const [state, setState] = useState([]);
  const [code, setCode] = useState("print('bla bla bla')")
  const editorRef = useRef(null);

  const userContext = useContext(UserContext);

  var role = userContext.state.data._id;
  const getFiles = async () =>
  {
    const token = localStorage.getItem("accessToken");
    const projectID = userContext.state.project._id;
    const response = await projectAPI.getAllFilesNames(token, projectID);
    if (!response.message)
    {
      setState(response);
    } else
    {
      alert("Network Error, Please try again later.");
    }
  };

  const getFileData = async (filename) =>
  {
    const token = localStorage.getItem("accessToken");
    const data = {
      fileName: filename.split(".")[0],
      projectId: userContext.state.project._id,
    };
    const response = await fileAPI.getFileDataByName(token, data);
    if (!response.message)
    {

      setCode(response)
      console.log(response);
      /////////////////////////////////fetched but not yet added to the ide/////////////here
    }
  };

  useEffect(() =>
  {
    getFiles();
    window.scrollTo(0, 0);
  }, []);

  var stream = useState();
  var video = document.getElementById("CamDiv");
  if (video != null)
  {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () =>
    {
      video.play();
    });
  }


  function handleEditorDidMount(editor, monaco)
  {
    try {
      
    if (monaco)
    {
      const sourceUser = {
        id: "source",
        label: "Zula",
        color: "grey",
      };

      // const source = monaco.editor.create(
      //   document.getElementById("source-editor"),
      //   {
      //     value: "",
      //     theme: "vs-dark",
      //     language: "python",
      //     lightbulb: {
      //       enabled: true,
      //     },
      //     autoIndent: "full",
      //   }
      // );

      monaco.languages.register(
        {
          id: "python",
          extensions: [".py"],
          aliases: ["python"],
          mimetypes: ["application/text"],
        },
        {
          id: "cpp",
          extensions: [".cpp"],
          aliases: ["cpp"],
          mimetypes: ["application/text"],
        }
      );

      MonacoServices.install();

      const remoteCursorManager = new MonacoCollabExt.RemoteCursorManager({
        editor: editor,
        tooltips: true,
        tooltipDuration: 2,
      });
      // const sourceUserCursor = remoteCursorManager.addCursor(
      //   sourceUser.id,
      //   sourceUser.color,
      //   sourceUser.label
      // );
      const remoteSelectionManager = new MonacoCollabExt.RemoteSelectionManager(
        { editor: editor }
      );
      remoteSelectionManager.addSelection(
        sourceUser.id,
        sourceUser.color,
        sourceUser.label
      );

      const sourceContentManager = new MonacoCollabExt.EditorContentManager({
        editor: editor,
        onInsert(index, text)
        {
          socketRef.emit("Insert", { index, text, role });
          console.log(role)
        },
        onReplace(index, length, text)
        {
          socketRef.emit("Replace", { index, length, text, role });
        },
        onDelete(index, length)
        {
          socketRef.emit("Delete", { index, length, role });
        },
      });

      editor.onDidChangeCursorSelection((e) =>
      {
        const startOffset = editor
          .getModel()
          .getOffsetAt(e.selection.getStartPosition());
        const endOffset = editor
          .getModel()
          .getOffsetAt(e.selection.getEndPosition());
        socketRef.emit("OffsetChanged", { startOffset, endOffset, role });
        remoteSelectionManager.setSelectionOffsets(
          sourceUser.id,
          startOffset,
          endOffset
        );
      });

      var getrole = role;

      socketRef.on("Insert", ({ index, text, role }) => {
       console.log(getrole,role)

        if (getrole != role) {
          source.updateOptions({ readOnly: false });
          sourceContentManager.insert(index, text);
          editor.updateOptions({ readOnly: true });
        }
      });

      socketRef.on("Replace", ({ index, length, text, role }) =>
      {
        if (getrole != role)
        {
          editor.updateOptions({ readOnly: false });
          sourceContentManager.replace(index, length, text);
          editor.updateOptions({ readOnly: true });
        }
      });

      socketRef.on("Delete", ({ index, length, role }) =>
      {
        if (getrole != role)
        {
          editor.updateOptions({ readOnly: false });
          sourceContentManager.delete(index, length);
          editor.updateOptions({ readOnly: true });
        }
      });

      socketRef.on("OffsetChanged", ({ startOffset, endOffset, role }) =>
      {
        if (role != getrole)
        {
          remoteSelectionManager.setSelectionOffsets(
            sourceUser.id,
            startOffset,
            endOffset
          );
        }
      });

      const createWebSocket = (url) =>
      {
        const socketOptions = {
          maxReconnectionDelay: 10000,
          minReconnectionDelay: 1000,
          reconnectionDelayGrowFactor: 1.3,
          connectionTimeout: 10000,
          maxRetries: Infinity,
          debug: false,
        };
        return new ReconnectingWebSocket(url, [], socketOptions);
      };

      const url = "ws://localhost:3000/python";
      const webSocket = createWebSocket(url);

      listen({
        webSocket,
        onConnection: (connection) =>
        {
          // create and start the language client
          const languageClient = createLanguageClient(connection);
          const disposable = languageClient.start();
          connection.onClose(() => disposable.dispose());
        },
      });

      const createLanguageClient = (connection) =>
      {
        return new MonacoLanguageClient({
          name: "Sample Language Client",
          clientOptions: {
            // use a language id as a document selector
            documentSelector: ["python", "cpp"],
            // disable the default error handler
            errorHandler: {
              error: () => ErrorAction.Continue,
              closed: () => CloseAction.DoNotRestart,
            },
          },
          // create a language client connection from the JSON RPC connection on demand
          connectionProvider: {
            get: (errorHandler, closeHandler) =>
            {
              return Promise.resolve(
                createConnection(connection, errorHandler, closeHandler)
              );
            },
          },
        });
      };

      console.log("here is the monaco isntance:", monaco.languages);
    }
    } catch (error) {
      console.log('error',error)
    }

    editorRef.current = editor;
  }


  

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleTerminal = () =>
  {
    setIsOpen(!isOpen);
    if (isOpen === true)
    {
      document.getElementById("collapse").innerHTML =
        "<li class='fas fa-angle-up'></li>";
      document.getElementById("collapse").style.right = "20px";
      document.getElementById("collapse").style.top = "42rem";
    } else if (isOpen === false)
    {
      document.getElementById("collapse").innerHTML =
        "<li class='fas fa-angle-down'></li>";
      document.getElementById("collapse").style.right = "20px";
      document.getElementById("collapse").style.top = "26.2rem";
    }
  };

  const handleDrawer = () =>
  {
    setOpen(!open);
    if (open === false)
    {
      document.getElementById("ide-mr").style.marginLeft = "180px";
      document.getElementById("ide-mr").style.width = "82vw";
      document.getElementById("terminal-mr").style.marginLeft = "180px";
      document.getElementById("terminal-mr").style.width = "82vw";
    } else if (open === true)
    {
      document.getElementById("ide-mr").style.marginLeft = "10px";
      document.getElementById("ide-mr").style.width = "94vw";
      document.getElementById("terminal-mr").style.marginLeft = "10px";
      document.getElementById("terminal-mr").style.width = "94vw";
    }
  };

  const options = {
    language: "python",
    automaticLayout: true,
    selectOnLineNumbers: true,
    renderIndentGuides: true,
    colorDecorators: true,
    cursorBlinking: "blink",
    autoClosingQuotes: "always",
    find: {
      autoFindInSelection: "always",
    },
    snippetSuggestions: "inline",
  };

  const errorText = "Please enter appropriate command, type help to know more.";

  const dragElement = (elmnt) =>
  {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const closeDragElement = () =>
    {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const elementDrag = (e) =>
    {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    };

    const dragMouseDown = (e) =>
    {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    if (elmnt == null) console.log("rest");
    if (document.getElementById(elmnt.id))
    {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else
    {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  };

  var elmnt = document.getElementById("CamDiv");
  if (elmnt != null) dragElement(elmnt);

  return (
    <div className="flex-row">
      <SideBar
        handleDrawer={handleDrawer}
        showRun={true} /*saveLogic={} runLogic={} */
      />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        backgroundColor="rgb(108, 117, 125);"
        style={{ zIndex: "1" }}
      >
        <div className="sidebar d-flex col">
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label={userContext.state.project.name}>
              {state.map((file, index) =>
              {
                return (
                  <TreeItem
                    nodeId={index + 2}
                    label={file}
                    onClick={() => getFileData(file)}
                  />
                );
              })}
            </TreeItem>
          </TreeView>
          {/* <button
            data-tip
            data-for="addFile"
            type="button"
            className="btn btn-secondary mb-1 m-1"
            style={{ maxHeight: "40px", width: "40px", borderRadius: "5px" }}
          >
            <i class="fas fa-plus"></i>
          </button>
          <ReactTooltip
            id="addFile"
            place="right"
            effect="solid"
            backgroundColor="white"
            textColor="black"
          >
            Add File
          </ReactTooltip> */}
          {/* for later  */}
        </div>
      </Drawer>

      <div className="flex-column">
        <button
          id="collapse"
          onClick={handleTerminal}
          type="button"
          class="btn btn-secondary btn-sm"
          style={{
            zIndex: "1",
            right: "20px",
            position: "absolute",
            marginTop: "10px",
            top: "26.2rem",
            transition: "ease-in-out 0.3s",
          }}
        >
          <i class="fas fa-angle-down"></i>
        </button>
      </div>

      <div className="flex-column">
        <div type="text" id="ide-mr" className="code">
          <Editor
            onMount={handleEditorDidMount}
            value={code}
            theme="vs-dark"
            language="python"

          />


          {/* <div class="editor" id="source-editor"></div> */}
        </div>

        <Collapse isOpen={isOpen}>
          <div id="terminal-mr">
            <Terminal
              // errorText={errorText}
              // ignoreCommandCase
              // noEchoBack
              // promptLabel={">"}
              // className="main-terminal"
              // contentClassName="main-terminal-content"
              // promptLabelClassName="text-white"
              // inputClassName="text-white"
              runner={true}
            />
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Ide;
