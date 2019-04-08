import React from 'react';

export default function NowPlaying(props) {

    let nowPlaying
    if (props.nowPlaying)
        nowPlaying =
            <div>
                <div className={"level"} style={{marginBottom: "0"}}>
                    <div className={"level-item"}>
                        Now Playing...
                        <img alt={""} className={"gif"} src={process.env.PUBLIC_URL + "/YdBO.gif"}/>
                    </div>
                </div>
                <div className={"level"}>
                    <div className={"level-item"} >
                        <img alt={""} className={"image"} src={props.nowPlaying.image[0]['#text']}/> {props.nowPlaying.artist['#text']} - {props.nowPlaying.name}
                    </div>
                </div>
                <br/>
            </div>
    return(
        <span>
            {nowPlaying}
            </span>
    )
}