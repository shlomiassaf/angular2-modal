import {Component, provide, ElementRef, Injector} from 'angular2/core';
import {NgIf} from 'angular2/common';


import {ICustomModal, ICustomModalComponent} from '../models/ICustomModal';
import {ModalDialogInstance} from '../models/ModalDialogInstance';

/**
 * @deprecated
 */
export class YesNoModalContent {
    constructor(
        public title: string = 'Hello World Title',
        public body: string = 'Hello World Body!',
        public hideNo: boolean = false,
        public yesClass: string = 'btn-primary',
        public yesText: string = 'YES',
        public noClass: string = 'btn-warning',
        public noText: string = 'NO'
    ) {}
}

/**
 * @deprecated
 */
@Component({
    selector: 'modal-content',
    directives: [ NgIf ],
    /* tslint:disable */ template:
    `<div class="modal-header">
        <h3 class="modal-title" [innerHtml]="context.title"></h3>
        </div>
        <div class="modal-body" [innerHtml]="context.body"></div>
        <div class="modal-footer">
            <button class="btn" [ngClass]="[context.yesClass]" (click)="ok($event)">{{context.yesText}}</button>
            <button *ngIf="!context.hideNo" class="btn" [ngClass]="[context.noClass]" (click)="cancel()">{{context.noText}}</button>
        </div>`
})
export class YesNoModal implements ICustomModalComponent {
    dialog: ModalDialogInstance;
    context: YesNoModalContent;

    constructor(dialog: ModalDialogInstance, modelContentData: ICustomModal) {
        this.dialog = dialog;
        this.context = <YesNoModalContent>modelContentData;
        console.warn('DEPRECATED: YesNoModal will not be available in next version of ' +
            'angular2-modal, please move to the preset API.')

    }

    ok($event: any) {
        $event.stopPropagation();
        this.dialog.close(true);
    }

    cancel() {
        this.dialog.dismiss();
    }
}
