import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Permission } from "../../entities/permission";
import { PermissionSameNameError } from "./permission.error";
import { User } from "../../entities/user";

@Service()
export class PermissionService {
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
    private readonly userRepository: Repository<User>

    public async getUsersPermissionById(permission: Permission): Promise<User[]> {
        return this.userRepository.find({ permission: permission });
    }

    public async getPermissionByUser(userId: string): Promise<Permission> {
        return this.permissionRepository.createQueryBuilder()
        .select([
            "permission.*"
        ])
        .relation(Permission, "permission")
        .of(userId)
        .loadOne();
    }

    public async checkPermissionExists(name: string): Promise<boolean> {
        return await this.permissionRepository.findOne({
            name
        }) !== undefined;
    }

    public async createPermission(name: string, features: string, modules: string): Promise<Permission> {
        if (await this.checkPermissionExists(name)) {
            throw new PermissionSameNameError(name);
        }

        const permission = this.permissionRepository.create({
            name,
            features,
            modules,
            createdAt : Date.now()
        });
        return this.permissionRepository.save(permission);
    }
}