import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddPlanModal } from "./components/AddPlanModal";
import "./App.css";
import sampleplan from "./data/sampleplan.json";
import { Degreeplan } from "./interfaces/degreeplan";
import { PlanList } from "./components/PlanList";
import { WelcomeModal } from "./components/WelcomeModal";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

function App(): JSX.Element {
    const [showAddDegree, setShowAddDegree] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    // create handlers for opening and closing modal
    const handleCloseAddPlan = () => setShowAddDegree(false);
    const handleAddPlan = () => setShowAddDegree(true);
    const handleWelcomeModal = () => setShowWelcomeModal(false);

    const PLAN = sampleplan.map(
        (plan): Degreeplan => ({
            ...plan,
            semesters: plan.semesters.map(
                (semester): Semester => ({
                    ...semester,
                    courses: semester.courses.map(
                        (course): Course => ({ ...course })
                    )
                })
            ),
            reqs: false,
            totalCredits: 30
        })
    );

    const [plans, setPlans] = useState<Degreeplan[]>(PLAN);

    function addDegreePlan(newPlan: Degreeplan) {
        setPlans([...plans, newPlan]);
    }

    function deleteDegree(degree: string) {
        const updatedList = [...plans];
        const foundDegree = updatedList.find(
            (element: Degreeplan) => element.title === degree
        );
        if (foundDegree !== undefined) {
            const index = updatedList.indexOf(foundDegree);
            updatedList.splice(index, 1);
        }
        setPlans(updatedList);
    }

    //updates the list of degrees not the specific degree
    function editDegree(id: number, newDegree: Degreeplan) {
        setPlans(
            plans.map(
                (degree: Degreeplan): Degreeplan =>
                    degree.id === id ? newDegree : degree
            )
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                University of Delaware Undergraduate Course Scheduler
            </header>
            <WelcomeModal
                show={showWelcomeModal}
                handleClose={handleWelcomeModal}
            ></WelcomeModal>
            <div>
                <PlanList
                    plans={plans}
                    deleteDegree={deleteDegree}
                    editDegree={editDegree}
                ></PlanList>
                <Button onClick={handleAddPlan}>Create New Degree Plan</Button>
                <AddPlanModal
                    show={showAddDegree}
                    handleClose={handleCloseAddPlan}
                    addPlan={addDegreePlan}
                ></AddPlanModal>
            </div>
            <footer>Developed by Disha Thakar and Jenn Werth</footer>
        </div>
    );
}

export default App;
