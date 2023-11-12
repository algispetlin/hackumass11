import { Question, newAccount , newCourse , userCourseId , userId , courseId , changeSyllabus , courseIdName , changePermission} from "../models/ApiModel";

const FLASK_URL: string = 'http://localhost:5000';

export async function get(url: string) {
    const requestInfo = { method: "GET" };
    
    return await fetch(FLASK_URL + url, requestInfo)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function post(url: string, payload?: Question | newAccount | newCourse | userCourseId | userId | courseId | changeSyllabus | courseIdName | changePermission) {
    const requestInfo = { 
        method: "POST", 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: payload ? JSON.stringify(payload) : null
    };

    return await fetch(FLASK_URL + url, requestInfo)
        .then(response => response.json())
        .catch(error => console.log(error));
}