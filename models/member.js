import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Member.init(
        {
            planId: DataTypes.STRING,
            hostId: DataTypes.BIGINT,
            memberId: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "Member",
        }
    );
    return Member;
};
