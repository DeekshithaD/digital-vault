module.exports = function (schema, mongoose) {
  schema.statics.addItem = async function (data) {
    const newItem = await this.create(data);
    return newItem;
  };
  schema.statics.getItems = async function (userId) {
    const data = await this.find({ user: userId }).select("-__v");
    return data;
  };
  schema.statics.getItemsByCategory = async function (userId, category) {
    const data = await this.find({ user: userId, category: category });
    return data;
  };
  schema.statics.viewItem = async function (id) {
    const data = await this.findOne({ _id: id }).select("-__v");
    return data;
  };
  schema.statics.editItem = async function (id, itemData) {
    const data = await this.findByIdAndUpdate(id, itemData, {
      new: true,
      runValidators: true,
    });
    return data;
  };
  schema.statics.getItemsforSync = async function (userId) {
    const data = await this.find(
      { user: userId },
      "url userName sitePassword"
    ).select("-__v");
    return data;
  };

  return schema;
};
