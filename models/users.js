const {Schema, model} = require('mongoose');

const saltRounds = process.env.SALT_ROUNDS || 10;

const userSchema = new Schema({
    name: {type: String, minlength: 5, maxlength: 40,trim:true, required: true},
    password: {type: String, minlength: 8},
    email: {type: String, minlength: 10, required: true, unique: true},
    rol:{type:String, minlength: 3},
    profilePhotoUrl: {type: String, default:"https://"},
    aNumber: {type: Number}
},{timestamps: true, versionKey: false});

const Users = model("users", userSchema);

module.exports = Users;

// userSchema.pre('save', function(next){
//     var user = this;

//     if(!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
// userSchema.methods.comparePassword = async function(candidatePassword){
//     return await bcrypt.compare(candidatePassword, this.password)
// }