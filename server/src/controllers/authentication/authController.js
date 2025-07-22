import { comparePassword, generateToken, genPassword } from "../../authUtils/authUtils.js";
import connectionPool from "../../database/dbConfig.js";

import { User } from "../../models/userModel.js";
import { UserRole } from "../../models/userRoleModel.js";


const loginController = async (req, res) => {
    let connection;

    try {
        const { userMail, userPassword } = req.body;

        connection = await new Promise((resolve, reject) => {
            connectionPool.getConnection((err, conn) => {
                if (err) return reject({ error: err, success: false });
                resolve(conn);
            });
        });

        console.log('Connection acquired:', connection.threadId);

        await new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) return reject({ error: err, success: false });
                resolve();
            });
        });

        const onlineUsersList = await User.findAll(connection);
        const onlineUserRoleList = await UserRole.findAll(connection);

        const user = onlineUsersList?.result?.find(user => user.online_email_address === userMail);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await comparePassword(userPassword, user.online_user_hashed_password);

        if (!isMatch) {
            return res.status(200).json({ success: false, message: 'Incorrect password.' });
        }

        // Find the user's role
        const userRole = onlineUserRoleList?.result?.find(role => role.user_role_pid === Number(user.online_user_role));
        const userRoleName = userRole?.user_role_name;

        // Define permissions based on role (same as previous example)
        const userRolePermissions = {
            'Super Admin': ['/','/Employee_Applaud_Card','/Employee_Applaud_Card/index'],
            'Admin': ['/','/Employee_Applaud_Card'],
            'User':['/','/Employee_Applaud_Card'],
            'Production': ['/','/Employee_Applaud_Card'],
            'Operator':['/','/Employee_Applaud_Card'],
            'Client': ['/','/Employee_Applaud_Card'],
        };

        const permissions = userRolePermissions[userRoleName] || [];

        // Generate token with user details and permissions
        const token = generateToken({
            id: user.online_user_pid,
            username: user.online_user_name,
            userFirstName: user.online_first_name,
            userLastName: user.online_last_name,
            userEmail: user.online_email_address,
            role: userRoleName,
            userMobileNo: user.online_mobile_no,
            userAddress: user.online_address,
            userCreatedAt: user.online_created_at,
            publisherId: user.online_pub_pid,
            online_created_at: user.online_created_at,
            online_is_active: user.online_is_active,
            userRolePermissions: permissions
        });

        // Commit the transaction
        await new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) return reject({ error: err, success: false });
                resolve();
            });
        });

        res.status(200).json({ success: true, message: 'Login successful', result: token });
    } catch (error) {
        console.error('Error in loginController:', error);

        // Rollback the transaction in case of an error
        if (connection) {
            await new Promise(resolve => {
                connection.rollback(() => {
                    console.log('Transaction rolled back due to error');
                    resolve();
                });
            });
        }

        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release();
            console.log('Connection released back to pool');
        }
    }
};



export {
    loginController
};