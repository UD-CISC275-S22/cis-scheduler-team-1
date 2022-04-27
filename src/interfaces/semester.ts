import { Course } from "./course";

export interface Semester {
    id: number;
    courses: Course[];
    title: string; //semester name (i.e. "Spring 2022")
    //coursetotal: number; //total courses in the semester
}
