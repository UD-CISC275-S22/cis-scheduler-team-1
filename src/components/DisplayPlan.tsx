import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CoursePool } from "./CoursePool";
import { RequirementView } from "./RequirementView";
import { SemesterLayout } from "./SemesterLayout";

export function DisplayPlan({
    plan,
    deleteDegree,
    editDegree
}: {
    plan: Degreeplan;
    deleteDegree: (id: string) => void;
    editDegree: (id: number, newDegree: Degreeplan) => void;
}): JSX.Element {
    const [pool, setPool] = useState<Course[]>([]);

    function editPool(newPool: Course[]) {
        setPool(newPool);
    }

    function trackCredits(semesters: Semester[]): number {
        const semesterCredits = semesters.map(
            (semester: Semester): number => semester.credits
        );
        const total = semesterCredits.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
        return total;
    }

    function editSemester(id: number, newSemester: Semester) {
        const updatedSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === id ? newSemester : semester
        );
        //setSemesterList(updatedSemesters);
        editDegree(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            totalCredits: trackCredits(updatedSemesters)
        });
    }

    // need the edit semester function here so that pool can access it
    return (
        <div>
            <Row>
                <Col xs={8} className="bg-grey border m-2 p-2">
                    <Container>
                        <h3 key={plan.title}>{plan.title}</h3>
                        {plan.concentration !== "" && (
                            <h4>Concentration: {plan.concentration}</h4>
                        )}
                        <div className="rounded-lg">
                            <SemesterLayout
                                plan={plan}
                                deleteDegree={deleteDegree}
                                editDegree={editDegree}
                                editPool={editPool}
                                pool={pool}
                            ></SemesterLayout>
                        </div>
                        <hr></hr>
                    </Container>
                </Col>
                <Col>
                    <Row>
                        <Container>
                            <RequirementView plan={plan}></RequirementView>
                        </Container>
                    </Row>
                    <Row>
                        <Container>
                            <CoursePool
                                pool={pool}
                                plan={plan}
                                editPool={editPool}
                                editSemester={editSemester}
                            ></CoursePool>
                        </Container>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
