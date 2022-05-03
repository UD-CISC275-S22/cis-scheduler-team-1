import React from "react";
import { Modal } from "react-bootstrap";

export function WelcomeModal({
    show,
    handleClose
}: {
    show: boolean;
    handleClose: () => void;
}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Welcome to the UDEL Course Planner!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <header>
                        Plan out your time at Delaware using this tool! Click
                        Create New Degree Plan to start and then add semesters.
                        Then finally, add your choice of courses to see how your
                        career at UD could pan out! Happy planning :)
                    </header>
                </Modal.Body>
                <Modal.Footer>
                    <img
                        src="https://media.giphy.com/media/su8eWo17Mn4HdoPGOo/giphy.gif"
                        width="500"
                    ></img>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
