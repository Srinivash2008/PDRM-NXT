
class User {
    // User creation method
    static create = async (connection, userData) => {
        return new Promise((resolve, reject) => {
            try {
                const insertUserQuery = `
                            INSERT INTO online_users (
                                online_user_name, 
                                online_first_name, 
                                online_last_name, 
                                online_email_address,
                                online_password, 
                                online_mobile_no, 
                                online_address, 
                                online_user_role,
                                online_created_at,
                                online_pub_pid,
                                online_user_hashed_password
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                const values = [
                    userData.online_user_name,
                    userData.online_first_name,
                    userData.online_last_name,
                    userData.online_email_address,
                    userData.online_password,
                    userData.online_mobile_no,
                    userData.online_address,
                    userData.user_role_pid,
                    userData.online_created_at,
                    userData.online_pub_pid,
                    userData.online_user_hashed_password,
                ];

                connection.query(insertUserQuery, values, (error, result) => {
                    if (error) {
                        console.error('Error in create:', error);
                        return reject({ error: error, success: false });
                    }

                    if (result.affectedRows > 0) {
                        const newUser = {
                            online_user_pid: result.insertId,
                            ...userData
                        };

                        resolve({ newUser: newUser, success: true });
                    } else {
                        console.error('No rows affected, User not added.');
                        reject({ error: new Error('User could not be added.'), success: false });
                    }
                });
            } catch (error) {
                console.error('Error in create:', error);
                reject({ error: error, success: false });
            }
        });
    };

    // Find all users

    static findAll = async (connection) => {
        return new Promise((resolve, reject) => {
            const findAllQuery = `
                    SELECT online_user_pid, online_user_name, online_first_name,
                           online_last_name, online_email_address, online_user_role,
                           online_mobile_no, online_address,
                           online_created_at, online_is_active, online_pub_pid,
                           online_user_hashed_password
                    FROM online_users
                    WHERE online_is_active = 'Active'
                `;

            // Use the passed connection instead of the pool
            connection.query(findAllQuery, (error, result) => {
                if (error) {
                    console.error('Error in find all user:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };

    // Find a user by user Name
    static findByName = async (connection, userName) => {
        return new Promise((resolve, reject) => {
            const selectUserByNameQuery = `
                SELECT online_user_pid, online_user_name, online_first_name,
                       online_last_name, online_email_address, online_user_role,
                       online_password, online_mobile_no, online_address,
                       online_created_at, online_is_active, online_pub_pid, online_user_hashed_password
                FROM online_users
                WHERE online_is_active = 'Active'
                AND online_user_name = ?
            `;

            connection.query(selectUserByNameQuery, [userName], (error, result) => {
                if (error) {
                    console.error('Error in findByName:', error);
                    return reject({ error: error, success: false });
                }
                if (result.length > 0) {
                    resolve({ result: result[0], success: true });
                } else {
                    resolve({ result: result, success: false });
                }
            });
        });
    };

    // Update a user
    static update = async (connection, id, userData) => {
        return new Promise((resolve, reject) => {
            try {


                const updateUserQuery = `
                            UPDATE online_users
                            SET 
                                online_user_name = ?, 
                                online_email_address = ?,
                                online_mobile_no = ?,
                                online_address = ?,
                                online_first_name = ?,
                                online_last_name = ?
                            WHERE online_user_pid = ?
                        `;
                const updateUserValues = [
                    userData.online_user_name,
                    userData.online_email_address,
                    userData.online_mobile_no,
                    userData.online_address,
                    userData.online_first_name,
                    userData.online_last_name,
                    id,
                ];

                connection.query(updateUserQuery, updateUserValues, (error, updateUserResult) => {
                    if (error) {
                        return reject({ error: error, success: false });
                    }

                    if (updateUserResult.affectedRows > 0) {
                        const updateUser = {
                            online_user_pid: id,
                            online_user_name: userData.online_user_name,
                            online_email_address: userData.online_email_address,
                            online_mobile_no: userData.online_mobile_no,
                            online_address: userData.online_address,
                            online_first_name: userData.online_first_name,
                            online_last_name: userData.online_last_name,
                        };

                        resolve({ updateUser: updateUser, success: true });
                    } else {

                        console.error('User not found or no changes made.');

                        reject({ error: new Error('User could not be updated.'), success: false });
                    }
                });

            } catch (error) {
                console.error('Error in Update:', error);
                reject({ error: error, success: false });
            }
        });
    };

    // Delete a user by ID (Mark as inactive)
    static delete = async (connection, id, data) => {
        return new Promise((resolve, reject) => {
            try {

                const deleteQuery = `
                            UPDATE online_users
                            SET online_is_active = ?
                            WHERE online_user_pid = ?
                        `;
                const updateValues = [
                    data.online_is_active,
                    id
                ];

                connection.query(deleteQuery, updateValues, (error, updateRemoveResult) => {
                    if (error) {
                        connection.rollback(() => {
                            console.error('Error in delete:', error);
                            connection.release();
                            return reject({ error: error, success: false });
                        });
                    }

                    if (updateRemoveResult.affectedRows > 0) {
                        const removeUser = {
                            online_user_pid: id,
                            online_is_active: data.online_is_active
                        };
                        resolve({ removeUser: removeUser, success: true });
                    } else {

                        console.error('User not found or no changes made.');

                        reject({ error: new Error('User could not be updated.'), success: false });
                    }
                });
            } catch (error) {
                console.error('Error in delete:', error);
                reject({ error: error, success: false });
            }
        });
    };
}

export { User };
