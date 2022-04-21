import React from "react";
import { Container } from "react-bootstrap";
import { degreeplan } from "../interfaces/degreeplan";
import { SemesterLayout } from "./SemesterLayout";
//import { SemesterLayout } from "./SemesterLayout";

export function DisplayPlan({ plan }: { plan: degreeplan }): JSX.Element {
    return (
        <div>
            <Container>
                <h3 key={plan.title}>{plan.title}</h3>
                {plan.concentration !== "" && (
                    <h4>Concentration: {plan.concentration}</h4>
                )}
                <div className="rounded-lg">
                    <SemesterLayout></SemesterLayout>
                </div>
                <hr></hr>
            </Container>
        </div>
    );
}
