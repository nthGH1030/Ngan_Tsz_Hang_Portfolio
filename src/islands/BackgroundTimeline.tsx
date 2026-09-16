import { useId, useState, type KeyboardEvent } from 'react';

const barlow = "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const roles = [
	{
		dates: '2018 – Present',
		title: 'Assistant Project Manager',
		employer: 'Gaw Capital',
		employerFull: 'Gaw Capital Asset Management Limited',
		href: 'https://www.gawcapital.com/',
		bullets: [
			'Managed multiple properties as a project manager, coordinating leasing and property-management teams to deliver construction projects on schedule and within budget while maintaining compliance.',
			'Led technical planning and vendor coordination for project execution, balancing operational constraints with delivery quality and cost control.',
			'Acted as a bridge between operations and management to smoothen property operation.',
		],
	},
	{
		dates: '2017 – 2018',
		title: 'Assistant Building Surveyor',
		employer: 'United Consultancy',
		employerFull: 'United Consultancy Limited',
		bullets: [
			'Managed large-scale Asset Enhancement Initiatives (AEI) for major institutional clients, including Link REIT, overseeing full-lifecycle renovation projects from technical planning to final delivery.',
			'Led technical coordination and stakeholder liaison, balancing client requirements with contractor capabilities.',
			'Acted as a bridge between clients, contractors, and statutory bodies on regulatory requirements.',
		],
	},
	{
		dates: '2015 – 2017',
		title: 'Assistant Building Surveyor',
		employer: 'ISS',
		employerFull: 'ISS Building Consultancy',
		bullets: [
			'Managed government term contracts for large-scale building operations.',
			'Produced and managed detailed technical drawings in AutoCAD for client review.',
			'Led Mandatory Building Inspection Scheme (MBIS) projects and building condition surveys for private owners.',
		],
	},
];

export default function BackgroundTimeline() {
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
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
			<p className="max-w-3xl text-sm leading-6 text-gray-700">
				Day job in real-estate renovation delivery — the setting the software work was built in, not
				the lead identity on this site.
			</p>
			<div className="mt-6" onKeyDown={onKeyDown}>
				<div
					role="tablist"
					aria-label="Building surveying timeline"
					aria-orientation="horizontal"
					className="grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-xl border border-b-0 border-slate-200"
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
							className={`min-h-11 min-w-0 border-b-[3px] px-3 py-3 text-left ${
								itemIndex === index
									? 'border-b-blue-600 bg-white text-gray-900'
									: 'border-slate-200 bg-white text-gray-600 hover:text-gray-900'
							}`}
							onClick={() => go(itemIndex, false)}
						>
							<p
								className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
									itemIndex === index ? 'text-blue-700' : 'text-slate-500'
								}`}
							>
								{item.dates}
							</p>
							<p className="mt-1 font-semibold text-gray-900" style={{ fontFamily: barlow }}>
								{item.title}
							</p>
							<p className={`mt-0.5 text-sm ${itemIndex === index ? 'text-gray-700' : 'text-gray-500'}`}>
								{item.employer}
							</p>
						</button>
					))}
				</div>
				<div
					role="tabpanel"
					id={`${baseId}-panel`}
					aria-labelledby={`${baseId}-tab-${index}`}
					className="mt-5"
				>
					<h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: barlow }}>
						{role.title}
					</h3>
					<p className="mt-1 text-sm text-gray-600">
						{role.href ? (
							<a
								href={role.href}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-blue-700 hover:underline"
							>
								{role.employerFull}
							</a>
						) : (
							role.employerFull
						)}
						{` · ${role.dates}`}
					</p>
					<ul className="mt-4 space-y-3">
						{role.bullets.map((item) => (
							<li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
								<span
									className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
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
