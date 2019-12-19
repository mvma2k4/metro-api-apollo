import { Field, ID, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity, Unique, ManyToOne } from "typeorm";

import { UserInterface } from "../context/user.interface";
import { Permission } from "./permission";
import * as bcrypt from "bcryptjs";

@ObjectType()
@Entity()
@Unique(["username"])
@Unique(["email"])
export class User implements UserInterface {
    @Field((): typeof ID => ID)
    @PrimaryGeneratedColumn("uuid")
    public readonly uuid: string;

    @Field()
    @Column()
    public email: string;

    @Field()
    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column({ type: "text", array: true, nullable: true })
    public roles: [string];

    @Field((): typeof Permission => Permission)
    @ManyToOne((): typeof Permission => Permission)
    public permission: Permission;

    public hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}