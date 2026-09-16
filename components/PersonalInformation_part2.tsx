                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder='First name*'
                                    className='p-[0.5rem] h-[2.5rem] text-[0.875rem] border border-[rgba(0,0,0,0.40)] '
                                />
                            </div>
                        }

                        {
                            !profile?.last_name && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                <span className='text-[0.875rem]'>Last name</span>
                                <Input
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder='Last name*'
                                    className='p-[0.5rem] h-[2.5rem] border text-[0.875rem] border-[rgba(0,0,0,0.40)]'
                                />
                            </div>
                        }
                    </div> : <></>
                }

                {
                    ((profile?.phone && profile?.email) || !profile?.email) && <div className='flex flex-col gap-y-[0.5rem]'>
                        <span className='text-[0.875rem] font-semibold'>Email address</span>

                        <div className='relative'>
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                                <path d="M18 0.5H2C0.897 0.5 0 1.397 0 2.5V14.5C0 15.603 0.897 16.5 2 16.5H18C19.103 16.5 20 15.603 20 14.5V2.5C20 1.397 19.103 0.5 18 0.5ZM18 2.5V3.011L10 9.234L2 3.012V2.5H18ZM2 14.5V5.544L9.386 11.289C9.56111 11.4265 9.77733 11.5013 10 11.5013C10.2227 11.5013 10.4389 11.4265 10.614 11.289L18 5.544L18.002 14.5H2Z" fill="black" />
                            </svg>

                            <Input
                                name="email"
                                value={formData.email}
                                required
                                disabled={!!profile?.email}
                                onChange={handleChange}
                                placeholder='Email Address*'
                                className='p-[0.5rem] h-[2.5rem] pl-10 pr-4 py-2 border text-[0.875rem] border-[rgba(0,0,0,0.40)] '
                            />
                        </div>
                    </div>
                }

                {

                    ((profile?.phone && profile?.email) || !profile?.phone) && <div className='flex flex-col gap-y-[0.5rem]'>
                        <span className='text-[0.875rem] font-semibold'>Phone Number</span>

                        <div className='relative'>
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
                                <path d="M12 0.5H2C0.897 0.5 0 1.397 0 2.5V18.5C0 19.603 0.897 20.5 2 20.5H12C13.103 20.5 14 19.603 14 18.5V2.5C14 1.397 13.103 0.5 12 0.5ZM2 15.499V3.5H12L12.002 15.499H2Z" fill="black" />
                            </svg>

                            <Input
                                name="phone"
                                value={formData.phone}
                                disabled={!!profile?.phone}
                                required
                                onBlur={() => handlePhoneBlur("phone")}
                                onChange={handleChange}
                                placeholder='254123456789*'
                                className='p-[0.5rem] h-[2.5rem] pl-10 pr-4 py-2 border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                            />
                        </div>
                    </div>
                }

                <div className='flex flex-col gap-y-[1.5rem]'>
                    <p className='font-bold text-[1.5rem]'>Delivery</p>

                    <div className='flex flex-row gap-x-[1rem] w-full justify-start'>
                        <Button type='button' onClick={() => setDeliveryType("ship")} className={`px-[3rem] min-w-[10rem] h-[2.5rem] border ${deliveryType === "ship" ? 'bg-[#AF52DE36]' : 'bg-white'} border-secondary-tenant text-custom-black `}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="22"
                                viewBox="0 0 24 22"
                                fill="none"
                            >
                                <path
                                    d="M16 15V2H1V15H16ZM16 15H23V10L20 7H16V15ZM8 17.5C8 18.8807 6.88071 20 5.5 20C4.11929 20 3 18.8807 3 17.5C3 16.1193 4.11929 15 5.5 15C6.88071 15 8 16.1193 8 17.5ZM21 17.5C21 18.8807 19.8807 20 18.5 20C17.1193 20 16 18.8807 16 17.5C16 16.1193 17.1193 15 18.5 15C19.8807 15 21 16.1193 21 17.5Z"
                                    stroke="#1E1E1E"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Ship</span>
                        </Button>

                        <Button type='button' onClick={() => setDeliveryType("in store")} className={`px-[3rem] min-w-[10rem] h-[2.5rem] ${deliveryType === "in store" ? 'bg-[#AF52DE36]' : 'bg-white'} border border-black text-custom-black`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-store-icon lucide-store"
                            >
                                <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
                                <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
                                <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
                            </svg>
                            <span>In Store</span>
                        </Button>
                    </div>
                    {deliveryType === "ship" && (
                        <>
                            <SavedAddressSelector
                                address={address}
                                setFormData={setFormData}
                                handleEditAddressClick={handleEditAddressClick}
                                token={token}
                                router={router}
                            />

                            <div className='flex flex-col gap-y-[0.5rem]'>
                                <span className='text-[0.875rem] font-semibold'>Country</span>
                                <CountrySelect formData={formData} setFormData={setFormData} />
                            </div>

                            <div className='flex flex-col gap-y-[0.5rem]'>
                                <span className='text-[0.875rem] font-semibold'>Adress</span>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder='Address*'
                                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                />
                            </div>

                            <div className='flex flex-col gap-y-[0.5rem]'>
                                <span className='text-[0.875rem] font-semibold'>Apartment, suite, etc.(optional)</span>
                                <Input
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    placeholder='Apartment, suite, etc.(optional)'
                                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                />
                            </div>

                            <div className='flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[1rem] w-full justify-between'>
                                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                    <span className='text-[0.875rem] font-semibold'>City</span>
                                    <Input
                                        name="city"
                                        value={formData.city}
                                        required
                                        onChange={handleChange}
                                        placeholder='City'
                                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                    />
                                </div>

                                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                    <span className='text-[0.875rem] font-semibold'>ZIP / Postal code (optional)</span>
                                    <Input
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder='Postal code (optional)'
                                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {
                        deliveryType === "ship" && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                            <span className='text-[0.875rem] font-semibold'>Shipping price</span>
                            <LocationDropdown
                                isBuyNow={isBuyNow}
                                setFormData={setFormData}
                            />
                        </div>
                    }

                    {
                        deliveryType === "in store" && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                            <span className='text-[0.875rem] font-semibold'>Select pick up store</span>
                            <WareHouseDropdown setFormData={setFormData} />
                        </div>
                    }

                    <CheckoutPaymentFields
                        formData={formData}
                        handleChange={handleChange}
                        handlePhoneBlur={handlePhoneBlur}
                        status={status}
                        isFormValid={isFormValid}
                    />
                </div>
            </form>
            <PaymentProcessingModal
                isOpen={isPaymentModalOpen}
                orderId={payingOrderId}
                deliveryId={deliveryId}
                onPaymentConfirmed={handlePaymentConfirmed}
                onPaymentFailed={() => setIsPaymentModalOpen(false)}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </>
    )
}
