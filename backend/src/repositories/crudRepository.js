export default function crudRepository(model) {
    return {
        create: async function (data) {
            const newDoc = await model.create(data);
            return newDoc;
        },
        getAll: async function () {
            const docs = await model.find();
            return docs;
        },
        getById: async function (id) {
            const doc = await model.findById(id);
            return doc;
        },
        deleteById: async function (id) {
            const result = await model.findByIdAndDelete(id);
            return result;
        },
        updateById: async function (id, data) {
            const updatedDoc = await model.findByIdAndUpdate(id, data, { new: true });
            return updatedDoc;
        }
    }
}