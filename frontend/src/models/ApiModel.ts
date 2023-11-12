export interface Question {
    courseId: string;
    userId: string;

    question: string;
}

export interface newAccount {
    name: string;
    email: string;
}

export interface newCourse {
    userId: string;
    name: string;
    syllabus: string;
}

export interface userCourseId {
    userId: string;
    courseId: string;
}

export interface userId {
    userId: string;
}

export interface courseId {
    courseId: string;
}

export interface changeSyllabus {
    courseId: string;
    syllabus: string;
}

export interface courseIdName {
    courseId: string;
    name: string;
}

export interface changePermission {
    userId: string;
    permission: string;
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