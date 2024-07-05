const Contact = require("../models/contact-model");

const contactform = async(req, res, next) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message:"Message sent successfully..!!"})
    } catch (error) {
        const status = 500;
        const message = "Message not sent..!!";
        const err = {
            status,
            message,
        }
        next(err);
        // next(error);
        // return res.status(500).json({message:"Message not sent..!!"})
    }
}

module.exports = contactform;