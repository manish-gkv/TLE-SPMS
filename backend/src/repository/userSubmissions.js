import crudRepository from "./crudRepository.js";
import UserSubmission from "../schema/userSubmissions.js";

const userSubmissionRepository= {
    ...crudRepository(UserSubmission),
    findAndUpdate: async function (query, data) {
        const updatedDoc = await UserSubmission.findOneAndUpdate(query, data, {
            new: true,
            upsert: true
        });
        return updatedDoc;
    }
};

export default userSubmissionRepository;