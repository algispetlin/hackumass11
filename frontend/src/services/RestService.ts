import { Question } from "../models/ApiModel";

const FLASK_URL: string = 'https://localhost:5000';

export function get(url: string): Promise<any> {
    const requestInfo = { method: "GET" };
    
    return fetch(FLASK_URL + url, requestInfo);
}

export function post(url: string, payload?: Question): Promise<any> {
    const requestInfo = { 
        method: "POST", 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: payload ? JSON.stringify(payload) : null
    };

    return fetch(FLASK_URL + url, requestInfo);
}