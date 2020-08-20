const XLSX = require('xlsx');
const paths = require('./paths');
const metadata = require('./metadata');

const data = {specialties:[], currentTime: new Date().toLocaleString('en-NZ')};
metadata.data.forEach(specialty => {
	const workbook = XLSX.readFile(paths.getSpreadsheetPath(specialty));
	const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Data']);
	const categories = [];
	let categoryName, categoryDict, scenarioList;
	rows.forEach(row => {
		const currentCategoryName = row['Clinical category'];
		if (categoryName !== currentCategoryName){
			categoryName = currentCategoryName;
			scenarioList = [];
			categoryDict = {
				name: categoryName,
				scenarios: scenarioList,
			};
			categories.push(categoryDict);
		}
		scenarioList.push(row);
	});
	data.specialties.push({
        specialty: specialty.Title,
        categories: categories,
        chief: specialty.Chief,
        secondary: specialty.Secondaryspecialties,
        radiology: specialty.Radiologyoversight,
        ADHBradiology: specialty.ADHBradiology,
        clinical2011: specialty.Clinicalinput2011,
        clinical2020: specialty.Clinicalinput2020,
        discrepanciesResolved: specialty.Discrepanciesresolved,
        specialtyId: specialty.specialtyId,
    });
});

exports.data = data;