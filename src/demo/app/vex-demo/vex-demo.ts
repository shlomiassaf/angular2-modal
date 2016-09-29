import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

import { overlayConfigFactory } from "../../../components/angular2-modal";
import {
  VEXBuiltInThemes,
  Modal,
  DialogPreset,
  DialogFormModal,
  DialogPresetBuilder,
  VEXModalContext,
  VexModalModule,
  providers
} from '../../../components/angular2-modal/plugins/vex';

import { DemoHead, ModalCommandDescriptor } from '../demo-head/index';
import * as presets from './presets';
import { LoginDialog } from './login-dialog';

@Component({
  selector: 'vex-demo',
  styleUrls: [
    './css/vex.css',
    './css/vex-theme-default.css',
    './css/vex-theme-os.css',
    './css/vex-theme-plain.css',
    './css/vex-theme-wireframe.css',
    './css/vex-theme-flat-attack.css',
    './css/vex-theme-top.css',
    './css/vex-theme-bottom-right-corner.css'
  ],
  templateUrl: './vex-demo.tpl.html',
  // We override providers set by the Module since this app is using multiple module plugins
  // (js-native, vex, bootstrap) which messes up the provider tree (last plugin wins)
  // usually an app will use one plugin and this line is not needed.
  providers: providers,
  encapsulation: ViewEncapsulation.None
})
export class VexDemo {
  modalCommands: ModalCommandDescriptor[];
  theme: VEXBuiltInThemes = <VEXBuiltInThemes>'default';
  @ViewChild(DemoHead) public demoHead: DemoHead;
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;

  constructor(public modal: Modal) {

    this.modalCommands = [
      {
        text: 'alert drop in',
        factory: () => presets.alert.call(this, this.modal).open()
      },
      {
        text: 'prompt drop in',
        factory: () => presets.prompt.call(this, this.modal).open()
      },
      {
        text: 'confirm drop in',
        factory: () => presets.confirm.call(this, this.modal).open()
      },
      {
        text: 'Cascading example',
        factory: () => presets.cascading.call(this, this.modal).open()
      },
      {
        text: 'In Element example',
        factory: () => presets.alert.call(this, this.modal).inElement(true).open('demo-head')
      },
      {
        text: 'String content',
        factory: () => this.modal
          .open('Hello modal!', overlayConfigFactory({ isBlocking: false }, VEXModalContext))
      },
      {
        text: 'TemplateRef content',
        factory: () => this.modal
          .open(this.templateRef, overlayConfigFactory({ isBlocking: false }, VEXModalContext))
      },
      {
        text: 'Custom Modal example',
        factory: () => {
          return new DialogPresetBuilder<DialogPreset>(this.modal)
            .className(this.theme)
            .content(LoginDialog)
            .message('Ary you coming to the event?')
            .addOkButton('Yep!')
            .addButton(
              'vex-dialog-button-primary vex-dialog-button',
              'Maybe?',
              (cmp: DialogFormModal, $event: MouseEvent) => cmp.dialog.close('Maybe')
            )
            .addCancelButton('Nope!')
            .open();
        }
      },
      {
        text: 'no buttons',
        factory: () => presets.noButtons.call(this, this.modal).open()
      },
      {
        text: 'custom buttons',
        factory: () => presets.customButtons.call(this, this.modal).open()
      }
    ];
  }
}
