import { AuthService } from './auth.service';

export class User {
    uid:string;
    email:string;
    roles: { 
        admin: boolean;
        reader: boolean 
    };
    
    constructor(authService:AuthService){
        this.email=authService.getEmail();
    }
}

export class Roles{
    admin:Array<string>;
    student:Array<string>;
}
