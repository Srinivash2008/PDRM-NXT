// import jwt from 'jsonwebtoken';
import { decodeToken } from '../authUtils/authUtils.js';

// this is for Client
const authClient = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: "Unauthorized. Please add valid token" });
        }

        const token = authHeader.split(' ')[1];


        try {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT secret key is missing.');
            }
            const decoded = decodeToken(token);


            const { 
                id,
                username,
                userFirstName,
                userLastName,
                userEmail,
                role,
                userMobileNo,
                userAddress,
                userCreatedAt,
                publisherId,
                online_created_at,
                online_is_active 
            } = decoded;

            if (role !== 'Client') {
                return res.json({ success: false, message: "Forbidden. Only admin users can perform this action" });
            }
            req.user = {
                id,
                username,
                userFirstName,
                userLastName,
                userEmail,
                role,
                userMobileNo,
                userAddress,
                userCreatedAt,
                publisherId,
                online_created_at,
                online_is_active,
                userRolePermissions
            };
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.json({ success: false, message: "Unauthorized. Please add valid token verify" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

export {
    authClient
}