import React from 'react';

export default function NowPlaying(props) {

    let nowPlaying
    if (props.nowPlaying)
        nowPlaying =
            <div className={"nowPlaying"}>
                <br/>
                <div className={"level"}>
                    <div className={"level-item"} >
                        <table>
                            <tr style={{backgroundColor: "#4E4E50"}}>
                                <td rowSpan={2} style={{backgroundColor: "#4E4E50"}}>
                                    <img alt={""} className={"image"} src={props.nowPlaying.image[1]['#text']}/>
                                </td>
                                <td style={{backgroundColor: "#4E4E50"}}>&nbsp;</td>
                                <td style={{backgroundColor: "#4E4E50"}}>
                                    <span className={"nowPlaying"}>
                                        {props.nowPlaying.artist['#text']} - {props.nowPlaying.name}
                                    </span>
                                </td>
                            </tr>
                            <tr style={{backgroundColor: "#4E4E50"}}>
                                <td style={{backgroundColor: "#4E4E50"}}>&nbsp;</td>
                                <td style={{backgroundColor: "#4E4E50"}}>
                                    <img alt={""} className={"gif"} src={process.env.PUBLIC_URL + "/YdBO.gif"}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
    return(
        <span>
            {nowPlaying}
            </span>
    )
}