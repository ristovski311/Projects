let usernameText = "";
let passwordText = "";
let socket = new WebSocket('ws://localhost:4444');

export function setUsernameText(value) {
    usernameText = value;
}

export function getUsernameText() {
    return usernameText;
}

export function setPasswordText(value) {
    passwordText = value;
}

export function getPasswordText() {
    return passwordText;
}

export function setSocket(value) {
    socket = value;
}

export function getSocket() {
    return socket;
}