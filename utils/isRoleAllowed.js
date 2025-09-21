const isRoleAllowed = (req, userCategory) => {
    const userRoles = req.user.roles || [];
    const userId = req.user.id;

    if (!req.user) {
        return false;
    }

    if (!userRoles.includes("admin") && userCategory.user_id !== userId) {
        return false;
    }
    
    return true;
}

export { isRoleAllowed };