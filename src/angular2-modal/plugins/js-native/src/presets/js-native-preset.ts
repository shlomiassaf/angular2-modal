import { ViewContainerRef, ResolvedReflectiveProvider } from '@angular/core';
import { DialogRef, DROP_IN_TYPE, OverlayConfig } from 'angular2-modal';
import { Modal } from '../modal';

import {
  JSNativeModalContext,
  JSNativeModalContextBuilder
} from '../modal-context';
import { JSNativeModalRenderer } from '../js-native-modal-renderer';

export class JSNativePresetBuilder extends JSNativeModalContextBuilder<JSNativeModalContext> {

  constructor(modal: Modal, dialogType: DROP_IN_TYPE) {
    super(<any>{modal, dialogType});
  }

  /**
   * Hook to alter config and return bindings.
   * @param config
   */
  protected $$beforeOpen(config: JSNativeModalContext): ResolvedReflectiveProvider[] {
    return [];
  }

  /**
   * Open a modal window based on the configuration of this config instance.
   * @param viewContainer If set opens the modal inside the supplied viewContainer
   * @returns Promise<DialogRef>
   */
  open(viewContainer?: ViewContainerRef): Promise<DialogRef<JSNativeModalContext>> {
    let context: JSNativeModalContext = this.toJSON();

    if (!(context.modal instanceof Modal)) {
      return <any>Promise.reject(new Error('Configuration Error: modal service not set.'));
    }

    let overlayConfig: OverlayConfig = {
      context: context,
      renderer: new JSNativeModalRenderer(),
      viewContainer: viewContainer,
      bindings: typeof this.$$beforeOpen === 'function' && this.$$beforeOpen(context)
    };

    return context.modal.open(context.component, overlayConfig);
  }
}

