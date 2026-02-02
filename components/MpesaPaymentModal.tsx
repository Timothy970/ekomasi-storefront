import { useState } from "react";
import { X, Smartphone } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export interface VoucherPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    type: string;
    onApplyVoucher: (
        phoneNumber: string,
    ) => void;
}

const MpesaPaymentModal = ({ isOpen, onClose, totalAmount, onApplyVoucher }: VoucherPaymentModalProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isValidating, setIsValidating] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!phoneNumber.trim()) {
            setError("Please enter a phone number");
            return;
        }

        const validatePhoneNumber = (number: string): boolean => {
            const phoneRegex = /^(?:\+?2547\d{8}|\+?2541\d{8}|07\d{8}|01\d{8})$/;
            return (
                phoneRegex.test(number) &&
                (number.length === 10 || number.length === 12)
            );
        };

        setIsValidating(true);
        setError("");

        const isValid = validatePhoneNumber(phoneNumber);

        if (isValid) {
            onApplyVoucher(phoneNumber);
        } else {
            setError("Invalid phone number. Please try again.");
            setIsValidating(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setError("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                M-Pesa Payment
                            </h2>
                            <p className="text-gray-500 text-sm mt-0.5">Enter your M-Pesa phone number to proceed</p>
                        </div>
                    </div>
                    <Button
                        onClick={onClose}
                        className="bg-white p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </Button>
                </div>
                <div className="px-8 py-6 space-y-6">
                    <div>
                        <Label className="text-gray-600 text-sm font-medium mb-2 block">
                            Total Amount
                        </Label>
                        <div className="text-4xl font-bold text-gray-900">
                            KES {totalAmount.toLocaleString()}
                        </div>
                    </div>

                    <div>
                        <Label className="text-gray-900 text-sm font-medium mb-2 block">
                            Phone Number
                        </Label>
                        <Input
                            type="text"
                            value={phoneNumber}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="07123456789 or 2547123456789"
                            className={`w-full px-6 py-4 text-lg font-mono bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${error ? "border-red-500" : "border-gray-200"}`}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
                <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-end gap-3">
                    <Button
                        onClick={onClose}
                        className="bg-white px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-900"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!phoneNumber.trim() || isValidating}
                        className="px-6 py-3 bg-[#E82989] text-white rounded-xl hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
                    >
                        {isValidating ? "Validating..." : "Send STK Push"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MpesaPaymentModal;
