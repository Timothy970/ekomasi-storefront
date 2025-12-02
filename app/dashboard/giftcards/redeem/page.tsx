import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import React from 'react'

export default function page() {
    return (
        <Navigation>
            <DashboardLayout>
                <div className="space-y-4">
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
