"use client";

import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	pdf,
	PDFDownloadLink,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

import { Input } from "@/components/ui/input";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import { get } from "http";

import {
	MonthlyData,
	Monthly,
	Month,
	months,
	firstMonth,
	indexOfFirstMonth,
} from "@/types/mytypes";

// ! types has been moved to the types/mytypes.ts FILE !

export default function MainnnPage() {
	const { setTheme } = useTheme();

	// ROZWIĄZANIE 1: Jeden obiekt z danymi dla wszystkich miesięcy
	// here we give info about useState keys and data of starting point
	// June July August September October November December January February March April May
	const [monthlyData, setMonthlyData] = useState<MonthlyData>({
		June: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,
			//teacherCostPIE: 0,
			transportCost: 0,
			//teacherCostPEL: 0,

			childSafetyCert: 0,
		},
		July: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,
			//teacherCostPIE: 0,
			transportCost: 0,
			//teacherCostPEL: 0,

			childSafetyCert: 0,
		},
		August: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,
			//teacherCostPIE: 0,
			transportCost: 0,
			//teacherCostPEL: 0,

			childSafetyCert: 0,
		},
		September: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		October: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		November: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		December: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		January: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		February: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		March: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		April: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
		May: {
			nrOfStud: 0,

			nrOfTeachers: 0,
			nrOfMeetings: 0,

			ratePerStudPerMeeting: 0,

			// Costs
			studLicenses: 0,

			transportCost: 0,

			childSafetyCert: 0,
		},
	});

	// NO LONGER IN USE BUT NICE 4 PRACTICE
	const nr: Record<Month, number> = {
		September: 0,
		October: 1,
		November: 2,
		December: 3,
		June: 0,
		July: 0,
		August: 0,
		January: 0,
		February: 0,
		March: 0,
		April: 0,
		May: 0,
	};

	// typ ktory ma w sobie odwrotnosc czyli 0:September, 1:October etc wiec jazda

	const nrReversev2: { [K in keyof typeof nr as (typeof nr)[K]]: K } = {
		0: "September",
		1: "October",
		2: "November",
		3: "December",
	};

	type keys = keyof typeof nr;

	type values = (typeof nr)[keyof typeof nr];

	// this is a type, used inside types gives a type
	type bzz = typeof nr;

	// this is a runtime, returns an object, in runtime its object, in compilation its one of the options like function string etc
	const bzz2 = typeof nr;

	// blad przed runtime nie wie ze to obiekt wiec dupa
	//const bzz3= typeof nr as const;

	// NO LONGER IN USE BUT NICE 4 PRACTICE
	// reverse of nr, no longer in use but nice trick
	// type of nr => { September: 0; October: 1; November: 2 }
	// key type of nr so a union of keys "September" | "October" | "November"

	// example of using in:
	type A = "a" | "b" | "c";

	type MapA = {
		[K in A]: number;
	};

	type Example = {
		[K in A]: K;
	};
	// { a: number; b: number; c: number }

	// as to dodatek do przeksztalcenia/ filtrowania kluczy po tym jak je wyciagniemy przez in
	// tu np chcemy aby kluczami byly tylko stringi, po operacji przypisujemy kluczom wartosć K czyli wartość klucza
	type onlyStringWannaBe = "a" | 2 | "tt" | 6;

	// EXTENDS MOWI ZE JESLI TYP T DA SIE PRZYPISAC DO TYPU U TO ZROB COS W PRZECIWNYM PRZYPADKU ZROB COS INNEGO
	type onlyStringsSpecial = {
		[K in onlyStringWannaBe as K extends string ? K : never]: K;
	};

	const tylkostringi: onlyStringsSpecial = {
		a: "a",
		tt: "tt",
	};

	type onlyStrings = {
		[K in onlyStringWannaBe as K extends string ? K : never]: string;
	};

	// June July August September October November December January February March April May

	// K in keyof typeof nr iterujemy po wszystkich kluczach obiektu unii  nr czyli "September"|"Oct" etc
	// as (typeof nr)[K] tu zmieniamy nazwe klucza, wartosc pod tym kluczem w obiekcie nr
	// np dla K="September" -> typeof nr("September")=0
	// :K po [] mowie ze wartoscia w nowym typie pod tym kluczem jest oryginalny klucz
	const nrReverse: { [K in keyof typeof nr as (typeof nr)[K]]: K } = {
		0: "September",
		1: "October",
		2: "November",
		3: "December",
	};

	// months as literals and their type, months is now a typle with these exact types

	console.log(months[indexOfFirstMonth] + "TEEEEST");

	// zeby w inpucie edytowac wszystko potrzebujemy konkretny miesiac
	// w tym miesiacu konkretne pole
	// oraz wartosc na jaka zamieniamy
	const updateMonthlyDataV2 = (
		month: Month,
		field: keyof MonthlyData[keyof MonthlyData],
		value: number | string
	) => {
		// teraz trzeba zaktualizowac pola o to co dostalismy
		// aktualizujemy poprzedni stan a w useState da sie to zrobic poprzez uzycie
		// funkcji strzalkowej
		setMonthlyData((prev) => ({
			// otrzymujemy kopie poprzedniego stanu
			...prev,

			// wybieramy miesiac ktory chcemy edytowac
			[month]: {
				// musimy jeszcze pobrac wszystkie pola w tym miesiacu, jesli tego nie zrobimy to edycja zmiecie tamte z planszy

				...prev[month as keyof typeof prev],

				// w tym miesiacu musimy zidentyfikowac ktore pole
				// jesli damy samo field bez [] to wtedy dupa doda nam nowe pole a nie nadpisze
				[field]: Number(value),
			},
		}));
	};

	// robimy updated dla kazdego zmienionego pola z kazdego miesiaca
	const updateMonthlyDataV3 = (
		field: keyof MonthlyData[keyof MonthlyData],
		value: number | string
	) => {
		// teraz trzeba zaktualizowac pola o to co dostalismy
		// aktualizujemy poprzedni stan a w useState da sie to zrobic poprzez uzycie
		// funkcji strzalkowej
		setMonthlyData((prev) => {
			// nowy obiekt z wszytskimi miesiacami
			const updated = { ...prev };

			months.forEach((month) => {
				updated[month] = {
					// kopiujemy wszystkie poprzednie dane
					...updated[month],
					// a potem konkretne pole podmieniamy na wartosc
					[field]: Number(value),
				};
			});

			return updated;
		});
	};

	//function to update a month and specific data inside this month
	const updateMonthlyData = (
		month: Month,
		field: keyof Monthly,
		value: Number
	) => {
		// we take all the previous data
		// when we give function to a set attribute in setstate hook we can take previous values
		// console.error(value);
		setMonthlyData((prev) => ({
			// all the data inside is taken, were doing a copy
			// prev HAS A MONTHLYDATA TYPE!
			...prev,
			// we take our specific month
			// dynamic key if month is september we will edit a september
			[month]: {
				// in our specific month we take all the previous data
				// we take data from exact month, also making sure the month is one of keys from the prev value

				// keyof typeof prev=== keyof MonthlyData
				...prev[month as keyof typeof prev],
				// and we change the value, fiel we have given
				[field]: value || 0,
			},
		}));
	};

	const getMonthlyRevenue = (month: Month) => {
		const data = monthlyData[month];
		return data.nrOfStud * data.nrOfMeetings * data.ratePerStudPerMeeting;
	};

	const getTotalMonthlyRevenue = (month: Month) => {
		return getMonthlyRevenue(month);
	};

	// costs

	const [avgsalaryassumption, setavgsalaryassumption] = useState(0);
	const [workingdays, setworkingdays] = useState(0);

	const TeacherCostPerDay: number =
		workingdays > 0
			? Number((avgsalaryassumption / workingdays).toFixed(1))
			: 0;

	console.log(monthlyData);

	const getTeacherCost = (month: Month) => {
		const data = monthlyData[month];
		return Math.round(
			TeacherCostPerDay * data.nrOfTeachers * data.nrOfMeetings
		);
	};

	// sum of total costs

	const getAllCosts = (month: Month) => {
		const data = monthlyData[month];

		const costs = Number(
			data.studLicenses +
				getTeacherCost(month) +
				data.transportCost +
				data.childSafetyCert
		);

		return Number.isNaN(costs) ? 0 : costs;
	};

	console.log(getTeacherCost("September"));

	// pola które uznajemy za "istotne" (jeżeli którakolwiek >0 -> miesiąc NIE JEST pusty)
	//important fields, without them nothing will pop up

	// NO LONGER IN USE BUT PRACTICE
	const meaningfulKeys: (keyof Monthly)[] = [
		"nrOfStud",

		"nrOfTeachers",
		"nrOfMeetings",
		"ratePerStudPerMeeting",
	];

	// helper: czy miesiąc ma jakieś istotne dane?
	// ALSO NO LONGER IN USE!
	const hasMeaningfulData = (month: Month): boolean =>
		// we have all important keys
		meaningfulKeys.some((k) => {
			// v is a number of every month and its field
			const v = monthlyData[month][k];
			// if its number and more than zero then fine
			return v !== undefined && v !== null && v !== 0;
		});

	const monthlyProfit_Loss = (month: Month) => {
		return getTotalMonthlyRevenue(month) - getAllCosts(month);
	};
	// const cashFlow v2

	//monthlyProfit_Loss

	// zliczenie pieniedzy na podstawie kazdego miesiaca wsn poprzedniego
	const cashFlowv2 = (month: Month) => {
		// najpierw trzeba pobrac index danego miesiaca
		const index = months.indexOf(month);

		// potem przefiltrowac po miesiacach do tego indexu i dodac sume profit_Loss

		let sum = 0;
		for (let i = 0; i <= index; i++) {
			sum += monthlyProfit_Loss(months[i]);
		}

		return sum;
	};

	let tescik = 0;

	const suma = () => {
		tescik += 5;
	};

	suma();

	console.log(tescik + "BZBZBZBZBZ");

	const cashFlow = (month: Month) => {
		const idx = months.indexOf(month);
		if (idx === -1) return 0;

		let sum = 0;
		for (let i = 0; i <= idx; i++) {
			const v = monthlyProfit_Loss(months[i]);
			sum += Number.isFinite(v) ? v : 0;
		}
		return sum;
	};

	// Style dla PDF
	const styles = StyleSheet.create({
		page: { padding: 30, fontSize: 10 },
		title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
		table: { width: "100%", marginTop: 10 },
		tableRow: {
			flexDirection: "row",
			borderBottomWidth: 1,
			borderBottomColor: "#000",
		},
		headerRow: { backgroundColor: "#d1d5db", fontWeight: "bold" }, // szary 400
		tableCell: { padding: 8, flex: 1, fontSize: 9, textAlign: "center" },
		firstCell: { textAlign: "left", flex: 1.5 },

		// better colors
		greenRow: { backgroundColor: "#86efac" }, // zielony 300
		redRow: { backgroundColor: "#fca5a5" }, // czerwony 300
		indigoRow: { backgroundColor: "#a5b4fc" }, // indigo 300
		purpleRow: { backgroundColor: "#d8b4fe" }, // fiolet 300

		summaryTable: { flex: 1, flexDirection: "row", padding: 8 },
	});

	// Komponent PDF 
	const MyDocument = ({
		months,
		getMonthlyRevenue,
		getAllCosts,
		monthlyProfit_Loss,
		getTotalMonthlyRevenue,
		cashFlow,
		avgsalaryassumption,
		workingDays,
		teacherCostPerDay,
		monthlyData,
		getTeacherCost,
	}: any) => (
		<Document>
			<Page size="A4" orientation="landscape" style={styles.page}>
				<Text style={styles.title}>Complete Financial Report</Text>

				{/* Basic Assumptions */}
				<View
					style={{ marginBottom: 10, padding: 8, backgroundColor: "#f3f4f6" }}>
					<Text style={{ fontSize: 11, fontWeight: "bold", marginBottom: 4 }}>
						Teacher Cost Calculation
					</Text>
					<View style={{ flexDirection: "row", gap: 15, fontSize: 9 }}>
						<Text>Avg Salary Assumption: {avgsalaryassumption}</Text>
						<Text>Working Days: {workingDays}</Text>
						<Text>Teacher Cost Per Day: {teacherCostPerDay}</Text>
					</View>
				</View>

				{/* Global Settings */}
				<View
					style={{ marginBottom: 10, padding: 8, backgroundColor: "#dbeafe" }}>
					<Text style={{ fontSize: 11, fontWeight: "bold", marginBottom: 4 }}>
						Global Settings (Apply to All Months)
					</Text>
					<View style={{ flexDirection: "row", gap: 15, fontSize: 9 }}>
						<Text>
							Number of Teachers: {monthlyData[months[0]]?.nrOfTeachers || 0}
						</Text>
						<Text>
							Number of Students: {monthlyData[months[0]]?.nrOfStud || 0}
						</Text>
						<Text>
							Rate per Student per Meeting:{" "}
							{monthlyData[months[0]]?.ratePerStudPerMeeting || 0}
						</Text>
					</View>
				</View>

				{/* First Month One-time Costs */}
				<View
					style={{ marginBottom: 10, padding: 8, backgroundColor: "#fef3c7" }}>
					<Text style={{ fontSize: 11, fontWeight: "bold", marginBottom: 4 }}>
						First Month One-time Costs ({months[0]})
					</Text>
					<View style={{ flexDirection: "row", gap: 15, fontSize: 9 }}>
						<Text>
							Student Licenses: {monthlyData[months[0]]?.studLicenses || 0}
						</Text>
						<Text>
							Child Safety Certifications:{" "}
							{monthlyData[months[0]]?.childSafetyCert || 0}
						</Text>
					</View>
				</View>

				{/* Complete Monthly Data Table */}
				<View style={{ marginBottom: 10 }}>
					<Text style={{ fontSize: 11, fontWeight: "bold", marginBottom: 6 }}>
						Complete Monthly Input Data
					</Text>
					<View style={styles.table}>
						<View style={[styles.tableRow, styles.headerRow]}>
							<Text style={[styles.tableCell, { flex: 1 }]}>Month</Text>
							<Text style={[styles.tableCell, { flex: 0.8 }]}>Teachers</Text>
							<Text style={[styles.tableCell, { flex: 0.8 }]}>Students</Text>
							<Text style={[styles.tableCell, { flex: 0.8 }]}>Meetings</Text>
							<Text style={[styles.tableCell, { flex: 0.9 }]}>Rate/Stud</Text>
							<Text style={[styles.tableCell, { flex: 0.9 }]}>Transport</Text>
							<Text style={[styles.tableCell, { flex: 1 }]}>Teacher Cost</Text>
							<Text style={[styles.tableCell, { flex: 1 }]}>Stud Lic</Text>
							<Text style={[styles.tableCell, { flex: 1 }]}>Child Safe</Text>
						</View>
						{months.map((month: Month) => (
							<View key={month} style={styles.tableRow}>
								<Text style={[styles.tableCell, { flex: 1 }]}>{month}</Text>
								<Text style={[styles.tableCell, { flex: 0.8 }]}>
									{monthlyData[month]?.nrOfTeachers || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 0.8 }]}>
									{monthlyData[month]?.nrOfStud || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 0.8 }]}>
									{monthlyData[month]?.nrOfMeetings || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 0.9 }]}>
									{monthlyData[month]?.ratePerStudPerMeeting || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 0.9 }]}>
									{monthlyData[month]?.transportCost || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 1 }]}>
									{getTeacherCost(month)}
								</Text>
								<Text style={[styles.tableCell, { flex: 1 }]}>
									{monthlyData[month]?.studLicenses || 0}
								</Text>
								<Text style={[styles.tableCell, { flex: 1 }]}>
									{monthlyData[month]?.childSafetyCert || 0}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Financial Summary Table */}
				<Text
					style={{
						fontSize: 11,
						fontWeight: "bold",
						marginBottom: 6,
						marginTop: 8,
					}}>
					Financial Summary & Calculations
				</Text>
				<View style={styles.table}>
					{/* Header */}
					<View style={[styles.tableRow, styles.headerRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>
							Metric / Month
						</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{month}
							</Text>
						))}
					</View>

					{/* Monthly Revenue */}
					<View style={[styles.tableRow, styles.greenRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>
							Monthly Revenue
						</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{getMonthlyRevenue(month)}
							</Text>
						))}
					</View>

					{/* Monthly Costs */}
					<View style={[styles.tableRow, styles.redRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>
							Monthly TOTAL Costs
						</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{getAllCosts(month)}
							</Text>
						))}
					</View>

					{/* Monthly Profit/Loss */}
					<View style={[styles.tableRow, styles.indigoRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>
							Monthly Profit/Loss
						</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{monthlyProfit_Loss(month)}
							</Text>
						))}
					</View>

					{/* Monthly Profitability % */}
					<View style={[styles.tableRow, styles.purpleRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>
							Monthly Profitability %
						</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{getTotalMonthlyRevenue(month) === 0
									? "0%"
									: (
											(monthlyProfit_Loss(month) /
												getTotalMonthlyRevenue(month)) *
											100
									  ).toFixed(2) + "%"}
							</Text>
						))}
					</View>

					{/* Cashflow */}
					<View style={[styles.tableRow, styles.indigoRow]}>
						<Text style={[styles.tableCell, styles.firstCell]}>Cashflow</Text>
						{months.map((month: Month) => (
							<Text key={month} style={styles.tableCell}>
								{cashFlow(month)}
							</Text>
						))}
					</View>
				</View>

				{/* Summary */}
				<View
					style={{ marginTop: 20, padding: 10, backgroundColor: "#f3f4f6" }}>
					<Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
						Summary
					</Text>
					<Text>
						Total Revenue:{" "}
						{months
							.reduce(
								(sum: number, month: Month) =>
									sum + getTotalMonthlyRevenue(month),
								0
							)
							.toLocaleString()}
					</Text>
					<Text>
						Total Costs:{" "}
						{months
							.reduce(
								(sum: number, month: Month) => sum + getAllCosts(month),
								0
							)
							.toLocaleString()}
					</Text>
					<Text>
						Total Profit:{" "}
						{months
							.reduce(
								(sum: number, month: Month) => sum + monthlyProfit_Loss(month),
								0
							)
							.toLocaleString()}
					</Text>
				</View>
			</Page>
		</Document>
	);

	/*
	months={months} 
	getMonthlyRevenue={getMonthlyRevenue} 
	getAllCosts={getAllCosts} 
	monthlyProfit_Loss={monthlyProfit_Loss} 
	getTotalMonthlyRevenue={getTotalMonthlyRevenue} 
	cashFlow={cashFlow} 
	avgsalaryassumption={avgsalaryassumption} 
	workingDays={workingdays}
	*/
	const generatePDF = async () => {
		// binarna zawartość PDF trzymana w RAM przeglądarki!
		const blob = await pdf(
			<MyDocument
				months={months}
				getMonthlyRevenue={getMonthlyRevenue}
				getAllCosts={getAllCosts}
				monthlyProfit_Loss={monthlyProfit_Loss}
				getTotalMonthlyRevenue={getTotalMonthlyRevenue}
				cashFlow={cashFlow}
				avgsalaryassumption={avgsalaryassumption}
				workingDays={workingdays}
				// these below added
				teacherCostPerDay={TeacherCostPerDay}
				monthlyData={monthlyData}
				getTeacherCost={getTeacherCost}
			/>
		).toBlob();

		// debug: sprawdź czy to Blob
		console.log("PDF blob:", blob);

		// tworzenie linku do tej binarnej zawartości!
		const url = URL.createObjectURL(blob);
		// dodajemy link do dokumentu! ten link siedzi w pamieci js, nie w dom bo go nie dodalismy!
		const link = document.createElement("a");
		// ustalamy href na ten url, czyli jesli by ktos nacisnal na link to wiadomo zabiera go tam
		link.href = url;
		// dodatkowo download mowi ze rzeczy pod tym maja zostac zapisane na PC pod nazwa taka i rozszerzeniem .pdf
		link.download = "financial-report.pdf";
		// wywolujemy ten link
		link.click();
		// czyscimy
		URL.revokeObjectURL(url); // Cleanup
	};

	return (
		// minimalna wysokosc to ekran wiec 100vh
		// MAIN DOCELOWO MA 100% SZEROKOSCI ELEMENT BLOKOWY!
		// wszystkie elementy w mainie maja sie ukladac w kolumnie, oraz ma zajmowac cala wysokosc koniec i czesc
		<main className="flex flex-col min-h-screen  bg-gray-50 dark:bg-gray-900 p-4 ">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* w tym divie elementy maja sie ukladac w kolumnie a przestrzen miedzy nimi oddalona o gap-6 */}
			<div className="flex flex-col gap-6  ">
				{/* w tym divie karty ukladaja sie w rzedzie dzieki flex */}
				{/* zajmuje on pelna szerokosc swojego rodzica czyli diva wyzej (osiagalne bez w-full bo div zawsze zajmuje 100% szerokosci rodzica)! */}
				{/* flex wrap powoduje ze karty lamia sie do nowej linii gdy nie ma miejsca */}
				{/* te dwie karty zawsze wysrodkowane */}
				{/* warto pamietac tutaj, ze karty rozciagaja sie w stosunku do najwiekszej jesli jest flex wiec stretching nastepuje automatycznie! */}
				<div className="flex  gap-5 flex-wrap justify-center">
					{/* rzeczy w kartach sa ulozone za pomoca flexa, flex idzie jako kolumna */}
					{/* szerokosc karty jest maksymalna, jednak nie wieksza niz lg, dodatkowo w sorku nalozony padding */}

					<Card className=" flex flex-col w-full p-10 max-w-lg">
						<CardHeader className="px-0 pt-0">
							<CardTitle className="text-2xl text-center">Basic Data</CardTitle>
						</CardHeader>

						<div className="bg-gray-100 dark:bg-gray-800 space-y-4 p-4  rounded-lg border border-black dark:border-gray-700">
							{/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg Salary Assumption</label> */}

							<p className="mb-7 text-sm text-center  text-black dark:text-white font-medium">
								<span className=" border-b pb-1 border-gray-200">
									Teacher Cost Calculation
								</span>
							</p>
							<div>
								<label className="block mb-1">Avg Salary Assumption</label>
								<Input
									type="text"
									onChange={(e) => {
										setavgsalaryassumption(Number(e.target.value));
									}}></Input>
							</div>

							<div>
								<label className="block mb-1">Working Days</label>
								<Input
									className="border border-black dark:border-white "
									type="text"
									onChange={(e) => {
										setworkingdays(Number(e.target.value));
									}}></Input>
							</div>
							<p>
								Teacher Cost Per Day:{" "}
								{!Number.isNaN(TeacherCostPerDay) &&
								Number.isFinite(TeacherCostPerDay)
									? TeacherCostPerDay
									: 0}
							</p>
						</div>

						<div className="bg-blue-50 dark:bg-blue-900/20 space-y-4 p-5 rounded-lg border border-black dark:border-blue-800">
							<p className="mb-7 text-sm text-center  text-black dark:text-white font-medium">
								<span className=" border-b-1 pb-1 border-gray-200">
									These inputs will apply for every month
								</span>
							</p>
							<div className="space-y-3">
								<div className="space-y-2">
									<label className="block mb-1">Number of teachers</label>
									<Input
										type="text"
										// BEZ VALUE, Jesli damy value tak konflikt interesow, zmiana z stringa na number, duza ilosc konwertowania niszczy tutaj mase rzeczy

										// value={
										// 	monthlyData[firstMonth].nrOfTeachers == 0
										// 		? ""
										// 		: monthlyData[firstMonth].nrOfTeachers
										// }
										// update for every month there is
										onChange={(e) => {
											updateMonthlyDataV3("nrOfTeachers", e.target.value);
										}}></Input>
								</div>

								<div className="space-y-2">
									<label className="block mb-1">Number of Students</label>
									<Input
										type="text"
										// value from our months data, always synchronised
										// value={
										// 	monthlyData[firstMonth].nrOfStud == 0
										// 		? ""
										// 		: monthlyData[firstMonth].nrOfStud
										// }
										onChange={(e) =>
											updateMonthlyDataV3("nrOfStud", e.target.value)
										}></Input>
								</div>

								<div className="space-y-2">
									<label className="block mb-1">
										Rate per Student per Meeting{" "}
									</label>
									<Input
										type="text"
										// value={
										// 	monthlyData[firstMonth].ratePerStudPerMeeting == 0
										// 		? ""
										// 		: monthlyData[firstMonth].ratePerStudPerMeeting
										// }
										onChange={(e) => {
											updateMonthlyDataV3(
												"ratePerStudPerMeeting",
												e.target.value
											);
										}}></Input>
								</div>
							</div>
						</div>

						<div className="bg-amber-50 dark:bg-amber-900/20 space-y-4 p-5 rounded-lg border border-black dark:border-amber-800">
							<p className="mb-7 text-sm text-center text-black dark:text-white font-medium">
								<span className=" border-b-1 pb-1 border-gray-200">
									These costs apply only to the first month
								</span>
							</p>
							<div className="space-y-3">
								<label className="block mb-1">Student Licenses</label>
								<Input
									type="text"
									// jesli 1 mies to pokazujemy dane w kazdym nastepnym 0
									// value={monthlyData[firstMonth].studLicenses}
									onChange={(e) => {
										updateMonthlyData(
											firstMonth,
											"studLicenses",
											Number(e.target.value)
										);
									}}></Input>

								<label className="block mb-1">
									Child Safety Certifications
								</label>
								<Input
									type="text"
									// jesli 1 mies to pokazujemy dane w kazdym nastepnym 0
									// value={monthlyData[firstMonth].childSafetyCert}
									onChange={(e) => {
										updateMonthlyData(
											firstMonth,
											"childSafetyCert",
											Number(e.target.value)
										);
									}}></Input>
							</div>
						</div>
					</Card>

					{/* left column, here card takes also a full width but not more than lg */}

					<Card className="flex flex-col p-9 w-full max-w-lg">
						<CardHeader className="px-0 pt-0">
							<CardTitle className="text-2xl text-center">
								Monthly info
							</CardTitle>
						</CardHeader>

						<CardDescription className="text-sm mt-2 text-center max-w-md  text-black dark:text-white">
							These informations change every month. Teacher cost is calculated
							<span className=" border-b-1 pb-1 border-gray-200">
								{" "}
								automatically.
							</span>
						</CardDescription>

						<CardContent>
							<div className=" space-y-5 ">
								{months.map((month, index) => (
									<div
										key={month}
										className="border border-black dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
										<h3 className="font-semibold text-base mb-3 text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
											{month}
										</h3>

										<div className="flex flex-col gap-3">
											<div>
												<label className="block mb-0.5">Nr of Meetings </label>
												<Input
													type="text"
													// value={
													// 	monthlyData[month].nrOfMeetings == 0
													// 		? ""
													// 		: monthlyData[month].nrOfMeetings
													// }
													onChange={(e) => {
														updateMonthlyData(
															month,
															"nrOfMeetings",
															Number(e.target.value)
														);
													}}></Input>
											</div>

											<div>
												<label className="block mb-0.5">Transport Cost </label>
												<Input
													className="max-w-full overflow-hidden text-ellipsis"
													type="text"
													// value={monthlyData[month].transportCost}
													onChange={(e) => {
														updateMonthlyData(
															month,
															"transportCost",
															Number(e.target.value)
														);
													}}></Input>
											</div>

											<div>
												<label className="block mb-0.5">
													Teacher Cost (calculated, readonly){" "}
												</label>
												<Input
													className="!bg-blue-800 dark:!bg-blue-950 read-only:!bg-blue-800 dark:read-only:!bg-blue-950 text-white"
													type="number"
													value={getTeacherCost(month)}
													readOnly></Input>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
				{/* turns out we dont have to add flex-col bcs card already have it xd */}

				<CalcOutput
					months={months}
					getMonthlyRevenue={getMonthlyRevenue}
					getAllCosts={getAllCosts}
					monthlyProfit_Loss={monthlyProfit_Loss}
					getTotalMonthlyRevenue={getTotalMonthlyRevenue}
					cashFlow={cashFlow}
					generatePDF={generatePDF}
				/>
			</div>
		</main>
	);
}

type CalcOutputProps = {
	months: ReadonlyArray<Month>;
	getMonthlyRevenue: any;
	getAllCosts: any;
	monthlyProfit_Loss: any;
	getTotalMonthlyRevenue: any;
	cashFlow: any;
	generatePDF: any;
};

function CalcOutput({
	months,
	getMonthlyRevenue,
	getAllCosts,
	monthlyProfit_Loss,
	getTotalMonthlyRevenue,
	cashFlow,
	generatePDF,
}: CalcOutputProps) {
	return (
		<Card>
			<CardHeader className="text-center">Calculations output</CardHeader>

			{/* generates a PDF Report */}
			<Button
				onClick={generatePDF}
				variant="outline"
				className="mx-auto max-w-sm text-center bg-gray-500 dark:bg-amber-50 dark:text-black ">
				📄 Download PDF Report
			</Button>
			{/* ! na koncu non null assertion! */}
			<CardContent>
				{/* pozwala na przewijanie tabeli poziomo gdy nie miesci sie na ekranie */}
				<div className="overflow-x-auto ">
					{/* tabela zajmuje pelna szerokosc karty dzieki w-full  */}
					<table className="w-full text-sm  border-collapse">
						<thead>
							<tr className="border-b">
								<th className="text-left p-2 font-bold">Metric / Month</th>
								{months.map((month) => (
									<th key={month} className="text-center p-2 font-bold">
										{month}
									</th>
								))}
							</tr>
						</thead>

						{/* cialo naszej tabeli */}
						<tbody>
							{/* tr to rząd */}
							<tr className="border-b bg-green-300 dark:bg-green-900/20">
								{/* td pojedyncza komorka w rzedzie */}
								<td className="p-2 font-medium text-left">Monthly Revenue</td>

								{months.map((month, index) => (
									<td key={index} className="text-center p-2">
										{getMonthlyRevenue(month)}
									</td>
								))}
							</tr>

							<tr className="border-b bg-red-300 dark:bg-red-900/20">
								<td className="p-2 font-medium text-left">
									Monthly TOTAL Costs
								</td>

								{months.map((month, index) => (
									<td key={month} className="text-center p-2">
										{getAllCosts(month)}
									</td>
								))}
							</tr>

							<tr className="border-b bg-indigo-300 dark:bg-indigo-900/20">
								<td className="p-2 font-medium text-left">
									Monthly Profit/Lost
								</td>

								{months.map((month, index) => (
									<td key={month} className="text-center p-2">
										{monthlyProfit_Loss(month)}
									</td>
								))}
							</tr>

							<tr className="border-b bg-purple-300 dark:bg-purple-900/20">
								<td className="p-2 font-medium text-left">
									Monthly Profitability %{" "}
								</td>

								{months.map((month, index) => (
									<td key={month} className="text-center p-2">
										{getTotalMonthlyRevenue(month) === 0
											? "0%"
											: (
													(monthlyProfit_Loss(month) /
														getTotalMonthlyRevenue(month)) *
													100
											  ).toFixed(2) + "%"}
									</td>
								))}
							</tr>

							<tr className="border-b bg-indigo-300 dark:bg-indigo-900/20">
								<td className="p-2 font-medium text-left"> Cashflow </td>

								{months.map((month, index) => (
									<td key={month} className="text-center p-2">
										{cashFlow(month)}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>

				<div className="mt-6 p-4 bg-gray-300 dark:bg-gray-800 rounded-lg">
					<h4 className="font-bold mb-7 text-center">📊 Summary</h4>

					{/* domyslnie 2 kolumny, od md przechodzimy na 4 */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
						<div>
							<div className="text-gray-600 dark:text-gray-400">
								Total Revenue
							</div>
							<div className="font-bold text-lg text-green-600">
								{months
									// reduce sums things into sum , and fires the fucntion with all the months
									.reduce(
										(sum, month) => sum + getTotalMonthlyRevenue(month),
										0
									)
									.toLocaleString()}
							</div>
						</div>
						<div>
							<div className="text-gray-600 dark:text-gray-400">
								Total Costs
							</div>
							<div className="font-bold text-lg text-red-600">
								{months
									.reduce((sum, month) => sum + getAllCosts(month), 0)
									.toLocaleString()}
							</div>
						</div>
						<div>
							<div className="text-gray-600 dark:text-gray-400">
								Total Profit
							</div>
							<div className="font-bold text-lg text-blue-600">
								{months
									.reduce((sum, month) => sum + monthlyProfit_Loss(month), 0)
									.toLocaleString()}
							</div>
						</div>
						<div>
							<div className="text-gray-600 dark:text-gray-400">
								Total Profit %
							</div>
							<div className="font-bold text-lg text-purple-600">
								{(() => {
									const totalRevenue = months.reduce(
										(sum, month) => sum + getTotalMonthlyRevenue(month),
										0
									);
									const totalProfit = months.reduce(
										(sum, month) => sum + monthlyProfit_Loss(month),
										0
									);

									return totalRevenue === 0
										? "0%"
										: ((totalProfit / totalRevenue) * 100).toFixed(2) + "%";
								})()}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
