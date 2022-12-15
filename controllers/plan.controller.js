import db from "../models/index.js";

const Controller = {};
const { Plan } = db;

Controller.findPlan = async (planId) => {
    try {
        const result = await Plan.findAll({ where: { planId } });
        result.sort((a, b) => {
            return a.order - b.order;
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.change = async (plan) => {
    try {
        plan.forEach(async (e, i) => {
            const { planId, title } = e;
            const result = await Plan.update({ order: i + 1 }, { where: { planId, title } });
            console.log(result);
        });
        return "순서 변경 성공";
    } catch (error) {
        console.log(error);
    }
};

Controller.add = async (query) => {
    try {
        const { planId, order, address, title, lat, lng } = query;
        const result = await Plan.create({
            planId,
            address,
            title,
            lat,
            lng,
            order,
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.delete = async (query) => {
    const { planId, title } = query;
    try {
        const result = await Plan.destroy({ where: { planId, title } });
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default Controller;
