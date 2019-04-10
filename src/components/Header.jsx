import React from "react";

export default function Header(props)
{
    return(
        <nav className={"navbar columns"} role={"navigation"} aria-label={"main navigation"}>
            <div className={"column is-3 bannerImage"}>
                <a href={""}>
                    <img src={process.env.PUBLIC_URL + '/LastFmReactTitle.png'}/>
                </a>
            </div>

            <div className={"column is-9 has-text-centered"}>
                <h1 className={"title"}>
                    Last FM Listening Habits
                </h1>
            </div>
        </nav>
    )
}