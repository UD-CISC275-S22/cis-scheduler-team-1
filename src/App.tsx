import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddPlanModal } from "./AddPlanModal";
import "./App.css";
import { DisplayPlan } from "./DisplayPlan";
//import { course as Course } from "./interfaces/course";
import { degreeplan } from "./interfaces/degreeplan";
//import CourseList from "./coursedata.json"
//import { SemesterLayout } from "./semesterLayout";

function App(): JSX.Element {
    const [plans, setPlans] = useState<degreeplan[]>([]);
    const [showAddDegree, setShowAddDegree] = useState(false);
    // const [courses, setCourses] = useState<Course[]>(CourseList);

    // create handlers for opening and closing modal
    const handleCloseAddPlan = () => setShowAddDegree(false);
    const handleAddPlan = () => setShowAddDegree(true);

    function addDegreePlan(newPlan: degreeplan) {
        setPlans([...plans, newPlan]);
    }
    function deleteDegree(degree: string) {
        const updatedList = [...plans];
        const foundDegree = updatedList.find(
            (element: degreeplan) => element.title === degree
        );
        if (foundDegree !== undefined) {
            const index = updatedList.indexOf(foundDegree);
            updatedList.splice(index, 1);
        }
        setPlans(updatedList);
    }

    /* function editCourse(code: string, newCourse: Course){
        setCourses(courses.map(course: Course): Course => (course.code === code ? newCourse: course));
    } */

    return (
        <div className="App">
            <header className="App-header">
                Welcome to the University of Delaware Course Scheduler!
            </header>
            <p>
                Click through course, semester, and degree options to plan your
                next four years!
            </p>
            Team 1: Jenn Werth and Disha Thakar
            <div>
                <div>
                    {plans.map((plan: degreeplan) => (
                        <div key={plan.id} className="bg-light border m-2 p-2">
                            <DisplayPlan plan={plan}></DisplayPlan>
                            <Button onClick={() => deleteDegree(plan.title)}>
                                Delete Degree Plan
                            </Button>
                        </div>
                    ))}
                </div>
                <Button onClick={handleAddPlan}>Create New Degree Plan</Button>
                <AddPlanModal
                    show={showAddDegree}
                    handleClose={handleCloseAddPlan}
                    addPlan={addDegreePlan}
                ></AddPlanModal>
            </div>
        </div>
    );
}

export default App;
