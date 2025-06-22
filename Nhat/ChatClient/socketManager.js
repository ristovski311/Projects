import * as session from "./session.js";

const listeners = [];

session.getSocket().onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("[socketManager] The data server sent is: " + data);
    listeners.forEach(fn => fn(data));
}

export function onMessage(callback)
{
    listeners.push(callback);
}