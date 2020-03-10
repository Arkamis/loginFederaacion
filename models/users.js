const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 10;

const userSchema = new Schema({
    name: {type: String, minlength: 5, maxlength: 40,trim:true, required: true},
    password: {type: String, minlength: 3},
    email: {type: String, minlength: 10, required: true, unique: true},
    rol:{type:String, minlength: 3},
    profilePhotoUrl: {type: String, default:"https://"},
    nAccount: {type: Number}
},{timestamps: true, versionKey: false});

userSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next();
    console.log('Im getting called!!');
    // generate a salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword.toString(), this.password, (err, same) => {
        if(err){
            console.log('Error on compare method', err.message);
        }
        return same;
    })
}

const Users = model("users", userSchema);

module.exports = Users;