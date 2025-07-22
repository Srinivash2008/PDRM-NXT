import moment from 'moment'

// sockets
import { io } from "../../index.js";

import { User } from '../../models/userModel.js';
import { genPassword } from '../../authUtils/authUtils.js';
import connectionPool from '../../database/dbConfig.js';

//  user fetch add update remove start here
const getOnlineUsersController = async (req, res) => {
    const { page, component, loading } = req.query;
    let connection;

    try {
        connection = await new Promise((resolve, reject) => {
            connectionPool.getConnection((err, conn) => {
                if (err) return reject({ error: err, success: false });
                resolve(conn);
            });
        });

        console.log('Connection acquired:', connection.threadId);
        // transaction start here
        await new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) return reject({ error: err, success: false });
                resolve();
            });
        });

        const online_users_list = await User.findAll(connection);
        if (online_users_list && online_users_list?.success) {
            // Commit the transaction
            await new Promise((resolve, reject) => {
                connection.commit(err => {
                    if (err) return reject({ error: err, success: false });
                    resolve();
                });
            });
            res.status(200).json({ success: true, message: 'Retrieved online users successfully', loading: loading, page: page, component: component, result: online_users_list?.result });
        }
        else {
            if (connection) {
                await new Promise(resolve => {
                    connection.rollback(() => {
                        console.log('Transaction rolled back due to error');
                        resolve();
                    });
                });
            }
            res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Error On Retrieved online users' });
        }
        // res.status(200).json({ success: true, message: 'Retrieved online users successfully', loading: loading, page: page, component: component, result: online_users_list });
    } catch (error) {
        if (connection) {
            await new Promise(resolve => {
                connection.rollback(() => {
                    console.log('Transaction rolled back due to error');
                    resolve();
                });
            });
        }
        console.error('Error in getOnlineUsersController:', error);
        res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Internal Server Error' });
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release();
            console.log('Connection released back to pool');
        }
    }
};

// const addNewUserController = async (req, res) => {
//     const { page, component, loading } = req.query;

//     let connection;

//     try {

//         const user = req.body;
//         const requiredNewUserFields = [
//             "online_user_name",
//             "online_first_name",
//             "online_last_name",
//             "online_email_address",
//             "online_password",
//             "online_mobile_no",
//             "online_address",
//             "online_user_role",
//             "user_role_pid",
//         ];

//         const missingFields = requiredNewUserFields.filter(field => user[field] === undefined);
//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }
//         // get connection from connection pool
//         connection = await new Promise((resolve, reject) => {
//             connectionPool.getConnection((err, conn) => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve(conn);
//             });
//         });

//         console.log('Connection acquired:', connection.threadId);
//         // transaction start here
//         await new Promise((resolve, reject) => {
//             connection.beginTransaction(err => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve();
//             });
//         });

//         const existingUser = await User.findByName(connection, user?.online_user_name);


//         // success
//         if (existingUser && existingUser.success) {
//             console.log(existingUser, "existingUser");
//             return res.status(200).json({ success: false, page: page, component: component, loading: loading, message: 'User Already Exists' });
//         }
//         const hashedPassword = await genPassword(user?.online_password);

//         const updatedNewUser = {
//             online_user_name: user.online_user_name,
//             online_first_name: user.online_first_name,
//             online_last_name: user.online_last_name,
//             online_email_address: user.online_email_address,
//             online_password: user.online_password,
//             online_mobile_no: user.online_mobile_no,
//             online_address: user.online_address,
//             online_user_role: user.online_user_role,
//             online_pub_name: user.online_pub_name,
//             user_role_pid: user.user_role_pid,
//             online_pub_pid: user.online_pub_pid,
//             online_created_at: moment().format("YYYY/MM/DD"),
//             online_user_hashed_password: hashedPassword,
//         }
//         const newUser = await User.create(connection, updatedNewUser);
//         if (newUser && newUser?.success) {
//             await new Promise((resolve, reject) => {
//                 connection.commit(err => {
//                     if (err) return reject({ error: err, success: false });
//                     resolve();
//                 });
//             });
//             io.emit('addSocket', { page: page, component: component, loading: loading, success: true, message: 'User added successfully', result: newUser?.newUser });
//             return res.status(200).json({ success: true, page: page, component: component, loading: loading, message: 'User added successfully' });
//         }
//         else {
//             if (connection) {
//                 await new Promise(resolve => {
//                     connection.rollback(() => {
//                         console.log('Transaction rolled back due to error');
//                         resolve();
//                     });
//                 });
//             }
//             return res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Error on add User' });
//         }

//         //io.emit('addSocket', { page: page, component: component, loading: loading, success: true, message: 'User added successfully', result: newUser });
//         // return res.status(201).json({page: 'userList', component: 'userListTableData',  success: true, message: 'User added successfully', result: newUser });
//     } catch (error) {
//         if (connection) {
//             await new Promise(resolve => {
//                 connection.rollback(() => {
//                     console.log('Transaction rolled back due to error');
//                     resolve();
//                 });
//             });
//         }
//         console.error('Error in addNewUserController:', error);
//         return res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Internal Server Error' });
//     } finally {
//         // Always release the connection back to the pool
//         if (connection) {
//             connection.release();
//             console.log('Connection released back to pool');
//         }
//     }
// };


