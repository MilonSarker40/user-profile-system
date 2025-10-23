import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.js";

export const Profile = sequelize.define("Profile", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  bio: { type: DataTypes.TEXT },
  avatarUrl: { type: DataTypes.STRING },
  coverUrl: { type: DataTypes.STRING },
  thumbnailUrl: { type: DataTypes.STRING },
}, {
  tableName: "profiles",
  timestamps: true,
});

User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });
