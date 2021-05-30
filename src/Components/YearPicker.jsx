import React from "react";

const YearPicker = ({years = [], year, setYear}) => {
    const value = years.indexOf(year);
    const max = years.length - 1

    return (
        <div>
            <div style={{display: 'inline-flex'}}>
                <button type="button" disabled={value === 0} onClick={() => setYear(years[value - 1])}>-</button>
                <input
                    type="range"
                    min="0"
                    max={max}
                    value={value}
                    onChange={(event) => setYear(years[event.target.value])}
                />
                <button type="button" disabled={value === max} onClick={() => setYear(years[value + 1])}>+</button>
            </div>
            <div>Year: {year}</div>
        </div>
    );
}

export default YearPicker;