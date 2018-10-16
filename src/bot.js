const redux = require('redux');
// const readLine = require('readline-sync');
const BotApp = require('./reducer');
const inititalState = require('./state');
const store = redux.createStore(BotApp, inititalState);
const recastai = require('recastai').default
const client = new recastai('179b5838ffd56bcb9c0d4ca415bf0584');
const build = client.build
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

// this message is used while bot sends a message to the user
function messageFromBot(message) {
    return build.dialog({ 'type': 'text', content: message }, { conversationId: '21' })
        .then(res => {
            let reply = res.messages[0].content;
            console.log("Bot replying  :-  " + reply);
            store.dispatch({
                type: 'SEND_MESSAGE_BOT_TO_USER',
                payload: {
                    timeStamp: (new Date()).toDateString(),
                    from: "bot",
                    to: "user",
                    message: reply
                }
            })
            return reply
        })
        .catch(err => console.error('Something went wrong', err));
}

// function is used when user sends the message to the bot
function messageFromUser(message) {
    const action = {
        type: 'SEND_MESSAGE_USER_TO_BOT',
        payload: {
            timeStamp: (new Date()).toDateString(),
            from: "ravinder",
            to: "bot",
            message: message
        }
    };

    store.dispatch(action);
    return client.request.analyseText(message).then((data) => data.intent())
        .then((data) => {
            store.dispatch({
                type: "ADD_INTENT",
                payload: {
                    intent: data
                }
            });
        })
}


// function is used to set the token for gitAPI
function setToken(token) {
    const action = {
        type: 'SET_ACCESS_TOKEN',
        payload: {
            "accessToken": token
        }
    }
    store.dispatch(action);
}


// this function fetches the details of the user from the GIT API and set the state
function setUserProfileFromGithub() {
    const action = {
        type: "SET_USER_PROFILE_FROM_GITHUB",
        payload: {
            profile: {
                name: "ravinder kumar",
                age: 30,
                organization: "Stackroute"
            }
        }
    }
    store.dispatch(action);
}


// this function returns the current latest state of the user
function returnCurrentState() {
    return store.getState();
}


async function test(question) {
    if (!returnCurrentState.accessToken) {
        // const git = readLine.question("please provide your Github token ?")
        setToken("453453535345");
        setUserProfileFromGithub();
    }
    let b = await messageFromUser(question);
    let c = await messageFromBot(question);
    console.log(returnCurrentState())
    return c
}

module.exports = test;






