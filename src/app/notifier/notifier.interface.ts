export interface INotifier {
    showInfo(message: string): void
    showWarn(message: string): void
    showError(message: string): void
}