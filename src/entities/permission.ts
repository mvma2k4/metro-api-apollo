import { Field, ID, ObjectType } from "type-graphql";
import { Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
  } from "typeorm";


@ObjectType()
@Entity()
export class Permission {
@Field((): typeof ID => ID)
    @PrimaryGeneratedColumn("uuid")
    public readonly uuid: string;

    @Field((): StringConstructor => String)
    @Column()
    public name: string;

    @Field((): StringConstructor => String)
    @Column("json")
    public features: string;

    @Field((): StringConstructor => String)
    @Column("json")
    public modules: string;

    @Field((): DateConstructor => Date)
    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Field((): DateConstructor => Date)
    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;
}