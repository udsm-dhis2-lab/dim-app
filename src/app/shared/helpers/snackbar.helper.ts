/**
 *
 * @param_snackbarInstance
 * @param_message
 * @param_action
 * @param_cssClass
 */
export function OpenSnackBar(
    snackbarInstance: any,
    message: string,
    action: string,
    cssClass: string
) {
    snackbarInstance.open(message, action, {
        duration: 4000,
        panelClass: [cssClass],
    });
}
