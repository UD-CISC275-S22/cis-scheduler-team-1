import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import { CoursePool } from "./CoursePool";
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
    return (
        <div>
            <Row>
                <Col xs={8}>
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
                            ></SemesterLayout>
                        </div>
                        <hr></hr>
                    </Container>
                </Col>
                <Col>
                    <CoursePool></CoursePool>
                </Col>
            </Row>
        </div>
    );
}
