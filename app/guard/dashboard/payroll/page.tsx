'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Banknote,
  Clock,
  CalendarIcon,
  TrendingUp,
  Download,
  CreditCard,
  Building2,
  Hash,
  CheckCircle2,
  ChevronRight,
  Wallet,
  ArrowDownToLine,
  CircleDollarSign,
  Minus,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const summaryStats = [
  { label: 'Earned This Month', value: '₦248,270.00', icon: CircleDollarSign, change: '+8.2% vs last month', up: true },
  { label: 'Hours Worked', value: '156 hrs', icon: Clock, change: '12 hrs overtime', up: true },
  { label: 'Hourly Rate', value: '₦1,551.69/hr', icon: TrendingUp, change: 'Reviewed May 2026', up: false },
  { label: 'Next Pay Date', value: '31 May 2026', icon: CalendarIcon, change: 'Direct deposit', up: false },
];

const currentPeriod = {
  from: '1 May 2026',
  to: '31 May 2026',
  breakdown: [
    { label: 'Regular Hours (144 hrs × ₦1,551.69)', type: 'credit', amount: 223443.00 },
    { label: 'Overtime Hours (12 hrs × ₦2327.54)', type: 'credit', amount: 279030.48 },
    { label: 'Holiday Allowance', type: 'credit', amount: 12000.00 },
    { label: 'Income Tax (PAYE)', type: 'deduction', amount: -15600.00 },
    { label: 'National Insurance', type: 'deduction', amount: -54000.00 },
  ],
  grossPay: 442473.48,
  deductions: 21000.00,
  netPay: 442473.48,
};

const payHistory = [
  { id: 'PAY-2026-04', period: 'April 2026', paidOn: '30 Apr 2026', gross: 248000.00, net: 216200.00, hours: 152 },
  { id: 'PAY-2026-03', period: 'March 2026', paidOn: '31 Mar 2026', gross: 231000.00, net: 201300.00, hours: 148 },
  { id: 'PAY-2026-02', period: 'February 2026', paidOn: '28 Feb 2026', gross: 216000.00, net: 188200.00, hours: 144 },
  { id: 'PAY-2026-01', period: 'January 2026', paidOn: '31 Jan 2026', gross: 240000.00, net: 209100.00, hours: 156 },
  { id: 'PAY-2025-12', period: 'December 2025', paidOn: '31 Dec 2025', gross: 264000.00, net: 230200.00, hours: 168 },
];

const bankDetails = {
  accountName: 'James O. Etukudo',
  bankName: 'Access Bank PLC',
  sortCode: '044',
  accountNumber: '****1234',
  paymentMethod: 'Bank Transfer',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SummaryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className={`text-xs ${stat.up ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function CurrentPeriodTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Earnings Breakdown */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Earnings Breakdown</CardTitle>
          <CardDescription>{currentPeriod.from} – {currentPeriod.to}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentPeriod.breakdown.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full ${item.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                  {item.type === 'credit' ? <ArrowDownToLine size={14} /> : <Minus size={14} />}
                </div>
                <span className="text-sm">{item.label}</span>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${item.type === 'deduction' ? 'text-destructive' : ''}`}>
                {item.amount < 0 ? `-₦${Math.abs(item.amount).toFixed(2)}` : `₦${item.amount.toFixed(2)}`}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Net Pay Summary */}
      <div className="space-y-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 pb-6 text-center space-y-2">
            <p className="text-sm font-medium opacity-80">Net Pay (Take-Home)</p>
            <p className="text-4xl font-bold tracking-tight">₦{currentPeriod.netPay.toFixed(2)}</p>
            <p className="text-xs opacity-70">Due 31 May 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gross Pay</span>
              <span className="font-semibold">₦{currentPeriod.grossPay.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Deductions</span>
              <span className="font-semibold text-destructive">-₦{currentPeriod.deductions.toFixed(2)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-sm font-bold">
              <span>Net Pay</span>
              <span className="text-primary">₦{currentPeriod.netPay.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full gap-2" variant="outline">
          <Download size={16} />
          Download Payslip
        </Button>
      </div>
    </div>
  );
}

function PayHistoryTab() {
  return (
    <div className="space-y-3">
      {payHistory.map((p) => (
        <Card key={p.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
                <Banknote size={22} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold">{p.period}</p>
                <p className="text-xs text-muted-foreground">Paid on {p.paidOn} · {p.hours} hrs worked</p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-lg">₦{p.net.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Gross ₦{p.gross.toFixed(2)}</p>
              </div>

              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary" title="Download payslip">
                <Download size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function BankDetailsTab() {
  return (
    <div className="max-w-lg space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="text-primary" size={20} />
            Linked Bank Account
          </CardTitle>
          <CardDescription>Your salary is deposited to the account below. Contact HR to update details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { icon: Wallet, label: 'Account Name', value: bankDetails.accountName },
            { icon: Building2, label: 'Bank Name', value: bankDetails.bankName },
            { icon: Hash, label: 'Sort Code', value: bankDetails.sortCode },
            { icon: Hash, label: 'Account Number', value: bankDetails.accountNumber },
            { icon: ArrowDownToLine, label: 'Payment Method', value: bankDetails.paymentMethod },
          ].map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="font-medium">{row.value}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="pt-5 pb-4 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />
          <div>
            <p className="text-sm font-semibold text-emerald-600">Account Verified</p>
            <p className="text-xs text-muted-foreground">Your bank details have been verified by HR on 1 May 2026.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Banknote size={22} />
          Payroll
        </h1>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          G
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2">My Earnings</h2>
          <p className="text-muted-foreground">Track your pay, download payslips, and manage bank details.</p>
        </div>

        <SummaryCards />

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[500px] mb-8">
            <TabsTrigger value="current">Current Period</TabsTrigger>
            <TabsTrigger value="history">Pay History</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <CurrentPeriodTab />
          </TabsContent>

          <TabsContent value="history">
            <PayHistoryTab />
          </TabsContent>

          <TabsContent value="bank">
            <BankDetailsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
