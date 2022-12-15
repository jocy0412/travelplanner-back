import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Plan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Plan.init(
        {
            planId: DataTypes.STRING,
            order: DataTypes.INTEGER,
            title: DataTypes.STRING,
            address: DataTypes.STRING,
            lat: DataTypes.DECIMAL,
            lng: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Plan",
        }
    );
    return Plan;
};
