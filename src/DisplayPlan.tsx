import React from "react";
import { Container } from "react-bootstrap";
import { degreeplan } from "./interfaces/degreeplan";
//import { DisplayCourse } from "./DisplayCourse";
import { SemesterLayout } from "./semesterLayout";

export function DisplayPlan({
    plan
}: {
    plan: degreeplan;
    // deletePlan: (id: number) => void;
    // editPlan: (o: number, newPlan: degreeplan) => void;
}): JSX.Element {
    /*     const [degreePlan, setPlan] = useState<string>(""); // current added degree plan
    const [degreeList, setDegreeList] = useState<string[]>([]); // store inputted degree plan into an array of semesters

    function updatePlan(event: React.ChangeEvent<HTMLInputElement>) {
        setPlan(event.target.value);
    }
    // adds inputted semester to semester list, does not allow repeat semester names
    function addDegree() {
        if (!degreeList.includes(degreePlan) && degreePlan !== "") {
            setDegreeList([...degreeList, degreePlan]);
        }
        setPlan("");
    }
    function deleteDegree(degree: string) {
        const updatedList = [...degreeList];
        const index = updatedList.indexOf(degree);
        updatedList.splice(index, 1);
        setDegreeList(updatedList);
    } */
    return (
        <Container>
            <h3 key={plan.title}>{plan.title}</h3>
            {plan.concentration !== "" && (
                <h4>Concentration: {plan.concentration}</h4>
            )}
            <SemesterLayout></SemesterLayout>
            <hr></hr>
        </Container>
    );
}
