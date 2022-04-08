import { courseType } from "./courseType";

export interface semester {
    id: number;
    courses: courseType[];
    title: string; //semester name (i.e. "Spring 2022")
    coursetotal: number; //total courses in the semester
}
