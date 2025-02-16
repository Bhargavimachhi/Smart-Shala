import { Admin } from "../Models/Admin.js";

// Add a new resource
export const addResource = async (req, res) => {
    const { name, quantity } = req.body;
    const {id} = req.params;

    try {
        const admin = await Admin.findById(id);

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }

        admin.resources.push({name : name, quantity : quantity});
        await admin.save();
        res.status(201).json({ message: "Resource added successfully"});
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Get all resources
export const getResources = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id);

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }
        const resources = admin.resources;
        res.status(200).json({ message: "Success", resources });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};


// Get all resource requests
export const getResourceRequests = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id);

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }
        const requests = admin.requests;
        res.status(200).json({ message: "Success", requests });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Request Resources
export const requestResource = async(req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id);
        const {name, quantity, teacherId, classroomId} = req.body;

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }

        if(quantity <= 0) {
            return res.status(404).json({message:"Invalid quantity entered"});
        }
        admin.requests.push({name : name, quantity : quantity, requestedBy: teacherId, requestedFor : classroomId});
        await admin.save();
        res.status(201).json({ message: "Resource requested successfully"});
    }
    catch(err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
}

//approve request
export const approveResourceRequest = async(req,res) => {
    try {
        const {idx, id} = req.params;
        const admin = await Admin.findById(id);

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }
        const requests = admin.requests;

        if(requests.length <= idx) {
            return res.status(404).json({message:"Request Does not exist"});
        }
        
        const request = requests[idx];
        admin.requests.splice(idx, 1);
        var resourceFound = false;
        for(var i=0; i<admin.resources.length; i++) {
            const resource = admin.resources[i];
            if(resource.name === request.name && resource.quantity >= request.quantity) {
                admin.resources[i] = {name : resource.name, quantity : resource.quantity - request.quantity};
                resourceFound = true;
                break;
            }
        }

        if(!resourceFound) {
            return res.status(404).json({message:"Resource Not available for the request"});
        }
        await admin.save();
        res.status(200).json({ message: "Success", requests });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
}