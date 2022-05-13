import { Semester } from "./semester";

//export type DegreeType = "BS" | "BA" | "";

export interface Degreeplan {
    id: number;
    title: string;
    major: string;
    type: string; // need to know if BS or BA (different breadth reqs)
    semesters: Semester[];
    reqs: boolean; //if grad reqs are met
    totalCredits: number;
}
