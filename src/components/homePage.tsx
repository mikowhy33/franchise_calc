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

	

	// months as literals and their type, months is now a typle with these exact types
	const months = ["September", "October", "November"] as const;

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
		teacherCostPIE: number;
		teacherCostPEL: number;
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
			teacherCostPIE: 0,
			teacherCostPEL: 0,
			transportCostPIE: 0,
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
			teacherCostPIE: 0,
			teacherCostPEL: 0,
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
			teacherCostPIE: 0,
			teacherCostPEL: 0,
			transportCostPIE: 0,
			transportCostPEL: 0,
			childSafetyCert: 0,
		},
	});

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
	const getMonthlyRevenuePEL=(month:Month)=>{
		const data=monthlyData[month];

		return(
			data.nrOfMeetingsPEL*data.nrOfStudPEL*data.ratePerStudPerMeetingPEL
		)
	}
	const getTotalMonthlyRevenue=(month:Month)=>{
		return(getMonthlyRevenuePIE(month) + getMonthlyRevenuePEL(month));
	}



	// costs
	
	
	
	const [avgsalaryassumption, setavgsalaryassumption] = useState(0);
	const [workingdays, setworkingdays] = useState(0);
	
	const TeacherCostPerDay: number = Number(
		(avgsalaryassumption / workingdays).toFixed(1)
	);
	
	console.log(monthlyData);
	
	const getTeacherCostPIE=(month:Month)=>{
		const data=monthlyData[month];
		return (TeacherCostPerDay*data.nrOfTeachers*data.nrOfMeetingsPIE).toFixed(0);
	}

	const getTeacherCostPEL=(month:Month)=>{
		const data=monthlyData[month];
		return(TeacherCostPerDay*data.nrOfTeachers*data.nrOfMeetingsPEL).toFixed(0);
	}

	// sum of total costs

	const getAllCosts=(month:Month)=>{
		const data=monthlyData[month];
		return(Number(data.studLicenses+data.teacherCostPIE+data.teacherCostPEL+data.transportCostPIE+data.transportCostPEL+data.childSafetyCert))
	}

	
	return (
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

			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
					{/* Left Column */}

					<Card className=" flex flex-col  p-10  w-full max-w-sm">
						<CardHeader>Basic Data</CardHeader>

						<h2>Teacher cost Calculation</h2>
						<div className="bg-gray-900 space-y-3 p-5 rounded-2xl">
							<p>Avg Salary Assumption</p>
							<Input
								type="number"
								onChange={(e) => {
									setavgsalaryassumption(Number(e.target.value));
								}}></Input>

							<p>Working Days</p>
							<Input
								type="number"
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

					{/* Middle column */}
					<Card className="flex flex-col  p-10 w-full max-w-md">
						<CardHeader>Monthly info</CardHeader>

						<CardContent>
							<div className=" space-y-3 ">
								{months.map((month, index) => (
									<div key={month}>
										<h2>Month: {month}</h2>

										<div className="grid grid-cols-2 gap-2 text-xs border border-amber-50 p-3 rounded-2xl items-center">

											<p>Nr of Teachers</p>
											<Input
												type="number"
												value={monthlyData[month].nrOfTeachers ==0 ? "" : monthlyData[month].nrOfTeachers}
												onChange={(e) => {
													updateMonthlyData(
														month,
														"nrOfTeachers",
														e.target.value
													);
												}}></Input>

											<p>Nr of Students PIE</p>
											<Input
												type="number"
												// value from our months data, always synchronised
												value={monthlyData[month].nrOfStudPIE==0 ? "" : monthlyData[month].nrOfStudPIE}
												onChange={(e) =>
													updateMonthlyData(
														month,
														"nrOfStudPIE",
														e.target.value
													)
												}></Input>

											<p>Nr of Students PEL</p>
											<Input
												type="number"
												value={monthlyData[month].nrOfStudPEL ==0 ? "" : monthlyData[month].nrOfStudPEL}
												onChange={(e) => {
													updateMonthlyData(
														month,
														"nrOfStudPEL",
														e.target.value
													);
												}}></Input>

											

											<p>Nr of Meetings PIE</p>
											<Input
												type="number"
												value={monthlyData[month].nrOfMeetingsPIE ==0 ? "" : monthlyData[month].nrOfMeetingsPIE}
												onChange={(e) => {
													updateMonthlyData(
														month,
														"nrOfMeetingsPIE",
														e.target.value
													);
												}}></Input>

											<p>Nr of Meeting PEL</p>
											<Input
												type="number"
												value={monthlyData[month].nrOfMeetingsPEL==0 ? "" : monthlyData[month].nrOfMeetingsPEL}
												onChange={(e) => {
													updateMonthlyData(
														month,
														"nrOfMeetingsPEL",
														e.target.value
													);
												}}></Input>

											<p>Rate per Student per Meeting PIE</p>
											<Input
												type="number"
												value={monthlyData[month].ratePerStudPerMeetingPIE==0 ? "" : monthlyData[month].ratePerStudPerMeetingPIE}
												onChange={(e) => {
													updateMonthlyData(
														month,
														"ratePerStudPerMeetingPIE",
														e.target.value
													);
												}}></Input>

											<p>Rate per Student per Meeting PEL</p>
											<Input
												type="number"
												value={monthlyData[month].ratePerStudPerMeetingPEL==0?"":monthlyData[month].ratePerStudPerMeetingPEL}
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

					<Card>
						<CardHeader>Costs</CardHeader>

						<CardContent>
							<div className=" space-y-3 ">
								{months.map((month, index) => (
									<div key={month}>
										<h2>Month: {month}</h2>

										<div className="grid grid-cols-2 gap-2 p-3 text-xs items-center border border-amber-50 rounded-2xl ">
											<p>Student Licenses</p>
											<Input
												type="number"
                                                value={monthlyData[month].studLicenses==0?"":monthlyData[month].studLicenses}
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

												value={Number.isNaN(getTeacherCostPIE(month)) ? "" : getTeacherCostPIE(month)}
												
												onChange={(e) => {
													updateMonthlyData(month,"teacherCostPIE",Number(e.target.value))
												}}></Input>

											<p>Teacher Cost PEL</p>
											<Input
												type="number"
                                                // value={monthlyData[month].teacherCostPEL==0?"":monthlyData[month].teacherCostPEL}

												value={Number.isNaN(getTeacherCostPEL(month)) ? "" : getTeacherCostPEL(month)}

												onChange={(e) => {
													updateMonthlyData(month,"teacherCostPEL", Number(e.target.value))
												}}></Input>

											<p>Transport Cost PIE</p>
											<Input
												type="number"
                                                value={monthlyData[month].transportCostPIE==0?"":monthlyData[month].transportCostPIE}
												onChange={(e) => {
													updateMonthlyData(month,"transportCostPIE",Number(e.target.value))
												}}></Input>

											<p>Transport Cost PEL</p>
											<Input
												type="number"
                                                value={monthlyData[month].transportCostPEL==0?"":monthlyData[month].transportCostPEL}
												onChange={(e) => {
													updateMonthlyData(month,"transportCostPEL",Number(e.target.value))
												}}></Input>

											<p>Child Safety Certifications</p>
											<Input
												type="text"
                                                value={monthlyData[month].childSafetyCert==0? "":monthlyData[month].childSafetyCert}
												onChange={(e) => {
													updateMonthlyData(month,"childSafetyCert",Number(e.target.value))
												}}></Input>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="w-screen">
						<CardHeader>Calculations output</CardHeader>

						<CardContent>
							<div className="overflow-x-auto ">
								<table className="w-full text-sm">
									<thead>
										<tr>
											<th className="text-left">Metric / Month</th>
											{months.map((month) => (
												<th key={month}>{month}</th>
											))}
										</tr>
									</thead>

									<tbody>
										<tr>
											<td className="p-2 font-medium text-left">
												Monthly Revenue PIE
											</td>

											{months.map((month, index) => (
												<td key={index}>{getMonthlyRevenuePIE(month)}</td>
											))}
										</tr>

										<tr>
											<td className="p-2 font-medium text-left">Monthly Revenue PEL</td>

											{months.map((month,index)=>(
												<td key={index}>{getMonthlyRevenuePEL(month)}</td>
											))}
										</tr>

										<tr>

											<td>TOTAL Revenue</td>

											{months.map((month,index)=>(
												<td key={month}>
													{getTotalMonthlyRevenue(month)}
												</td>
											))}

										</tr>

										<tr>

											<td>Monthly TOTAL Costs</td>

											{months.map((month,index)=>(
												<td key={month}>
													{getAllCosts(month)}
												</td>
											))}


										</tr>

									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
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
