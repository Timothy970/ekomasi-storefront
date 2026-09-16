                                            onChange={e => setSenderName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400] text-base'>Delivery date:</span>

                                        <Input
                                            type='date'
                                            placeholder='Email'
                                            className='pl-[2.5rem] h-[2.5rem]'
                                            value={deliveryDate}
                                            onChange={e => setDeliveryDate(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                            <Textarea
                                placeholder='Message'
                                className='min-h-[10rem] w-full mt-[1rem]'
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='w-full flex items-start gap-x-[1rem] md:gap-x-[2rem] mt-[2rem]'>
                        <Button
                            className='bg-secondary-tenant md:min-w-[10rem] text-white'
                            onClick={handleCreate}
                        >
                            Create
                        </Button>

                        <Button className='bg-white border md:min-w-[10rem] border-black text-black'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DashboardLayout>

            <SuccessModal
                designImage={designImage}
                recipientEmail={recipientEmail}
            />

            <MpesaPaymentModal
                isOpen={showMpesaModal}
                onClose={() => setShowMpesaModal(false)}
                totalAmount={Number.parseInt(discount, 10) || 0}
                type="mpesa"
                onApplyVoucher={(phoneNumber) => handlePhoneSubmit(phoneNumber)}
            />
        </Navigation>
    )
}
