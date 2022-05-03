import React from "react";
import { Container, Row } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import majorlinks from "../data/majorlinks.json";

export function RequirementView({ plan }: { plan: Degreeplan }): JSX.Element {
    const LINKS: Record<string, Record<string, string>> = majorlinks;

    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>Degree Fulfillments</h4>
                <p>
                    In order to graduate with a bachelors degree you must
                    complete 120 credits. Average of 2 semesters a year, max of
                    4.
                </p>
                <Row>Total Semesters: {plan.semesters.length}</Row>
                <Row>Total Credits: {plan.totalCredits} / 124</Row>
                <Row>
                    <h6>Major Required Classes: </h6>
                    Click the link to see a comprehensive list of the degree
                    requirements for your major!{" "}
                    <a
                        href={LINKS[plan.type][plan.major]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Major Requirements
                    </a>
                </Row>
            </Container>
        </div>
    );
}
// map unfulfilled major requirements from data after we scrape
