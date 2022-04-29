import React from "react";
import { Container, Row } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";

export function RequirementView({ plan }: { plan: Degreeplan }): JSX.Element {
    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>Degree Fulfillments</h4>
                <p>
                    In order to graduate with a bachelors degree you must
                    complete 120 credits. Complete 2 semesters a year to
                    graduate in 4 years.
                </p>
                <Row>Total Semesters: {plan.semesters.length}</Row>
                <Row>Total Credits: {plan.totalCredits} / 120</Row>
            </Container>
        </div>
    );
}
