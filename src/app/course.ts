export interface Course {
    name:string;
    id: string;
    ects: number;
    semestr: number;
    form: string; // wykład, ćwiczenia, lab, projekt
    capacity: number;
    mark: any; //Map<string,number>;
    students:Array<string>;
    image: string;
    description: string;

   // constructor(init?:Partial<Course>);


}
