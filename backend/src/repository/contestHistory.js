import crudRepository from "./crudRepository.js";
import ContestHistory from "../schema/contestHistory.js";
const contestHistoryRepository = {
    ...crudRepository(ContestHistory),
    findAndUpdate: async function (query, data) {
        const updatedDoc = await ContestHistory.findOneAndUpdate(query, data, {
            new: true,
            upsert: true
        });
        return updatedDoc;
    }
}

export default contestHistoryRepository;