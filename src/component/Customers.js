import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import MUIDataTable from 'mui-datatables';
import { useNavigate } from "react-router-dom";
import classes from '../styles/customers.module.css'

function Customers() {

    const nav = useNavigate();
    const { token } = useToken();
    const [customers, setCustomers] = useState();
    const [isLoading, setLoading] = useState(true);

    const columns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                display: false,
                filter: false
            }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false
            }
        },
        {
            name: 'address',
            label: 'Address',
            options: {
                filter: false
            }
        }
    ];

    useEffect(() => {
        axios
            .get('http://localhost:8000/customers/customer_list', { headers: {'Authorization' : `Bearer ${token}`} })
            .then((response) => {
                setCustomers(response.data)
                setLoading(false)
            });
    }, []);

    const options = {
        filter: false,
        selectableRows: 'none',
        onRowClick: (rowData, rowState) => {
            console.log(rowData)
        }
    };

    
    if(isLoading) {
        return <div>Loading...</div>
    };
    

    return (
        <div className={classes.mainContainer}>
            <MUIDataTable 
                title={'Customer List'}
                data={customers}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default Customers;