import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const VIDEOS_DIRECTORY = path.join(process.cwd(), 'public/videos');
const DEFAULT_VIDEO_ID = 'default-video';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || id === 'undefined') {
    if (fs.existsSync(path.join(VIDEOS_DIRECTORY, `${DEFAULT_VIDEO_ID}.mp4`))) {
      return NextResponse.redirect(
        new URL(`/videos/${DEFAULT_VIDEO_ID}`, request.url)
      );
    }

    return new NextResponse(JSON.stringify({ error: 'Video ID is required' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const videoPath = path.join(VIDEOS_DIRECTORY, `${id}.mp4`);

  if (!fs.existsSync(videoPath)) {
    return new NextResponse(JSON.stringify({ error: 'Video not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json({
    videoId: id,
    url: `/videos/${id}.mp4`,
    title: `Vidéo ${id}`,
  });
}
