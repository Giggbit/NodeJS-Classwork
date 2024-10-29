import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "groups",
    timestamps: false,
})
export class Group extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
    })
    title!: string;
}