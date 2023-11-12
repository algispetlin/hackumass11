export interface Question {
    courseId: string;
    userId: string;

    question: string;
}

export interface UserSchema {
    _id: string;
    permissions: string[];
    courses: Course[];
    name: string;
    email: string;
}

export interface Course {
    _id: string;
    name: string;
    instructor: {
        name: string;
        id: string;
    };
}