const requireAdminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
}

export default requireAdminMiddleware;