import React from 'react';
import {observer,inject} from 'mobx-react';
import {profileStore} from "../stores/ProfileStore";

export const Profile = inject('profileStore')(observer(class Profile extends React.Component {
    constructor(props)
    {
        super(props);

        this.changeUsername = this.changeUsername.bind(this);
        this.submitUsername = this.submitUsername.bind(this);
    }

    changeUsername(name) {
        this.props.profileStore.changeUsername(name);
    }

    submitUsername() {
        const submitChange = this.props.profileStore.submitUsername();
        submitChange.then((res) => {
            this.props.loadData();
        })
    }

    render()
    {
        const {profileStore} = this.props;
        let timeRegistered = new Date(this.props.profileStore.registered*1000);
        let playCount = this.props.profileStore.playCount;
        playCount = playCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        let modalClass = profileStore.showModal ? 'modal is-active' : 'modal';

        let modal = <div className={modalClass}>
            <div className={"modal-background extraModal"}>
            </div>
            <div className={"modal-content"}>
                <div className={"box"}>
                    <label htmlFor={"newUsername"}>Enter a new Username:</label>
                    <input onChange={(e) => this.changeUsername(e.target.value)} type={"text"} id={"newUsername"} aria-placeholder={"Username"}></input>
                    <button onClick={this.submitUsername}>Submit</button>
                    <br/>
                    <span><b><i>{profileStore.modalErrorMessage}</i></b></span>
                </div>
            </div>
            <button onClick={profileStore.toggleUsernameModal} className={"modal-close is-large"} aria-label={"close"}></button>
        </div>

        return(
            <div className={"box relative"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-two-fifths is-narrow"}>
                        <figure className={"image is-128x128"}>
                            <img alt={""} className={"image is-rounded"} src={this.props.profileStore.userAvatar}/>
                        </figure>
                    </div>
                    <div className={"card-stacked column is-three-fifths is-narrow"}>
                        <h3 className={"title"} style={{marginBottom: "0"}}>
                            {this.props.profileStore.userName}
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
                        <i className="fas fa-user-edit userIcon" onClick={profileStore.toggleUsernameModal}></i>
                    </div>
                </div>
                {modal}
            </div>
        )
    }
}));