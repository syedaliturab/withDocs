exports.test = (req, res) => {
    console.log('list');

    res.status(200).json({
        status: 'sucess',
        data: {
            name: "user"
        }
    });
}