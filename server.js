const generate_json = require('./generate_json');
const express = require('express');
const handlebars = require('express-handlebars');

const port = 3000;
const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
	layoutsDir: __dirname + '/views/layouts',
	defaultLayout: 'index',
}));
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.render('main', {layout : false, data: generate_json.data});
});
app.listen(port, () => console.log(`App listening to port ${port}`));
