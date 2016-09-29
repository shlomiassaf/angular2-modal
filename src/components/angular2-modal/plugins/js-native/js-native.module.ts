import { NgModule } from '@angular/core';

import { Modal as BaseModal } from '../../../angular2-modal';

import { Modal } from './modal';

export const providers: any[] = [
  { provide: BaseModal, useClass: Modal },
  { provide: Modal, useClass: Modal }
];

@NgModule({
  providers: [
    { provide: BaseModal, useClass: Modal },
    { provide: Modal, useClass: Modal }
  ]
})
export class JSNativeModalModule {

  // static getProviders(): any[] {
  //   return getProviders();
  // }

}
