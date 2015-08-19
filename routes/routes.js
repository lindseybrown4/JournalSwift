module.exports = function(express, app, passport) {
	var router = express.Router(); 

	router.get('/', function(req, res, next) {
		res.render('index', {title:'Welcome to Journal Swift'});
	});

	function securePages (req, res, next) {
		if(req.isAuthenticated()) {
			next(); 
		} else {
			res.redirect('/');
		}
	};

	router.get('/auth/facebook', passport.authenticate('facebook'));

	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/myJournalSwift',
		failureRedirect: '/'
	}))
  
	router.get('/myJournalSwift', securePages, function(req, res, next) {
		res.render('myJournalSwift', {title: 'myJournalSwift', user:req.user});
	})

	router.get('/logout', function (req, res, next) {
		req.logout(); 
		res.redirect('/');
	})

	// app.get('/logout', function (req, res) {
	// 	req.session.destroy(function () {
	// 	res.redirect('/');	
	// 	});

	// });

	app.use('/', router); 
};
 


