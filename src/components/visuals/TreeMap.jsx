import React from 'react';
import {ResponsiveTreeMap} from "@nivo/treemap";

export default function TreeMap(props) {

    const {data, name, keyy, value} = props;

    const dataPoints = data.map(item => {
        return {
            "name": item[keyy],
            "value": item[value]
        }
    })

    const treeData = {
        "name": name,
        "color": "hsl(201, 70%, 50%)",
        "children": dataPoints
    }

    function trimName(artistName) {
        if (artistName.length > 10)
            return artistName.slice(0, 10);
        return artistName;
    }

    return (
        <div className='column is-full has-text-centered'>
            <div style={{height: "350px",fontWeight: "bold"}}>
                <span style={{color: '#eee'}}>
                    {name} Heat Map
                </span>
                <ResponsiveTreeMap
                    data={treeData}
                    identity="name"
                    value="value"
                    colors={{
                        "scheme": "accent"
                    }}
                    nodeOpacity={0.75}
                    label={node => trimName(node.id)}
                    margin={{top: 10, right: 10, bottom: 10, left: 10}}
                    labelSkipSize={45}
                    labelTextColor={{from: 'color', modifiers: [['darker', 3]]}}
                    parentLabelTextColor={{from: 'color', modifiers: [['darker', 3]]}}
                    borderColor={{from: 'color', modifiers: [['darker', 0.1]]}}
                />
            </div>
        </div>
    )

}