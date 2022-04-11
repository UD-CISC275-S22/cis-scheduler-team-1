import { course } from "./course";

export interface semester {
    id: number;
    courses: course[];
    title: string; //semester name (i.e. "Spring 2022")
    coursetotal: number; //total courses in the semester
}
