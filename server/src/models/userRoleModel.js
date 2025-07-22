
class UserRole {
    // User Role creation method
    static create(connection, role) {
        return new Promise((resolve, reject) => {
            try {


                const insertUserRoleQuery = `
                            INSERT INTO online_user_roles (
                                user_role_name, 
                                user_role_created_at, 
                                user_role_is_active
                            ) VALUES (?, ?, ?)
                        `;

                const values = [
                    role.user_role_name,
                    role.user_role_created_at,
                    role.user_role_is_active
                ];

                connection.query(insertUserRoleQuery, values, (error, result) => {
                    if (error) {
                        console.error('Error in create Role:', error);
                        return reject({ error: error, success: false });
                    }

                    if (result.affectedRows > 0) {
                        const newUserRole = {
                            user_role_pid: result.insertId,
                            user_role_name: role.user_role_name,
                            user_role_created_at: role.user_role_created_at,
                            user_role_is_active: role.user_role_is_active
                        };
                        resolve({ newUserRole: newUserRole, success: true });
                    } else {
                        console.error('No rows affected, User Role not added.');
                        reject({ error: new Error('User Role could not be added.'), success: false });
                    }
                });
            } catch (error) {
                console.error('Error in create Role:', error);
                reject({ error: error, success: false });
            }
        });
    };

    // Find all user roles
    static findAll(connection) {
        return new Promise((resolve, reject) => {
            const selectUserRoleQuery = `
                SELECT user_role_pid, user_role_name, user_role_created_at,
                      user_role_is_active
                FROM online_user_roles
            `;
            connection.query(selectUserRoleQuery, (error, result) => {
                if (error) {
                    console.error('Error in findall role:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };

    // Update a user role
    static update(connection, roleId, roleUpdates) {
        return new Promise((resolve, reject) => {
            try {
                const updateUserRoleQuery = `
                            UPDATE online_user_roles
                            SET 
                                user_role_name = ?, 
                                user_role_created_at = ?, 
                                user_role_is_active = ?
                            WHERE user_role_pid = ?
                        `;

                const values = [
                    roleUpdates.user_role_name,
                    roleUpdates.user_role_created_at,
                    roleUpdates.user_role_is_active,
                    roleId
                ];

                connection.query(updateUserRoleQuery, values, (error, updateUserRoleResult) => {
                    if (error) {
                        console.error('Error in Update User Role:', error);
                        return reject({ error: error, success: false });
                    }

                    if (updateUserRoleResult.affectedRows > 0) {
                        const updateUserRole = {
                            user_role_pid: roleId,
                            user_role_name: roleUpdates.user_role_name,
                            user_role_created_at: roleUpdates.user_role_created_at,
                            user_role_is_active: roleUpdates.user_role_is_active
                        };
                        resolve({ updateUserRole: updateUserRole, success: true });
                    } else {
                        console.error('User Role not found or no changes made.');
                        reject({ error: new Error('User Role could not be updated.'), success: false });
                    }
                });
            } catch (error) {
                console.error('Error in Update:', error);
                reject({ error: error, success: false });
            }
        });
    };

    // Delete (mark inactive) a user role
    static delete(connection, roleId, roleUpdates) {
        return new Promise((resolve, reject) => {
            try {
                const deleteUserRoleQuery = `
                            UPDATE online_user_roles
                            SET 
                                user_role_is_active = ?
                            WHERE user_role_pid = ?
                        `;
                const values = [
                    roleUpdates.user_role_is_active,
                    roleId
                ];

                connection.query(deleteUserRoleQuery, values, (error, updateRemoveResult) => {
                    if (error) {
                        console.error('Error in delete Role:', error);
                        return reject({ error: error, success: false });
                    }

                    if (updateRemoveResult.affectedRows > 0) {
                        const removeUserRole = {
                            user_role_pid: roleId,
                            user_role_is_active: roleUpdates.user_role_is_active
                        };
                        resolve({ removeUserRole: removeUserRole, success: true });
                    } else {
                        console.error('User Role not found or no changes made.');
                        reject({ error: new Error('User Role could not be updated.'), success: false });
                    }

                });
            } catch (error) {
                console.error('Error in delete:', error);
                reject({ error: error, success: false });
            }
        });
    }
}

export {
    UserRole
};
