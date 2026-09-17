import { spawn } from 'node:child_process';
import { rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const root = path.join(fileURLToPath(new URL('.', import.meta.url)), '..');
const input = path.join(root, 'public/lunch_demo.mp4');
const output = path.join(root, 'public/lunch_demo.min.mp4');

if (!ffmpegPath) {
	throw new Error('ffmpeg-static did not provide a binary for this platform.');
}

const args = [
	'-y',
	'-i',
	input,
	'-vf',
	'scale=-2:900',
	'-c:v',
	'libx264',
	'-crf',
	'28',
	'-preset',
	'slow',
	'-an',
	'-movflags',
	'+faststart',
	output,
];

const child = spawn(ffmpegPath, args, { stdio: 'inherit' });

child.on('exit', async (code) => {
	if (code !== 0) {
		process.exit(code ?? 1);
	}

	const [before, after] = await Promise.all([stat(input), stat(output)]);
	console.log(
		`Encoded ${path.basename(input)} ${(before.size / 1024 / 1024).toFixed(2)}MB → ${(after.size / 1024 / 1024).toFixed(2)}MB`,
	);
	await rename(output, input);
	console.log(`Replaced ${path.basename(input)}`);
});
