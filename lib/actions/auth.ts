'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { sendEmail } from '@/lib/mail'
import { incrementFailedLogin, getFailedLoginAttempts, resetFailedLogin } from '@/lib/rate-limit'
import { loginSchema } from '@/lib/validations/admin'
import { query } from '@/lib/mysql'
import { verifyPassword } from '@/lib/auth'
import { signSession } from '@/lib/session'

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

    // 4. Query MySQL for admin account
    const rows = await query<any[]>('SELECT * FROM admins WHERE email = ? LIMIT 1', [email])
    if (rows.length === 0) {
      // Generic error message for security
      const currentFailed = await incrementFailedLogin(ip)
      const remaining = Math.max(0, 5 - currentFailed)
      if (remaining === 0) {
        return { error: 'Invalid login credentials. Your IP has been locked for 15 minutes.' }
      }
      return { error: `Invalid login credentials. (${remaining} attempts remaining before lockout)` }
    }

    const admin = rows[0]
    const isPasswordCorrect = verifyPassword(password, admin.password_hash)

    if (!isPasswordCorrect) {
      const currentFailed = await incrementFailedLogin(ip)
      const remaining = Math.max(0, 5 - currentFailed)
      if (remaining === 0) {
        return { error: 'Invalid login credentials. Your IP has been locked for 15 minutes.' }
      }
      return { error: `Invalid login credentials. (${remaining} attempts remaining before lockout)` }
    }

    // 5. Success actions
    await resetFailedLogin(ip)

    // Sign session token
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      throw new Error('CRITICAL CONFIGURATION ERROR: SESSION_SECRET environment variable is missing.');
    }
    const exp = Date.now() + 24 * 60 * 60 * 1000 // 1 day
    const token = await signSession({ id: admin.id, email: admin.email, exp }, secret)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(exp),
    })

    // Send security notification email (non-blocking)
    sendEmail({
      to: process.env.SMTP_USER || email,
      subject: 'Security Alert: Successful Admin Login',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px; max-width: 600px;">
          <h2 style="color: #1e3e30; margin-top: 0;">Successful Login Alert</h2>
          <p>A successful login to the Honworth Admin Panel was registered.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>User Account:</strong> ${email}</li>
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
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
  } catch (err) {
    console.error('Signout failed:', err)
  }
  redirect('/admin/login')
}
