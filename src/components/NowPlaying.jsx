import React from 'react';


export default function NowPlaying(props) {

    let nowPlaying;
    if (props.nowPlaying)
        nowPlaying =
            <div className={"nowPlaying"}>
                <br/>
                <div className={"level"}>
                    <div className={"level-item"} >
                        <table>
                            <tbody>
                            <tr>
                                <td rowSpan={2}>
                                    <img alt={""} className={"image"} src={props.nowPlaying.image[1]['#text']}/>
                                </td>
                                <td>&nbsp;</td>
                                <td style={{textAlign: "center"}}>
                                    <span className={"nowPlaying"}>
                                        {props.nowPlaying.artist['#text']} - {props.nowPlaying.name}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <img alt={""} className={"gif"} src={process.env.PUBLIC_URL + "/YdBO.gif"}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    return(
        <span>
            {nowPlaying}
            </span>
    );
}
