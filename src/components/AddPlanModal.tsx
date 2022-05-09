import React, { useState } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import majorlinkdata from "../data/majorlinks.json";

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

    const degreeTypes = [
        "BS",
        "BA",
        "BSN",
        "BFA",
        "BM",
        "BSEd",
        "BBE",
        "BChE",
        "BCE",
        "BCpE",
        "BCEM",
        "BEE",
        "BENE",
        "BMSE",
        "BME",
        ""
    ];

    const [id, setId] = useState<number>(0);
    const [type, setType] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    //const [concentration, setConcentration] = useState<string>("");

    const MAJORS: Record<string, Record<string, string>> = majorlinkdata;

    function saveAll() {
        addPlan({
            id: id,
            major: major,
            title: major + " " + type,
            type: type,
            semesters: [],
            reqs: false,
            //concentration: concentration,
            totalCredits: 0
        });
        setId(id + 1); // increment id for next one ?
        handleClose();
    }

    function updateChoice(event: ChangeEvent) {
        setType(event.target.value);
    }

    function updateMajor(event: React.ChangeEvent<HTMLSelectElement>) {
        //setMajor(event.target.value);
        if (
            /^[a-zA-Z]+$/.test(event.target.value) ||
            event.target.value === ""
        ) {
            setMajor(event.target.value);
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
                                {degreeTypes.map((type: string) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Row>
                        <Form.Label column sm={3}>
                            Major:
                        </Form.Label>
                        <Row>
                            <Form.Select
                                placeholder="Select your major here"
                                value={major}
                                onChange={updateMajor}
                            >
                                {console.log(MAJORS[type])}
                                {Object.keys(MAJORS[type] || {}).map(
                                    (major: string) => (
                                        <option key={major} value={major}>
                                            {major}
                                        </option>
                                    )
                                )}
                            </Form.Select>
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
