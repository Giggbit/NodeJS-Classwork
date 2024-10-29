import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";

@Table({
    tableName: "posts",
    timestamps: false,
})
export class Post extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;
}