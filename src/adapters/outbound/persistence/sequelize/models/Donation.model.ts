import { DataTypes, Model, Sequelize } from "sequelize";

export class DonationModel extends Model {
  declare id: number;
  declare stripe_payment_intent_id: string;
  declare amount_pence: number;
  declare currency: string;
  declare email: string;
  declare status: "pending" | "succeeded" | "failed";
  declare created_at: Date;
  declare updated_at: Date;
}

export function initDonationModel(sequelize: Sequelize) {
  DonationModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stripe_payment_intent_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      amount_pence: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "gbp",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
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
      tableName: "donations",
      timestamps: false,
    },
  );

  return DonationModel;
}
