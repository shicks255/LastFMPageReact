import React from 'react';
import ProfileStore, {profileStore} from "../stores/ProfileStore";
import {observer} from 'mobx-react';

export const Profile = observer(class Profile extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const store = profileStore;
        let timeRegistered = new Date(this.props.registered*1000);
        let playCount = this.props.playCount
        playCount = playCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        let modalClass = store.showModal ? 'modal is-active' : 'modal';

        let modal = <div className={modalClass}>
            <div className={"modal-background extraModal"}>
            </div>
            <div className={"modal-content"}>
                <div className={"box"}>
                    <label htmlFor={"newUsername"}>Enter a new Username:</label>
                    <input onChange={(e) => store.changeUsername(e.target.value)} type={"text"} id={"newUsername"} aria-placeholder={"Username"}></input>
                    <button onClick={store.submitUsername}>Submit</button>
                    <br/>
                    <span><b><i>{store.modalErrorMessage}</i></b></span>
                </div>
            </div>
            <button onClick={store.toggleUsernameModal} className={"modal-close is-large"} aria-label={"close"}></button>
        </div>

        return(
            <div className={"box relative"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-two-fifths is-narrow"}>
                        <figure className={"image is-128x128"}>
                            <img alt={""} className={"image is-rounded"} src={this.props.userAvatar}/>
                        </figure>
                    </div>
                    <div className={"card-stacked column is-three-fifths is-narrow"}>
                        <h3 className={"title"} style={{marginBottom: "0"}}>
                            {this.props.userName}
                        </h3>
                        <br/>
                        <b>Registered:</b> {timeRegistered.toLocaleString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                        <br/>
                        <b>Play Count:</b> {playCount}
                        <i className="fas fa-user-edit userIcon" onClick={store.toggleUsernameModal}></i>
                    </div>
                </div>
                {modal}
            </div>
        )
    }
});