const Route = require("express");
const {userAdd, userEdit, userDelete} = require('../controllers/UserListEditing')
const router = new Route()

router.post("/add", userAdd)

router.put("/edit", userEdit)

router.put("/delete", userDelete)

module.exports = router


