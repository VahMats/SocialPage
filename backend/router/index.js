const Route = require('express');
const UserRoutes = require('./userRouter')

const router = new Route();

router.use("/user", UserRoutes)

module.exports = router
