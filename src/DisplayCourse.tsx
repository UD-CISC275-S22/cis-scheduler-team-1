import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function DisplayCourse(): JSX.Element {
    const [course, setCourse] = useState<string>("Type course here");

    function updateCourse(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse(event.target.value);
    }

    return (
        <Form.Group>
            <Form.Control value={course} onChange={updateCourse}></Form.Control>
        </Form.Group>
    );
}
