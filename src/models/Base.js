
export default  class Base {
    static schema = null;
    static model=null;

    dataValues = {}

    constructor(mongoInstance) {
        this.dataValues = mongoInstance._doc;
        this.dataValues.id = this.dataValues._id;
        Object.entries(this.dataValues)
            .forEach(([ key, value ]) => {
                this[key] = value;
            });
    }

    static _init = instance => {
        return new this(instance);
    }

    static async create(data) {
        const instance = new this.model(data);

        await instance.save();

        return this._init(instance);
    }

    static async createMany(items) {
        const instances = await this.model.insertMany(items);

        return instances.map(instance => this._init(instance));
    }
}
