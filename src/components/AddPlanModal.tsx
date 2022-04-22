import React, { useState } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";

export function AddPlanModal({
    show,
    handleClose,
    addPlan
}: {
    show: boolean;
    handleClose: () => void;
    addPlan: (newPlan: Degreeplan) => void;
}) {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;
    type DegreeType = "BS" | "BA" | "";

    const [id, setId] = useState<number>(0);
    const [type, setType] = useState<DegreeType>("BS");
    const [major, setMajor] = useState<string>("");
    const [concentration, setConcentration] = useState<string>("");

    function saveAll() {
        addPlan({
            id: id,
            major: major,
            title: major + " " + type,
            type: type,
            semesters: [],
            reqs: false,
            semestertotal: 0,
            concentration: concentration
        });
        setId(id + 1); // increment id for next one ?
        handleClose();
    }

    function updateChoice(event: ChangeEvent) {
        if (event.target.value == "BS") {
            setType("BS");
        } else {
            setType("BA");
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Degree Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="degreeId" as={Row}>
                        <Form.Label column sm={3}>
                            Degree Type:
                        </Form.Label>
                        <Row>
                            <Form.Select
                                value={type}
                                onChange={updateChoice}
                                placeholder="Select Degree Type"
                            >
                                <option key="BS" value="BS">
                                    Bachelor of Science (BS)
                                </option>
                                <option key="BA" value="BA">
                                    Bachelor of Arts (BA)
                                </option>
                            </Form.Select>
                        </Row>
                        <Form.Label column sm={3}>
                            Major:
                        </Form.Label>
                        <Row>
                            <Form.Control
                                placeholder="Type your major here"
                                value={major}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setMajor(event.target.value)}
                            />
                        </Row>
                        <Form.Label column sm={3}>
                            Concentration (optional):
                        </Form.Label>
                        <Row>
                            <Form.Control
                                placeholder="Type your concentration here"
                                value={concentration}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setConcentration(event.target.value)}
                            />
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveAll}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
