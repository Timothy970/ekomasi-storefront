                  <ProductColors product={product} />
                </div>
              )}

              {hasVariants && (
                <div className='mt-[1rem]'>
                  <h3 className='text-[0.875rem] font-semibold mb-2'>Available Variations</h3>
                  <div className='flex flex-wrap gap-2'>
                    {product.variant_selection!.map((variant) => (
                      <div
                        key={variant.sku}
                        className={`px-3 py-2 border rounded text-sm ${variant.stock_quantity === 0
                          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-secondary-tenant text-white border-secondary-tenant hover:opacity-90 cursor-pointer transition-colors'
                          }`}>
                        {variant.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showQuantitySelector && (
                <div className='mt-[1.5rem]'>
                  <h3 className='text-[0.875rem] lg:text-base mb-[1.5rem]'>Quantity</h3>
                  <ProductQuantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>
              )}

              <Button
                disabled={product.stock_quantity <= 0 || addToCartLoading}
                onClick={handleAddToCartButtonClick}
                className='w-full bg-primary-tenant hover:opacity-90 mt-[1.5rem] h-[3rem]'
              >
                {addToCartLoading && <LoadingIndicator textColor="text-white" />}
                {isInCart ? "Update Cart Item" : "Add to Cart"}
              </Button>

              <Button
                disabled={product.stock_quantity <= 0}
                onClick={handleBuyNowButtonClick}
                className='w-full bg-white border border-primary-tenant text-primary-tenant hover:bg-gray-50 mt-[0.75rem] h-[3rem]'
              >
                Buy Now
              </Button>

              <div className='mt-[1.5rem] flex flex-col gap-y-[1.5rem]'>
                <BundleProductsAccordion products={product.products} />
                {warranty && (
                  <Accordion title="Warranty">
                    <span>{warranty}</span>
                  </Accordion>
                )}
                <SpecificationsAccordion
                  hasVariants={Boolean(product.product_variants && product.product_variants.length > 0)}
                  groupedVariants={groupedVariants}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <ProductDetailsReviews />
        </div>

        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem]'>
          <NowTrending title="You may also like" />
        </div>

        {Boolean(product.features?.length) && (
          <ProductFeatureSection features={product.features!} />
        )}
      </div>

      <VariantSelectionModal
        product={product}
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onConfirm={handleVariantSelectionConfirm}
        loading={addToCartLoading}
      />
    </Navigation>
  )
}
