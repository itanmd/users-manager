import React from "react";
import Header from "../Header/Header";
import Message from "../Message/Message";
import Table from "../Table/Table";

export type StatusType = 'active' | 'expired' | 'banned';

export interface IUser {
    fullName: string;
    email: string;
    status: StatusType;
    _id?: string;
}

interface UsersProps {
   
}
 
interface UsersState {
    users: Array<IUser>;
    addSuccess: boolean;
    deleteSuccess: boolean;
}
 
class Users extends React.Component<UsersProps, UsersState> {
    
    constructor(props: {}) {
        super(props);

        this.state = {
            users: [],
            addSuccess: false,
            deleteSuccess: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then(res =>res.json())
        .then(json => {
            this.setState(() => ({
                users: json
            }))
        })
    }

    addUser = (user: IUser) => {
        fetch('http://localhost:3000/users', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res =>res.json())
        .then(json => {
            this.setState(() => ({
                users: [...this.state.users, json],
                addSuccess: true
            }))

            setTimeout(() => {
                this.setState(() => ({
                    addSuccess: false
                }))
            }, 4000)
        })
    }

    deleteUser = (id: string) => {
        fetch('http://localhost:3000/users', {
            method: 'delete',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({_id: id})
        })
        .then(res =>res.json())
        .then(json => {
            const updated = this.state.users.filter(user => user._id !== json._id)
            this.setState(() => ({
                users: updated,
                deleteSuccess: true
            }))

            setTimeout(() => {
                this.setState(() => ({
                    deleteSuccess: false
                }))
            }, 4000)
        })
    }

    render() { 
        return (
            <div className="bg-dark bg-opacity-10 border px-2"> 
                <Header addUser={this.addUser} />
                {
                    (this.state.users.length === 0) &&
                    <Message type="warning" children="No users to display"/>
                }
                {
                    (this.state.addSuccess) &&
                    <Message type="success" children="New user has been successfully added" />
                }
                {
                    (this.state.deleteSuccess) && 
                    <Message type="danger" children="User has been successfully removed from your list"/>
                }
                <Table users={this.state.users} deleteUser={this.deleteUser} />
            </div>
        );
    }
}
 
export default Users;