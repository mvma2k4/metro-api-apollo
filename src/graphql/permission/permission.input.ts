import { InputType, Field } from "type-graphql";

@InputType()
export class PermissionInput {
    @Field()
    public name: string;

    @Field()
    public features: string;

    @Field()
    public modules: string;
}
