import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "profiles",
    timestamps: false,
})
export class Profile extends Model {

}