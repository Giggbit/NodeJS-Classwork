import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "userGroups",
    timestamps: false,
})
export class UserGroup extends Model {

}