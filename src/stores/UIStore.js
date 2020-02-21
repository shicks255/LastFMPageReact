import {action, decorate, observable} from "mobx";


export class UIStore {
    modalImageSrc: string = '';
    modalImageCaption: string = '';
    loading: boolean = true;
    modalTimeout: null;

    doModal(url, caption) {
        let suffix = url.lastIndexOf("/");
        let imageId = url.substr(suffix+1);

        let prefix = url.substr(0,suffix);
        let t = prefix.lastIndexOf("/");
        prefix = prefix.substr(0,t);

        let newImageId = prefix + '/96s/' + imageId;
        this.modalTimeout = setTimeout(() => {
            this.modalImageCaption = caption;
            this.modalImageSrc = newImageId
        }, 500)
    }

    doModal2(url, caption) {
        this.modalTimeout = setTimeout(() => {
            this.modalImageCaption = caption;
            this.modalImageSrc = url;
        }, 500)
    }

    closeModal() {
        clearTimeout(this.modalTimeout);
        this.modalImageSrc = '';
        this.modalImageCaption = '';
    }
}

decorate(UIStore, {
    modalImageSrc: observable,
    modalImageCaption: observable,
    loading: observable,
    modalTimeout: observable,
    clearModal: action,
    doModal: action,
    doModal2: action,
    closeModal: action,
});

export const uiStore = new UIStore();