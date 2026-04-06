import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId) {
    return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured in environment' }, { status: 500 });
  }

  // Define the fields you want to return to save on costs/latency
  const fields = 'name,rating,formatted_phone_number,reviews,photo,user_ratings_total';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const data = await response.json();
    
    if (data.status !== 'OK') {
      console.error("Google Places API Error:", data.status, data.error_message);
      return NextResponse.json({ 
        error: data.status, 
        message: data.error_message || 'Fetch failed' 
      }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
