import { Course } from "./course";

export interface Semester {
    id: number;
    courses: Course[];
    title: string; //semester name (i.e. "Spring 2022")
    credits: number; //total credits in the semester
}
