const fs = require('fs');
const handlebars = require('handlebars');
const generate_json = require('./generate_json');
const paths = require('./paths');

handlebars.registerPartial({
	introduction: fs.readFileSync('views/partials/introduction.handlebars', 'utf8'),
	specialty: fs.readFileSync('views/partials/specialty.handlebars', 'utf8'),
	scenario: fs.readFileSync('views/partials/scenario.handlebars', 'utf8'),
	sidebar: fs.readFileSync('views/partials/sidebar.handlebars', 'utf8'),
	content: fs.readFileSync('views/partials/content.handlebars', 'utf8'),
});

const template = handlebars.compile(fs.readFileSync('views/main.handlebars', 'utf8'));
const output = template({ data: generate_json.data });

fs.writeFileSync(process.argv.length === 3 ? process.argv[2] : paths.PUBLISH_PATH, output);
