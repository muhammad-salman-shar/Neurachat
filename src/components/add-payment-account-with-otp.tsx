
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Landmark, Mail, Phone, Wallet } from 'lucide-react';
import type { Account } from '@/app/(app)/payments/page';

const JazzCashIcon = () => <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#E41E26" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#fff" d="M12 12.28c.55 0 1-.45 1-1V8.5c0-.55-.45-1-1-1s-1 .45-1 1V11.28c0 .55.45 1 1 1zm-1.03-3.71l.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71c-.39.39-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41zm2.06 5.43H11v-1.5h2.03c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>;
const EasypaisaIcon = () => <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#00B14F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#fff" d="M15.5 12.5h-1.87l-1.63-3.26-1.63 3.26H8.5l3-6 3 6z"/></svg>;
const PaypalIcon = () => <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#003087" d="M20.57 6.09c-.27-.64-1.16-1.09-2.1-1.09H8.54c-.9 0-1.65.41-1.95 1.25L4 16.59c-.24.69.21 1.41.93 1.41h3.19c.6 0 1.12-.42 1.26-1.01l.01-.06.71-3.65c.12-.62.63-1.02 1.24-1.02h2.2c1.33 0 2.22-.92 2.38-2.29l.17-1.89zm-4.48 3.65c-.17 1.07-.97 1.83-1.98 1.83h-1.89c-.58 0-1.08-.38-1.2-.93l-.8-4.23c-.1-.53.28-1.04.8-1.04h2.2c.86 0 1.5.6 1.63 1.45l.24 1.92z"/></svg>;


type Provider = 'JazzCash' | 'Easypaisa' | 'PayPal' | 'Bank';

export default function AddPaymentAccountWithOTP({ onAccountAdded, onComplete }: { onAccountAdded: (account: Account) => void, onComplete: () => void }) {
  const [step, setStep] = useState('select'); // select -> enterNumber -> verify -> done
  const [provider, setProvider] = useState<Provider | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [masked, setMasked] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  function openProvider(p: Provider) {
    setProvider(p);
    setStep('enterNumber');
    setPhone('');
    setOtp('');
    setError('');
  }

  function maskPhone(num: string) {
    if (!num) return '';
    const cleaned = num.replace(/\D/g, '');
    if (cleaned.length <= 4) return cleaned;
    const last = cleaned.slice(-4);
    return `+${cleaned.slice(0, cleaned.length - 10)} *** *** ${last}`;
  }

  function sendCode() {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 11) { // Basic validation for Pakistan numbers
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    const generated = (Math.floor(100000 + Math.random() * 900000)).toString();
    setServerOtp(generated);
    console.log(`[DEV] Mock OTP for ${phone}: ${generated}`); // dev only
    setMasked(maskPhone(phone));
    setStep('verify');
    setTimer(60);
    setAttempts(0);
    setOtp('');
  }

  function resendCode() {
    if (timer > 0) return;
    sendCode();
  }

  function verifyCode() {
    if (!otp) {
      setError('Enter the verification code.');
      return;
    }
    if (attempts >= 2) {
      setError('Too many failed attempts. Please resend code.');
      return;
    }
    if (otp === serverOtp) {
      const account: Account = {
        provider: provider!,
        identifier: maskPhone(phone),
      };
      onAccountAdded(account);
      setStep('done');
      setError('');
    } else {
      setAttempts(a => a + 1);
      setError('Incorrect code. Please try again.');
    }
  }

  function handleInstantSave() {
    if (!provider) return;
    let account: Account | null = null;
    if (provider === 'PayPal' && email) {
        account = { provider, identifier: email };
    } else if (provider === 'Bank' && accountNumber && bankName) {
        account = { provider, identifier: `${bankName} - ${accountNumber}` };
    }
    if (account) {
        onAccountAdded(account);
        setStep('done');
    }
  }

  function cancelFlow() {
    setStep('select');
    setProvider(null);
    setPhone('');
    setOtp('');
    setServerOtp(null);
    setTimer(0);
    setError('');
    setAttempts(0);
  }

  const renderSelect = () => (
    <div>
      <DialogHeader>
        <DialogTitle>Add Payment Account</DialogTitle>
        <DialogDescription>Choose a provider to link (mock verification).</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-3 py-4">
        <Button onClick={() => openProvider('Easypaisa')} variant="outline" className="h-20 flex-col gap-2">
            <EasypaisaIcon />
            <span>Easypaisa</span>
        </Button>
        <Button onClick={() => openProvider('JazzCash')} variant="outline" className="h-20 flex-col gap-2">
            <JazzCashIcon />
            <span>JazzCash</span>
        </Button>
        <Button onClick={() => openProvider('PayPal')} variant="outline" className="h-20 flex-col gap-2">
            <PaypalIcon />
            <span>PayPal</span>
        </Button>
         <Button onClick={() => openProvider('Bank')} variant="outline" className="h-20 flex-col gap-2">
            <Landmark />
            <span>Bank</span>
        </Button>
      </div>
    </div>
  );

  const renderEnterDetails = () => (
    <div>
        <DialogHeader>
            <DialogTitle>Add {provider}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
            {provider === 'PayPal' && (
                <div>
                    <Label htmlFor="email">PayPal Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
                </div>
            )}
            {provider === 'Bank' && (
                <>
                    <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g., HBL" />
                    </div>
                     <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Enter account number" />
                    </div>
                </>
            )}
            {(provider === 'Easypaisa' || provider === 'JazzCash') && (
                <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+923001234567" />
                </div>
            )}
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={cancelFlow}>Back</Button>
            <Button onClick={(provider === 'Easypaisa' || provider === 'JazzCash') ? sendCode : handleInstantSave}>
                {(provider === 'Easypaisa' || provider === 'JazzCash') ? "Send Code" : "Save"}
            </Button>
        </div>
    </div>
  );

  const renderVerify = () => (
    <div>
        <DialogHeader>
            <DialogTitle>Verify {provider} Number</DialogTitle>
            <DialogDescription>We sent a 6-digit code to <strong>{masked}</strong></DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit code" maxLength={6} />
             {error && <p className="text-destructive text-sm mt-2">{error}</p>}
             <p className="text-xs text-muted-foreground/80 mt-2">Dev: OTP is logged to the console for testing.</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {timer > 0 ? <span>Resend in {timer}s</span> : <Button variant="link" size="sm" onClick={resendCode}>Resend Code</Button>}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={cancelFlow}>Cancel</Button>
              <Button onClick={verifyCode}>Verify</Button>
            </div>
        </div>
    </div>
  );

  const renderDone = () => (
      <div className="text-center py-8">
        <DialogTitle>Account Added!</DialogTitle>
        <DialogDescription className="mt-2">Your {provider} account has been linked.</DialogDescription>
        <div className="mt-6">
            <Button onClick={onComplete} className="w-full">Done</Button>
        </div>
      </div>
  );
  
  switch (step) {
      case 'enterNumber': return renderEnterDetails();
      case 'verify': return renderVerify();
      case 'done': return renderDone();
      case 'select':
      default:
        return renderSelect();
  }
}
