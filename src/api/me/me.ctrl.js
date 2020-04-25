export default async (req, res) => {
    if(!req.user) {
        return res
            .status(401)
            .json({
                error: "Error 7070: Unauthorized"
            })
    }
    const _user = { ...req.user }
    delete _user.password;
    return res
        .status(200)
        .json(_user)
};


