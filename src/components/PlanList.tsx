import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
import { DisplayPlan } from "./DisplayPlan";

export function PlanList({
    plans,
    deleteDegree,
    editDegree
}: {
    plans: Degreeplan[];
    deleteDegree: (id: string) => void;
    editDegree: (id: number, newDegree: Degreeplan) => void;
}): JSX.Element {
    return (
        <div>
            {plans.map((plan: Degreeplan) => (
                <div key={plan.id} className="bg-light border m-2 p-2">
                    <DisplayPlan
                        plan={plan}
                        deleteDegree={deleteDegree}
                        editDegree={editDegree}
                    ></DisplayPlan>
                    <Button onClick={() => deleteDegree(plan.title)}>
                        Delete Degree Plan
                    </Button>
                </div>
            ))}
        </div>
    );
}
