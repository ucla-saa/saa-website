import React, { useEffect, useState } from 'react';

interface RecapProps
{
    date: String,
    summary: string,
    form: String,
}


function Recap (props: RecapProps)  {
    const {date, summary, form} = props;
    return (
        <div className="task">
            <h2>SAA Meeting: {date}</h2>
            <h4>{summary}</h4>
            <h4>Attendance Form: {form}</h4>
            <br></br>
        </div>
    )

}

export default Recap;