import { NextResponse } from 'next/server';
import { createServiceRoleServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createServiceRoleServer();
    const { email, password, role = 'user' } = await request.json();

    // Create the user
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role },
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Add user role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: authData.user.id, role });

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServiceRoleServer();
    const { userId, role } = await request.json();

    const { error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role, updated_at: new Date().toISOString() })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
