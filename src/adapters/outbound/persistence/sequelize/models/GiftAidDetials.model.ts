import { DataTypes, Model, Sequelize } from "sequelize";

export class GiftAidDetailsModel extends Model {
  declare id: number;
  declare donation_id: number;
  declare first_name: string;
  declare last_name: string;
  declare address_line1: string;
  declare address_line2: string | null;
  declare city: string;
  declare postcode: string;
  declare country: string;
  declare created_at: Date;
  declare updated_at: Date;
}

export function initGiftAidDetailsModel(sequelize: Sequelize) {
  GiftAidDetailsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      donation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_line2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postcode: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "United Kingdom",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "gift_aid_details",
      timestamps: false,
    },
  );

  return GiftAidDetailsModel;
}
