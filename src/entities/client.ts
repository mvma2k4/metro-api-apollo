import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType,ID } from "type-graphql";
import { Permission } from "./permission";

@ObjectType()
@Entity()
export class Client {
  @Field((): typeof ID => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly uuid: string;

  @Field((): StringConstructor => String)
  @Column("varchar", { length: 100 })
  public name: string;

  @Field()
  @Column("varchar", { length: 100 })
  public email: string;

  @Field()
  @Column("varchar", { length: 200 })
  public address: string;

  @Field()
  @Column("varchar", { length: 10 })
  public phone: string;

  @Field((): DateConstructor => Date)
  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Field((): DateConstructor => Date)
  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field((): typeof Permission => Permission)
  @ManyToOne((): typeof Permission => Permission)
  public permission: Permission;
}