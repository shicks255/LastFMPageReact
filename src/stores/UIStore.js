import {action, decorate, observable} from "mobx";


export class UIStore {
    modalImageSrc: string = '';
    modalImageCaption: string = '';
    loading: boolean = true;
    modalTimeout: number = null;

    clearModal() {
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
});

export const uiStore = new UIStore();