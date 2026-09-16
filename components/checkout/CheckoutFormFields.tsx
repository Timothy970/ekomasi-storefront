import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { triggerToast } from '@/app/utils/toastUtils';
import LoadingIndicator from '../LoadingIndicator';
import { FormData } from '@/lib/features/types';
import { ArrowUpRight } from 'lucide-react';

export function CheckoutPaymentFields({
  formData,
  handleChange,
  handlePhoneBlur,
  status,
  isFormValid
}: Readonly<{
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneBlur: (field: "phone" | "paymentPhone") => void;
  status: string;
  isFormValid: boolean;
}>) {
  return (
    <div className='flex flex-col gap-y-[1.5rem]'>
      <h2 className='font-bold text-[1.5rem]'>Payment</h2>
      <p className='text-[0.875rem]'>Please select your preferred payment option</p>

      <RadioGroup defaultValue="mpesa" className="flex flex-col gap-y-[1rem]">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mpesa" id="mpesa" checked />
          <Label htmlFor="mpesa">Mpesa</Label>
        </div>
      </RadioGroup>

      <div className='flex flex-col gap-y-[1.5rem]'>
        <Input
          name="paymentPhone"
          value={formData.paymentPhone}
          onChange={handleChange}
          onBlur={() => handlePhoneBlur("paymentPhone")}
          placeholder='254123456789'
          className='p-[0.5rem] h-[2.5rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]'
        />

        <Button
          disabled={status === "loading"}
          type='submit'
          onClick={() => {
            if (!isFormValid) {
              triggerToast("Please fill out all required fields before continuing.", "error");
            }
          }}
          className={`h-[2.5rem] md:max-w-[19rem] bg-secondary-tenant ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {status === "loading" && <LoadingIndicator textColor="text-white" />}
          Place Order
        </Button>
      </div>
    </div>
  );
}

export function DeliveryTypeSelector({
  deliveryType,
  setDeliveryType
}: Readonly<{
  deliveryType: "ship" | "in store";
  setDeliveryType: (type: "ship" | "in store") => void;
}>) {
  return (
    <div className='flex flex-row gap-x-[1rem] w-full justify-start'>
      <Button
        type='button'
        onClick={() => setDeliveryType("ship")}
        className={`px-[3rem] min-w-[10rem] h-[2.5rem] border ${deliveryType === "ship" ? 'bg-[#AF52DE36]' : 'bg-white'} border-secondary-tenant text-custom-black`}
      >
        <span>Ship</span>
      </Button>

      <Button
        type='button'
        onClick={() => setDeliveryType("in store")}
        className={`px-[3rem] min-w-[10rem] h-[2.5rem] ${deliveryType === "in store" ? 'bg-[#AF52DE36]' : 'bg-white'} border border-black text-custom-black`}
      >
        <span>In Store</span>
      </Button>
    </div>
  );
}

export function SavedAddressSelector({
  address,
  setFormData,
  handleEditAddressClick,
  token,
  router
}: Readonly<{
  address: any[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleEditAddressClick: () => void;
  token: any;
  router: any;
}>) {
  if (address && address.length > 0) {
    return (
      <div className="flex flex-col gap-y-[0.5rem]">
        <span className="text-[0.875rem] font-semibold">Saved Address</span>
        <div className='flex gap-x-[0.5rem]'>
          <Select
            defaultValue={address[0].address_id}
            onValueChange={(value) => {
              const selected = address.find((a) => a.address_id === value);
              if (selected) {
                setFormData((prev) => ({
                  ...prev,
                  address: selected.address ?? "",
                  apartment: selected.apartment ?? "",
                  city: selected.city ?? "",
                  country: selected.country ?? "",
                  postalCode: selected.zip_code ?? "",
                }));
              }
            }}
          >
            <SelectTrigger className="w-full h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]">
              <SelectValue placeholder="Choose an address" />
            </SelectTrigger>
            <SelectContent>
              {address.map((addr) => (
                <SelectItem key={addr.address_id} value={addr.address_id}>
                  {addr.address}, {addr.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleEditAddressClick}
            className="bg-secondary-tenant text-[0.75rem] h-[2.5rem] hover:bg-secondary-tenant"
          >
            <ArrowUpRight />
            <span>Edit Address</span>
          </Button>
        </div>
      </div>
    );
  }

  if (token) {
    return (
      <div className="flex items-center justify-between">
        <p className="text-[0.875rem] text-gray-600">No saved addresses found.</p>
        <Button
          onClick={() => router.push("/dashboard/address")}
          className="bg-secondary-tenant text-[0.75rem] h-[2.5rem] hover:bg-secondary-tenant"
        >
          <ArrowUpRight />
          <span>Add Address</span>
        </Button>
      </div>
    );
  }

  return null;
}
