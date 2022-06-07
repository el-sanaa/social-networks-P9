
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

///**********TRIM = pour enlever les espaces
///***********PARAMETTRE DES UTILISATEURS
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            maxLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6
        },
        picture: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        Likes: {
            type: [String]
        },

    },
    {
        timestamps: true,
    }
)

///***********CRYPTER ET SALER LE MOT DE PASSE AVANT LE SAVE
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

///***********BCRYPT COMPARE L'EMAIL AVEC LE MOT DE PASS */
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email')
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;