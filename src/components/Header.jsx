import React from "react";

export default function Header(props)
{
    return(

        <nav className={"navbar columns"} role={"navigation"} aria-label={"main navigation"}>
                <div className={"column is-3"}>
                    <a href={""}>
                        <img src={process.env.PUBLIC_URL + '/LastFmReactTitle.png'}/>
                    </a>
                </div>

                <div className={"column is-9"}>
                    Last FM Listening Habits
                </div>
        </nav>
    )
}