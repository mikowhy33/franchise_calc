


const months = [
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
	"January",
	"February",
	"March",
	"April",
	"May",
] as const;


const firstMonth = months[0];
const indexOfFirstMonth = months.indexOf(months[0]);


// union of all months, give all the indecs, returns a union. TS trick
export type Month = (typeof months)[number];



// type of a one month
export type Monthly = {
	nrOfStud: number;

	nrOfTeachers: number;
	nrOfMeetings: number;

	ratePerStudPerMeeting: number;

	studLicenses: number;
	//teacherCostPIE: number;
	//teacherCostPEL: number;
	transportCost: number;

	childSafetyCert: number;
};

// type as a whole, keys are September,Oct etc
// Value is a type of Month with all the values
export type MonthlyData = Record<Month, Monthly>;


export {months, firstMonth, indexOfFirstMonth}
