"use client";
// I made this Server Component to use useUser  TO DO
import { MenuIcon, User, LogOut } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";

const LandingPageNavbar = () => {
	const { isSignedIn } = useUser();
	return (
		<div className="flex w-[100vw] justify-between items-center h-16">
			<div className="text-3xl font-semibold flex items-center gap-x-3">
				<MenuIcon className="h-6 w-6 cursor-pointer" />
				<Image src={"/opal-logo.png"} alt={"logo"} width={70} height={70} />
			</div>
			<div className="hidden gap-x-10 items-center lg:flex">
				<Link
					href="/"
					className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
				>
					Home
				</Link>
				<Link
					href="/"
					className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
				>
					Pricing
				</Link>
				<Link
					href="/"
					className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
				>
					Contact
				</Link>
			</div>

			{isSignedIn && (
				<SignOutButton>
					<Button className="text-base flex gap-x-2 cursor-pointer">
						<LogOut fill="#000" />
						Logout
					</Button>
				</SignOutButton>
			)}

			{!isSignedIn && (
				<Link href={"auth/sign-in"}>
					<Button className="text-base flex gap-x-2 cursor-pointer">
						<User fill="#000" />
						Login
					</Button>
				</Link>
			)}
		</div>
	);
};

export default LandingPageNavbar;
