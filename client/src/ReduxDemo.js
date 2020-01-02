import React, { Component } from 'react';
import { createStore } from 'redux';

class ReduxDemo extends Component {
    render() {
        // reducer: state and action
        const reducer = function (state, action) {
            if (action.type === "Attack") {
                return action.payload
            }
            if (action.type === "GreenAttack") {
                return action.payload
            }
            return state;
        }
        // store: reducer and state
        const store = createStore(reducer, "Peace")
        // subscribe
        store.subscribe(()=> {
            console.log("store is now", store.getState());
        })
        // dispatch action
        store.dispatch({type: "Attack", payload: "Iron Man"})
        store.dispatch({type: "GreenAttack", payload: "Hulk"})
        return (
            <div>
                Test
            </div>
        )
    }
}

export default ReduxDemo;