import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import coursedata from "../data/coursedata.json";
<<<<<<< HEAD
import { CourseViewer } from "./CourseViewer";
=======
import { CourseEditor } from "./CourseEditor";
>>>>>>> a040ba953ccc253f6e335f8dfcdb5caf799d16cf
//import { useDrag } from "react-dnd";

export function DisplayCourse(): JSX.Element {
    const [course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<Course[]>([]); // a comprehensive course list for the semester

<<<<<<< HEAD
    //const [editing, setEditing] = useState<boolean>(false);
    const [creditCount, setCreditCount] = useState<number>(0); //credit count is originally zero and is then continually updated
=======
    //const [creditCount, setCreditCount] = useState<number>(0); //credit count is originally zero and is then continually updated

    const [editing, setEditing] = useState<boolean>(false);
>>>>>>> a040ba953ccc253f6e335f8dfcdb5caf799d16cf

    const COURSES: Record<string, Record<string, Course>> = coursedata;
    // creates a dictionary (record) or dictionaries of courses using json data

    // updates the course that is being typed in
    function updateCourse(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            /^[a-zA-Z]+$/.test(event.target.value) ||
            event.target.value === ""
        ) {
            setCourse(event.target.value.toUpperCase().substring(0, 4));
        }
        // if statement ensures that only letters are accepted, not numbers
        // use substring 0:4 so that will only accet valid course titles
        // example: HIST not HISTORY or HIST106
    }

    // updates the id from text box
    function updateID(event: React.ChangeEvent<HTMLInputElement>) {
        setID(event.target.value.toUpperCase());
    }

<<<<<<< HEAD
    function trackCredits(courses: Course[]): number {
        const creditList = courses.map((course: Course): number =>
            parseInt(course.credits.substring(course.credits.length - 1))
        );

        const credits = creditList.reduce(
            (total: number, credit: number) => total + credit,
            0
        );
        return credits;
    }
=======
    /*
    function trackCredits(addedCourse: Course) {
        if (parseInt(addedCourse.credits) === NaN) {
            setCreditCount(creditCount + 3);
        } else {
            setCreditCount(creditCount + parseInt(addedCourse.credits));
        }
    }
    */

    /*Add to Line 135*/ /*<p>{trackCredits(course)}</p>;*/
>>>>>>> a040ba953ccc253f6e335f8dfcdb5caf799d16cf

    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourseCode = course + " " + id;
        // will only add course if valid -- work on displaying error message
        if (course in COURSES && newCourseCode in COURSES[course]) {
            const newCourse = {
                ...COURSES[newCourseCode.substring(0, 4)][newCourseCode]
            };
            if (!courseList.includes(newCourse)) {
                setCourseList([...courseList, newCourse]);
                const updatedCourses = [...courseList, newCourse];
                setCreditCount(trackCredits(updatedCourses));
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setCourse("");
    }

    function clearCourses() {
        setCourseList([]);
        setCreditCount(0);
    }

    function removeCourse(courseRemove: Course) {
        const updatedList = [...courseList];
        const index = updatedList.indexOf(courseRemove);
        updatedList.splice(index, 1);
        setCourseList(updatedList);
        setCreditCount(
            creditCount -
                parseInt(
                    courseRemove.credits.substring(
                        courseRemove.credits.length - 1
                    )
                )
        );
        setCreditCount(trackCredits(updatedList));
    }

    function resetCourse(courseReset: Course) {
        const reset =
            COURSES[courseReset.code.substring(0, 4)][courseReset.code];
        const updatedList = courseList.map(
            (course: Course): Course =>
                course.code === courseReset.code ? reset : course
        );
        setCourseList(updatedList);
        setCreditCount(trackCredits(updatedList));
    }

    function editCourse(code: string, newCourse: Course) {
        const updatedList = courseList.map(
            (course: Course): Course =>
                course.code === code ? newCourse : course
        );
        setCourseList(updatedList);
        setCreditCount(trackCredits(updatedList));
    }

    return (
        <div>
            <h5>Courses: </h5>
<<<<<<< HEAD
            <div>
                Total Credits: {creditCount}
                <p>
                    NOTE: credit count assumes you are taking a class for the
                    maximum number of credits, you may edit this in the course
                </p>
            </div>
            {courseList.map((course: Course) => (
                <Container key={course.code}>
                    <CourseViewer
                        key={course.code}
                        course={course}
                        editCourse={editCourse}
                    ></CourseViewer>
                    <Button onClick={() => removeCourse(course)}>
                        Remove Course
                    </Button>
                    <Button onClick={() => resetCourse(course)}>
                        Reset Course
                    </Button>
                </Container>
            ))}
=======
            <div>Total Credits: {/*creditCount*/} </div>
            {courseList.map((course: Course) =>
                editing ? (
                    <CourseEditor
                        changeEditing={changeEditing}
                        course={course}
                        editCourse={editCourse}
                    ></CourseEditor>
                ) : (
                    <Container
                        key={course.code}
                        style={{ border: "1px solid white", padding: "6px" }}
                    >
                        <div
                            style={{
                                border: "1px solid black",
                                padding: "6px"
                            }}
                        >
                            <h6>
                                {course.code}: {course.name}
                            </h6>
                            <p>
                                {course.descr}
                                <div>
                                    {" "}
                                    <p>
                                        This class is worth {course.credits}{" "}
                                        credits
                                    </p>
                                </div>
                            </p>

                            <Button onClick={changeEditing}>Edit Course</Button>
                            <Button onClick={() => removeCourse(course)}>
                                Remove Course
                            </Button>
                            <Button onClick={() => resetCourse(course)}>
                                Reset
                            </Button>
                        </div>
                    </Container>
                )
            )}
>>>>>>> a040ba953ccc253f6e335f8dfcdb5caf799d16cf
            <div></div>
            <Container>
                <Row>
                    <Col>
                        <Form.Control
                            type="string"
                            value={course}
                            onChange={updateCourse}
                            placeholder="Type Department ID Here"
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            value={id}
                            onChange={updateID}
                            placeholder="Type Course Number Here"
                        ></Form.Control>
                    </Col>
                </Row>
                <Button onClick={addCourse}>Add Course</Button>
                <span> </span>
                <Button onClick={clearCourses}>Clear Courses</Button>
            </Container>
        </div>
    );
}
