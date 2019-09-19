module.exports = [
    {
        method: 'POST',
        path: '/MessageStatus',
        config: {
            tags: ['api', 'app'],
            description: 'This API allows the user get configuration details.',
            notes: '500 - Internal server error,\n\n 200 - success',
        },
        handler: function (req, reply) {
            console.log(req.payload);
            // take any action in this callback
        }
    },
];
