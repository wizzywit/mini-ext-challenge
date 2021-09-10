import React, {useState} from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {fetchAsync, selectResponse, selectStatus} from "./airtableSlice";
import {login, logout, selectAuth} from "../auth/authSlice";

const Airtable = () => {
    const status = useAppSelector(selectStatus);
    const response = useAppSelector(selectResponse);
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('');

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = target
        setName(value.trim())
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
        if(name === '') return
        dispatch(login())
        dispatch(fetchAsync(name))
        setName('')
    }

    if(status === 'loading') return (
        <div>
            <p>Loading...</p>
        </div>
    )

    if(auth) {
        return (
            <>
                <button className="logout-button" onClick={() => dispatch(logout())}>Logout</button>
                <div className='card-group'>
                    {response.length === 0? (
                        <p>No records found</p>
                    ) : response.map((res, i) => (
                            <div className="card" key={i}>
                                <h6>Name</h6>
                                <p>{res.class}</p>
                                <h6>Students</h6>
                                <p>{res.students.join(', ')}</p>
                            </div>
                        ))}

                </div>
            </>
        )
    }



    return (
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name" >Student Name: </label>
                    <input id="name" type="text" name="name" value={name} onChange={handleChange}/>
                </div>
                <button type="submit">Login</button>
            </form>
    )
}

export default Airtable