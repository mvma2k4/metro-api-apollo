import { userResponse } from "../../utils/genericTypes";
import { Permission } from "../../entities/permission";

export const CreatePermissionPayload = userResponse("CreatePermissionPayload", Permission);
