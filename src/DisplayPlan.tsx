import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
//import { DisplayCourse } from "./DisplayCourse";
import { SemesterLayout } from "./semesterLayout";

export function DisplayPlan(): JSX.Element {
    const [degreePlan, setPlan] = useState<string>(""); // current added degree plan
    const [degreeList, setDegreeList] = useState<string[]>([]); // store inputted degree plan into an array of semesters

    function updatePlam(event: React.ChangeEvent<HTMLInputElement>) {
        setPlan(event.target.value);
    }
    // adds inputted semester to semester list, does not allow repeat semester names
    function addDegree() {
        if (!degreeList.includes(degreePlan) && degreePlan !== "") {
            setDegreeList([...degreeList, degreePlan]);
        }
        setPlan("");
    }

    function deleteDegree(degree: string) {
        const updatedList = [...degreeList];
        const index = updatedList.indexOf(degree);
        updatedList.splice(index, 1);
        setDegreeList(updatedList);
    }
    return (
        <div>
            {degreeList.map((degree: string) => (
                <Container key={degree}>
                    <div key={degree}>
                        <h4>{degree}</h4>
                    </div>
                    <SemesterLayout></SemesterLayout>
                    <Button onClick={() => deleteDegree(degree)}>
                        Delete Degree Plan
                    </Button>
                    <hr></hr>
                </Container>
            ))}
            <Form.Group>
                <Form.Control
                    value={degreePlan}
                    onChange={updatePlam}
                    placeholder="Type degree plan here"
                ></Form.Control>
            </Form.Group>
            <Button onClick={addDegree}>Add New Degree Plan</Button>
        </div>
    );
}
