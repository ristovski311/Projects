import * as session from "./session.js";
import * as socketManager from "./socketManager.js";

let logInButton = document.querySelector(".log-in-button");

logInButton.addEventListener("click", () => {
    const username = document.querySelector("#log-in-username").value;
    const password = document.querySelector("#log-in-password").value;

    session.setUsernameText(username);
    session.setPasswordText(password);

    console.log("Username : " + session.getUsernameText() + " password: " + session.getPasswordText());

    if (!username || username.trim() === "" || !password || password.trim() === "") {
        let warning = document.querySelector(".warning");
        if (warning == null) {
            let emptyInputWarning = document.createElement("h4");
            emptyInputWarning.textContent = "Please enter valid username and password!";
            emptyInputWarning.style.color = "#ff5555";
            emptyInputWarning.classList.add("warning");
            document.querySelector(".log-in-div").appendChild(emptyInputWarning);
        }
    } else {
        session.getSocket().send(JSON.stringify({
            type: "login",
            username: session.getUsernameText(),
            password: session.getPasswordText()
        }));

        socketManager.onMessage((data) => {
            const content = document.querySelector(".content");
            console.log("[login] The server sent: " + data.type + " " + data.content);

            if (data.status === "success") {
            {
                document.querySelector(".login-view").style.display = "none";
                document.querySelector(".conversation-view").style.display = "flex";
            }
            } else if (data.status === "login fail") {
                let warning = document.querySelector(".warning");
                if (warning) content.removeChild(warning);

                let loginFailInfo = document.createElement("h4");
                loginFailInfo.textContent = "Login credentials are incorrect!";
                loginFailInfo.style.color = "#ff9999";
                loginFailInfo.classList.add("warning");
                content.appendChild(loginFailInfo);
            } 
            else if(data.status === "message") {
                return;
            } 
            else {
                console.log("Unexpected error.");
                let warning = document.querySelector(".warning");
                if (warning) content.removeChild(warning);

                let errorInfo = document.createElement("h4");
                errorInfo.textContent = "Unexpected error occurred!";
                errorInfo.style.color = "#ff9999";
                errorInfo.classList.add("warning");
                content.appendChild(errorInfo);
            }
        })

        // socket.onmessage = (event) => {
            // const data = JSON.parse(event.data);
            // const content = document.querySelector(".content");

            // if (data.status === "success") {
            // {
            //     document.querySelector(".login-view").style.display = "none";
            //     document.querySelector(".conversation-view").style.display = "flex";
            // }
            // } else if (data.status === "login fail") {
            //     let warning = document.querySelector(".warning");
            //     if (warning) content.removeChild(warning);

            //     let loginFailInfo = document.createElement("h4");
            //     loginFailInfo.textContent = "Login credentials are incorrect!";
            //     loginFailInfo.style.color = "#ff9999";
            //     loginFailInfo.classList.add("warning");
            //     content.appendChild(loginFailInfo);
            // } else {
            //     console.log("Unexpected error.");
            //     let warning = document.querySelector(".warning");
            //     if (warning) content.removeChild(warning);

            //     let errorInfo = document.createElement("h4");
            //     errorInfo.textContent = "Unexpected error occurred!";
            //     errorInfo.style.color = "#ff9999";
            //     errorInfo.classList.add("warning");
            //     content.appendChild(errorInfo);
            // }
        // };
    }
});
