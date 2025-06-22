import * as session from "./session.js";
import * as socketManager from "./socketManager.js";

const buttonSend = document.querySelector(".send-button");
const textInput = document.querySelector("#text-input");

const chatContainer = document.querySelector(".chat-container");

session.getSocket().onopen = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    console.log("Connected!");
    const messageCloud = document.createElement("div");
    messageCloud.style.width = "100%";
    messageCloud.style.padding = "10px";
    messageCloud.style.backgroundColor = "black";
    messageCloud.style.flexWrap = "wrap";
    messageCloud.style.color = "white";
    messageCloud.style.border = "white solid 0.5vmin";
    messageCloud.style.borderRadius = "1vmin";
    messageCloud.textContent = "Connected!";

    messageCloud.style.display = "flex";
    messageCloud.style.flexDirection = "column";
    messageCloud.style.justifyContent = "space-between";
    messageCloud.style.alignContent = "center";
    messageCloud.style.wordBreak = "break-word";
    messageCloud.style.whiteSpace = "normal";


    const dateInfo = document.createElement("span");
    dateInfo.textContent = `${timeString}`;
    dateInfo.style.fontSize = "small";
    dateInfo.style.verticalAlign = "text-bottom";

    messageCloud.appendChild(dateInfo);
    
    chatContainer.appendChild(messageCloud);
};

socketManager.onMessage((data) => {
    console.log("[messaging] The server sent: " + data.type + " " + data.content);
    if (data.type == "error") {
        return;
    }
    else if (data.type == "message") {
        MessageDisplay(data.content, data.time, "recieved");
    }
})

buttonSend.addEventListener("click", () => {
    console.log("Clicked a send button!");
    const messageContent = textInput.value;
    if (messageContent == "") return;

    textInput.value = "";
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const username = session.getUsernameText();

    session.getSocket().send(JSON.stringify({
        type: "message",
        userId: username,
        recieverId: (username.indexOf("1") == -1 ? username.replace("2", "1") : username.replace("1", "2")),
        content: messageContent,
        time: timeString,
    }));

    MessageDisplay(messageContent, timeString, "sent");
});

function MessageDisplay(content, time, type) {
    const messageCloudContainer = document.createElement("div");
    const messageCloud = document.createElement("div");

    messageCloudContainer.style.display = "flex";
    messageCloudContainer.style.width = "100%";
    //messageCloudContainer.style.overflowY = "auto";
    //messageCloudContainer.style.overflowX = "hidden";
    messageCloudContainer.style.height = "auto";


    if(type == "sent")
        messageCloudContainer.style.justifyContent = "flex-end";

    messageCloud.style.width = "auto";
    messageCloud.style.maxWidth = "70%";
    messageCloud.style.padding = "10px";
    messageCloud.style.backgroundColor = (type == "sent") ? "#005c4b" :"#363636";
    messageCloud.style.flexWrap = "wrap";
    messageCloud.style.color = "white";
    messageCloud.style.border = "white solid 0.5vmin";
    messageCloud.style.borderRadius = "1vmin";
    messageCloud.textContent = content;

    messageCloud.style.display = "flex";
    messageCloud.style.flexDirection = "column";
    messageCloud.style.justifyContent = "space-between";
    messageCloud.style.alignContent = "center";
    messageCloud.style.wordBreak = "break-word";
    messageCloud.style.whiteSpace = "normal";

    const dateInfo = document.createElement("span");
    dateInfo.textContent = time;
    dateInfo.style.fontSize = "small";
    dateInfo.style.verticalAlign = "text-bottom";

    messageCloud.appendChild(dateInfo);
    messageCloudContainer.appendChild(messageCloud)
    chatContainer.appendChild(messageCloudContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
