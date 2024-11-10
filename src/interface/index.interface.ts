
export interface IUser{
    username: string;
    email: string;
    age: number;
    country: string;
    password: string;
    assistant_name: string;
    assistant_id: number;
}

export interface DecodedToken{
    user_id: number;
    username: string;
}

export interface IModule{
    name: string;
    image: string;
    content: string;
    point: number;
    path_id:number;
}