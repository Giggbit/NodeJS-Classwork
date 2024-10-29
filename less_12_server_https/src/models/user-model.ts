import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Post } from "./post-model.js";

enum UserRoles {
    ADMIN="admin",
    USER="user",
    GUEST="guest",
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!:number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
    })
    login!: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.GUEST,
    })
    role!:UserRoles;

    @HasMany(() => Post)
    posts!: Post[];
}