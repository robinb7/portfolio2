let express = require('express');
let router = express.Router();

let passport = require('passport');

// Connect to book controller
let prersonController = require('../controllers/person');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ operation. */
router.get('/', prersonController.displayPersonList);

/* GET Route for displaying the Add page - CREATE operation. */
router.get('/add', requireAuth, prersonController.displayAddPage);

/* POST Route for processing the Add page - CREATE operation. */
router.post('/add', requireAuth, prersonController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE operation. */
router.get('/edit/:id', requireAuth, prersonController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation. */
router.post('/edit/:id', requireAuth, prersonController.processEditPage);

/* GET Route to perform Deletion - DELETE operation. */
router.get('/delete/:id', requireAuth, prersonController.performDelete);

module.exports = router;