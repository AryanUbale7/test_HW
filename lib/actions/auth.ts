'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { sendEmail } from '@/lib/mail'
import { incrementFailedLogin, getFailedLoginAttempts, resetFailedLogin } from '@/lib/rate-limit'
import { loginSchema } from '@/lib/validations/admin'

/**
 * Handles admin login with Zod validation, brute-force lockout, and notifications.
 */
export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 1. Zod input validation
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    // 2. Get requester IP for rate limiting
    const headerList = await headers()
    const rawIp = headerList.get('x-forwarded-for') || headerList.get('x-real-ip') || '127.0.0.1'
    const ip = rawIp.split(',')[0].trim() // Extract first IP if list

    // 3. Check failed attempts
    const failedAttempts = await getFailedLoginAttempts(ip)
    if (failedAttempts >= 5) {
      return { error: 'Too many failed login attempts. Please try again in 15 minutes.' }
    }

    // 4. Supabase Sign In
    const supabase = await createClient()
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Increment failed login count
      const currentFailed = await incrementFailedLogin(ip)
      const remaining = Math.max(0, 5 - currentFailed)
      
      // Generic error message to prevent account enumeration
      if (remaining === 0) {
        return { error: 'Invalid login credentials. Your IP has been locked for 15 minutes.' }
      }
      return { error: `Invalid login credentials. (${remaining} attempts remaining before lockout)` }
    }

    // 5. Success actions
    await resetFailedLogin(ip)

    // Send security notification email (non-blocking)
    const adminEmail = data.user?.email || email
    sendEmail({
      to: process.env.SMTP_USER || adminEmail,
      subject: 'Security Alert: Successful Admin Login',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px; max-width: 600px;">
          <h2 style="color: #1e3e30; margin-top: 0;">Successful Login Alert</h2>
          <p>A successful login to the Honworth Admin Panel was registered.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>User Account:</strong> ${adminEmail}</li>
            <li style="margin-bottom: 10px;"><strong>IP Address:</strong> ${ip}</li>
            <li style="margin-bottom: 10px;"><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
          </ul>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">If this login was not performed by you, please reset your password immediately and contact administrator support.</p>
        </div>
      `,
    }).catch(err => console.error('Failed to send login notification email:', err))

    // Redirect to dashboard
    redirect('/admin/dashboard')
  } catch (err: any) {
    // Next.js redirect internally throws an error that is handled by the framework,
    // so we must re-throw it, but return generic message for other errors.
    if (err && err.message === 'NEXT_REDIRECT') {
      throw err
    }
    console.error('Error during login action:', err)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

/**
 * Handles signing out and revoking the server session.
 */
export async function logout() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (err) {
    console.error('Signout failed:', err)
  }
  redirect('/admin/login')
}
