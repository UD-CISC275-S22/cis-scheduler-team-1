import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
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
                        <RequirementView plan={plan}></RequirementView>
                    </Row>
                    <Row>
                        <CoursePool
                            pool={pool}
                            plan={plan}
                            editDegree={editDegree}
                            editPool={editPool}
                        ></CoursePool>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
