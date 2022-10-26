import React from "react";
import { StatusType } from "../Users/Users";

interface HeaderProps {
    addUser: Function; 
}
 
interface HeaderState {
    fullName: string;
    email: string;
    status: string;
}
 
class Header extends React.Component<HeaderProps, HeaderState> {
    
    constructor(props: HeaderProps) {
        super(props);

    this.state = {
        fullName: '',
        email: '',
        status: 'active'}
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ,fieldName: string) => {
        this.setState({
            ...this.state,
            [fieldName]: event.target.value
        })
    }

    handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>, fieldName: string) => {
        this.setState({
            ...this.state,
            [fieldName]: event.target.value
        })
    }

    addUser = () => {
        this.props.addUser ({
            fullName: this.state.fullName,
            email: this.state.email,
            status: this.state.status
        })
        this.setState(() => ({
            fullName: '',
            email: ''
        }))
    }

    

    render() { 
        return ( 
            <div className="d-flex align-items-center p-3 my-4 bg-light">
                <h5 className="me-auto mb-0">Users</h5>
                <div className="d-flex">
                    <input value={this.state.fullName}
                    onChange={(e) => this.handleInputChange(e, 'fullName')}
                    type="text" placeholder="Full Name" className="form-control" />
                    
                    <input value={this.state.email}
                    onChange={(e) => this.handleInputChange(e, 'email')}
                    type="text" placeholder="Email" className="form-control mx-3" />

                    
                    <select onChange={(e) => this.handleStatusSelect(e, 'status')}
                        value={this.state.status} className="form-select text-capitalize">
                        <option value='expired'>expired</option>
                        <option value='banned'>banned</option>
                        <option value='active'>active</option>
                    </select>

                    <button onClick={this.addUser} className="btn btn-info text-white">Add</button>
                </div>
            </div>
         );
    }
}
 
export default Header;