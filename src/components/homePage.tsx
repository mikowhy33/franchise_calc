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

export default function MainnnPage() {
	const { setTheme } = useTheme();

	//Monthly Info

	const [nrOfStudPIE, setNrOfStudsPIE] = useState(0);
	const [nrOfStudPEL, setNrOfStudsPEL] = useState(0);
	const [nrOfTeachers, setNrOfTeachers] = useState(0);
	const [nrOfMeetingsPIE, setnrOfMeetingsPIE] = useState(0);
	const [nrOfMeetingsPEL, setnrOfMeetingsPEL] = useState(0);
	const [ratePerStudPerMeetingPIE, setratePerStudPerMeetingPIE] = useState(0);
	const [ratePerStudPerMeetingPEL, setratePerStudPerMeetingPEL] = useState(0);

	// Monthly Costs

	const [studLicenses, setStudLicenses] = useState(0);
	const [teacherCostPIE, setTeacherCostPIE] = useState(0);
	const [teacherCostPEL, setTeacherCostPEL] = useState(0);
	const [transportCostPIE, setTransportCostPIE] = useState(0);
	const [transportCostPEL, setTransportCostPEL] = useState(0);
	const [childSafetyCert, setChildSafetyCert] = useState(0);

	const months = ["September", "October", "November"];

	const [avgsalaryassumption, setavgsalaryassumption] = useState(0);
	const [workingdays, setworkingdays] = useState(0);


    // outputs

    const monthlyRevenuePIE=nrOfStudPIE*nrOfMeetingsPIE*ratePerStudPerMeetingPIE

	const TeacherCostPerDay: number = Number(
		(avgsalaryassumption / workingdays).toFixed(1)
	);

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

							<p>Working Days (21)</p>
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
											<p>Nr of Students PIE</p>
											<Input
												type="number"
												onChange={(e) => {
													setNrOfStudsPIE(Number(e.target.value));
												}}></Input>

											<p>Nr of Students PEL</p>
											<Input
												type="number"
												onChange={(e) => {
													setNrOfStudsPEL(Number(e.target.value));
												}}></Input>

											<p>Nr of Teachers</p>
											<Input
												type="number"
												onChange={(e) => {
													setNrOfTeachers(Number(e.target.value));
												}}></Input>

											<p>Nr of Meetings PIE</p>
											<Input
												type="number"
												onChange={(e) => {
													setnrOfMeetingsPIE(Number(e.target.value));
												}}></Input>

											<p>Nr of Meeting PEL</p>
											<Input
												type="number"
												onChange={(e) => {
													setnrOfMeetingsPEL(Number(e.target.value));
												}}></Input>

											<p>Rate per Student per Meeting PIE</p>
											<Input
												type="number"
												onChange={(e) => {
													setratePerStudPerMeetingPIE(Number(e.target.value));
												}}></Input>

											<p>Rate per Student per Meeting PEL</p>
											<Input
												type="number"
												onChange={(e) => {
													setratePerStudPerMeetingPEL(Number(e.target.value));
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
												onChange={(e) => {
													setStudLicenses(Number(e.target.value));
												}}></Input>

											<p>Teacher Cost PIE</p>
											<Input
												type="number"
												onChange={(e) => {
													setTeacherCostPIE(Number(e.target.value));
												}}></Input>

											<p>Teacher Cost PEL</p>
											<Input
												type="number"
												onChange={(e) => {
													setTeacherCostPEL(Number(e.target.value));
												}}></Input>

											<p>Transport Cost PIE</p>
											<Input
												type="number"
												onChange={(e) => {
													setTransportCostPIE(Number(e.target.value));
												}}></Input>

											<p>Transport Cost PEL</p>
											<Input
												type="number"
												onChange={(e) => {
													setTransportCostPEL(Number(e.target.value));
												}}></Input>

											<p>Child Safety Certifications</p>
											<Input
												type="number"
												onChange={(e) => {
													setChildSafetyCert(Number(e.target.value));
												}}></Input>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>Calculations output</CardHeader>

						<CardContent>
							<div className="overflow-x-auto">
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
											<td className="p-2 font-medium text-left">Monthly Revenue PIE</td>

                                            {months.map((motnh,index)=>(
                                                <td key={index}>{monthlyRevenuePIE}</td>
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
