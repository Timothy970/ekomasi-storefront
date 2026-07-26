"use client"
import React, { useEffect, useState } from 'react'
import Accordion from '@/components/Accordion'
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, RefreshCw, CreditCard, ShieldCheck, Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserProfile } from '@/lib/features/user/userSlice'
import {
  getWalletBalanceAsync,
  topupWalletMpesaAsync,
  selectWalletBalance,
  selectWalletTransactions,
  selectWalletStatus
} from '@/lib/features/wallet/walletSlice'

export default function WalletDashboardPage() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUserProfile)
  const balance = useAppSelector(selectWalletBalance)
  const transactions = useAppSelector(selectWalletTransactions)
  const status = useAppSelector(selectWalletStatus)

  const [showTopupModal, setShowTopupModal] = useState<boolean>(false)
  const [topupAmount, setTopupAmount] = useState<string>("1000")
  const [phone, setPhone] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const userPhone = profile?.phone || profile?.phone_number || ""

  useEffect(() => {
    if (userPhone) {
      setPhone(userPhone)
      dispatch(getWalletBalanceAsync(userPhone))
    }
  }, [userPhone, dispatch])

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    dispatch(
      topupWalletMpesaAsync({
        payload: {
          phone_number: phone,
          amount: parseFloat(topupAmount)
        },
        callback: (msg, success) => {
          setMessage(msg)
          if (success) {
            setTimeout(() => {
              setShowTopupModal(false)
              if (userPhone) {
                dispatch(getWalletBalanceAsync(userPhone))
              }
            }, 3000)
          }
        }
      })
    )
  }

  return (
    <Navigation>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Main Wallet Balance Card */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-black rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Wallet className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-200 text-sm font-medium">
                  <Wallet className="w-4 h-4" />
                  <span>My In-App Wallet & Store Credit</span>
                </div>
                <div className="text-3xl md:text-5xl font-extrabold tracking-tight flex items-center gap-3">
                  {status === 'loading' && <Loader2 className="w-8 h-8 animate-spin" />}
                  KES {(balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-purple-300">
                  Instant checkout payment & return store credits linked to {userPhone || "your account"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setShowTopupModal(true)}
                  className="bg-white text-purple-950 hover:bg-purple-100 font-bold px-5 py-3 h-auto rounded-xl flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Top Up via M-Pesa
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Instant Store Refunds</h4>
                <p className="text-xs text-gray-500">Returned item refunds are credited to wallet in seconds</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Split Checkout Support</h4>
                <p className="text-xs text-gray-500">Uses wallet balance first, M-Pesa prompts for remaining deficit</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-700">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Zero Transaction Fees</h4>
                <p className="text-xs text-gray-500">No extra charges when paying directly from your wallet</p>
              </div>
            </div>
          </div>

          {/* Transaction History Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Wallet Activity</h3>
              <span className="text-xs text-gray-500">Real-time activity from backend</span>
            </div>

            {(!transactions || transactions.length === 0) ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No wallet transactions recorded yet. Top up or process a store return to see activities here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500 bg-gray-50/50">
                      <th className="py-3 px-4">Transaction</th>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-3">
                          <div className={`p-2 rounded-full ${tx.type === 'DEBIT' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {tx.type === 'DEBIT' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{tx.description || tx.type}</p>
                            <p className="text-xs text-gray-400">{tx.type}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-gray-600">{tx.reference}</td>
                        <td className="py-4 px-4 text-gray-500 text-xs">{tx.created_at}</td>
                        <td className={`py-4 px-4 text-right font-bold ${tx.type === 'DEBIT' ? 'text-red-600' : 'text-emerald-600'}`}>
                          {tx.type === 'DEBIT' ? '-' : '+'} KES {(tx.amount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Wallet Help Accordion */}
          <div className="bg-[#804A9D14] flex flex-col gap-y-[1rem] w-full p-[1.5rem] md:p-[2rem] rounded-xl border border-purple-200">
            <p className="text-[1.125rem] font-bold text-gray-900">
              💡 FREQUENTLY ASKED QUESTIONS ABOUT YOUR WALLET
            </p>

            <div className="border-t border-purple-300">
              <Accordion title="💳 How does Split Payment work at Checkout?">
                If your order total is higher than your available wallet balance, the system automatically uses all your wallet funds first, and sends an M-Pesa STK Push prompt to your phone for only the remaining balance!
              </Accordion>
              <Accordion title="🔄 How do Return Refunds work?">
                When a return request is approved, your refund amount is instantly credited to your in-app wallet balance without waiting days for manual bank or M-Pesa processing.
              </Accordion>
            </div>
          </div>
        </div>

        {/* Top-up M-Pesa Modal */}
        {showTopupModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-lg font-bold text-gray-900">Top Up Wallet via M-Pesa</h3>
                <button onClick={() => setShowTopupModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleTopUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">M-Pesa Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 254712345678"
                    required
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Select Amount (KES)</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {["500", "1000", "2500"].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopupAmount(amt)}
                        className={`py-2 text-xs font-bold rounded-lg border ${topupAmount === amt ? 'bg-purple-900 text-white border-purple-900' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                      >
                        KES {amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    placeholder="Or enter custom amount"
                    required
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-600 text-sm"
                  />
                </div>

                {message && (
                  <p className={`text-xs p-3 rounded-lg font-medium ${message.includes('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button type="button" onClick={() => setShowTopupModal(false)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={status === 'loading'} className="flex-1 bg-purple-900 text-white hover:bg-purple-950">
                    {status === 'loading' ? "Sending STK..." : "Send STK Push"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DashboardLayout>
    </Navigation>
  )
}
