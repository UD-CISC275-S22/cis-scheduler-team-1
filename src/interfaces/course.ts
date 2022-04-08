export interface course {
    id: number; //unique identifier
    code: string; //course code
    title: string; //course title
    credit: number; //number of credits
    description: string; //course description
    //if course is offered during a particular semester???
    //reqs boolean --> if you can take a course or not
}
