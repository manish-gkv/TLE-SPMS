import ProblemSetSchema from "../schema/problemSet.js";
import crudRepository from "./crudRepository.js";
const problemSetRepository = {
    ...crudRepository(ProblemSetSchema),

    findAndUpdate: async function (query, data) {
        const updatedDoc = await ProblemSetSchema.findOneAndUpdate(query, data, {
            new: true,
            upsert: true
        });
        return updatedDoc;
    }
};
export default problemSetRepository;