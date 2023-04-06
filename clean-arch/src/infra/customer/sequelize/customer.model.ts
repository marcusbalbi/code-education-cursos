import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: false })
  declare zip: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ defaultValue: false })
  declare active: boolean;

  @Column({ defaultValue: 0 })
  declare rewardPoints: number;
}
