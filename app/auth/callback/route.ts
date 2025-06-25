import { createServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { type EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  // Check for newer OTP flow parameters
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  // Check for older code-based flow
  const code = searchParams.get('code');

  const next = searchParams.get('next') || '/';

  console.log('Callback params:', {
    token_hash: !!token_hash,
    type,
    code: !!code,
    next,
  });

  try {
    const supabase = await createServer();

    // Handle newer OTP flow
    if (token_hash && type) {
      console.log('Using OTP flow');

      const { error, data } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      console.log('OTP verification result:', {
        error: error?.message,
        hasUser: !!data?.user,
      });

      if (error) {
        console.error('OTP verification failed:', error.message);

        if (
          error.message.includes('expired') ||
          error.message.includes('invalid')
        ) {
          return NextResponse.redirect(
            new URL('/auth/forgot-password?status=session-expired', request.url)
          );
        }

        return NextResponse.redirect(
          new URL('/auth/forgot-password?status=error', request.url)
        );
      }

      if (!data?.user) {
        console.error(
          'No user data returned after successful OTP verification'
        );
        return NextResponse.redirect(
          new URL('/auth/forgot-password?status=error', request.url)
        );
      }

      // For password reset, ensure user goes to reset password page
      if (type === 'recovery') {
        console.log('Redirecting to reset password page');
        return NextResponse.redirect(
          new URL('/auth/reset-password', request.url)
        );
      }

      console.log('Redirecting to:', next);
      return NextResponse.redirect(new URL(next, request.url));
    }

    // Handle older code-based flow
    if (code) {
      console.log('Using code-based flow');

      const { error, data } = await supabase.auth.exchangeCodeForSession(code);

      console.log('Code exchange result:', {
        error: error?.message,
        hasUser: !!data?.user,
      });

      if (error) {
        console.error('Code exchange failed:', error.message);

        if (
          error.message.includes('expired') ||
          error.message.includes('invalid')
        ) {
          return NextResponse.redirect(
            new URL('/auth/forgot-password?status=session-expired', request.url)
          );
        }

        return NextResponse.redirect(
          new URL('/auth/forgot-password?status=error', request.url)
        );
      }

      if (!data?.user) {
        console.error('No user data returned after successful code exchange');
        return NextResponse.redirect(
          new URL('/auth/forgot-password?status=error', request.url)
        );
      }

      console.log('Code exchange successful, redirecting to:', next);
      return NextResponse.redirect(new URL(next, request.url));
    }

    // Neither flow detected
    console.error(
      'Missing required parameters: no token_hash/type or code found'
    );
    return NextResponse.redirect(
      new URL('/auth/forgot-password?status=error', request.url)
    );
  } catch (unexpectedError) {
    console.error('Unexpected error in callback:', unexpectedError);
    return NextResponse.redirect(
      new URL('/auth/forgot-password?status=error', request.url)
    );
  }
}
