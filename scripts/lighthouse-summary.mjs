#!/usr/bin/env node
/**
 * Run Lighthouse and print scores + failed audits in the terminal.
 * No HTML report unless you pass --save.
 *
 * Usage:
 *   npm run lighthouse:mobile
 *   npm run lighthouse:desktop
 *   npm run lighthouse:mobile:local   (requires npm run preview in another terminal)
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const PRODUCTION_URL = 'https://nthgh1030.github.io/Ngan_Tsz_Hang_Portfolio/';
const LOCAL_URL = 'http://localhost:4321/Ngan_Tsz_Hang_Portfolio/';

const args = process.argv.slice(2);
const formFactor = args.includes('--desktop') ? 'desktop' : 'mobile';
const url = args.includes('--local') ? LOCAL_URL : PRODUCTION_URL;
const saveJson = args.includes('--save');

const toScore = (value) => (value == null ? '—' : Math.round(value * 100));

const isActionableFailure = (audit) => {
	if (!audit || audit.score === null) return false;
	if (audit.score >= 1) return false;
	const mode = audit.scoreDisplayMode;
	return mode !== 'informative' && mode !== 'manual' && mode !== 'notApplicable';
};

const printSummary = (report) => {
	const { categories, audits } = report;

	console.log('\n══════════════════════════════════════');
	console.log('  Lighthouse summary');
	console.log('══════════════════════════════════════');
	console.log(`  URL     ${url}`);
	console.log(`  Device  ${formFactor}`);
	console.log('──────────────────────────────────────');

	for (const category of Object.values(categories)) {
		const label = category.title.padEnd(18, '.');
		const value = toScore(category.score);
		console.log(`  ${label} ${value}`);
	}

	console.log('\n── Core metrics ──────────────────────');
	for (const id of [
		'first-contentful-paint',
		'largest-contentful-paint',
		'speed-index',
		'total-blocking-time',
		'cumulative-layout-shift',
	]) {
		const audit = audits[id];
		if (audit?.displayValue) {
			console.log(`  ${audit.title}: ${audit.displayValue}`);
		}
	}

	console.log('\n── Fix these (failed audits) ─────────');
	let anyFailures = false;

	for (const category of Object.values(categories)) {
		const failed = category.auditRefs
			.map((ref) => audits[ref.id])
			.filter(isActionableFailure)
			.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

		if (failed.length === 0) continue;

		anyFailures = true;
		console.log(`\n  [${category.title}]`);

		for (const audit of failed.slice(0, 10)) {
			const score = toScore(audit.score);
			console.log(`    • ${audit.title} — score ${score}`);
			if (audit.displayValue) {
				console.log(`      ${audit.displayValue}`);
			}
		}

		if (failed.length > 10) {
			console.log(`    … ${failed.length - 10} more in this category`);
		}
	}

	if (!anyFailures) {
		console.log('  None — all audited checks passed.');
	}

	console.log('\n── Tip ───────────────────────────────');
	console.log('  Pass --save to write JSON to docs/lighthouse-latest.json');
	console.log('  Pass --local to test localhost preview instead of production');
	console.log('══════════════════════════════════════\n');
};

const run = async () => {
	if (args.includes('--local')) {
		console.log('Testing local preview. Make sure `npm run preview` is running.\n');
	}

	const chrome = await chromeLauncher.launch({
		chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
	});

	try {
		const options = {
			logLevel: 'error',
			output: 'json',
			port: chrome.port,
			formFactor,
			screenEmulation: { mobile: formFactor === 'mobile' },
			onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
		};

		console.log(`Running Lighthouse (${formFactor})…`);

		const result = await lighthouse(url, options);
		const report = JSON.parse(result.report);

		printSummary(report);

		if (saveJson) {
			const root = join(dirname(fileURLToPath(import.meta.url)), '..');
			const outPath = join(root, 'docs', 'lighthouse-latest.json');
			mkdirSync(dirname(outPath), { recursive: true });
			writeFileSync(outPath, result.report);
			console.log(`Saved JSON → docs/lighthouse-latest.json\n`);
		}
	} finally {
		await chrome.kill();
	}
};

run().catch((error) => {
	console.error('\nLighthouse failed:', error.message);
	console.error('Need Google Chrome installed locally.\n');
	process.exit(1);
});
