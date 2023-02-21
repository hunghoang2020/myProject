module.exports = {

    muntipleMongooseObject:  function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },
    // dung khi co 1 doi tuong
    mongooseObject:  function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }

}