// // update user 
// const updateUserController = async (req, res) => {
//     const { page, component, loading } = req.query;
//     let connection;
//     try {

//         const data = req.body;
//         console.log(data, "data")
//         const requiredupdateUserFields = [
//             "online_user_pid",
//             "online_user_name",
//             "online_email_address",
//             "online_mobile_no",
//             "online_address",
//             "online_first_name",
//             "online_last_name",
//             // "online_password"
//         ]
//         const missingFields = requiredupdateUserFields.filter(field => data[field] === undefined);
//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }
//         // get connection from connection pool
//         connection = await new Promise((resolve, reject) => {
//             connectionPool.getConnection((err, conn) => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve(conn);
//             });
//         });

//         console.log('Connection acquired:', connection.threadId);
//         // transaction start here
//         await new Promise((resolve, reject) => {
//             connection.beginTransaction(err => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve();
//             });
//         });

//         const userId = req.body.online_user_pid;

//         const userUpdates = req.body;

//         const result = await User.update(connection, userId, userUpdates);
//         if (result && result?.success) {
//             await new Promise((resolve, reject) => {
//                 connection.commit(err => {
//                     if (err) return reject({ error: err, success: false });
//                     resolve();
//                 });
//             });
//             io.emit('updateSocket', { page: page, component: component, loading: loading, success: true, id: result?.updateUser?.online_user_pid, idName: 'online_user_pid', updatedData: result?.updateUser });
//             return res.status(200).json({ success: true, page: page, component: component, loading: loading, message: 'User updated successfully' });
//         }
//         else {
//             if (connection) {
//                 await new Promise(resolve => {
//                     connection.rollback(() => {
//                         console.log('Transaction rolled back due to error');
//                         resolve();
//                     });
//                 });
//             }
//             res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Error on update User' });
//         }
//     } catch (error) {
//         if (connection) {
//             await new Promise(resolve => {
//                 connection.rollback(() => {
//                     console.log('Transaction rolled back due to error');
//                     resolve();
//                 });
//             });
//         }
//         console.error('Error in updateUserController:', error);
//         res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Internal Server Error' });
//     } finally {
//         // Always release the connection back to the pool
//         if (connection) {
//             connection.release();
//             console.log('Connection released back to pool');
//         }
//     }
// };


// // Delete User
// const deleteUserController = async (req, res) => {
//     const { page, component, loading } = req.query;
//     let connection;
//     try {
//         const data = req.body;

//         const requiredPurchaseFields = [
//             'online_is_active',
//             'online_user_pid'
//         ];

//         // Find missing fields
//         const missingFields = requiredPurchaseFields.filter(field => data[field] === undefined);
//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }
//         // get connection from connection pool
//         connection = await new Promise((resolve, reject) => {
//             connectionPool.getConnection((err, conn) => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve(conn);
//             });
//         });

//         console.log('Connection acquired:', connection.threadId);
//         // transaction start here
//         await new Promise((resolve, reject) => {
//             connection.beginTransaction(err => {
//                 if (err) return reject({ error: err, success: false });
//                 resolve();
//             });
//         });

//         const userId = req.body?.online_user_pid;
//         const userUpdates = {
//             online_is_active: req.body.online_is_active
//         };

//         const result = await User.delete(connection, userId, userUpdates);
//         if (result && result?.success) {
//             await new Promise((resolve, reject) => {
//                 connection.commit(err => {
//                     if (err) return reject({ error: err, success: false });
//                     resolve();
//                 });
//             });

//             io.emit('deleteSocket', { page: page, component: component, loading: loading, success: true, message: "Successfully User Deleted", id: result?.removeUser?.online_user_pid, idName: 'online_user_pid' });

//             return res.status(200).json({ success: true, page: page, component: component, loading: loading, message: 'Successfully User Deleted' });
//         }
//         else {
//             if (connection) {
//                 await new Promise(resolve => {
//                     connection.rollback(() => {
//                         console.log('Transaction rolled back due to error');
//                         resolve();
//                     });
//                 });
//             }
//             res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Error on Delete User' });
//         }

//         // res.status(200).json({ success: true, message: 'User status updated successfully', result });
//     } catch (error) {
//         if (connection) {
//             await new Promise(resolve => {
//                 connection.rollback(() => {
//                     console.log('Transaction rolled back due to error');
//                     resolve();
//                 });
//             });
//         }
//         console.error('Error in updateUserStatusController:', error);
//         res.status(500).json({ success: false, page: page, component: component, loading: loading, message: 'Internal Server Error' });
//     } finally {
//         // Always release the connection back to the pool
//         if (connection) {
//             connection.release();
//             console.log('Connection released back to pool');
//         }
//     }
// };



export {
    // user 
    getOnlineUsersController,
    // addNewUserController,
    // deleteUserController,
    // updateUserController
};