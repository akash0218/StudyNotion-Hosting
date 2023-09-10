const mailSender = require("../config/mailSender");
const {contactUsEmail} = require("../mailTemplates/contactUsEmail");

exports.ContactUsController = async (req, res) => {

    const { email, firstName, lastName, message, phoneNo, countrycode } = req.body

    try{
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
        )

        console.log("Email Res ", emailRes)
        return res.json({
            success: true,
            message: "Email sent successfully",
        })
    }
    catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
            success: false,
            message: "Something went wrong...",
        })
    }

}
