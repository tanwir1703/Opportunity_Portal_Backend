const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorRespone");

//load all users
exports.allUsers = async (req, res, next) => {
    
    const pagesize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({createdAt: -1}).select('-password')
            .skip(pagesize * (page-1))
            .limit(pagesize)

        res.status(200).json({
            success: true,
            users,
            page,
            count,
            pages: Math.ceil(count/pagesize)
        })
        next();
    } catch (error) {
        return next(error);
    }
}


//show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(error);
    }
}


//Edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(error);
    }
}


//Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        })
        next();
    } catch (error) {
        return next(error);
    }
}


//jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    const { companyName, title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            const addJobHistory = {
                companyName,
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}

