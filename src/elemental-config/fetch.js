export default {
	mixins: {
		edtAPI: {
			baseUrl: 'http://linux.suse:3030/api',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			responseType: 'json'
		}
	},

	calls: {
		getProjects: {
			mixins: ['edtAPI'],
			request: {
				url: '/projects',
				method: 'GET'
			}
		},
		postProject: {
			mixins: ['json', 'cors', 'edtAPI'],
			request: {
				url: '/projects',
				method: 'POST',
				dataFromState: {
					name: '$edt.form.fetch.mixinName'
				}
			}
		}
	}

};
