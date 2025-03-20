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

interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLogin: (email: string, password: string) => void;
    onSignupClick: () => void;
    serverErrors?: ClerkAPIError[];
}

export function LoginDialog({
    open,
    onOpenChange,
    onLogin,
    onSignupClick,
    serverErrors,
}: LoginDialogProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const newErrors: Record<string, string> = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Called onLogin");
            onLogin(email, password);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Login to Your Account
                    </DialogTitle>
                    <DialogDescription>
                        Enter your email and password to access your account.
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button
                                variant="link"
                                className="p-0 h-auto text-xs text-amber-800"
                            >
                                Forgot password?
                            </Button>
                        </div>
                        <Input
                            id="password"
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

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) =>
                                setRememberMe(checked === true)
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-normal"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                    >
                        Login
                    </Button>
                </form>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <div className="text-sm text-center sm:text-left">
                        Don&apos;t have an account?{" "}
                        <Button
                            variant="link"
                            className="p-0 h-auto text-amber-800"
                            onClick={onSignupClick}
                        >
                            Sign up
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
