"use client";

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

export default function MainnnPage() {
	const { setTheme } = useTheme();

	// NO LONGER IN USE BUT NICE 4 PRACTICE
	const nr: Record<Month, number> = {
		September: 0,
		October: 1,
		November: 2,
		December: 3,
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
	const months = ["September", "October", "November", "December"] as const;

	const indexOfFirstMonth = months.indexOf(months[0]);

	const firstMonth = months[0];

	console.log(months[indexOfFirstMonth] + "TEEEEST");

	// union of all months, give all the indecs, returns a union. TS trick
	type Month = (typeof months)[number];

	// type of a one month
	type Monthly = {
		nrOfStudPIE: number;
		nrOfStudPEL: number;
		nrOfTeachers: number;
		nrOfMeetingsPIE: number;
		nrOfMeetingsPEL: number;
		ratePerStudPerMeetingPIE: number;
		ratePerStudPerMeetingPEL: number;
		studLicenses: number;
		//teacherCostPIE: number;
		//teacherCostPEL: number;
		transportCostPIE: number;
		transportCostPEL: number;
		childSafetyCert: number;
	};

	// type as a whole, keys are September,Oct etc
	// Value is a type of Month with all the values
	type MonthlyData = Record<Month, Monthly>;

	// ROZWIĄZANIE 1: Jeden obiekt z danymi dla wszystkich miesięcy
	// here we give info about useState keys and data of starting point
	const [monthlyData, setMonthlyData] = useState<MonthlyData>({
		September: {
			nrOfStudPIE: 0,
			nrOfStudPEL: 0,
			nrOfTeachers: 0,
			nrOfMeetingsPIE: 0,
			nrOfMeetingsPEL: 0,
			ratePerStudPerMeetingPIE: 0,
			ratePerStudPerMeetingPEL: 0,
			// Costs
			studLicenses: 0,
			//teacherCostPIE: 0,
			transportCostPIE: 0,
			//teacherCostPEL: 0,
			transportCostPEL: 0,
			childSafetyCert: 0,
		},
		October: {
			nrOfStudPIE: 0,
			nrOfStudPEL: 0,
			nrOfTeachers: 0,
			nrOfMeetingsPIE: 0,
			nrOfMeetingsPEL: 0,
			ratePerStudPerMeetingPIE: 0,
			ratePerStudPerMeetingPEL: 0,
			// Costs
			studLicenses: 0,
			//teacherCostPIE: 0,
			//teacherCostPEL: 0,
			transportCostPIE: 0,
			transportCostPEL: 0,
			childSafetyCert: 0,
		},
		November: {
			nrOfStudPIE: 0,
			nrOfStudPEL: 0,
			nrOfTeachers: 0,
			nrOfMeetingsPIE: 0,
			nrOfMeetingsPEL: 0,
			ratePerStudPerMeetingPIE: 0,
			ratePerStudPerMeetingPEL: 0,
			// Costs
			studLicenses: 0,
			// taking the costs out, now they are a result of a function
			//teacherCostPIE: 0,
			//teacherCostPEL: 0,
			transportCostPIE: 0,
			transportCostPEL: 0,
			childSafetyCert: 0,
		},
		December: {
			nrOfStudPIE: 0,
			nrOfStudPEL: 0,
			nrOfTeachers: 0,
			nrOfMeetingsPIE: 0,
			nrOfMeetingsPEL: 0,
			ratePerStudPerMeetingPIE: 0,
			ratePerStudPerMeetingPEL: 0,
			// Costs
			studLicenses: 0,
			// taking the costs out, now they are a result of a function
			//teacherCostPIE: 0,
			//teacherCostPEL: 0,
			transportCostPIE: 0,
			transportCostPEL: 0,
			childSafetyCert: 0,
		},
	});

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
			const updated ={...prev};

				months.forEach((month)=>{
					updated[month]={
						...updated[month],
						[field]:Number(value)
					}
				});

				return updated;
		});
	};

	//function to update a month and specific data inside this month
	const updateMonthlyData = (
		month: Month,
		field: keyof Monthly,
		value: string | number
	) => {
		// we take all the previous data
		// when we give function to a set attribute in setstate hook we can take previous values
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
				[field]: Number(value) || 0,
			},
		}));
	};

	const getMonthlyRevenuePIE = (month: Month) => {
		const data = monthlyData[month];
		return (
			data.nrOfStudPIE * data.nrOfMeetingsPIE * data.ratePerStudPerMeetingPIE
		);
	};
	const getMonthlyRevenuePEL = (month: Month) => {
		const data = monthlyData[month];

		return (
			data.nrOfMeetingsPEL * data.nrOfStudPEL * data.ratePerStudPerMeetingPEL
		);
	};
	const getTotalMonthlyRevenue = (month: Month) => {
		return getMonthlyRevenuePIE(month) + getMonthlyRevenuePEL(month);
	};

	// costs

	const [avgsalaryassumption, setavgsalaryassumption] = useState(0);
	const [workingdays, setworkingdays] = useState(0);

	const TeacherCostPerDay: number =
		workingdays > 0
			? Number((avgsalaryassumption / workingdays).toFixed(1))
			: 0;

	console.log(monthlyData);

	const getTeacherCostPIE = (month: Month) => {
		const data = monthlyData[month];
		return Math.round(
			TeacherCostPerDay * data.nrOfTeachers * data.nrOfMeetingsPIE
		);
	};

	const getTeacherCostPEL = (month: Month) => {
		const data = monthlyData[month];
		return Math.round(
			TeacherCostPerDay * data.nrOfTeachers * data.nrOfMeetingsPEL
		);
	};

	// sum of total costs

	const getAllCosts = (month: Month) => {
		const data = monthlyData[month];

		const costs = Number(
			data.studLicenses +
				getTeacherCostPIE(month) +
				getTeacherCostPEL(month) +
				data.transportCostPIE +
				data.transportCostPEL +
				data.childSafetyCert
		);

		return Number.isNaN(costs) ? 0 : costs;
	};

	console.log(getTeacherCostPIE("September"));

	// pola które uznajemy za "istotne" (jeżeli którakolwiek >0 -> miesiąc NIE JEST pusty)
	//important fields, without them nothing will pop up

	// NO LONGER IN USE BUT PRACTICE
	const meaningfulKeys: (keyof Monthly)[] = [
		"nrOfStudPIE",
		"nrOfStudPEL",
		"nrOfTeachers",
		"nrOfMeetingsPIE",
		"nrOfMeetingsPEL",
		"ratePerStudPerMeetingPIE",
		"ratePerStudPerMeetingPEL",
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

	return (
		// minimalna wysokosc to ekran wiec 100vh
		// MAIN DOCELOWO MA 100% ELEMENT BLOKOWY!
		<main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 p-4 ">
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

			{/* we give a max width, also we center it horizontally by mx-auto */}
			{/* <div className="max-w-7xl mx-auto"> */}
			{/* it will be in a grid so normally everything inside one column, from lg 3 columns */}
			{/* DIV BASICOWO ZAJMUJE 100% RODZICA! */}
			{/* max-w kolumny mają pulap szerokosci, max 1280px, gdy rozciagam grid przestaje rosnac po 1280, kolumny maja stala szerokosc */}
			{/* mx-auto karty zawsze wysrodkowane i basta */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto max-w-7xl  ">
				{/* Left Column */}

				{/* what is inside the Card will be vertically due to flex, card takes full width of the column but not more than sm~24rem */}
				{/* BEZ MAX-W-SM TA KARTA WEZMIE CALA SZEROKOSC DIVA ALE TYLKO JEDNA KOLUMNE BO JEST GRID KTORY DZIELI DIVA NA 3 ROWNE CZESCI, OZNACZA TO TYLE, ZE PO PROSTU WEZMIE FULL SZEROKOSCI GRIDA. BEZ TEGO WZIELABY CALA SZEROKOSC DIVA CZYLI RODZICA! */}
				<Card className=" flex flex-col  p-10  w-full max-w-sm">
					<CardHeader>Basic Data</CardHeader>

					<h2>Teacher cost Calculation</h2>
					<div className="bg-gray-300 dark:bg-gray-900 space-y-3 p-5 rounded-2xl">
						<p>Avg Salary Assumption</p>
						<Input
							type="text"
							onChange={(e) => {
								setavgsalaryassumption(Number(e.target.value));
							}}></Input>

						<p>Working Days</p>
						<Input
							type="text"
							onChange={(e) => {
								setworkingdays(Number(e.target.value));
							}}></Input>

						<p>
							Teacher Cost Per Day:{" "}
							{!Number.isNaN(TeacherCostPerDay) &&
							Number.isFinite(TeacherCostPerDay)
								? TeacherCostPerDay
								: 0}
						</p>
					</div>
				</Card>

				{/* Middle column, here card takes also a full width but not more than md */}
				<Card className="flex flex-col  p-10 w-full max-w-md">
					<CardHeader>Monthly info</CardHeader>

					<CardContent>
						<div className=" space-y-3 ">
							{months.map((month, index) => (
								<div key={month}>
									<h2>Month: {month}</h2>

									{/* robi dwie kolumny dla par label input  items-center wyrownuje elementu pionowo do srodka*/}
									<div className="grid grid-cols-2 gap-2 text-xs border border-black dark:border-amber-50 p-3 rounded-2xl items-center">
										<p>Nr of Teachers</p>
										<Input
											type="text"
											value={
												// jesli nie damy tego zabezpieczenia stan bedzie powracal za kazdym razem do pustego "", wtedy nie mozemy doklejac wartosci bo stan za kazdym razem sie resetuje
												monthlyData[month].nrOfTeachers == 0 &&
												month == months[indexOfFirstMonth]
													? ""
													: monthlyData[months[indexOfFirstMonth]].nrOfTeachers
											} 
											onChange={(e) => {
												updateMonthlyDataV3(
												
													"nrOfTeachers",
													e.target.value
												);
											}}
											readOnly={month !== firstMonth}></Input>

										<p>Nr of Students PIE</p>
										<Input
											type="text"
											// value from our months data, always synchronised
											value={
												monthlyData[month].nrOfStudPIE == 0 && month==months[indexOfFirstMonth]
													? ""
													: monthlyData[firstMonth].nrOfStudPIE
											}
											onChange={(e) =>
												updateMonthlyData(firstMonth, "nrOfStudPIE", e.target.value)
											}
											
											readOnly={month!==firstMonth}
											></Input>

										<p>Nr of Students PEL</p>
										<Input
											type="text"
											value={
												monthlyData[month].nrOfStudPEL == 0
													? ""
													: monthlyData[month].nrOfStudPEL
											}
											onChange={(e) => {
												updateMonthlyData(month, "nrOfStudPEL", e.target.value);
											}}></Input>

										<p>Nr of Meetings PIE</p>
										<Input
											type="text"
											value={
												monthlyData[month].nrOfMeetingsPIE == 0
													? ""
													: monthlyData[month].nrOfMeetingsPIE
											}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"nrOfMeetingsPIE",
													e.target.value
												);
											}}></Input>

										<p>Nr of Meeting PEL</p>
										<Input
											type="text"
											value={
												monthlyData[month].nrOfMeetingsPEL == 0
													? ""
													: monthlyData[month].nrOfMeetingsPEL
											}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"nrOfMeetingsPEL",
													e.target.value
												);
											}}></Input>

										<p>Rate per Student per Meeting PIE</p>
										<Input
											type="text"
											value={
												monthlyData[month].ratePerStudPerMeetingPIE == 0 && month==months[indexOfFirstMonth]
													? ""
													: monthlyData[firstMonth].ratePerStudPerMeetingPIE
											}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"ratePerStudPerMeetingPIE",
													e.target.value
												);
											}}
											
											readOnly={month!==firstMonth}
											></Input>

										<p>Rate per Student per Meeting PEL</p>
										<Input
											type="text"
											value={
												monthlyData[month].ratePerStudPerMeetingPEL == 0
													? ""
													: monthlyData[month].ratePerStudPerMeetingPEL
											}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"ratePerStudPerMeetingPEL",
													e.target.value
												);
											}}></Input>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* turns out we dont have to add flex-col bcs card already have it xd */}
				<Card className="w-full ">
					<CardHeader>Costs</CardHeader>

					<CardContent>
						<div className=" space-y-3 ">
							{months.map((month, index) => (
								<div key={month}>
									<h2>Month: {month}</h2>

									<div className="grid grid-cols-2 gap-2 p-3 text-xs items-center border border-black dark:border-amber-50 rounded-2xl ">
										<p>Student Licenses</p>
										<Input
											type="text"
											value={monthlyData[month].studLicenses}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"studLicenses",
													Number(e.target.value)
												);
											}}></Input>

										<p>Teacher Cost PIE</p>
										<Input
											type="number"
											// value={monthlyData[month].teacherCostPIE==0?"":monthlyData[month].teacherCostPIE}

											value={getTeacherCostPIE(month)}
											// onChange={(e) => {
											// 	updateMonthlyData(month,"teacherCostPIE",Number(e.target.value))
											// }}
											readOnly></Input>

										<p>Teacher Cost PEL</p>
										<Input
											type="number"
											// value={monthlyData[month].teacherCostPEL==0?"":monthlyData[month].teacherCostPEL}

											value={getTeacherCostPEL(month)}
											// onChange={(e) => {
											// 	updateMonthlyData(month,"teacherCostPEL", Number(e.target.value))
											// }}
											readOnly></Input>

										<p>Transport Cost PIE</p>
										<Input
											type="text"
											value={monthlyData[month].transportCostPIE}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"transportCostPIE",
													Number(e.target.value)
												);
											}}></Input>

										<p>Transport Cost PEL</p>
										<Input
											type="text"
											value={monthlyData[month].transportCostPEL}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"transportCostPEL",
													Number(e.target.value)
												);
											}}></Input>

										<p>Child Safety Certifications</p>
										<Input
											type="text"
											value={monthlyData[month].childSafetyCert}
											onChange={(e) => {
												updateMonthlyData(
													month,
													"childSafetyCert",
													Number(e.target.value)
												);
											}}></Input>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* od lg ta karta rozciaga sie na wszystkie 3 kolumny grida czyli na to co wyzej */}
				<Card className="lg:col-span-3">
					<CardHeader>Calculations output</CardHeader>

					<CardContent>
						{/* pozwala na przewijanie tabeli poziomo gdy nie miesci sie na ekranie */}
						<div className="overflow-x-auto ">
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

								<tbody>
									<tr className="border-b bg-blue-50 dark:bg-blue-900/20">
										<td className="p-2 font-medium text-left">
											Monthly Revenue PIE
										</td>

										{months.map((month, index) => (
											<td key={index} className="text-center p-2">
												{getMonthlyRevenuePIE(month)}
											</td>
										))}
									</tr>

									<tr className="border-b bg-blue-50 dark:bg-blue-900/20">
										<td className="p-2 font-medium text-left">
											Monthly Revenue PEL
										</td>

										{months.map((month, index) => (
											<td key={index} className="text-center p-2">
												{getMonthlyRevenuePEL(month)}
											</td>
										))}
									</tr>

									<tr className="border-b bg-green-50 dark:bg-green-900/20">
										<td className="p-2 font-medium text-left">TOTAL Revenue</td>

										{months.map((month, index) => (
											<td key={month} className="text-center p-2">
												{getTotalMonthlyRevenue(month)}
											</td>
										))}
									</tr>

									<tr className="border-b bg-red-50 dark:bg-red-900/20">
										<td className="p-2 font-medium text-left">
											Monthly TOTAL Costs
										</td>

										{months.map((month, index) => (
											<td key={month} className="text-center p-2">
												{getAllCosts(month)}
											</td>
										))}
									</tr>

									<tr className="border-b bg-red-50 dark:bg-red-900/20">
										<td className="p-2 font-medium text-left">
											Monthly Profit/Lost
										</td>

										{months.map((month, index) => (
											<td key={month} className="text-center p-2">
												{monthlyProfit_Loss(month)}
											</td>
										))}
									</tr>

									<tr className="border-b bg-purple-50 dark:bg-purple-900/20">
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

									<tr className="border-b bg-indigo-50 dark:bg-indigo-900/20">
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

						<div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
							<h4 className="font-bold mb-3">📊 Summary</h4>

							{/* domyslnie 2 kolumny, od md przechodzimy na 4 */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
								<div>
									<div className="text-gray-600 dark:text-gray-400">
										Total Revenue
									</div>
									<div className="font-bold text-lg text-green-600">
										{months
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
											.reduce(
												(sum, month) => sum + monthlyProfit_Loss(month),
												0
											)
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
			</div>
			{/* </div> */}
		</main>
	);
}

