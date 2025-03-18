/*import { NextResponse } from 'next/server';
import dynamoDB from '@/lib/dynamodb'; 
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '@/lib/auth';

export async function POST(req: Request){
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'IDが正しくありません。'}, {status: 401});


  const body await req.json();
  if (!body.name || !body.quantity || !body.unit || body.expirationDate) {
    return NextResponse.json({ error: '無効な入力です。'}, {status: 400});
  }
}
