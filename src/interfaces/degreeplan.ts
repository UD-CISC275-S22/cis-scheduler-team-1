import { semester } from "./semester";

export interface degreeplan {
    id: number;
    semesters: semester[];
    reqs: boolean; //if grad reqs are met
    semestertotal: number; //total number of semesters
}
