import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddPlanModal } from "./components/AddPlanModal";
import "./App.css";
import { DisplayPlan } from "./components/DisplayPlan";
import { Degreeplan } from "./interfaces/degreeplan";

function App(): JSX.Element {
    const [plans, setPlans] = useState<Degreeplan[]>([]);
    const [showAddDegree, setShowAddDegree] = useState(false);

    // create handlers for opening and closing modal
    const handleCloseAddPlan = () => setShowAddDegree(false);
    const handleAddPlan = () => setShowAddDegree(true);

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

    return (
        <div className="App">
            <header className="App-header">
                Welcome to the University of Delaware Course Scheduler!
            </header>
            <p>
                Click through course, semester, and degree options to plan your
                next four years!
            </p>
            <div>
                <div>
                    {plans.map((plan: Degreeplan) => (
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
