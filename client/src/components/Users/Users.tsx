import React from "react";
import Header from "../Header/Header";
import Table from "../Table/Table";

export type StatusType = 'active' | 'expired' | 'banned';

export interface IUser {
    fullName: string;
    Email: string;
    status: StatusType;
    _id?: string;
}

interface UsersProps {
   
}
 
interface UsersState {
    users: Array<IUser>;
}
 
class Users extends React.Component<UsersProps, UsersState> {
    
    c

    render() { 
        return (
            <div className="bg-dark bg-opacity-10 border px-2"> 
                <Header />
                <Table users={[]} />
            </div>
        );
    }
}
 
export default Users;