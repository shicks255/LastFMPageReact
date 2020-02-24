import React from 'react';

export default function MainMenu(props)
{
    const propStrategies = props.strategies;
    let strategies = Object.keys(propStrategies).map((value, index) => {
        return <option key={index}>{propStrategies[value]}</option>
    });
    const propTimeFrames = props.timeFrames;
    let timeFrames = Object.keys(propTimeFrames).map((value, index) => {
        return <option key={index}>{propTimeFrames[value]}</option>
    });

    return (
        <div className={"columns is-mobile"}>
            <div className="box column is-half is-offset-one-quarter">
                <table className={"menuTable"}>
                    <tbody>
                    <tr>
                        <td><label>Select</label></td>
                        <td>
                            <select defaultValue={props.strategy} onChange={(event) => props.onChange(event.target.value, 'strategy')}>
                                {strategies}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Time Frame:</label></td>
                        <td>
                            <select defaultValue={props.timeFrame} onChange={(event) => props.onChange(event.target.value, 'timeFrame')}>
                                {timeFrames}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}