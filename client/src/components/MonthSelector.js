import React from 'react'

export const MonthSelector = ({ onSelectMonth, selected, months }) => {

    const handleMonthChanged = (e) => {
        const selected = e.target.value
        onSelectMonth(selected)
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <span>Select Month</span>
            <select value={selected} onChange={handleMonthChanged}>
                {months.map((month, index) => (
                    <option value={index} key={index}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    )
}