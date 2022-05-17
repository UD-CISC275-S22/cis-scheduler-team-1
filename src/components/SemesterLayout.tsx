import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import { DisplayCourse } from "./DisplayCourse";
import { Semester } from "../interfaces/semester";

export function SemesterLayout({
    plan,
    editPlan,
    semester
}: {
    plan: Degreeplan;
    editPlan: (id: number, newPlan: Degreeplan) => void;
    semester: Semester;
}): JSX.Element {
    const [fullView, setFullView] = useState<boolean>(true);

    function changeView() {
        setFullView(!fullView);
    }

    function editSemester(id: number, newSemester: Semester) {
        const updatedSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === id ? newSemester : semester
        );
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            totalCredits: trackDegreeCredits(updatedSemesters)
        });
    }

    function trackDegreeCredits(semesters: Semester[]): number {
        const semesterCredits = semesters.map(
            (semester: Semester): number => semester.credits
        );
        const total = semesterCredits.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
        return total;
    }

    function deleteSemester(semester: Semester) {
        const updatedList = [...plan.semesters];
        const index = updatedList.indexOf(semester);
        updatedList.splice(index, 1);
        editPlan(plan.id, {
            ...plan,
            semesters: updatedList,
            totalCredits: trackDegreeCredits(updatedList)
        });
    }

    return fullView ? (
        <div>
            <Button onClick={changeView}>Show Less</Button>
            <div className="bg-white border m-2 p-2">
                <DisplayCourse
                    plan={plan}
                    semester={semester}
                    editPlan={editPlan}
                    editSemester={editSemester}
                    trackDegreeCredits={trackDegreeCredits}
                ></DisplayCourse>
                <Button onClick={() => deleteSemester(semester)}>
                    Delete Semester
                </Button>
                <hr></hr>
            </div>
        </div>
    ) : (
        <div>
            <Button onClick={changeView}>Show More</Button>
        </div>
    );
}