/*
NO LONGER IN USE 4 TESTING USEREF AND USESTATE


const monthlyRevenuePIE =
		nrOfStudPIE * nrOfMeetingsPIE * ratePerStudPerMeetingPIE;

const nrofStudsref = React.useRef<any>(0);
	

	const [nrOfMeetings, setnrOfMeetings] = useState(0);

	const [ratePerStudent, setRatePerStudent] = useState(0);

	

	let monthlyRevenue: number = 0;

	const handlenrOfMeeting = (e: any) => {
		setnrOfMeetings(e);
	};

	const handleRatePerStudent = (e: any) => {
		setRatePerStudent(e);
	};

    
	const revenue =
		Number(nrofStudsref.current?.value) * nrOfMeetings * ratePerStudent;


<div className="p-2 space-y-4">
								<div className="space-y-1">
									<p>Nr of students</p>
									<Input type="number" ref={nrofStudsref}></Input>
								</div>

								<div className="space-y-1">
									<p>Meetings per month</p>
									<Input
										type="number"
										onChange={(e) => handlenrOfMeeting(e.target.value)}></Input>
								</div>

								<div className="space-y-1">
									<p>Rate per Student:</p>
									<Input
										type="number"
										onChange={(e) => {
											handleRatePerStudent(e.target.value);
										}}></Input>
								</div>

								<div className="space-y-1">
									<p>Nr of Students: {nrofStudsref.current.value}</p>

									<p>Nr of meetings: {nrOfMeetings}</p>

									<p>Rate Per Student: {ratePerStudent}</p>

									<p>
										Monthly Revenue:
										{!Number.isNaN(revenue) ? revenue : 0}
									</p>
								</div>
							</div>


                            <Button
							onClick={() => {
								settogglingValue((p) => !p);
								if (nrofStudsref.current) {
									nrofStudsref.current.value = "";
								}
							}}>
							Pokaż wartość
						</Button>

*/
