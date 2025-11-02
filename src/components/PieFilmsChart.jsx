import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as XLSX from 'xlsx';
import { Box, Button } from '@mui/material';
import disney from '../images/disney-image.png';

export default function PieFilmsChart({ characters }) {
	const seriesData = (characters || []).map((c) => ({
		name: c.name,
		y: Array.isArray(c.films) ? c.films.length : 0,
		films: c.films || [],
		imageUrl: c.imageUrl || '',
	}));

	const paleColors = [
		' #46BDC3', // vivid aqua (base)
		' #229D9F', // teal
		' #4DD0C5', // bright mint teal
		' #5ED8D1', // light turquoise
		' #E09C6F', // aqua-mint
		' #94D3D2', // soft aqua
		' #8FE8E0', // cool mint
		' #DE9AD7', // teal-green (soft magenta tone)
		' #7FD4B6', // seafoam green
		' #90E0B8', // fresh minty green
		' #A5EFCB', // soft lime mint
		' #FFCF99', // pale warm peach for contrast
		' #FFA69E', // coral accent
		' #F6B0A0', // soft coral-peach
		' #F7E67A'  // warm pastel yellow
	  ];

	const options = {
		chart: {
			type: 'pie',
			backgroundColor: 'transparent',
			style: {
				fontFamily: 'Roboto, Arial, sans-serif',
			},
			spacingTop: 20,
		},
		title: {
			text: 'Films per Character',
			style: {
				fontSize: '20px',
				fontWeight: 'bold',
				color: 'whitesmoke',
			},
			margin: 30,
			spacingTop: 20,
		},
		colors: paleColors,
		credits: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				innerSize: '40%',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b><br/><span style="color: #59d2d8;">{point.y} films</span> ',
					distance: 20,
					style: {
						fontSize: '12px',
						fontWeight: 'bold',
						textOutline: '1px contrast',
						color: '#ffffff',
					},
				},
				showInLegend: true,
				borderWidth: 2,
				borderColor: '#ffffff',
				shadow: {
					offsetX: 0,
					offsetY: 3,
					opacity: 0.3,
					width: 5,
					color: '#000000',
				},
				states: {
					hover: {
						halo: {
							size: 10,
							opacity: 0.25,
						},
						brightness: 0.1,
					},
				},
				animation: {
					duration: 1000,
				},
			},
		},
		tooltip: {
			backgroundColor: '#00232d',
			borderColor: '#59d2d8',
			borderWidth: 2,
			borderRadius: 8,
			shadow: {
				offsetX: 0,
				offsetY: 4,
				opacity: 0.4,
				width: 8,
			},
			headerFormat: '',
			style: {
				color: '#ffffff',
				fontSize: '13px',
				maxWidth: '400px',
				width: 'auto',
			},
			pointFormatter: function () {
				const pct = Highcharts.numberFormat((this.percentage || 0), 1);
				const filmsCount = this.y || 0;
				const filmsList = (this.options.films || []).map(film => film.length > 40 ? film.substring(0, 40) + '...' : film).join(', ') || '—';
				const imageUrl = this.options.imageUrl || '';
				return `
					<div style="padding: 10px; max-width: 380px; min-width: 200px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; display: flex; gap: 12px;">
						${imageUrl ? `
							<div style="flex-shrink: 0;">
								<img src="${imageUrl}" alt="${this.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 2px solid #59d2d8;" />
							</div>
						` : ''}
						<div style="flex: 1;">
							<div style="font-size: 16px; font-weight: bold; color: #59d2d8; margin-bottom: 8px; word-wrap: break-word; overflow-wrap: break-word;">
								${this.name}
							</div>
							<div style="margin-bottom: 4px;">
								<span style="color: #ffffff;">Films: </span>
								<span style="font-weight: bold; color: #59d2d8;">${filmsCount}</span>
							</div>
							<div style="margin-bottom: 4px;">
								<span style="color: #ffffff;">Percentage: </span>
								<span style="font-weight: bold; color: #59d2d8;">${pct}%</span>
							</div>
							<div style="font-size: 11px; color: #cccccc; margin-top: 6px; max-width: 360px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; line-height: 1.5;">
								${filmsList}
							</div>
						</div>
					</div>
				`;
			},
			useHTML: true,
		},
		legend: {
			align: 'center',
			verticalAlign: 'bottom',
			layout: 'horizontal',
			maxWidth: '95%',
			itemWidth: 120,
			maxHeight: 100,
			itemStyle: {
				color: '#ffffff',
				fontSize: '11px',
				fontWeight: 'normal',
			},
			itemHoverStyle: {
				color: '#59d2d8',
			},
			itemHiddenStyle: {
				color: ' #f1f1f14d',
			},
			symbolRadius: 6,
			x: 0,
			y: 0,
			navigation: {
				activeColor: '#59d2d8',
				inactiveColor: 'rgba(89, 210, 216, 0.50)',
				style: {
					color: '#ffffff',
				},
			},
		},
		series: [
			{
				type: 'pie',
				name: 'Films',
				data: seriesData,
				center: ['50%', '45%'],
				size: '95%',
			},
		],
	};

	function exportXlsx() {
		const rows = (characters || []).map((c) => ({
			Name: c.name,
			Films: (c.films || []).length,
			FilmTitles: (c.films || []).join('; '),
		}));
		const ws = XLSX.utils.json_to_sheet(rows);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Films');
		XLSX.writeFile(wb, 'films_chart.xlsx');
	}

	return (
		<Box className="pie-chart-container">
			<Box className="pie-chart-logo-container">
				<img src={disney} className="disney-image pie-chart-logo" />
			</Box>
			<Box className="pie-chart-content">
				<HighchartsReact highcharts={Highcharts} options={options} />	
			</Box>
			<Box className="pie-chart-button-container">
				<Button variant="outlined" size="small" onClick={exportXlsx}>
					Export XLSX
				</Button>
			</Box>
		</Box>
	);
}


