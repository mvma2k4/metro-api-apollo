import { MyError } from "../../utils/error";

export class PermissionSameNameError extends MyError {
    constructor(permissionName: string) {
        const message = `permission ${permissionName} already exists`;
        super(message);
    }
}