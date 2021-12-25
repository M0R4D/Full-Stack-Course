import { Notyf } from "notyf";

class Notify {
    private notification = new Notyf({ duration: 5000, position: { x: "center", y: "top"}, ripple: true, dismissible: true });

    public success(message: string) : void {
        this.notification.success(message);
    }

    public error(error: any) : void {
        const msg = this.getErrorMessage(error);
        this.notification.error(msg);
    }

    private getErrorMessage(error: any) : string {
        return (
            typeof error === "string" ? error :
            typeof error.response?.data === "string" ? error.response : 
            Array.isArray(error.response?.data) ? error.response.data[0] : 
            typeof error.message === "string" ? error.message : 
            "Error Occurred, Please Try Again Later"
        )

    }
}

const notify = new Notify();

export default notify;