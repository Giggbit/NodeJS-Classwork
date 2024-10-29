import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "books",
    timestamps: false,
})
export class Book extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;
}