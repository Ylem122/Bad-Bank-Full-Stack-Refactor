import React, { useEffect } from 'react';

const AllData = () => {
    const [data, setData] = React.useState('');    

    useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {data}
    </>);
}

export default AllData;