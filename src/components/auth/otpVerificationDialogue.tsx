"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ClerkAPIError } from "@clerk/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface OtpVerificationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVerify: (otp: string) => void;
    email?: string;
    serverErrors?: ClerkAPIError[];
}

export function OtpVerificationDialog({
    open,
    onOpenChange,
    onVerify,
    email,
    serverErrors,
}: OtpVerificationDialogProps) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (open) {
            setResendTimer(30);
        }
    }, [open]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        if (error) setError("");

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, "").split("").slice(0, 6);
                const newOtp = [...otp];

                digits.forEach((digit, i) => {
                    if (i < 6) newOtp[i] = digit;
                });

                setOtp(newOtp);

                const nextEmptyIndex = newOtp.findIndex((val) => !val);
                if (nextEmptyIndex !== -1) {
                    inputRefs.current[nextEmptyIndex]?.focus();
                } else {
                    inputRefs.current[5]?.focus();
                }
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }

        onVerify(otpString);
    };

    const handleResendOtp = () => {
        setIsResending(true);

        // send a new otp
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Verify Your Account
                    </DialogTitle>
                    <DialogDescription>
                        We&apos;ve sent a verification code to{" "}
                        {email ? email : "your email"}. Please enter the code
                        below to verify your account.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {serverErrors && (
                        <ul>
                            {serverErrors.map((el, index) => (
                                <li key={index}>{el.longMessage}</li>
                            ))}
                        </ul>
                    )}
                    <div className="space-y-4">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    // @ts-expect-error to stop build from failing for preview
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        <p className="text-sm text-center text-muted-foreground">
                            Didn&apos;t receive a code?{" "}
                            {resendTimer > 0 ? (
                                <span>Resend in {resendTimer}s</span>
                            ) : (
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-amber-800"
                                    onClick={handleResendOtp}
                                    disabled={isResending}
                                >
                                    {isResending ? "Sending..." : "Resend Code"}
                                </Button>
                            )}
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                    >
                        Verify Account
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
