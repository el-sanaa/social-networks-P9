
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

// //********REQ.BODY= ce que l'utilisateur rempli dans les champs input */
// //********PARAMETRE/ PARAMS= LES PARAMETTRE DS L'URL*/
// //************DOCS = DATA */
module.exports.userInfo = (req, res) => {
    console.log(req.params);
    //Méthode isValid
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + res.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs); //Si il n'y pas d'erreur
        else console.log('ID unknown : ' + err);
    }).select('-password');//Cacher le mot de passe
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { bio: req.body.bio } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs); //Si il n'y a pas err retourne docs de la data
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + res.params.id)

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully delected. " });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.follow = async (req, res) => {
    //Controler le body et le params
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        //Rajouter les id du suiveur follower
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);//Si pas d'erreur
                else return res.status(400).json(err);
            }
        );

        //Rajouter les id des following = les suivis
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
module.exports.unfollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        //Retirer
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        //Retirer
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}