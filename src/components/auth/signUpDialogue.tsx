"use client";

import type React from "react";

import { useState } from "react";
import { ClerkAPIError } from "@clerk/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface SignupDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSignup: (name: string, email: string, password: string) => void;
    onLoginClick: () => void;
    serverErrors?: ClerkAPIError[];
}

export function SignupDialog({
    open,
    onOpenChange,
    onSignup,
    onLoginClick,
    serverErrors,
}: SignupDialogProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const newErrors: Record<string, string> = {};

        if (!name) {
            newErrors.name = "Name is required";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Call Signup: ", name, email, password);
            onSignup(name, email, password);
        }
    };

    console.log("cookie: ", document.cookie.split("; "));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Create an Account
                    </DialogTitle>
                    <DialogDescription>
                        Sign up to track orders, save addresses, and more.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {serverErrors && (
                        <ul>
                            {serverErrors.map((el, index) => (
                                <li key={index}>{el.longMessage}</li>
                            ))}
                        </ul>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={
                                errors.confirmPassword ? "border-red-500" : ""
                            }
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="terms"
                            checked={agreeTerms}
                            onCheckedChange={(checked) =>
                                setAgreeTerms(checked === true)
                            }
                            className={
                                errors.agreeTerms ? "border-red-500" : ""
                            }
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label
                                htmlFor="terms"
                                className="text-sm font-normal"
                            >
                                I agree to the{" "}
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs text-amber-800"
                                >
                                    Terms of Service
                                </Button>{" "}
                                and{" "}
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs text-amber-800"
                                >
                                    Privacy Policy
                                </Button>
                            </Label>
                            {errors.agreeTerms && (
                                <p className="text-sm text-red-500">
                                    {errors.agreeTerms}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                    >
                        Create Account
                    </Button>
                </form>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <div className="text-sm text-center sm:text-left">
                        Already have an account?{" "}
                        <Button
                            variant="link"
                            className="p-0 h-auto text-amber-800"
                            onClick={onLoginClick}
                        >
                            Login
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
