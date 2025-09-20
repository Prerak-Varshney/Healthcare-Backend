const isRoleAllowed = (req, res, userCategory) => {
    const userRoles = req.user.roles || [];
    const userId = req.user.id;

    if (!userRoles.includes("admin") && userCategory.user_id !== userId) {
        return false;
    }
    
    return true;
}

export { isRoleAllowed };