import {Admin} from "../Models/Admin.js"

export const addAdmin = (req, res) => {
    let admin = new Admin({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    admin.save().then(()=>{
        res.redirect("/admin");
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Admin");
    });
}