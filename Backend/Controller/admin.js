import {Admin} from "../Models/Admin.js"

export const addAdmin = async(req, res) => {
    let admin = await Admin.find({email : req.body.email});

    if(admin != null) {
        res.status(403).json({"message":"Admin already exists"});
        return;
    }

    admin = new Admin({
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