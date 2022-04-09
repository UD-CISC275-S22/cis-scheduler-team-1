import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DisplayCourse } from "./DisplayCourse";

function addCourse(): JSX.Element {
    return <DisplayCourse></DisplayCourse>;
}

export function SemesterLayout(): JSX.Element {
    const [semester, setSemester] = useState<string>("");

    function updateSemester(event: React.ChangeEvent<HTMLInputElement>) {
        setSemester(event.target.value);
    }

    return (
        <div>
            <Form.Group>
                <Form.Control
                    value={semester}
                    onChange={updateSemester}
                    placeholder="Type semester here"
                ></Form.Control>
            </Form.Group>
            <DisplayCourse></DisplayCourse>
        </div>
    );
}
