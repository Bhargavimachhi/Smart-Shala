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
        res.status(201).json({ message: "Resource added successfully", resource });
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

// Request a resource
export const requestResource = async (req, res) => {
    const { teacherId, resource, quantity } = req.body;
    const {id} = req.params;

    try {
        const admin = await Admin.findById(id);

        if(!admin) {
            return res.status(404).json({message:"Admin does not exist"});
        }
        
        admin.resources.push({name:resource, quantity:quantity, requestedBy:teacherId});
        await admin.save();

        res.status(201).json({ message: "Resource requested successfully", request });
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