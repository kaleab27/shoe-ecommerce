"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginDialog } from "@/components/auth/loginDialogue";
import { SignupDialog } from "@/components/auth/signUpDialogue";
import { OtpVerificationDialog } from "./otpVerificationDialogue";

export function AuthButtons() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showSignupDialog, setShowSignupDialog] = useState(false);
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const { isLoaded, signUp, setActive } = useSignUp();
    const [errors, setErrors] = useState<ClerkAPIError[]>();
    const {
        isLoaded: signInIsLoaded,
        signIn,
        setActive: signInSetActive,
    } = useSignIn();
    const router = useRouter();

    const handleVerify = async (otp: string) => {
        if (!isLoaded) return;
        console.log("Handle Verification");
        setErrors(undefined);

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: otp,
            });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                console.log("Verification complete");
                router.push("/");
                setIsLoggedIn(true);
                setShowOtpDialog(false);
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.log("Verification not complete");
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.log("Verification failed");
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleLogin = async (email: string, password: string) => {
        if (!signInIsLoaded) return;
        console.log("Inside onLogin: ", email, password);

        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            });

            if (signInAttempt.status === "complete") {
                await signInSetActive({
                    session: signInAttempt?.createdSessionId,
                });
                console.log("Successfully LoggedIn");
                setIsLoggedIn(true);
                setShowLoginDialog(false);
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.log("Login status not complete");
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.log("Login Error happened");
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleSignup = async (
        name: string,
        email: string,
        password: string
    ) => {
        if (!isLoaded) return;
        console.log(name, email, email, password);

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            // go to verification stage to verify the otp
            console.log("Goto Verification");
            setShowSignupDialog(false);
            setShowOtpDialog(true);
        } catch (err) {
            console.log("Error before Verification");
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/account/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/account/addresses">Addresses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginDialog(true)}
                >
                    Login
                </Button>
                <Button
                    className="bg-amber-800 hover:bg-amber-900 text-white"
                    size="sm"
                    onClick={() => setShowSignupDialog(true)}
                >
                    Sign Up
                </Button>
            </div>

            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onLogin={handleLogin}
                onSignupClick={() => {
                    setShowLoginDialog(false);
                    setShowSignupDialog(true);
                }}
                serverErrors={errors}
            />

            <SignupDialog
                open={showSignupDialog}
                onOpenChange={setShowSignupDialog}
                onSignup={handleSignup}
                onLoginClick={() => {
                    setShowSignupDialog(false);
                    setShowLoginDialog(true);
                }}
            />

            <OtpVerificationDialog
                open={showOtpDialog}
                onOpenChange={setShowOtpDialog}
                onVerify={handleVerify}
            />
        </>
    );
}
