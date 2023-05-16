import React from 'react'
import './UserDetails.css'

export const UserDetails = ({_id, name, lastname, dni, email, phone, role, createdAt, updatedAt}) => {

    return (
        <div>
            <div>{_id}</div>
            <div>{name}</div>
            <div>{lastname}</div>
            <div>{dni}</div>
            <div>{email}</div>
            <div>{phone}</div>
            <div>{role}</div>
            <div>{createdAt}</div>
            <div>{updatedAt}</div>
        </div>
    )
}