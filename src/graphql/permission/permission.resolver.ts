import { Arg, Authorized, Ctx, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { Inject } from "typedi";
import { Context } from "../../context/context.interface";
import { Permission } from "../../entities/permission";
import { User } from "../../entities/user";
import { UserError } from "../../utils/genericTypes";
import { PermissionInput } from "./permission.input";
import { CreatePermissionPayload } from "./permission.payload";
import { PermissionService } from "./permission.service";
import { MyError } from "../../utils/error";

@Resolver(Permission)
export class PermissionResolver {
    @Inject()
    private readonly permissionService: PermissionService;

    @Authorized()
    @Query((): [typeof Permission] => [Permission])
    public permissions(@Ctx() { user }: Context): Promise<Permission> {
        return this.permissionService.getPermissionByUser(user.uuid);
    }

    @Authorized()
    @Mutation((): typeof CreatePermissionPayload => CreatePermissionPayload)
    public async createPermission(@Arg("input") input: PermissionInput): Promise<typeof CreatePermissionPayload> {
        try {
            return await this.permissionService.createPermission(input.name, input.features, input.modules);
        } catch (e) {
            if (e instanceof MyError) {
                return new UserError(e.message);
            }
        }
    }

    @FieldResolver()
    public async owner(@Root() permission: Permission): Promise<User[]> {
        return this.permissionService.getUsersPermissionById(permission);
    }
}