import InactivitySchema from "../schema/inactivity.js";
import crudRepository from "./crudRepository.js";
const inactivityRepository = {
    ...crudRepository(InactivitySchema),

    findAndUpdate: async function (query, data) {
        const updatedDoc = await InactivitySchema.findOneAndUpdate(query, data, {
            new: true,
            upsert: true
        });
        return updatedDoc;
    }
};
export default inactivityRepository;