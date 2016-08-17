import {
  ModalOpenContext,
  ModalOpenContextBuilder,
  FluentAssignMethod,
  extend,
  arrayUnion
} from '../../../angular2-modal';

const DEFAULT_VALUES = {
  dialogClass: 'modal-dialog',
  showClose: false
};

const DEFAULT_SETTERS = [
  'dialogClass',
  'size',
  'showClose'
];


export type BootstrapModalSize = 'sm' | 'lg';

export class BSModalContext extends ModalOpenContext {
  /**
   * A Class for the modal dialog container.
   * Default: modal-dialog
   */
  dialogClass: string;

  /**
   * Size of the modal.
   * 'lg' or 'sm' only.
   * NOTE: No validation.
   * Default to ''
   */
  size: BootstrapModalSize;

  /**
   * When true, show a close button on the top right corner.
   */
  showClose: boolean;


  normalize(): void {
    if (!this.dialogClass) {
      this.dialogClass = DEFAULT_VALUES.dialogClass;
    }

    super.normalize();
  }
}


export class BSModalContextBuilder<T extends BSModalContext> extends ModalOpenContextBuilder<T> {
  /**
   * Size of the modal.
   * 'lg' or 'sm' only.
   * NOTE: No validation.
   * Default to 'lg'
   */
  size: FluentAssignMethod<string, this>;

  /**
   * A Class for the modal dialog container.
   * Default: modal-dialog
   */
  dialogClass: FluentAssignMethod<BootstrapModalSize, this>;

  /**
   * When true, show a close button on the top right corner.
   */
  showClose: FluentAssignMethod<boolean, this>;

  constructor(defaultValues: T = undefined,
              initialSetters: string[] = undefined,
              baseType: new () => T = undefined) {
    super(
      extend<any>(DEFAULT_VALUES, defaultValues || {}),
      arrayUnion<string>(DEFAULT_SETTERS, initialSetters || []),
      baseType || <any>BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
    );
  }
}

