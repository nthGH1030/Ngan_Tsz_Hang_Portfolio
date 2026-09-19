import { useId, useState, type KeyboardEvent } from 'react';

const roles = [
	{
		tabDates: '2019 – Present',
		dates: 'Sep 2019 – Present',
		practice: 'Project Management',
		title: 'Assistant Project Manager',
		employer: 'Gaw Capital',
		employerFull: 'Gaw Capital Asset Management Limited',
		href: 'https://www.gawcapital.com/',
		bullets: [
			'Served as core project manager on the asset-enhancement programme, and as a technical contributor on the internal digitalization team.',
			'Led contractors and consultants through enhancement projects across 29+ regional shopping malls, handling contracts of up to HK$100 million.',
			'Worked with executive leadership to define strategic property-lifecycle budgets and asset-management policy for the portfolio.',
			'Enforced statutory compliance and industry practice across those assets so management standards stayed consistent at scale.',
		],
	},
	{
		tabDates: '2018 – 2019',
		dates: 'Oct 2018 – Sep 2019',
		practice: 'Consultancy',
		title: 'Assistant Building Surveyor',
		employer: 'United Consultancy',
		employerFull: 'United Consultancy Limited',
		bullets: [
			'Major team contributor on addition-and-alteration consultancy for high-profile real estate investment trusts (REITs).',
			'Designed statutory solutions that enforced fire-safety protocol and kept premises compliant under the Fire Safety (Commercial Premises) Ordinance (FS(CP)O).',
		],
	},
	{
		tabDates: '2015 – 2018',
		dates: 'Sep 2015 – Jun 2018',
		practice: 'Consultancy',
		title: 'Assistant Building Surveyor',
		employer: 'ISS',
		employerFull: 'ISS Facility Services',
		bullets: [
			'Major team contributor on property consultancy and technical compliance across public and private portfolios, including work to discharge statutory orders.',
			'Investigated defects and specified maintenance for private owners, specializing in waterproofing, structural repair, and the Mandatory Building Inspection Scheme (MBIS).',
		],
	},
];

export default function ExperienceTimeline() {
	const [index, setIndex] = useState(0);
	const baseId = useId();
	const role = roles[index];

	const go = (next: number, moveFocus: boolean) => {
		const clamped = Math.max(0, Math.min(roles.length - 1, next));
		setIndex(clamped);
		if (!moveFocus) {
			return;
		}
		requestAnimationFrame(() => {
			document.getElementById(`${baseId}-tab-${clamped}`)?.focus();
		});
	};

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			go(index + 1, true);
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			go(index - 1, true);
		} else if (event.key === 'Home') {
			event.preventDefault();
			go(0, true);
		} else if (event.key === 'End') {
			event.preventDefault();
			go(roles.length - 1, true);
		}
	};

	return (
		<div className="rounded-2xl border border-line bg-surface p-4 shadow-sm md:p-6">
			<div onKeyDown={onKeyDown}>
				<div
					role="tablist"
					aria-label="Experience timeline"
					aria-orientation="horizontal"
					className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-b-0 border-line"
				>
					{roles.map((item, itemIndex) => (
						<button
							key={item.employer}
							type="button"
							role="tab"
							id={`${baseId}-tab-${itemIndex}`}
							aria-controls={`${baseId}-panel`}
							aria-selected={itemIndex === index}
							tabIndex={itemIndex === index ? 0 : -1}
							className={`min-h-11 min-w-0 border-b-[3px] px-4 py-4 text-left ${
								itemIndex === index
									? 'border-b-accent bg-surface text-ink'
									: 'border-line bg-surface text-muted hover:text-ink'
							}`}
							onClick={() => go(itemIndex, false)}
						>
							<p
								className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
									itemIndex === index ? 'text-accent' : 'text-muted'
								}`}
							>
								{item.tabDates}
							</p>
							<p className="font-semibold text-ink">
								{item.title}
							</p>
							<p className={`text-sm ${itemIndex === index ? 'text-muted' : 'text-muted/80'}`}>
								{item.employer}
							</p>
						</button>
					))}
				</div>
				<div
					role="tabpanel"
					id={`${baseId}-panel`}
					aria-labelledby={`${baseId}-tab-${index}`}
					className="mt-6"
				>
					<h3 className="text-lg font-semibold text-ink">
						{role.title}
					</h3>
					<p className="mt-4 text-sm text-muted">
						{role.practice}
						{' · '}
						{role.href ? (
							<a
								href={role.href}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-accent hover:underline"
							>
								{role.employerFull}
							</a>
						) : (
							role.employerFull
						)}
						{` · ${role.dates}`}
					</p>
					<ul className="mt-4 space-y-4">
						{role.bullets.map((item) => (
							<li key={item} className="flex items-start gap-4 text-base leading-7 text-muted">
								<span
									className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
									aria-hidden="true"
								/>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
