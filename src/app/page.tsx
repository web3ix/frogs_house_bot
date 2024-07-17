"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { numberWithCommas } from "./utils";
import axios from "axios";

declare var window: any;

enum MENU {
	HOME,
	LEADERBOARD,
	FRIENDS,
}

const COMMUNITY = "https://t.me/+ZPTlK1NCdGBkYTFl";
const BOT = "furfy_bot";

export default function Home() {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<{
		id: string;
		userId: number;
		username: string;
		point: number;
		isPremium: boolean;
	}>();
	const [checking, setChecking] = useState<number>(0);
	const [activated, setActivated] = useState<MENU>(MENU.HOME);

	useEffect(() => {
		if (!window.Telegram?.WebApp?.initDataUnsafe?.user?.id)
			return setLoading(false);
		axios
			.get(`/api/user?user=${window.Telegram.WebApp.initDataUnsafe.user.id}`)
			.then((res) => {
				if (res.data.user) {
					setUser(res.data.user);
					setChecking(2);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const checkAccount = useCallback(() => {
		axios
			.post(`/api/user`, {
				user: window.Telegram.WebApp.initDataUnsafe.user,
			})
			.then((res) => {
				res.data.user && setUser(res.data.user);
			})
			.finally(() => setChecking(1));
	}, []);

	return (
		<main className="min-h-dvh p-4 flex flex-col">
			{!user || checking !== 2 ? (
				checking === 0 ? (
					<section
						className={clsx(
							"flex-1 flex flex-col items-center",
							loading ? "justify-center" : "justify-between"
						)}
					>
						<Image
							alt="logo"
							src="/logo.png"
							style={{
								width: "100%",
								height: "auto",
							}}
							width={500}
							height={300}
						/>

						{!loading && (
							<>
								<div className="w-full">
									<div className="text-center text-[#a2acb0] pb-10">
										👋 Hey!
										<br />
										You've been in Telegram for a while,
										<br />
										it's time to get rewarded!
									</div>

									<button
										onClick={() => {
											checkAccount();
										}}
										className="text-[#ffffff] bg-[#007aff] backdrop-blur-[12px] font-[18px] w-full py-4 rounded-lg"
									>
										Wow, let's go!
									</button>
								</div>
							</>
						)}
					</section>
				) : (
					<section
						className={clsx(
							"flex-1 flex flex-col items-center",
							loading ? "justify-center" : "justify-between"
						)}
					>
						<div className="font-bold text-[28px]">Checking your account</div>
						<div className="w-full flex flex-col gap-6">
							<div className="w-full">
								<div className="w-full flex justify-between items-center font-semibold pb-1">
									<div className="text-[18px]">Account Age Verified</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											className="verified"
											d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
											stroke="#FFF"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</div>
								<div className="w-full h-2 bg-[#007aff] rounded-md checking"></div>
							</div>
							<div className="w-full">
								<div className="w-full flex justify-between items-center font-semibold pb-1">
									<div className="text-[18px]">Activity Level Analyzed</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											className="verified2"
											d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
											stroke="#FFF"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</div>
								<div className="w-full h-2 bg-[#007aff] rounded-md checking2"></div>
							</div>
							<div className="w-full">
								<div className="w-full flex justify-between items-center font-semibold pb-1">
									<div className="text-[18px]">Telegram Premium Checked</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											className="verified3"
											d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
											stroke="#FFF"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</div>
								<div className="w-full h-2 bg-[#007aff] rounded-md checking3"></div>
							</div>
							<div className="w-full">
								<div className="w-full flex justify-between items-center font-semibold pb-1">
									<div className="text-[18px]">OG Status Confirmed</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											className="verified4"
											d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
											stroke="#FFF"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</div>
								<div className="w-full h-2 bg-[#007aff] rounded-md checking4"></div>
							</div>
						</div>

						<button
							onClick={() => {
								setChecking(2);
							}}
							className="text-[#ffffff] bg-[#007aff] backdrop-blur-[12px] w-full py-4 rounded-lg font-semibold"
						>
							Continue
						</button>
					</section>
				)
			) : (
				<section
					className={clsx(
						"flex-1 flex flex-col items-center justify-start pb-20"
					)}
				>
					{activated === MENU.HOME && (
						<>
							<div>
								<Image
									alt="logo"
									src="/logo.png"
									style={{
										width: "100%",
										height: "auto",
									}}
									width={100}
									height={100}
								/>
							</div>
							<div className="w-full text-center text-[28px] font-bold">
								{numberWithCommas(user.point)} FROGS
							</div>

							<div className="w-full bg-[#1a1a1a] rounded-2xl py-4 px-5 my-10">
								<div className="text-[18px] font-semibold">FROGS COMMUNITY</div>
								<div className="pb-4">Home for Telegram OG</div>
								<span
									onClick={() => {
										window.Telegram.WebApp.openTelegramLink(COMMUNITY);
									}}
									className="bg-[#ffffff] py-2 px-3 rounded-3xl text-[#000000] text-[14px] font-semibold cursor-pointer "
								>
									Join
								</span>
							</div>

							<div className="w-full flex flex-col gap-4">
								<div className="text-[18px] font-semibold">Your rewards</div>

								<div className="flex justify-between">
									<div>
										<div>Account age</div>
									</div>
									<div className="font-semibold">
										+ {numberWithCommas(2313)} FROGS
									</div>
								</div>
								<div className="flex justify-between">
									<div>
										<div>Telegram Premium</div>
									</div>
									<div className="font-semibold">
										{numberWithCommas(0)} FROGS
									</div>
								</div>
							</div>
						</>
					)}

					{activated === MENU.LEADERBOARD && (
						<>
							<div className="w-full text-center text-[28px] font-bold">
								Telegram Wall of Fame
							</div>

							<div className="w-full bg-[#1a1a1a] rounded-2xl py-4 px-5 flex justify-between items-center">
								<div className="flex items-center gap-2">
									<div className="flex items-center">
										<Image
											alt="logo"
											src={`https://ui-avatars.com/api/?name=noobmdev&background=random`}
											style={{
												width: "100%",
												height: "auto",
											}}
											width={40}
											height={40}
											className="rounded-3xl"
											loading="lazy"
										/>
									</div>
									<div>
										<div>username</div>
										<div className="text-[#a2acb0] text-[14px]">
											{numberWithCommas(1223)} FROGS
										</div>
									</div>
								</div>
								<div>#12313</div>
							</div>

							<div className="w-full mt-10 mb-4">17.4M holders</div>

							<div className="w-full flex flex-col gap-2">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="flex items-center">
											<Image
												alt="logo"
												src={`https://ui-avatars.com/api/?name=TS&background=random`}
												style={{
													width: "100%",
													height: "auto",
												}}
												width={40}
												height={40}
												className="rounded-3xl"
											/>
										</div>
										<div>
											<div>username</div>
											<div className="text-[14px] text-[#a2acb0]">
												{numberWithCommas(1223)} FROGS
											</div>
										</div>
									</div>
									<div>#1231</div>
								</div>
							</div>
						</>
					)}

					{activated === MENU.FRIENDS && (
						<>
							<div className="w-full text-center text-[28px] font-bold">
								Invite friends <br />
								and get more FROGS
							</div>
							<div>
								<Image
									alt="logo"
									src="/logo.png"
									style={{
										width: "100%",
										height: "auto",
									}}
									width={200}
									height={200}
								/>
							</div>
							<div className="mb-6">
								Tap on the button to invite your friends
							</div>

							<button
								onClick={() => {
									window.Telegram.WebApp.openTelegramLink(
										`https://t.me/share/url?url=https://t.me/${BOT}?join=${
											user.id ?? ""
										}`
									);
								}}
								className="text-[#000000] bg-[#ffffff] backdrop-blur-[12px] w-full py-4 rounded-lg font-semibold"
							>
								Invite friends
							</button>
						</>
					)}

					<div className="fixed left-0 right-0 bottom-0 w-full  menu flex justify-between px-10 py-6">
						<div
							onClick={() => setActivated(MENU.HOME)}
							className="flex flex-col items-center justify-center cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M4 11.4522V16.8002C4 17.9203 4 18.4807 4.21799 18.9086C4.40973 19.2849 4.71547 19.5906 5.0918 19.7823C5.5192 20.0001 6.07899 20.0001 7.19691 20.0001H16.8031C17.921 20.0001 18.48 20.0001 18.9074 19.7823C19.2837 19.5906 19.5905 19.2849 19.7822 18.9086C20 18.4811 20 17.9216 20 16.8037V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522Z"
									stroke={activated === MENU.HOME ? "#ffffff" : "#A6A6A6"}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
							<div
								className={clsx(
									"text-[12px]",
									activated === MENU.HOME ? "text-[#ffffff]" : "text-[#A6A6A6]"
								)}
							>
								Home
							</div>
						</div>

						<div
							onClick={() => setActivated(MENU.LEADERBOARD)}
							className="flex flex-col items-center justify-center cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M4 11.4522V16.8002C4 17.9203 4 18.4807 4.21799 18.9086C4.40973 19.2849 4.71547 19.5906 5.0918 19.7823C5.5192 20.0001 6.07899 20.0001 7.19691 20.0001H16.8031C17.921 20.0001 18.48 20.0001 18.9074 19.7823C19.2837 19.5906 19.5905 19.2849 19.7822 18.9086C20 18.4811 20 17.9216 20 16.8037V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522Z"
									stroke={
										activated === MENU.LEADERBOARD ? "#ffffff" : "#A6A6A6"
									}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
							<div
								className={clsx(
									"text-[12px]",
									activated === MENU.LEADERBOARD
										? "text-[#ffffff]"
										: "text-[#A6A6A6]"
								)}
							>
								Leaderboard
							</div>
						</div>
						<div
							onClick={() => setActivated(MENU.FRIENDS)}
							className="flex flex-col items-center justify-center cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M21 19.9999C21 18.2583 19.3304 16.7767 17 16.2275M15 20C15 17.7909 12.3137 16 9 16C5.68629 16 3 17.7909 3 20M15 13C17.2091 13 19 11.2091 19 9C19 6.79086 17.2091 5 15 5M9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9C13 11.2091 11.2091 13 9 13Z"
									stroke={activated === MENU.FRIENDS ? "#ffffff" : "#A6A6A6"}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
							<div
								className={clsx(
									"text-[12px]",
									activated === MENU.FRIENDS
										? "text-[#ffffff]"
										: "text-[#A6A6A6]"
								)}
							>
								Friends
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	);
}
