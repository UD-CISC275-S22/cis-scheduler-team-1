import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import coursedata from "../data/coursedata.json";
import { CourseViewer } from "./CourseViewer";
import { Degreeplan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";

export function DisplayCourse({
    plan,
    editPlan,
    semester,
    editSemester,
    trackDegreeCredits
}: {
    plan: Degreeplan;
    editPlan: (id: number, newDegree: Degreeplan) => void;
    semester: Semester;
    editSemester: (id: number, newSemester: Semester) => void;
    trackDegreeCredits: (semesters: Semester[]) => number;
}): JSX.Element {
    const [course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    //const [courseList, setCourseList] = useState<Course[]>([]); // a comprehensive course list for the semester
    //const [creditCount, setCreditCount] = useState<number>(0); //credit count is originally zero and is then continually updated

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
    function updateID(event: React.ChangeEvent<HTMLSelectElement>) {
        setID(event.target.value.toUpperCase());
    }

    function trackSemCredits(courses: Course[]): number {
        const creditList = courses.map((course: Course): number =>
            parseInt(course.credits.substring(course.credits.length - 1))
        );

        const credits = creditList.reduce(
            (total: number, credit: number) => total + credit,
            0
        );
        return credits;
    }
    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourseCode = course + " " + id;
        // will only add course if valid -- work on displaying error message
        if (course in COURSES && newCourseCode in COURSES[course]) {
            const newCourse = {
                ...COURSES[newCourseCode.substring(0, 4)][newCourseCode]
            };
            if (!semester.courses.includes(newCourse)) {
                const updatedCourses = [...semester.courses, newCourse];
                //setCourseList(updatedCourses);
                //setCreditCount(trackSemCredits(updatedCourses));
                editSemester(semester.id, {
                    ...semester,
                    courses: updatedCourses,
                    credits: trackSemCredits(updatedCourses)
                });
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setCourse("");
    }

    function clearCourses() {
        editSemester(semester.id, {
            ...semester,
            courses: [],
            credits: 0
        });
    }

    /*
            setCourseList([]);
        setCreditCount(0);
        editSemester(semester.id, {
            ...semester,
            courses: []
        });
    */

    function removeCourse(courseRemove: Course) {
        const updatedList = semester.courses.filter(
            (current: Course): boolean => current.name !== courseRemove.name
        );
        //setCourseList(updatedList);
        //setCreditCount(trackCredits(updatedList));
        editSemester(semester.id, {
            ...semester,
            courses: updatedList,
            credits: trackSemCredits(updatedList)
        });
    }

    function resetCourse(courseReset: Course) {
        const reset =
            COURSES[courseReset.code.substring(0, 4)][courseReset.code];
        const updatedList = semester.courses.map(
            (course: Course): Course =>
                course.code === courseReset.code ? reset : course
        );
        //setCourseList(updatedList);
        //setCreditCount(trackSemCredits(updatedList));
        editSemester(semester.id, {
            ...semester,
            courses: updatedList,
            credits: trackSemCredits(updatedList)
        });
    }

    function editCourse(code: string, newCourse: Course) {
        const updatedList = semester.courses.map(
            (course: Course): Course =>
                course.code === code ? newCourse : course
        );
        //setCourseList(updatedList);
        //setCreditCount(trackSemCredits(updatedList));
        editSemester(semester.id, {
            ...semester,
            courses: updatedList,
            credits: trackSemCredits(updatedList)
        });
    }

    function addToPool(course: Course) {
        // this line crashes the code -- without it, will remove normally
        // will only perform the second function call, when one is commented out will perform the other
        const updatedCourses = semester.courses.filter(
            (current: Course): boolean => current !== course
        );
        const updatedCredits = trackSemCredits(updatedCourses);
        const newSem = {
            ...semester,
            courses: updatedCourses,
            credits: updatedCredits
        };
        const updatedSemesters = plan.semesters.map(
            (current: Semester): Semester =>
                current.id === semester.id ? newSem : current
        );
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            pool: [...plan.pool, course],
            totalCredits: trackDegreeCredits(updatedSemesters)
        });

        console.log("updated pool");
        console.log(plan.pool);
        console.log([...plan.pool, course]);
        console.log(course);
    }

    return (
        <div>
            <h5>Courses: </h5>
            <div>
                Total Credits: {semester.credits}
                <p>
                    NOTE: credit count assumes you are taking a class for the
                    maximum number of credits, you may edit this in the course
                </p>
            </div>
            {semester.courses.map((course: Course) => (
                <Container key={course.code}>
                    <CourseViewer
                        key={course.code}
                        course={course}
                        editCourse={editCourse}
                    ></CourseViewer>
                    <Button size="sm" onClick={() => removeCourse(course)}>
                        Remove
                    </Button>
                    <Button size="sm" onClick={() => resetCourse(course)}>
                        Reset
                    </Button>
                    <Button size="sm" onClick={() => addToPool(course)}>
                        Move to Course Pool
                    </Button>
                </Container>
            ))}
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
                        <Form.Select value={id} onChange={updateID}>
                            <option key="default" value="Course ID">
                                Select Course ID
                            </option>
                            {Object.keys(
                                course in COURSES ? COURSES[course] : {}
                            ).map((course: string) => (
                                <option
                                    key={course.substring(5)}
                                    value={course.substring(5)}
                                >
                                    {course.substring(5)}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Button onClick={addCourse}>Add Course</Button>
                <span> </span>
                <Button onClick={clearCourses}>Clear Courses</Button>
            </Container>
        </div>
    );
}
