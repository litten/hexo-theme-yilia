window.tagConfig = {
	areas: {
		cols_40_60: [{
			width: 40,
			rows: [{
				height: 100
			}]
		},
		{
			width: 60,
			rows: [{
				height: 100
			}]
		}],
		cols_50_50: [{
			width: 50,
			rows: [{
				height: 100
			}]
		},
		{
			width: 50,
			rows: [{
				height: 100
			}]
		}],
		cols_32_32_36: [{
			width: 32,
			rows: [{
				height: 100
			}]
		},
		{
			width: 32,
			rows: [{
				height: 100
			}]
		},
		{
			width: 36,
			rows: [{
				height: 100
			}]
		}]
	}
},
window.tagConfig.pageLayout = {
	top: 0,
	left: 0,
	width: 100,
	height: 100,
	random: !1,
	cols: [{
		width: 45,
		rows: [{
			random: !1,
			height: 100,
			rows: [{
				height: 45,
				cols: [{
					width: 100
				}]
			},
			{
				height: 30,
				cols: [{
					width: 100
				}]
			},
			{
				height: 25,
				cols: [{
					width: 100,
					cols: [{
						width: 35,
						rows: [{
							height: 100
						}]
					},
					{
						width: 25,
						rows: [{
							height: 30
						},
						{
							height: 40
						},
						{
							height: 30
						}]
					},
					{
						width: 15,
						rows: [{
							height: 40
						},
						{
							height: 60
						}]
					},
					{
						width: 25,
						rows: [{
							height: 35
						},
						{
							height: 25
						},
						{
							height: 40
						}]
					}]
				}]
			}]
		}]
	},
	{
		width: 55,
		random: !1,
		rows: [{
			height: 50,
			cols: [{
				width: 45,
				rows: [{
					height: 35,
					cols: window.tagConfig.areas.cols_50_50
				},
				{
					height: 35,
					cols: window.tagConfig.areas.cols_40_60
				},
				{
					height: 30
				}]
			},
			{
				width: 55,
				rows: [{
					height: 50
				},
				{
					height: 50
				}]
			}]
		},
		{
			height: 28,
			cols: [{
				width: 30,
				rows: [{
					height: 100
				}]
			},
			{
				width: 30,
				rows: [{
					height: 40
				},
				{
					height: 60,
					cols: window.tagConfig.areas.cols_40_60
				}]
			},
			{
				width: 40,
				rows: [{
					height: 50,
					cols: window.tagConfig.areas.cols_50_50
				},
				{
					height: 50,
					cols: window.tagConfig.areas.cols_32_32_36
				}]
			}]
		},
		{
			height: 22,
			cols: [{
				width: 35,
				rows: [{
					height: 100
				}]
			},
			{
				width: 15,
				rows: [{
					height: 50
				},
				{
					height: 50
				}]
			},
			{
				width: 15,
				rows: [{
					height: 50
				},
				{
					height: 50
				}]
			},
			{
				width: 20,
				rows: [{
					height: 32
				},
				{
					height: 32
				},
				{
					height: 36
				}]
			},
			{
				width: 15,
				rows: [{
					height: 50
				},
				{
					height: 50
				}]
			}]
		}]
	}]
},
window.tagConfig.colorPatterns = [[{
	backgrounds: ["#ce5f52", "#e37063"],
	fontColor: "#FFF",
	borderColor: "#5c666f"
},
{
	backgrounds: ["#6c5d56", "#746760"],
	fontColor: "#FFF",
	borderColor: "#5c666f"
},
{
	backgrounds: ["#c8b66a", "#dbc877"],
	fontColor: "#FFF",
	borderColor: "#5c666f"
},
{
	backgrounds: ["#6e96b1", "#82a8bf"],
	fontColor: "#FFF",
	borderColor: "#5c666f"
}]];