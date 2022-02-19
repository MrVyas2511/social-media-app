const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const { SECRET_KEY } = require('../../config')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Query: {
        async getUser(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    return user;
                } else {
                    throw new Error('User not Found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError("Errors", { errors });

            }
            const user = await User.findOne({ username });
            if (!user) {
                errors.general = 'User Not Found'
                throw new UserInputError("User Not Found", { errors });
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError("Wrong Credentials", { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(_, {
            registerInput: { username, email, password, confirmPassword}
        }) {

            //TODO Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // Make sure user doesnt already exits
            // hash password and creat an auth token

            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is Taken', {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
        async profileUpdate(_, { profileInput: { id, username, email, about, gender } }) {
            
            const res = await User.findOneAndUpdate({ _id: id }, { $set: { username, email, about, gender } },null, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", res);
                }
            }).clone()
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}